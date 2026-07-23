import { Outlet } from 'react-router'
import { Navbar } from '@presentation/components/layout/Navbar'
import { Footer } from '@presentation/components/layout/Footer'
import styles from './MainLayout.module.css'

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
