/**
 * Application Providers
 *
 * Centralized wrapper for all application-level providers.
 * This follows the Composition Pattern for better separation of concerns.
 *
 * @module components/layout/providers
 */

'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/common/theme-provider';

interface ProvidersProps {
  readonly children: ReactNode;
}

/**
 * Root providers wrapper component
 *
 * Wraps the application with necessary providers in the correct order.
 * Order matters: outer providers wrap inner providers.
 *
 * @param {ProvidersProps} props - Component props
 * @returns Provider wrapper
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
