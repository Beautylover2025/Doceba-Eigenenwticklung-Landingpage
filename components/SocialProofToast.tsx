"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXCLUSIVITY_EVENTS = [
    "Mareike L. (Influencerin) aus Köln hat gerade ihr Erstgespräch gebucht.",
    "Markengründer aus München prüft die IP-Verfügbarkeit für ein eigenes Rezeptur-Asset.",
    "Thomas K. (Unternehmer) aus Hamburg hat sich einen der limitierten Beratungsslots gesichert.",
    "Brandbuilder aus Frankfurt investiert in sein erstes eigenes Marken-Asset.",
    "Unternehmerin aus Berlin freut sich auf ihre Entwicklung und hat ihren Termin reserviert.",
    "Heilpraktikerin aus Stuttgart sichert sich den nächsten freien Entwicklungsslot im Labor.",
];

const MAX_TOASTS_PER_SESSION = 2;
const FIRST_TOAST_DELAY = 15000; // 15 seconds
const SECOND_TOAST_DELAY = 50000; // 50 seconds after first disappears

export default function SocialProofToast() {
    const [currentToast, setCurrentToast] = useState<string | null>(null);
    const [toastCount, setToastCount] = useState(0);

    useEffect(() => {
        // Check localStorage for session count
        const sessionCount = parseInt(localStorage.getItem("socialProofCount") || "0");

        if (sessionCount >= MAX_TOASTS_PER_SESSION) {
            return; // Don't show any more toasts
        }

        setToastCount(sessionCount);

        // First toast
        const firstTimer = setTimeout(() => {
            if (sessionCount < MAX_TOASTS_PER_SESSION) {
                const randomEvent = EXCLUSIVITY_EVENTS[Math.floor(Math.random() * EXCLUSIVITY_EVENTS.length)];
                setCurrentToast(randomEvent);

                const newCount = sessionCount + 1;
                setToastCount(newCount);
                localStorage.setItem("socialProofCount", newCount.toString());

                // Hide after 6 seconds
                setTimeout(() => {
                    setCurrentToast(null);

                    // Second toast
                    if (newCount < MAX_TOASTS_PER_SESSION) {
                        setTimeout(() => {
                            const randomEvent2 = EXCLUSIVITY_EVENTS[Math.floor(Math.random() * EXCLUSIVITY_EVENTS.length)];
                            setCurrentToast(randomEvent2);

                            const finalCount = newCount + 1;
                            setToastCount(finalCount);
                            localStorage.setItem("socialProofCount", finalCount.toString());

                            // Hide after 6 seconds
                            setTimeout(() => {
                                setCurrentToast(null);
                            }, 6000);
                        }, SECOND_TOAST_DELAY);
                    }
                }, 6000);
            }
        }, FIRST_TOAST_DELAY);

        return () => clearTimeout(firstTimer);
    }, []);

    return (
        <AnimatePresence>
            {currentToast && (
                <motion.div
                    initial={{ opacity: 0, y: 20, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 20, x: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-24 md:bottom-6 left-6 z-40 bg-white border border-gray-100 shadow-xl rounded-2xl px-5 py-4 max-w-sm"
                >
                    <div className="flex items-start gap-3">
                        {/* Live indicator */}
                        <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        </div>

                        {/* Text content */}
                        <p className="text-sm text-gray-800 leading-relaxed">
                            {currentToast}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
