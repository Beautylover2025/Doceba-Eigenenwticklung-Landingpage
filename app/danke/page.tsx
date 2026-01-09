"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { trackFBLead } from "@/components/FacebookPixel";
import { sendFBCAPIEvent } from "@/lib/facebookCAPI";

export default function ThankYouPage() {
    const router = useRouter();

    useEffect(() => {
        // Fire Lead event (Pixel)
        trackFBLead();

        // Fire Lead event (CAPI)
        sendFBCAPIEvent("Lead", {
            content_name: "Calendly Booking Completed",
            value: 0,
            currency: "EUR",
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                </div>

                {/* Headline */}
                <h1 className="text-4xl font-display font-black text-gray-900 mb-4">
                    Termin bestätigt!
                </h1>

                {/* Subheadline */}
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Vielen Dank! Dein Erstgespräch ist gebucht. Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details.
                </p>

                {/* Info Box */}
                <div className="bg-medical-blue/5 border border-medical-blue/20 rounded-2xl p-6 mb-8 text-left">
                    <h3 className="font-bold text-gray-900 mb-3">Was passiert als Nächstes?</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-medical-blue font-bold">1.</span>
                            <span>Du erhältst eine Kalendereinladung per E-Mail</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-medical-blue font-bold">2.</span>
                            <span>Wir bereiten uns auf dein Projekt vor</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-medical-blue font-bold">3.</span>
                            <span>Im Gespräch klären wir alle Details und nächsten Schritte</span>
                        </li>
                    </ul>
                </div>

                {/* CTA */}
                <button
                    onClick={() => router.push("/")}
                    className="px-8 py-4 bg-medical-blue text-white rounded-xl font-bold text-lg hover:bg-cyan-500 transition-all shadow-lg"
                >
                    Zurück zur Startseite
                </button>

                {/* Footer Note */}
                <p className="text-sm text-gray-500 mt-8">
                    Fragen? Schreib uns an{" "}
                    <a href="mailto:kontakt@doceba.de" className="text-medical-blue hover:underline">
                        kontakt@doceba.de
                    </a>
                </p>
            </div>
        </div>
    );
}
