"use client"

import Link from "next/link"
import Navbar from "@/components/navbar"
import Cursor from "@/components/Cursor" // Import the new cursor
import { motion, Variants, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Custom easing for "flow"
  },
}
const floatAnimation: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
}
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

export default function HomePage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  // Parallax effects for the blobs
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, 300])
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <main ref={ref} className="bg-white text-zinc-800 overflow-hidden font-sans selection:bg-[#F2C7C7] selection:text-zinc-900 cursor-none">
      {/* 'cursor-none' hides the default cursor so we can see our custom one */}

      <Cursor />
      <Navbar />

      {/* --- HERO SECTION WITH BANNER --- */}
      <section className="relative min-h-[95vh] flex flex-col items-center pt-32 px-6">

        {/* Animated Background Gradients (Parallax) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F3] via-[#FFF5F7] to-white -z-20" />

        <motion.div style={{ y: yBlob1 }} className="absolute top-[10%] left-[15%] w-96 h-96 bg-[#FFB7C5] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 -z-10" />
        <motion.div style={{ y: yBlob2 }} className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[#D5F3D8] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 -z-10" />

        {/* --- ANIMATED FULL WIDTH BANNER --- */}
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full bg-[#FFF0F5]/60 backdrop-blur-sm border-y border-white/50 py-20 md:py-32 flex flex-col items-center justify-center text-center shadow-sm mb-16 relative z-10 overflow-hidden group"
        >
            {/* Subtle Shimmer Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_3s_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Floating Text Animation */}
            <motion.div variants={floatAnimation} animate="animate">
                <h1 className="font-[family-name:var(--font-great-vibes)] text-8xl md:text-[11rem] text-[#FF9EAA] drop-shadow-sm leading-tight select-none">
                    Madeleine Abeid
                </h1>
                <p className="font-[family-name:var(--font-great-vibes)] text-3xl md:text-5xl text-[#FF9EAA]/90 mt-[-10px] md:mt-[-30px]">
                    move with luv
                </p>
            </motion.div>
        </motion.section>

        {/* HERO CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-3xl text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight text-zinc-900">
            <span className="block text-zinc-400 font-light text-2xl md:text-3xl mb-2 font-serif italic">Your daily practice to</span>
            Move with calm. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2C7C7] to-[#FFB7C5]">
              Strength with grace.
            </span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="max-w-xl mx-auto text-lg text-zinc-600 mb-10 leading-relaxed">
            Gentle pilates routines designed to help you feel grounded,
            strong, and confident — without the pressure.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.youtube.com/@MadeleineAbeid"
              target="_blank"
              className="px-8 py-4 rounded-full bg-[#FFB7C5] text-zinc-900 font-medium hover:bg-[#F2C7C7] transition-all shadow-lg shadow-[#FFB7C5]/30 hover:shadow-[#FFB7C5]/50"
            >
              Start on YouTube
            </motion.a>

            <Link href="#plans">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border border-zinc-200 text-zinc-600 bg-white/40 backdrop-blur-md transition-all"
              >
                View Plans
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* VALUE SECTION */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Gentle & Effective",
              desc: "Low-impact movements that respect your body and your pace.",
            },
            {
              title: "Build Daily Habits",
              desc: "Short routines designed to seamlessly fit into your real life.",
            },
            {
              title: "Feel-Good Strength",
              desc: "Tone and sculpt while calming your nervous system.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group rounded-[2.5rem] bg-[#D5F3D8]/30 p-10 border border-[#D5F3D8]/50 hover:bg-[#D5F3D8]/60 transition-colors duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-[#D5F3D8] mb-6 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🌿
              </div>
              <h3 className="text-2xl font-serif text-zinc-900 mb-3">
                {item.title}
              </h3>
              <p className="text-zinc-700 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* STORIES SECTION (Testimonials) */}
      <section id="testimonials" className="py-32 px-6 bg-[#FFFBFD] relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2C7C7] opacity-10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 font-serif">Stories from the mat</h2>
            <p className="text-zinc-500 text-lg">Real people finding their rhythm.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                text: "I used to dread working out. Now, this 20-minute morning routine is the best part of my day. I feel so much lighter.",
                author: "Sarah J.",
                color: "bg-white"
              },
              {
                text: "Finally, fitness that doesn't scream at me. The gentle approach has actually helped me build more strength than HIIT ever did.",
                author: "Elena R.",
                color: "bg-gradient-to-b from-[#FFF0F3] to-white"
              },
              {
                text: "The '30-Day Flow' changed my posture completely. My back pain is gone and I walk taller.",
                author: "Davina M.",
                color: "bg-white"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className={`p-10 rounded-[2.5rem] ${t.color} border border-zinc-100 shadow-xl shadow-zinc-200/40`}
              >
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className="text-[#FFB7C5] text-lg">★</span>
                  ))}
                </div>
                <p className="text-zinc-700 mb-8 italic leading-loose text-lg font-light">"{t.text}"</p>
                <p className="font-semibold text-sm text-zinc-900 uppercase tracking-widest opacity-60">— {t.author}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
{/* PLANS SECTION */}
      <section id="plans" className="py-32 px-6 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Choose your rhythm</h2>
            <div className="h-1 w-20 bg-[#FFB7C5] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          
          {/* ONE WEEK CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between rounded-[2.5rem] border border-zinc-200 p-10 hover:border-[#FFB7C5] transition-colors bg-white hover:shadow-2xl hover:shadow-[#FFB7C5]/10"
          >
            <div>
                <h3 className="text-3xl font-serif mb-2">7-Day Reset</h3>
                <p className="text-zinc-500 mb-10 text-lg">A gentle introduction to daily pilates.</p>

                <ul className="space-y-4 text-zinc-700 mb-10">
                {[
                    "15–20 min sessions",
                    "Full body focus",
                    "Beginner friendly"
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg">
                        <span className="w-3 h-3 rounded-full bg-[#FFB7C5]" /> {item}
                    </li>
                ))}
                </ul>
            </div>

            {/* LINK ADDED HERE */}
          
            <Link href="/workout" className="w-full">
              <button className="w-full py-5 rounded-full bg-[#FFF0F3] text-zinc-900 font-medium hover:bg-[#FFB7C5] transition-all hover:scale-[1.02]">
                Start 7-Day Plan
              </button>
            </Link>
          </motion.div>

          {/* ONE MONTH CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between rounded-[2.5rem] bg-gradient-to-br from-[#F2C7C7] to-[#FFB7C5] p-10 shadow-2xl shadow-[#FFB7C5]/30 relative overflow-hidden"
          >
             <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-white/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                <div className="absolute top-0 right-0 bg-white/30 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-zinc-800 uppercase tracking-wider">
                    Most Popular
                </div>
                <h3 className="text-3xl font-serif mb-2 text-zinc-900">30-Day Flow</h3>
                <p className="text-zinc-800/80 mb-10 text-lg">Build consistency, strength, and confidence.</p>

                <ul className="space-y-4 text-zinc-900 mb-10 font-medium">
                {[
                    "Progressive routines",
                    "Sculpt & tone focus",
                    "Mind–body balance"
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg">
                        <span className="w-3 h-3 rounded-full bg-white shadow-sm" /> {item}
                    </li>
                ))}
                </ul>
            </div>

            {/* LINK ADDED HERE */}
            <Link href="/workouts" className="relative z-10 w-full">
                <button className="w-full py-5 rounded-full bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-all hover:scale-[1.02] shadow-xl">
                Start 30-Day Plan
                </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* YOUTUBE CTA */}
      <section className="py-32 px-6 bg-[#FAFAFA]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-8">
            Practice together on YouTube
          </h2>
          <p className="text-zinc-600 mb-12 text-xl font-light">
            Free pilates flows, daily routines, and calming movement
            sessions — anytime you need a moment for yourself.
          </p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.youtube.com/@MadeleineAbeid"
            target="_blank"
            className="inline-block px-12 py-5 rounded-full bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-all shadow-2xl shadow-zinc-900/20"
          >
            Visit YouTube Channel
          </motion.a>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center border-t border-zinc-100">
        <p className="text-zinc-400 text-sm font-light tracking-wide">
          © {new Date().getFullYear()} Madeleine Abeid · move with luv
        </p>
      </footer>
    </main>
  )
}