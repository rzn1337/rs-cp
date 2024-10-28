"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";

// Dummy data for user ratings
const userRatings = [
    {
        id: 1,
        name: "John Doe",
        avatar: "JD",
        rating: 4.5,
        ridesAsPassenger: 20,
        ridesAsDriver: 0,
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "JS",
        rating: 4.8,
        ridesAsPassenger: 15,
        ridesAsDriver: 30,
    },
    {
        id: 3,
        name: "Bob Johnson",
        avatar: "BJ",
        rating: 4.2,
        ridesAsPassenger: 10,
        ridesAsDriver: 0,
    },
    {
        id: 4,
        name: "Alice Brown",
        avatar: "AB",
        rating: 4.9,
        ridesAsPassenger: 25,
        ridesAsDriver: 50,
    },
    {
        id: 5,
        name: "Charlie Davis",
        avatar: "CD",
        rating: 4.0,
        ridesAsPassenger: 8,
        ridesAsDriver: 0,
    },
    {
        id: 6,
        name: "Eva Wilson",
        avatar: "EW",
        rating: 4.7,
        ridesAsPassenger: 18,
        ridesAsDriver: 40,
    },
    {
        id: 7,
        name: "Frank Miller",
        avatar: "FM",
        rating: 4.3,
        ridesAsPassenger: 12,
        ridesAsDriver: 0,
    },
    {
        id: 8,
        name: "Grace Taylor",
        avatar: "GT",
        rating: 4.6,
        ridesAsPassenger: 22,
        ridesAsDriver: 35,
    },
    {
        id: 9,
        name: "Henry Clark",
        avatar: "HC",
        rating: 4.1,
        ridesAsPassenger: 7,
        ridesAsDriver: 0,
    },
    {
        id: 10,
        name: "Ivy Anderson",
        avatar: "IA",
        rating: 4.8,
        ridesAsPassenger: 30,
        ridesAsDriver: 60,
    },
];

export default function UserRatings() {
    const [activeTab, setActiveTab] = useState("all");

    const filteredUsers = userRatings.filter((user) => {
        if (activeTab === "passengers") return user.ridesAsPassenger > 0;
        if (activeTab === "drivers") return user.ridesAsDriver > 0;
        return true;
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">User Ratings</h1>
            <Tabs
                defaultValue="all"
                className="w-full"
                onValueChange={setActiveTab}
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All Users</TabsTrigger>
                    <TabsTrigger value="passengers">Passengers</TabsTrigger>
                    <TabsTrigger value="drivers">Drivers</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Users</CardTitle>
                            <CardDescription>
                                View ratings for all users
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>
                                            Rides as Passenger
                                        </TableHead>
                                        <TableHead>Rides as Driver</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="flex items-center">
                                                <Avatar className="h-8 w-8 mr-2">
                                                    <AvatarImage
                                                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                                                    />
                                                    <AvatarFallback>
                                                        {user.avatar}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {user.name}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    {user.rating}
                                                    <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {user.ridesAsPassenger}
                                            </TableCell>
                                            <TableCell>
                                                {user.ridesAsDriver}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="passengers">
                    <Card>
                        <CardHeader>
                            <CardTitle>Passengers</CardTitle>
                            <CardDescription>
                                View ratings for users who have taken rides
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>
                                            Rides as Passenger
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="flex items-center">
                                                <Avatar className="h-8 w-8 mr-2">
                                                    <AvatarImage
                                                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                                                    />
                                                    <AvatarFallback>
                                                        {user.avatar}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {user.name}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    {user.rating}
                                                    <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {user.ridesAsPassenger}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="drivers">
                    <Card>
                        <CardHeader>
                            <CardTitle>Drivers</CardTitle>
                            <CardDescription>
                                View ratings for users who have driven rides
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Rides as Driver</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="flex items-center">
                                                <Avatar className="h-8 w-8 mr-2">
                                                    <AvatarImage
                                                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                                                    />
                                                    <AvatarFallback>
                                                        {user.avatar}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {user.name}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    {user.rating}
                                                    <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {user.ridesAsDriver}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
