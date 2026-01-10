"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Scan, PlayCircle } from "lucide-react";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const B2C_REVIEWS = [
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Endkunden_review1.jpg",
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Endkunden_review2.jpg",
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Endkunden_review3.jpg",
    "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Endkunden_review4.jpg",
];

export default function EfficacySlider() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <section className="py-24 px-6 bg-[#FAFAFA] relative overflow-hidden" id="efficacy">
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <span className="text-medical-blue font-bold tracking-widest text-xs uppercase mb-4 block">Proof of Efficacy</span>
                    <h2 className="text-3xl lg:text-4xl font-display font-extrabold mb-4">Wissenschaft, die man sehen kann.</h2>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                        „Wissenschaft, die man sehen kann. Das Pure Bright C7 Serum dient hier als Veranschaulichungsbeispiel: Die sofortige Neutralisierung der Hyperpigmentierung im Labor-Experiment visualisiert die molekulare Kraft unserer Formeln. Es ist der Beweis dafür, wie hochkonzentrierte Wirkstoffe zu echten, sichtbaren Ergebnissen führen – ein Standard, den wir individuell für deine Brand und deine Zielgruppe entwickeln."
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
                            itemOne={<ReactCompareSliderImage src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Pigemntflecke_Veranschulichung_nachher.png" alt="Vorher" />}
                            itemTwo={<ReactCompareSliderImage src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Pigemntflecke_Veranschulichung_nachher(1).png" alt="Nachher" />}
                            className="h-full w-full object-cover"
                        />

                        {/* Labels */}
                        <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold border border-white/10 pointer-events-none">
                            Vorher: Hyper-Pigmentierung
                        </div>
                        <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md text-gray-900 px-4 py-2 rounded-lg text-sm font-bold border border-white/50 pointer-events-none shadow-sm">
                            Nachher: Ebenmäßiges Hautbild
                        </div>
                    </div>
                </motion.div>

                <div className="text-center mb-24">
                    <p className="text-xs text-gray-400 italic mb-6">Visualisierung der Wirkweise: Das Serum neutralisiert Verfärbungen in Echtzeit.</p>
                    <button
                        onClick={() => setIsVideoOpen(true)}
                        className="inline-flex items-center gap-2 text-gray-900 font-bold border-b-2 border-gray-900 hover:text-medical-blue hover:border-medical-blue transition-colors pb-1"
                    >
                        <PlayCircle className="w-5 h-5" />
                        Das ganze Experiment ansehen (Video)
                    </button>
                </div>

                {/* B2C Review Images (Directly below experiment) */}
                <div className="pt-12 border-t border-gray-100">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-display font-bold">Ergebnisse am Kunden.</h3>
                        <p className="text-sm text-gray-500 mt-2">Klicke auf ein Bild, um es zu vergrößern.</p>
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
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-6"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black aspect-video relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video controls autoPlay className="w-full h-full">
                                <source src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Pigmentflecken_Veranschaulichung.mp4" type="video/mp4" />
                            </video>
                            <button onClick={() => setIsVideoOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white bg-black/50 rounded-full p-2 transition-colors">
                                X
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Image Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-6"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={B2C_REVIEWS[selectedImage]}
                                alt={`Customer Review ${selectedImage + 1}`}
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                X
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
