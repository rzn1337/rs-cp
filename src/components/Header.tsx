import { Car, LogOut, Menu, Search, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Header = () => {
    return (
        <header className="border-b bg-black text-white">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Car className="h-6 w-6" />
                        {/* <span className="text-xl font-bold">RideShare</span> */}
                    </Link>
                    <nav className="hidden md:flex space-x-4">
                        <Link href="/rides" className="hover:text-gray-300">
                            Rides
                        </Link>
                        <Link href="/drivers" className="hover:text-gray-300">
                            Drivers
                        </Link>
                        <Link href="/about" className="hover:text-gray-300">
                            About
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-10 bg-gray-900 text-gray-100 border-gray-700"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                                <span className="sr-only">User menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-56 bg-gray-800 text-gray-100 border-gray-700"
                        >
                            <DropdownMenuItem>
                                <Link href="/profile" className="flex w-full">
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/settings" className="flex w-full">
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <button className="flex w-full items-center">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Menu</span>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
