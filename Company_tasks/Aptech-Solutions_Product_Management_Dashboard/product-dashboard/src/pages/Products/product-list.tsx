
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/products.service";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useSearchParams } from "react-router-dom";
import { MoreHorizontal, Plus, Search, Filter } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductListPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const [searchTerm, setSearchTerm] = useState(search);
    const debouncedSearch = useDebounce(searchTerm, 500);

    const [deleteId, setDeleteId] = useState<number | null>(null);

    const limit = 10;
    const skip = (page - 1) * limit;

    const queryClient = useQueryClient();

    // Queries
    const { data, isLoading } = useQuery({
        queryKey: ["products", { page, search: debouncedSearch, category }],
        queryFn: () => {
            if (debouncedSearch) {
                return productService.search(debouncedSearch);
            }
            if (category) {
                return productService.getByCategory(category);
            }
            return productService.getAll({ limit, skip });
        },
    });

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: productService.getCategories,
    });

    // Mutations
    const deleteMutation = useMutation({
        mutationFn: productService.delete,
        onSuccess: () => {
            toast.success("Product deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setDeleteId(null);
        },
        onError: () => {
            toast.error("Failed to delete product");
        },
    });

    // Handlers
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setSearchParams((prev) => {
            prev.set("search", term);
            prev.set("page", "1"); // Reset to page 1
            if (!term) prev.delete("search");
            return prev;
        });
    };

    const handleCategoryChange = (cat: string) => {
        setSearchParams((prev) => {
            if (cat === category) prev.delete("category"); // toggle off
            else prev.set("category", cat);
            prev.set("page", "1");
            return prev;
        });
    };

    const handlePageChange = (newPage: number) => {
        setSearchParams((prev) => {
            prev.set("page", String(newPage));
            return prev;
        });
    };

    const handleDelete = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    };

    const totalPages = data ? Math.ceil(data.total / limit) : 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <Button asChild>
                    <Link to="/products/add">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Link>
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-8"
                    />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            category: {category || "All"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 max-h-96 overflow-y-auto">
                        <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                            checked={category === ""}
                            onCheckedChange={() => handleCategoryChange("")}
                        >
                            All Categories
                        </DropdownMenuCheckboxItem>
                        {categories?.map((cat: any) => {
                            const catName = typeof cat === 'string' ? cat : cat.name || cat.slug;
                            return (
                                <DropdownMenuCheckboxItem
                                    key={catName}
                                    checked={category === (typeof cat === 'string' ? cat : cat.slug)}
                                    onCheckedChange={() => handleCategoryChange(typeof cat === 'string' ? cat : cat.slug)}
                                >
                                    {catName}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]"><Checkbox /></TableHead>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array(5).fill(0).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell colSpan={9} className="h-24 text-center">

                                        <TableCell><Checkbox /></TableCell>
                                        <TableCell>
                                            <Skeleton className="h-10 w-10 rounded" />
                                        </TableCell>
                                        <TableCell className="font-medium max-w-[200px] truncate">
                                            <Skeleton className="h-4 w-32" />
                                        </TableCell>
                                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : data?.products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="h-24 text-center">No products found.</TableCell>
                            </TableRow>
                        ) : (
                            data?.products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium max-w-[200px] truncate" title={product.title}>
                                        {product.title}
                                    </TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>
                                        <Badge variant={product.stock < 10 ? "destructive" : "secondary"}>
                                            {product.stock}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{product.rating}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem asChild>
                                                    <Link to={`/products/${product.id}`}>View Details</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link to={`/products/edit/${product.id}`}>Edit</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600 focus:text-red-600"
                                                    onClick={() => setDeleteId(product.id)}
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                {data && totalPages > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e: React.MouseEvent) => { e.preventDefault(); if (page > 1) handlePageChange(page - 1); }}
                                    className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                            {/* Simplified pagination: just Prev/Next for now due to complexity of detailed pagination component */}
                            <span className="mx-4 text-sm">Page {page} of {totalPages}</span>
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e: React.MouseEvent) => { e.preventDefault(); if (page < totalPages) handlePageChange(page + 1); }}
                                    className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={(open: boolean) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
