"use client";
import type { Booking } from '@/app/my-bookings/page';
import { CalendarDays, MapPin, Trash2, Eye, CheckCircle2, Clock3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function StatusBadge({ confirmed, label }: { confirmed: boolean; label: string }) {
    const Icon = confirmed ? CheckCircle2 : Clock3

    return (
        <span
            className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-sm ${confirmed ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-500"
                }`}
        >
            <Icon aria-hidden="true" size={14} />
            {label}
        </span>
    )
}


const MyBookingCard = ({ booking }: { booking: Booking }) => {
    const handleCancelBooking = async () => {
        try {
            const response = await fetch(`http://localhost:8000/bookings/${booking._id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            console.log("Cancel booking response:", data);
            if (!response.ok) {
                throw new Error("Failed to cancel booking");
            }
            console.log("Booking canceled successfully");
            window.location.reload(); // Refresh the page to reflect the changes
        } catch (error) {
            console.error("Error canceling booking:", error);
        }
    };
    return (
        <article
            className="grid gap-5 border border-zinc-200 bg-white p-4 shadow-[0_1px_2px_rgb(0_0_0_/_0.05)] lg:grid-cols-[308px_minmax(0,1fr)_auto] lg:items-stretch lg:gap-5 lg:p-[18px]"
            key={`${booking._id}`}
        >
            <Image
                alt={booking.name}
                className="h-44 w-full object-cover lg:w-[308px]"
                height={174}
                src={booking.imageUrl}
                width={308}
            />

            <div className="flex min-w-0 flex-col py-0.5">
                <StatusBadge confirmed={booking.confirmed} label={booking.status} />
                <h2 className="mt-2 text-3xl leading-none tracking-[-0.055em] text-black">{booking.name}</h2>
                <div className="mt-4 space-y-2 text-sm text-zinc-500">
                    <p className="flex items-center gap-2">
                        <CalendarDays aria-hidden="true" size={15} />
                        Departure: {new Date(booking.departureDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                    <p className="flex items-center gap-2">
                        <MapPin aria-hidden="true" size={15} />
                        Booking ID: {booking._id}
                    </p>
                </div>
                <p className="mt-auto pt-3 text-3xl leading-none tracking-[-0.055em] text-cyan-600">${booking.price?.toLocaleString("en-US")}</p>
            </div>

            <div className="flex items-end gap-3 lg:pb-0">
                <button
                    className="inline-flex h-9 items-center justify-center gap-2 border border-red-300 px-5 text-sm text-red-500 transition-colors hover:bg-red-50"
                    type="button"
                    onClick={handleCancelBooking}
                >
                    <Trash2 aria-hidden="true" size={15} />
                    Cancel
                </button>
                <Link
                    className="inline-flex h-9 items-center justify-center gap-2 bg-cyan-600 px-5 text-sm text-white transition-colors hover:bg-cyan-500"
                    href="#booking-details"
                >
                    <Eye aria-hidden="true" size={15} />
                    View
                </Link>
            </div>
        </article>
    );
};

export default MyBookingCard;