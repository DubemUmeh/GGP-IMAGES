import type { CoreService } from "@/lib/services";

export type ServiceFaq = { question: string; answer: string };

const faqMap: Record<string, ServiceFaq[]> = {
  "large-format-printing": [
    { question: "What large format printing does GGP Images provide?", answer: "We produce banners, billboards, backdrops, roll-up banners, scaffold wraps, outdoor advertising prints, and event display materials." },
    { question: "Can you recommend a material for outdoor printing?", answer: "Yes. Material and finishing are selected around exposure, viewing distance, installation method, expected lifespan, and budget." },
    { question: "Can you print banners for events in Takoradi?", answer: "Yes. Share the event date, dimensions, quantity, artwork, and installation requirements so we can recommend a suitable production and finishing option." },
    { question: "How do I request a quote for large format printing?", answer: "Use the booking form and provide the size, quantity, artwork status, intended location, deadline, and delivery or installation requirements." },
  ],
  "textile-printing": [
    { question: "What textile printing services do you offer?", answer: "GGP Images provides T-shirt printing, DTF printing, school and corporate uniform printing, church anniversary cloths, ceremonial cloths, scarves, and custom event wear." },
    { question: "Can you print detailed or full-colour designs on clothing?", answer: "Yes. The print method is selected according to the garment, artwork detail, placement, quantity, and desired finish." },
    { question: "Do you print uniforms for schools and businesses?", answer: "Yes. We support branded school uniforms, corporate apparel, team wear, and other group clothing requirements." },
    { question: "What should I provide for a textile printing quote?", answer: "Provide the garment or fabric type, design, sizes, quantity, print locations, deadline, and whether you are supplying the garments." },
  ],
  embroidery: [
    { question: "What can GGP Images embroider?", answer: "We embroider logos, names, crests, and other approved artwork on polos, uniforms, jackets, hoodies, workwear, and towels." },
    { question: "Is embroidery suitable for corporate and school uniforms?", answer: "Yes. Embroidery is particularly useful for uniforms and frequently worn garments where a durable stitched identity mark is required." },
    { question: "Can you embroider an existing company or school logo?", answer: "Yes. Provide the clearest available logo file and we can assess its suitability, placement, size, and stitch requirements." },
    { question: "How do I get an embroidery quote?", answer: "Send the logo or artwork, garment type, quantity, preferred placement, and deadline through the booking or contact form." },
  ],
  "digital-printing": [
    { question: "What digital printing products do you provide?", answer: "Our digital printing service covers business cards, invitation cards, certificates, flyers, brochures, booklets, ID cards, document printing, scanning, lamination, UV DTF, and promotional print materials." },
    { question: "Can GGP Images help prepare artwork for printing?", answer: "Yes. We can review artwork for dimensions, resolution, margins, colour, readability, and file suitability before production." },
    { question: "Do you handle short print runs?", answer: "Yes. Digital printing is suitable for many short and medium production runs where quick setup and consistent detail are important." },
    { question: "How can I request a digital printing quote?", answer: "Provide the item, finished size, quantity, paper or material preference, finishing requirements, artwork status, and deadline." },
  ],
  branding: [
    { question: "What does your branding service include?", answer: "Branding covers identity and rebranding support, packaging, labels, stickers, corporate wear, promotional products, cutting and plottering, and related production." },
    { question: "Can you brand promotional products for businesses?", answer: "Yes. We support branded mugs, pens, keyholders, souvenirs, and other practical promotional items based on the project requirements." },
    { question: "Can you handle both design and production?", answer: "Yes. Where required, GGP Images can support the creative direction and carry approved designs through material selection and production." },
    { question: "What should I include in a branding enquiry?", answer: "Share your brand goal, target audience, required items, quantities, existing logo or guidelines, preferred materials, and deadline." },
  ],
  "visual-production": [
    { question: "What is included in visual production?", answer: "Visual Production includes graphic design, social media designs, website design and development, digital marketing, content, event visual materials, and corporate presentations." },
    { question: "Can visual production support both digital and print campaigns?", answer: "Yes. The service is designed to keep campaign visuals consistent across digital channels, printed materials, presentations, and events." },
    { question: "Do you provide website design and development?", answer: "Yes. Website design and development is one of the visual production subdivisions offered by GGP Images." },
    { question: "How do I start a visual production project?", answer: "Send the project objective, audience, required deliverables, preferred channels, existing brand assets, and deadline so the scope can be assessed." },
  ],
};

export function getServiceFaqs(service: CoreService): ServiceFaq[] {
  return faqMap[service.slug] ?? [
    { question: `What does GGP Images provide under ${service.name}?`, answer: service.description },
    { question: "How do I request this service?", answer: "Use the booking form with your project details, quantity, deadline, artwork status, and delivery requirements." },
    { question: "Can you advise me on materials and production?", answer: "Yes. Production recommendations are based on the intended use, quantity, artwork, finish, timeline, and budget." },
  ];
}
