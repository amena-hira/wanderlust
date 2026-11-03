import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";

import type { Destination } from "@/components/destinations/destination-list";
import { EditDestinationDialog } from "@/components/destinations/edit-destination-dialog";
import { DeleteDestinationDialog } from "@/components/destinations/delete-destination-dialog";

const highlights = [
  "Luxury accommodation",
  "Guided local experiences",
  "Authentic cultural activities",
  "Private beach dinner experience",
  "Sunrise excursion",
  "Round-the-clock travel support",
];

const includedItems = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }).format(date);
}

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`http://localhost:8000/destinations/${id}`);

  if (!res.ok) notFound();

  const destination: Destination | null = await res.json();
  if (!destination) notFound();

  return (
    <main className="min-h-screen bg-white px-5 pt-6 pb-24 sm:px-10 sm:pt-8 lg:px-20">
      <div className="mx-auto max-w-[1420px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-cyan-600"
            href="/destinations"
          >
            <ArrowLeft aria-hidden="true" size={15} />
            Back to Destinations
          </Link>

          <div className="flex gap-3">
            <EditDestinationDialog destination={destination} destinationId={id} />
            <DeleteDestinationDialog destination={destination} destinationId={id} />
          </div>
        </div>

        <div className="relative mt-6 h-56 overflow-hidden bg-zinc-100 sm:h-auto sm:aspect-[2.45/1]">
          <Image
            alt={destination.name}
            className="object-cover"
            fill
            loading="eager"
            sizes="(min-width: 1536px) 1420px, 100vw"
            src={destination.imageUrl}
            unoptimized={!destination.imageUrl.startsWith("/")}
          />
        </div>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,1fr)_390px]">
          <article className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm text-zinc-500">
              <MapPin aria-hidden="true" size={15} />
              {destination.country}
            </p>
            <h1 className="mt-3 text-4xl leading-none tracking-[-0.06em] text-black sm:text-5xl">
              {destination.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-600">
              <p className="flex items-center gap-1.5 font-semibold text-emerald-600">
                <Star aria-hidden="true" className="fill-emerald-600" size={15} />
                4.9
                <span className="font-normal text-zinc-500">(234 reviews)</span>
              </p>
              <p className="flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" size={15} />
                {destination.duration}
              </p>
            </div>

            <section className="mt-12">
              <h2 className="text-2xl tracking-[-0.04em] text-black">Overview</h2>
              <p className="mt-4 max-w-4xl text-[15px] leading-7 text-zinc-500">
                {destination.description}
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl tracking-[-0.04em] text-black">Highlights</h2>
              <p className="mt-4 max-w-4xl text-[15px] leading-7 text-zinc-500">
                Discover the best of {destination.name} with carefully selected experiences,
                local culture, and unforgettable moments.
              </p>
              <ul className="mt-6 grid gap-x-12 gap-y-4 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li className="flex items-start gap-2 text-sm text-zinc-600" key={highlight}>
                    <Check aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-500" size={15} />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="min-w-0 border border-zinc-200 bg-white p-6 shadow-[0_4px_18px_rgb(0_0_0_/_0.08)] lg:sticky lg:top-6">
            <p className="text-sm text-zinc-500">Starting From</p>
            <p className="mt-1 text-4xl leading-none font-semibold tracking-[-0.05em] text-cyan-600">
              ${Number(destination.price).toLocaleString("en-US")}
            </p>
            <p className="mt-1 text-xs text-zinc-500">per person</p>

            <div className="mt-8 flex h-13 items-center gap-3 bg-slate-50 px-4 text-sm text-zinc-700">
              <CalendarDays aria-hidden="true" size={16} />
              {formatDate(destination.departureDate)}
            </div>

            <Link
              className="mt-6 inline-flex h-13 w-full items-center justify-center gap-3 bg-cyan-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
              href={`/my-bookings?destination=${id}`}
            >
              Book Now
              <ArrowRight aria-hidden="true" size={17} />
            </Link>

            <ul className="mt-6 space-y-3 border-t border-zinc-100 pt-6">
              {includedItems.map((item) => (
                <li className="flex items-start gap-2 text-sm text-zinc-500" key={item}>
                  <Check aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-500" size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
