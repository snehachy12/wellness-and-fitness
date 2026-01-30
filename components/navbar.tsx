"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const { scrollY } = useScroll()

  // Detect scroll to add frosted glass effect
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Workouts", href: "https://www.youtube.com/@MadeleineAbeid" }, // External for now
    { name: "Plans", href: "#plans" },
    { name: "Testimonials", href: "#testimonials" },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
        scrolled ? "py-4 bg-white/80 backdrop-blur-md shadow-sm" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold tracking-tight z-50">
          Move with calm.
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#plans"
            className="px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Start Free
          </Link>
        </nav>

        {/* MOBILE NAV (RADIX DIALOG) */}
        <div className="md:hidden">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="p-2 text-zinc-800 hover:bg-zinc-100 rounded-full transition-colors">
                <Menu size={24} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white p-6 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm">
                
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold">Menu</span>
                  <Dialog.Close asChild>
                    <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors">
                      <X size={24} />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Dialog.Close key={link.name} asChild>
                      <Link
                        href={link.href}
                        className="text-2xl font-medium text-zinc-800 hover:text-[#FFB7C5] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </Dialog.Close>
                  ))}
                  <div className="h-px bg-zinc-100 my-2" />
                  <Dialog.Close asChild>
                    <Link
                        href="#plans"
                        className="w-full py-4 text-center rounded-full bg-[#FFB7C5] text-zinc-900 font-medium"
                    >
                        Get Started
                    </Link>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </motion.header>
  )
}