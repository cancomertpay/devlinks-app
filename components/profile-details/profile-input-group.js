import { useEffect, useState } from "react";
import Input from "../UI/input/input";
import { useUserProfileContext } from "@/context/user-profile-context";
import { isUsernameAvailable } from "@/lib/actions/username";
import { sanitizeUsername, validateUsername, TITLE_MAX_LENGTH } from "@/lib/definitions";
import { auth } from "@/firebase-config";

// Both were added after the app shipped, so accounts exist without them and
// neither can be required — which also means the "can't be empty" rule below
// has to leave them alone
const OPTIONAL_FIELDS = new Set(["username", "title"]);

export default function ProfileInputGroup() {
  const {
    userObject,
    handleFieldEdit,
    handleUserInputs,
    errorObject,
    handleError,
  } = useUserProfileContext();

  const [username, setUsername] = useState(userObject["username"] || "");
  const [title, setTitle] = useState(userObject["title"] || "");
  const [firstName, setFirstName] = useState(userObject["first_name"] || "");
  const [lastName, setLastName] = useState(userObject["last_name"] || "");
  const [email, setEmail] = useState(userObject["email"] || "");
  const [error, setError] = useState(errorObject);
  const [isFieldDirty, setIsFieldDirty] = useState(false);
  // "idle" | "checking" | "available" — only ever a hint. Two people can read
  // "available" in the same instant; the database rule is what decides.
  const [usernameStatus, setUsernameStatus] = useState("idle");

  useEffect(() => {
    setUsername(userObject["username"] ?? "");
    setTitle(userObject["title"] ?? "");
    setFirstName(userObject["first_name"]);
    setLastName(userObject["last_name"]);
    setEmail(userObject["email"]);
  }, [userObject]);

  useEffect(() => {
    handleFieldEdit(isFieldDirty);
  }, [isFieldDirty, username, title, firstName, lastName, email]);

  useEffect(() => {
    handleError(error);
  }, [error]);

  useEffect(() => {
    setError(errorObject);
  }, [errorObject]);

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setError({ ...error, [name]: { status: false, message: "" } });
    setIsFieldDirty(true);

    if (name === "username") {
      // Cleaned as it is typed, so the field can never hold something the
      // pattern would reject afterwards
      setUsernameStatus("idle");
      setUsername(sanitizeUsername(value));
    } else if (name === "title") {
      setTitle(value.slice(0, TITLE_MAX_LENGTH));
    } else if (name === "first_name") {
      setFirstName(value);
    } else if (name === "last_name") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const checkUsername = async (value) => {
    const { valid, username: candidate, message } = validateUsername(value);

    if (!candidate) {
      setUsernameStatus("idle");
      return;
    }

    if (!valid) {
      setError((prev) => ({
        ...prev,
        username: { status: true, message },
      }));
      setUsernameStatus("idle");
      return;
    }

    setUsernameStatus("checking");

    try {
      const available = await isUsernameAvailable(
        candidate,
        auth.currentUser?.displayName
      );

      setUsernameStatus(available ? "available" : "idle");

      if (!available) {
        setError((prev) => ({
          ...prev,
          username: { status: true, message: "Already taken" },
        }));
      }
    } catch (error) {
      // Save still checks properly, and the rule still has the final word
      setUsernameStatus("idle");
    }
  };

  const handleInputBlur = (event) => {
    const value = event.target.value;
    const field = event.target.name;

    if (OPTIONAL_FIELDS.has(field)) {
      handleUserInputs(field, value.trim());

      if (field === "username") {
        checkUsername(value);
      }

      return;
    }

    if (value?.trim() === "") {
      setError({
        ...error,
        [field]: {
          status: true,
          message: "Can't be empty",
        },
      });
      return;
    } else if (field === "email" && !value.includes("@")) {
      setError({
        ...error,
        [field]: {
          status: true,
          message: "Invalid email address",
        },
      });
      return;
    }

    handleUserInputs(field, value);
  };

  return (
    <div className="px-6 py-2 flex flex-col bg-neutral-light-grey rounded-xl">
      <Input
        id={"username"}
        name={"username"}
        title={"Username"}
        placeholder={"benwright"}
        hasIcon={false}
        value={username}
        onChange={handleChanges}
        onBlur={handleInputBlur}
        error={error["username"]?.status}
        errorMessage={error["username"]?.message}
        profile
      />
      {/* Sits under the field itself, which is the right-hand 7/12 of the row
          from md up */}
      {!error["username"]?.status && usernameStatus !== "idle" && (
        <div className="md:flex md:justify-end">
          <p
            className={`text-xs md:w-7/12 ${
              usernameStatus === "available"
                ? "text-green-600"
                : "text-neutral-grey"
            }`}
          >
            {usernameStatus === "available"
              ? "Available — your page will be at /" + username
              : "Checking…"}
          </p>
        </div>
      )}
      <Input
        id={"first-name"}
        name={"first_name"}
        title={"First name*"}
        placeholder={"Ben"}
        hasIcon={false}
        value={firstName}
        onChange={handleChanges}
        onBlur={handleInputBlur}
        error={error["first_name"]?.status}
        errorMessage={error["first_name"]?.message}
        profile
      />
      <Input
        id={"last-name"}
        name={"last_name"}
        title={"Last name*"}
        placeholder={"Wright"}
        hasIcon={false}
        value={lastName}
        onChange={handleChanges}
        onBlur={handleInputBlur}
        error={error["last_name"]?.status}
        errorMessage={error["last_name"]?.message}
        profile
      />
      <Input
        id={"title"}
        name={"title"}
        title={"Title"}
        placeholder={"Frontend Developer"}
        hasIcon={false}
        value={title}
        onChange={handleChanges}
        onBlur={handleInputBlur}
        error={error["title"]?.status}
        errorMessage={error["title"]?.message}
        profile
      />
      <Input
        id={"email"}
        name={"email"}
        title={"Email"}
        placeholder={"ben@example.com"}
        hasIcon={false}
        value={email}
        onChange={handleChanges}
        onBlur={handleInputBlur}
        error={error["email"]?.status}
        errorMessage={error["email"]?.message}
        profile
      />
    </div>
  );
}
