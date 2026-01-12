"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LegalModal from "./LegalModal";
import { IMPRINT_DE, IMPRINT_EN, PRIVACY_DE, PRIVACY_EN } from "@/lib/legal-content";

export default function Footer() {
    const { t, locale } = useLanguage();
    const [showImprint, setShowImprint] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    const imprintContent = locale === 'de' ? IMPRINT_DE : IMPRINT_EN;
    const privacyContent = locale === 'de' ? PRIVACY_DE : PRIVACY_EN;

    return (
        <>
            <footer className="bg-white border-t border-gray-100">
                {/* Main Footer */}
                <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/DOCEBA-alone-Black-HQ.png"
                            alt="DOCEBA"
                            className="h-8 w-auto"
                        />
                        <span className="text-gray-400">&copy; 2024 Made in Bielefeld.</span>
                    </div>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <button
                            onClick={() => setShowImprint(true)}
                            className="hover:text-gray-600 transition-colors"
                        >
                            {t.footer.imprint}
                        </button>
                        <button
                            onClick={() => setShowPrivacy(true)}
                            className="hover:text-gray-600 transition-colors"
                        >
                            {t.footer.privacy}
                        </button>
                    </div>
                </div>
            </footer>

            {/* Legal Modals */}
            <LegalModal
                isOpen={showImprint}
                onClose={() => setShowImprint(false)}
                title={t.footer.imprint}
                content={imprintContent}
            />
            <LegalModal
                isOpen={showPrivacy}
                onClose={() => setShowPrivacy(false)}
                title={t.footer.privacy}
                content={privacyContent}
            />
        </>
    );
}
