"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Users, DollarSign, CarFront } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
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
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { useToast } from "@/hooks/use-toast";

interface Vehicle {
    createdAt: string;
    id: string;
    licensePlate: string;
    make: string;
    model: string;
    seats: number;
    type: string;
    userID: string;
    year: number;
}

const CreateRideTab = () => {
    const [isPremiumSeat, setIsPremiumSeat] = useState(false);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [newRide, setNewRide] = useState({
        from: "",
        to: "",
        date: "",
        scheduledFor: "",
        fare: "",
        vehicleID: "",
        seats: "",
        stops: "",
        premiumPrice: "",
    });

    useEffect(() => {
        const fetchVehicles = async () => {
            const response = await axios.get("/api/get-vehicles");
            setVehicles(response.data.data);
            console.log(response.data);
        };
        fetchVehicles();
    }, []);

    const { toast } = useToast();

    const handleCreateRide = async () => {
        const {
            date,
            scheduledFor,
            fare,
            vehicleID,
            from,
            to,
            seats,
            stops,
            premiumPrice,
        } = newRide;

        // Constructing the ride data to send to the backend
        const rideData = {
            date,
            scheduledFor,
            fare: parseFloat(fare),
            vehicleID,
            from,
            to,
            seats: parseInt(seats),
            stops: stops.split(",").map((stop) => stop.trim()),
            isPremiumSeat,
            premiumPrice: isPremiumSeat ? parseFloat(premiumPrice) : null,
        };

        try {
            const response: AxiosResponse = await axios.post(
                "/api/create-ride",
                rideData
            );
        } catch (error) {
            console.error(error);
            toast({
                title: "Error creating ride",
                description: error.message,
            });
        } finally {
            setNewRide({
                from: "",
                to: "",
                date: "",
                scheduledFor: "",
                fare: "",
                vehicleID: "",
                seats: "",
                stops: "",
                premiumPrice: "",
            });
            setIsPremiumSeat(false);
        }
    };

    return (
        <TabsContent value="create-ride" className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Ride</CardTitle>
                    <CardDescription>
                        Enter the details for your new ride
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCreateRide();
                        }}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="date">Date</Label>
                                <div className="relative">
                                    <Input
                                        id="date"
                                        type="date"
                                        value={newRide.date}
                                        onChange={(e) =>
                                            setNewRide({
                                                ...newRide,
                                                date: e.target.value,
                                            })
                                        }
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
                                        value={newRide.scheduledFor}
                                        onChange={(e) =>
                                            setNewRide({
                                                ...newRide,
                                                scheduledFor: e.target.value,
                                            })
                                        }
                                        className="pl-8"
                                    />
                                    <Clock
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                        size={16}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="seats">Available Seats</Label>
                                <div className="relative">
                                    <Input
                                        id="seats"
                                        type="number"
                                        min="1"
                                        max="8"
                                        value={newRide.seats}
                                        onChange={(e) =>
                                            setNewRide({
                                                ...newRide,
                                                seats: e.target.value,
                                            })
                                        }
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
                                        value={newRide.fare}
                                        onChange={(e) =>
                                            setNewRide({
                                                ...newRide,
                                                fare: e.target.value,
                                            })
                                        }
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
                                <div className="relative">
                                    <Label htmlFor="vehicle">Vehicle</Label>
                                    <CarFront
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                        size={16}
                                    />
                                    <Select
                                        value={newRide.vehicleID}
                                        onValueChange={(value) =>
                                            setNewRide({
                                                ...newRide,
                                                vehicleID: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="col-span-3 gap-3">
                                            <SelectValue placeholder="Select a vehicle" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {vehicles.map((vehicle) => (
                                                <SelectItem
                                                    key={vehicle.id}
                                                    value={vehicle.id}
                                                >
                                                    {vehicle.make +
                                                        " " +
                                                        vehicle.model}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="start">Start Point</Label>
                            <Input
                                id="start"
                                value={newRide.from}
                                onChange={(e) =>
                                    setNewRide({
                                        ...newRide,
                                        from: e.target.value,
                                    })
                                }
                                placeholder="Enter start location"
                                className="pl-8"
                            />
                        </div>
                        <div>
                            <Label htmlFor="stops">Stops</Label>
                            <Input
                                id="stops"
                                value={newRide.stops}
                                onChange={(e) =>
                                    setNewRide({
                                        ...newRide,
                                        stops: e.target.value,
                                    })
                                }
                                placeholder="Add stops (comma-separated)"
                                className="pl-8"
                            />
                        </div>
                        <div>
                            <Label htmlFor="end">End Point</Label>
                            <Input
                                id="end"
                                value={newRide.to}
                                onChange={(e) =>
                                    setNewRide({
                                        ...newRide,
                                        to: e.target.value,
                                    })
                                }
                                placeholder="Enter end location"
                                className="pl-8"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="premium-seat"
                                    checked={isPremiumSeat}
                                    onCheckedChange={setIsPremiumSeat}
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
                                        value={newRide.premiumPrice}
                                        onChange={(e) =>
                                            setNewRide({
                                                ...newRide,
                                                premiumPrice: e.target.value,
                                            })
                                        }
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
                        <Button type="submit" className="w-full">
                            Create Ride
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default CreateRideTab;
