// app/providers.tsx
"use client";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { NextUIProvider } from "@nextui-org/react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
