import { motion } from 'framer-motion'
import { FEATURES } from '@domain/constants/app.constants'
import styles from './FeaturesPage.module.css'

export function FeaturesPage() {
  return (
    <div className={styles.page}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.label}>CAPABILITIES</span>
        <h1 className={styles.title}>What AkiraAi can do</h1>
        <p className={styles.subtitle}>
          Engineered for precision. Designed for humans.
        </p>
      </motion.div>

      <div className={styles.grid}>
        {FEATURES.map((feature, i) => (
          <motion.article
            key={feature.id}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ borderColor: '#ffffff' }}
          >
            <span className={styles.cardIndex}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h2 className={styles.cardTitle}>{feature.title}</h2>
            <p className={styles.cardDesc}>{feature.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
