import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";

import type { Destination } from "@/components/destinations/destination-list";
import { EditDestinationDialog } from "@/components/destinations/edit-destination-dialog";
import { DeleteDestinationDialog } from "@/components/destinations/delete-destination-dialog";
import BookingCard from "@/components/booking/BookingCard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const highlights = [
  "Luxury accommodation",
  "Guided local experiences",
  "Authentic cultural activities",
  "Private beach dinner experience",
  "Sunrise excursion",
  "Round-the-clock travel support",
];

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

 
  const token = await getTokenFromServer();

  const { id } = await params;
  const res = await fetch(`http://localhost:8000/destinations/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) notFound();

  const destination: Destination | null = await res.json();
  console.log(destination);
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

          <BookingCard destination={destination} id={id} />
        </div>
      </div>
    </main>
  );
}
