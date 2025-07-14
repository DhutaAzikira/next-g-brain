"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumb, type BreadcrumbType } from "@/hooks/use-breadcrumb";

export function BreadcrumbComp({ items }: { items?: BreadcrumbType[] }) {
  const breadcrumb = useBreadcrumb();
  const pathname = usePathname();

  const getLinks = () => {
    if (items) return items;
    return breadcrumb;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {getLinks().map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                {pathname === item.url ? (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.url}>{item.title}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {idx !== getLinks().length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
