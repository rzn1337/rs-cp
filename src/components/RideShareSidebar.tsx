"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";

import axios from "axios";

import { useEffect, useState } from "react";

import {
    Car,
    History,
    Bell,
    User,
    ChevronRight,
    ChevronsUpDown,
    CreditCard,
    MapPin,
    Forward,
    Map,
    MoreHorizontal,
    PieChart,
    Plus,
    Settings,
    Star,
    Shield,
    LogOut,
    Home,
    Clock,
    Wallet,
    Award,
    User2,
    CarFront,
    Briefcase
} from "lucide-react";

const data = {
    accounts: [
        {
            name: "Personal",
            logo: User,
            plan: "Premium",
        },
        {
            name: "Business",
            logo: Briefcase,
            plan: "Corporate",
        }
    ],
    navMain: [
        {
            title: "Rides",
            url: "#",
            icon: CarFront,
            isActive: true,
            items: [
                {
                    title: "Book a Ride",
                    url: "/dashboard",
                },
                {
                    title: "Create a New Ride",
                    url: "/ride-management",
                },
                {
                    title: "Favorites",
                    url: "#",
                },
            ],
        },
        {
            title: "History",
            url: "#",
            icon: History,
            items: [
                {
                    title: "Recent Rides",
                    url: "/myrides",
                },
                {
                    title: "Receipts",
                    url: "#",
                },
                {
                    title: "Reviews",
                    url: "#",
                },
            ],
        },
        {
            title: "Payments",
            url: "#",
            icon: Wallet,
            items: [
                {
                    title: "Payment Methods",
                    url: "#",
                },
                {
                    title: "Ride Credits",
                    url: "#",
                },
                {
                    title: "Billing History",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
            items: [
                {
                    title: "Profile",
                    url: "/profile",
                },
                {
                    title: "Preferences",
                    url: "#",
                },
                {
                    title: "Safety",
                    url: "#",
                },
                {
                    title: "Notifications",
                    url: "#",
                },
            ],
        },
    ],
    // Transform projects into saved locations
    savedLocations: [
        {
            name: "Home",
            url: "#",
            icon: Home,
        },
        {
            name: "Work",
            url: "#",
            icon: MapPin,
        },
        {
            name: "Gym",
            url: "#",
            icon: Map,
        },
    ],
};

export default function RideshareSidebar() {
    const [activeItem, setActiveItem] = useState("rides");
    const [activeAccount, setActiveAccount] = useState(data.accounts[0]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("/api/get-user");
            setUser(response.data.data);
        };
        fetchUser();
    }, []);

    return (
        <div className="flex h-screen">
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            <activeAccount.logo className="size-4" />
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {activeAccount.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {activeAccount.plan}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    align="start"
                                    side="bottom"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                                        Switch Account
                                    </DropdownMenuLabel>
                                    {data.accounts.map((account, index) => (
                                        <DropdownMenuItem
                                            key={account.name}
                                            onClick={() => setActiveAccount(account)}
                                            className="gap-2 p-2"
                                        >
                                            <div className="flex size-6 items-center justify-center rounded-sm border">
                                                <account.logo className="size-4 shrink-0" />
                                            </div>
                                            {account.name}
                                            <DropdownMenuShortcut>
                                                ⌘{index + 1}
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.isActive}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                        >
                                                            <a href={subItem.url}>
                                                                <span>{subItem.title}</span>
                                                            </a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                        <SidebarGroupLabel>Saved Locations</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.savedLocations.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </a>
                                    </SidebarMenuButton>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuAction showOnHover>
                                                <MoreHorizontal />
                                                <span className="sr-only">More</span>
                                            </SidebarMenuAction>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-48 rounded-lg"
                                            side="bottom"
                                            align="end"
                                        >
                                            <DropdownMenuItem>
                                                <CarFront className="text-muted-foreground" />
                                                <span>Book Ride Here</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Forward className="text-muted-foreground" />
                                                <span>Share Location</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-500">
                                                <Star className="text-muted-foreground" />
                                                <span>Remove Favorite</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton className="text-sidebar-foreground/70">
                                    <Plus className="text-sidebar-foreground/70" />
                                    <span>Add Location</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user?.username}`}
                                                alt={user?.username}
                                            />
                                            <AvatarFallback className="rounded-lg">
                                            <User2 className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {user?.username}
                                            </span>
                                            <span className="truncate text-xs">
                                                {user?.email}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user?.username}`}
                                                alt={user?.username}
                                            />
                                            <AvatarFallback className="rounded-lg">
                                            <User2 className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {user?.username}
                                                </span>
                                                <span className="truncate text-xs">
                                                    {user?.email}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Award />
                                            Upgrade to Premium
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <User />
                                            Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Shield />
                                            Safety Center
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Bell />
                                            Notifications
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
        </div>
    );
}