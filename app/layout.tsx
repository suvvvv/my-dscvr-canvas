import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DSCVR Canvas RSVP App",
  description: "An RSVP app for events using the DSCVR Canvas platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Meta tag indicating this is a DSCVR Canvas */}
        <meta name="dscvr:canvas:version" content="vNext" />
        
        {/* Open Graph image for previewing the Canvas */}
        <meta name="og:image" content="https://my-dscvr-canvas.vercel.app/preview-image.png" />
        
        <meta name="title" content="DSCVR Canvas RSVP App" />
        <meta name="description" content="An RSVP app for events using the DSCVR Canvas platform." />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
