import Navbar from "@/components/organisms/navbar/Navbar";
import { PropsWithChildren } from "react";

export default function AppsLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <main className="pad-x-xl my-24">{children}</main>
    </div>
  );
}
