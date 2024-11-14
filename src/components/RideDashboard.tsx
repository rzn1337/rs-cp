"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
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
import RideMiniplayer from "./RideMiniplayer";
import { statusColors } from "@/constants/statusColors";

const RideDashboard = ({ rides }) => {
    const [expandedPastRide, setExpandedPastRide] = useState<number | null>(
        null
    );
    const [pastRides, setPastRides] = useState([]);
    const [upcomingRides, setUpcomingRides] = useState([]);
    const [activeRide, setActiveRide] = useState(null);
    const [isRidePaused, setIsRidePaused] = useState(false);
    const [rideTimer, setRideTimer] = useState(0);

    useEffect(() => {
        const scheduledRides = rides.filter(
            (ride) => ride.status === "SCHEDULED"
        );
        const pastRidesList = rides.filter(
            (ride) => ride.status !== "SCHEDULED"
        );

        setUpcomingRides(scheduledRides);
        setPastRides(pastRidesList);
    }, [rides]);

    const startRide = (ride) => {
        setActiveRide((prev) => (prev ? { ...prev, status: "ENROUTE" } : prev));
        setIsRidePaused(false);
    };

    const pauseRide = () => {
        setIsRidePaused(true);
    };

    const resumeRide = () => {
        setIsRidePaused(false);
    };

    const endRide = async (elapsedTime) => {
        setActiveRide((prev) =>
            prev ? { ...prev, status: "COMPLETED" } : prev
        );
        setUpcomingRides((prev) =>
            prev.filter((ride) => ride.id !== activeRide.id)
        );
        setPastRides((prev) => [...prev, activeRide]);
        await axios.patch("/api/update-ride-status", {
            rideID: activeRide.id,
            status: "COMPLETED",
            elapsedTime,
        });
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
            const newRide = response.data.data;
            console.log(newRide);
            setUpcomingRides((prev) =>
                prev.map((ride) => (ride.id === newRide.id ? newRide : ride))
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
                                                {ride.bookings.length} seat(s)
                                                booked
                                            </p>
                                            <div className="flex space-x-2 mt-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        // startRide(ride)
                                                        setActiveRide(ride)
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
                                                    {
                                                        new Date(
                                                            ride.scheduledFor
                                                        )
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
                                            <div className="flex items-center space-x-2">
                                                <span className="font-semibold">
                                                    <Badge
                                                        variant="secondary"
                                                        className={`${
                                                            statusColors[
                                                                ride.status
                                                            ]
                                                        } uppercase`}
                                                    >
                                                        {ride.status}
                                                    </Badge>
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
                <RideMiniplayer
                    activeRide={activeRide}
                    startRide={startRide}
                    endRide={endRide}
                />
            )}
        </TabsContent>
    );
};

export default RideDashboard;
