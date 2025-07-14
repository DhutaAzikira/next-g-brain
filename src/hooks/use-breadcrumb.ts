import { usePathname } from "next/navigation";

export type BreadcrumbType = {
  title: string;
  url: string;
};

export function useBreadcrumb(): BreadcrumbType[] {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  let url = "";
  const breadcrumb = segments.map((segment) => {
    url += `/${segment}`;
    return {
      title: segment.charAt(0).toUpperCase() + segment.slice(1),
      url: url,
    };
  });

  return breadcrumb;
}
