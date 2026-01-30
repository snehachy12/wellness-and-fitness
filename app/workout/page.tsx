"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Cursor from "@/components/Cursor"
import { motion, AnimatePresence } from "framer-motion"
import { Play, CheckCircle2, Circle, Clock, ChevronLeft, Trophy } from "lucide-react"

// --- TYPES ---
type Video = {
  id: string
  day: string
  title: string
  duration: string
  videoUrl: string // In a real app, this would be the YouTube ID
}

type Plan = {
  id: string
  title: string
  subtitle: string
  totalVideos: number
  color: string
  videos: Video[]
}

// --- MOCK DATA (Based on your Screenshot) ---
const workoutPlans: Plan[] = [
  {
    id: "1-week-reset",
    title: "1 Week Pilates Schedule",
    subtitle: "Reset your body & mind",
    totalVideos: 7,
    color: "bg-[#F2C7C7]", // Blush
    videos: [
      { id: "v1", day: "Day 1", title: "25MIN ‘Hourglass’ Full Body Pilates", duration: "25 min", videoUrl: "https://youtu.be/LMFQ6BiQ_TU?si=1ty1IHvXRllkT7ek" },
      { id: "v2", day: "Day 2", title: "6MIN Daily Pilates Abs", duration: "7 min", videoUrl: "https://youtu.be/9H12WQfvFUU?si=H3kyiWVBtLpu3W2y" },
      { id: "v3", day: "Day 3", title: "20MIN Hourglass Full Body Pilates", duration: "20 min", videoUrl: "https://youtu.be/spzi26BmbWU?si=lP0kKpDBO6A9pyFK" },
      { id: "v4", day: "Day 4", title: "20MIN Lower Body Pilates", duration: "25 min", videoUrl: "https://youtu.be/wfoD3GHa2MI?si=sIC8qa7KjkHnfa6H" },
      { id: "v5", day: "Day 5", title: "10MIN Toned Lower Abs & Waist", duration: "10 min", videoUrl: "https://youtu.be/jRimWH9Qe3E?si=UH_GoJJ-dFedoZgL" },
      { id: "v6", day: "Day 6", title: "10MIN Daily Deep Core & Ab Pilates", duration: "10 min", videoUrl: "https://youtu.be/IoAgYYWlgQo?si=LgHMnTkmY_mz656i" },
      { id: "v7", day: "Day 7", title: "Rest Day", duration: "30 min", videoUrl: "https://www.youtube.com/embed/PLACEHOLDER" },
    ]
  },
  {
    id: "busy-girl",
    title: "1 Week Busy Girl Pilates",
    subtitle: "Effective workouts in 15 mins",
    totalVideos: 5,
    color: "bg-[#D5F3D8]", // Mint
    videos: [
      { id: "bg1", day: "Day 1", title: "5 Min Ab + Waist", duration: "5 min", videoUrl: "https://www.youtube.com/embed/PLACEHOLDER" },
      { id: "bg2", day: "Day 2", title: "Standing Arms", duration: "10 min", videoUrl: "https://www.youtube.com/embed/PLACEHOLDER" },
      { id: "bg3", day: "Day 3", title: "Quick Glutes", duration: "12 min", videoUrl: "https://www.youtube.com/embed/PLACEHOLDER" },
      { id: "bg4", day: "Day 4", title: "Morning Mobility", duration: "10 min", videoUrl: "https://www.youtube.com/embed/PLACEHOLDER" },
      { id: "bg5", day: "Day 5", title: "Full Body Express", duration: "15 min", videoUrl: "https://www.youtube.com/embed/PLACEHOLDER" },
    ]
  },
  {
    id: "1-month-plan",
    title: "1 Month Pilates Plan",
    subtitle: "Transform your habits",
    totalVideos: 25,
    color: "bg-[#FFF0F3]", // Light Pink
    videos: Array.from({ length: 25 }).map((_, i) => ({
      id: `m${i}`, day: `Day ${i + 1}`, title: `Month Challenge Day ${i + 1}`, duration: "20 min", videoUrl: ""
    }))
  },
  {
    id: "flexibility",
    title: "1 Week Flexibility",
    subtitle: "Lengthen & Tone",
    totalVideos: 6,
    color: "bg-[#E6E6FA]", // Lavender
    videos: [
       { id: "f1", day: "Day 1", title: "Deep Stretch", duration: "20 min", videoUrl: "" },
       // ... add more
    ]
  },
]

export default function WorkoutsPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  
  // State to track completed video IDs (e.g., ["v1", "bg2"])
  const [completedVideos, setCompletedVideos] = useState<string[]>([])

  // Load progress from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("pilatesProgress")
    if (saved) setCompletedVideos(JSON.parse(saved))
  }, [])

  // Toggle completion status
  const toggleVideo = (videoId: string) => {
    setCompletedVideos(prev => {
      const newSet = prev.includes(videoId) 
        ? prev.filter(id => id !== videoId) 
        : [...prev, videoId]
      
      localStorage.setItem("pilatesProgress", JSON.stringify(newSet))
      return newSet
    })
  }

  // Calculate progress percentage for a plan
  const getProgress = (plan: Plan) => {
    const completedCount = plan.videos.filter(v => completedVideos.includes(v.id)).length
    return Math.round((completedCount / plan.videos.length) * 100)
  }

  return (
    <main className="min-h-screen bg-white text-zinc-800 font-sans selection:bg-[#F2C7C7] cursor-none pb-20">
      <Cursor />
      <Navbar />

      {/* --- HEADER --- */}
      <section className="pt-32 pb-12 px-6 text-center">
        <h1 className="font-[family-name:var(--font-great-vibes)] text-6xl md:text-8xl text-[#FF9EAA] mb-4">
          Challenges
        </h1>
        <p className="text-zinc-500 max-w-lg mx-auto">
          Commit to yourself. Pick a plan, track your progress, and watch yourself grow stronger every day.
        </p>
      </section>

      {/* --- CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: PLAN GRID (The "Playlist" View) */}
          {!selectedPlan ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {workoutPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  layoutId={`card-${plan.id}`}
                  onClick={() => setSelectedPlan(plan)}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer rounded-[2rem] border border-zinc-100 shadow-xl shadow-zinc-100 bg-white overflow-hidden relative"
                >
                  {/* Thumbnail Area */}
                  <div className={`h-48 ${plan.color} relative flex items-center justify-center p-6`}>
                    <div className="text-center z-10">
                         <h3 className="font-serif text-2xl mb-1">{plan.title}</h3>
                         <div className="inline-block bg-white/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-700">
                             {plan.totalVideos} Videos
                         </div>
                    </div>
                    {/* Hover Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <Play className="ml-1 fill-zinc-900 text-zinc-900" size={24} />
                        </div>
                    </div>
                  </div>

                  {/* Card Body & Progress */}
                  <div className="p-6">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-zinc-500 text-sm mb-1">{plan.subtitle}</p>
                            <h4 className="font-semibold text-lg">{getProgress(plan)}% Complete</h4>
                        </div>
                        {getProgress(plan) === 100 && (
                            <Trophy className="text-[#FFB7C5] animate-bounce" />
                        )}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#FFB7C5] transition-all duration-1000 ease-out"
                            style={{ width: `${getProgress(plan)}%` }}
                        />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (

          /* VIEW 2: ACTIVE PLAN DETAIL (The "Checklist" View) */
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative"
            >
              <button 
                onClick={() => setSelectedPlan(null)}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group"
              >
                <div className="p-2 rounded-full bg-zinc-100 group-hover:bg-[#FFB7C5] transition-colors">
                    <ChevronLeft size={20} />
                </div>
                Back to Challenges
              </button>

              <div className="grid lg:grid-cols-3 gap-10">
                {/* LEFT: Video Player / Highlight */}
                <div className="lg:col-span-2">
                   <motion.div layoutId={`card-${selectedPlan.id}`} className={`rounded-[2.5rem] ${selectedPlan.color} p-8 md:p-12 mb-8 relative overflow-hidden`}>
                       <h2 className="text-4xl md:text-5xl font-serif mb-4 relative z-10">{selectedPlan.title}</h2>
                       <p className="text-lg opacity-80 mb-8 relative z-10">{selectedPlan.subtitle}</p>
                       
                       {/* Featured Video (Usually the next incomplete one) */}
                       <div className="aspect-video bg-black/5 rounded-2xl flex items-center justify-center relative z-10 backdrop-blur-sm border border-white/20">
                            <p className="text-zinc-600 font-medium">Video Player Placeholder</p>
                            {/* Replace this div with an actual iframe when you have links: 
                                <iframe src={currentVideoUrl} className="w-full h-full rounded-2xl" ... /> 
                            */}
                       </div>

                       {/* Decorative blobs */}
                       <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 blur-[80px] rounded-full pointer-events-none" />
                   </motion.div>
                </div>

                {/* RIGHT: Checklist */}
                <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-xl shadow-zinc-100/50 p-8 h-fit">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        Your Schedule
                        <span className="text-xs font-normal text-zinc-400 bg-zinc-100 px-2 py-1 rounded-full">
                            {getProgress(selectedPlan)}% Done
                        </span>
                    </h3>

                    <div className="space-y-3">
                        {selectedPlan.videos.map((video) => {
                            const isCompleted = completedVideos.includes(video.id)
                            return (
                                <div 
                                    key={video.id}
                                    onClick={() => toggleVideo(video.id)}
                                    className={`group flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer border ${
                                        isCompleted 
                                            ? "bg-[#D5F3D8]/30 border-[#D5F3D8]" 
                                            : "hover:bg-zinc-50 border-transparent hover:border-zinc-100"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`transition-colors duration-300 ${isCompleted ? "text-[#D5F3D8]" : "text-zinc-200 group-hover:text-[#FFB7C5]"}`}>
                                            {isCompleted ? <CheckCircle2 className="fill-green-500 text-white" size={24} /> : <Circle size={24} />}
                                        </div>
                                        <div>
                                            <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${isCompleted ? "text-green-700" : "text-zinc-400"}`}>
                                                {video.day}
                                            </p>
                                            <p className={`font-medium ${isCompleted ? "text-zinc-400 line-through" : "text-zinc-800"}`}>
                                                {video.title}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium text-zinc-400 flex items-center gap-1">
                                        <Clock size={12} /> {video.duration}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}