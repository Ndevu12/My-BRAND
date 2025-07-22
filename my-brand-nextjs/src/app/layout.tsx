import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "NdevuSpace | Full Stack Developer Portfolio",
  description:
    "NdevuSpace - Full Stack Developer Portfolio showcasing innovative web solutions, projects and technical expertise",
  keywords: [
    "Full Stack Developer",
    "Portfolio",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Ndevu" }],
  creator: "Ndevu",
  metadataBase: new URL("https://ndevuspace.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ndevuspace.com",
    siteName: "NdevuSpace",
    title: "NdevuSpace | Full Stack Developer Portfolio",
    description:
      "Full Stack Developer Portfolio showcasing innovative web solutions, projects and technical expertise",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "NdevuSpace Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ndevu",
    creator: "@ndevu",
    title: "NdevuSpace | Full Stack Developer Portfolio",
    description:
      "Full Stack Developer Portfolio showcasing innovative web solutions, projects and technical expertise",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-primary text-white font-roboto min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
