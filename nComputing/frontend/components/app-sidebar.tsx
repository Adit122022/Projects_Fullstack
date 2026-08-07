"use client"

import * as React from "react"
import { NavSecondary } from "@/components/nav-secondary"
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
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  ShoppingBagIcon,
  UsersIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
} from "lucide-react"

const data = {
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab?: 'dashboard' | 'orders' | 'leads';
  setActiveTab?: (tab: 'dashboard' | 'orders' | 'leads') => void;
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function AppSidebar({
  activeTab = 'dashboard',
  setActiveTab = () => {},
  user = {
    name: 'Administrator',
    email: 'admin@ncomputing.in',
    avatar: 'https://placehold.co/100x100/3b82f6/ffffff?text=A'
  },
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-slate-100 dark:border-slate-800/80 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="/" className="flex items-center justify-start gap-2.5 hover:opacity-90 transition-opacity">
              <img src="/NComputing-Compute-Smartly.svg" alt="NComputing Logo" className="h-7 w-auto dark:invert" />
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-1 py-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab('dashboard')}
                  isActive={activeTab === 'dashboard'}
                  tooltip="Overview Dashboard"
                  className="cursor-pointer"
                >
                  <LayoutDashboardIcon className="size-4" />
                  <span>Overview Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab('orders')}
                  isActive={activeTab === 'orders'}
                  tooltip="E-Commerce Orders"
                  className="cursor-pointer"
                >
                  <ShoppingBagIcon className="size-4" />
                  <span>E-Commerce Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab('leads')}
                  isActive={activeTab === 'leads'}
                  tooltip="Demo Request Leads"
                  className="cursor-pointer"
                >
                  <UsersIcon className="size-4" />
                  <span>Demo Request Leads</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-100 dark:border-slate-800/80 p-2">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
