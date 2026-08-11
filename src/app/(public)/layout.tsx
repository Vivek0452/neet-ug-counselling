import React from "react";
import Header from "@/components/public/Header";
import BreakingTicker from "@/components/public/BreakingTicker";
import Footer from "@/components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <BreakingTicker />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
