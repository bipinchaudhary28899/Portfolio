import { Hero }               from "@/components/sections/Hero";
import { About }              from "@/components/sections/About";
import { Experience }         from "@/components/sections/Experience";
import { Projects }           from "@/components/sections/Projects";
import { Skills }             from "@/components/sections/Skills";
import { Education }          from "@/components/sections/Education";
import { OpenSource }         from "@/components/sections/OpenSource";
import { CodingPlatforms }    from "@/components/sections/CodingPlatforms";
import { Certifications }     from "@/components/sections/Certifications";
import { FreelanceBanner }    from "@/components/sections/FreelanceBanner";
import { FreelanceServices }  from "@/components/sections/FreelanceServices";
import { Contact }            from "@/components/sections/Contact";
import { Footer }             from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <OpenSource />
      <CodingPlatforms />
      <Certifications />
      <FreelanceBanner />
      <FreelanceServices />
      <Contact />
      <Footer />
    </>
  );
}
