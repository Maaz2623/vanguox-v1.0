import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCReactProvider } from "@/trpc/client";

export const metadata: Metadata = {
  title: "Vanguox",
  description: "You AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`h-screen antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
