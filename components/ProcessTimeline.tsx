"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Step {
    title: string;
    description: string;
}

export default function ProcessTimeline() {
    const { t } = useLanguage();
    const [currentStep, setCurrentStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Get steps from translations
    const steps: Step[] = t.process?.steps || [];
    const totalSteps = steps.length || 8;

    // Define phase boundaries (steps 0-3 are Phase 1, steps 4-7 are Phase 2)
    const getPhase = (stepIndex: number) => stepIndex < 4 ? 1 : 2;
    const getPhaseLabel = (stepIndex: number) =>
        stepIndex < 4 ? t.process?.phaseCreation || "CREATION" : t.process?.phaseValidation || "VALIDATION";

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || totalSteps === 0) return;

        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % totalSteps);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSteps]);

    const handleStepClick = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentStep(index);
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentStep((prev) => (prev + 1) % totalSteps);
    };

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setCurrentStep((prev) => (prev - 1 + totalSteps) % totalSteps);
    };

    const progress = ((currentStep + 1) / totalSteps) * 100;
    const currentPhase = getPhase(currentStep);
    const progressColor = currentPhase === 1 ? "#06B6D4" : "#0047AB";

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
                        {t.process.badge}
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-display font-black mb-6 tracking-tight">
                        {t.process.headline}
                    </h2>
                    <p className="text-lg text-gray-600 font-medium max-w-3xl mx-auto">
                        {t.process.subheadline}
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
                                animate={{ strokeDashoffset }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                        </svg>

                        {/* Step Dots */}
                        {steps.map((step, index) => {
                            const angle = (index / totalSteps) * 360 - 90;
                            const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
                            const y = 200 + radius * Math.sin((angle * Math.PI) / 180);
                            const isActive = index === currentStep;
                            const isPast = index < currentStep;

                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => handleStepClick(index)}
                                    className={`absolute w-4 h-4 rounded-full transition-all ${isActive
                                        ? "bg-medical-blue scale-150 shadow-lg shadow-blue-500/50 ring-4 ring-white"
                                        : isPast
                                            ? "bg-cyan-400"
                                            : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    style={{
                                        left: `${(x / 400) * 100}%`,
                                        top: `${(y / 400) * 100}%`,
                                        transform: "translate(-50%, -50%)"
                                    }}
                                    whileHover={{ scale: isActive ? 1.5 : 1.3 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            );
                        })}

                        {/* Central Content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-center px-8 max-w-[280px] md:max-w-sm"
                                >
                                    <span
                                        className="text-xs font-bold tracking-widest uppercase mb-3 block"
                                        style={{ color: progressColor }}
                                    >
                                        Phase {getPhase(currentStep)} • {getPhaseLabel(currentStep)} • Step {String(currentStep + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 text-gray-900">
                                        {steps[currentStep]?.title}
                                    </h3>
                                    <p
                                        className="text-gray-500 text-sm md:text-base"
                                        dangerouslySetInnerHTML={{ __html: steps[currentStep]?.description || "" }}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex gap-2">
                            {steps.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleStepClick(i)}
                                    className={`h-1.5 rounded-full transition-all ${i === currentStep
                                        ? "w-8 bg-medical-blue"
                                        : "w-2 bg-gray-300 hover:bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Auto-play toggle */}
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className={`mt-6 text-xs font-medium px-4 py-2 rounded-full transition-colors ${isAutoPlaying
                            ? "bg-cyan-100 text-cyan-700"
                            : "bg-gray-100 text-gray-500"
                            }`}
                    >
                        {isAutoPlaying ? "⏸ " : "▶ "}{t.process.autoPlayPause}
                    </button>
                </div>
            </div>
        </section>
    );
}
