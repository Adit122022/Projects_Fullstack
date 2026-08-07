"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { authClient } from "@/lib/auth-client"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  ShoppingBagIcon,
  UsersIcon,
  ShieldAlertIcon,
  Sun,
  Moon,
  LogOut
} from "lucide-react"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab: 'dashboard' | 'orders' | 'leads';
  setActiveTab: (tab: 'dashboard' | 'orders' | 'leads') => void;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function AppSidebar({ activeTab, setActiveTab, user, ...props }: AppSidebarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    {
      id: 'dashboard' as const,
      title: 'Overview Dashboard',
      icon: <LayoutDashboardIcon className="size-4" />,
    },
    {
      id: 'orders' as const,
      title: 'E-Commerce Orders',
      icon: <ShoppingBagIcon className="size-4" />,
    },
    {
      id: 'leads' as const,
      title: 'Demo Request Leads',
      icon: <UsersIcon className="size-4" />,
    },
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-slate-100 dark:border-slate-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="flex items-center gap-2.5 px-3 py-2.5 hover:opacity-90 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-md shadow-blue-500/20">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                  NComputing
                </span>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mt-0.5 leading-none">
                  Admin System
                </span>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    tooltip={item.title}
                    className="cursor-pointer"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Preferences / System Group */}
        <SidebarGroup className="mt-auto border-t border-slate-150 dark:border-slate-800/80 pt-4">
          <SidebarGroupLabel>System Preferences</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Theme Toggle */}
              {mounted && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    tooltip="Toggle theme"
                    className="cursor-pointer"
                  >
                    {theme === 'dark' ? <Sun className="size-4 text-amber-500" /> : <Moon className="size-4 text-blue-650" />}
                    <span>{theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {/* Sign Out */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={async () => {
                    await authClient.signOut();
                    window.location.href = '/';
                  }}
                  tooltip="Sign Out"
                  className="cursor-pointer text-red-650 dark:text-red-400 hover:text-red-750 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <LogOut className="size-4" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Support Alert Box */}
        <SidebarGroup>
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
              <ShieldAlertIcon size={14} className="text-blue-600" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Access Scope</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Standard user checkouts and demo forms register instantly to the Neon DB.
            </p>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
