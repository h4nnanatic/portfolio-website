import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const projectInquiryUrl = `https://wa.me/923391500217?text=${encodeURIComponent(
  "Hi Hannan, I'd like to discuss a project.\n\nBrand / business: \nRequired service: \nTimeline: \nBudget: \nProject details: "
)}`;

const services = [
  { title: "Creative Branding", detail: "Give your brand a consistent visual identity.", deliverables: ["Logo direction and visual identity", "Color palette and typography", "Brand guidelines and usage examples"] },
  { title: "Campaign Design", detail: "Turn your campaign idea into a coordinated creative set.", deliverables: ["Campaign concept and key visual", "Promotional posters and banners", "Creative adaptations for selected formats"] },
  { title: "Social Media Creatives", detail: "Keep your social presence recognizable and engaging.", deliverables: ["Branded posts and carousel designs", "Story and promotional templates", "Content visuals sized for your channels"] },
  { title: "Meta Ads", detail: "Plan and refine paid campaigns around your business goals.", deliverables: ["Campaign planning and audience targeting", "Ad creative and campaign setup", "Performance review and optimization"] },
];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="mb-20 rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-950/30 via-[#111] to-[#111] p-6 md:p-10">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">How I can help</p>
      <h3 id="services-heading" className="text-3xl font-bold tracking-tight md:text-4xl">Services built around your brand.</h3>
      <p className="mt-4 max-w-2xl text-gray-400">Choose a focused service or combine creative and marketing support. Final scope and deliverables are agreed before the project starts.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {services.map((service) => (
          <article key={service.title} className="rounded-2xl border border-white/10 bg-black/20 p-6">
            <h4 className="text-xl font-semibold text-white">{service.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">{service.detail}</p>
            <ul className="mt-5 space-y-3">
              {service.deliverables.map((item) => <li key={item} className="flex gap-3 text-sm text-gray-300"><CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <a href={projectInquiryUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-black transition-colors hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400">Let&apos;s Discuss Your Project<ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" /></a>
      <p className="mt-3 text-xs text-gray-500">Opens WhatsApp with a brief you can fill in before sending.</p>
    </section>
  );
}
