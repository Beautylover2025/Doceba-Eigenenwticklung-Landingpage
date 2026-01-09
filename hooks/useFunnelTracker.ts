import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useFunnelTracker() {
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        // 1. Session ID generieren oder aus localStorage laden
        let sid = localStorage.getItem('funnel_session_id');
        if (!sid) {
            sid = crypto.randomUUID();
            localStorage.setItem('funnel_session_id', sid);
        }
        setSessionId(sid);
    }, []);

    const trackStep = async (stepName: string, data: any) => {
        if (!sessionId) return;

        const payload = {
            session_id: sessionId,
            last_step: stepName,
            ...data,
            updated_at: new Date().toISOString(),
        };

        console.log("Tracking Step:", stepName, payload);

        if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.warn("Supabase Anon Key missing. Tracking logic simulated.");
            return;
        }

        try {
            const { error } = await supabase
                .from('funnel_submissions')
                .upsert(payload, { onConflict: 'session_id' }); // Upsert erlaubt Updates des gleichen Leads

            if (error) throw error;
        } catch (err) {
            console.error("Supabase Tracking Error:", err);
        }
    };

    return { trackStep, sessionId };
}
