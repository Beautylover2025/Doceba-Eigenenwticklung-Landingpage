"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const TEAM_IMAGES = [
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Anita&Alexandra_Labor_vor%20allen_Produkten.jpg",
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Alexandra%20Labor%202.jpg",
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Natalie%20Labor%20bild.png",
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Alexandra_Anita_labor.JPG",
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Natalie_Labor.JPG",
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Natalie_bild_2.JPG"
];

export default function AboutUs() {
    const { t } = useLanguage();

    return (
        <section className="py-24 px-6 bg-white relative overflow-hidden" id="about">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-medical-blue/5 to-transparent blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Part 1: Split-Screen Story */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
                    {/* Left: Video */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/IMAGE%201.0%20(1).mp4#t=0.1"
                                className="w-full h-full object-cover"
                            >
                                <source src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/IMAGE%201.0%20(1).mp4" type="video/mp4" />
                            </video>
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-medical-blue/20 rounded-full blur-2xl -z-10" />
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="text-medical-blue font-bold tracking-widest text-xs uppercase mb-4 block">
                            {t.aboutUs.badge}
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6 leading-tight">
                            {t.aboutUs.headline}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-blue to-cyan-500">
                                {t.aboutUs.headlineGradient}
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            {t.aboutUs.text1}
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            {t.aboutUs.text2}
                        </p>

                        {/* GMP Certificate */}
                        <div className="mt-8">
                            <img
                                src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Gmp-zertifikat..avif"
                                alt="GMP Zertifikat"
                                className="w-full max-w-md rounded-2xl shadow-lg border border-gray-200"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Part 2: Masonry Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-4">
                            Echte Menschen. Echte Expertise.
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Keine Stock-Fotos. Keine Kulisse. Das ist unser Labor, in dem deine Produkte entstehen.
                        </p>
                    </div>

                    {/* Masonry Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {TEAM_IMAGES.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`relative rounded-2xl overflow-hidden shadow-lg border border-white group cursor-pointer ${index === 0 ? "md:col-span-2 md:row-span-2" : ""
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`Team Member ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white font-bold text-sm">
                                        {index === 0 ? "Anita & Alexandra" : index === 2 || index === 4 ? "Natalie" : "Alexandra"}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
