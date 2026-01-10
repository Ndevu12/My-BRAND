"use client";

import { Header, Footer } from "@/components/layout";
import {
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
