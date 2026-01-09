"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MobileFAB() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex md:hidden"
                >
                    <Link
                        href="/quiz"
                        className="group flex items-center gap-3 bg-white backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border-2 border-gray-100 hover:border-cyan-500 transition-all hover:scale-105"
                    >
                        {/* Avatar */}
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-500 flex-shrink-0">
                            <img
                                src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Anita%20Kopf.png"
                                alt="Anita"
                                className="w-full h-full object-cover"
                            />
                            {/* Online indicator */}
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-gray-500 font-medium">Anita antwortet dir</span>
                            <span className="text-sm font-bold text-gray-900">Jetzt Termin sichern</span>
                        </div>

                        {/* Arrow */}
                        <ArrowRight className="w-5 h-5 text-cyan-500 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
