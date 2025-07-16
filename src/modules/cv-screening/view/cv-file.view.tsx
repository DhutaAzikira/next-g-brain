import { Card } from "@/components/ui/card";
import { CVScreeningForm } from "../components/form/upload-cv.form";

export function CVFileView() {
  return (
    <Card className="shadow-none relative overflow-hidden">
      <CVScreeningForm />
    </Card>
  );
}
