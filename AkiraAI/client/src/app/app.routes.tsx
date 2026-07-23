import { createBrowserRouter, Navigate } from 'react-router'
import { MainLayout } from '@presentation/components/layout/MainLayout'
import { HomePage } from '@presentation/pages/HomePage'
import { FeaturesPage } from '@presentation/pages/FeaturesPage'
import { AboutPage } from '@presentation/pages/AboutPage'
import { ChatPage } from '@features/chat/pages/ChatPage'
import Login from '@features/auth/pages/Login'
import Register from '@features/auth/pages/Register'

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