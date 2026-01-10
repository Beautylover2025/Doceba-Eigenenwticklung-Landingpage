"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { trackButtonClick } from "@/lib/analytics";

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

    const handleClick = () => {
        trackButtonClick("Mobile FAB", "Sticky Bottom");
    };

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
                        onClick={handleClick}
                        className="group flex items-center gap-2 bg-white backdrop-blur-md px-4 py-2 rounded-full shadow-2xl border-2 border-gray-100 hover:border-cyan-500 transition-all hover:scale-105"
                    >
                        {/* Avatar */}
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-cyan-500 flex-shrink-0">
                            <img
                                src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/Anita%20Kopf.png"
                                alt="Anita"
                                className="w-full h-full object-cover"
                            />
                            {/* Online indicator */}
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white" />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] text-gray-500 font-medium leading-tight">Anita antwortet dir</span>
                            <span className="text-xs font-bold text-gray-900 leading-tight">Jetzt Termin sichern</span>
                        </div>

                        {/* Arrow */}
                        <ArrowRight className="w-4 h-4 text-cyan-500 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
