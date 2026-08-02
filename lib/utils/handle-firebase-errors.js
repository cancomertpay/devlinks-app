import toast from "react-hot-toast";

export const handleFirebaseAuthErrors = (error) => {
  const code = error.code;
  let message;
  switch (code) {
    case "auth/weak-password":
      message = "Password is too weak. Please choose a stronger password.";
      break;
    case "auth/email-already-exists":
      message = "Email already exists. Please try a different email address.";
      break;
    case "auth/invalid-creation-time":
      message = "Invalid creation time. Please try again.";
      break;
    // Firebase reports a wrong password and an unknown account the same way,
    // on purpose, so that the form cannot be used to discover who has an
    // account here. The wording has to stay just as undecided.
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      message = "Email or password is incorrect.";
      break;
    case "auth/invalid-email":
      message = "Invalid email address. Please enter a valid email address.";
      break;
    case "auth/invalid-password":
      message = "Invalid password. Please try again.";
      break;
    case "auth/invalid-password-salt":
      message = "Invalid password salt. Please try again.";
      break;
    case "auth/too-many-requests":
      message = "Too many requests. Please try again later.";
      break;
    case "auth/email-already-in-use":
      message = "Email already in use. Please try a different email address.";
      break;
    case "auth/account-exists-with-different-credential":
      message =
        "This email is already registered with a different sign-in method. Use that one instead.";
      break;
    case "auth/popup-blocked":
      message = "Your browser blocked the sign-in popup. Allow popups and try again.";
      break;
    case "auth/operation-not-allowed":
      message = "This sign-in method is not enabled for this project yet.";
      break;
    case "auth/unauthorized-domain":
      message = "This domain is not authorised for sign-in in the Firebase console.";
      break;
    case "auth/invalid-email":
      message = "Invalid email address. Please enter a valid email address.";
      break;
    default:
      message = error?.message;
  }

  toast.error(message);
};
