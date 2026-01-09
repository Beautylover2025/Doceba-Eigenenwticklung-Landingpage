import { CheckCircle2 } from "lucide-react";

export default function Proof() {
    return (
        <section className="py-24 px-6 bg-[#FAFAFA]">
            <div className="max-w-4xl mx-auto text-center">
                <span className="text-gray-400 font-medium tracking-widest text-xs uppercase mb-4 block">Proven Track Record</span>
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-12">Warum Bielefeld? Warum wir?</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-4xl font-bold text-gray-200 mb-4">01</div>
                        <h3 className="font-bold text-gray-900 mb-2">Keine Agentur</h3>
                        <p className="text-sm text-gray-500">Wir sind Hersteller. Unser Team besteht aus Chemikern und Strategen. Kein Stille-Post-Spiel.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-4xl font-bold text-gray-200 mb-4">02</div>
                        <h3 className="font-bold text-gray-900 mb-2">Eigene Erfahrung</h3>
                        <p className="text-sm text-gray-500">Unsere eigene Brand war Top 10 in Deutschland. Wir kennen den Weg zum Erfolg.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-4xl font-bold text-gray-200 mb-4">03</div>
                        <h3 className="font-bold text-gray-900 mb-2">ISO 22716 Labor</h3>
                        <p className="text-sm text-gray-500">Pharmazeutische Hygiene. Lückenlose Dokumentation. Rückverfolgbarkeit.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
