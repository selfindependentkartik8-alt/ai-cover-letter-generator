import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://aicoverlettergenerator.krishaiworks.com"
  ),

  title: {
    default: "AI Cover Letter Generator | KrishAIWorks",
    template: "%s | KrishAIWorks",
  },

  description:
    "Create professional, personalized cover letters in seconds with the AI Cover Letter Generator by KrishAIWorks.",

  keywords: [
    "AI cover letter generator",
    "cover letter generator",
    "AI cover letter",
    "free cover letter generator",
    "professional cover letter",
    "job application cover letter",
    "cover letter maker",
    "AI job application tool",
    "KrishAIWorks",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  applicationName: "AI Cover Letter Generator",

  category: "technology",

  alternates: {
    canonical:
      "https://aicoverlettergenerator.krishaiworks.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aicoverlettergenerator.krishaiworks.com",
    siteName: "KrishAIWorks",
    title: "AI Cover Letter Generator | KrishAIWorks",
    description:
      "Create professional and personalized cover letters quickly with the AI Cover Letter Generator.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "AI Cover Letter Generator - KrishAIWorks",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Cover Letter Generator | KrishAIWorks",
    description:
      "Generate professional, personalized cover letters with AI.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krishaiworks.com/#organization",
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://krishaiworks.com/logo.png",
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://krishaiworks.com/#website",
      url: "https://krishaiworks.com",
      name: "KrishAIWorks",
      description:
        "AI-powered tools, productivity utilities, automation, chatbots, websites and custom digital solutions.",
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id":
        "https://aicoverlettergenerator.krishaiworks.com/#webapplication",
      name: "AI Cover Letter Generator",
      url: "https://aicoverlettergenerator.krishaiworks.com/",
      description:
        "Create professional, personalized cover letters in seconds with the AI Cover Letter Generator by KrishAIWorks.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id":
        "https://aicoverlettergenerator.krishaiworks.com/#webpage",
      url: "https://aicoverlettergenerator.krishaiworks.com/",
      name: "AI Cover Letter Generator | KrishAIWorks",
      description:
        "Create professional, personalized cover letters in seconds with the AI Cover Letter Generator by KrishAIWorks.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      about: {
        "@id":
          "https://aicoverlettergenerator.krishaiworks.com/#webapplication",
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Structured Data / JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="lazyOnload"
        />

        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}