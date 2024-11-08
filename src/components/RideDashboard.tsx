"use client";

import { useEffect, useState } from "react";
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
    Play,
    Pause,
    StopCircle,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import ManageRideDialog from "@/components/ManageRideDialog";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const RideDashboard = () => {
    const [expandedPastRide, setExpandedPastRide] = useState<number | null>(
        null
    );
    const [pastRides, setPastRides] = useState([]);
    const [upcomingRides, setUpcomingRides] = useState([]);
    const [activeRide, setActiveRide] = useState(null);
    const [isRidePaused, setIsRidePaused] = useState(false);
    const [rideTimer, setRideTimer] = useState(0);

    useEffect(() => {
        const fetchRides = async () => {
            const response = await axios.get("/api/get-rides");
            response.data.data.forEach((ride) => {
                if (ride.status === "SCHEDULED") {
                    setUpcomingRides((prev) => [...prev, ride]);
                } else {
                    setPastRides((prev) => [...prev, ride]);
                }
            });
            console.log(response);
        };
        fetchRides();
    }, [setUpcomingRides, setPastRides]);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | null = null;

        if (activeRide && !isRidePaused) {
            intervalId = setInterval(() => {
                setRideTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [activeRide, isRidePaused]);

    // const upcomingRides = [
    //     {
    //         id: 1,
    //         date: "2023-05-20",
    //         time: "14:00",
    //         pickup: "Central Park",
    //         destination: "JFK Airport",
    //         seatsBooked: 3,
    //     },
    //     {
    //         id: 2,
    //         date: "2023-05-22",
    //         time: "09:30",
    //         pickup: "Times Square",
    //         destination: "Brooklyn Bridge",
    //         seatsBooked: 2,
    //     },
    //     {
    //         id: 3,
    //         date: "2023-05-20",
    //         time: "14:00",
    //         pickup: "Central Park",
    //         destination: "JFK Airport",
    //         seatsBooked: 3,
    //     },
    // ];

    // const pastRides = [
    //     {
    //         id: 1,
    //         date: "2023-05-15",
    //         time: "11:00",
    //         pickup: "Statue of Liberty",
    //         destination: "Empire State Building",
    //         seatsBooked: 4,
    //         earnings: 120,
    //     },
    //     {
    //         id: 2,
    //         date: "2023-05-10",
    //         time: "16:45",
    //         pickup: "Broadway Theater",
    //         destination: "Central Park",
    //         seatsBooked: 2,
    //         earnings: 75,
    //     },
    // ];

    const startRide = (ride) => {
        setActiveRide(ride);
        setIsRidePaused(false);
    };

    const pauseRide = () => {
        setIsRidePaused(true);
    };

    const resumeRide = () => {
        setIsRidePaused(false);
    };

    const endRide = () => {
        setActiveRide(null);
        setIsRidePaused(false);
    };

    const { toast } = useToast();

    const formatRideTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const handleUpdateRide = async (updatedRide) => {
        console.log(updatedRide);
        try {
            const response = await axios.patch(
                "/api/update-ride-details",
                updatedRide
            );
            console.log(response);
            const newRide = response.data.data
            console.log(newRide)
            setUpcomingRides((prev) =>
                prev.map((ride) =>
                    ride.id === newRide.id
                        ? newRide
                        : ride
                )
            );
            toast({ title: "Your ride has been updated" });
        } catch (error) {
            console.error(error);
        }
    };

    return (
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
                                        className="p-4 rounded-lg shadow flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-semibold">
                                                {
                                                    new Date(ride.scheduledFor)
                                                        .toISOString()
                                                        .split("T")[0]
                                                }{" "}
                                                at{" "}
                                                {new Date(ride.scheduledFor)
                                                    .toISOString()
                                                    .slice(11, 16)}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {ride.route.from} →{" "}
                                                {ride.route.to}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                {ride.passengers.length} seats
                                                booked
                                            </p>
                                            <div className="flex space-x-2 mt-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        startRide(ride)
                                                    }
                                                >
                                                    Start
                                                </Button>
                                                <ManageRideDialog
                                                    currentRide={ride}
                                                    handleUpdateRide={
                                                        handleUpdateRide
                                                    }
                                                />
                                            </div>
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
                                        className="p-4 rounded-lg shadow"
                                    >
                                        <div
                                            className="flex justify-between items-center cursor-pointer"
                                            onClick={() =>
                                                setExpandedPastRide(
                                                    expandedPastRide === ride.id
                                                        ? null
                                                        : ride.id
                                                )
                                            }
                                        >
                                            <div>
                                                <p className="font-semibold">
                                                    {ride.date} at {ride.time}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {ride.pickup} →{" "}
                                                    {ride.destination}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-semibold">
                                                    <Badge>COMPLETED</Badge>
                                                </span>
                                                {expandedPastRide ===
                                                ride.id ? (
                                                    <ChevronUp size={20} />
                                                ) : (
                                                    <ChevronDown size={20} />
                                                )}
                                            </div>
                                        </div>
                                        {expandedPastRide === ride.id && (
                                            <div className="mt-4 pt-4 border-t">
                                                <p>
                                                    <strong>
                                                        Seats Booked:
                                                    </strong>{" "}
                                                    {ride.seatsBooked}
                                                </p>
                                                <p>
                                                    <strong>
                                                        Total Earnings:
                                                    </strong>{" "}
                                                    ${ride.earnings}
                                                </p>
                                                <div className="mt-2 flex items-center">
                                                    <span className="mr-2">
                                                        Rating:
                                                    </span>
                                                    <span className="text-yellow-400 flex">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={
                                                                        i < 4
                                                                            ? "fill-current"
                                                                            : ""
                                                                    }
                                                                    size={16}
                                                                />
                                                            )
                                                        )}
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

            {activeRide && (
                <div className="fixed bottom-0 left-10 right-0 bg-background border-t p-4 flex justify-between items-center">
                    <div>
                        <p className="font-semibold">Active Ride</p>
                        <p className="text-sm text-muted-foreground">
                            {activeRide.pickup} → {activeRide.destination}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <Clock className="inline-block mr-2 h-4 w-4" />
                            {formatRideTime(rideTimer)}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        {isRidePaused ? (
                            <Button size="sm" onClick={resumeRide}>
                                <Play className="mr-2 h-4 w-4" /> Resume
                            </Button>
                        ) : (
                            <Button size="sm" onClick={pauseRide}>
                                <Pause className="mr-2 h-4 w-4" /> Pause
                            </Button>
                        )}
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={endRide}
                        >
                            <StopCircle className="mr-2 h-4 w-4" /> End Ride
                        </Button>
                    </div>
                </div>
            )}
        </TabsContent>
    );
};

export default RideDashboard;
