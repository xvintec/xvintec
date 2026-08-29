import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import Script from "next/script";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { NavbarData } from "@/data/NavbarData";

import "./globals.css";

const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xvintec",
  description: "Xvintec",
};

const GTM_ID = "GTM-K6MGDRMS"; // Replace with your actual GTM ID

// TEMPORARY — CLIENT PREVIEW ONLY. REMOVE BEFORE GOING LIVE (see the checklist
// in .github/workflows/deploy-preview.yml). Raw <link href> is not rewritten by
// `basePath`, so the favicon 404s on GitHub Project Pages without this.
const BASE_PATH = process.env.GITHUB_PAGES === "true" ? "/xvintec" : "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={`${BASE_PATH}/logos/favicon.png`} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body
        className={inter.className}
        suppressHydrationWarning={true}
        style={{ backgroundColor: "#FAFAFA" }}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Navbar NavbarData={NavbarData} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
