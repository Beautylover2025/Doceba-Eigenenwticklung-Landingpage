/**
 * Send event to Facebook Conversions API (Server-Side)
 */
export async function sendFBCAPIEvent(
    eventName: string,
    eventData: any = {},
    userData: any = {}
) {
    try {
        const response = await fetch("/api/facebook-capi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                eventName,
                eventData,
                userData,
            }),
        });

        if (!response.ok) {
            console.error("CAPI request failed:", await response.text());
        }
    } catch (error) {
        console.error("CAPI error:", error);
    }
}
