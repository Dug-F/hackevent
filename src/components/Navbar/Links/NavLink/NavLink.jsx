"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item, setMenuOpen }) => {
  const pathName = usePathname();
  const isActive = pathName === item.path;

  return (
    <Link
      href={item.path}
      className={`block min-w-[75px] px-3 py-2 rounded-md text-left md:text-center
        text-zinc-800 dark:text-zinc-200
        hover:bg-zinc-100 dark:hover:bg-zinc-800
        ${isActive ? "bg-zinc-200 dark:bg-zinc-700" : ""}`}
      onClick={() => setMenuOpen && setMenuOpen(false)}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;