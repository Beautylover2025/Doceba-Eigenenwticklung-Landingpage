import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PIXEL_ID = process.env.FB_PIXEL_ID;
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

function hashData(data: string): string {
    return crypto.createHash("sha256").update(data).digest("hex");
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { eventName, eventData, userData } = body;

        const eventTime = Math.floor(Date.now() / 1000);
        const eventSourceUrl = req.headers.get("referer") || "";
        const userAgent = req.headers.get("user-agent") || "";
        const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "";

        // Prepare user data with hashing
        const hashedUserData: any = {};
        if (userData?.email) hashedUserData.em = hashData(userData.email.toLowerCase().trim());
        if (userData?.phone) hashedUserData.ph = hashData(userData.phone.replace(/\D/g, ""));
        if (userData?.firstName) hashedUserData.fn = hashData(userData.firstName.toLowerCase().trim());
        if (userData?.lastName) hashedUserData.ln = hashData(userData.lastName.toLowerCase().trim());

        // Add client data
        hashedUserData.client_ip_address = ipAddress;
        hashedUserData.client_user_agent = userAgent;

        // Prepare event payload
        const payload = {
            data: [
                {
                    event_name: eventName,
                    event_time: eventTime,
                    event_source_url: eventSourceUrl,
                    action_source: "website",
                    user_data: hashedUserData,
                    custom_data: eventData || {},
                },
            ],
        };

        // Send to Facebook Conversions API
        const response = await fetch(
            `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error("Facebook CAPI Error:", result);
            return NextResponse.json({ error: result }, { status: response.status });
        }

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error("CAPI Server Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
