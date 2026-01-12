import { supabase } from './supabaseClient';
import { getUTMDataForTracking } from './utmTracking';

/**
 * Get or create a session ID for tracking
 */
function getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return '';

    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
}

/**
 * Track a generic analytics event
 */
export async function trackEvent(eventType: string, eventData: any = {}) {
    try {
        const sessionId = getOrCreateSessionId();

        // For page_view events, check if we already tracked this session today
        if (eventType === 'page_view') {
            const lastPageView = localStorage.getItem('last_page_view');
            const now = new Date().toISOString();

            // If we tracked a page view in the last 30 minutes, skip it
            if (lastPageView) {
                const lastViewTime = new Date(lastPageView);
                const diffMinutes = (new Date().getTime() - lastViewTime.getTime()) / 1000 / 60;

                if (diffMinutes < 30) {
                    console.log('⏭️ Skipping duplicate page_view (last view was', Math.round(diffMinutes), 'minutes ago)');
                    return;
                }
            }

            // Update last page view timestamp
            localStorage.setItem('last_page_view', now);
        }

        // Get UTM data for traffic source attribution
        const utmData = getUTMDataForTracking();

        const { error } = await supabase
            .from('analytics_events')
            .insert({
                session_id: sessionId,
                event_type: eventType,
                event_data: { ...eventData, ...utmData },
            });

        if (error) {
            console.error('Analytics tracking error:', error);
        } else {
            console.log('✅ Tracked event:', eventType, { ...eventData, traffic_source: utmData.traffic_source });
        }
    } catch (err) {
        console.error('Failed to track event:', err);
    }
}


/**
 * Track a quiz answer
 */
export async function trackQuizAnswer(
    questionIndex: number,
    questionText: string,
    answerText: string
) {
    try {
        const sessionId = getOrCreateSessionId();

        const { error } = await supabase
            .from('quiz_responses')
            .insert({
                session_id: sessionId,
                question_index: questionIndex,
                question_text: questionText,
                answer_text: answerText,
            });

        if (error) {
            console.error('Quiz answer tracking error:', error);
        }
    } catch (err) {
        console.error('Failed to track quiz answer:', err);
    }
}

/**
 * Track a button click - uses sendBeacon for reliable tracking before navigation
 */
export function trackButtonClick(buttonName: string, buttonLocation: string) {
    try {
        const sessionId = getOrCreateSessionId();
        if (!sessionId) return;

        // Get Supabase URL and key from environment
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.warn('Supabase not configured for button tracking');
            return;
        }

        const payload = {
            session_id: sessionId,
            button_name: buttonName,
            button_location: buttonLocation,
        };

        console.log('🔘 Tracking button click:', payload);

        // Use fetch with keepalive for reliable tracking even during page navigation
        const url = `${supabaseUrl}/rest/v1/button_clicks`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Prefer': 'return=minimal',
            },
            body: JSON.stringify(payload),
            keepalive: true, // This ensures the request completes even if page navigates
        }).catch((err) => console.error('Button click tracking error:', err));
    } catch (err) {
        console.error('Failed to track button click:', err);
    }
}
