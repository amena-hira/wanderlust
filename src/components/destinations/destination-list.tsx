"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ChevronDown, MapPin, Star } from "lucide-react";

export type Destination = {
  _id?: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const priceRanges = [
  { label: "Price range", value: "all" },
  { label: "Under $1,500", value: "0-1500" },
  { label: "$1,500 - $2,500", value: "1500-2500" },
  { label: "$2,500 and above", value: "2500-up" },
];

const sortOptions = [
  { label: "Sort by", value: "default" },
  { label: "Price: Low to high", value: "price-asc" },
  { label: "Price: High to low", value: "price-desc" },
  { label: "Name: A to Z", value: "name" },
];

function priceMatches(price: number, range: string) {
  if (range === "0-1500") return price < 1500;
  if (range === "1500-2500") return price >= 1500 && price < 2500;
  if (range === "2500-up") return price >= 2500;
  return true;
}

function DestinationImage({
  destination,
  eager,
}: {
  destination: Destination;
  eager: boolean;
}) {
  if (!destination.imageUrl) {
    return <div className="absolute inset-0 bg-zinc-200" />;
  }

  return (
    <Image
      alt={destination.name}
      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      fill
      loading={eager ? "eager" : "lazy"}
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      src={destination.imageUrl}
      unoptimized={!destination.imageUrl.startsWith("/")}
    />
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="relative min-w-0 flex-1 border-b border-zinc-300 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0">
      <span className="sr-only">{label}</span>
      <select
        className="h-14 w-full appearance-none bg-white px-4 pr-11 text-xs font-medium tracking-[0.08em] text-zinc-700 uppercase outline-none focus:bg-cyan-50"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-zinc-400"
        size={15}
      />
    </label>
  );
}

export function DestinationList({ destinations }: { destinations: Destination[] }) {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(
    () => [
      { label: "Category", value: "all" },
      ...Array.from(new Set(destinations.map((item) => item.category)))
        .filter(Boolean)
        .sort()
        .map((item) => ({ label: item, value: item })),
    ],
    [destinations]
  );

  const visibleDestinations = useMemo(() => {
    const filtered = destinations.filter((destination) => {
      const price = Number(destination.price);
      return (
        (category === "all" || destination.category === category) &&
        priceMatches(Number.isFinite(price) ? price : 0, priceRange)
      );
    });

    return filtered.toSorted((a, b) => {
      if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [category, destinations, priceRange, sortBy]);

  return (
    <>
      <div className="mt-10 grid border border-zinc-300 md:grid-cols-3">
        <FilterSelect
          label="Category"
          onChange={setCategory}
          options={categories}
          value={category}
        />
        <FilterSelect
          label="Price range"
          onChange={setPriceRange}
          options={priceRanges}
          value={priceRange}
        />
        <FilterSelect
          label="Sort by"
          onChange={setSortBy}
          options={sortOptions}
          value={sortBy}
        />
      </div>

      <p className="mt-4 text-sm text-zinc-500">
        Showing {visibleDestinations.length} destination
        {visibleDestinations.length === 1 ? "" : "s"}
      </p>

      {visibleDestinations.length === 0 ? (
        <div className="mt-8 border border-zinc-200 px-6 py-16 text-center text-zinc-500">
          No destinations match these filters.
        </div>
      ) : (
        <section
          aria-label="Destination packages"
          className="mt-7 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleDestinations.map((destination, index) => (
            <article className="group min-w-0" key={destination._id ?? destination.name}>
              <Link
                aria-label={`View ${destination.name}`}
                className="relative block aspect-[1.75/1] overflow-hidden bg-zinc-100"
                href={destination._id ? `/destinations/${destination._id}` : "/destinations"}
              >
                <DestinationImage destination={destination} eager={index < 3} />
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 px-3 py-2 text-xs font-semibold text-black backdrop-blur-sm">
                  4.5
                  <Star aria-hidden="true" className="fill-black" size={12} />
                </div>
              </Link>

              <div className="pt-4">
                <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <MapPin aria-hidden="true" size={13} />
                  {destination.country}
                </p>

                <div className="mt-2 flex items-start justify-between gap-4">
                  <h2 className="min-w-0 text-xl leading-tight tracking-[-0.04em] text-black">
                    <Link
                      className="transition-colors hover:text-cyan-600"
                      href={destination._id ? `/destinations/${destination._id}` : "/destinations"}
                    >
                      {destination.name}
                    </Link>
                  </h2>
                  <p className="shrink-0 text-xl leading-tight font-semibold tracking-[-0.04em] text-black">
                    ${Number(destination.price).toLocaleString("en-US")}
                    <span className="ml-0.5 text-[10px] font-normal text-zinc-500">/Person</span>
                  </p>
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
                  <CalendarDays aria-hidden="true" size={13} />
                  {destination.duration}
                </p>

                <Link
                  className="mt-4 inline-flex items-center gap-2 border-b border-cyan-600 pb-1 text-xs font-semibold tracking-[0.08em] text-cyan-600 uppercase transition-colors hover:border-black hover:text-black"
                  href={destination._id ? `/destinations/${destination._id}` : "/destinations"}
                >
                  Book now
                  <ArrowUpRight aria-hidden="true" size={14} />
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
