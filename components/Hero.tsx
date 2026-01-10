"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Award } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { trackButtonClick } from "@/lib/analytics";

const INGREDIENTS = ["Ectoin", "Niedermolekulares Hyaluron", "Peptide"];

export default function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % INGREDIENTS.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[95vh] flex flex-col lg:flex-row items-center justify-between overflow-hidden pt-24 lg:pt-0 bg-white">

            {/* Holographic Overlay now moved inside Video Container below */}

            {/* Text Content (Left) */}
            <div className="w-full lg:w-1/2 px-6 lg:pl-20 xl:pl-32 z-20 flex flex-col justify-center h-full order-1 lg:order-1 mt-12 lg:mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Enhanced Metallic Badges */}
                    <div className="flex flex-wrap gap-4 mb-10">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm transition-transform hover:scale-105 cursor-default">
                            <ShieldCheck className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">GMP Zertifiziert</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm transition-transform hover:scale-105 cursor-default">
                            {/* Germany Flag Circle */}
                            <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
                                <div className="h-1/3 bg-black" />
                                <div className="h-1/3 bg-red-600" />
                                <div className="h-1/3 bg-yellow-400" />
                            </div>
                            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Made in Germany</span>
                        </div>
                    </div>

                    <h1 className="font-display text-5xl lg:text-[5.5rem] font-extrabold leading-[1.05] mb-8 tracking-tight text-[#111111]">
                        SCHLUSS MIT <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">MIET-KOSMETIK.</span>
                    </h1>

                    <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-900">
                        Deine Marke. Deine Rezeptur.
                    </h2>

                    <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed font-medium">
                        Entwickle deine eigene High-End Kosmetik im GMP-zertifizierten Labor.
                        Ohne Knebelverträge. Ohne Buyout-Kosten. <strong className="text-gray-900 font-bold">Mit 100% Eigentumsrecht.</strong>
                    </p>

                    <Link
                        href="/quiz"
                        onClick={() => trackButtonClick("Hero CTA", "Hero Section")}
                        className="group inline-flex items-center gap-3 bg-[#111111] text-white px-10 py-5 rounded-full text-lg font-bold transition-all hover:bg-medical-blue hover:shadow-xl hover:shadow-medical-blue/20 hover:-translate-y-1 relative overflow-hidden"
                    >
                        <span className="relative z-10">Entwicklung anfragen</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity" />
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" />
                    </Link>

                    <p className="mt-6 text-xs text-gray-400 flex items-center gap-2 font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Aktuell 2 Labor-Plätze für diesen Monat verfügbar.
                    </p>
                </motion.div>
            </div>

            {/* Video Visual (Right) */}
            <div className="w-full lg:w-1/2 h-[50vh] lg:h-[100vh] order-2 lg:order-2 relative flex items-center justify-center">
                {/* Holographic Sci-Fi Overlay - Inside Video Container */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center font-mono overflow-hidden"
                >
                    <svg viewBox="0 0 400 400" className="w-full h-full text-indigo-600 opacity-40">
                        {/* Rotating Outer Rings */}
                        <motion.circle
                            cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.circle
                            cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 15"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Analytical Nodes & Lines */}
                        <g className="opacity-80">
                            {[
                                { x: 140, y: 150, label: "MOLECULAR SCAN: ACTIVE" },
                                { x: 260, y: 160, label: "VISCOSITY: OPTIMAL" },
                                { x: 200, y: 280, label: "STABILITY: 100%" },
                                { x: 120, y: 250, label: "PH LEVEL: 5.5" }
                            ].map((node, i) => (
                                <motion.g
                                    key={i}
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 2 + i, repeat: Infinity }}
                                >
                                    <circle cx={node.x} cy={node.y} r="2" fill="currentColor" />
                                    <circle cx={node.x} cy={node.y} r="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                    <line x1="200" y1="200" x2={node.x} y2={node.y} stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
                                    <text x={node.x + 8} y={node.y + 4} fill="currentColor" fontSize="6" className="tracking-tighter font-bold uppercase">
                                        {node.label}
                                    </text>
                                </motion.g>
                            ))}
                        </g>

                        {/* Scanning Light Beam */}
                        <motion.rect
                            x="0" y="0" width="400" height="2" fill="url(#beam-gradient-video)"
                            animate={{ y: [120, 280, 120] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="opacity-30"
                        />

                        <defs>
                            <linearGradient id="beam-gradient-video" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Dynamic Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                </motion.div>

                {/* Ingredient Overlay Animation - Now visible on mobile */}
                <div className="absolute top-1/4 right-10 lg:right-20 z-30 pointer-events-none">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/80 backdrop-blur-md border border-white/50 shadow-lg px-6 py-3 rounded-2xl text-sm font-bold text-gray-600 flex items-center gap-3"
                        >
                            <div className="w-2 h-2 rounded-full bg-medical-blue shadow-[0_0_10px_rgba(0,71,171,0.5)]" />
                            {INGREDIENTS[index]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    {/* Gradient Mask for Seamless Studio Look */}
                    <div className="w-full h-full relative" style={{
                        maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
                    }}>
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover lg:object-contain"
                        >
                            <source src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Lab%20Video%20Mixing%20Clip.mp4" type="video/mp4" />
                        </video>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
