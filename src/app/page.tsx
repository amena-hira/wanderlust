import { Banner } from "@/components/banner"
import { JourneyCta } from "@/components/journey-cta"
import { Testimonials } from "@/components/testimonials"
import { WhyChoose } from "@/components/why-choose"

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
