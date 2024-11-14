"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChevronUp,
    ChevronDown,
    Phone,
    MessageSquare,
    AlertTriangle,
    X,
    Play,
    Pause,
    StopCircle,
    User2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function RideMiniplayer(activeRide) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [rideStatus, setRideStatus] = useState("En route");
    const [isRideActive, setIsRideActive] = useState(false);

    const statusColors = {
        SCHEDULED: "bg-blue-200 text-blue-800",
        ENROUTE: "bg-yellow-200 text-yellow-800",
        COMPLETED: "bg-green-200 text-green-800",
        CANCELLED: "bg-red-200 text-red-800",
    };

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const toggleMinimize = () => setIsMinimized(!isMinimized);

    const startRide = () => {
        setIsRideActive(true);
        setRideStatus("Ride in progress");
    };

    const pauseRide = () => {
        setRideStatus("Ride paused");
    };

    const endRide = () => {
        setIsRideActive(false);
        setRideStatus("Ride ended");
    };

    const totalEarnings = activeRide.ride.bookings.reduce(
        (total, booking) => total + booking.farePaid,
        0
    );

    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 md:bottom-4 md:right-4 md:left-auto md:w-80 lg:w-96"
            animate={isMinimized ? { y: "calc(100% - 40px)" } : { y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <Card className="rounded-t-lg md:rounded-lg shadow-lg">
                <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Current Ride</h2>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleExpand}
                            >
                                {isExpanded ? <ChevronDown /> : <ChevronUp />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMinimize}
                            >
                                {isMinimized ? <ChevronUp /> : <X />}
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium">
                            <Badge
                                variant="secondary"
                                className={`${
                                    statusColors[activeRide.ride.status]
                                } uppercase`}
                            >
                                {activeRide.ride.status}
                            </Badge>
                        </span>
                        <span className="text-sm font-medium">
                            Time Elapsed: 15 mins
                        </span>
                    </div>

                    <div className="flex justify-between gap-2 mb-4">
                        <Button
                            className="flex-1"
                            onClick={startRide}
                            disabled={isRideActive}
                        >
                            <Play className="w-4 h-4 mr-2" /> Start
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={pauseRide}
                            disabled={!isRideActive}
                        >
                            <Pause className="w-4 h-4 mr-2" /> Pause
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={endRide}
                            disabled={!isRideActive}
                        >
                            <StopCircle className="w-4 h-4 mr-2" /> End
                        </Button>
                    </div>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="border-t pt-4 mt-4">
                                    <h3 className="font-semibold mb-2">
                                        Passenger Details
                                    </h3>

                                    {activeRide.ride.bookings.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="flex items-center justify-between mb-2 text-sm"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={`https://api.dicebear.com/9.x/notionists/svg?seed=${booking.user.username}`}
                                                        alt={
                                                            booking.user
                                                                .username
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        <User2 className="h-4 w-4" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>
                                                    {booking.user.username} (4.8
                                                    ★)
                                                </span>
                                                {/* <span>2 passengers</span> */}
                                            </div>
                                            <span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <MessageSquare className="w-4 h-4 mr-2" />{" "}
                                                    Message
                                                </Button>
                                            </span>
                                        </div>
                                    ))}
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Special instructions: Please wait at the
                                        main entrance.
                                    </p>
                                </div>
                                {/* <div className="border-t pt-4 mt-4">
                                    <h3 className="font-semibold mb-2">
                                        Earnings
                                    </h3>
                                    <div className="text-sm">
                                        {activeRide.ride.bookings?.map(
                                            (booking) => (
                                                <div
                                                    key={booking.id}
                                                    className="flex justify-between"
                                                >
                                                    <span>
                                                        {booking.user.username}{" "}
                                                        - Seat{" "}
                                                        {
                                                            booking.seat
                                                                ?.seatNumber
                                                        }
                                                    </span>
                                                    <span>
                                                        $
                                                        {booking.farePaid.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                        <div className="flex justify-between font-semibold mt-2">
                                            <span>Total Earnings:</span>
                                            <span>
                                                ${totalEarnings.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="border-t pt-4 mt-4">
                                    <h3 className="font-semibold mb-2">
                                        Earnings
                                    </h3>
                                    <Table>
                                        
                                        <TableBody className="">
                                            {activeRide.ride.bookings?.map(
                                                (booking) => (
                                                    <TableRow key={booking.id}>
                                                        <TableCell>
                                                            {
                                                                booking.user
                                                                    .username
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            Seat{" "}
                                                            {
                                                                booking.seat
                                                                    ?.seatNumber
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            $
                                                            {booking.farePaid.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                Total Earnings:
                                            </TableCell>
                                            <TableCell />
                                            <TableCell className="font-semibold">
                                                ${totalEarnings.toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </motion.div>
    );
}
