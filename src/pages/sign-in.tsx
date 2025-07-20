import { Button } from "@/components/ui/button";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";

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

export default function SignIn() {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);
  
  // const onSubmit = (values: z.infer<typeof signInSchema>) => {

  //   setTimeout(() => {
  //   }, 1000);

  //   console.log(values);
  // };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]`}>
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col w-1/5 space-y-6">
          <svg
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
            ></path>
          </svg>
          <div className="flex flex-col text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
          </div>
          <div className="flex flex-col space-y-2">
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  variant="outline"
                  type="button"
                  onClick={() => signIn(provider.id, { callbackUrl: '/home' })}
                >
                  {provider.name}
                </Button>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
