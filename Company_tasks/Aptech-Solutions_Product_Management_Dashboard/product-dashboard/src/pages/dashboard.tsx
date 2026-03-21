
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/products.service";
import { userService } from "@/services/user.service";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { RecentProductsTable } from "@/components/dashboard/recent-products-table";

export default function DashboardPage() {
    // Fetch all products for stats and charts
    const { data: allProductsData, isLoading: loadingProducts } = useQuery({
        queryKey: ["products", "all"],
        queryFn: () => productService.getAll({ limit: 0 }),
    });

    // Fetch users count
    const { data: usersData, isLoading: loadingUsers } = useQuery({
        queryKey: ["users", "all"],
        queryFn: () => userService.getAll({ limit: 0 }),
    });

    // Fetch categories count (or derive from products)
    const { data: categoriesData, isLoading: loadingCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => productService.getCategories(),
    });

    const loading = loadingProducts || loadingUsers || loadingCategories;

    // Calculate Stats
    const products = allProductsData?.products || [];
    const totalProducts = allProductsData?.total || 0;
    const totalUsers = usersData?.total || 0;
    const lowStock = products.filter((p) => p.stock < 10).length;
    const avgPrice = products.length
        ? products.reduce((acc, p) => acc + p.price, 0) / products.length
        : 0;
    const avgRating = products.length
        ? products.reduce((acc, p) => acc + p.rating, 0) / products.length
        : 0;
    const totalCategories = categoriesData?.length || 0;

    // Calculate Chart Data
    // 1. Categories Distribution
    const categoryCounts: Record<string, number> = {};
    products.forEach((p) => {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });
    const categoryChartData = Object.entries(categoryCounts).map(([name, value]) => ({
        name,
        value,
    })).slice(0, 6); // Top 6 categories

    // 2. Price Range
    const priceRanges = {
        "0-50": 0,
        "51-100": 0,
        "101-200": 0,
        "201-500": 0,
        "500+": 0,
    };
    products.forEach((p) => {
        if (p.price <= 50) priceRanges["0-50"]++;
        else if (p.price <= 100) priceRanges["51-100"]++;
        else if (p.price <= 200) priceRanges["101-200"]++;
        else if (p.price <= 500) priceRanges["201-500"]++;
        else priceRanges["500+"]++;
    });
    const priceChartData = Object.entries(priceRanges).map(([range, count]) => ({
        range,
        count,
    }));

    // 3. Top Rated
    const topRatedData = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10)
        .map((p) => ({ name: p.title.substring(0, 15) + "...", rating: p.rating }));


    const recentProducts = products.slice(0, 5); // Just take first 5 from all products, effectively "recent" if default sort

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <StatsCards
                loading={loading}
                data={
                    loading
                        ? null
                        : {
                            totalProducts,
                            totalUsers,
                            lowStock,
                            avgPrice,
                            avgRating,
                            totalCategories,
                        }
                }
            />

            <DashboardCharts
                loading={loading}
                categoryData={categoryChartData}
                priceRangeData={priceChartData}
                topRatedData={topRatedData}
            />

            <RecentProductsTable
                loading={loading}
                products={recentProducts}
            />
        </div>
    );
}
