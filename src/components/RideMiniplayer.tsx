"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChevronUp,
    ChevronDown,
    MessageSquare,
    X,
    Play,
    Pause,
    StopCircle,
    User2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { statusColors } from "@/constants/statusColors";

export default function RideMiniplayer({ activeRide, startRide, endRide }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isRideActive, setIsRideActive] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const toggleMinimize = () => setIsMinimized(!isMinimized);

    const onStartRide = () => {
        setIsRideActive(true);
        startRide();
    };

    const onPauseRide = () => {
        setIsRideActive(false);
    };

    const onEndRide = () => {
        setIsRideActive(false);
        endRide(elapsedTime);
    };

    useEffect(() => {
        let interval;
        if (isRideActive) {
            interval = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRideActive]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const totalEarnings = activeRide.bookings.reduce(
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
                                    statusColors[activeRide.status]
                                } uppercase`}
                            >
                                {activeRide.status}
                            </Badge>
                        </span>
                        <span className="text-sm font-medium">
                            Time Elapsed: {formatTime(elapsedTime)}
                        </span>
                    </div>

                    <div className="flex justify-between gap-2 mb-4">
                        <Button
                            className="flex-1"
                            onClick={onStartRide}
                            disabled={isRideActive || activeRide.status === "COMPLETED"}
                        >
                            <Play className="w-4 h-4 mr-2" /> Start
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={onPauseRide}
                            disabled={!isRideActive}
                        >
                            <Pause className="w-4 h-4 mr-2" /> Pause
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={onEndRide}
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

                                    {activeRide.bookings.map((booking) => (
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
                                <div className="border-t pt-4 mt-4">
                                    <h3 className="font-semibold mb-2">
                                        Earnings
                                    </h3>
                                    <Table>
                                        <TableBody>
                                            {activeRide.bookings?.map(
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
