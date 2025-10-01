"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { components } from "@/data/nav-items";
import { Ellipsis, LogOut, Settings, Settings2, User } from "lucide-react";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateFallbackFromName } from "@/utils/generate-name";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfileSummary } from "@/http/profile/get-use-profile-user";
import { buildFromAppURL } from "@/utils/misc";

function MobileLink({
  href,
  children,
  icon: Icon,
  description,
  pathname,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  description?: string;
  pathname: string;
}) {
  const isActive = pathname === href;

  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={cn(
          "text-muted-foreground hover:bg-accent hover:text-foreground flex flex-col gap-1 rounded-lg px-3 py-2 transition-colors",
          isActive && "bg-primary/10 text-primary font-semibold",
        )}
      >
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="flex-shrink-0">
              <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <span className="text-foreground text-sm">{children}</span>
            {description && (
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                {description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </SheetClose>
  );
}

interface NavButtonProps {
  session?: Session | null;
  isPending?: boolean;
}

export default function NavButton({ session, isPending }: NavButtonProps) {
  const pathname = usePathname();
  const isNavItemActive = useMemo(
    () => components.some((item) => pathname === item.href),
    [pathname],
  );

  const { data, isPending: isProfilePending } = useGetProfileSummary(
    session?.access_token as string,
    {
      enabled: !!session,
    },
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden items-center gap-4 md:flex">
        {isPending ? (
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-20 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        ) : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" className="rounded-full border-0!">
                <Avatar className="border-0">
                  {data?.data.profile ? (
                    <AvatarImage
                      src={buildFromAppURL(data.data.profile.profile_images)}
                      alt={session.user.first_name}
                    />
                  ) : (
                    <AvatarFallback className="border-0 text-gray-700">
                      {generateFallbackFromName(session.user.first_name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/profile/edit"
                    className="flex items-center gap-2"
                  >
                    <Settings2 /> Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/profile/security"
                    className="flex items-center gap-2"
                  >
                    <Settings />
                    Security & Privacy
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-destructive focus:bg-destructive/20 focus:text-destructive cursor-pointer"
              >
                <LogOut className="text-destructive" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button size={"lg"} className="rounded-md">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size={"lg"} className="rounded-md" variant={"outline"}>
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="flex items-center gap-2 md:hidden md:gap-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size={"icon"}
              className="hover:bg-transparent md:hidden"
            >
              <Ellipsis />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle className="sr-only">Main Menu</SheetTitle>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 text-left font-semibold"
              >
                <Image
                  src={"/images/logo/logo.png"}
                  alt="ImpactX"
                  width={100}
                  height={100}
                  className="max-w-[50px]"
                />
              </Link>
            </SheetHeader>
            <nav className="space-y-2 px-6">
              <MobileLink href="/" pathname={pathname}>
                Home
              </MobileLink>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="competition" className="border-none">
                  <AccordionTrigger
                    className={cn(
                      "hover:bg-accent text-muted-foreground rounded-lg px-3 py-3 text-base font-medium hover:no-underline",
                      isNavItemActive && "text-primary font-semibold",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-base">Activity</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-0 pl-4">
                    {components.map((items) => (
                      <MobileLink
                        key={items.href}
                        href={items.href}
                        pathname={pathname}
                        icon={items.icon}
                        description={items.description}
                      >
                        {items.title}
                      </MobileLink>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <MobileLink href="/career-path" pathname={pathname}>
                Career Path
              </MobileLink>
            </nav>
            <SheetFooter>
              {isPending ? (
                <div className="flex w-full flex-col gap-2">
                  <Skeleton className="h-10 w-full rounded-md" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 text-left font-semibold"
                  >
                    <Button size={"lg"} className="w-full rounded-md">
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center gap-2 text-left font-semibold"
                  >
                    <Button
                      size={"lg"}
                      className="w-full rounded-md"
                      variant={"outline"}
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
