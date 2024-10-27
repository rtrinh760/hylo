import Image from "next/image";
import localFont from "next/font/local";

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
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
          Welcome to Rikai
        </h1>
        <p className="text-sm sm:text-base text-center sm:text-left">
          Rikai is your ultimate language learning app for immersion. Dive deep
          into the language and culture with our interactive tools and
          resources.
        </p>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by exploring our{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] rounded font-semibold">
              video player.{" "}
            </code>
          </li>
          <li>Track your progress and improve daily.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full bg-white text-black transition-colors flex items-center hover:bg-[#b8b8b8] dark:hover:bg-[#fff] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/sign-up"
          >
            Sign Up
          </a>
          <a
            className="rounded-full border border-solid border-white transition-colors flex items-center hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/sign-in"
          >
            Sign In
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/features"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="Features icon"
            width={16}
            height={16}
          />
          Features
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/community"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Community icon"
            width={16}
            height={16}
          />
          Community
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/contact"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Contact icon"
            width={16}
            height={16}
          />
          Contact Us
        </a>
      </footer>
    </div>
  );
}
