import { Navigation2 } from "@/components/blocks/navigation-2";
import { Hero3 } from "@/components/blocks/hero-3";
import { Features1 } from "@/components/blocks/features-1";
import TestimonialAudit1 from "@/components/blocks/testimonial-audit-1";
import Pricing2 from "@/components/blocks/pricing-2";
import FAQ1 from "@/components/blocks/faq-1";
import { Auth3 } from "@/components/blocks/auth-3";
import CTA1 from "@/components/blocks/cta-1";
import Footer4 from "@/components/blocks/footer-4";

export default function Home() {
  return (
    <>
      <Navigation2 />
      <main className="relative z-[1] flex min-h-0 w-full flex-1 flex-col">
        <div
          className="pointer-events-none absolute inset-0 z-0 min-h-full landing-scroll-atmosphere"
          aria-hidden
        />
        <div className="relative z-[1] flex min-h-0 w-full flex-1 flex-col">
          <Hero3 />
          <Features1 />
          <TestimonialAudit1 />
          <Pricing2 />
          <FAQ1 />
          <Auth3 />
          <CTA1 />
          <Footer4 />
        </div>
      </main>
    </>
  );
}
