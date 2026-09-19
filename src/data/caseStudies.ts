export interface CaseStudy {
  slug: string; name: string; title: string; summary: string; role: string; sector: string; image: string;
  sections: { title: string; text: string; points?: string[] }[];
  contributions: string[];
  gallery?: { src: string; alt: string; caption: string; width: number; height: number }[];
}
export const caseStudies: CaseStudy[] = [
  {
    slug: "dripy", name: "Dripy", title: "From a new dessert idea to a customer-facing launch.",
    summary: "Brand launch and digital marketing for a Faisalabad takeaway brand built around indulgent, customisable desserts.",
    role: "Brand Strategy, Creative Direction & Meta Ads", sector: "Food & Beverage / Faisalabad", image: "/brands/dripy.webp",
    contributions: ["Brand Strategy", "Creative Direction", "Social Media Design", "Meta Ads", "Content Strategy", "Campaign Management", "Copywriting", "Product Marketing", "Launch Strategy"],
    gallery: [
  {
    "src": "/case-studies/dripy/faisalabad-launch.webp",
    "alt": "Dripy: Faisalabad launch teaser",
    "caption": "Faisalabad launch teaser",
    "width": 1122,
    "height": 1402
  },
  {
    "src": "/case-studies/dripy/coming-soon.webp",
    "alt": "Dripy: Coming soon dessert teaser",
    "caption": "Coming soon dessert teaser",
    "width": 1024,
    "height": 1536
  },
  {
    "src": "/case-studies/dripy/dessert-tub.webp",
    "alt": "Dripy: Chocolate and pistachio dessert visual",
    "caption": "Chocolate and pistachio dessert visual",
    "width": 1086,
    "height": 1448
  },
  {
    "src": "/case-studies/dripy/desserts-worth-craving.webp",
    "alt": "Dripy: Desserts worth craving product creative",
    "caption": "Desserts worth craving product creative",
    "width": 1106,
    "height": 1422
  },
  {
    "src": "/case-studies/dripy/pata-lagao-daya.webp",
    "alt": "Dripy: Pata Lagao Daya pop-culture creative",
    "caption": "Pata Lagao Daya pop-culture creative",
    "width": 1091,
    "height": 1442
  },
  {
    "src": "/case-studies/dripy/mogambo.webp",
    "alt": "Dripy: Mogambo Khush Hua pop-culture creative",
    "caption": "Mogambo Khush Hua pop-culture creative",
    "width": 1254,
    "height": 1254
  },
  {
    "src": "/case-studies/dripy/taste-or-trust.webp",
    "alt": "Dripy: Taste or Trust social creative",
    "caption": "Taste or Trust social creative",
    "width": 1198,
    "height": 1313
  },
  {
    "src": "/case-studies/dripy/gta-inspired.webp",
    "alt": "Dripy: GTA-inspired dessert illustration",
    "caption": "GTA-inspired dessert illustration",
    "width": 1123,
    "height": 1400
  },
  {
    "src": "/case-studies/dripy/delivery-humour.webp",
    "alt": "Dripy: Delivery-themed humour creative",
    "caption": "Delivery-themed humour creative",
    "width": 1122,
    "height": 1402
  },
  {
    "src": "/case-studies/dripy/true-love.webp",
    "alt": "Dripy: True love dessert illustration",
    "caption": "True love dessert illustration",
    "width": 1086,
    "height": 1448
  },
  {
    "src": "/case-studies/dripy/social-mockup.webp",
    "alt": "Dripy: Social-feed concept mockup",
    "caption": "Social-feed concept mockup",
    "width": 1024,
    "height": 1536
  }
],
    sections: [
      { title: "About & brief", text: "Dripy launched with Brownie Tubs, Kunafa Tubs, Dripy Brownies, custom sauces and toppings. Its positioning was simple: Not your usual sweet spot. Desserts worth craving. My brief was to build a recognisable local brand, not just a page that sells desserts." },
      { title: "The challenge", text: "A soft launch meant starting without an established customer base and with a limited delivery radius. The brand needed to feel youthful, premium and culturally relevant while setting clear customer expectations.", points: ["Introduce a new dessert brand and build pre-launch curiosity.", "Create a consistent visual identity and memorable personality.", "Generate local awareness and WhatsApp enquiries.", "Communicate delivery limits without creating a disappointing customer experience."] },
      { title: "Brand & creative direction", text: "I developed visual communication around cream and chocolate-brown tones, minimal layouts, premium dessert photography and dripping elements inspired by the logo. Product-led work was balanced with relatable Pakistani humour and cultural references.", points: ["GTA-style concepts and Pakistani pop-culture references.", "Mogambo Khush Hua and Pata Lagao Daya campaign ideas.", "iPhone Duo comparisons, relationship humour and interactive dessert memes.", "Minimal product photography, launch announcements and delivery updates."] },
      { title: "Launch process", text: "The content plan followed the customer from curiosity to ordering.", points: ["Pre-launch: mystery-based Coming Soon visuals with partially hidden desserts.", "Soft launch: menu, pricing, location, hours and takeaway/delivery information, with clear coverage limits.", "Post-launch: actual products, offers, humour-led content and shareable posts aimed at profile visits and enquiries."] },
      { title: "Meta Ads & local acquisition", text: "I set up and managed a Meta messaging campaign targeting customers around Faisalabad. Location-specific targeting and direct-response creative supported the CTA: Order Dripy on WhatsApp." },
      { title: "Customer experience", text: "Brand communication extended beyond advertising into the ordering experience. The tone stayed casual and friendly while the visuals remained premium.", points: ["Delivery availability and messages for out-of-range customers.", "Takeaway encouragement, operating hours and soft-launch expectations.", "WhatsApp ordering, product descriptions and menu communication.", "Instagram captions and engagement content."] },
      { title: "Outcome", text: "Dripy launched with a recognisable identity and a connected approach to design, social content and paid advertising. Branding, cultural content, food visuals and messaging campaigns created a foundation for organic engagement and local customer enquiries." },
    ],
  },
  {
    slug: "givmoo", name: "GivMoo", title: "Connecting the ad, the product and the purchase journey.",
    summary: "UI/UX, e-commerce and paid media work for a purpose-driven US lifestyle marketplace.", role: "UI/UX, Digital Marketing & Meta Ads", sector: "E-commerce / US Marketplace", image: "/brands/givmoo.webp",
    contributions: ["UI/UX Design", "E-commerce Redesign", "Product Page Design", "Checkout UX", "Landing Pages", "Customer Journey Optimisation", "Meta Ads", "Pixel & Event Tracking", "Creative Strategy", "Campaign Management"],
    sections: [
      { title: "About & brief", text: "GivMoo is a purpose-driven lifestyle marketplace built around the idea that everyday purchases can create greater purpose. It combines thoughtfully selected products with quality, trust, community and intentional living. My focus was the complete shopping journey rather than isolated page redesigns." },
      { title: "The challenge", text: "Product discovery, cart and checkout needed a more consistent, conversion-focused experience. The visual language also needed to align with the evolving brand. Because paid campaigns were running alongside the website, advertising and the on-site experience had to work together." },
      { title: "Website & UI/UX redesign", text: "I redesigned key parts of the website around clarity, usability and brand consistency.", points: ["Product pages, product information hierarchy and calls to action.", "Add to Cart interactions and checkout page experience.", "Campaign landing pages and a dedicated Wholesale landing page.", "Website banners, campaign creatives and responsive visual improvements."] },
      { title: "Customer journey & process", text: "I reviewed the connected flow: Ad / Landing Page → Product Discovery → Product Page → Add to Cart → Checkout. The approach was to match the landing experience to the ad, build confidence on the product page and keep cart and checkout simple.", points: ["Product pages: stronger imagery, clear information, trust cues and easier exploration.", "Cart and checkout: fewer distractions and a clearer path toward completing an order.", "Landing pages: focused experiences built for specific customer intent, including wholesale."] },
      { title: "Meta advertising & campaign management", text: "Alongside the website work, I contributed to Meta strategy and campaign execution.", points: ["Sales campaign setup, management, audience and geographic targeting.", "Product campaign planning, creative testing and campaign monitoring.", "Catalogue planning, awareness and retargeting strategy.", "Performance reporting and conversion tracking checks."] },
      { title: "Pixel & event tracking", text: "I investigated duplicated and inflated browser/server events, worked on Meta Pixel troubleshooting and analysed event tracking. This work helped clean up the tracking setup and improve the reliability of campaign data. No numerical uplift is claimed here." },
      { title: "Creative direction", text: "I created and directed paid and organic creatives across beauty, lifestyle, apparel, pet products, gifting and wholesale. The direction evolved toward a cleaner, product-led style: product first, purpose second, with the brand present naturally throughout the experience." },
      { title: "Outcome", text: "The work produced a more structured and consistent digital experience across website and campaigns: clearer product presentation, more focused landing pages, improved cart and checkout UX, and a stronger connection between campaign execution, tracking and creative direction." },
    ],
  },
  {
    slug: "jvo-labs", name: "JVO Labs", title: "Making the digital brand as strong as the technology behind it.",
    summary: "Brand, product and digital growth work connecting technology, user experience and market positioning.", role: "Chief Marketing Officer", sector: "Technology, SaaS & Digital Products", image: "/brands/jvo-logo-page.png",
    contributions: ["UI/UX Design", "Website Redesign", "Landing Page Design", "Brand Strategy", "Creative Direction", "Social Media Management", "LinkedIn Content", "Digital Marketing", "Brand Positioning"],
    sections: [
      { title: "About & brief", text: "JVO Labs works with startups, SaaS businesses and growing companies on AI-powered solutions, MVPs, web and mobile applications, UI/UX, product strategy and engineering support. The brand positions itself as a long-term technology partner that helps businesses plan, build, improve and scale digital products." },
      { title: "My role & progression", text: "I joined as Digital Strategist in December 2025 and was promoted to Chief Marketing Officer in July 2026. My work connects brand strategy, UI/UX, website experience, creative direction, social media and growth positioning. The focus is a modern, premium and business-focused digital identity." },
      { title: "The challenge", text: "Strong technical capabilities were not being communicated as effectively as they could be. The website, landing pages, social presence and visual identity needed a shared direction that presented JVO Labs as a serious technology partner rather than a generic development agency." },
      { title: "UI/UX & website redesign", text: "I contributed to cleaner layouts, stronger hierarchy and clearer service communication. The design direction combined dark minimal surfaces, purple accents, strong typography, modern technology visuals and clear calls to action.", points: ["Improve navigation and structure around services and capabilities.", "Align the website with the brand positioning: Your Next Tech Partner.", "Keep the experience modern without unnecessary complexity.", "Create a more consistent first impression for prospective clients."] },
      { title: "Landing page process", text: "Service and campaign pages followed a focused structure: Clear problem → Clear solution → Strong value → Relevant CTA. Each page was designed around a particular business objective rather than overwhelming visitors with every company capability." },
      { title: "Social media & LinkedIn", text: "I manage social strategy and creative direction with an emphasis on authority, credibility and visibility around technology and digital products.", points: ["Content planning, post design and LinkedIn carousels.", "Founder content and employer branding.", "Technology insights, case studies and client success content.", "Trend-based content with consistent brand communication."] },
      { title: "Creative direction & positioning", text: "A shared visual language uses charcoal backgrounds, purple/violet accents, high-contrast typography, minimal layouts, technology elements and clean 3D visuals. Editorial headlines support a shift from simply developing software to helping businesses plan, build, improve and scale digital products." },
      { title: "Outcome", text: "JVO Labs developed a more consistent professional identity across its website and social platforms, with clearer service communication and more structured social content. The work connects design, marketing, technology and business strategy rather than treating them as separate functions." },
    ],
  },
];
