"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, UserRound, X } from "lucide-react"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home", active: "/" },
  { href: "/destinations", label: "Destinations", active: "/destinations" },
  { href: "/add-destination", label: "Add Destination", active: "/add-destinations" },
  { href: "/my-bookings", label: "My Bookings", active: "/my-bookings" },
]

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const isHomePage = pathname === "/"

  const linkClass = (active: string) =>
    `transition-colors hover:text-cyan-600 ${
      pathname === active ? "text-cyan-600 underline underline-offset-4" : ""
    }`

  return (
    <header
      className={`${
        isHomePage ? "absolute inset-x-0 top-0" : "relative"
      } z-10 p-3 sm:p-6`}
    >
      <nav
        aria-label="Main navigation"
        className="flex min-h-15 items-center justify-between gap-4 bg-white px-4 text-[15px] font-medium text-black shadow-sm sm:px-7 sm:text-[17px] lg:grid lg:min-h-16 lg:grid-cols-[1fr_auto_1fr]"
      >
        <div className="hidden min-w-0 items-center gap-6 lg:flex xl:gap-9">
          {navLinks.map(({ href, label, active }) => (
            <Link
              aria-current={pathname === active ? "page" : undefined}
              className={linkClass(active)}
              href={href}
              key={label}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          aria-label="Wanderlast home"
          className="shrink-0"
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            alt="Wanderlast"
            className="h-6 w-auto sm:h-8"
            height={32}
            priority
            src="/images/Wanderlast.png"
            width={166}
          />
        </Link>

        <div className="flex min-w-0 items-center justify-end gap-4 sm:gap-6 xl:gap-9">
          <Link className="hidden items-center gap-1.5 hover:text-cyan-600 lg:flex" href="/profile">
            <UserRound aria-hidden="true" size={18} strokeWidth={2.5} />
            Profile
          </Link>
          <Link className="hidden hover:text-cyan-600 lg:block" href="/login">Login</Link>
          <Link className="hidden hover:text-cyan-600 lg:block" href="/sign-up">Sign Up</Link>

          <button
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex size-10 shrink-0 items-center justify-center text-black lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? (
              <X aria-hidden="true" size={24} />
            ) : (
              <Menu aria-hidden="true" size={24} />
            )}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="bg-white shadow-sm lg:hidden" id="mobile-menu">
          <div className="flex flex-col px-4 py-2 text-[15px] font-medium text-black">
            {navLinks.map(({ href, label, active }) => (
              <Link
                aria-current={pathname === active ? "page" : undefined}
                className={`border-b border-zinc-100 py-3 ${linkClass(active)}`}
                href={href}
                key={label}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            <div className="flex items-center gap-6 pt-4 pb-2">
              <Link
                className="hover:text-cyan-600"
                href="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                className="hover:text-cyan-600"
                href="/sign-up"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                className="ml-auto inline-flex items-center gap-1.5 hover:text-cyan-600"
                href="/profile"
                onClick={() => setMenuOpen(false)}
              >
                <UserRound aria-hidden="true" size={18} strokeWidth={2.5} />
                Profile
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
