"use client";

import { motion } from "framer-motion";
import { BarChart3, FlaskConical, ShieldAlert } from "lucide-react";

const BARRIERS = [
    {
        icon: BarChart3,
        title: "Exorbitante Hürden",
        description: "Die meisten Hersteller fordern Mindestmengen (MOQs) von 5.000 oder 10.000 Stück. Ein Investitionsrisiko, das Innovation oft sofort im Keim erstickt."
    },
    {
        icon: FlaskConical,
        title: "Fehlende Expertise",
        description: "Du hast das Marketing-Gen, aber kein Chemielabor. Ohne tiefes Verständnis für Inhaltsstoffe bist du blind und auf Gedeih und Verderb auf Dritte angewiesen."
    },
    {
        icon: ShieldAlert,
        title: "Ablehnung & Rechtsunsicherheit",
        description: "Etablierte Hersteller ignorieren kleinere Anfragen oft komplett. Dazu kommt die ständige Angst vor der strengen EU-Regulatorik: Wer haftet bei Fehlern? Ohne den richtigen Partner trägst du das volle Risiko allein."
    }
];

export default function Barriers() {
    return (
        <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Subtle Alert Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl lg:text-5xl font-display font-black mb-6 tracking-tight">
                        Deine Vision. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Ausgebremst von der Realität.</span>
                    </h2>

                    {/* Introductory Hook */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-base lg:text-lg text-gray-600 font-normal max-w-3xl mx-auto leading-relaxed mb-8"
                    >
                        Du trägst die Vision deiner eigenen, exklusiven Kosmetikmarke bereits in dir – ein Produkt, das nicht nur deine Handschrift trägt, sondern durch kompromisslose Qualität und echte Ergebnisse überzeugt. Doch der Weg von der Idee zum eigenen Asset ist oft steiniger als erwartet.
                    </motion.p>

                    <p className="text-lg text-gray-600 font-medium max-w-3xl mx-auto">
                        Bevor du überhaupt starten kannst, stellt dir der Markt drei massive Hürden in den Weg.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {BARRIERS.map((barrier, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: i * 0.15,
                                duration: 0.6,
                                type: "spring",
                                stiffness: 100
                            }}
                            className="group relative"
                        >
                            {/* Glass Card with Alert Accent & Pulsing Effect */}
                            <motion.div
                                initial={{ boxShadow: "0 0 0 0 rgba(249, 115, 22, 0)" }}
                                animate={{
                                    boxShadow: [
                                        "0 0 0 0 rgba(249, 115, 22, 0)",
                                        "0 0 20px 5px rgba(249, 115, 22, 0.2)",
                                        "0 0 0 0 rgba(249, 115, 22, 0)"
                                    ]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.5 + 1 // Staggered pulse start
                                }}
                                className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
                            >
                                {/* Alert Accent Bar with Pulse */}
                                <motion.div
                                    animate={{
                                        opacity: [0.6, 1, 0.6]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.5 + 1
                                    }}
                                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-t-3xl"
                                />

                                {/* Icon with Glow */}
                                <div className="mb-6 relative">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl flex items-center justify-center border border-orange-200/50 group-hover:scale-110 transition-transform duration-300">
                                        <barrier.icon className="w-8 h-8 text-orange-600" strokeWidth={1.5} />
                                    </div>
                                    {/* Pulsing glow effect */}
                                    <motion.div
                                        animate={{
                                            opacity: [0, 0.5, 0]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: i * 0.5 + 1
                                        }}
                                        className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-xl"
                                    />
                                </div>

                                <h3 className="text-xl font-display font-bold mb-4 text-gray-900">
                                    {barrier.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    {barrier.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Transition Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <p className="text-sm text-gray-400 italic">
                        Und selbst wenn du diese Hürden überwindest...
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
