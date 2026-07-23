import { motion } from 'framer-motion'
import { APP_NAME, TAGLINE } from '@/constants/app.constants'

export function AboutPage() {
  return (
    <div className="px-6 sm:px-12 py-12 max-w-4xl mx-auto min-h-[calc(100vh-10rem)] bg-black text-white">
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-pixel text-xs tracking-widest text-[#888888]">ABOUT</span>
        <h1 className="font-pixel text-4xl sm:text-6xl font-bold leading-none text-white">
          {APP_NAME}
        </h1>
        <p className="text-xl text-[#888888]">{TAGLINE}</p>

        <div className="flex flex-col gap-4 mt-4 text-base text-[#888888] leading-relaxed">
          <p>
            {APP_NAME} is a next-generation conversational AI built to understand
            nuance, retain context, and deliver responses that feel genuinely human.
            Every interaction is designed with precision — monochrome in aesthetic,
            limitless in capability.
          </p>
          <p>
            Born from the belief that technology should amplify thought, not replace it,
            {APP_NAME} serves as your thinking partner — whether you&apos;re writing code,
            drafting prose, or exploring ideas at 2 AM.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-[#222222]">
          <h2 className="font-pixel text-xl text-white mb-6">4-Layer Architecture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-[#222222] p-5 flex flex-col gap-1 bg-[#0a0a0a]">
              <span className="font-pixel text-xs text-[#555555]">01</span>
              <span className="text-lg font-semibold text-white">Presentation</span>
              <span className="text-xs text-[#888888]">UI, pages, components</span>
            </div>
            <div className="border border-[#222222] p-5 flex flex-col gap-1 bg-[#0a0a0a]">
              <span className="font-pixel text-xs text-[#555555]">02</span>
              <span className="text-lg font-semibold text-white">Application</span>
              <span className="text-xs text-[#888888]">Hooks, orchestration</span>
            </div>
            <div className="border border-[#222222] p-5 flex flex-col gap-1 bg-[#0a0a0a]">
              <span className="font-pixel text-xs text-[#555555]">03</span>
              <span className="text-lg font-semibold text-white">Domain</span>
              <span className="text-xs text-[#888888]">Business logic, entities</span>
            </div>
            <div className="border border-[#222222] p-5 flex flex-col gap-1 bg-[#0a0a0a]">
              <span className="font-pixel text-xs text-[#555555]">04</span>
              <span className="text-lg font-semibold text-white">Infrastructure</span>
              <span className="text-xs text-[#888888]">API, storage, external</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
