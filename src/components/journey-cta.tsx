import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function JourneyCta() {
  return (
    <section className="relative isolate flex min-h-105 items-center justify-center overflow-hidden px-5 py-20 text-center text-white">
      <Image
        alt="An airplane flying above a tropical island"
        className="-z-20 object-cover"
        fill
        sizes="100vw"
        src="/images/CTA.png"
      />
      <div className="absolute inset-0 -z-10 bg-black/45" />
      <div>
        <h2 className="text-4xl leading-none tracking-[-0.06em] sm:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-lg sm:text-xl">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          className="mt-10 inline-flex h-14 items-center gap-9 bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-cyan-50"
          href="#destinations"
        >
          BOOK YOUR TRIP TODAY
          <ArrowRight aria-hidden="true" size={21} />
        </Link>
      </div>
    </section>
  )
}
