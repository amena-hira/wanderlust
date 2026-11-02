"use client"

import Image from "next/image"
import Link from "next/link"
import { UserRound } from "lucide-react"
import { usePathname } from "next/navigation"

const primaryLinks = ["Home", "Destinations", "My Bookings", "Admin"]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="absolute inset-x-0 top-0 z-10 p-3 sm:p-6">
      <nav
        aria-label="Main navigation"
        className="grid min-h-15 grid-cols-[1fr_auto_1fr] items-center bg-white px-4 text-[15px] font-medium text-black shadow-sm sm:min-h-16 sm:px-7 sm:text-[17px]"
      >
        <div className="flex items-center gap-6 lg:gap-9">
          {primaryLinks.map((label) => (
            <Link
              className={`hidden transition-colors hover:text-cyan-600 sm:block ${
                label === "Home" && pathname === "/"
                  ? "text-cyan-600 underline underline-offset-4"
                  : ""
              }`}
              href={label === "Home" ? "/" : `#${label.toLowerCase().replace(" ", "-")}`}
              key={label}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link aria-label="Wanderlast home" href="/">
          <Image
            alt="Wanderlast"
            height={32}
            priority
            src="/images/Wanderlast.png"
            width={166}
          />
        </Link>

        <div className="flex items-center justify-end gap-6 lg:gap-9">
          <Link className="hidden items-center gap-1.5 hover:text-cyan-600 sm:flex" href="#profile">
            <UserRound aria-hidden="true" size={18} strokeWidth={2.5} />
            Profile
          </Link>
          <Link className="hover:text-cyan-600" href="#login">Login</Link>
          <Link className="hidden hover:text-cyan-600 sm:block" href="#sign-up">Sign Up</Link>
        </div>
      </nav>
    </header>
  )
}
