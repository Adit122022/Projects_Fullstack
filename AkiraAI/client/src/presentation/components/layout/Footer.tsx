import { APP_NAME } from '@/constants/app.constants'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.brand}>{APP_NAME}</span>
      <span className={styles.copy}>&copy; {new Date().getFullYear()} — Built in monochrome.</span>
    </footer>
  )
}
