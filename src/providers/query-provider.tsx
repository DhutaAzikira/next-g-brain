"use client"

import { getQueryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export function QueryProvider({children}: React.PropsWithChildren) {
    const queryClient = getQueryClient();
    
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}