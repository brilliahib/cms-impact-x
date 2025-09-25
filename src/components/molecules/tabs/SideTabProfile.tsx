"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SideTabProfile() {
  const pathname = usePathname();

  const links = [
    { href: "/profile/edit", label: "Edit Profile" },
    { href: "/profile/security", label: "Security & Privacy" },
  ];

  return (
    <div className="hidden w-full flex-col justify-start gap-2 md:flex">
      {links.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Button
            key={href}
            asChild
            variant="ghost"
            className={cn(
              "justify-start",
              isActive
                ? "bg-white text-black hover:bg-white"
                : "text-muted-foreground",
            )}
          >
            <Link href={href}>{label}</Link>
          </Button>
        );
      })}
    </div>
  );
}
