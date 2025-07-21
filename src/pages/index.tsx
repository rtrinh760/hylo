import localFont from "next/font/local";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Footer } from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex-1 flex flex-col gap-8 items-center justify-center p-8 sm:p-20">
        <svg
          data-slot="icon"
          fill="none"
          stroke-width="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-20 w-20"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
          ></path>
        </svg>
        <h1 className="text-2xl sm:text-4xl font-bold text-center sm:text-left">
          Welcome to Hylo
        </h1>
        <p className="text-sm sm:text-base text-center sm:text-left">
          Hylo is your ultimate language learning app for immersion. Dive deep
          into the language and culture with our interactive tools and
          resources.
        </p>
        {session?.user?.name ? (
          <div className="space-x-2">
            <Button variant="secondary" asChild>
              <Link href="/home">Home</Link>
            </Button>
            <Button variant="outline" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        ) : (
          <Button variant="secondary" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
        )}
      </main>
      <Footer />
    </div>
  );
}
