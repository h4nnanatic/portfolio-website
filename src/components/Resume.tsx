"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Mail, MapPin, Phone, Award, Sparkles, MonitorPlay, PenTool, LayoutTemplate, Megaphone, CheckCircle2 } from "lucide-react";

export default function Resume() {
    const experiences = [
        {
            role: "Digital Strategist",
            company: "JVO LABS",
            date: "January 2026 - Present",
            location: "",
            desc: [],
            icon: <Megaphone className="w-5 h-5 text-emerald-400" />
        },
        {
            role: "Digital Marketing Intern",
            company: "SAR ZONE",
            date: "08/2025 - 11/2025",
            location: "Faisalabad, Pakistan",
            desc: [
                "SAR ZONE is a fast-growing software house in Pakistan that delivers innovative technology solutions including software development, automation, IoT.",
                "Designed social media posts, event posters, and promotional graphics that strengthened SAR ZONE's visual identity.",
                "Edited demo videos, event highlights, and marketing visuals used across the company's digital platforms."
            ],
            icon: <LayoutTemplate className="w-5 h-5 text-blue-400" />
        },
        {
            role: "Front End Dev Intern",
            company: "Financial Books",
            date: "07/2024 - 09/2024",
            location: "Faisalabad, Pakistan",
            desc: [
                "Financial services provider focusing on book-keeping and accounting.",
                "Contributed to web development projects in a front-end developer role."
            ],
            icon: <MonitorPlay className="w-5 h-5 text-purple-400" />
        },
        {
            role: "Video Editor",
            company: "Saylani Mass IT Training",
            date: "02/2025 - 05/2025",
            location: "Faisalabad, Pakistan",
            desc: [
                "Completed a Video Editing course from Saylani Mass IT Training Center, gaining hands-on experience in editing techniques, storytelling, and post-production.",
                "Worked with industry-standard tools like Adobe Premiere Pro and After Effects focusing on creating professional-quality videos."
            ],
            icon: <Sparkles className="w-5 h-5 text-orange-400" />
        },
        {
            role: "Video Animation",
            company: "Saylani Mass IT Training",
            date: "02/2025 - 05/2025",
            location: "Faisalabad, Pakistan",
            desc: [
                "Completed a Video Animation course at Saylani Mass IT Training Center, learning motion graphics and animation.",
                "Studied 2D animation, motion design, kinetic typography, and visual storytelling using Adobe After Effects and Premiere Pro."
            ],
            icon: <MonitorPlay className="w-5 h-5 text-pink-400" />
        },
        {
            role: "Graphic Designing",
            company: "Saylani Mass IT Training",
            date: "07/2025 - 10/2025",
            location: "Faisalabad, Pakistan",
            desc: [
                "Currently enrolled in a Graphic Designing course, focusing on visual design and branding.",
                "Gaining skills in design principles, typography, layout, color theory, and project execution with tools like Adobe Photoshop, Illustrator, and InDesign."
            ],
            icon: <PenTool className="w-5 h-5 text-indigo-400" />
        }
    ];

    const skillCategories = [
        {
            domain: "Marketing & Ads",
            skills: ["Meta Ads"]
        },
        {
            domain: "Video & Animation",
            skills: ["Adobe Premiere Pro", "Adobe After Effects", "Video Editing", "Animation", "CapCut"]
        },
        {
            domain: "Design & Creative",
            skills: ["Adobe Photoshop", "Adobe Illustrator", "InDesign", "Canva"]
        },
        {
            domain: "Other Tools",
            skills: ["MS Office"]
        }
    ];

    return (
        <div className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-6 overflow-hidden">

            {/* Decorative gradient orbs mapped behind content */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-5xl mx-auto text-white relative z-10">

                {/* Header / Identity Board */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-24"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase">
                            Portfolio & CV
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
                        Hannan Rasool
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
                            I'm a passionate <strong className="text-white font-medium">Video Editor, Graphic Designer, and Digital Marketer</strong> turning ideas into clear and attractive visuals.
                        </p>

                        {/* Contact Grid */}
                        <div className="grid gap-4 bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
                            <a href="mailto:hannanrasool3@gmail.com" className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors">hannanrasool3@gmail.com</span>
                            </a>
                            <a href="tel:03391500217" className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors">03391500217</span>
                            </a>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                </div>
                                <span className="text-gray-400 text-sm md:text-base leading-tight">House 8, St 11, Z Block Madina Town,<br /> Faisalabad, Pakistan</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Dynamic Experience Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column (Experience & Education) */}
                    <div className="lg:col-span-8 space-y-24">

                        <section>
                            <div className="flex items-center gap-4 mb-10">
                                <Briefcase className="w-8 h-8 text-neutral-400" />
                                <h3 className="text-3xl font-bold tracking-tight">Experience</h3>
                            </div>

                            <div className="space-y-6">
                                {experiences.map((exp, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        key={i}
                                        className="group relative bg-[#111] border border-white/5 hover:border-white/10 p-6 md:p-8 rounded-3xl transition-all hover:bg-white/[0.02]"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                                                    {exp.icon}
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                                        {exp.role}
                                                    </h4>
                                                    <h5 className="text-gray-400 font-medium">{exp.company}</h5>
                                                </div>
                                            </div>
                                            <div className="text-left md:text-right">
                                                <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-semibold mb-2">
                                                    {exp.date}
                                                </div>
                                                {exp.location && <p className="text-gray-500 text-xs">{exp.location}</p>}
                                            </div>
                                        </div>

                                        {exp.desc.length > 0 && (
                                            <ul className="space-y-3 pl-16">
                                                {exp.desc.map((item, idx) => (
                                                    <li key={idx} className="text-gray-400 leading-relaxed text-sm md:text-base flex items-start gap-3">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Right Column (Skills & Ed) */}
                    <div className="lg:col-span-4 space-y-16">

                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <Sparkles className="w-6 h-6 text-neutral-400" />
                                <h3 className="text-2xl font-bold tracking-tight">Expertise</h3>
                            </div>

                            <div className="flex flex-col gap-8">
                                {skillCategories.map((cat, i) => (
                                    <div key={i} className="bg-[#111] border border-white/5 p-6 rounded-3xl">
                                        <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-4">
                                            {cat.domain}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.skills.map((skill, idx) => (
                                                <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-200 text-sm font-medium border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-default flex items-center gap-2">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/70" /> {skill}
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
                            className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-8 rounded-3xl relative overflow-hidden group hover:border-indigo-500/40 transition-all"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />

                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <GraduationCap className="w-6 h-6 text-indigo-400" />
                                <h3 className="text-2xl font-bold tracking-tight text-white">Education</h3>
                            </div>

                            <div className="relative z-10">
                                <div className="mb-2 inline-block px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                                    02/2023 - Present
                                </div>
                                <h4 className="text-xl font-semibold text-white mb-2 leading-tight">
                                    BS Software Engineering
                                </h4>
                                <p className="text-indigo-200/60 text-sm">
                                    National Institute of Modern Languages (NUML) — Faisalabad
                                </p>
                            </div>

                            <div className="mt-8 pt-8 border-t border-indigo-500/20 relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <Award className="w-5 h-5 text-amber-400" />
                                    <h4 className="text-white font-semibold">Key Achievement</h4>
                                </div>
                                <p className="text-indigo-200/60 text-sm leading-relaxed">
                                    Successfully completed extensive video and graphic design training prioritizing practical skills and creative direction.
                                </p>
                            </div>

                        </motion.section>

                    </div>

                </div>

            </div>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/923391500217"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 hover:scale-110 transition-all duration-300"
                aria-label="Chat on WhatsApp"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7"
                >
                    <path fillRule="evenodd" d="M11.996 0A12 12 0 0 0 0 12a11.96 11.96 0 0 0 1.603 6.007L.027 23.366l5.525-1.446A11.96 11.96 0 0 0 12 24a12 12 0 0 0 11.996-12A12 12 0 0 0 11.996 0zm7.156 16.945c-.328.92-1.76 1.76-3.21 2.023-.974.175-2.253.257-6.088-1.325-4.52-1.864-7.461-6.438-7.68-6.726-.217-.289-1.85-2.45-1.85-4.675 0-2.224 1.157-3.328 1.564-3.763.406-.436.885-.544 1.18-.544.295 0 .588.005.852.015.276.012.646-.109.986.713.435 1.05 1.066 2.597 1.161 2.784.095.188.158.406.037.644-.122.238-.184.385-.367.595-.183.21-.383.456-.549.613-.183.176-.376.368-.17 718s1.609 2.583 2.658 3.525c1.353 1.213 2.946 1.638 3.447 1.83.5.19 1.002.164 1.366-.192.365-.357 1.563-1.83 1.986-2.46.42-.628.841-.523 1.398-.328.558.196 3.526 1.658 4.128 1.96.602.3 1.006.452 1.151.7.147.25.147 1.455-.18 2.376z" clipRule="evenodd" />
                </svg>
            </a>

        </div>
    );
}
