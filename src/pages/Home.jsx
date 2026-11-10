import { Hero } from "../sections/Hero";
import { TrustStrip } from "../sections/TrustStrip";
import { Introduction } from "../sections/Introduction";
import { TreatmentShowcase } from "../sections/TreatmentShowcase";
import { WhyChooseUs } from "../sections/WhyChooseUs";
import { TechnologyShowcase } from "../sections/TechnologyShowcase";
import { DoctorPreview } from "../sections/DoctorPreview";
import { TransformationPreview } from "../sections/TransformationPreview";
import { Testimonials } from "../sections/Testimonials";
import { FinalCTA } from "../sections/FinalCTA";

export const Home = () => {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Introduction />
      <TreatmentShowcase />
      <WhyChooseUs />
      <TechnologyShowcase />
      <DoctorPreview />
      <TransformationPreview />
      <Testimonials />
      <FinalCTA />
    </>
  );
};

