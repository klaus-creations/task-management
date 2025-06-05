import React from "react";
import Header from "@/components/header";

export default function WholeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[95%] lg:w-[85%] 2xl:w-[80%] h-full mx-auto overflow-hidden">
      <section className="w-full h-[6%] border-b border-border bg-background-2">
        <Header />
      </section>

      <main className="w-full h-[94%] bg-background dark:bg-background text-foreground">
        {children}
      </main>
    </div>
  );
}
