"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQS = [
    {
        question: "Wem gehört am Ende die Rezeptur?",
        answer: "100 % Eigentum für dich. Im Gegensatz zum Industriestandard gibt es bei uns kein \"Mieten\" von Rezepturen. Nach Abschluss der Entwicklung bist du der alleinige Rechtsinhaber der IP (Intellectual Property). Du erhältst die vollständige Formel und kannst damit theoretisch überall produzieren lassen.",
        highlight: true
    },
    {
        question: "Woher weiß ich, ob ich mit dem Produkt zufrieden sein werde?",
        answer: "Sicherheit durch Pre-Check. Bevor wir einen Auftrag annehmen oder eine Zahlung erfolgt, führen wir eine Machbarkeitsprüfung durch. Wir setzen nur Projekte um, bei denen wir sicher sind, dass sie technologisch realisierbar sind. Durch die physischen Labormuster (Samples) kannst du das Produkt testen und anpassen, bis es zu 100 % deiner Vision entspricht.",
        highlight: true
    },
    {
        question: "Muss ich selbst chemische Kenntnisse mitbringen?",
        answer: "Nein. Du bringst die Vision und das Marketing-Gen mit, wir liefern die Wissenschaft. Du musst uns lediglich beschreiben, was dein Produkt bewirken soll oder welches Hautgefühl du anstrebst. Wir übersetzen deine Wünsche in eine hochwirksame Rezeptur."
    },
    {
        question: "Sind beim \"IP Builder\" auch Produkte dabei?",
        answer: "Der IP Builder konzentriert sich auf das Herzstück: die Entwicklung deiner einzigartigen Rezeptur inklusive Laborsamples. Möchtest du direkt mit einer verkaufsfertigen Charge (z. B. 100 Stück) starten, ist das Paket Market Launch die richtige Wahl für dich."
    },
    {
        question: "Sind die Produkte sicher?",
        answer: "Absolut. Jedes Produkt durchläuft bei uns die gesetzlich vorgeschriebenen Tests (Mikrobiologie, Stabilität, Keimbelastung). Wir arbeiten strikt nach der EU-Kosmetikverordnung und erstellen den notwendigen Sicherheitsbericht (CPSR), damit dein Produkt rechtssicher auf dem Markt ist.",
        highlight: true
    },
    {
        question: "Wie lange dauert der Prozess?",
        answer: "Eine seriöse Entwicklung inklusive der gesetzlich empfohlenen Stabilitätstests dauert in der Regel ca. 4 bis 6 Monate. Qualität und Sicherheit lassen sich nicht abkürzen, wenn du ein langfristig erfolgreiches Asset aufbauen willst."
    },
    {
        question: "Wie viel Mitspracherecht habe ich?",
        answer: "Volles Mitspracherecht bei maximaler Ehrlichkeit. Wir respektieren deine Wünsche zu 100 %. Sollte ein Wunsch jedoch regulatorisch nicht erlaubt (EU-Recht) oder technologisch instabil sein, kommunizieren wir das offen und schlagen dir sofort funktionierende Alternativen vor."
    }
];

export default function FAQ() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                    {FAQS.map((faq, index) => (
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
