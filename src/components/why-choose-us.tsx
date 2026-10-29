import Image from "next/image";

const reasons = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    body: "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    body: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    body: "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-brand-tint px-6 py-24 lg:py-28">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-center text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl lg:text-[52px]">
          Why Choose Wanderlust
        </h2>
        <p className="mt-4 text-center text-base text-neutral-600 sm:text-[17px]">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="bg-white p-8">
              <Image
                src={reason.icon}
                alt=""
                width={48}
                height={48}
                className="size-12"
              />
              <h3 className="mt-6 text-[26px] font-normal tracking-tight text-neutral-900">
                {reason.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                {reason.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
