"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Award,
  BarChart3,
  Briefcase,
  Brush,
  CheckCircle2,
  Download,
  GraduationCap,
  LayoutTemplate,
  Layers3,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  MonitorPlay,
  PenTool,
  Phone,
  Sparkles,
  Target,
} from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  location: string;
  desc: string[];
  icon: React.ReactNode;
}

interface SkillCategory {
  domain: string;
  skills: string[];
}

interface MarketingProject {
  name: string;
  campaignType: string;
  spotlight: string;
  focus: string;
  tools: string[];
  outcomes: string[];
  image: string;
  accent: "emerald" | "amber" | "cyan";
}

const accentStyles: Record<
  MarketingProject["accent"],
  {
    badge: string;
    ring: string;
    fallback: string;
  }
> = {
  emerald: {
    badge: "text-emerald-300 bg-emerald-500/15",
    ring: "group-hover:border-emerald-400/50",
    fallback: "from-emerald-500/25 to-emerald-800/30",
  },
  amber: {
    badge: "text-amber-300 bg-amber-500/15",
    ring: "group-hover:border-amber-400/50",
    fallback: "from-amber-500/25 to-rose-800/30",
  },
  cyan: {
    badge: "text-cyan-300 bg-cyan-500/15",
    ring: "group-hover:border-cyan-400/50",
    fallback: "from-cyan-500/25 to-blue-800/30",
  },
};

const marketingValueCards = [
  {
    title: "Performance Marketing",
    detail: "Meta Ads strategy, audience targeting, and campaign iteration loops.",
    icon: <BarChart3 className="h-5 w-5 text-emerald-400" />,
  },
  {
    title: "Creative Production",
    detail: "Product retouching, poster design, and content assets for social channels.",
    icon: <Brush className="h-5 w-5 text-amber-400" />,
  },
  {
    title: "Brand Systems",
    detail: "Visual consistency across rebranding, UI touchpoints, and social identity.",
    icon: <Layers3 className="h-5 w-5 text-cyan-400" />,
  },
];

export default function Resume() {
  const experiences: ExperienceItem[] = [
    {
      role: "Digital Strategist",
      company: "JVO LABS",
      date: "12/2025 - Present",
      location: "Faisalabad, Pakistan",
      desc: [
        "Developed and executed digital marketing strategies to grow brand visibility and measurable business outcomes.",
        "Managed Meta Ads campaigns for lead generation and conversion-focused growth.",
        "Aligned social content, rebranding initiatives, and UI/UX improvements for a stronger digital identity.",
      ],
      icon: <Megaphone className="h-5 w-5 text-emerald-400" />,
    },
    {
      role: "Digital Marketing Intern",
      company: "SAR ZONE",
      date: "08/2025 - 11/2025",
      location: "Faisalabad, Pakistan",
      desc: [
        "Planned and executed social media content calendars across Facebook and Instagram.",
        "Designed posters, social creatives, and branded assets to improve visual consistency.",
        "Produced demo videos and marketing reels for digital channels.",
      ],
      icon: <LayoutTemplate className="h-5 w-5 text-blue-400" />,
    },
    {
      role: "Front End Dev Intern",
      company: "Financial Books",
      date: "07/2024 - 09/2024",
      location: "Faisalabad, Pakistan",
      desc: [
        "Contributed to front-end interfaces for accounting and bookkeeping solutions.",
        "Translated design mockups into responsive and functional web pages.",
      ],
      icon: <MonitorPlay className="h-5 w-5 text-purple-400" />,
    },
    {
      role: "Video Editor",
      company: "Saylani Mass IT Training",
      date: "02/2025 - 05/2025",
      location: "Faisalabad, Pakistan",
      desc: [
        "Built hands-on editing skills in storytelling, transitions, and post-production workflows.",
        "Created polished marketing video outputs using Premiere Pro and After Effects.",
      ],
      icon: <Sparkles className="h-5 w-5 text-orange-400" />,
    },
    {
      role: "Video Animation",
      company: "Saylani Mass IT Training",
      date: "02/2025 - 05/2025",
      location: "Faisalabad, Pakistan",
      desc: [
        "Focused on motion graphics, kinetic typography, and visual storytelling principles.",
        "Delivered 2D animation studies with practical Adobe After Effects workflows.",
      ],
      icon: <MonitorPlay className="h-5 w-5 text-pink-400" />,
    },
    {
      role: "Graphic Designing",
      company: "Saylani Mass IT Training",
      date: "07/2025 - 10/2025",
      location: "Faisalabad, Pakistan",
      desc: [
        "Practiced typography, layout systems, and color theory for brand-first visual design.",
        "Produced marketing assets with Adobe Photoshop, Illustrator, and InDesign.",
      ],
      icon: <PenTool className="h-5 w-5 text-indigo-400" />,
    },
  ];

  const skillCategories: SkillCategory[] = [
    {
      domain: "Marketing & Ads",
      skills: ["Meta Ads", "Campaign Planning", "Social Media Marketing"],
    },
    {
      domain: "Video & Animation",
      skills: ["Adobe Premiere Pro", "Adobe After Effects", "CapCut", "Motion Graphics"],
    },
    {
      domain: "Design & Creative",
      skills: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Canva", "Visual Branding"],
    },
    {
      domain: "Other Tools",
      skills: ["MS Office", "Content Strategy", "Front-End HTML/CSS"],
    },
  ];

  const marketingProjects: MarketingProject[] = [
    {
      name: "Elieens Organic",
      campaignType: "Organic Health & Beauty",
      spotlight: "Product storytelling + paid social execution",
      focus: "Product-focused social growth and Meta Ads execution.",
      tools: ["Adobe Photoshop", "Canva", "Meta Ads", "Content Planning"],
      outcomes: [
        "Retouched product photos into clean, conversion-ready creatives.",
        "Designed branded promotional posters and campaign visuals.",
        "Managed social media posting rhythm and platform consistency.",
        "Ran Facebook and Instagram ad campaigns to drive product awareness and sales.",
      ],
      image: "/brands/eleens-organic.png",
      accent: "emerald",
    },
    {
      name: "Fragrant Fusion",
      campaignType: "Luxury Fragrance Brand",
      spotlight: "Visual identity support + conversion-focused creatives",
      focus: "Visual identity support plus ad-driven reach campaigns.",
      tools: ["Adobe Photoshop", "Meta Ads", "Social Media Marketing", "Creative Design"],
      outcomes: [
        "Enhanced product imagery to improve catalog appeal and social performance.",
        "Created campaign posters and digital creatives for promotional pushes.",
        "Maintained content scheduling and engagement across social channels.",
        "Executed audience-targeted Meta Ads to improve reach and conversions.",
      ],
      image: "/brands/fragrant-fusion.png",
      accent: "amber",
    },
    {
      name: "JVO Labs",
      campaignType: "Software & Digital Services",
      spotlight: "Complete rebranding and digital identity modernization",
      focus: "Full rebranding and digital brand consistency program.",
      tools: ["Brand Strategy", "UI/UX Mockups", "Social Content", "Visual Identity"],
      outcomes: [
        "Led complete rebranding with logo direction, palette, and brand alignment.",
        "Designed UI/UX layouts to improve clarity across digital touchpoints.",
        "Produced social media creatives aligned to the new brand system.",
      ],
      image: "/brands/jvo-logo-page.png",
      accent: "cyan",
    },
  ];

  return (
    <div id="about" className="relative z-20 min-h-screen overflow-hidden bg-[#0a0a0a] px-6 py-28 md:py-32">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" 
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute bottom-1/4 right-0 h-[600px] w-[600px] rounded-full bg-emerald-500/5 blur-[150px]" 
      />

      <div className="relative z-10 mx-auto max-w-6xl text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 md:mb-24"
        >
          <div className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-sm font-semibold uppercase tracking-wide text-transparent">
              Portfolio & CV
            </span>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-6">
            <h2 className="bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-5xl font-extrabold tracking-tighter text-transparent md:text-7xl">
              Hannan Rasool
            </h2>
            <a
              href="https://www.linkedin.com/in/hannan-rasool-7593a8379/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#0a66c2] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#004182]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="space-y-8 lg:col-span-7">
              <p className="max-w-2xl text-xl font-light leading-relaxed text-gray-400 md:text-2xl">
                I build growth-focused campaigns as a <strong className="font-medium text-white">Digital Marketer, Graphic Designer, and Video Editor</strong>, combining creative storytelling with data-minded execution.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/resume/hannan-rasool-resume.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1 hover:shadow-emerald-500/50 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
                  <Download className="h-4 w-4 relative z-10 transition-transform group-hover:-translate-y-0.5" />
                  <span className="relative z-10">Download Resume</span>
                </a>
                <a
                  href="#marketing-projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
                >
                  View Marketing Projects
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl lg:col-span-5 h-full">
              <a href="mailto:hannanrasool3@gmail.com" className="group flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-emerald-500/20 group-hover:text-emerald-400">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-gray-300 transition-colors group-hover:text-white">hannanrasool3@gmail.com</span>
              </a>

              <a href="tel:03391500217" className="group flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-blue-500/20 group-hover:text-blue-400">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-gray-300 transition-colors group-hover:text-white">03391500217</span>
              </a>


            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="space-y-24 lg:col-span-8">
            <section id="experience">
              <div className="mb-10 flex items-center gap-4">
                <Briefcase className="h-8 w-8 text-neutral-400" />
                <h3 className="text-3xl font-bold tracking-tight">Experience</h3>
              </div>

              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    key={exp.role + exp.company}
                    className="group relative rounded-3xl border border-white/5 bg-[#111] p-6 transition-all hover:border-white/10 hover:bg-white/[0.02] md:p-8"
                  >
                    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner">
                          {exp.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white transition-colors group-hover:text-emerald-400">
                            {exp.role}
                          </h4>
                          <h5 className="font-medium text-gray-400">{exp.company}</h5>
                        </div>
                      </div>

                      <div className="text-left md:text-right">
                        <div className="mb-2 inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300">
                          {exp.date}
                        </div>
                        {exp.location ? <p className="text-xs text-gray-500">{exp.location}</p> : null}
                      </div>
                    </div>

                    {exp.desc.length > 0 ? (
                      <ul className="space-y-3 pl-16">
                        {exp.desc.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-gray-400 md:text-base">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-16 lg:col-span-4">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8 flex items-center gap-4">
                <Sparkles className="h-6 w-6 text-neutral-400" />
                <h3 className="text-2xl font-bold tracking-tight">Expertise</h3>
              </div>

              <div className="flex flex-col gap-8">
                {skillCategories.map((cat) => (
                  <div key={cat.domain} className="rounded-3xl border border-white/5 bg-[#111] p-6">
                    <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
                      {cat.domain}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="flex cursor-default items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-sm font-medium text-gray-200 transition-all hover:border-white/20 hover:bg-white/10"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 transition-all hover:border-indigo-500/40"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />

              <div className="relative z-10 mb-6 flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-indigo-400" />
                <h3 className="text-2xl font-bold tracking-tight text-white">Education</h3>
              </div>

              <div className="relative z-10">
                <div className="mb-2 inline-block rounded bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300">
                  02/2023 - Present
                </div>
                <h4 className="mb-2 text-xl font-semibold leading-tight text-white">BS Software Engineering</h4>
                <p className="text-sm text-indigo-200/60">National Institute of Modern Languages (NUML) - Faisalabad</p>
              </div>

              <div className="relative z-10 mt-8 border-t border-indigo-500/20 pt-8">
                <div className="mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-400" />
                  <h4 className="font-semibold text-white">Key Achievement</h4>
                </div>
                <p className="text-sm leading-relaxed text-indigo-200/60">
                  Completed extensive design and editing training with a practical, production-focused learning track.
                </p>
              </div>
            </motion.section>
          </div>
        </div>

        <section className="mt-20">
          <div className="mb-7 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-emerald-400" />
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">Marketing Value Stack</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {marketingValueCards.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:bg-white/[0.05]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  {item.icon}
                </div>
                <h4 className="mb-2 text-base font-semibold text-white">{item.title}</h4>
                <p className="text-sm leading-relaxed text-gray-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <motion.section
          id="marketing-projects"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mt-24"
        >
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Megaphone className="h-7 w-7 text-emerald-400" />
                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">Digital Marketing Projects</h3>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
                Selected campaigns built around branded content, paid social, and audience-first creative strategy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {marketingProjects.map((project, index) => {
              const accent = accentStyles[project.accent];

              return (
                <motion.article
                  key={project.name}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.04] ${accent.ring}`}
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xl font-semibold text-white">{project.name}</h4>
                      <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">{project.campaignType}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${accent.badge}`}>
                      Featured
                    </span>
                  </div>

                  <div className="mb-6 overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={project.image}
                      alt={`${project.name} project preview`}
                      width={1200}
                      height={720}
                      quality={72}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">{project.spotlight}</p>
                  <p className="mb-5 text-sm leading-relaxed text-gray-300">{project.focus}</p>

                  <div className="mb-5 grid grid-cols-3 gap-2">
                    <div className={`rounded-lg border border-white/10 bg-black/20 px-2.5 py-2 text-center text-xs font-semibold ${accent.badge}`}>
                      {project.tools.length} Tools
                    </div>
                    <div className={`rounded-lg border border-white/10 bg-black/20 px-2.5 py-2 text-center text-xs font-semibold ${accent.badge}`}>
                      {project.outcomes.length} Outcomes
                    </div>
                    <div className={`rounded-lg border border-white/10 bg-black/20 px-2.5 py-2 text-center text-xs font-semibold ${accent.badge}`}>
                      Case Card
                    </div>
                  </div>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span key={tool} className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-gray-300">
                        {tool}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-2.5">
                    {project.outcomes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-400">
                        <Target className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </motion.section>
      </div>

      <a
        href="https://wa.me/923391500217"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-110 hover:bg-emerald-400"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
