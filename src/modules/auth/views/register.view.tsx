import { Card } from "@/components/ui/card";
import { Register } from "../components/register";

export function RegisterView() {
  return (
    <Card className="h-auto w-full max-w-md overflow-hidden transition-all duration-500">
      <Register />
    </Card>
  );
}
