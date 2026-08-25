import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = `https://veigapunk.github.io${basePath}`;

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
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "The Bounty Index — Open Bug Bounties",
    description:
      "A source-linked, automatically refreshed index of publicly open paid bug bounty programs.",
    siteName: "The Bounty Index",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bounty Index — Open Bug Bounties",
    description:
      "A source-linked, automatically refreshed index of publicly open paid bug bounty programs.",
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
