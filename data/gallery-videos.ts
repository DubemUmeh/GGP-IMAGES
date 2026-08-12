// data/gallery-videos.ts

export interface GalleryVideo {
  /** Cloudinary-hosted video URL, e.g. https://res.cloudinary.com/your-cloud/video/upload/v.../clip.mp4 */
  url: string;
  /** Optional short caption shown under the video */
  caption?: string;
}

export const galleryVideos: GalleryVideo[] = [
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
  { url: "", caption: "A brand new day" },
];
