import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { SessionProviderProps } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps, { session }: SessionProviderProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
