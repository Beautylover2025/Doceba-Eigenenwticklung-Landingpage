"use client";

import { ArrowRight } from "lucide-react";
import { trackButtonClick } from "@/lib/analytics";

export default function CTAButton() {
    const scrollToPricing = () => {
        trackButtonClick("CTA Button", "Mid-Page");
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <button
                    onClick={scrollToPricing}
                    className="hidden md:inline-flex items-center gap-3 bg-[#111111] text-white px-10 py-5 rounded-full text-lg font-bold transition-all hover:bg-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-1 shadow-xl group"
                >
                    Jetzt kostenloses Gespräch buchen
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </section>
    );
}
