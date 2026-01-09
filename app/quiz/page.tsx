"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { trackFBViewContent } from "@/components/FacebookPixel";
import { sendFBCAPIEvent } from "@/lib/facebookCAPI";
import QuizFunnel from "@/components/QuizFunnel";
import Link from "next/link";
import { X } from "lucide-react";

export default function QuizPage() {
    useEffect(() => {
        // Analytics tracking
        trackEvent('quiz_start', {});

        // Facebook Pixel ViewContent
        trackFBViewContent("Quiz Start");

        // Facebook CAPI ViewContent
        sendFBCAPIEvent("ViewContent", { content_name: "Quiz Start" });
    }, []);

    return (
        <main className="min-h-screen bg-white flex flex-col">
            {/* Minimal Header */}
            <header className="p-6 flex justify-center items-center border-b border-gray-50 relative">
                <img
                    src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/DOCEBA-alone-Black-HQ.png"
                    alt="DOCEBA"
                    className="h-10 w-auto"
                />
                <Link href="/" className="absolute right-6 p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                </Link>
            </header>

            {/* Quiz Container */}
            <div className="flex-grow flex items-center justify-center p-6 py-12 bg-white">
                <div className="w-full max-w-2xl bg-white p-8 lg:p-12 rounded-3xl shadow-2xl shadow-gray-200/60 border border-gray-100">
                    <QuizFunnel />
                </div>
            </div>
        </main>
    );
}
