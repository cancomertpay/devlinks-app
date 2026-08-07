import { z } from "zod";
import { normalizeForSearch } from "./utils/helpers";

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

// Lowercase on purpose: profile ids are uppercase (see isProfileId), so a
// string can be one or the other but never both, and /[displayName] can tell
// them apart without a lookup
export const USERNAME_PATTERN = /^[a-z0-9_-]{3,20}$/;

export const USERNAME_MAX_LENGTH = 20;

export const TITLE_MAX_LENGTH = 60;

// Profiles live at the root of the site, so a username that collides with a
// real route would give someone a page that never opens: Next.js serves the
// static route and the dynamic one never runs
export const RESERVED_USERNAMES = new Set([
  "discover",
  "login",
  "register",
  "forgot-password",
  "customize-links",
  "profile-details",
  "api",
  "_next",
  "admin",
  "settings",
  "about",
  "terms",
  "privacy",
  "support",
  "help",
  "devlinks",
  "null",
  "undefined",
]);

// Strips whatever the pattern would reject, so the field cannot hold an
// invalid value in the first place rather than rejecting it after the fact.
//
// Turkish letters are folded to their Latin counterparts before anything is
// dropped: stripping them outright turned "Cömertpay" into "cmertpay", losing
// a letter from the middle of someone's own name.
export function sanitizeUsername(value) {
  return normalizeForSearch(value)
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, USERNAME_MAX_LENGTH);
}

// The form validates by hand rather than through the schema below, so the
// rules live here as a plain function both can agree on. An empty username is
// valid: it is optional, and accounts created before it existed have none.
export function validateUsername(value) {
  const username = sanitizeUsername(value);

  if (!username) {
    return { valid: true, username: "" };
  }

  if (username.length < 3) {
    return { valid: false, username, message: "At least 3 characters" };
  }

  if (!USERNAME_PATTERN.test(username)) {
    return { valid: false, username, message: "Letters, numbers, - and _" };
  }

  if (RESERVED_USERNAMES.has(username)) {
    return { valid: false, username, message: "This one is reserved" };
  }

  return { valid: true, username };
}

export const UserProfileSchema = z.object({
  profile_picture: z.string().optional(),
  username: z
    .string()
    .refine((value) => validateUsername(value).valid, {
      message: "Please enter a valid username.",
    })
    .optional(),
  title: z
    .string()
    .trim()
    .max(TITLE_MAX_LENGTH, { message: "Title is too long." })
    .optional(),
  first_name: z.string().min(2, { message: "First name is too short." }),
  last_name: z.string().min(2, { message: "Last name is too short." }),
  email: z.string().email({ message: "Please enter a valid email." }),
});
