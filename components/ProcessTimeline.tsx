"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const STEPS = [
    {
        phase: 1,
        phaseLabel: "CREATION",
        step: 1,
        title: "Strategisches Erstgespräch",
        description: "Wir analysieren deine Vision. Passen wir zusammen?"
    },
    {
        phase: 1,
        phaseLabel: "CREATION",
        step: 2,
        title: "Technischer Pre-Check",
        description: "Sofortige Prüfung der Machbarkeit und EU-Konformität."
    },
    {
        phase: 1,
        phaseLabel: "CREATION",
        step: 3,
        title: "Entwicklung Sample",
        description: "Du erhältst ein physisches Muster. Fühlen, Riechen, Testen."
    },
    {
        phase: 1,
        phaseLabel: "CREATION",
        step: 4,
        title: "Finale Freigabe",
        description: "Optimierung bis zu deiner 100%igen Zufriedenheit."
    },
    {
        phase: 2,
        phaseLabel: "VALIDATION",
        step: 5,
        title: "Stabilitätstest (3 Monate)",
        description: "Der Härtetest für 30 Monate Haltbarkeit (Pflicht)."
    },
    {
        phase: 2,
        phaseLabel: "VALIDATION",
        step: 6,
        title: "Mikrobiologie",
        description: "Labortests auf Keimbelastung und Reinheit."
    },
    {
        phase: 2,
        phaseLabel: "VALIDATION",
        step: 7,
        title: "Sicherheitsbericht (CPSR)",
        description: "Erstellung der gesetzlichen Dokumente für den EU-Verkauf."
    },
    {
        phase: 2,
        phaseLabel: "VALIDATION",
        step: 8,
        title: "Produktion",
        description: "Start der Abfüllung in unserem GMP-Labor in Bielefeld."
    }
];

export default function ProcessTimeline() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % STEPS.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleStepClick = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentStep(index);
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentStep((prev) => (prev + 1) % STEPS.length);
    };

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setCurrentStep((prev) => (prev - 1 + STEPS.length) % STEPS.length);
    };

    const progress = ((currentStep + 1) / STEPS.length) * 100;
    const currentPhase = STEPS[currentStep].phase;
    const progressColor = currentPhase === 1 ? "#06B6D4" : "#0047AB"; // Cyan for Phase 1, Blue for Phase 2

    // SVG Circle calculations
    const radius = 180;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-medical-blue font-bold tracking-widest text-xs uppercase mb-4 block">
                        Der Prozess
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-display font-black mb-6 tracking-tight">
                        Von der Idee zum fertigen Produkt.
                    </h2>
                    <p className="text-lg text-gray-600 font-medium max-w-3xl mx-auto">
                        8 präzise Schritte. Volle Transparenz. Wissenschaftliche Exzellenz.
                    </p>
                </motion.div>

                {/* Circular Timeline */}
                <div className="flex flex-col items-center">
                    <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] flex items-center justify-center mb-12">
                        {/* SVG Circle */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 400 400">
                            {/* Background Track */}
                            <circle
                                cx="200"
                                cy="200"
                                r={radius}
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="2"
                                strokeDasharray="4 8"
                            />

                            {/* Progress Arc */}
                            <motion.circle
                                cx="200"
                                cy="200"
                                r={radius}
                                fill="none"
                                stroke={progressColor}
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                style={{ filter: `drop-shadow(0 0 8px ${progressColor}40)` }}
                            />

                            {/* Tick Marks */}
                            {STEPS.map((_, index) => {
                                const angle = (index / STEPS.length) * 360;
                                const tickRadius = radius + 15;
                                const x = 200 + tickRadius * Math.cos((angle - 90) * (Math.PI / 180));
                                const y = 200 + tickRadius * Math.sin((angle - 90) * (Math.PI / 180));
                                const isActive = index === currentStep;
                                const isPassed = index <= currentStep;

                                return (
                                    <g key={index}>
                                        <circle
                                            cx={x}
                                            cy={y}
                                            r="6"
                                            fill={isPassed ? progressColor : "#E5E7EB"}
                                            className="cursor-pointer transition-all hover:scale-125"
                                            onClick={() => handleStepClick(index)}
                                        />
                                        {isActive && (
                                            <circle
                                                cx={x}
                                                cy={y}
                                                r="10"
                                                fill="none"
                                                stroke={progressColor}
                                                strokeWidth="2"
                                                opacity="0.5"
                                            />
                                        )}
                                    </g>
                                );
                            })}
                        </svg>

                        {/* Center Content */}
                        <div className="relative z-10 text-center max-w-sm">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: progressColor }}>
                                        PHASE {STEPS[currentStep].phase} • {STEPS[currentStep].phaseLabel} • STEP {String(STEPS[currentStep].step).padStart(2, '0')}
                                    </p>
                                    <h3 className="text-3xl font-display font-bold mb-4 text-gray-900">
                                        {STEPS[currentStep].title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {STEPS[currentStep].description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={handlePrev}
                            className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-medical-blue hover:bg-medical-blue hover:text-white transition-all font-bold"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span>Zurück</span>
                        </button>

                        <div className="flex items-center gap-2">
                            {STEPS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleStepClick(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentStep
                                        ? "w-8 bg-medical-blue"
                                        : index <= currentStep
                                            ? "bg-cyan-400"
                                            : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="group flex items-center gap-2 px-6 py-3 bg-medical-blue text-white rounded-full hover:bg-cyan-500 transition-all font-bold shadow-lg"
                        >
                            <span>Weiter</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Auto-play indicator */}
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="mt-6 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {isAutoPlaying ? "⏸ Auto-Play pausieren" : "▶ Auto-Play starten"}
                    </button>
                </div>
            </div>
        </section>
    );
}
