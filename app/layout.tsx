import type { Metadata, Viewport } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = `https://veigapunk.github.io${basePath}`;
// Absolute so Next cannot re-prefix the basePath it already contains.
const ogImage = `${siteUrl}/og.png`;

export const viewport: Viewport = {
  themeColor: "#f3f1e9",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Bounty Index — Open Bug Bounties",
    template: "%s | The Bounty Index",
  },
  description:
    "A source-linked, automatically refreshed index of publicly open paid bug bounty programs.",
  icons: {
    icon: `${basePath}/favicon.svg`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "The Bounty Index — Open Bug Bounties",
    description:
      "A source-linked, automatically refreshed index of publicly open paid bug bounty programs.",
    siteName: "The Bounty Index",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "The Bounty Index — open bug bounty programs, source-linked and refreshed every 12 hours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bounty Index — Open Bug Bounties",
    description:
      "A source-linked, automatically refreshed index of publicly open paid bug bounty programs.",
    images: [ogImage],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#directory" className="skip-link">
          Skip to directory
        </a>
        {children}
      </body>
    </html>
  );
}
