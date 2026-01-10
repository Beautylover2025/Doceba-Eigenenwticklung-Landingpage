"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();

    return (
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
                onClick={() => setLocale('de')}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${locale === 'de'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
            >
                DE
            </button>
            <button
                onClick={() => setLocale('en')}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${locale === 'en'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
