import fs from "fs/promises";
import cloudinary from "../config/cloudinary/cloudinary.config";

/**
 * Uploads a file to Cloudinary with retry logic.
 * Automatically deletes local file after successful upload.
 */
export default async function fileUploader(
  file: Express.Multer.File,
  maxRetries = 3,
) {
  let attempt = 0;
  let lastError: unknown;

  // Retry loop
  while (attempt < maxRetries) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "ph-health-care/uploads",
        resource_type: "auto",
      });

      // Upload success — delete local file
      await fs
        .unlink(file.path)
        .catch((err) =>
          console.warn("Warning: failed to delete local file:", err),
        );

      return result;
    } catch (error) {
      attempt++;
      lastError = error;

      console.error(
        `Cloudinary upload failed (attempt ${attempt}/${maxRetries}):`,
        (error as Error).message,
      );

      // Wait before retrying (exponential backoff)
      await new Promise((res) => setTimeout(res, 500 * attempt));
    }
  }

  // All retries failed — delete file to avoid storage buildup
  await fs.unlink(file.path).catch(() => {});

  throw new Error(
    `Failed to upload file to Cloudinary after ${maxRetries} attempts. ${
      (lastError as Error)?.message || ""
    }`,
  );
}
