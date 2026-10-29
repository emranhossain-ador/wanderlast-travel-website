
import { HeroBanner } from "@/components/hero-banner";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Testimonials } from "@/components/testimonials";
import { CtaBanner } from "@/components/cta-banner";

export default function Home() {
  return (
    <>

      <main className="flex flex-1 flex-col">
        <HeroBanner />
        <WhyChooseUs />
        <Testimonials />
        <CtaBanner />
      </main>
    </>
  );
}
