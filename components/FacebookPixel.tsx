"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

export default function FacebookPixel() {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Only load if consent is given or if needed (GDPR caution)
        // For this MVP, we load it.
        if (!loaded) return;
    }, [loaded]);

    return (
        <>
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                onLoad={() => setLoaded(true)}
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
            fbq('init', '123456789'); // Placeholder ID
            fbq('track', 'PageView');
          `,
                }}
            />
        </>
    );
}
