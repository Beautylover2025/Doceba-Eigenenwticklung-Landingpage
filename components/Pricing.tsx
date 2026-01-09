"use client";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
    return (
        <section className="py-24 px-6 bg-white" id="pricing">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4 tracking-tight">Investition in Exzellenz.</h2>
                    <p className="text-gray-500">Transparente Entwicklungspakete ohne versteckte Kosten.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

                    {/* Option 1: IP Builder */}
                    <div className="flex flex-col p-8 pb-12 rounded-3xl border border-gray-100 bg-white text-center group hover:border-gray-300 transition-colors">
                        <h3 className="text-lg font-medium text-gray-500 mb-2">The IP Builder</h3>
                        <div className="text-4xl font-bold mb-4 font-display">5.000 € <span className="text-sm font-normal text-gray-400">netto</span></div>
                        <p className="text-sm text-gray-400 mb-8 italic min-h-[40px]">Für Visionäre, die das Fundament legen wollen.</p>

                        <div className="flex-grow">
                            <ul className="space-y-4 text-left text-sm text-gray-600 mb-8">
                                <li className="flex gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0" /> Individuelle Rezeptur (3 Iterationen)</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-gray-900 shrink-0 font-medium" /> 100% Rezeptur-Eigentum</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0" /> Regulatory Pre-Check</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0" /> Auswahl Premium-Rohstoffe</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0" /> Finale Labor-Samples</li>
                            </ul>
                        </div>

                        <Link href="/quiz" className="block w-full py-3 rounded-xl border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 transition-colors">
                            Entwicklung anfragen
                        </Link>
                    </div>

                    {/* Option 2: Market Launch (Highlighted) */}
                    <div className="flex flex-col relative p-8 pb-12 rounded-3xl bg-[#111111] text-white text-center shadow-2xl transform md:-translate-y-4">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-medical-blue text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-medical-blue/30">
                            Hero Offer
                        </div>
                        <h3 className="text-lg font-medium text-gray-400 mb-2">The Market Launch</h3>
                        <div className="text-4xl font-bold mb-4 font-display">7.500 € <span className="text-sm font-normal text-gray-500">netto</span></div>
                        <p className="text-sm text-gray-400 mb-8 min-h-[40px]">Macher. Du willst echte Ware für den Start.</p>

                        <div className="flex-grow">
                            <ul className="space-y-4 text-left text-sm text-gray-300 mb-8 px-4">
                                <li className="flex gap-3"><Check className="w-4 h-4 text-medical-blue shrink-0" /> <strong>Alles aus "IP Builder"</strong></li>
                                <li className="flex gap-3"><Check className="w-4 h-4 text-medical-blue shrink-0" /> Produktion Pilot-Charge (100 Stk.)</li>
                                <li className="flex gap-3"><Check className="w-4 h-4 text-medical-blue shrink-0" /> Abfüllung in Standard-Glas (White/Black)</li>
                                <li className="flex gap-3"><Check className="w-4 h-4 text-medical-blue shrink-0" /> Basis-Etikettierung</li>
                                <li className="flex gap-3"><Check className="w-4 h-4 text-medical-blue shrink-0" /> Ready-to-Sell Delivery</li>
                            </ul>
                        </div>

                        <Link href="/quiz" className="block w-full py-4 rounded-xl bg-medical-blue text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20">
                            Platz sichern
                        </Link>
                    </div>

                    {/* Option 3: Enterprise */}
                    <div className="flex flex-col p-8 pb-12 rounded-3xl border border-gray-100 bg-white text-center group hover:border-gray-300 transition-colors">
                        <h3 className="text-lg font-medium text-gray-500 mb-2">Enterprise & Scale</h3>
                        <div className="text-4xl font-bold mb-4 font-display">Custom</div>
                        <p className="text-sm text-gray-400 mb-8 italic min-h-[40px]">Für etablierte Brands & Serien.</p>

                        <div className="flex-grow">
                            <ul className="space-y-4 text-left text-sm text-gray-600 mb-8">
                                <li className="flex gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0" /> Ganze Produktserien</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0" /> Custom Molds (Verpackung)</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0" /> Skalierung 10.000+ Einheiten</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0" /> Fulfillment Anbindung</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0" /> Prio-Slot im Labor</li>
                            </ul>
                        </div>

                        <Link href="/quiz" className="block w-full py-3 rounded-xl border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 transition-colors">
                            Beratung buchen
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
