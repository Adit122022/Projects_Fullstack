import { createBrowserRouter, Navigate } from 'react-router'
import { MainLayout } from '@/components/layout/MainLayout'
import { HomePage } from '@/features/marketing/pages/HomePage'
import { FeaturesPage } from '@/features/marketing/pages/FeaturesPage'
import { AboutPage } from '@/features/marketing/pages/AboutPage'
import { ChatPage } from '@/features/chat/pages/ChatPage'
import Login from '@/features/auth/pages/Login'
import Register from '@/features/auth/pages/Register'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/features', element: <FeaturesPage /> },
      { path: '/about', element: <AboutPage /> },
    ],
  },
  { path: '/chat', element: <ChatPage /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '*', element: <Navigate to="/" replace /> },
])