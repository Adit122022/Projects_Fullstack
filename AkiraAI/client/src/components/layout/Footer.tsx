import { APP_NAME } from '@/constants/app.constants'

export function Footer() {
  return (
    <footer className="w-full border-t border-[#222222] px-6 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto bg-black">
      <span className="font-pixel text-sm tracking-wider text-white">{APP_NAME}</span>
      <span className="text-xs text-[#888888]">
        &copy; {new Date().getFullYear()} — Built in monochrome.
      </span>
    </footer>
  )
}
