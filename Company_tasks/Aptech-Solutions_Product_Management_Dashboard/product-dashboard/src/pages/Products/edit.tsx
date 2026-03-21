
import { ProductForm } from "@/components/products/product-form";
import { productService } from "@/services/products.service";
import type { ProductSchema } from "@/lib/validations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditProductPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => productService.getById(Number(id)),
        enabled: !!id,
    });

    const mutation = useMutation({
        mutationFn: (data: ProductSchema) => productService.update(Number(id), data),
        onSuccess: () => {
            toast.success("Product updated successfully");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["product", id] });
            navigate("/products");
        },
        onError: () => {
            toast.error("Failed to update product");
        },
    });

    const onSubmit = async (values: ProductSchema) => {
        mutation.mutate(values);
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <div className="p-6 bg-card rounded-lg border">
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Edit Product</h1>
            <div className="p-6 bg-card rounded-lg border">
                <ProductForm
                    initialData={product}
                    onSubmit={onSubmit}
                    loading={mutation.isPending}
                />
            </div>
        </div>
    );
}
