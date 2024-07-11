import Link from "next/link";
import React from "react";
import UserSection from "./user-section";
import Image from "next/image";

const HeaderNav = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container  flex h-20 items-center justify-between  font-mono ">
        <section>
          <Link href={"/"}>
            <Image src="/logo.svg" alt="Logo" width="32" height="32"></Image>
          </Link>
        </section>
        <nav>
          <ul className="flex items-center justify-end space-x-4 ">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/blog"}>Blog</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/profile"}>Profile</Link>
            </li>
          </ul>
        </nav>
        <UserSection />
      </div>
      <hr></hr>
    </header>
  );
};

export default HeaderNav;
