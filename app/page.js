import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Projects from "@/components/Projects";
import Now from "@/components/Now";
import Stack from "@/components/Stack";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Writing from "@/components/Writing";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import Toaster from "@/components/Toaster";
import ClientEffects from "@/components/ClientEffects";
import { site, social, education, stack, resume, expandItem } from "@/lib/content";

// Structured data so search engines know who this site is about.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/images/nevil.jpg`,
  description: site.description,
  email: `mailto:${social.email}`,
  homeLocation: { "@type": "Place", name: resume.location },
  alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.school.split(" — ")[0] })),
  knowsAbout: [...new Set(stack.flatMap((g) => g.items.flatMap(expandItem)))],
  sameAs: [social.github, social.linkedin, social.leetcode, social.hackerrank].filter(Boolean),
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[600] focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-bg"
      >
        Skip to content
      </a>
      <div aria-hidden="true" className="scroll-progress" />
      <Nav />
      <main id="main">
        <Hero />
        <Ticker />
        <Projects />
        <Now />
        <Stack />
        <About />
        <Certifications />
        <Writing />
      </main>
      <Footer />
      <div aria-hidden="true" className="grain" />
      <CommandPalette />
      <Toaster />
      <ClientEffects />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
