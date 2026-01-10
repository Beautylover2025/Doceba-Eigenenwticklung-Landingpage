"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ReadyCTA() {
    const { t } = useLanguage();

    return (
        <section className="py-24 px-6 text-center bg-gray-50">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6 text-[#111111]">
                {t.readyCta.headline}
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
                {t.readyCta.subheadline}
            </p>
            <Link
                href="/quiz"
                className="inline-flex items-center gap-3 bg-[#111111] text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:bg-medical-blue hover:shadow-lg"
            >
                {t.readyCta.cta}
                <ArrowRight className="w-5 h-5" />
            </Link>
        </section>
    );
}
