import Link from "next/link";
import UserSection from "./user-section";
import Image from "next/image";
import { Suspense } from "react";

const HeaderNav = () => {
  // 定义导航
  const navObject = [
    {
      name: "首页",
      link: "/",
      en_name: "Home",
    },
    {
      name: "文章",
      link: "/articles",
      en_name: "Articles",
    },
    {
      name: "关于",
      link: "/about",
      en_name: "About",
    },
    {
      name: "我的",
      link: "/profile",
      en_name: "Profile",
    },
  ];
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <section className="container flex h-20 items-center justify-between font-mono">
        <nav className="hidden md:block">
          <Link href={"/"}>
            <Image src="/logo.svg" alt="Logo" width="32" height="32"></Image>
          </Link>
        </nav>
        <nav>
          <ul className="flex items-center justify-end space-x-4  font-medium">
            {navObject.map((item) => (
              <li key={item.en_name}>
                <Link href={item.link} className="hover:text-primary">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Suspense fallback={<p>loading...</p>}>
          <UserSection />
        </Suspense>
      </section>
      <hr></hr>
    </header>
  );
};

export default HeaderNav;
