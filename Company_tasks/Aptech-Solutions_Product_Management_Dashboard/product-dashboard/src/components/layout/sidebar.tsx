
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Package,
    Users,
    Settings,
    Menu,
    ChevronLeft,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Package, label: "Products", href: "/products" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <>
            {/* Mobile Sidebar */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <div className="p-6 border-b">
                        <SheetTitle>
                            <h2 className="text-xl font-bold">Admin Panel</h2>
                        </SheetTitle>
                    </div>
                    <nav className="flex flex-col gap-2 p-4">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                                    location.pathname.startsWith(item.href)
                                        ? "bg-primary/10 text-primary"
                                        : "hover:bg-muted"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col border-r bg-card transition-all duration-300",
                    collapsed ? "w-16" : "w-64"
                )}
            >
                <div className="h-14 flex items-center justify-between px-4 border-b">
                    {!collapsed && <h2 className="font-bold text-lg">Admin Panel</h2>}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCollapsed(!collapsed)}
                        className="ml-auto"
                    >
                        <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
                    </Button>
                </div>

                <nav className="flex-1 flex flex-col gap-2 p-2">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                                location.pathname.startsWith(item.href)
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-muted",
                                collapsed && "justify-center px-0"
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon className="h-5 w-5" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
}
