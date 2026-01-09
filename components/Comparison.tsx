import { Check, X } from "lucide-react";

export default function Comparison() {
    const features = [
        { name: "Inklusive Rezeptur-Rechte (IP)", us: true, others: false },
        { name: "Feste Entwicklungszeit", us: true, others: false },
        { name: "GMP-Produktion in Deutschland", us: true, others: "Variabel" },
        { name: "Direkter Zugang zu Labor-Experten", us: true, others: false },
        { name: "Full-Service inkl. Packaging", us: true, others: "Aufpreis" },
    ];

    return (
        <section className="py-24 px-6 bg-[#FAFAFA]" id="vergleich">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4 tracking-tight">Klasse für sich.</h2>
                    <p className="text-gray-500">Warum führende Marken bei uns entwickeln.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-3 p-6 border-b border-gray-100 bg-gray-50/50 text-sm font-semibold uppercase tracking-wider text-gray-500">
                        <div className="text-left py-2">Kriterium</div>
                        <div className="text-center py-2 text-gray-400 font-medium">Industrie-Standard</div>
                        <div className="text-center py-2 text-medical-blue font-bold">Unser Standard</div>
                    </div>

                    {features.map((feature, idx) => (
                        <div key={idx} className="grid grid-cols-3 p-6 border-b border-gray-50 items-center hover:bg-gray-50/30 transition-colors">
                            <div className="font-medium text-gray-900">{feature.name}</div>

                            <div className="flex justify-center text-gray-400">
                                {feature.others === false ? <X className="w-5 h-5 text-gray-300" /> :
                                    feature.others === "Variabel" ? <span className="text-xs bg-gray-100 px-2 py-1 rounded">Variabel</span> :
                                        feature.others === "Aufpreis" ? <span className="text-xs bg-gray-100 px-2 py-1 rounded">Aufpreis</span> :
                                            <Check className="w-5 h-5" />}
                            </div>

                            <div className="flex justify-center">
                                {feature.us ? (
                                    <div className="bg-medical-blue/10 p-1.5 rounded-full">
                                        <Check className="w-5 h-5 text-medical-blue" strokeWidth={3} />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
