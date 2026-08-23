import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { query } from '@/lib/admin/db';
import { optimizedImage, optimizedVideo, poster } from '@/lib/admin/cloudinary';

type PublicGalleryItem = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  cloudinary_public_id: string;
  cloudinary_url: string;
  width: number | null;
  height: number | null;
  alt_text: string | null;
};

async function getPublicGallery() {
  if (!process.env.DATABASE_URL) return [];
  try {
    const r = await query<PublicGalleryItem>(
      'select id,title,description,type,cloudinary_public_id,cloudinary_url,width,height,alt_text from gallery_items where is_published=true order by sort_order, created_at desc',
    );
    return r.rows;
  } catch (error) {
    console.error('Public gallery unavailable', error);
    return [];
  }
}

export async function VideoGallery() {
  const items = await getPublicGallery();

  return (
    <section className="relative h-full w-full overflow-hidden bg-secondary p-3 py-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-brand-tertiary bg-gradient-hero px-5 py-16 md:px-10 md:py-24">
        <div className="relative z-10 mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <span className="text-sm font-semibold tracking-wide text-muted-foreground">
              Our Work
            </span>
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-wider text-card md:text-4xl">
            Recent Projects
          </h2>
          <p className="text-lg leading-8 tracking-wide text-popover">
            A closer look at print, signage, apparel, and brand builds managed
            through the GGP Images gallery.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="relative z-10 rounded-2xl border-2 border-dashed border-white/30 bg-white/5 p-12 text-center">
            <p className="text-popover">No published gallery items yet.</p>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => {
              const isImage = item.type.toLowerCase() === 'image';
              return (
                <article
                  key={item.id}
                  className="card-shadow group flex flex-col overflow-hidden rounded-2xl border-2 border-secondary bg-card p-4 transition-transform duration-300 hover:-translate-y-2"
                >
                  <Badge className="mb-3 w-fit rounded-full bg-secondary text-secondary-foreground hover:bg-secondary">
                    {isImage ? 'Project Image' : 'Project Video'}
                  </Badge>
                  <a
                    href={item.cloudinary_url}
                    target="_self"
                    rel="noreferrer"
                    aria-label={`View full ${isImage ? 'image' : 'video'}: ${item.title}`}
                    className="relative block aspect-4/3 overflow-hidden rounded-xl bg-muted"
                  >
                    {isImage ? (
                      <Image
                        src={optimizedImage(item.cloudinary_public_id, 900)}
                        alt={item.alt_text || item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <video
                        src={optimizedVideo(item.cloudinary_public_id)}
                        poster={poster(item.cloudinary_public_id)}
                        muted
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </a>
                  <h3 className="mt-3 font-semibold text-card-foreground">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-card-foreground/70">
                      {item.description}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-orange-fixed opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-purple-fixed opacity-20 blur-3xl" />
      </div>
    </section>
  );
}