export function generateId(length = 5) {
  // Define the character set containing uppercase letters and digits
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // Create an empty string to store the ID
  let id = "";

  // Loop for the desired length of the ID
  for (let i = 0; i < length; i++) {
    // Select a random character from the character set
    id += chars[Math.floor(Math.random() * chars.length)];
  }

  // Return the generated ID
  return id;
}

// Profiles are keyed by the generated id, and the Realtime Database rejects
// paths containing ".", "#", "$", "[" or "]" — so anything that is not one of
// our ids (an OAuth provider overwriting displayName with a real name, say)
// must never be turned into a path
export function isProfileId(value) {
  return typeof value === "string" && /^[A-Z0-9]{5,}$/.test(value);
}

// Joins the name parts of a profile, tolerating missing or blank ones
export function formatFullName(profile) {
  return [profile?.first_name, profile?.last_name]
    .filter((part) => part && part.trim())
    .join(" ")
    .trim();
}

// Single source of truth for the document title, so every route agrees
export function buildDocumentTitle(profile) {
  const fullName = formatFullName(profile);
  return fullName ? `Devlinks | ${fullName}` : "Devlinks";
}

// Downscale an image file and return it as a JPEG data URL, small enough to be
// stored directly in the Realtime Database (no Cloud Storage bucket needed).
// Also reports the original dimensions so the caller can validate them.
export function resizeImageToDataURL(file, maxSize = 256, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const objectURL = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectURL);

      // Never upscale: a 100x100 picture stays 100x100
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const context = canvas.getContext("2d");
      // JPEG has no alpha channel, so transparent PNG areas become white
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve({
        dataURL: canvas.toDataURL("image/jpeg", quality),
        width: img.width,
        height: img.height,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectURL);
      reject(new Error("Image could not be read"));
    };

    img.src = objectURL;
  });
}
