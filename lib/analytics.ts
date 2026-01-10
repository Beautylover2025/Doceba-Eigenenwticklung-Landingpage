import { supabase } from './supabaseClient';

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

        const { error } = await supabase
            .from('analytics_events')
            .insert({
                session_id: sessionId,
                event_type: eventType,
                event_data: eventData,
            });

        if (error) {
            console.error('Analytics tracking error:', error);
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
 * Track a button click
 */
export async function trackButtonClick(buttonName: string, buttonLocation: string) {
    try {
        const sessionId = getOrCreateSessionId();

        const { error } = await supabase
            .from('button_clicks')
            .insert({
                session_id: sessionId,
                button_name: buttonName,
                button_location: buttonLocation,
            });

        if (error) {
            console.error('Button click tracking error:', error);
        }
    } catch (err) {
        console.error('Failed to track button click:', err);
    }
}
