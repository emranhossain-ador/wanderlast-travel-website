import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative flex h-[400px] items-center justify-center overflow-hidden px-6 text-center lg:h-[440px]">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative">
        <h2 className="text-4xl font-light tracking-tight text-white lg:text-[50px]">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-base text-white/85 sm:text-[17px]">
          Join thousands of travelers who have discovered the world with us
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/destinations"
            className="inline-flex h-11 items-center gap-3 bg-white px-7 text-[13px] font-medium uppercase tracking-[0.08em] text-neutral-900 transition-colors hover:bg-white/90"
          >
            Book Your Trip Today
            <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
