import Image from "next/image";
import logo from "../../public/logo.svg";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <main className="relative mx-auto">
      <nav className="w-screen py-2 px-4 bg-blue-500 flex items-center justify-between mb-10">
        <div className="flex">
          <Link href="/">
            <Image src={logo} alt="logo" height={256} width={256} />
          </Link>
        </div>
        <div className=" max-w-3xl px-3">
          <div className="md:mt-0 md:flex-col">
            <div className="space-x-4">
              <SignedOut>
                <SignInButton>
                  <button className="bg-black text-white font-bold py-2 px-4 rounded">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-black text-white font-bold py-2 px-4 rounded">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="flex flex-row space-x-4 items-center">
                  <UserButton />
                  <button className="bg-black text-white font-bold py-2 px-4 rounded">
                    <SignOutButton afterSignOutUrl="/" />
                  </button>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
