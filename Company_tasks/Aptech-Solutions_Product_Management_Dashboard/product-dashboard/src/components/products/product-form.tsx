
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/validations";
import type { ProductSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/product.types";
import { ImageUpload } from "@/components/common/image-upload";

interface ProductFormProps {
    initialData?: Product;
    onSubmit: (values: ProductSchema) => Promise<void>;
    loading: boolean;
}

export function ProductForm({ initialData, onSubmit, loading }: ProductFormProps) {
    const navigate = useNavigate();
    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: initialData ? {
            title: initialData.title,
            description: initialData.description,
            price: initialData.price,
            stock: initialData.stock,
            brand: initialData.brand,
            category: initialData.category,
            thumbnail: initialData.thumbnail,
        } : {
            title: "",
            description: "",
            price: 0,
            stock: 0,
            brand: "",
            category: "",
            thumbnail: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control as any}
                        name="title"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="iPhone 9" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control as any}
                        name="brand"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Brand</FormLabel>
                                <FormControl>
                                    <Input placeholder="Apple" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control as any}
                        name="category"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="smartphones" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control as any}
                        name="price"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control as any}
                        name="stock"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control as any}
                        name="thumbnail"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Thumbnail</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control as any}
                    name="description"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="An apple mobile which is nothing like apple" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4">
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {initialData ? "Update Product" : "Create Product"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate("/products")}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
}
