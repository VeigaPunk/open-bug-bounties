import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="section-kicker">404 / DEAD END</p>
      <h1>This scope doesn&rsquo;t exist.</h1>
      <p>
        The page you asked for was never indexed, or the trail went cold. Every listing we do keep
        lives in the directory.
      </p>
      <Link className="primary-button" href="/">
        Back to the index <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
