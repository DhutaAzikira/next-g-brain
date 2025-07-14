import { ButtonHome } from "@/components/shared/button-home";
import { ButtonTheme } from "@/components/shared/button-theme";

export function AuthNavigation() {
  return (
    <header className="bg-background border-border/40 0 fixed left-0 top-0 z-2 flex h-16 w-full items-center justify-center border-b px-6">
      <div className="container flex w-full items-center justify-between">
        <ButtonHome />

        <ButtonTheme />
      </div>
    </header>
  );
}
