import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: "--font-bebas-neue",
  style: 'normal'
});

const ibmPlexSans = IBM_Plex_Sans(
  {
    weight: ['400', '500', '600', '700'],
    style: 'normal',
    variable: "--font-ibm-plex-sans",
  }
);

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "UniLib",
  description: "Borrow and read books at your convenience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${ibmPlexSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
