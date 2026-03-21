
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useAuthStore } from "@/store/auth.store";
import ProfileDialog from "@/pages/ProfileDialog";
import { useState } from "react";



export function Header() {
    const { user, logout } = useAuthStore();
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);


    return (
        <header className="h-14 border-b bg-card flex items-center px-4 md:px-6 justify-between">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-full max-w-sm hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-8 w-full bg-background"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Todo Add Theme toggel button Here */}
                <ThemeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.image} alt={user?.username} />
                                <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user?.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setProfileDialogOpen(true)}>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.location.href = '/settings'}>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logout()}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <ProfileDialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen} />
        </header>
    );
}
