"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import deMessages from '@/messages/de.json';
import enMessages from '@/messages/en.json';

type Locale = 'de' | 'en';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const MESSAGES = {
    de: deMessages,
    en: enMessages,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('de');
    const [messages, setMessages] = useState<any>(MESSAGES.de);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            // Check URL parameter first (highest priority)
            const urlParams = new URLSearchParams(window.location.search);
            const langParam = urlParams.get('lang');

            let initialLocale: Locale = 'de';

            if (langParam === 'de' || langParam === 'en') {
                initialLocale = langParam;
                try {
                    localStorage.setItem('locale', langParam);
                } catch (e) { }
            } else {
                try {
                    const saved = localStorage.getItem('locale') as Locale;
                    initialLocale = (saved === 'de' || saved === 'en') ? saved : 'de';
                } catch (e) { }
            }

            setMessages(MESSAGES[initialLocale]);
            setLocaleState(initialLocale);
            document.documentElement.lang = initialLocale;
        } catch (error) {
            console.error('Error loading language:', error);
            setMessages(MESSAGES.de);
            setLocaleState('de');
        }
        setIsLoaded(true);
    }, []);

    const setLocale = (newLocale: Locale) => {
        setMessages(MESSAGES[newLocale]);
        setLocaleState(newLocale);
        try {
            localStorage.setItem('locale', newLocale);
        } catch (e) { }
        document.documentElement.lang = newLocale;
    };

    if (!isLoaded) return null;

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t: messages }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}
