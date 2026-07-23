import { motion } from 'framer-motion'
import { APP_NAME, TAGLINE } from '@domain/constants/app.constants'
import styles from './AboutPage.module.css'

export function AboutPage() {
  return (
    <div className={styles.page}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.label}>ABOUT</span>
        <h1 className={styles.title}>{APP_NAME}</h1>
        <p className={styles.tagline}>{TAGLINE}</p>

        <div className={styles.body}>
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

        <div className={styles.architecture}>
          <h2 className={styles.archTitle}>4-Layer Architecture</h2>
          <div className={styles.layers}>
            <div className={styles.layer}>
              <span className={styles.layerNum}>01</span>
              <span className={styles.layerName}>Presentation</span>
              <span className={styles.layerDesc}>UI, pages, components</span>
            </div>
            <div className={styles.layer}>
              <span className={styles.layerNum}>02</span>
              <span className={styles.layerName}>Application</span>
              <span className={styles.layerDesc}>Hooks, orchestration</span>
            </div>
            <div className={styles.layer}>
              <span className={styles.layerNum}>03</span>
              <span className={styles.layerName}>Domain</span>
              <span className={styles.layerDesc}>Business logic, entities</span>
            </div>
            <div className={styles.layer}>
              <span className={styles.layerNum}>04</span>
              <span className={styles.layerName}>Infrastructure</span>
              <span className={styles.layerDesc}>API, storage, external</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
