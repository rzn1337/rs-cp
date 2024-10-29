"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Search, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dummy data for rides
const initialRides = [
    {
        id: 1,
        driver: "John Doe",
        from: "Downtown",
        to: "Airport",
        date: "2023-06-15",
        time: "14:00",
        price: "$25",
        status: "Available",
    },
    {
        id: 2,
        driver: "Jane Smith",
        from: "Suburb",
        to: "City Center",
        date: "2023-06-16",
        time: "09:30",
        price: "$18",
        status: "En Route",
    },
    {
        id: 3,
        driver: "Mike Johnson",
        from: "Beach",
        to: "Mountain View",
        date: "2023-06-17",
        time: "11:15",
        price: "$30",
        status: "Completed",
    },
    {
        id: 4,
        driver: "Sarah Brown",
        from: "University",
        to: "Shopping Mall",
        date: "2023-06-18",
        time: "13:45",
        price: "$15",
        status: "Available",
    },
    {
        id: 5,
        driver: "Chris Lee",
        from: "Tech Park",
        to: "Residential Area",
        date: "2023-06-19",
        time: "17:00",
        price: "$22",
        status: "En Route",
    },
    {
        id: 6,
        driver: "Emily Davis",
        from: "Airport",
        to: "Hotel District",
        date: "2023-06-20",
        time: "20:30",
        price: "$28",
        status: "Available",
    },
];

export default function Dashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [rides, setRides] = useState(initialRides);
    const [selectedRide, setSelectedRide] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { toast } = useToast();

    const filteredRides = rides.filter(
        (ride) =>
            ride.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ride.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ride.driver.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBookRide = (ride) => {
        setSelectedRide(ride);
        setIsDialogOpen(true);
    };

    const confirmBooking = () => {
        setRides(
            rides.map((ride) =>
                ride.id === selectedRide.id
                    ? { ...ride, status: "Booked" }
                    : ride
            )
        );
        setIsDialogOpen(false);
        toast({
            title: "Ride Booked!",
            description: `You've successfully booked a ride with ${selectedRide?.driver} from ${selectedRide?.from} to ${selectedRide.to}.`,
        });
    };

    return (
        <div className="container mx-auto p-4">
            {/* <h1 className="text-2xl font-bold mb-6">Ride Sharing Dashboard</h1> */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search rides..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredRides.map((ride) => (
                    <Card key={ride.id}>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>
                                    {ride.from} to {ride.to}
                                </span>
                                <Badge
                                    variant={
                                        ride.status === "Available"
                                            ? "default"
                                            : ride.status === "En Route"
                                            ? "secondary"
                                            : "outline"
                                    }
                                >
                                    {ride.status}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center mb-4">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage
                                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${ride.driver}`}
                                        alt={ride.driver}
                                    />
                                    <AvatarFallback>
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="ml-3">
                                    <p className="text-sm font-medium">
                                        {ride.driver}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {ride.date} at {ride.time}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
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
                            {ride.status === "Available" && (
                                <Button
                                    className="w-full mt-4"
                                    onClick={() => handleBookRide(ride)}
                                >
                                    Book Now
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Booking</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to book this ride?
                        </DialogDescription>
                    </DialogHeader>
                    {selectedRide && (
                        <div className="py-4">
                            <p>
                                <strong>Driver:</strong> {selectedRide.driver}
                            </p>
                            <p>
                                <strong>From:</strong> {selectedRide.from}
                            </p>
                            <p>
                                <strong>To:</strong> {selectedRide.to}
                            </p>
                            <p>
                                <strong>Date:</strong> {selectedRide.date}
                            </p>
                            <p>
                                <strong>Time:</strong> {selectedRide.time}
                            </p>
                            <p>
                                <strong>Price:</strong> {selectedRide.price}
                            </p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={confirmBooking}>
                            Confirm Booking
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
