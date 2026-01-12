/**
 * UTM Parameter Tracking
 * Captures and persists UTM parameters for traffic source attribution
 */

export interface UTMParams {
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_content: string | null;
    utm_term: string | null;
}

const UTM_STORAGE_KEY = 'utm_params';

/**
 * Extract UTM parameters from current URL
 */
function extractUTMFromURL(): UTMParams {
    if (typeof window === 'undefined') {
        return { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null };
    }

    const params = new URLSearchParams(window.location.search);

    return {
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
        utm_content: params.get('utm_content'),
        utm_term: params.get('utm_term'),
    };
}

/**
 * Get stored UTM parameters from sessionStorage
 */
function getStoredUTM(): UTMParams | null {
    if (typeof window === 'undefined') return null;

    try {
        const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

/**
 * Store UTM parameters in sessionStorage
 */
function storeUTM(params: UTMParams): void {
    if (typeof window === 'undefined') return;

    try {
        sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
    } catch {
        // Ignore storage errors
    }
}

/**
 * Get UTM parameters - returns URL params if present, otherwise stored params
 * UTM params from URL take priority and are stored for the session
 */
export function getUTMParams(): UTMParams {
    const urlParams = extractUTMFromURL();

    // If we have UTM params in URL, store them for the session
    if (urlParams.utm_source) {
        storeUTM(urlParams);
        console.log('📊 UTM params captured:', urlParams);
        return urlParams;
    }

    // Otherwise return stored params (if any from previous page in session)
    const stored = getStoredUTM();
    if (stored?.utm_source) {
        return stored;
    }

    // No UTM params - direct traffic
    return { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null };
}

/**
 * Get traffic source label for display
 */
export function getTrafficSourceLabel(): string {
    const utm = getUTMParams();

    if (!utm.utm_source) {
        return 'Direct';
    }

    // Normalize common sources
    const source = utm.utm_source.toLowerCase();

    switch (source) {
        case 'facebook':
        case 'fb':
        case 'meta':
            return 'Facebook';
        case 'instagram':
        case 'ig':
            return 'Instagram';
        case 'google':
        case 'gads':
            return 'Google';
        case 'tiktok':
            return 'TikTok';
        case 'email':
        case 'newsletter':
            return 'Email';
        case 'linkedin':
            return 'LinkedIn';
        default:
            // Capitalize first letter
            return source.charAt(0).toUpperCase() + source.slice(1);
    }
}

/**
 * Get UTM data for tracking (flattened for storage)
 */
export function getUTMDataForTracking(): Record<string, string | null> {
    const utm = getUTMParams();

    return {
        traffic_source: getTrafficSourceLabel(),
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        utm_content: utm.utm_content,
        utm_term: utm.utm_term,
    };
}
