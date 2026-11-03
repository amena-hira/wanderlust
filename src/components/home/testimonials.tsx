import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    quote:
      '"Every part of our coastal escape felt effortless. Wanderlust turned a dream trip into memories we will always treasure."',
    name: "Olivia Parker",
    location: "London, UK",
    image: "/images/person1.png",
  },
]

export function Testimonials() {
  return (
    <section className="bg-white px-5 py-20 sm:px-10 lg:px-20 lg:py-30">
      <Carousel className="mx-auto max-w-[1445px]" opts={{ align: "start", loop: true }}>
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <header>
            <h2 className="text-4xl tracking-[-0.06em] text-black sm:text-6xl">What Travelers Say</h2>
            <p className="mt-3 text-lg text-zinc-500">Real experiences from our happy travelers</p>
          </header>
          <div className="flex gap-3 pb-1 sm:gap-4">
            <CarouselPrevious className="!static !size-12 !translate-x-0 !translate-y-0 border-zinc-300 bg-white text-zinc-400 shadow-none hover:bg-zinc-50 hover:text-zinc-700 sm:!size-16" />
            <CarouselNext className="!static !size-12 !translate-x-0 !translate-y-0 border-zinc-300 bg-white text-zinc-400 shadow-none hover:bg-zinc-50 hover:text-zinc-700 sm:!size-16" />
          </div>
        </div>

        <CarouselContent className="-ml-7">
          {testimonials.map((testimonial) => (
            <CarouselItem className="basis-full pl-7 xl:basis-1/2" key={testimonial.name}>
              <article className="grid min-h-86 border border-zinc-200 bg-white p-6 sm:grid-cols-[minmax(0,1fr)_243px] sm:gap-6 sm:p-6">
                <div className="flex min-w-0 flex-col">
                  <blockquote className="text-[1.65rem] leading-[1.03] tracking-[-0.055em] text-black sm:text-[1.7rem]">
                    {testimonial.quote}
                  </blockquote>
                  <footer className="mt-auto pt-7">
                    <p className="text-xl tracking-[-0.045em] text-cyan-600">
                      <span aria-hidden="true">— </span>
                      {testimonial.name}
                    </p>
                    <p className="mt-0.5 pl-7 text-sm text-zinc-500">{testimonial.location}</p>
                  </footer>
                </div>
                <Image
                  alt={testimonial.name}
                  className="mt-6 h-73 w-full object-cover sm:mt-0 sm:w-[243px]"
                  height={294}
                  src={testimonial.image}
                  width={243}
                />
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
