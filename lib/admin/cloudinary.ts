import "server-only";
import { createHash } from "node:crypto";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024,
  MAX_VIDEO_BYTES = 100 * 1024 * 1024;

function cfg() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET)
    throw new Error("Cloudinary environment variables are required");
  return {
    cloud: CLOUDINARY_CLOUD_NAME,
    key: CLOUDINARY_API_KEY,
    secret: CLOUDINARY_API_SECRET,
  };
}

function sign(params: Record<string, string | number>, secret: string) {
  const base = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  return createHash("sha1")
    .update(base + secret)
    .digest("hex");
}

export function validateMedia(file: File) {
  const isImage = IMAGE_TYPES.includes(file.type),
    isVideo = VIDEO_TYPES.includes(file.type);

  if (!isImage && !isVideo)
    return { ok: false as const, message: "Unsupported file type" };
  if (isImage && file.size > MAX_IMAGE_BYTES)
    return { ok: false as const, message: "Image exceeds 10MB" };
  if (isVideo && file.size > MAX_VIDEO_BYTES)
    return { ok: false as const, message: "Video exceeds 100MB" };
  return {
    ok: true as const,
    type: isImage ? ("IMAGE" as const) : ("VIDEO" as const),
    resourceType: isImage ? "image" : "video",
  };
}

export function optimizedImage(publicId: string, width = 1200) {
  const { cloud } = cfg();

  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_${width},c_limit/${publicId}`;
}

export function optimizedVideo(publicId: string) {
  const { cloud } = cfg();

  return `https://res.cloudinary.com/${cloud}/video/upload/q_auto/${publicId}.mp4`;
}
export function poster(publicId: string) {
  const { cloud } = cfg();

  return `https://res.cloudinary.com/${cloud}/video/upload/f_jpg,q_auto,w_900/${publicId}.jpg`;
}
export async function uploadToCloudinary(
  file: File,
  folder = "GGP-IMAGES/gallery",
) {
  const c = cfg();
  const validation = validateMedia(file);
  if (!validation.ok)
    throw Object.assign(new Error(validation.message), {
      status: file.size > MAX_IMAGE_BYTES ? 413 : 400,
    });

  const timestamp = Math.round(Date.now() / 1000);
  const params = { folder, timestamp };
  const form = new FormData();

  form.set("file", file);
  form.set("api_key", c.key);
  form.set("timestamp", String(timestamp));
  form.set("folder", folder);
  form.set("signature", sign(params, c.secret));

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${c.cloud}/${validation.resourceType}/upload`,
    { method: "POST", body: form },
  );

  const json = await res.json().catch(() => ({}));

  if (!res.ok)
    throw new Error(json?.error?.message || "Cloudinary upload failed");

  return {
    type: validation.type,
    resourceType: validation.resourceType,
    publicId: json.public_id as string,
    secureUrl: json.secure_url as string,
    width: json.width as number | undefined,
    height: json.height as number | undefined,
    duration: json.duration as number | undefined,
    format: json.format as string | undefined,
    bytes: json.bytes as number | undefined,
  };
}
export async function destroyCloudinary(
  publicId: string,
  resourceType: string,
) {
  const c = cfg();
  const timestamp = Math.round(Date.now() / 1000);
  const params = { public_id: publicId, timestamp };
  const form = new FormData();

  form.set("public_id", publicId);
  form.set("api_key", c.key);
  form.set("timestamp", String(timestamp));
  form.set("signature", sign(params, c.secret));

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${c.cloud}/${resourceType}/destroy`,
    { method: "POST", body: form },
  );

  if (!res.ok) throw new Error("Cloudinary delete failed");
}

// export async function uploadToCloudinary(file: File) {
//   const c = cfg();
//   const validation = validateMedia(file);
//   if (!validation.ok)
//     throw Object.assign(new Error(validation.message), {
//       status: file.size > MAX_IMAGE_BYTES ? 413 : 400,
//     });

//   const timestamp = Math.round(Date.now() / 1000);
//   const folder = "ggp-gallery";
//   const params = { folder, timestamp };
//   const form = new FormData();

//   form.set("file", file);
//   form.set("api_key", c.key);
//   form.set("timestamp", String(timestamp));
//   form.set("folder", folder);
//   form.set("signature", sign(params, c.secret));

//   const res = await fetch(
//     `
//     https://api.cloudinary.com/v1_1/${c.cloud}/${validation.resourceType}/upload`,
//     { method: "POST", body: form },
//   );

//   const json = await res.json().catch(() => ({}));

//   if (!res.ok)
//     throw new Error(json?.error?.message || "Cloudinary upload failed");

//   return {
//     type: validation.type,
//     resourceType: validation.resourceType,
//     publicId: json.public_id as string,
//     secureUrl: json.secure_url as string,
//     width: json.width as number | undefined,
//     height: json.height as number | undefined,
//     duration: json.duration as number | undefined,
//     format: json.format as string | undefined,
//     bytes: json.bytes as number | undefined,
//   };
// }
