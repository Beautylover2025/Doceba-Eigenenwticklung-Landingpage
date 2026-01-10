"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
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
                    <a href="#" className="hover:text-gray-600 transition-colors">{t.footer.imprint}</a>
                    <a href="#" className="hover:text-gray-600 transition-colors">{t.footer.privacy}</a>
                    <a href="#" className="hover:text-gray-600 transition-colors">{t.footer.terms}</a>
                </div>
            </div>
        </footer>
    );
}
