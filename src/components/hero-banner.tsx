import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { name: "location", label: "Location", placeholder: "Address, City Or Zip" },
  { name: "date", label: "Date/Duration", placeholder: "Anytime/ 3 Days" },
  { name: "budget", label: "Budget", placeholder: "$0-$3000" },
  { name: "people", label: "People", placeholder: "5-10" },
];

export function HeroBanner() {
  return (
    <section className="relative flex min-h-[620px] flex-col overflow-hidden lg:h-[calc(100svh-78px)] lg:max-h-[820px]">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex flex-1 items-center justify-center px-6 py-16 text-center">
        <div className="mx-auto max-w-[980px]">
          <h1 className="mx-auto max-w-[780px] text-5xl font-light leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[80px]">
            Discover Your
            <br className="hidden sm:block" /> Next Adventure
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-pretty text-base leading-relaxed text-white/90 sm:text-[17px]">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <Link
              href="/destinations"
              className="inline-flex h-12 w-full items-center justify-center gap-3 bg-brand px-7 text-[13px] font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand/90 sm:w-auto"
            >
              Explore Now
              <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />
            </Link>
            <Link
              href="/destinations"
              className="inline-flex h-12 w-full items-center justify-center border border-white/60 bg-white/25 px-7 text-[13px] font-medium uppercase tracking-[0.08em] text-white backdrop-blur-sm transition-colors hover:bg-white/35 sm:w-auto"
            >
              View Destination
            </Link>
          </div>
        </div>
      </div>

      <form
        action="/destinations"
        role="search"
        className="relative grid w-full grid-cols-2 border-t border-white/30 bg-white/25 backdrop-blur-md lg:grid-cols-[repeat(4,minmax(0,1fr))_180px]"
      >
        {searchFields.map((field, index) => (
          <label
            key={field.name}
            className={`flex cursor-text flex-col gap-1 px-6 py-5 text-left ${
              index > 0 ? "border-l border-white/30" : ""
            }`}
          >
            <span className="text-[15px] font-semibold text-white">
              {field.label}
            </span>
            <input
              type="text"
              name={field.name}
              placeholder={field.placeholder}
              className="w-full bg-transparent text-sm text-white placeholder:text-white/80 focus:outline-none"
            />
          </label>
        ))}

        <button
          type="submit"
          className="col-span-2 h-20 bg-brand text-lg font-semibold text-white transition-colors hover:bg-brand/90 lg:col-span-1 lg:h-auto"
        >
          Search
        </button>
      </form>
    </section>
  );
}
