import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                <div className="flex items-center gap-3">
                    <img
                        src="https://gfdyjjpkhmciwhwhiddh.supabase.co/storage/v1/object/public/Videos/DOCEBA-alone-Black-HQ.png"
                        alt="DOCEBA"
                        className="h-8 w-auto"
                    />
                    <span className="text-gray-400">&copy; 2024 Made in Bielefeld.</span>
                </div>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gray-600 transition-colors">Impressum</a>
                    <a href="#" className="hover:text-gray-600 transition-colors">Datenschutz</a>
                    <a href="#" className="hover:text-gray-600 transition-colors">AGB</a>
                </div>
            </div>
        </footer>
    );
}
