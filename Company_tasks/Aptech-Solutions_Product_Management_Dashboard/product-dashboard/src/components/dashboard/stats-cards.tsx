
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, AlertTriangle, DollarSign, Star, Tags } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsProps {
    data: {
        totalProducts: number;
        totalUsers: number;
        lowStock: number;
        avgPrice: number;
        avgRating: number;
        totalCategories: number;
    } | null;
    loading: boolean;
}

export function StatsCards({ data, loading }: StatsProps) {
    const stats = [
        {
            title: "Total Products",
            value: data?.totalProducts,
            icon: Package,
            description: "Active products in catalog",
        },
        {
            title: "Total Users",
            value: data?.totalUsers,
            icon: Users,
            description: "Registered users",
        },
        {
            title: "Low Stock Items",
            value: data?.lowStock,
            icon: AlertTriangle,
            description: "Products with stock < 10",
            alert: true,
        },
        {
            title: "Average Price",
            value: data ? `$${data.avgPrice.toFixed(2)}` : null,
            icon: DollarSign,
            description: "Across all products",
        },
        {
            title: "Average Rating",
            value: data ? data.avgRating.toFixed(1) : null,
            icon: Star,
            description: "Overall customer rating",
        },
        {
            title: "Categories",
            value: data?.totalCategories,
            icon: Tags,
            description: "Active product categories",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.alert ? "text-destructive" : ""}`} />
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-8 w-20" />
                        ) : (
                            <div className="text-2xl font-bold">{stat.value}</div>
                        )}
                        <p className="text-xs text-muted-foreground">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
