import { LuMail, LuPhone, LuMapPin } from "react-icons/lu";

const cards = [
  {
    icon: LuMail,
    iconBg: "bg-brand-purple-fixed",
    iconColor: "text-primary",
    title: "Email Us",
    description: "For general inquiries and quotes.",
    action: { label: "hello@ggpimages.com", href: "mailto:hello@ggpimages.com" },
  },
  {
    icon: LuPhone,
    iconBg: "bg-brand-orange-fixed",
    iconColor: "text-secondary",
    title: "Call Us",
    description: "Mon-Fri from 9am to 6pm.",
    action: { label: "+91 98765 43210", href: "tel:+919876543210" },
  },
  {
    icon: LuMapPin,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
    title: "Visit Studio",
    description: "ZEN Filling Station via Apremdo New Market, off Apllo, Anaji Rd, Takoradi",
    action: { label: '', href: 'https://maps.app.goo.gl/aKyiTKn95ta1YupU9' }
  },
];

export function ContactInfo() {
  return (
    <div className="flex h-full flex-col space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
        {cards.map(({ icon: Icon, iconBg, iconColor, title, description, action }) => (
          <div
            key={title}
            className="flex items-start gap-4 rounded-[20px] border border-card/40 bg-brand-tertiary p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold text-card tracking-wider">{title}</h3>
              <p className="mb-2 text-popover tracking-wide">{title === 'Visit Studio' ? <a href={action.href} className="hover:underline underline-offset-2">{description}</a> : description}</p>
              {action && (
                <a href={action.href} className="text-sm font-semibold tracking-widest text-card hover:underline underline-offset-2">
                  {action.label}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="group relative mt-6 min-h-75 grow cursor-pointer overflow-hidden rounded-3xl border border-border shadow-sm lg:mt-auto">
        {/* <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp9qUBBRvjH5UOE4gi-_BRzWnPbChIB5DQhjrm4fTgAb1SzLdIj1dZUjrywzJAWF-DMCNPvs_9uNbF8Bzay74C0FAwo6IxtNepx3YoiEk7FVZYlK4g8mNOgDBi5urK_27sce2eatPI6fWJowhg8k3dxcw3ehd3uFlHOFWvsOWykQZTebqFz51sDXIu0w7ELm9kk07n2otm3yixF0Z3u3Gpfixab8ghiiNTmkl4ZIH7VfJB1L6ZiDCMzA"
          alt="Map to GGP Images studio"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        /> */}
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.049261898915!2d-1.7769783!3d4.9314148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe779ea880bf953%3A0x2cf5d82062b9cb22!2sGGP%20IMAGES!5e0!3m2!1sen!2sgh!4v1786413081825!5m2!1sen!2sgh" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="w-full min-h-75 h-full"></iframe>
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        {/* <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-border bg-card/90 px-4 py-2 shadow-md backdrop-blur-sm">
          <LuExternalLink className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-primary">Open in Maps</span>
        </div> */}
      </div>
    </div>
  );
}
