import { z } from "zod";

export const SignupFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    // Not trimmed, for the same reason as sign-in: the password stored has to
    // be exactly what was typed, or it cannot be typed again later
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Signing in deliberately does not apply the signup policy. A password changed
// through Firebase's own reset page only has to clear Firebase's six-character
// minimum, so enforcing eight here would lock that person out with the correct
// password in hand. Whether it is right is the server's answer, not ours.
//
// It is also not trimmed: leading and trailing spaces are part of a password,
// and quietly stripping them means submitting something the user did not type.
export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Please enter your password." }),
});

export const ResetPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});

export const UserProfileSchema = z.object({
  profile_picture: z.string().optional(),
  first_name: z.string().min(2, { message: "First name is too short." }),
  last_name: z.string().min(2, { message: "Last name is too short." }),
  email: z.string().email({ message: "Please enter a valid email." }),
});
