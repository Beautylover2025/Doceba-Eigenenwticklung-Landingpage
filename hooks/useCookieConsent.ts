import { useState, useEffect } from 'react';

export type ConsentType = 'necessary' | 'marketing';

interface CookieConsent {
    necessary: boolean;
    marketing: boolean;
    timestamp: number;
}

const CONSENT_KEY = 'cookie-consent';

export function useCookieConsent() {
    const [consent, setConsent] = useState<CookieConsent | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load consent from localStorage
        try {
            const stored = localStorage.getItem(CONSENT_KEY);
            if (stored) {
                setConsent(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Error loading cookie consent:', e);
        }
        setIsLoaded(true);
    }, []);

    const grantConsent = (type: 'all' | 'necessary') => {
        const newConsent: CookieConsent = {
            necessary: true,
            marketing: type === 'all',
            timestamp: Date.now(),
        };

        try {
            localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
            setConsent(newConsent);
        } catch (e) {
            console.error('Error saving cookie consent:', e);
        }
    };

    const revokeConsent = () => {
        try {
            localStorage.removeItem(CONSENT_KEY);
            setConsent(null);
        } catch (e) {
            console.error('Error revoking cookie consent:', e);
        }
    };

    const hasConsent = (type: ConsentType): boolean => {
        if (!consent) return false;
        return consent[type] === true;
    };

    return {
        consent,
        isLoaded,
        hasConsent,
        grantConsent,
        revokeConsent,
        showBanner: isLoaded && !consent,
    };
}
