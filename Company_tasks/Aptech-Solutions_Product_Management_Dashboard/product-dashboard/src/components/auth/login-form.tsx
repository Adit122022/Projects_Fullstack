
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/lib/validations";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export function LoginForm() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema) as any,
        defaultValues: {
            username: "",
            password: "",
            expiresInMins: 30,
        },
    });

    async function onSubmit(values: LoginSchema) {
        setLoading(true);
        try {
            const data = await authService.login(values);
            login(data);
            toast.success("Logged in successfully");
            navigate("/");
        } catch (error) {
            toast.error("Invalid credentials or server error");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-87.5">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-4">
                        <FormField
                            control={form.control as any}
                            name="username"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="emilys" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control as any}
                            name="password"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control as any}
                            name="expiresInMins"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Token Expiry (Mins) - For Testing Refresh</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
