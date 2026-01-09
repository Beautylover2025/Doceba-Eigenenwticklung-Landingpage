"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
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

export default function Home() {
  useEffect(() => {
    trackEvent('page_view', { page: 'landing' });
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
    </main>
  );
}
