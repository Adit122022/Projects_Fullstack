import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  APP_NAME,
  HERO_HEADLINES,
  HERO_SUBTEXT,
} from '@/constants/app.constants'
import { AsciiScene } from '@/components/layout/AsciiScene'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const },
  },
}

export function HomePage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-black text-white">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 sm:px-12 py-12 min-h-[calc(100vh-8rem)] items-center">
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="font-pixel text-[11px] tracking-widest text-[#888888] border border-[#222222] px-3 py-1.5 w-fit"
            variants={itemVariants}
          >
            AI CHATBOT v1.0
          </motion.span>

          <motion.h1 className="leading-none" variants={itemVariants}>
            <span className="font-pixel text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight block">
              {APP_NAME}
            </span>
          </motion.h1>

          <div className="flex flex-col gap-1">
            {HERO_HEADLINES.map((line, i) => (
              <motion.p
                key={line}
                className={`text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight ${
                  i === 0 ? 'text-white' : 'text-[#888888]'
                }`}
                variants={itemVariants}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.p
            className="text-base text-[#888888] max-w-lg leading-relaxed"
            variants={itemVariants}
          >
            {HERO_SUBTEXT}
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 mt-2" variants={itemVariants}>
            <Link
              to="/chat"
              className="font-pixel text-xs px-8 py-3.5 bg-white text-black border border-white hover:bg-transparent hover:text-white transition-all font-bold tracking-wide"
            >
              Start Chatting
            </Link>
            <Link
              to="/features"
              className="text-sm font-medium px-8 py-3.5 border border-[#333333] hover:border-white text-[#888888] hover:text-white transition-all"
            >
              Explore Features
            </Link>
          </motion.div>

          <motion.div
            className="flex items-center gap-6 mt-4 pt-6 border-t border-[#222222]"
            variants={itemVariants}
          >
            <div className="flex flex-col gap-1">
              <span className="font-pixel text-lg text-white">10ms</span>
              <span className="text-xs text-[#555555]">Avg Response</span>
            </div>
            <div className="w-px h-8 bg-[#222222]" />
            <div className="flex flex-col gap-1">
              <span className="font-pixel text-lg text-white">99.9%</span>
              <span className="text-xs text-[#555555]">Uptime</span>
            </div>
            <div className="w-px h-8 bg-[#222222]" />
            <div className="flex flex-col gap-1">
              <span className="font-pixel text-lg text-white">∞</span>
              <span className="text-xs text-[#555555]">Context Depth</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="h-full min-h-[400px] lg:min-h-[500px]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
        >
          <AsciiScene />
        </motion.div>
      </section>

      {/* Marquee Banner */}
      <motion.section
        className="border-y border-[#222222] overflow-hidden py-4 bg-[#0a0a0a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-pixel text-xs tracking-widest text-[#555555] pr-8">
              AKIRA AI — THINK FASTER — SPEAK SMARTER — BUILD BETTER —
            </span>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
