"use client";

import NavL from "@/components/atoms/navbar/NavL";
import NavButton from "@/components/atoms/navbar/NavButton";
import NavLink from "@/components/atoms/navbar/NavLink";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 z-40 w-full bg-white">
      <div className="pad-x-xl flex justify-between py-4">
        <NavL />
        <nav className="hidden items-center font-semibold md:flex">
          <NavLink />
        </nav>
        <NavButton />
      </div>
    </div>
  );
}
