"use client";
import { TaskProvider } from "@/lib/context";

import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
import WholeLayout from "../layouts/whole-layout";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TaskProvider>
        <WholeLayout>{children}</WholeLayout>
        <Toaster richColors />
      </TaskProvider>
    </ThemeProvider>
  );
}
