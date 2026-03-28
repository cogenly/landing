import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Services } from "./components/services";
import { HowItWorks } from "./components/how-it-works";
import { CaseStudies } from "./components/case-studies";
import { Stats } from "./components/stats";
import { FAQ } from "./components/faq";
import { CTA } from "./components/cta";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <CaseStudies />
      <Stats />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
