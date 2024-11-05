"use client";

import { useState } from "react";
import {
    Calendar,
    Clock,
    Users,
    DollarSign,
    Car,
    MapPin,
    Plus,
    ChevronDown,
    ChevronUp,
    Star,
    UserMinus,
    MessageCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import RideManagementModal from "@/components/RideManagementModal";
import ManageRideDialog from "@/components/ManageRideDialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateRideTab from "@/components/CreateRideTab";

export default function RideManagement() {
    const [isPremiumSeat, setIsPremiumSeat] = useState(false);
    const [expandedPastRide, setExpandedPastRide] = useState<number | null>(
        null
    );

    const upcomingRides = [
        {
            id: 1,
            date: "2023-05-20",
            time: "14:00",
            pickup: "Central Park",
            destination: "JFK Airport",
            seatsBooked: 3,
        },
        {
            id: 2,
            date: "2023-05-22",
            time: "09:30",
            pickup: "Times Square",
            destination: "Brooklyn Bridge",
            seatsBooked: 2,
        },
        {
            id: 3,
            date: "2023-05-20",
            time: "14:00",
            pickup: "Central Park",
            destination: "JFK Airport",
            seatsBooked: 3,
        },
    ];

    const pastRides = [
        {
            id: 1,
            date: "2023-05-15",
            time: "11:00",
            pickup: "Statue of Liberty",
            destination: "Empire State Building",
            seatsBooked: 4,
            earnings: 120,
        },
        {
            id: 2,
            date: "2023-05-10",
            time: "16:45",
            pickup: "Broadway Theater",
            destination: "Central Park",
            seatsBooked: 2,
            earnings: 75,
        },
    ];

    return (
        <>
            <div className="container mx-auto px-4 py-8min-h-screen">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Ride Management
                </h1>

                <Tabs defaultValue="create-ride" className="">
                    <TabsList className="grid w-full grid-cols-2  gap-2">
                        <TabsTrigger value="create-ride" className="">
                            Create Ride
                        </TabsTrigger>
                        <TabsTrigger value="ride-dashboard" className="">
                            Ride Dashboard
                        </TabsTrigger>
                    </TabsList>

                    {/* <TabsContent value="create-ride" className="p-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create New Ride</CardTitle>
                                <CardDescription>
                                    Enter the details for your new ride
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="date">Date</Label>
                                            <div className="relative">
                                                <Input
                                                    id="date"
                                                    type="date"
                                                    className="pl-8"
                                                />
                                                <Calendar
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                    size={16}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="time">Time</Label>
                                            <div className="relative">
                                                <Input
                                                    id="time"
                                                    type="time"
                                                    className="pl-8"
                                                />
                                                <Clock
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                    size={16}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="seats">
                                                Available Seats
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="seats"
                                                    type="number"
                                                    min="1"
                                                    max="8"
                                                    placeholder="Number of seats"
                                                    className="pl-8"
                                                />
                                                <Users
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                    size={16}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="fare">Fare</Label>
                                            <div className="relative">
                                                <Input
                                                    id="fare"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    placeholder="Ride fare"
                                                    className="pl-8"
                                                />
                                                <DollarSign
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                    size={16}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="vehicle">
                                                Vehicle
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="vehicle"
                                                    placeholder="Select your vehicle"
                                                    className="pl-8"
                                                />
                                                <Car
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                    size={16}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="start">
                                            Start Point
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="start"
                                                placeholder="Enter start location"
                                                className="pl-8"
                                            />
                                            <MapPin
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                size={16}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="stops">Stops</Label>
                                        <div className="relative">
                                            <Input
                                                id="stops"
                                                placeholder="Add stops (comma-separated)"
                                                className="pl-8"
                                            />
                                            <Plus
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                size={16}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="end">End Point</Label>
                                        <div className="relative">
                                            <Input
                                                id="end"
                                                placeholder="Enter end location"
                                                className="pl-8"
                                            />
                                            <MapPin
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                size={16}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="premium-seat"
                                                checked={isPremiumSeat}
                                                onCheckedChange={
                                                    setIsPremiumSeat
                                                }
                                            />
                                            <Label htmlFor="premium-seat">
                                                Premium Seat Option
                                            </Label>
                                        </div>
                                        {isPremiumSeat && (
                                            <div className="relative w-32">
                                                <Input
                                                    id="premium-price"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    placeholder="Premium price"
                                                    className="pl-6"
                                                />
                                                <DollarSign
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                    size={16}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <Button className="w-full">
                                        Create Ride
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent> */}

                    <CreateRideTab />

                    <TabsContent value="ride-dashboard" className="p-4">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upcoming Rides</CardTitle>
                                    <CardDescription>
                                        Manage your scheduled rides
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[300px] pr-4">
                                        <div className="space-y-4">
                                            {upcomingRides.map((ride) => (
                                                <div
                                                    key={ride.id}
                                                    className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center"
                                                >
                                                    <div>
                                                        <p className="font-semibold">
                                                            {ride.date} at{" "}
                                                            {ride.time}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {ride.pickup} →{" "}
                                                            {ride.destination}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold">
                                                            {ride.seatsBooked}{" "}
                                                            seats booked
                                                        </p>
                                                        {/* <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="mt-2"
                                                            onClick={() =>
                                                                setSelectedRide(
                                                                    ride
                                                                )
                                                            }
                                                        >
                                                            Manage
                                                        </Button> */}
                                                        <ManageRideDialog />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Past Rides</CardTitle>
                                    <CardDescription>
                                        Review your completed rides
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[300px] pr-4">
                                        <div className="space-y-4">
                                            {pastRides.map((ride) => (
                                                <div
                                                    key={ride.id}
                                                    className="bg-gray-50 p-4 rounded-lg shadow"
                                                >
                                                    <div
                                                        className="flex justify-between items-center cursor-pointer"
                                                        onClick={() =>
                                                            setExpandedPastRide(
                                                                expandedPastRide ===
                                                                    ride.id
                                                                    ? null
                                                                    : ride.id
                                                            )
                                                        }
                                                    >
                                                        <div>
                                                            <p className="font-semibold">
                                                                {ride.date} at{" "}
                                                                {ride.time}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {ride.pickup} →{" "}
                                                                {
                                                                    ride.destination
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="font-semibold">
                                                                ${ride.earnings}
                                                            </span>
                                                            {expandedPastRide ===
                                                            ride.id ? (
                                                                <ChevronUp
                                                                    size={20}
                                                                />
                                                            ) : (
                                                                <ChevronDown
                                                                    size={20}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                    {expandedPastRide ===
                                                        ride.id && (
                                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                                            <p>
                                                                <strong>
                                                                    Seats
                                                                    Booked:
                                                                </strong>{" "}
                                                                {
                                                                    ride.seatsBooked
                                                                }
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Total
                                                                    Earnings:
                                                                </strong>{" "}
                                                                ${ride.earnings}
                                                            </p>
                                                            <div className="mt-2 flex items-center">
                                                                <span className="mr-2">
                                                                    Rating:
                                                                </span>
                                                                <span className="text-yellow-400 flex">
                                                                    <Star
                                                                        className="fill-current"
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    <Star
                                                                        className="fill-current"
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    <Star
                                                                        className="fill-current"
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    <Star
                                                                        className="fill-current"
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    <Star
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
