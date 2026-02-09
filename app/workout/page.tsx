"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Cursor from "@/components/Cursor"
import { motion, AnimatePresence } from "framer-motion"
import { Play, CheckCircle2, Circle, Clock, ChevronLeft, Trophy, Flame, RotateCcw, Bell, X } from "lucide-react"

// --- TYPES ---
type Video = {
  id: string
  day: string
  title: string
  duration: string
  videoUrl: string 
}

type Plan = {
  id: string
  title: string
  subtitle: string
  totalVideos: number
  color: string
  videos: Video[]
}

// --- HELPER: EXTRACT YOUTUBE THUMBNAIL ---
const getYouTubeThumbnail = (url: string) => {
  if (!url) return null
  // Regex to handle various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11)
    ? `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg` // High res thumbnail
    : null
}

// --- MOCK DATA (With Real Links for testing) ---
const workoutPlans: Plan[] = [
  {
    id: "busy-girl",
    title: "1 Week Busy Girl Pilates",
    subtitle: "Reset your body & mind",
    totalVideos: 7,
    color: "bg-[#F2C7C7]", 
    videos: [
      // I added a real link here so you can see the thumbnail work
      { id: "v1", day: "Day 1", title: "Full Body Awakening", duration: "25 min", videoUrl: "https://www.youtube.com/watch?v=y5JdwR4GrVo&list=PLYlEA5zVEdPHA8uOjByRczsBHFwmzAXFR" },
      { id: "v2", day: "Day 2", title: "Waist Snatcher", duration: "15 min", videoUrl: "https://www.youtube.com/watch?v=FOw7OhefSSU&list=PLYlEA5zVEdPHA8uOjByRczsBHFwmzAXFR&index=2" },
      { id: "v3", day: "Day 3", title: "Rest & Stretch", duration: "20 min", videoUrl: "https://www.youtube.com/watch?v=_3PYcPxniCE&list=PLYlEA5zVEdPHA8uOjByRczsBHFwmzAXFR&index=3" },
      { id: "v4", day: "Day 4", title: "Lower Body Burn", duration: "25 min", videoUrl: "https://www.youtube.com/watch?v=zl4elC-cxho&list=PLYlEA5zVEdPHA8uOjByRczsBHFwmzAXFR&index=4" },
      { id: "v5", day: "Day 5", title: "Pilates for Posture", duration: "20 min", videoUrl: "https://www.youtube.com/watch?v=kGTh0-Rn3u0&list=PLYlEA5zVEdPHA8uOjByRczsBHFwmzAXFR&index=5" },
      
    ]
  },
  {
    id: "1 week reset",
    title: "1 Week Pilates",
    subtitle: "Effective workouts in 15 mins",
    totalVideos: 5,
    color: "bg-[#D5F3D8]", 
    videos: [
      { id: "bg1", day: "Day 1", title: "5 Min Ab + Waist", duration: "5 min", videoUrl: "https://www.youtube.com/watch?v=y5JdwR4GrVo&list=PLYlEA5zVEdPHA8uOjByRczsBHFwmzAXFR" },
      { id: "bg2", day: "Day 2", title: "Standing Arms", duration: "10 min", videoUrl: "" },
      { id: "bg3", day: "Day 3", title: "Quick Glutes", duration: "12 min", videoUrl: "" },
      { id: "bg4", day: "Day 4", title: "Morning Mobility", duration: "10 min", videoUrl: "" },
      { id: "bg5", day: "Day 5", title: "Full Body Express", duration: "15 min", videoUrl: "" },
      { id: "v6", day: "Day 6", title: "Total Core", duration: "15 min", videoUrl: "" },
      { id: "v7", day: "Day 7", title: "Self Care Sunday", duration: "30 min", videoUrl: "" },
    ]
  },
  {
    id: "1-month-plan",
    title: "1 Month Pilates Plan",
    subtitle: "Transform your habits",
    totalVideos: 25,
    color: "bg-[#FFF0F3]", 
    videos: Array.from({ length: 25 }).map((_, i) => ({
      id: `m${i}`, day: `Day ${i + 1}`, title: `Month Challenge Day ${i + 1}`, duration: "20 min", videoUrl: ""
    }))
  },
]

export default function WorkoutsPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [completedVideos, setCompletedVideos] = useState<string[]>([])
  
  // --- STREAK & REMINDER STATE ---
  const [streak, setStreak] = useState(0)
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(null)
  const [showGentleReminder, setShowGentleReminder] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  // 1. Load Data on Mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("pilatesProgress")
    if (savedProgress) setCompletedVideos(JSON.parse(savedProgress))

    const savedStreak = localStorage.getItem("pilatesStreak")
    const savedDate = localStorage.getItem("pilatesLastDate")
    const savedNotif = localStorage.getItem("pilatesNotifications")

    if (savedStreak) setStreak(parseInt(savedStreak))
    if (savedDate) setLastActiveDate(savedDate)
    if (savedNotif === "true") setNotificationsEnabled(true)

    const today = new Date().toLocaleDateString()
    if (savedDate !== today) {
        const timer = setTimeout(() => setShowGentleReminder(true), 1500)
        return () => clearTimeout(timer)
    }
  }, [])

  // 2. Handle Streak Logic
  const updateStreak = () => {
    const today = new Date().toLocaleDateString()
    if (lastActiveDate !== today) {
      const newStreak = streak + 1
      setStreak(newStreak)
      setLastActiveDate(today)
      localStorage.setItem("pilatesStreak", newStreak.toString())
      localStorage.setItem("pilatesLastDate", today)
      setShowGentleReminder(false)
    }
  }

  // 3. Reset Streak
  const resetStreak = () => {
    if (confirm("Do you want to reset your streak to 0?")) {
        setStreak(0)
        setLastActiveDate(null)
        localStorage.setItem("pilatesStreak", "0")
        localStorage.removeItem("pilatesLastDate")
    }
  }

  // 4. Notifications
  const toggleNotifications = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications")
      return
    }
    if (notificationsEnabled) {
        setNotificationsEnabled(false)
        localStorage.setItem("pilatesNotifications", "false")
        return
    }
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
      setNotificationsEnabled(true)
      localStorage.setItem("pilatesNotifications", "true")
      new Notification("You're all set! 🌸", {
        body: "I'll send you a gentle reminder to move with calm every day."
      })
    }
  }

  const toggleVideo = (videoId: string) => {
    setCompletedVideos(prev => {
      const isCompleting = !prev.includes(videoId)
      if (isCompleting) updateStreak()
      const newSet = isCompleting ? [...prev, videoId] : prev.filter(id => id !== videoId)
      localStorage.setItem("pilatesProgress", JSON.stringify(newSet))
      return newSet
    })
  }

  const getProgress = (plan: Plan) => {
    const completedCount = plan.videos.filter(v => completedVideos.includes(v.id)).length
    return Math.round((completedCount / plan.videos.length) * 100)
  }

  return (
    <main className="min-h-screen bg-white text-zinc-800 font-sans selection:bg-[#F2C7C7] cursor-none pb-20">
      <Cursor />
      <Navbar />

      <AnimatePresence>
        {showGentleReminder && (
            <motion.div
                initial={{ opacity: 0, y: 50, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 20, x: "-50%" }}
                className="fixed bottom-10 left-1/2 z-50 flex items-center gap-4 bg-zinc-900 text-white pl-6 pr-4 py-4 rounded-full shadow-2xl shadow-zinc-900/30 backdrop-blur-md"
            >
                <div>
                    <p className="font-medium text-sm">Hi lovely! 🌿</p>
                    <p className="text-xs text-zinc-400">A gentle reminder to move your body today.</p>
                </div>
                <button 
                    onClick={() => setShowGentleReminder(false)}
                    className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                >
                    <X size={16} />
                </button>
            </motion.div>
        )}
      </AnimatePresence>

      <section className="pt-32 pb-12 px-6 text-center relative">
        <h1 className="font-[family-name:var(--font-great-vibes)] text-6xl md:text-8xl text-[#FF9EAA] mb-4">
          Challenges
        </h1>
        <p className="text-zinc-500 max-w-lg mx-auto mb-8">
          Commit to yourself. Pick a plan, track your progress, and watch yourself grow stronger.
        </p>

        <div className="inline-flex items-center gap-4 bg-white border border-zinc-100 shadow-sm rounded-full px-5 py-2">
            <div className="flex items-center gap-2">
                <Flame className={`${streak > 0 ? "fill-[#FFB7C5] text-[#FFB7C5]" : "text-zinc-300"} transition-colors`} size={20} />
                <span className="font-bold text-zinc-800">{streak} Day Streak</span>
            </div>
            <div className="w-px h-4 bg-zinc-200" />
            <button 
                onClick={toggleNotifications}
                className={`flex items-center gap-2 text-xs font-medium transition-colors ${notificationsEnabled ? "text-[#FFB7C5]" : "text-zinc-400 hover:text-zinc-600"}`}
            >
                <Bell size={16} className={notificationsEnabled ? "fill-[#FFB7C5]" : ""} />
                {notificationsEnabled ? "On" : "Remind Me"}
            </button>
            <div className="w-px h-4 bg-zinc-200" />
            <button onClick={resetStreak} className="text-xs font-medium text-zinc-400 hover:text-zinc-800 flex items-center gap-1 transition-colors">
                <RotateCcw size={12} />
            </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          
          {/* GRID VIEW */}
          {!selectedPlan ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {workoutPlans.map((plan) => {
                // GET THUMBNAIL FROM THE FIRST VIDEO IN THE PLAN
                const thumbnail = getYouTubeThumbnail(plan.videos[0]?.videoUrl)

                return (
                    <motion.div
                    key={plan.id}
                    layoutId={`card-${plan.id}`}
                    onClick={() => setSelectedPlan(plan)}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer rounded-[2rem] border border-zinc-100 shadow-xl shadow-zinc-100 bg-white overflow-hidden relative"
                    >
                    {/* THUMBNAIL AREA */}
                    <div className={`h-48 ${plan.color} relative flex items-center justify-center overflow-hidden`}>
                        {/* IF THUMBNAIL EXISTS, SHOW IMAGE. ELSE SHOW TITLE */}
                        {thumbnail ? (
                             <img 
                                src={thumbnail} 
                                alt={plan.title} 
                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                             />
                        ) : (
                            <div className="text-center z-10 p-6">
                                <h3 className="font-serif text-2xl mb-1">{plan.title}</h3>
                                <div className="inline-block bg-white/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-700">
                                    {plan.totalVideos} Videos
                                </div>
                            </div>
                        )}
                        
                        {/* Dark Overlay on Image for text readability if needed, or just hover effect */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-30 transition-opacity" />

                        {/* PLAY BUTTON */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all">
                                <Play className="ml-1 fill-zinc-900 text-zinc-900" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h3 className="font-serif text-xl mb-1">{plan.title}</h3>
                                <p className="text-zinc-500 text-sm mb-1">{plan.subtitle}</p>
                            </div>
                            {getProgress(plan) === 100 && (
                                <Trophy className="text-[#FFB7C5] animate-bounce" />
                            )}
                        </div>
                        
                        <div className="flex items-center gap-3 mb-2">
                             <span className="text-xs font-bold text-zinc-400">{getProgress(plan)}% Complete</span>
                             <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-[#FFB7C5] transition-all duration-1000 ease-out"
                                    style={{ width: `${getProgress(plan)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    </motion.div>
                )
              })}
            </motion.div>
          ) : (
            /* DETAIL VIEW */
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
                <div className="lg:col-span-2">
                   {/* HEADER CARD IN DETAIL VIEW */}
                   <motion.div layoutId={`card-${selectedPlan.id}`} className={`rounded-[2.5rem] relative overflow-hidden h-[400px]`}>
                       {/* Background Image from First Video */}
                       {getYouTubeThumbnail(selectedPlan.videos[0]?.videoUrl) ? (
                           <>
                            <img 
                                src={getYouTubeThumbnail(selectedPlan.videos[0]?.videoUrl) || ""} 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                           </>
                       ) : (
                           <div className={`absolute inset-0 ${selectedPlan.color}`} />
                       )}

                       <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10 text-white">
                           <h2 className="text-4xl md:text-5xl font-serif mb-2">{selectedPlan.title}</h2>
                           <p className="text-lg opacity-90">{selectedPlan.subtitle}</p>
                       </div>
                   </motion.div>
                </div>

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