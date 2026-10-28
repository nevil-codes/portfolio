import Link from "next/link";
import { site, social, projects, stack, education, certifications, resume, bareUrl } from "@/lib/content";
import PrintButton from "@/components/PrintButton";

export const metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, Computer Science student in ${resume.location}.`,
  alternates: { canonical: "/resume" },
};

export default function Resume() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans">
      <div className="max-w-[760px] mx-auto px-5 sm:px-8 py-12 print:py-6">
        <div className="flex items-center justify-between mb-12 print:hidden">
          <Link href="/" className="font-mono text-[13px] text-neutral-500 no-underline hover:text-neutral-900">
            ← back to site
          </Link>
          <PrintButton />
        </div>

        <header className="mb-10 border-b border-neutral-200 pb-8 print:mb-6 print:pb-5">
          <h1 className="m-0 font-serif text-5xl font-normal tracking-[-0.02em]">{site.name}</h1>
          <p className="m-0 mt-3 text-[15px] leading-relaxed text-neutral-600">{resume.summary}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 font-mono text-[12px] text-neutral-500">
            <span>{resume.location}</span>
            <a href={`mailto:${social.email}`} className="text-neutral-500 no-underline hover:text-neutral-900">
              {social.email}
            </a>
            <a href={social.github} className="text-neutral-500 no-underline hover:text-neutral-900">
              {bareUrl(social.github)}
            </a>
            <a href={social.linkedin} className="text-neutral-500 no-underline hover:text-neutral-900">
              {bareUrl(social.linkedin)}
            </a>
          </div>
        </header>

        <Section title="Education">
          {education.map((e) => (
            <div key={e.degree} className="mb-4 last:mb-0">
              <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1">
                <span className="font-semibold text-[15px]">{e.degree}</span>
                <span className="font-mono text-[12px] text-neutral-500 whitespace-nowrap">{e.years}</span>
              </div>
              <div className="text-[14px] text-neutral-600">{e.school}</div>
            </div>
          ))}
        </Section>

        <Section title="Projects">
          {projects.map((p) => (
            <div key={p.name} className="mb-5 last:mb-0 break-inside-avoid">
              <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1">
                <span className="font-semibold text-[15px]">{p.name}</span>
                <span className="font-mono text-[12px] text-neutral-500 whitespace-nowrap">{p.lang}</span>
              </div>
              <p className="m-0 mt-1 text-[14px] leading-relaxed text-neutral-600">{p.desc}</p>
              {p.stack?.length > 0 && (
                <p className="m-0 mt-1 font-mono text-[11.5px] text-neutral-500">{p.stack.join(" · ")}</p>
              )}
            </div>
          ))}
        </Section>

        {certifications?.length > 0 && (
          <Section title="Certifications">
            {certifications.map((c) => (
              <div key={c.name} className="mb-3 last:mb-0">
                <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1">
                  <span className="font-semibold text-[15px]">{c.name}</span>
                  <span className="font-mono text-[12px] text-neutral-500 whitespace-nowrap">{c.year}</span>
                </div>
                <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1 text-[14px] text-neutral-600">
                  <span>{c.issuer}</span>
                  <a href={c.verifyUrl} className="font-mono text-[12px] text-neutral-500 no-underline hover:text-neutral-900 print:hidden">
                    verify →
                  </a>
                </div>
              </div>
            ))}
          </Section>
        )}

        <Section title="Skills">
          {stack.map((g) => (
            <div key={g.label} className="flex flex-col sm:flex-row gap-x-4 gap-y-0.5 mb-2 last:mb-0 text-[14px]">
              <span className="font-mono text-[12px] text-neutral-500 sm:w-[150px] shrink-0 pt-0.5">{g.label}</span>
              <span className="text-neutral-700">{g.items.join(" · ")}</span>
            </div>
          ))}
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-9 last:mb-0">
      <h2 className="m-0 mb-4 font-mono text-[12px] font-semibold uppercase tracking-[0.15em] text-neutral-400 border-b border-neutral-200 pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}
