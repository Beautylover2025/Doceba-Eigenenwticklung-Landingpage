"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'de' | 'en';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: any; // Using any to avoid complex type inference issues
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('de');
    const [messages, setMessages] = useState<any>(null);

    useEffect(() => {
        // Load initial messages
        const loadMessages = async () => {
            const saved = localStorage.getItem('locale') as Locale;
            const initialLocale = (saved === 'de' || saved === 'en') ? saved : 'de';

            const msgs = await import(`@/messages/${initialLocale}.json`);
            setMessages(msgs.default);
            setLocaleState(initialLocale);
        };

        loadMessages();
    }, []);

    const setLocale = async (newLocale: Locale) => {
        const msgs = await import(`@/messages/${newLocale}.json`);
        setMessages(msgs.default);
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
        document.documentElement.lang = newLocale;
    };

    if (!messages) return null; // Loading state

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
