import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  APP_NAME,
  HERO_HEADLINES,
  HERO_SUBTEXT,
} from '@/constants/app.constants'
import { AsciiScene } from '@presentation/components/ascii/AsciiScene'
import styles from './HomePage.module.css'

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
    <div className={styles.page}>
      <section className={styles.hero}>
        <motion.div
          className={styles.heroLeft}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className={styles.badge} variants={itemVariants}>
            AI CHATBOT v1.0
          </motion.span>

          <motion.h1 className={styles.title} variants={itemVariants}>
            <span className={styles.titlePixel}>{APP_NAME}</span>
          </motion.h1>

          <div className={styles.headlines}>
            {HERO_HEADLINES.map((line, i) => (
              <motion.p
                key={line}
                className={styles.headline}
                variants={itemVariants}
                custom={i}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.p className={styles.subtext} variants={itemVariants}>
            {HERO_SUBTEXT}
          </motion.p>

          <motion.div className={styles.actions} variants={itemVariants}>
            <Link to="/chat" className={styles.primaryBtn}>
              Start Chatting
            </Link>
            <Link to="/features" className={styles.secondaryBtn}>
              Explore Features
            </Link>
          </motion.div>

          <motion.div className={styles.stats} variants={itemVariants}>
            <div className={styles.stat}>
              <span className={styles.statValue}>10ms</span>
              <span className={styles.statLabel}>Avg Response</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>99.9%</span>
              <span className={styles.statLabel}>Uptime</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>∞</span>
              <span className={styles.statLabel}>Context Depth</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.heroRight}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
        >
          <AsciiScene />
        </motion.div>
      </section>

      <motion.section
        className={styles.marquee}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className={styles.marqueeTrack}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className={styles.marqueeText}>
              AKIRA AI — THINK FASTER — SPEAK SMARTER — BUILD BETTER —
            </span>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
