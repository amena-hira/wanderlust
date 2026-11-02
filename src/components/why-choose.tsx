import Image from "next/image"

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description: "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description: "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
]

export function WhyChoose() {
  return (
    <section className="bg-cyan-50 px-5 py-24 sm:py-32" id="about">
      <div className="mx-auto max-w-[1420px]">
        <header className="text-center">
          <h2 className="text-4xl tracking-[-0.055em] text-black sm:text-6xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-lg text-zinc-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article className="min-h-69 bg-white px-11 py-12 shadow-[0_2px_1px_rgb(0_0_0_/_0.04)]" key={feature.title}>
              <Image alt="" aria-hidden="true" height={45} src={feature.icon} width={45} />
              <h3 className="mt-7 text-3xl tracking-[-0.045em] text-black">{feature.title}</h3>
              <p className="mt-4 max-w-sm text-[17px] leading-7 text-zinc-500">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
