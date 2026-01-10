import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jean Paul Elisa | Software Engineer",
  description:
    "Jean Paul Elisa NIYOKWIZERWA - Full Stack Software Engineer specializing in building robust, scalable applications that deliver exceptional user experiences.",
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Node.js Developer",
    "Web Development",
    "Portfolio",
    "Kigali",
    "Rwanda",
  ],
  authors: [{ name: "Jean Paul Elisa NIYOKWIZERWA" }],
  creator: "Jean Paul Elisa NIYOKWIZERWA",
  metadataBase: new URL("https://ndevuspace.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ndevuspace.com",
    siteName: "Jean Paul Elisa",
    title: "Jean Paul Elisa | Software Engineer",
    description:
      "Full Stack Software Engineer specializing in building robust, scalable applications that deliver exceptional user experiences.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jean Paul Elisa - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jeanpaulelisa",
    creator: "@jeanpaulelisa",
    title: "Jean Paul Elisa | Software Engineer",
    description:
      "Full Stack Software Engineer specializing in building robust, scalable applications that deliver exceptional user experiences.",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="font-sans bg-primary text-white antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
