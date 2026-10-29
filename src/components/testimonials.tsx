import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person1.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person2.png",
  },
];

const arrowClassName =
  "static my-auto size-11 border-neutral-200 text-neutral-500 hover:border-brand hover:bg-transparent hover:text-brand";

export function Testimonials() {
  return (
    <section className="bg-white px-6 py-20 lg:py-24">
      <Carousel
        className="mx-auto max-w-[1100px]"
        opts={{ align: "start" }}
        aria-label="Traveler testimonials"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="min-w-0">
            <h2 className="text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl lg:text-[44px]">
              What Travelers Say
            </h2>
            <p className="mt-3 text-[15px] text-neutral-600">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <CarouselPrevious className={arrowClassName} />
            <CarouselNext className={arrowClassName} />
          </div>
        </div>

        <CarouselContent className="mt-8">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.name} className="md:basis-1/2">
              <figure className="flex h-full items-stretch gap-5 border border-neutral-200 p-5">
                <div className="flex min-w-0 flex-1 flex-col">
                  <blockquote className="text-[17px] leading-[1.55] text-neutral-900">
                    {testimonial.quote}
                  </blockquote>

                  <figcaption className="mt-auto pt-8">
                    <div className="flex items-center gap-2 text-[15px] text-brand">
                      <span
                        className="inline-block h-px w-5 bg-brand"
                        aria-hidden
                      />
                      {testimonial.name}
                    </div>
                    <div className="ml-7 mt-1 text-[13px] text-neutral-500">
                      {testimonial.location}
                    </div>
                  </figcaption>
                </div>

                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  width={218}
                  height={264}
                  className="h-auto w-[120px] shrink-0 self-center object-cover sm:w-[160px]"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
