import { Banner } from "@/components/home/banner"
import { JourneyCta } from "@/components/home/journey-cta"
import { Testimonials } from "@/components/home/testimonials"
import { WhyChoose } from "@/components/home/why-choose"

export default function Home() {
  return (
    <main>
      <Banner />
      <WhyChoose />
      <Testimonials />
      <JourneyCta />

    </main>
  )
}
