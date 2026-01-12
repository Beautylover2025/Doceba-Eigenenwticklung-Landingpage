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
            try {
                // Safety check for client-side only
                if (typeof window === 'undefined') {
                    // Fallback to German on server
                    const msgs = await import('@/messages/de.json');
                    setMessages(msgs.default);
                    return;
                }

                // Check URL parameter first (highest priority)
                const urlParams = new URLSearchParams(window.location.search);
                const langParam = urlParams.get('lang');

                let initialLocale: Locale = 'de';

                if (langParam === 'de' || langParam === 'en') {
                    // URL parameter takes priority
                    initialLocale = langParam;
                    try {
                        localStorage.setItem('locale', langParam); // Save for future visits
                    } catch (e) {
                        // localStorage might not be available
                    }
                } else {
                    // Fall back to localStorage
                    try {
                        const saved = localStorage.getItem('locale') as Locale;
                        initialLocale = (saved === 'de' || saved === 'en') ? saved : 'de';
                    } catch (e) {
                        // localStorage might not be available
                    }
                }

                const msgs = await import(`@/messages/${initialLocale}.json`);
                setMessages(msgs.default);
                setLocaleState(initialLocale);

                if (typeof document !== 'undefined') {
                    document.documentElement.lang = initialLocale;
                }
            } catch (error) {
                console.error('Error loading language:', error);
                // Fallback to German on error
                try {
                    const msgs = await import('@/messages/de.json');
                    setMessages(msgs.default);
                    setLocaleState('de');
                } catch (e) {
                    console.error('Failed to load fallback language:', e);
                }
            }
        };

        loadMessages();
    }, []);

    const setLocale = async (newLocale: Locale) => {
        try {
            const msgs = await import(`@/messages/${newLocale}.json`);
            setMessages(msgs.default);
            setLocaleState(newLocale);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('locale', newLocale);
            }
            if (typeof document !== 'undefined') {
                document.documentElement.lang = newLocale;
            }
        } catch (error) {
            console.error('Error changing language:', error);
        }
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
