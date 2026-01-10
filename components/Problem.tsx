"use client";

import { AlertTriangle, Lock, RefreshCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Problem() {
    const { t } = useLanguage();

    return (
        <section className="py-24 px-6 bg-[#FAFAFA]" id="problem">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 tracking-tight">{t.problem.headline}</h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        {t.problem.subheadline}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-gray-600 leading-relaxed">
                        <p>{t.problem.text1}</p>
                        <p>{t.problem.text2}</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="bg-red-50 p-3 rounded-xl text-red-500 shrink-0">
                                <Lock className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">{t.problem.box1Title}</h4>
                                <p className="text-sm text-gray-500">{t.problem.box1Text}</p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-gray-100" />

                        <div className="flex gap-4 items-start">
                            <div className="bg-orange-50 p-3 rounded-xl text-orange-500 shrink-0">
                                <RefreshCcw className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">{t.problem.box2Title}</h4>
                                <p className="text-sm text-gray-500">{t.problem.box2Text}</p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-gray-100" />

                        <div className="flex gap-4 items-start">
                            <div className="bg-gray-50 p-3 rounded-xl text-gray-900 shrink-0">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">{t.problem.box3Title}</h4>
                                <p className="text-sm text-gray-500">{t.problem.box3Text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
