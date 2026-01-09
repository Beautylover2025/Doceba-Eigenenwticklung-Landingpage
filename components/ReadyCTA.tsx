import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ReadyCTA() {
    return (
        <section className="py-24 px-6 text-center bg-gray-50">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6 text-[#111111]">
                Bereit für dein eigenes Produkt?
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
                Lass uns herausfinden, welches Paket zu dir passt. Wir schauen uns deine Idee an und sagen dir ehrlich, ob sie machbar ist.
            </p>
            <Link
                href="/quiz"
                className="inline-flex items-center gap-3 bg-[#111111] text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:bg-medical-blue hover:shadow-lg"
            >
                Kostenloses Erstgespräch buchen
                <ArrowRight className="w-5 h-5" />
            </Link>
        </section>
    );
}
