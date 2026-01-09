"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

const B2B_REVIEWS = [
    {
        name: "LuHair",
        url: "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/LuHair_Testimonial.mp4"
    },
    {
        name: "Mesinger",
        url: "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Mesinger_Testimonial.mp4"
    },
    {
        name: "Waxhofer",
        url: "https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Waxhofer%20Testimonial.mp4"
    },
];

export default function Reviews() {
    const [playingVideo, setPlayingVideo] = useState<number | null>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const togglePlay = (index: number) => {
        const video = videoRefs.current[index];
        if (!video) return;

        if (playingVideo === index) {
            // Pause current video
            video.pause();
            setPlayingVideo(null);
        } else {
            // Pause any currently playing video
            if (playingVideo !== null && videoRefs.current[playingVideo]) {
                videoRefs.current[playingVideo]?.pause();
            }
            // Play selected video
            video.play();
            setPlayingVideo(index);
        }
    };

    return (
        <section className="py-24 px-6 bg-white overflow-hidden" id="testimonials">
            <div className="max-w-7xl mx-auto">

                {/* B2B Testimonials Section (Portrait Grid) */}
                <div>
                    <div className="text-center mb-16">
                        <span className="text-medical-blue font-bold tracking-widest text-xs uppercase mb-4 block">B2B Partnerschaften</span>
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6 tracking-tight">Was Markeninhaber sagen.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {B2B_REVIEWS.map((review, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative group aspect-[9/16] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-xl"
                            >
                                <video
                                    ref={(el) => {
                                        videoRefs.current[i] = el;
                                    }}
                                    playsInline
                                    preload="metadata"
                                    className="w-full h-full object-cover"
                                    onEnded={() => setPlayingVideo(null)}
                                >
                                    <source src={review.url} type="video/mp4" />
                                </video>

                                {/* Play/Pause Button Overlay */}
                                <div
                                    className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center cursor-pointer"
                                    onClick={() => togglePlay(i)}
                                >
                                    <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-medical-blue border-2 border-white shadow-2xl group-hover:scale-110 transition-transform">
                                        {playingVideo === i ? (
                                            <Pause className="w-8 h-8 fill-current" />
                                        ) : (
                                            <Play className="w-8 h-8 fill-current ml-1" />
                                        )}
                                    </div>
                                </div>

                                {/* Label */}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform pointer-events-none">
                                    <div className="font-display font-bold text-xl">{review.name}</div>
                                    <div className="text-sm opacity-80 uppercase tracking-widest font-medium">Markeninhaber Feedback</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
