import { motion } from 'framer-motion'
import { FEATURES } from '@/constants/app.constants'

export function FeaturesPage() {
  return (
    <div className="px-6 sm:px-12 py-12 max-w-6xl mx-auto min-h-[calc(100vh-10rem)] bg-black text-white">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-pixel text-xs tracking-widest text-[#888888]">CAPABILITIES</span>
        <h1 className="font-pixel text-3xl sm:text-5xl font-bold mt-3 leading-tight text-white">
          What AkiraAi can do
        </h1>
        <p className="text-base text-[#888888] mt-3">
          Engineered for precision. Designed for humans.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURES.map((feature, i) => (
          <motion.article
            key={feature.id}
            className="border border-[#222222] hover:border-white p-8 bg-[#0a0a0a] transition-all"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <span className="font-pixel text-xs text-[#555555]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h2 className="text-xl font-semibold mt-4 text-white">{feature.title}</h2>
            <p className="text-sm text-[#888888] mt-3 leading-relaxed">
              {feature.description}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
