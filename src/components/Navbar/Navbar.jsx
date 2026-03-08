"use client";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import Links from "./Links/Links";
import { useTheme } from '@/providers/Theme'

const Navbar = ({ links }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div
      className="flex h-[60px] w-full sticky top-0 z-30 items-center px-4 justify-between
                    bg-white dark:bg-zinc-900
                    border-b border-zinc-200 dark:border-zinc-700
                    shadow-sm"
    >
      {/* Mobile menu button */}
      <button
        className="md:hidden text-zinc-800 dark:text-zinc-200"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop links */}
      <div className="hidden md:flex gap-4">
        <Links links={links} />
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center p-2 rounded-md
                   text-zinc-700 dark:text-zinc-200
                   hover:bg-zinc-200 dark:hover:bg-zinc-800
                   transition"
      >
        {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="absolute top-12 left-2 w-40 flex flex-col p-2 rounded-md shadow-lg
                bg-white dark:bg-zinc-900
                border border-zinc-200 dark:border-zinc-700
                z-[40] md:hidden"
        >
          <Links links={links} setMenuOpen={setMenuOpen} />
        </div>
      )}
    </div>
  )
};

export default Navbar;