import Link from "next/link";
import { FC } from "react";
import Button from "../Button";

const Navbar: FC = () => {
  return (
    <nav className="h-6">
      <div className="h-full px-1.6 lg:px-2.8 2xl:max-w-144 2xl:mx-auto flex items-center justify-between">
        <Link href="/">Tabancle</Link>

        <div className="flex items-center gap-1.6">
          <Link
            href="/"
            className="px-0.8 py-0.4 h-2.8 text-1.4 leading-2 font-normal text-black hover:bg-black-04 rounded-0.8"
          >
            Product
          </Link>

          <Link
            href="/"
            className="px-0.8 py-0.4 h-2.8 text-1.4 leading-2 font-normal text-black hover:bg-black-04 rounded-0.8"
          >
            Solutions
          </Link>
        </div>

        <div className="flex items-center gap-0.8">
          <Link
            href="/signup"
            className="px-0.8 py-0.4 h-2.8 text-1.4 leading-2 font-normal bg-white text-black hover:bg-black-10 focus:bg-black-10 rounded-0.8
            border-0.1 border-black-20"
          >
            Signup
          </Link>

          <Link
            href="/login"
            className="px-0.8 py-0.4 h-2.8 text-1.4 leading-2 font-normal bg-black text-white hover:bg-black-40 focus:bg-black-40 rounded-0.8"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
