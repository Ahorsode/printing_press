"use client";

import Hero from "@/components/Hero";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ServiceGrid from "@/components/ServiceGrid";
import SmartOrderForm from "@/components/SmartOrderForm";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <WhatsAppFloat />

      <div id="services-section">
        <ServiceGrid />
      </div>

      <HowItWorks />

      <SmartOrderForm />
    </main>
  );
}
