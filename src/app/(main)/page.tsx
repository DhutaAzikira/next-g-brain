import { HomeCommunityView } from "@/modules/home/views/community.view";
import { HomeCtaView } from "@/modules/home/views/cta.view";
import { HomeFaqView } from "@/modules/home/views/faq.view";
import { HomeFeaturesView } from "@/modules/home/views/features.view";
import { HomeHeroView } from "@/modules/home/views/hero.view";
import { HomeInterfaceView } from "@/modules/home/views/interface.view";
import { HomeJobView } from "@/modules/home/views/job.view";
import { HomePricingView } from "@/modules/home/views/pricing.view";
import { HomeProblemView } from "@/modules/home/views/problem.view";
import { HomeStepsView } from "@/modules/home/views/steps.view";
import { HomeTestimonialsView } from "@/modules/home/views/testimonials.view";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <HomeHeroView />
      <HomeJobView />
      <HomeProblemView />
      <HomeStepsView />
      <HomeFeaturesView />
      <HomeInterfaceView />
      <HomeCommunityView />
      <HomeTestimonialsView />
      <HomePricingView />
      <HomeFaqView />
      <HomeCtaView />
    </div>
  );
}
