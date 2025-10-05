import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/organisms/navbar/Navbar";
import GlobalProvider from "@/components/organisms/GlobalProvider";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ImpactX - Project Collaboration and Career Development Platform",
  description:
    "ImpactX helps teams work together efficiently, manage projects seamlessly, and grow your career with real-world collaborative experiences.",
  keywords: [
    "project collaboration",
    "career development",
    "project management",
    "teamwork",
    "collaboration app",
    "productivity tools",
    "online platform",
  ],
  openGraph: {
    title: "ImpactX - Project Collaboration and Career Development Platform",
    description:
      "ImpactX helps teams work together efficiently, manage projects seamlessly, and grow your career with real-world collaborative experiences.",
    url: "https://cms-impact-x.vercel.app",
    siteName: "ImpactX",
    images: [
      {
        url: "https://cms-impact-x.vercel.app/images/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "ImpactX",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakartaSans.variable} font-jakarta-sans antialiased`}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
