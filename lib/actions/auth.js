import { auth } from "@/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { redirect } from "next/navigation";

import { SigninFormSchema, SignupFormSchema } from "../definitions";
import toast from "react-hot-toast";
import { ref, set } from "firebase/database";
import { database } from "@/firebase-config";
import { handleFirebaseAuthErrors } from "../utils/handle-firebase-errors";
import { generateId } from "../utils/helpers";

export const writeInitialUserData = async (id) => {
  const initialProfileData = {
    profile: {
      profile_picture: "",
      first_name: "",
      last_name: "",
      email: "",
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

export function logout() {
  signOut(auth);
}
