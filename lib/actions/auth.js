import { auth } from "@/firebase-config";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { redirect } from "next/navigation";

import {
  ResetPasswordFormSchema,
  SigninFormSchema,
  SignupFormSchema,
} from "../definitions";
import toast from "react-hot-toast";
import { get, ref, set, update } from "firebase/database";
import { database } from "@/firebase-config";
import { handleFirebaseAuthErrors } from "../utils/handle-firebase-errors";
import { generateId, isProfileId } from "../utils/helpers";

// Security rules match the profile id against auth.token.name, and the token
// in hand still carries the previous display name right after updateProfile —
// so it has to be refreshed before the first write, or that write is denied
const applyProfileId = async (user, id) => {
  await updateProfile(user, { displayName: id });
  await user.getIdToken(true);
};

export const writeInitialUserData = async (id, profile = {}) => {
  const initialProfileData = {
    profile: {
      profile_picture: "",
      first_name: "",
      last_name: "",
      email: "",
      ...profile,
    },
  };

  try {
    await set(ref(database, `users/${id}`), initialProfileData);
  } catch (error) {
    throw new Error(error);
  }
};

// signup
export const signup = async (state, formData) => {
  const id = generateId(6);

  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const { user } = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    handleFirebaseAuthErrors(error);
    return { user: null };
  });

  if (user) {
    await applyProfileId(user, id);

    await writeInitialUserData(id);

    toast.success("Account createad successfully!");
    redirect("/customize-links");
  }
};

// signin
export const signin = async (state, formData) => {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedFields.data;
  const { user } = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    handleFirebaseAuthErrors(error);
    return;
  });
  if (user) {
    toast.success("Login successful!");
    redirect("/customize-links");
  } else {
    throw new Error({ message: "Failed to login" });
  }
};

const oauthProviders = {
  google: () => new GoogleAuthProvider(),
  github: () => new GithubAuthProvider(),
};

// Brings an OAuth user in line with what the rest of the app expects: a
// generated id as displayName and a profile record under it.
//
// isNewUser is not enough to decide this. Linking a provider to an account
// that already exists reports the user as returning while still replacing
// displayName with the name from the provider, and a run that failed partway
// through leaves an id with no record behind it — so both are checked.
const ensureProfileRecord = async (user) => {
  let id = user.displayName;

  if (!isProfileId(id)) {
    id = generateId(6);
    await applyProfileId(user, id);
  }

  // displayName is the id by now, so the real name comes from the provider
  const providerName = user.providerData?.[0]?.displayName ?? "";
  const [firstName = "", ...lastNameParts] = providerName.trim().split(/\s+/);

  const fromProvider = {
    first_name: firstName,
    last_name: lastNameParts.join(" "),
    email: user.email ?? "",
    profile_picture: user.photoURL ?? "",
  };

  const existing = await get(ref(database, `users/${id}`));

  if (!existing.exists()) {
    await writeInitialUserData(id, fromProvider);
    return id;
  }

  // The record predates this sign-in — an account that started with email and
  // password, say. Fill in what the provider knows and the profile is missing,
  // without touching anything the user has already filled in themselves.
  const currentProfile = existing.val()?.profile ?? {};
  const missing = Object.fromEntries(
    Object.entries(fromProvider).filter(
      ([field, value]) => value && !currentProfile[field]
    )
  );

  if (Object.keys(missing).length > 0) {
    await update(ref(database, `users/${id}/profile`), missing);
  }

  return id;
};

// Signs in through an OAuth popup. A first-time visitor is given the same
// short id and profile record that email signup creates, so the rest of the
// app can keep addressing people by displayName.
export const signInWithProvider = async (providerName) => {
  const createProvider = oauthProviders[providerName];

  if (!createProvider) {
    throw new Error(`Unknown auth provider: ${providerName}`);
  }

  try {
    const result = await signInWithPopup(auth, createProvider());

    await ensureProfileRecord(result.user);

    toast.success("Login successful!");
    return true;
  } catch (error) {
    // Dismissing the popup is a deliberate cancel, not a failure worth a toast
    const cancelled =
      error.code === "auth/popup-closed-by-user" ||
      error.code === "auth/cancelled-popup-request";

    if (!cancelled) {
      handleFirebaseAuthErrors(error);
    }

    return false;
  }
};

// password reset
export const resetPassword = async (state, formData) => {
  const validatedFields = ResetPasswordFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await sendPasswordResetEmail(auth, validatedFields.data.email);
  } catch (error) {
    // Reporting "no such user" would let anyone test which addresses are
    // registered, so an unknown address looks exactly like a sent email
    if (error.code !== "auth/user-not-found") {
      handleFirebaseAuthErrors(error);
      return { errors: {} };
    }
  }

  return { sent: true };
};

export function logout() {
  return signOut(auth);
}
