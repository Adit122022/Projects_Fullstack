import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth.store";

interface ProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-105.25">
                <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user.image} alt={user.username} />
                        <AvatarFallback className="text-2xl">
                            {user.firstName?.[0]?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">
                            {user.firstName} {user.lastName}
                        </h2>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-4 border-t pt-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-muted-foreground">
                                Email
                            </span>
                            <span className="text-sm truncate" title={user.email}>
                                {user.email}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-muted-foreground">
                                Gender
                            </span>
                            <span className="text-sm capitalize">{user.gender}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-muted-foreground">
                                User ID
                            </span>
                            <span className="text-sm">#{user.id}</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProfileDialog;