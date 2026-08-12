"use client";

import { useRef, useState } from "react";
import { LuPlay, LuVolume2, LuVolumeX } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { galleryVideos } from "@/data/gallery-videos";

/** Cloudinary auto-generates a poster frame if you swap the video extension for .jpg */
function posterFor(url: string): string {
  return url.replace(/\.(mp4|webm|mov)(\?.*)?$/i, ".jpg$2");
}

function VideoCard({ video }: { video: (typeof galleryVideos)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <div className="card-shadow group flex flex-col overflow-hidden rounded-2xl border-2 border-secondary bg-card p-4 transition-transform duration-300 hover:-translate-y-2">
      <Badge className="mb-3 w-fit gap-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary">
        <LuPlay className="h-3 w-3" />
        Behind the Scenes
      </Badge>

      <div
        className="relative aspect-9/16 w-full cursor-pointer overflow-hidden rounded-xl bg-muted"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={video.url}
          poster={posterFor(video.url)}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
          className="h-full w-full object-cover"
        />

        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-transform group-hover:scale-110">
              <LuPlay className="ml-0.5 h-6 w-6" />
            </span>
          </div>
        )}

        {playing && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            {muted ? <LuVolumeX className="h-4 w-4" /> : <LuVolume2 className="h-4 w-4" />}
          </button>
        )}
      </div>

      {video.caption && (
        <p className="mt-3 line-clamp-2 text-sm text-card-foreground/70">{video.caption}</p>
      )}
    </div>
  );
}

export function VideoGallery() {
  return (
    <section className="relative w-full h-full py-5 bg-secondary overflow-hidden p-3">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-brand-tertiary bg-gradient-hero px-5 py-16 md:px-10 md:py-24">
        <div className="relative z-10 mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <span className="text-sm font-semibold tracking-wide text-muted-foreground">
              Our Reels
            </span>
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-wider text-card md:text-4xl">
            Behind the Scenes
          </h2>
          <p className="text-popover text-lg leading-8 tracking-wide">
            A closer look at the work leaving our workshop — printing, packaging, and brand
            builds, one clip at a time.
          </p>
        </div>

        {galleryVideos.length === 0 ? (
          <div className="relative z-10 rounded-2xl border-2 border-dashed border-white/30 bg-white/5 p-12 text-center">
            <p className="text-popover">
              No videos yet — paste a Cloudinary URL into{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-card">
                data/gallery-videos.ts
              </code>{" "}
              to populate this gallery.
            </p>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {galleryVideos.map((video) => (
              <VideoCard key={video.url} video={video} />
            ))}
          </div>
        )}

        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-orange-fixed opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-purple-fixed opacity-20 blur-3xl" />
      </div>
    </section>
  );
}