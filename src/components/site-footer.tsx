import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const quickLinks = ["Home", "Destinations", "My Bookings", "My Profile"]
const supportLinks = ["Help Center", "Terms of Service", "Privacy Policy"]

export function SiteFooter() {
  return (
    <footer className="bg-[#080908] px-5 pb-5 pt-20 text-white sm:px-10 lg:px-20 lg:pt-28">
      <div className="mx-auto max-w-[1250px]">
        <Image alt="Wanderlast" className="h-auto w-full max-w-[542px]" height={80} src="/images/Wanderlast-1.png" width={542} />
        <p className="mt-3 text-lg text-white/65">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-15 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.55fr_1fr_1fr_0.85fr]">
          <div>
            <h3 className="text-lg font-normal">NEWSLETTER</h3>
            <p className="mt-1 text-sm text-white/65">Subscribe for exclusive travel deals and inspiration.</p>
            <form className="mt-4 flex max-w-xs bg-zinc-700">
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base outline-none placeholder:text-white/60"
                id="newsletter-email"
                placeholder="Enter email"
                type="email"
              />
              <button aria-label="Subscribe to the newsletter" className="px-4 text-xl" type="button">
                <ArrowUpRight aria-hidden="true" size={21} />
              </button>
            </form>
          </div>

          <FooterLinks heading="QUICK LINKS" links={quickLinks} />
          <FooterLinks heading="SUPPORT" links={supportLinks} />

          <div>
            <h3 className="text-lg font-normal">CONTACT US</h3>
            <address className="mt-5 space-y-4 text-lg not-italic text-white/65">
              <a className="block hover:text-white" href="tel:7869011622">786 901 1622</a>
              <a className="block hover:text-white" href="mailto:info@wandarland.com">info@wandarland.com</a>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-5 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Wanderlust. All rights reserved.</p>
          <div aria-label="Social media" className="flex gap-8 text-xl text-white">
            <Link aria-label="X" href="#x">𝕏</Link>
            <Link aria-label="LinkedIn" className="text-base font-bold" href="#linkedin">in</Link>
            <Link aria-label="Instagram" href="#instagram">◎</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLinks({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-normal">{heading}</h3>
      <ul className="mt-5 space-y-4 text-lg text-white/65">
        {links.map((link) => (
          <li key={link}>
            <Link className="hover:text-white" href={link === "Home" ? "/" : `#${link.toLowerCase().replace(" ", "-")}`}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
