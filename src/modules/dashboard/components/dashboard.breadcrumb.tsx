import React from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbType } from "@/hooks/use-breadcrumb";

type InterviewBreadcrumbProps = {
  className?: string;
  items: BreadcrumbType[];
};

export function DashboardBreadcrumb({
  items,
  className,
}: InterviewBreadcrumbProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                {idx !== items.length - 1 ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.url}>{item.title}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-purple-700">{item.title}</BreadcrumbPage>
                )}
              </BreadcrumbItem>

              {idx !== items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
