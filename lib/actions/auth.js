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
import { ref, set } from "firebase/database";
import { database } from "@/firebase-config";
import { handleFirebaseAuthErrors } from "../utils/handle-firebase-errors";
import { generateId, isProfileId } from "../utils/helpers";

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
    await updateProfile(user, {
      displayName: id,
    });
    
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

    // Not isNewUser: linking a provider to an existing account reports the
    // user as returning while still overwriting displayName with the name
    // from the provider, which is not a usable database key
    if (!isProfileId(result.user.displayName)) {
      const id = generateId(6);
      const [firstName = "", ...lastNameParts] = (result.user.displayName ?? "")
        .trim()
        .split(/\s+/);

      await updateProfile(result.user, { displayName: id });
      await writeInitialUserData(id, {
        first_name: firstName,
        last_name: lastNameParts.join(" "),
        email: result.user.email ?? "",
        profile_picture: result.user.photoURL ?? "",
      });
    }

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
  signOut(auth);
}
