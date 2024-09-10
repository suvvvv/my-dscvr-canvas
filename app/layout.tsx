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

        <meta name="dscvr:canvas:version" content="vNext" />
        

        <meta name="og:image" content="/preview-image.png" />


      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
