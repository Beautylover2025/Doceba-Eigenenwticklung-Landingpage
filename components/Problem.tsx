import { AlertTriangle, Lock, RefreshCcw } from "lucide-react";

export default function Problem() {
    return (
        <section className="py-24 px-6 bg-[#FAFAFA]" id="problem">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 tracking-tight">Das Problem herkömmlicher Private-Label-Modelle.</h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Die meisten „eigenen Marken" sind rechtlich gesehen nur geliehen. Herkömmliche Hersteller behalten die Rezeptur als Betriebsgeheimnis unter Verschluss. Das bedeutet: Wenn du den Produzenten wechseln willst, verlierst du dein Produkt und fängst bei Null an. Wir nennen das die „Vendor Lock-in" Falle – eine künstliche Abhängigkeit, die dein Wachstum blockiert.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-gray-600 leading-relaxed">
                        <p>
                            Du hast die Vision. Du hast das Marketing. Du investierst Zeit und Geld.
                            Aber hast du dich schon mal gefragt, was dir am Ende wirklich gehört?
                        </p>
                        <p>
                            Die traurige Realität im Private Label Markt: Du zahlst Tausende für die Entwicklung,
                            baust einen Kundenstamm auf, aber wenn du wachsen willst, kommt das Erwachen.
                            Die Rezeptur ist plötzlich "Betriebsgeheimnis".
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="bg-red-50 p-3 rounded-xl text-red-500 shrink-0">
                                <Lock className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Die "Vendor-Lock-in" Falle</h4>
                                <p className="text-sm text-gray-500">Willst du den Hersteller wechseln, verlierst du dein Produkt. Die Rezeptur bleibt beim Labor.</p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-gray-100" />

                        <div className="flex gap-4 items-start">
                            <div className="bg-orange-50 p-3 rounded-xl text-orange-500 shrink-0">
                                <RefreshCcw className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Du fängst bei Null an</h4>
                                <p className="text-sm text-gray-500">Ohne Rezeptur musst du das Produkt woanders neu entwickeln lassen – auf gut Glück.</p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-gray-100" />

                        <div className="flex gap-4 items-start">
                            <div className="bg-gray-50 p-3 rounded-xl text-gray-900 shrink-0">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Die Buyout-Erpressung</h4>
                                <p className="text-sm text-gray-500">Oft werden 5.000€ - 10.000€ Ablöse fällig, nur um ein Blatt Papier zu erhalten.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
