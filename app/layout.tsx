import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import {SessionProvider} from "next-auth/react"
import { auth } from "@/auth";

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: "--font-bebas-neue",
  style: 'normal',
  subsets: ['latin'],
});

const ibmPlexSans = IBM_Plex_Sans(
  {
    weight: ['400', '500', '600', '700'],
    style: 'normal',
    variable: "--font-ibm-plex-sans",
    subsets: ['latin'],
  }
);

export const metadata: Metadata = {
  title: "UniLib",
  description: "Borrow and read books at your convenience",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${bebasNeue.variable} ${ibmPlexSans.variable} antialiased`}
        >
          {children}
          <Toaster/>
        </body>
      </SessionProvider>
      
    </html>
  );
}
