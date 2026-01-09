"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { trackFBPageView } from "@/components/FacebookPixel";
import { sendFBCAPIEvent } from "@/lib/facebookCAPI";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Barriers from "@/components/Barriers";
import Problem from "@/components/Problem";
import CTAButton from "@/components/CTAButton";
import Solution from "@/components/Solution";
import AboutUs from "@/components/AboutUs";
import EfficacySlider from "@/components/EfficacySlider";
import Reviews from "@/components/Reviews";
import ProcessTimeline from "@/components/ProcessTimeline";
import Pricing from "@/components/Pricing";
import ReadyCTA from "@/components/ReadyCTA";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import SocialProofToast from "@/components/SocialProofToast";
import FacebookPixel from "@/components/FacebookPixel";

export default function Home() {
  useEffect(() => {
    // Analytics tracking
    trackEvent('page_view', { page: 'landing' });

    // Facebook Pixel PageView
    trackFBPageView();

    // Facebook CAPI PageView
    sendFBCAPIEvent("PageView", { content_name: "Landing Page" });
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Barriers />
      <Problem />
      <CTAButton />
      <Solution />
      <AboutUs />
      <CTAButton />
      <EfficacySlider />
      <Reviews />
      <ProcessTimeline />
      <Pricing />
      <ReadyCTA />
      <FAQ />
      <FinalCTA />
      <Footer />
      <MobileFAB />
      <SocialProofToast />
      <FacebookPixel />
    </main>
  );
}
