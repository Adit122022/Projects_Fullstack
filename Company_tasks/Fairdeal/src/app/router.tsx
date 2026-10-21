import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/presentation/layouts/RootLayout'
import { HomePage } from '@/presentation/pages/HomePage'
import { LoadingState } from '@/presentation/components/LoadingState'

// Route-level code splitting for noncritical subpages
const AboutUsPage = lazy(() =>
  import('@/presentation/pages/AboutUsPage').then((m) => ({ default: m.AboutUsPage }))
)
const BrandPartnerPage = lazy(() =>
  import('@/presentation/pages/BrandPartnerPage').then((m) => ({
    default: m.BrandPartnerPage,
  }))
)
const DeliverWithUsPage = lazy(() =>
  import('@/presentation/pages/DeliverWithUsPage').then((m) => ({
    default: m.DeliverWithUsPage,
  }))
)
const CareersPage = lazy(() =>
  import('@/presentation/pages/CareersPage').then((m) => ({ default: m.CareersPage }))
)
const RetailerExperiencePage = lazy(() =>
  import('@/presentation/pages/RetailerExperiencePage').then((m) => ({
    default: m.RetailerExperiencePage,
  }))
)
const FAQPage = lazy(() =>
  import('@/presentation/pages/FAQPage').then((m) => ({ default: m.FAQPage }))
)
const LegalPrivacyPage = lazy(() =>
  import('@/presentation/pages/LegalPrivacyPage').then((m) => ({
    default: m.LegalPrivacyPage,
  }))
)
const LegalTermsPage = lazy(() =>
  import('@/presentation/pages/LegalTermsPage').then((m) => ({
    default: m.LegalTermsPage,
  }))
)
const NotFoundPage = lazy(() =>
  import('@/presentation/pages/NotFoundPage').then((m) => ({
    default: m.NotFoundPage,
  }))
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about-us',
        element: (
          <Suspense fallback={<LoadingState message="Loading About Us..." />}>
            <AboutUsPage />
          </Suspense>
        ),
      },
      {
        path: 'brand-partner',
        element: (
          <Suspense fallback={<LoadingState message="Loading Brand Partnerships..." />}>
            <BrandPartnerPage />
          </Suspense>
        ),
      },
      {
        path: 'deliver-with-us',
        element: (
          <Suspense fallback={<LoadingState message="Loading Delivery Partner Program..." />}>
            <DeliverWithUsPage />
          </Suspense>
        ),
      },
      {
        path: 'careers',
        element: (
          <Suspense fallback={<LoadingState message="Loading Open Positions..." />}>
            <CareersPage />
          </Suspense>
        ),
      },
      {
        path: 'retailer-experience',
        element: (
          <Suspense fallback={<LoadingState message="Loading 1,000+ SKU Wholesale Catalog..." />}>
            <RetailerExperiencePage />
          </Suspense>
        ),
      },
      {
        path: 'faq',
        element: (
          <Suspense fallback={<LoadingState message="Loading Frequently Asked Questions..." />}>
            <FAQPage />
          </Suspense>
        ),
      },
      {
        path: 'privacy-policy',
        element: (
          <Suspense fallback={<LoadingState message="Loading Privacy Policy..." />}>
            <LegalPrivacyPage />
          </Suspense>
        ),
      },
      {
        path: 'terms',
        element: (
          <Suspense fallback={<LoadingState message="Loading Terms & Conditions..." />}>
            <LegalTermsPage />
          </Suspense>
        ),
      },
      {
        path: 'terms-and-conditions',
        element: <Navigate to="/terms" replace />,
      },
      {
        path: 'returns-policy',
        element: (
          <Suspense fallback={<LoadingState message="Loading Returns Policy..." />}>
            <LegalTermsPage />
          </Suspense>
        ),
      },
      {
        path: 'shipping-policy',
        element: (
          <Suspense fallback={<LoadingState message="Loading Shipping Policy..." />}>
            <LegalTermsPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingState message="Loading Page..." />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
])
