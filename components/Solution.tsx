"use client";

import { motion } from "framer-motion";
import { BadgeCheck, FileCheck, FlaskConical, Shield, Scale, Sparkles, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Solution() {
    const { t } = useLanguage();

    const SAFETY_POINTS = [
        {
            icon: Scale,
            title: t.solution.safety1Title,
            description: t.solution.safety1Text
        },
        {
            icon: Shield,
            title: t.solution.safety2Title,
            description: t.solution.safety2Text
        },
        {
            icon: Sparkles,
            title: t.solution.safety3Title,
            description: t.solution.safety3Text
        },
        {
            icon: Package,
            title: t.solution.safety4Title,
            description: t.solution.safety4Text
        }
    ];

    return (
        <section className="py-24 px-6 bg-white border-y border-gray-100" id="solution">
            <div className="max-w-6xl mx-auto">

                {/* Original Content */}
                <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <span className="text-medical-blue font-bold tracking-widest text-xs uppercase mb-4 block">{t.solution.badge}</span>
                        <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 text-[#111111]">
                            {t.solution.headline} <br />
                            {t.solution.headline2}
                        </h2>
                        <div className="prose text-gray-500 leading-relaxed mb-8">
                            <p className="mb-4">
                                {t.solution.text1}
                            </p>
                            <p>
                                {t.solution.text2}
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 gap-6">
                        <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 transition-hover hover:shadow-md">
                            <FlaskConical className="w-8 h-8 text-medical-blue mt-1" />
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{t.solution.box1Title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{t.solution.box1Text}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-[#111111] rounded-2xl border border-gray-900 text-white shadow-xl transform lg:-translate-x-8">
                            <FileCheck className="w-8 h-8 text-medical-blue mt-1" />
                            <div>
                                <h3 className="font-bold text-white text-lg">{t.solution.box2Title}</h3>
                                <p className="text-sm text-gray-400 mt-1">{t.solution.box2Text}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 transition-hover hover:shadow-md">
                            <BadgeCheck className="w-8 h-8 text-medical-blue mt-1" />
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{t.solution.box3Title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{t.solution.box3Text}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* NEW: Asset Logic Section */}
                <div className="flex flex-col lg:flex-row gap-16 items-center mb-24 py-16 border-t border-gray-100">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2 text-center lg:text-left"
                    >
                        <h3 className="text-3xl lg:text-4xl font-display font-bold mb-6 text-[#111111]">
                            {t.solution.assetHeadline}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {t.solution.assetText}
                        </p>
                    </motion.div>

                    {/* Product Showcase */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 flex items-center justify-center relative"
                    >
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/10 to-transparent rounded-full blur-3xl" />

                        <div className="relative w-80 h-80 flex items-center justify-center z-10">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-contain drop-shadow-2xl rounded-3xl"
                                style={{
                                    maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
                                    WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
                                }}
                            >
                                <source src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Your%20Brand%20Product%20Clip.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </motion.div>
                </div>

                {/* NEW: Safety Shield Grid */}
                <div className="py-16 border-t border-gray-100">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h3 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-[#111111]">
                            {t.solution.safetyHeadline}
                        </h3>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {SAFETY_POINTS.map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group"
                            >
                                <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 h-full">
                                    <div className="w-14 h-14 bg-medical-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <point.icon className="w-7 h-7 text-medical-blue" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-xl font-display font-bold mb-3 text-gray-900">
                                        {point.title}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {point.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
