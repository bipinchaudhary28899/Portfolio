import { Hero }               from "@/components/sections/Hero";
import { About }              from "@/components/sections/About";
import { Experience }         from "@/components/sections/Experience";
import { Projects }           from "@/components/sections/Projects";
import { Skills }             from "@/components/sections/Skills";
import { Education }          from "@/components/sections/Education";
import { HonorsAwards }       from "@/components/sections/HonorsAwards";
import { OpenSource }         from "@/components/sections/OpenSource";
import { CodingPlatforms }    from "@/components/sections/CodingPlatforms";
import { Certifications }     from "@/components/sections/Certifications";
import { CompanyMarquee }     from "@/components/sections/CompanyMarquee";
import { FreelanceBanner }    from "@/components/sections/FreelanceBanner";
import { FreelanceServices }  from "@/components/sections/FreelanceServices";
import { Contact }            from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <HonorsAwards />
      <OpenSource />
      <CodingPlatforms />
      <Certifications />
      <CompanyMarquee />
      <FreelanceBanner />
      <FreelanceServices />
      <Contact />
    </>
  );
}
