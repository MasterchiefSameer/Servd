import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from '@clerk/ui/themes';
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Served - AI Recipe",
  description: "Generated AI powered recipe platform for developers",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{  theme: neobrutalism }}>
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Header/>
        <main className="min-h-screen">{children}</main>
        <Toaster richColors/>
        <footer className="py-8 px-4 border-t">
          <div className="max-w-6xl mx-auto flex justify-center items-center">
            <p className="text-stone-500 text-sm">
              Made with love by MasterchiefSameer
              </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
    </ClerkProvider>
  );
}
