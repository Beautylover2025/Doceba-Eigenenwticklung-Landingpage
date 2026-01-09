"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="relative py-32 px-6 bg-gradient-to-b from-[#111111] to-[#1a1a1a] overflow-hidden">
            {/* Holographic Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
                >
                    <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-400">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 10" />
                        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" />
                    </svg>
                </motion.div>
            </div>

            {/* Floating Product Bottle (Blurred) */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 blur-2xl"
            >
                <img
                    src="/premium-bottle.png"
                    alt=""
                    className="w-full h-full object-contain opacity-30"
                />
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto text-center relative z-10"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-5xl lg:text-7xl font-display font-black mb-8 text-white leading-tight"
                >
                    Hör auf zu suchen.{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        Fang an zu besitzen.
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
                >
                    Du kannst noch Wochen damit verbringen, den „perfekten" Hersteller zu suchen – oder du triffst jetzt die Entscheidung, die dein Business für immer verändert. Wir entwickeln nicht nur ein Produkt. Wir bauen dir ein Asset, das dir gehört.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <Link
                        href="/quiz"
                        className="group inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-6 rounded-full text-xl font-black transition-all hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105 relative overflow-hidden"
                    >
                        <span className="relative z-10">Kostenloses Erstgespräch buchen</span>
                        <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2 relative z-10" />

                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                    </Link>

                    <p className="mt-6 text-sm text-gray-400 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Unverbindlich. Kostenlos. In 15 Minuten weißt du, ob wir zusammenpassen.
                    </p>
                </motion.div>
            </motion.div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-cyan-500/10 to-transparent blur-3xl" />
        </section>
    );
}
