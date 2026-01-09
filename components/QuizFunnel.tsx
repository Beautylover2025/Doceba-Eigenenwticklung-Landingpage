"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import clsx from "clsx";
import { useFunnelTracker } from "@/hooks/useFunnelTracker";
import { trackQuizAnswer } from "@/lib/analytics";
import Link from "next/link";

type FunnelData = {
    status: string;
    interest: string;
    painPoint: string;
    budget: "yes" | "unsure" | "no";
    timeline: string;
    firstName: string;
    lastName: string; // Added optional field for company/social
    company: string;
    email: string;
    phone: string;
};

// Updated Steps based on new script
const TOTAL_STEPS = 6;

export default function QuizFunnel() {
    const { trackStep } = useFunnelTracker();

    const [currentStep, setCurrentStep] = useState(0); // 0-based index
    const [direction, setDirection] = useState(1);
    const [data, setData] = useState<FunnelData>({
        status: "",
        interest: "",
        painPoint: "",
        budget: "unsure",
        timeline: "",
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleNext = (key: keyof FunnelData, value: any) => {
        setData((prev) => ({ ...prev, [key]: value }));
        trackStep(`step_${currentStep + 1}`, { [key]: value });

        // Logic: Budget Check (Step 3 -> 4 in 0-indexed terms)
        // Script Question 4 is Index 3
        if (key === "budget" && value === "no") {
            trackStep("dropout_budget_low", { budget: "no" });
            setTimeout(() => setCurrentStep(99), 300); // 99 = Disqualified
            return;
        }

        if (currentStep < TOTAL_STEPS - 1) {
            setDirection(1);
            setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
        }
    };

    const handleBack = () => {
        setDirection(-1);
        setCurrentStep((prev) => Math.max(0, prev - 1));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        trackStep("submission_completed", data);
        setIsSubmitted(true);
    };

    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 }),
    };

    const OptionButton = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
        <button
            onClick={onClick}
            className={clsx(
                "w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden",
                selected
                    ? "border-medical-blue bg-gradient-to-br from-medical-blue/10 to-cyan-50 shadow-lg shadow-medical-blue/20 scale-[1.02]"
                    : "border-gray-200 bg-white hover:border-medical-blue/40 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1"
            )}
        >
            <div className="flex items-center justify-between relative z-10">
                <span className={clsx("font-semibold text-lg", selected ? "text-medical-blue" : "text-gray-800")}>{label}</span>
                {selected && (
                    <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    </div>
                )}
            </div>
            {/* Subtle gradient overlay on hover */}
            {!selected && (
                <div className="absolute inset-0 bg-gradient-to-br from-medical-blue/0 to-cyan-500/0 group-hover:from-medical-blue/5 group-hover:to-cyan-500/5 transition-all duration-300 rounded-2xl" />
            )}
        </button>
    );

    return (
        <div className="w-full max-w-xl mx-auto min-h-[500px]">

            {/* Disqualified View */}
            {currentStep === 99 ? (
                <div className="text-center animate-in fade-in zoom-in duration-500 py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <X className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4">Das passt aktuell leider nicht.</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Da wir jedes Projekt individuell entwickeln, ist unser Service erst ab einem Budget von 5.000 € möglich.
                        Wir empfehlen dir unsere "White Label" Partnerliste oder unseren Newsletter für Starter.
                    </p>
                    <Link href="/" className="text-medical-blue font-medium hover:underline">Zurück zur Startseite</Link>
                </div>
            ) : isSubmitted ? (
                // Calendly View
                <div className="text-center animate-in fade-in zoom-in duration-500 py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-4">Profil gespeichert.</h3>
                    <p className="text-gray-600 mb-8">
                        Vielen Dank, {data.firstName}. Unsere Experten-Slots sind begrenzt. <br />
                        Bitte sichere dir jetzt dein 15-minütiges Strategie-Gespräch.
                    </p>
                    {/* Calendly Inline Widget Placeholder */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-[600px] flex items-center justify-center text-gray-400">
                        Calendly Inline Widget würde hier laden...
                    </div>
                </div>
            ) : (
                <div>
                    {/* Progress Header */}
                    <div className="mb-10">
                        <div className="flex justify-between text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                            <span>Analyse Fortschritt</span>
                            <span>{Math.round(((currentStep + 1) / TOTAL_STEPS) * 100)}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-medical-blue"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <AnimatePresence mode="wait" custom={direction}>

                            {/* Question 1: Status Quo */}
                            {currentStep === 0 && (
                                <motion.div key="step0" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <h3 className="text-3xl font-display font-bold mb-8">Wo stehst du aktuell mit deinem Vorhaben?</h3>
                                    <div className="space-y-4">
                                        <OptionButton label="Ich bin ganz am Anfang (Idee & Konzept)" selected={data.status === "idea"} onClick={() => handleNext("status", "idea")} />
                                        <OptionButton label="Ich bin bereits selbstständig (Kosmetikerin/Heilpraktiker)" selected={data.status === "self-employed"} onClick={() => handleNext("status", "self-employed")} />
                                        <OptionButton label="Ich habe bereits eine Marke (Wechsel)" selected={data.status === "brand-owner"} onClick={() => handleNext("status", "brand-owner")} />
                                        <OptionButton label="Influencer / Creator" selected={data.status === "creator"} onClick={() => handleNext("status", "creator")} />
                                    </div>
                                </motion.div>
                            )}

                            {/* Question 2: Product Interest */}
                            {currentStep === 1 && (
                                <motion.div key="step1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <h3 className="text-3xl font-display font-bold mb-8">In welche Richtung soll dein Produkt gehen?</h3>
                                    <div className="space-y-4">
                                        <OptionButton label="High-Performance Skincare (Anti-Aging, Problemhaut)" selected={data.interest === "skincare"} onClick={() => handleNext("interest", "skincare")} />
                                        <OptionButton label="Body & Wellness" selected={data.interest === "body"} onClick={() => handleNext("interest", "body")} />
                                        <OptionButton label="Reinigung & Basis-Pflege" selected={data.interest === "base"} onClick={() => handleNext("interest", "base")} />
                                        <OptionButton label="Spezifische Spezial-Idee" selected={data.interest === "special"} onClick={() => handleNext("interest", "special")} />
                                    </div>
                                </motion.div>
                            )}

                            {/* Question 3: Pain Point */}
                            {currentStep === 2 && (
                                <motion.div key="step2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <h3 className="text-3xl font-display font-bold mb-8">Was ist dir am wichtigsten?</h3>
                                    <div className="space-y-4">
                                        <OptionButton label="100% Rezeptur-Eigentum (Kein Buyout)" selected={data.painPoint === "ownership"} onClick={() => handleNext("painPoint", "ownership")} />
                                        <OptionButton label="Qualität Made in Germany & GMP" selected={data.painPoint === "quality"} onClick={() => handleNext("painPoint", "quality")} />
                                        <OptionButton label="Regulatory & Sicherheits-Support" selected={data.painPoint === "support"} onClick={() => handleNext("painPoint", "support")} />
                                        <OptionButton label="Schnelligkeit & Zuverlässigkeit" selected={data.painPoint === "speed"} onClick={() => handleNext("painPoint", "speed")} />
                                    </div>
                                </motion.div>
                            )}

                            {/* Question 4: Budget Check (Filter) */}
                            {currentStep === 3 && (
                                <motion.div key="step3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <h3 className="text-3xl font-display font-bold mb-2">Budget Check</h3>
                                    <p className="text-lg text-gray-500 mb-8">Unsere individuelle Entwicklung (inkl. IP-Rechte & Labor) startet ab 5.000 € netto. Passt das?</p>
                                    <div className="space-y-4">
                                        <OptionButton label="Ja, ich investiere in Qualität." selected={data.budget === "yes"} onClick={() => handleNext("budget", "yes")} />
                                        <OptionButton label="Ich bin mir unsicher, brauche Infos." selected={data.budget === "unsure"} onClick={() => handleNext("budget", "unsure")} />
                                        <OptionButton label="Nein, ich suche günstige Standard-Lösungen." selected={data.budget === "no"} onClick={() => handleNext("budget", "no")} />
                                    </div>
                                </motion.div>
                            )}

                            {/* Question 5: Timeline */}
                            {currentStep === 4 && (
                                <motion.div key="step4" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <h3 className="text-3xl font-display font-bold mb-8">Wann möchtest du launchen?</h3>
                                    <div className="space-y-4">
                                        <OptionButton label="So schnell wie möglich (3-6 Monate)" selected={data.timeline === "fast"} onClick={() => handleNext("timeline", "fast")} />
                                        <OptionButton label="In den nächsten 6-12 Monaten" selected={data.timeline === "medium"} onClick={() => handleNext("timeline", "medium")} />
                                        <OptionButton label="Noch kein fester Zeitplan" selected={data.timeline === "slow"} onClick={() => handleNext("timeline", "slow")} />
                                    </div>
                                </motion.div>
                            )}

                            {/* Question 6: Lead Capture */}
                            {currentStep === 5 && (
                                <motion.div key="step5" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <h3 className="text-3xl font-display font-bold mb-2">Fast geschafft.</h3>
                                    <p className="text-gray-500 mb-8">Wohin dürfen wir uns melden, um dein Konzept zu besprechen?</p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text" required placeholder="Vorname"
                                                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue transition-all"
                                                value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })}
                                            />
                                            <input
                                                type="text" required placeholder="Nachname"
                                                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue transition-all"
                                                value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })}
                                            />
                                        </div>
                                        <input
                                            type="text" placeholder="Firma / Social Media Handle (Optional)"
                                            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue transition-all"
                                            value={data.company} onChange={e => setData({ ...data, company: e.target.value })}
                                        />
                                        <input
                                            type="email" required placeholder="E-Mail Adresse"
                                            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue transition-all"
                                            value={data.email} onChange={e => setData({ ...data, email: e.target.value })}
                                        />
                                        <input
                                            type="tel" required placeholder="Mobilnummer (für Rückfragen)"
                                            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue transition-all"
                                            value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })}
                                        />

                                        <button type="submit" className="w-full bg-[#111111] text-white font-bold py-5 rounded-xl mt-6 hover:bg-medical-blue transition-colors flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                            Jetzt Analyse senden & Termin wählen
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>

                    {currentStep < TOTAL_STEPS - 1 && currentStep !== 99 && !isSubmitted && currentStep > 0 && (
                        <div className="mt-8 flex justify-center">
                            <button onClick={handleBack} className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 rotate-180" /> Zurück
                            </button>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}
