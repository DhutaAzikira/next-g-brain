import { BreadcrumbType } from "@/hooks/use-breadcrumb";
import { DashboardBreadcrumb } from "../components/dashboard.breadcrumb";

type DashboardHeaderViewProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  links?: BreadcrumbType[];
};

export function DashboardHeaderView({
  title,
  description,
  children,
  links,
}: DashboardHeaderViewProps) {
  return (
    <header className="bg-background flex min-h-26 w-full items-center justify-between border-b px-4 py-4 md:px-8">
      <div className="flex gap-4">
        <div className="space-y-2">
          {links && <DashboardBreadcrumb items={links} />}

          <div className="space-y-1">
            <h1 className="text-lg font-bold md:text-xl">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      {children}
    </header>
  );
}
