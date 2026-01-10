"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Scan, PlayCircle } from "lucide-react";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/contexts/LanguageContext";

const B2C_REVIEWS = [
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Endkunden_review1.jpg",
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Endkunden_review2.jpg",
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Endkunden_review3.jpg",
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Endkunden_review4.jpg",
];

export default function EfficacySlider() {
    const { t } = useLanguage();
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <section className="py-24 px-6 bg-[#FAFAFA] relative overflow-hidden" id="efficacy">
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <span className="text-medical-blue font-bold tracking-widest text-xs uppercase mb-4 block">{t.efficacy.badge}</span>
                    <h2 className="text-3xl lg:text-4xl font-display font-extrabold mb-4">{t.efficacy.headline}</h2>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                        {t.efficacy.description}
                    </p>
                </div>

                {/* Floating Glass Container */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="rounded-3xl border border-white/50 bg-white/40 backdrop-blur-sm shadow-2xl shadow-gray-200/50 p-2 lg:p-4 mb-8 relative"
                >
                    {/* Slider Wrapper */}
                    <div className="rounded-2xl overflow-hidden border border-gray-200/50 h-[400px] lg:h-[500px] relative">
                        <ReactCompareSlider
                            handle={
                                <div className="w-0.5 h-full bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.8)] relative flex items-center justify-center">
                                    <div className="w-10 h-10 bg-white/90 backdrop-blur rounded-full border border-gray-200 shadow-lg flex items-center justify-center text-gray-700">
                                        <Scan className="w-5 h-5" />
                                    </div>
                                </div>
                            }
                            itemOne={<ReactCompareSliderImage src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Pigemntflecke_Veranschulichung_nachher.png" alt="Before" />}
                            itemTwo={<ReactCompareSliderImage src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Pigemntflecke_Veranschulichung_nachher(1).png" alt="After" />}
                            className="h-full w-full object-cover"
                        />

                        {/* Labels */}
                        <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold border border-white/10 pointer-events-none">
                            {t.efficacy.labelBefore}
                        </div>
                        <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md text-gray-900 px-4 py-2 rounded-lg text-sm font-bold border border-white/50 pointer-events-none shadow-sm">
                            {t.efficacy.labelAfter}
                        </div>
                    </div>
                </motion.div>

                <div className="text-center mb-24">
                    <p className="text-xs text-gray-400 italic mb-6">{t.efficacy.caption}</p>
                    <button
                        onClick={() => setIsVideoOpen(true)}
                        className="inline-flex items-center gap-2 text-gray-900 font-bold border-b-2 border-gray-900 hover:text-medical-blue hover:border-medical-blue transition-colors pb-1"
                    >
                        <PlayCircle className="w-5 h-5" />
                        {t.efficacy.videoButton}
                    </button>
                </div>

                {/* B2C Review Images (Directly below experiment) */}
                <div className="pt-12 border-t border-gray-100">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-display font-bold">{t.efficacy.customerHeadline}</h3>
                        <p className="text-sm text-gray-500 mt-2">{t.efficacy.customerSubheadline}</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {B2C_REVIEWS.map((url, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl transition-all bg-white cursor-pointer group"
                                onClick={() => setSelectedImage(i)}
                            >
                                <img
                                    src={url}
                                    alt={`Customer Review ${i + 1}`}
                                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Video Modal Overlay */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                autoPlay
                                controls
                                playsInline
                                className="w-full h-auto"
                            >
                                <source src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Labor%20Video%20-%20Pure%20Bright%20C7%20Efficacy.mp4" type="video/mp4" />
                            </video>
                            <button
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute top-4 right-4 text-white/70 hover:text-white w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Image Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            key={selectedImage}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            src={B2C_REVIEWS[selectedImage]}
                            alt="Enlarged review"
                            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
