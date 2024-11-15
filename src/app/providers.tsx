"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, type JSX } from "react";

// Define the type for the props
interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps): JSX.Element {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
