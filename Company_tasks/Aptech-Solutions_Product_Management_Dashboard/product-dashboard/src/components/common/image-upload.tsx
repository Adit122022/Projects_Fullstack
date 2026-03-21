
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, X } from "lucide-react";
import { uploadService } from "@/services/upload.service";
import { toast } from "sonner";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        try {
            const url = await uploadService.uploadImage(file);
            onChange(url);
            toast.success("Image uploaded successfully");
        } catch (error) {
            toast.error("Image upload failed. Ensure Cloudinary config is set.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (value) {
        return (
            <div className="relative w-40 h-40">
                <img
                    src={value}
                    alt="Upload"
                    className="w-full h-full object-cover rounded-md border"
                />
                <Button
                    onClick={() => onChange("")}
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    disabled={disabled}
                    type="button"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <Input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={disabled || loading}
                className="hidden"
                id="image-upload"
            />
            <label htmlFor="image-upload">
                <Button
                    type="button"
                    variant="secondary"
                    disabled={disabled || loading}
                    asChild
                >
                    <span>
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Upload className="mr-2 h-4 w-4" />
                        )}
                        Upload Image
                    </span>
                </Button>
            </label>
        </div>
    );
}
