"use client"

import * as React from "react"
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
import { LayoutDashboardIcon, ShoppingBagIcon, UsersIcon, ShieldAlertIcon } from "lucide-react"

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
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2.5 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white leading-none">
                  NComputing
                </span>
                <span className="text-[9px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-0.5 leading-none">
                  Admin System
                </span>
              </div>
            </div>
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
        
        {/* Support Alert Box */}
        <SidebarGroup className="mt-auto">
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
