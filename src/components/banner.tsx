import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Banner() {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24 text-center text-white">
      <Image
        alt="A turquoise cove surrounded by a green coastal village"
        className="-z-20 object-cover"
        fill
        priority
        sizes="100vw"
        src="/images/Banner.png"
      />
      <div className="absolute inset-0 -z-10 bg-black/15" />

      <div className="mt-8 flex max-w-4xl flex-col items-center">
        <h1 className="max-w-3xl text-5xl leading-[0.96] font-light tracking-[-0.055em] sm:text-7xl lg:text-[6.5rem]">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 font-normal sm:text-xl">
          Explore breathtaking destinations and create unforgettable memories with
          <br className="hidden sm:block" /> our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            className="inline-flex h-15 min-w-57.5 items-center justify-center gap-9 bg-cyan-600 px-7 text-sm font-semibold transition-colors hover:bg-cyan-500"
            href="#destinations"
          >
            EXPLORE NOW
            <ArrowRight aria-hidden="true" size={21} strokeWidth={2} />
          </Link>
          <Link
            className="inline-flex h-15 min-w-54 items-center justify-center border border-white/25 bg-white/45 px-7 text-sm font-medium backdrop-blur-[2px] transition-colors hover:bg-white/60"
            href="#featured-destination"
          >
            VIEW DESTINATION
          </Link>
        </div>
      </div>

      <form className="absolute inset-x-0 bottom-0 grid bg-slate-700/60 text-left backdrop-blur-[2px] sm:grid-cols-[1.05fr_1.05fr_1.05fr_1.05fr_0.7fr]">
        <label className="border-b border-white/35 px-7 py-4 sm:border-r sm:border-b-0">
          <span className="block text-xl font-medium">Location</span>
          <input
            aria-label="Location"
            className="mt-1 block w-full bg-transparent text-sm text-white outline-none placeholder:text-white/90"
            name="location"
            placeholder="Address, City Or Zip"
          />
        </label>
        <label className="border-b border-white/35 px-7 py-4 sm:border-r sm:border-b-0">
          <span className="block text-xl font-medium">Date/Duration</span>
          <input
            aria-label="Date and duration"
            className="mt-1 block w-full bg-transparent text-sm text-white outline-none placeholder:text-white/90"
            name="duration"
            placeholder="Anytime/3 Days"
          />
        </label>
        <label className="border-b border-white/35 px-7 py-4 sm:border-r sm:border-b-0">
          <span className="block text-xl font-medium">Budget</span>
          <input
            aria-label="Budget"
            className="mt-1 block w-full bg-transparent text-sm text-white outline-none placeholder:text-white/90"
            name="budget"
            placeholder="$0-$3000"
          />
        </label>
        <label className="border-b border-white/35 px-7 py-4 sm:border-r sm:border-b-0">
          <span className="block text-xl font-medium">People</span>
          <input
            aria-label="Number of people"
            className="mt-1 block w-full bg-transparent text-sm text-white outline-none placeholder:text-white/90"
            name="people"
            placeholder="5-10"
          />
        </label>
        <button
          className="min-h-20 bg-cyan-600 px-7 text-xl font-semibold transition-colors hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          type="button"
        >
          Search
        </button>
      </form>
    </section>
  )
}
