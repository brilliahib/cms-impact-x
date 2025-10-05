"use client";

import NavL from "@/components/atoms/navbar/NavL";
import NavButton from "@/components/atoms/navbar/NavButton";
import NavLink from "@/components/atoms/navbar/NavLink";
import { Session } from "next-auth";

interface NavbarProps {
  session: Session;
  isPending?: boolean;
}

export default function Navbar({ session, isPending }: NavbarProps) {
  return (
    <div className="fixed top-0 left-0 z-40 w-full border-b bg-white">
      <div className="pad-x-xl flex justify-between py-4">
        <NavL />
        <nav className="hidden flex-2 items-center justify-center font-semibold md:flex">
          <NavLink />
        </nav>
        <NavButton session={session} isPending={isPending} />
      </div>
    </div>
  );
}
