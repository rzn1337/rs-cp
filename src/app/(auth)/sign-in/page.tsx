"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string>("");

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post("/api/sign-in", formData);
            console.log("User registered:", response);
            router.replace("/dashboard");
        } catch (err) {
            console.error("Error registering user:", err);
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-black text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Create an Account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="john"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="bg-black text-gray-100 border-gray-600"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Secret Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="bg-black text-gray-100 border-gray-600 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                        </div>
                    </form>
                    {error && (
                        <p className="mt-4 text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="text-blue-500 hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
