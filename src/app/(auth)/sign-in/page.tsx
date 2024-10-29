// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { EyeIcon, EyeOffIcon } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function SignIn() {
//     const [showPassword, setShowPassword] = useState(false);
//     const router = useRouter();
//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//     });
//     const [error, setError] = useState<string>("");

//     const togglePasswordVisibility = () => setShowPassword(!showPassword);

//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prev) => ({ ...prev, [id]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             console.log(formData);
//             const response = await axios.post("/api/sign-in", formData);
//             console.log("User registered:", response);
//             router.replace("/dashboard");
//         } catch (err) {
//             console.error("Error registering user:", err);
//             setError("Registration failed. Please try again.");
//         }
//     };

//     return (
//          <div className="min-h-screen bg-black flex items-center justify-center p-4">
//              <Card className="w-full max-w-md bg-black text-white">
//                  <CardHeader>
//                      <CardTitle className="text-2xl font-bold text-center">
//                          Create an Account
//                      </CardTitle>
//                  </CardHeader>
//                  <CardContent>
//                      <form onSubmit={handleSubmit}>
//                          <div className="space-y-4">
//                              <div className="space-y-2">
//                                  <Label htmlFor="username">Username</Label>
//                                  <Input
//                                      id="username"
//                                      type="text"
//                                      placeholder="john"
//                                      value={formData.username}
//                                      onChange={handleChange}
//                                      className="bg-black text-gray-100 border-gray-600"
//                                  />
//                              </div>
//                              <div className="space-y-2">
//                                  <Label htmlFor="password">Password</Label>
//                                  <div className="relative">
//                                      <Input
//                                          id="password"
//                                          type={
//                                              showPassword ? "text" : "password"
//                                          }
//                                          placeholder="Secret Password"
//                                          value={formData.password}
//                                          onChange={handleChange}
//                                          className="bg-black text-gray-100 border-gray-600 pr-10"
//                                      />
//                                      <button
//                                          type="button"
//                                          onClick={togglePasswordVisibility}
//                                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
//                                      >
//                                          {showPassword ? (
//                                              <EyeOffIcon className="h-5 w-5" />
//                                          ) : (
//                                              <EyeIcon className="h-5 w-5" />
//                                          )}
//                                      </button>
//                                  </div>
//                              </div>
//                              <Button type="submit" className="w-full">
//                                  Sign Up
//                              </Button>
//                          </div>
//                      </form>
//                      {error && (
//                          <p className="mt-4 text-red-500 text-sm text-center">
//                              {error}
//                          </p>
//                      )}
//                      <div className="mt-4 text-center text-sm">
//                          Don&apos;t have an account?{" "}
//                          <Link
//                              href="/sign-up"
//                              className="text-blue-500 hover:underline"
//                          >
//                              Sign up
//                          </Link>
//                      </div>
//                  </CardContent>
//              </Card>
//          </div>

//     );
// }

// "use client";

// import { useState } from "react";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function SignIn() {
//     const [signinData, setSigninData] = useState({
//         username: "",
//         password: "",
//     });

//     const handleSigninChange = (e) => {
//         console.log(e)
//         const { name, value } = e.target;
//         setSigninData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSignin = (e) => {
//         e.preventDefault();
//         // Here you would typically send the signin data to your backend
//         console.log("Signin data:", signinData);
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
//             <div className="max-w-md w-full">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Sign In</CardTitle>
//                         <CardDescription>
//                             Sign in to your account
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <form onSubmit={handleSignin}>
//                             <div className="grid w-full items-center gap-4">
//                                 <div className="flex flex-col space-y-1.5">
//                                     <Label htmlFor="signin-email">Email</Label>
//                                     <Input
//                                         id="signin-email"
//                                         name="email"
//                                         type="email"
//                                         placeholder="Your email"
//                                         value={signinData.email}
//                                         onChange={handleSigninChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="flex flex-col space-y-1.5">
//                                     <Label htmlFor="signin-password">
//                                         Password
//                                     </Label>
//                                     <Input
//                                         id="signin-password"
//                                         name="password"
//                                         type="password"
//                                         placeholder="Your password"
//                                         value={signinData.password}
//                                         onChange={handleSigninChange}
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             <div className="flex justify-end mt-4">
//                                 <Button type="submit">Sign In</Button>
//                             </div>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );

//     /* return (
//          <div className="container mx-auto p-4">
//             <Card>
//                         <CardHeader>
//                             <CardTitle>Sign In</CardTitle>
//                             <CardDescription>
//                                 Sign in to your account
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <form onSubmit={handleSignin}>
//                                 <div className="grid w-full items-center gap-4">
//                                     <div className="flex flex-col space-y-1.5">
//                                         <Label htmlFor="signin-email">
//                                             Email
//                                         </Label>
//                                         <Input
//                                             id="signin-email"
//                                             name="email"
//                                             type="email"
//                                             placeholder="Your email"
//                                             value={signinData.email}
//                                             onChange={handleSigninChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="flex flex-col space-y-1.5">
//                                         <Label htmlFor="signin-password">
//                                             Password
//                                         </Label>
//                                         <Input
//                                             id="signin-password"
//                                             name="password"
//                                             type="password"
//                                             placeholder="Your password"
//                                             value={signinData.password}
//                                             onChange={handleSigninChange}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <CardFooter className="flex justify-between mt-4">
//                                     <Button type="submit">Sign In</Button>
//                                 </CardFooter>
//                             </form>
//                         </CardContent>
//                     </Card>
//         </div>

//     ); */
// }

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignInForm = () => {
    const [signinData, setSigninData] = useState({
        username: "",
        password: "",
    });

    const handleSigninChange = (e) => {
        const { name, value } = e.target;
        setSigninData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const router = useRouter();

    const handleSignin = async (e) => {
        e.preventDefault();
        console.log("HAHA")
        const response = await axios.post("/api/sign-in", signinData);
        if (response.status === 200) {
            router.replace("/dashboard");
        }
        console.log(response)
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="max-w-md w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>
                            Sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignin}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Your username"
                                        value={signinData.username}
                                        onChange={handleSigninChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Your password"
                                        value={signinData.password}
                                        onChange={handleSigninChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <Button type="submit">Sign In</Button>
                            </div>
                        </form>
                        <div className="mt-6 text-center text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/sign-up"
                                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                            >
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SignInForm;
