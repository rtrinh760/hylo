import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hylo",
  description: "AI platform to enhance studying",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="container mx-auto">
            <div>
              <div className="flex justify-center items-center min-h-screen">
                <div className="pb-20">{children}</div>
              </div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
