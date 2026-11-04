"use client";

import {
    ArrowRight,
    Check
} from "lucide-react";
import type { Destination } from "@/components/destinations/destination-list";
import { authClient } from "@/lib/auth-client";

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

const BookingCard = ({ destination, id }: { destination: Destination; id: string }) => {
    const { data: session } = authClient.useSession()
    const user = session?.user

    const handleBooking = async(event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const departureDate = (event.target as HTMLFormElement).departureDate.value;
        const bookingData = {
            userId: user?.id,
            userName: user?.name,
            email: user?.email,
            ...destination,
            departureDate,
            bookingDate: new Date().toISOString(),
        };
        console.log(bookingData);

        const bookingResponse = await fetch("http://localhost:8000/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        });
        const bookingResponseData = await bookingResponse.json();
        console.log("Booking response:",    bookingResponseData);
    }
    return (
        <aside className="min-w-0 border border-zinc-200 bg-white p-6 shadow-[0_4px_18px_rgb(0_0_0_/_0.08)] lg:sticky lg:top-6">
            <p className="text-sm text-zinc-500">Starting From</p>
            <p className="mt-1 text-4xl leading-none font-semibold tracking-[-0.05em] text-cyan-600">
                ${Number(destination.price).toLocaleString("en-US")}
            </p>
            <p className="mt-1 text-xs text-zinc-500">per person</p>

            <form onSubmit={handleBooking}>
                <div className="mt-8 flex h-13 items-center gap-3 bg-slate-50 px-4 text-sm text-zinc-700">
                    <input
                        type="date"
                        name="departureDate"
                        aria-label="Departure date"
                        defaultValue={destination.departureDate}
                        className="w-full bg-transparent outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 inline-flex h-13 w-full items-center justify-center gap-3 bg-cyan-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
                >
                    Book Now
                    <ArrowRight aria-hidden="true" size={17} />
                </button>
            </form>

            <ul className="mt-6 space-y-3 border-t border-zinc-100 pt-6">
                {includedItems.map((item) => (
                    <li className="flex items-start gap-2 text-sm text-zinc-500" key={item}>
                        <Check aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-500" size={15} />
                        {item}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default BookingCard;