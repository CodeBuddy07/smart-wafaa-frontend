import { CoreArchitecture } from "./sections/core-architecture";
import { CtaBanner } from "./sections/cta-banner";
import { Faq } from "./sections/faq";
import { Features } from "./sections/features";
import { Hero } from "./sections/hero";
import { HowItWorks } from "./sections/how-it-works";
import { Pricing } from "./sections/pricing";
import { ProximityPush } from "./sections/proximity-push";
import { RewardFormats } from "./sections/reward-formats";
import { StaffRewards } from "./sections/staff-rewards";
import { TrustedBy } from "./sections/trusted-by";
import { WhyLoyalty } from "./sections/why-loyalty";

/**
 * Landing page composition. Order mirrors the Figma frame top → bottom.
 * Each section owns its own spacing so they can be reordered freely.
 */
export function LandingPage() {
  return (
    <>
      <Hero />
      <CoreArchitecture />
      <Features />
      <HowItWorks />
      <RewardFormats />
      <WhyLoyalty />
      <ProximityPush />
      <StaffRewards />
      <Pricing />
      <TrustedBy />
      <Faq />
      <CtaBanner />
    </>
  );
}
