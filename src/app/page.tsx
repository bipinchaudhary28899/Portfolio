import { Hero }                   from "@/components/sections/Hero";
import { About }                  from "@/components/sections/About";
import { Experience }             from "@/components/sections/Experience";
import { GitaTicker }             from "@/components/sections/GitaTicker";
import { Projects }               from "@/components/sections/Projects";
import { LaptopShowcase }         from "@/components/sections/LaptopShowcase";
import { BeforeAfter }            from "@/components/sections/BeforeAfter";
import { Skills }                 from "@/components/sections/Skills";
import { Education }              from "@/components/sections/Education";
import { HonorsAwards }           from "@/components/sections/HonorsAwards";
import { OpenSource }             from "@/components/sections/OpenSource";
import { CodingPlatforms }        from "@/components/sections/CodingPlatforms";
import { Certifications }         from "@/components/sections/Certifications";
import { ContentLinks }           from "@/components/sections/ContentLinks";
import { CompanyMarquee }         from "@/components/sections/CompanyMarquee";
import { FreelanceBanner }        from "@/components/sections/FreelanceBanner";
import { FreelanceServices }      from "@/components/sections/FreelanceServices";
import { Contact }                from "@/components/sections/Contact";

/* A soft, centered divider shown between two consecutive sections that
   share the same background, so the boundary reads as a section change
   (not a new page) without a harsh full-width line. */
function SectionDivider({ alt = false, full = false }: { alt?: boolean; full?: boolean }) {
  return (
    <div aria-hidden style={{ background: alt ? "var(--bg-alt)" : "var(--bg)" }}>
      <div
        style={{
          width: "100%",
          maxWidth: full ? "none" : "60rem",
          height: 1.5,
          margin: "0 auto",
          background: "var(--border)",
          opacity: 0.8,
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <GitaTicker />
      <Experience />
      <Projects />
      <LaptopShowcase />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <BeforeAfter />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <HonorsAwards />
      <SectionDivider />
      <OpenSource />
      <CodingPlatforms />
      <Certifications />
      <ContentLinks />
      <SectionDivider alt />
      <CompanyMarquee />
      <FreelanceBanner />
      <FreelanceServices />
      <Contact />
    </>
  );
}
