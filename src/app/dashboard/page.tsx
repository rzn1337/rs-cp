"use client";

import { useEffect, useState } from "react";
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
import axios from "axios";

export default function Dashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [rides, setRides] = useState([]);
    const [selectedRide, setSelectedRide] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { toast } = useToast();

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

    useEffect(() => {
        const fetchAvailables = async () => {
            const response = await axios.get(
                `/api/get-public-rides?search=${searchTerm}&limit=10`
            );
            console.log(response);
            setRides(response.data.data);
        };
        fetchAvailables();
    }, [searchTerm]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Book a Ride</h1>
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
            {rides.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {rides.map((ride) => (
                        <Card key={ride.id}>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>
                                        {ride.from} to {ride.to}
                                    </span>
                                    <Badge
                                        variant={
                                            ride.ride.status === "SCHEDULED"
                                                ? "default"
                                                : ride.ride.status === "ENROUTE"
                                                ? "secondary"
                                                : "outline"
                                        }
                                    >
                                        {ride.ride.status}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center mb-4">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage
                                            src={`https://api.dicebear.com/9.x/notionists/svg?seed=${ride.driver}`}
                                            alt={ride.driver}
                                        />
                                        <AvatarFallback>
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium">
                                            {ride.ride.driverID}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(ride.ride.scheduledFor)
                                .toISOString()
                                .split("T")[0]} at {new Date(ride.ride.scheduledFor)
                                    .toISOString()
                                    .split("T")[1]
                                    .split(".")[0]}
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
                                        ${ride.ride.fare}
                                    </p>
                                </div>
                                {ride.ride.status === "SCHEDULED" && (
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
            ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                        No rides are available at the moment
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Check back soon or try adjusting your search filters.
                    </p>
                    <Button onClick={() => {}}>Refresh</Button>
                </div>
            )}

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
                                <strong>Driver:</strong> {selectedRide.ride.driverID}
                            </p>
                            <p>
                                <strong>From:</strong> {selectedRide.from}
                            </p>
                            <p>
                                <strong>To:</strong> {selectedRide.to}
                            </p>
                            <p>
                                <strong>Vehicle:</strong> {selectedRide.vehicle}
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
