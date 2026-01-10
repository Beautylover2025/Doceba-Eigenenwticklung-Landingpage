"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-center">
                <Link href="/" className="transition-transform hover:scale-105 duration-300">
                    <img
                        src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/DOCEBA-alone-Black-HQ.png"
                        alt="DOCEBA Logo"
                        className="h-8 md:h-12 w-auto object-contain"
                    />
                </Link>
            </div>
        </header>
    );
}
