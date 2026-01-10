"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Pricing() {
    const { t } = useLanguage();

    return (
        <section className="py-24 px-6 bg-white" id="pricing">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4 tracking-tight">{t.pricing.headline}</h2>
                    <p className="text-gray-500">{t.pricing.subheadline}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

                    {/* Option 1: IP Builder */}
                    <div className="flex flex-col p-8 pb-12 rounded-3xl border border-gray-100 bg-white text-center group hover:border-gray-300 transition-colors">
                        <h3 className="text-lg font-medium text-gray-500 mb-2">{t.pricing.tier1Name}</h3>
                        <div className="text-4xl font-bold mb-4 font-display">{t.pricing.tier1Price} € <span className="text-sm font-normal text-gray-400">{t.pricing.currency}</span></div>
                        <p className="text-sm text-gray-400 mb-8 italic min-h-[40px]">{t.pricing.tier1Desc}</p>

                        <div className="flex-grow">
                            <ul className="space-y-4 text-left text-sm text-gray-600 mb-8">
                                {t.pricing.tier1Features?.map((feature: string, i: number) => (
                                    <li key={i} className="flex gap-2">
                                        <Check className={`w-4 h-4 shrink-0 ${i === 1 ? 'text-gray-900 font-medium' : 'text-gray-400'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href="/quiz" className="block w-full py-3 rounded-xl border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 transition-colors">
                            {t.pricing.tier1Cta}
                        </Link>
                    </div>

                    {/* Option 2: Market Launch (Highlighted) */}
                    <div className="flex flex-col relative p-8 pb-12 rounded-3xl bg-[#111111] text-white text-center shadow-2xl transform md:-translate-y-4">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-medical-blue text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-medical-blue/30">
                            {t.pricing.tier2Badge}
                        </div>
                        <h3 className="text-lg font-medium text-gray-400 mb-2">{t.pricing.tier2Name}</h3>
                        <div className="text-4xl font-bold mb-4 font-display">{t.pricing.tier2Price} € <span className="text-sm font-normal text-gray-500">{t.pricing.currency}</span></div>
                        <p className="text-sm text-gray-400 mb-8 min-h-[40px]">{t.pricing.tier2Desc}</p>

                        <div className="flex-grow">
                            <ul className="space-y-4 text-left text-sm text-gray-300 mb-8 px-4">
                                {t.pricing.tier2Features?.map((feature: string, i: number) => (
                                    <li key={i} className="flex gap-3">
                                        <Check className="w-4 h-4 text-medical-blue shrink-0" />
                                        {i === 0 ? <strong>{feature}</strong> : feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href="/quiz" className="block w-full py-4 rounded-xl bg-medical-blue text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20">
                            {t.pricing.tier2Cta}
                        </Link>
                    </div>

                    {/* Option 3: Enterprise */}
                    <div className="flex flex-col p-8 pb-12 rounded-3xl border border-gray-100 bg-white text-center group hover:border-gray-300 transition-colors">
                        <h3 className="text-lg font-medium text-gray-500 mb-2">{t.pricing.tier3Name}</h3>
                        <div className="text-4xl font-bold mb-4 font-display">{t.pricing.tier3Price}</div>
                        <p className="text-sm text-gray-400 mb-8 italic min-h-[40px]">{t.pricing.tier3Desc}</p>

                        <div className="flex-grow">
                            <ul className="space-y-4 text-left text-sm text-gray-600 mb-8">
                                {t.pricing.tier3Features?.map((feature: string, i: number) => (
                                    <li key={i} className="flex gap-2">
                                        <Check className="w-4 h-4 text-gray-400 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href="/quiz" className="block w-full py-3 rounded-xl border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 transition-colors">
                            {t.pricing.tier3Cta}
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
