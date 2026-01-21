import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getUTMDataForTracking } from '@/lib/utmTracking';

/**
 * Get the source page from URL for lead attribution
 */
function getSourcePage(): string {
    if (typeof window === 'undefined') return 'unknown';

    const pathname = window.location.pathname;

    if (pathname.includes('hautberatung')) return 'hautberatung';
    if (pathname.includes('landing')) return 'landing';
    if (pathname.includes('quiz')) return 'quiz';
    if (pathname === '/') return 'homepage';

    return pathname.replace(/^\//, '') || 'homepage';
}

export function useFunnelTracker() {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [sourcePage, setSourcePage] = useState<string>('unknown');

    useEffect(() => {
        // 1. Session ID generieren oder aus localStorage laden
        let sid = localStorage.getItem('funnel_session_id');
        if (!sid) {
            sid = crypto.randomUUID();
            localStorage.setItem('funnel_session_id', sid);
        }
        setSessionId(sid);

        // 2. Source page nur beim ersten Besuch speichern (nicht überschreiben)
        const storedSource = localStorage.getItem('funnel_source_page');
        if (!storedSource) {
            const source = getSourcePage();
            localStorage.setItem('funnel_source_page', source);
            setSourcePage(source);
        } else {
            setSourcePage(storedSource);
        }
    }, []);

    const trackStep = async (stepName: string, data: any) => {
        if (!sessionId) return;

        // Get UTM data for traffic source attribution
        const utmData = getUTMDataForTracking();

        const payload = {
            session_id: sessionId,
            last_step: stepName,
            source_page: sourcePage,
            // UTM tracking data
            traffic_source: utmData.traffic_source,
            utm_source: utmData.utm_source,
            utm_medium: utmData.utm_medium,
            utm_campaign: utmData.utm_campaign,
            utm_content: utmData.utm_content,
            ...data,
            updated_at: new Date().toISOString(),
        };

        console.log("Tracking Step:", stepName, payload);

        try {
            const { error } = await supabase
                .from('funnel_submissions')
                .upsert(payload, { onConflict: 'session_id' }); // Upsert erlaubt Updates des gleichen Leads

            if (error) throw error;
        } catch (err) {
            console.error("Supabase Tracking Error:", err);
        }
    };

    return { trackStep, sessionId, sourcePage };
}
