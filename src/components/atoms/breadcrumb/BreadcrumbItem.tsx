"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

function formatSegment(segment: string) {
  if (!segment) return "";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export default function BreadcrumbContent() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = [
    { href: "/", label: "Home" },
    ...segments.map((segment, index) => ({
      href: "/" + segments.slice(0, index + 1).join("/"),
      label: formatSegment(segment),
    })),
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-muted-foreground text-sm">
        {breadcrumbs.map((bc, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <div key={bc.href} className="flex items-center gap-2">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{bc.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={bc.href}>{bc.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
