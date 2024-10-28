"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { User, MapPin, Calendar, Clock } from "lucide-react";

// Dummy data for ride history
const rideHistory = [
    {
        id: 1,
        from: "Downtown",
        to: "Airport",
        date: "2023-06-15",
        time: "14:00",
        price: "$25",
        status: "Completed",
        driver: "John Doe",
    },
    {
        id: 2,
        from: "Suburb",
        to: "City Center",
        date: "2023-06-16",
        time: "09:30",
        price: "$18",
        status: "En Route",
        driver: "Jane Smith",
    },
    {
        id: 3,
        from: "Beach",
        to: "Mountain View",
        date: "2023-06-17",
        time: "11:15",
        price: "$30",
        status: "Cancelled",
        driver: "Mike Johnson",
    },
    {
        id: 4,
        from: "University",
        to: "Shopping Mall",
        date: "2023-06-18",
        time: "13:45",
        price: "$15",
        status: "Completed",
        driver: "Sarah Brown",
    },
];

// Dummy data for created rides
const createdRides = [
    {
        id: 1,
        from: "Airport",
        to: "Downtown",
        date: "2023-06-20",
        time: "10:00",
        price: "$28",
        status: "Scheduled",
        passengers: [
            { id: 1, name: "Alice Johnson", avatar: "AJ" },
            { id: 2, name: "Bob Smith", avatar: "BS" },
        ],
    },
    {
        id: 2,
        from: "City Center",
        to: "Beach",
        date: "2023-06-21",
        time: "14:30",
        price: "$22",
        status: "En Route",
        passengers: [
            { id: 3, name: "Charlie Brown", avatar: "CB" },
            { id: 4, name: "Diana Prince", avatar: "DP" },
            { id: 5, name: "Ethan Hunt", avatar: "EH" },
        ],
    },
];

export default function RideHistory() {
    const [selectedRide, setSelectedRide] = useState(null);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-500";
            case "en route":
                return "bg-blue-500";
            case "cancelled":
                return "bg-red-500";
            case "scheduled":
                return "bg-yellow-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">My Rides</h1>
            <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="history">Booking History</TabsTrigger>
                    <TabsTrigger value="created">Created Rides</TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ride Booking History</CardTitle>
                            <CardDescription>
                                View all your past and upcoming rides
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px] w-full">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>From</TableHead>
                                            <TableHead>To</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rideHistory.map((ride) => (
                                            <TableRow key={ride.id}>
                                                <TableCell>
                                                    {ride.from}
                                                </TableCell>
                                                <TableCell>{ride.to}</TableCell>
                                                <TableCell>
                                                    {ride.date}
                                                </TableCell>
                                                <TableCell>
                                                    {ride.price}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={getStatusColor(
                                                            ride.status
                                                        )}
                                                    >
                                                        {ride.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="created">
                    <Card>
                        <CardHeader>
                            <CardTitle>Created Rides</CardTitle>
                            <CardDescription>
                                Manage the rides you've created
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {createdRides.map((ride) => (
                                    <Card key={ride.id}>
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center">
                                                <span>
                                                    {ride.from} to {ride.to}
                                                </span>
                                                <Badge
                                                    className={getStatusColor(
                                                        ride.status
                                                    )}
                                                >
                                                    {ride.status}
                                                </Badge>
                                            </CardTitle>
                                            <CardDescription>
                                                <div className="flex items-center">
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    {ride.date}
                                                    <Clock className="ml-4 mr-2 h-4 w-4" />
                                                    {ride.time}
                                                </div>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center text-muted-foreground">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    <span className="text-sm">
                                                        {ride.from} → {ride.to}
                                                    </span>
                                                </div>
                                                <p className="text-lg font-semibold">
                                                    {ride.price}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">
                                                    Passengers:
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {ride.passengers.map(
                                                        (passenger) => (
                                                            <Avatar
                                                                key={
                                                                    passenger.id
                                                                }
                                                                className="h-8 w-8"
                                                            >
                                                                <AvatarImage
                                                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${passenger.name}`}
                                                                />
                                                                <AvatarFallback>
                                                                    {
                                                                        passenger.avatar
                                                                    }
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="w-full mt-4">
                                                        View Details
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Ride Details
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Complete information
                                                            about the ride and
                                                            its passengers.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <span className="font-semibold">
                                                                From:
                                                            </span>
                                                            <span className="col-span-3">
                                                                {ride.from}
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <span className="font-semibold">
                                                                To:
                                                            </span>
                                                            <span className="col-span-3">
                                                                {ride.to}
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <span className="font-semibold">
                                                                Date:
                                                            </span>
                                                            <span className="col-span-3">
                                                                {ride.date}
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <span className="font-semibold">
                                                                Time:
                                                            </span>
                                                            <span className="col-span-3">
                                                                {ride.time}
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <span className="font-semibold">
                                                                Price:
                                                            </span>
                                                            <span className="col-span-3">
                                                                {ride.price}
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <span className="font-semibold">
                                                                Status:
                                                            </span>
                                                            <span className="col-span-3">
                                                                <Badge
                                                                    className={getStatusColor(
                                                                        ride.status
                                                                    )}
                                                                >
                                                                    {
                                                                        ride.status
                                                                    }
                                                                </Badge>
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold mb-2">
                                                                Passengers:
                                                            </h4>
                                                            <ul>
                                                                {ride.passengers.map(
                                                                    (
                                                                        passenger
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                passenger.id
                                                                            }
                                                                            className="flex items-center gap-2 mb-2"
                                                                        >
                                                                            <Avatar className="h-6 w-6">
                                                                                <AvatarImage
                                                                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${passenger.name}`}
                                                                                />
                                                                                <AvatarFallback>
                                                                                    {
                                                                                        passenger.avatar
                                                                                    }
                                                                                </AvatarFallback>
                                                                            </Avatar>
                                                                            <span>
                                                                                {
                                                                                    passenger.name
                                                                                }
                                                                            </span>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
