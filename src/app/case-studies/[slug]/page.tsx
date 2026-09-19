import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";
import { projectInquiryUrl } from "@/components/Services";

export const dynamicParams = false;
export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  return { title: `${study.name} Case Study | Hannan Rasool`, description: study.summary, openGraph: { title: `${study.name} | Hannan Rasool`, description: study.summary, images: [study.image] }, twitter: { card: "summary_large_image", title: `${study.name} | Hannan Rasool`, description: study.summary, images: [study.image] } };
}
export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.10),transparent_45%)] px-5 pb-24 pt-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/#marketing-projects" className="inline-block py-3 text-sm text-emerald-300 hover:underline">&larr; Back to selected projects</Link>
        <header className="grid gap-10 border-b border-white/10 py-12 md:grid-cols-[1.6fr_1fr] md:py-20">
          <div><p className="text-xs uppercase tracking-[0.24em] text-emerald-400">{study.name} / Case study</p><h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">{study.title}</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">{study.summary}</p><p className="mt-6 text-sm text-gray-500">By Hannan Rasool</p></div>
          <div className="self-center"><div className="relative h-64 overflow-hidden rounded-3xl border border-white/10 bg-black"><Image src={study.image} alt={`${study.name} brand visual`} fill priority sizes="(max-width: 768px) 90vw, 400px" className="object-contain p-6" /></div><dl className="mt-6 space-y-4 text-sm"><div><dt className="text-gray-500">My role</dt><dd className="mt-1">{study.role}</dd></div><div><dt className="text-gray-500">Industry</dt><dd className="mt-1">{study.sector}</dd></div></dl></div>
        </header>
        {study.metrics && <section aria-label="Initial campaign results" className="my-10 rounded-3xl border border-emerald-400/20 bg-emerald-950/20 p-6 md:p-8"><p className="mb-6 text-xs uppercase tracking-widest text-emerald-300">One initial Meta messaging campaign</p><div className="grid gap-6 sm:grid-cols-3">{study.metrics.map((metric) => <div key={metric.label}><p className="text-3xl font-semibold">{metric.value}</p><p className="mt-2 text-sm text-gray-400">{metric.label}</p></div>)}</div><p className="mt-6 text-xs leading-relaxed text-gray-500">Figures supplied by Hannan Rasool. Messaging conversations are not confirmed orders or revenue; these results do not represent all campaigns.</p></section>}
        <div className="grid gap-12 py-12 lg:grid-cols-[220px_1fr]">
          <aside><nav aria-label="Case study contents" className="lg:sticky lg:top-8"><p className="mb-4 text-xs uppercase tracking-widest text-gray-500">Inside the project</p><ol className="space-y-3">{study.sections.map((section, index) => <li key={section.title}><a className="text-sm text-gray-400 hover:text-emerald-300" href={`#section-${index}`}>{String(index + 1).padStart(2, "0")} / {section.title}</a></li>)}</ol><a className="mt-4 inline-block text-sm text-emerald-300" href="#visuals">Project visuals &darr;</a></nav></aside>
          <div className="space-y-12">{study.sections.map((section, index) => <section key={section.title} id={`section-${index}`} className="scroll-mt-8"><p className="mb-3 text-xs font-medium text-emerald-400">{String(index + 1).padStart(2, "0")}</p><h2 className="text-2xl font-semibold md:text-3xl">{section.title}</h2><p className="mt-5 leading-8 text-gray-300">{section.text}</p>{section.points && <ul className="mt-5 space-y-3 border-l border-emerald-400/30 pl-5">{section.points.map((point) => <li key={point} className="text-sm leading-7 text-gray-400">{point}</li>)}</ul>}</section>)}</div>
        </div>
        <section id="visuals" className="border-t border-white/10 py-12"><h2 className="text-3xl font-semibold">Project visuals</h2><p className="mt-3 text-sm text-gray-400">{slug === "jvo-labs" ? "Existing JVO Labs website design export. Open the image to inspect the full layout." : "Supplied brand visual. Campaign creative sets and final screen exports are not included in this gallery yet."}</p><a href={slug === "jvo-labs" ? "/uiux/jvo-labs/Homepage%20with%20Industries%20Section%20-%20JVO%20Labs.png" : study.image} target="_blank" rel="noopener noreferrer" className="mt-6 block rounded-2xl border border-white/10 bg-black p-4"><Image src={slug === "jvo-labs" ? "/uiux/jvo-labs/Homepage%20with%20Industries%20Section%20-%20JVO%20Labs.png" : study.image} alt={slug === "jvo-labs" ? "JVO Labs homepage design with industries section" : `${study.name} supplied brand artwork`} width={1200} height={900} sizes="(max-width: 768px) 90vw, 1100px" className="max-h-[650px] w-full object-contain" /><span className="mt-4 block text-center text-sm text-emerald-300">Open full image &nearr;</span></a></section>
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10"><h2 className="text-2xl font-semibold">My contribution</h2><ul className="mt-5 flex flex-wrap gap-2">{study.contributions.map((item) => <li key={item} className="rounded-full border border-white/10 px-3 py-2 text-xs text-gray-300">{item}</li>)}</ul><a href={projectInquiryUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-black hover:bg-emerald-300">Let&apos;s Discuss Your Project &nearr;</a></section>
        <nav aria-label="More case studies" className="mt-12 grid gap-4 sm:grid-cols-2">{caseStudies.filter((item) => item.slug !== slug).map((item) => <Link key={item.slug} href={`/case-studies/${item.slug}`} className="rounded-2xl border border-white/10 p-6 hover:border-emerald-400/40"><p className="text-xs text-gray-500">Explore another project</p><p className="mt-2 text-xl">{item.name} &rarr;</p></Link>)}</nav>
      </div>
    </main>
  );
}
