"use client";

import { useEffect } from "react";
import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
    interface Window {
        fbq: any;
    }
}

export default function FacebookPixel() {
    return (
        <>
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
          `,
                }}
            />
        </>
    );
}

// Helper functions to track events
export function trackFBEvent(eventName: string, data: any = {}) {
    if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", eventName, data);
    }
}

export function trackFBPageView() {
    trackFBEvent("PageView");
}

export function trackFBViewContent(contentName: string) {
    trackFBEvent("ViewContent", { content_name: contentName });
}

export function trackFBLead() {
    trackFBEvent("Lead");
}
