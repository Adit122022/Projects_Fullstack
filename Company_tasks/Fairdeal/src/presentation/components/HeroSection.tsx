import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'power2.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[500px] sm:min-h-[560px] lg:h-[700px] overflow-hidden text-white font-satoshi flex items-center bg-[#1E2533]"
    >
      {/* Authentic High-Resolution Kirana / FMCG Store Background Image */}
      <img
        alt="Fairdeal Market Kirana Store"
        src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=2000&q=85"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Authentic Dual Gradient Overlay (Darkens background to let white typography pop) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Content Container */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[80px] py-16 sm:py-20 z-10">
        <div ref={contentRef} className="max-w-[560px]">
          {/* Authentic Fairdeal Headline */}
          <h1 className="font-satoshi text-3xl sm:text-5xl lg:text-[56px] lg:leading-[68px] font-black tracking-[0] mb-6 sm:mb-8 text-white">
            Deals That <span className="text-[#63C7ED]">Power</span>
            <br />
            <span className="text-[#63C7ED]">Your Business</span>
          </h1>

          {/* Authentic Subtitle with White Left Border */}
          <div className="border-l-[3px] border-white/70 pl-3 mb-8 sm:mb-10">
            <p className="font-satoshi text-base sm:text-xl lg:text-[24px] font-normal leading-relaxed sm:leading-[34px] tracking-[0] text-white/95">
              Wholesale FMCG products delivered to your store in under{' '}
              <span className="font-black text-white">60 minutes</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Authentic White Download App Pill Button */}
            <a
              href={APP_CONFIG.social.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white font-satoshi font-bold text-[15px] sm:text-[16px] text-[#3B3F59] inline-flex items-center justify-center transition-all duration-200 rounded-[16px] w-[180px] sm:w-[220px] h-[54px] sm:h-[62px] shadow-2xl hover:bg-gray-100 hover:scale-[1.02] border border-[#D4DEED]"
            >
              Download App
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
