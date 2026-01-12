"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, Lock } from "lucide-react";
import clsx from "clsx";
import { useFunnelTracker } from "@/hooks/useFunnelTracker";
import { trackQuizAnswer } from "@/lib/analytics";
import { getABVariant } from "@/hooks/useABTest";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

type FunnelData = {
    status: string;
    interest: string;
    painPoint: string;
    budget: "yes" | "unsure" | "no" | "";
    timeline: string;
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
};

const TOTAL_STEPS = 6;

export default function QuizFunnel() {
    const { trackStep } = useFunnelTracker();
    const { t, locale } = useLanguage();

    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [data, setData] = useState<FunnelData>({
        status: "",
        interest: "",
        painPoint: "",
        budget: "",
        timeline: "",
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    // Get quiz questions from translations
    const questions = t.quiz?.questions || [];

    const handleNext = (key: keyof FunnelData, value: any, displayedAnswerText?: string) => {
        setData((prev) => ({ ...prev, [key]: value }));
        trackStep(`step_${currentStep + 1}`, { [key]: value, locale });

        // Also track to quiz_responses table for dashboard (use displayed text, not internal value)
        if (currentStep < questions.length && questions[currentStep]) {
            const question = questions[currentStep];
            const answerToSave = displayedAnswerText || String(value);
            trackQuizAnswer(currentStep, question.question || `Step ${currentStep + 1}`, answerToSave);
        }

        // Budget Check (Step 3 -> 4)
        if (key === "budget" && value === "no") {
            trackStep("dropout_budget_low", { budget: "no", locale });
            setTimeout(() => setCurrentStep(99), 300);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate phone number
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
        if (!phoneRegex.test(data.phone)) {
            setPhoneError(locale === 'de'
                ? 'Bitte gib eine gültige Telefonnummer ein.'
                : 'Please enter a valid phone number.');
            return;
        }

        const abVariant = getABVariant('hero_headline');
        trackStep("submission_completed", { ...data, locale, ab_variant: abVariant });
        setIsSubmitted(true);

        // Send email notification
        try {
            await fetch('/api/notify-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, locale, ab_variant: abVariant }),
            });
        } catch (error) {
            console.error('Failed to send lead notification:', error);
        }
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
            {!selected && (
                <div className="absolute inset-0 bg-gradient-to-br from-medical-blue/0 to-cyan-500/0 group-hover:from-medical-blue/5 group-hover:to-cyan-500/5 transition-all duration-300 rounded-2xl" />
            )}
        </button>
    );

    // Question field mappings
    const fieldKeys: (keyof FunnelData)[] = ["status", "interest", "painPoint", "budget", "timeline"];
    const dataValues = [
        ["idea", "self-employed", "ecommerce-owner", "brand-owner", "creator"],
        ["skincare", "body", "base", "special", "unsure"],
        ["ownership", "quality", "support", "speed"],
        ["yes", "unsure", "no"],
        ["fast", "medium", "slow", "info"]
    ];

    return (
        <div className="w-full max-w-xl mx-auto min-h-[500px]">

            {/* Disqualified View */}
            {currentStep === 99 ? (
                <div className="text-center animate-in fade-in zoom-in duration-500 py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <X className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4">{t.quiz?.disqualified?.headline || "Das passt aktuell leider nicht."}</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        {t.quiz?.disqualified?.text || "Da wir jedes Projekt individuell entwickeln, ist unser Service erst ab einem Budget von 5.000 € möglich."}
                    </p>
                    <Link href="/" className="text-medical-blue font-medium hover:underline">{t.quiz?.success?.cta || "Zurück zur Startseite"}</Link>
                </div>
            ) : isSubmitted ? (
                // Success View with Calendly
                <div className="text-center animate-in fade-in zoom-in duration-500 py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-4">{t.quiz?.success?.headline}</h3>
                    <p className="text-gray-600 mb-2">
                        {t.quiz?.success?.subheadline}
                    </p>
                    <p className="text-sm text-gray-500 mb-8 flex items-center justify-center gap-2">
                        <span className="inline-block animate-bounce">↓</span>
                        {t.quiz?.success?.scrollHint}
                    </p>
                    {/* Calendly Inline Widget */}
                    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        <iframe
                            src="https://calendly.com/doceba/kennenlerngesprach-deine-eigene-kosmetikmarke-klon-1"
                            width="100%"
                            height="700"
                            frameBorder="0"
                            title="Calendly Booking"
                        />
                    </div>
                </div>
            ) : (
                <div>
                    {/* Progress Header */}
                    <div className="mb-10">
                        <div className="flex justify-between text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                            <span>{t.quiz?.progress}</span>
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

                            {/* Dynamic Questions (0-4) */}
                            {currentStep < 5 && questions[currentStep] && (
                                <motion.div key={`step${currentStep}`} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <h3 className="text-3xl font-display font-bold mb-8">{questions[currentStep].question}</h3>
                                    <div className="space-y-4">
                                        {questions[currentStep].options?.map((option: string, idx: number) => (
                                            <OptionButton
                                                key={idx}
                                                label={option}
                                                selected={data[fieldKeys[currentStep]] === dataValues[currentStep][idx]}
                                                onClick={() => handleNext(fieldKeys[currentStep], dataValues[currentStep][idx], option)}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Lead Capture (Step 5) */}
                            {currentStep === 5 && (
                                <motion.div key="step5" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <h3 className="text-3xl font-display font-bold mb-2">{t.quiz?.leadCapture?.headline}</h3>
                                    <p className="text-gray-500 mb-8">{t.quiz?.leadCapture?.subheadline}</p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text" required placeholder={t.quiz?.leadCapture?.firstName}
                                                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue transition-all"
                                                value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })}
                                            />
                                            <input
                                                type="text" required placeholder={t.quiz?.leadCapture?.lastName}
                                                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue transition-all"
                                                value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })}
                                            />
                                        </div>
                                        <input
                                            type="email" required placeholder={t.quiz?.leadCapture?.email}
                                            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue transition-all"
                                            value={data.email} onChange={e => setData({ ...data, email: e.target.value })}
                                        />
                                        <div>
                                            <input
                                                type="tel"
                                                required
                                                placeholder={t.quiz?.leadCapture?.phone}
                                                className={clsx(
                                                    "w-full p-4 bg-gray-50 rounded-xl border transition-all",
                                                    phoneError
                                                        ? "border-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                                        : "border-gray-200 focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue"
                                                )}
                                                value={data.phone}
                                                onChange={e => {
                                                    setData({ ...data, phone: e.target.value });
                                                    setPhoneError(""); // Clear error on input
                                                }}
                                            />
                                            {phoneError && (
                                                <p className="text-red-500 text-sm mt-2">{phoneError}</p>
                                            )}
                                        </div>

                                        {/* Terms Checkbox */}
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                required
                                                checked={acceptedTerms}
                                                onChange={e => setAcceptedTerms(e.target.checked)}
                                                className="mt-1 w-4 h-4 text-medical-blue border-gray-300 rounded focus:ring-medical-blue"
                                            />
                                            <span className="text-sm text-gray-600">
                                                {t.quiz?.leadCapture?.terms}{" "}
                                                <a href="/datenschutz" target="_blank" className="text-medical-blue hover:underline">
                                                    {t.quiz?.leadCapture?.privacy}
                                                </a>
                                                {" "}{t.quiz?.leadCapture?.and}{" "}
                                                <a href="/agb" target="_blank" className="text-medical-blue hover:underline">
                                                    {t.quiz?.leadCapture?.agb}
                                                </a>.
                                            </span>
                                        </label>

                                        {/* Trust Indicator */}
                                        <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                                            <Lock className="w-3 h-3" />
                                            <span>{t.quiz?.leadCapture?.trustIndicator}</span>
                                        </div>

                                        <button type="submit" className="w-full bg-[#111111] text-white font-bold py-5 rounded-xl mt-6 hover:bg-medical-blue transition-colors flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                            {t.quiz?.leadCapture?.cta}
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
                                <ArrowRight className="w-4 h-4 rotate-180" /> {t.quiz?.back}
                            </button>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}
