"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FAQItem {
    question: string;
    answer: string;
    highlight?: boolean;
}

export default function FAQ() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqItems: FAQItem[] = t.faq?.items || [];

    return (
        <section className="py-24 px-6 bg-white" id="faq">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-medical-blue font-bold tracking-widest text-xs uppercase mb-4 block">
                        {t.faq.badge}
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-display font-black mb-6 tracking-tight">
                        {t.faq.headline}
                    </h2>
                    <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                        {t.faq.subheadline}
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqItems.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            className={`border-2 rounded-2xl overflow-hidden transition-all ${faq.highlight && openIndex === index
                                ? "border-medical-blue bg-medical-blue/5"
                                : "border-gray-200 bg-white"
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="text-lg font-display font-bold text-gray-900 pr-4">
                                    {faq.question}
                                </h3>
                                <div className="flex-shrink-0">
                                    {openIndex === index ? (
                                        <Minus className="w-6 h-6 text-medical-blue" strokeWidth={2.5} />
                                    ) : (
                                        <Plus className="w-6 h-6 text-gray-400" strokeWidth={2.5} />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-2">
                                            <p className="text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
