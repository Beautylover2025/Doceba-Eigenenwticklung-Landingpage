"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { useLanguage } from "@/contexts/LanguageContext";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
    const { showBanner, grantConsent } = useCookieConsent();
    const { t } = useLanguage();

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            {/* Icon */}
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Cookie className="w-6 h-6 text-gray-700" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {t.cookieConsent.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {t.cookieConsent.description}
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => grantConsent('necessary')}
                                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                                >
                                    {t.cookieConsent.necessary}
                                </button>
                                <button
                                    onClick={() => grantConsent('all')}
                                    className="px-6 py-3 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors whitespace-nowrap"
                                >
                                    {t.cookieConsent.acceptAll}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
