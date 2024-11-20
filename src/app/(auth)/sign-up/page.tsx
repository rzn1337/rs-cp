"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SignUp() {
    const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });

    const router = useRouter();

    const { toast } = useToast();

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await axios.post("/api/sign-up", signupData);
        console.log(response);
        if (response.status === 200) router.replace("/sign-in");
        else toast({ title: "Failed to sign you up", variant: "destructive" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="max-w-md w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Create a new account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignup}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Your name"
                                        value={signupData.name}
                                        onChange={handleSignupChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        placeholder="Your username"
                                        value={signupData.username}
                                        onChange={handleSignupChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input
                                        id="signup-email"
                                        name="email"
                                        type="email"
                                        placeholder="Your email"
                                        value={signupData.email}
                                        onChange={handleSignupChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="signup-password">
                                        Password
                                    </Label>
                                    <Input
                                        id="signup-password"
                                        name="password"
                                        type="password"
                                        placeholder="Choose a password"
                                        value={signupData.password}
                                        onChange={handleSignupChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="confirm-password">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={signupData.confirmPassword}
                                        onChange={handleSignupChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <Button type="submit">Sign Up</Button>
                            </div>
                        </form>
                        <div className="mt-6 text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href="/sign-in"
                                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                            >
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    /* return (
    <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      placeholder="Your name"
                      value={signupData.name}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      name="email"
                      type="email" 
                      placeholder="Your email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      name="password"
                      type="password" 
                      placeholder="Choose a password"
                      value={signupData.password}
                      
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      name="confirmPassword"
                      type="password" 
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                </div>
                <CardFooter className="flex justify-between mt-4">
                  <Button type="submit">Sign Up</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
  ) */
}
