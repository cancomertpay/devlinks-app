import { SigninFormSchema, SignupFormSchema } from "../definitions";
import { login, logout, register } from "../firebase-config";

// signup
export const signup = async (state, formData) => {
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

  await register(validatedFields.data.email, validatedFields.data.password);
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

  await login(validatedFields.data.email, validatedFields.data.password);
};

export const signout = () => {
  logout();
};
