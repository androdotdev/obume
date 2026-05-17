import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { WhyChoose } from "@/components/WhyChoose";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <Portfolio />
      <Services />
      <WhyChoose />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
