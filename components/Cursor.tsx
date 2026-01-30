"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if hovering over links, buttons, or inputs
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest('a') || target.closest('button')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-zinc-900 mix-blend-difference"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 8),
        y: mousePosition.y - (isHovering ? 24 : 8),
        width: isHovering ? 48 : 16,
        height: isHovering ? 48 : 16,
        backgroundColor: isHovering ? "rgba(255, 183, 197, 0.3)" : "transparent", // Blush pink tint on hover
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    />
  )
}