import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { env } from "../config/env.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function uploadBuffer(
  buffer: Buffer,
  options: { folder?: string } = {},
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: options.folder ?? "sebwa", resource_type: "auto" },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Cloudinary upload failed"));
        resolve(result);
      },
    );
    uploadStream.end(buffer);
  });
}

export function uploadFromPath(
  filePath: string,
  options: { folder?: string; tags?: string[] } = {},
) {
  return cloudinary.uploader.upload(filePath, {
    folder: options.folder ?? "sebwa",
    tags: options.tags,
    resource_type: "auto",
  });
}

export function destroyAsset(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}
