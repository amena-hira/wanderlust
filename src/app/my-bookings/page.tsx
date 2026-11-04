import Image from "next/image"
import Link from "next/link"
import { CalendarDays, CheckCircle2, Clock3, Eye, MapPin, Trash2 } from "lucide-react"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import MyBookingCard from "@/components/booking/MyBookingCard"

export type Booking = {
  _id: string
  userId: string
  userName: string
  email: string
  name: string
  country: string
  category: string
  price: number
  duration: string
  imageUrl: string
  departureDate: string
  description: string
  bookingDate: string
  confirmed: boolean
  status: string
}

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session?.user
  const BookingResponse = await fetch(`http://localhost:8000/bookings/${user?.email}`)
  const bookings = await BookingResponse.json()
  console.log(bookings);
  return (
    <main className="min-h-screen bg-white px-6 py-2 pb-14 sm:px-14">
      <div className="mx-auto max-w-[1280px]">
        <header>
          <h1 className="text-4xl tracking-[-0.06em] text-black sm:text-5xl">My Bookings</h1>
          <p className="mt-2 text-base text-zinc-500">Manage and view your upcoming travel plans</p>
        </header>

        <div className="mt-8 space-y-4">
          {bookings.map((booking: Booking, index: number) => (
            <MyBookingCard booking={booking} key={booking._id} />
            
          ))}
        </div>
      </div>
    </main>
  )
}


