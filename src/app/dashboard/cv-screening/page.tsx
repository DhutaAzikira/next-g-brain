import { CVBenefitView } from "@/modules/cv-screening/view/cv-benefit.view";
import { CVFileView } from "@/modules/cv-screening/view/cv-file.view";
import { CVHeaderView } from "@/modules/cv-screening/view/cv-header.view";
import { CVTutorialView } from "@/modules/cv-screening/view/cv-tutorial";

export default function CVScreeningPage() {
  return (
    <div className="container mx-auto flex flex-1 flex-col gap-4 p-4 md:gap-6 md:px-6">
      <CVHeaderView />
      <CVFileView />
      <CVTutorialView />
      <CVBenefitView />
    </div>
  );
}
