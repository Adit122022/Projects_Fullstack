
import { ProductForm } from "@/components/products/product-form";
import { productService } from "@/services/products.service";
import type { ProductSchema } from "@/lib/validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: ProductSchema) => productService.add({
            ...data,
            discountPercentage: 0,
            rating: 0,
            images: [],
            thumbnail: data.thumbnail || "https://dummyjson.com/image/i/products/1/thumbnail.jpg" // Fallback
        }),
        onSuccess: () => {
            toast.success("Product created successfully");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/products");
        },
        onError: () => {
            toast.error("Failed to create product");
        },
    });

    const onSubmit = async (values: ProductSchema) => {
        mutation.mutate(values);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Add Product</h1>
            <div className="p-6 bg-card rounded-lg border">
                <ProductForm onSubmit={onSubmit} loading={mutation.isPending} />
            </div>
        </div>
    );
}
