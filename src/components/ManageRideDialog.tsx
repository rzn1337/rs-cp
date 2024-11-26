"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    MessageCircle,
    UserMinus,
    Users,
    Calendar,
    Clock,
    MapPin,
    Navigation,
    User2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ManageRideDialog({
    currentRide,
    handleCancelRide,
    handleUpdateRide,
    handleRemovePassenger,
    handleManageClick,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [ride, setRide] = useState(currentRide);
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);
    const [selectedPassenger, setSelectedPassenger] = useState(null);

    const onUpdateRide = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;

        const updatedRide = {
            ...ride,
            scheduledFor: `${date}T${time}:00.000Z`,
            from: formData.get("pickup") as string,
            to: formData.get("destination") as string,
        };
        console.log(updatedRide);
        setRide(updatedRide);
        handleUpdateRide(updatedRide);
        setIsOpen(false);
    };

    const onRemovePassenger = (passenger) => {
        const updatedBookings = ride.bookings.filter(
            (p) => p.id !== passenger.id
        );
        setRide((prev) => ({ ...prev, bookings: updatedBookings }));
        handleRemovePassenger(passenger.id);

        // Here you would typically update the passenger list in your backend
    };

    const handleMessagePassenger = (passenger) => {
        setSelectedPassenger(passenger);
        setMessageDialogOpen(true);
    };

    const handleSendMessage = (message: string) => {
        // Here you would typically send the message to the passenger via your backend
        alert(`Message sent to ${selectedPassenger.name}: ${message}`);
        setMessageDialogOpen(false);
    };

    const handleStartGroupChat = () => {
        // Here you would typically initiate a group chat with all passengers
        alert("Group chat started with all passengers!");
    };

    const onCancelRide = (rideID) => {
        handleCancelRide(rideID);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleManageClick(currentRide)}
                >
                    Manage
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Manage Ride</DialogTitle>
                    <DialogDescription>
                        Update ride details, manage passengers, or cancel the
                        ride.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ride Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onUpdateRide}>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="date"
                                            className="text-right"
                                        >
                                            <Calendar className="h-4 w-4 mr-2 inline-block" />
                                            Date
                                        </Label>
                                        <Input
                                            id="date"
                                            name="date"
                                            type="date"
                                            defaultValue={
                                                ride.scheduledFor.split("T")[0]
                                            }
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="time"
                                            className="text-right"
                                        >
                                            <Clock className="h-4 w-4 mr-2 inline-block" />
                                            Time
                                        </Label>
                                        <Input
                                            id="time"
                                            name="time"
                                            type="time"
                                            defaultValue={ride.scheduledFor
                                                .split("T")[1]
                                                .slice(0, 5)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="pickup"
                                            className="text-right"
                                        >
                                            <MapPin className="h-4 w-4 mr-2 inline-block" />
                                            Pickup
                                        </Label>
                                        <Input
                                            id="pickup"
                                            name="pickup"
                                            defaultValue={ride.route.from}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="destination"
                                            className="text-right"
                                        >
                                            <Navigation className="h-4 w-4 mr-2 inline-block" />
                                            Destination
                                        </Label>
                                        <Input
                                            id="destination"
                                            name="destination"
                                            defaultValue={ride.route.to}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6">
                                    <Button type="submit">Update Ride</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Separator />

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Passengers ({ride.bookings.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[200px] pr-4">
                                <AnimatePresence>
                                    {ride.bookings.map((passenger) => (
                                        <motion.div
                                            key={passenger.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-center justify-between mb-4 p-2 rounded-lg hover:bg-accent"
                                        >
                                            <div className="flex items-center">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={`https://api.dicebear.com/9.x/notionists/svg?seed=${passenger.user.username}`}
                                                        alt={
                                                            passenger.user
                                                                .username
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        <User2 className="h-4 w-4" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>
                                                    {passenger.user.name}
                                                </span>
                                            </div>
                                            <div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleMessagePassenger(
                                                            passenger
                                                        )
                                                    }
                                                >
                                                    <MessageCircle className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        onRemovePassenger(
                                                            passenger
                                                        )
                                                    }
                                                >
                                                    <UserMinus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </ScrollArea>
                            <div className="mt-6 flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={handleStartGroupChat}
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    Start Group Chat
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">
                                            Cancel Ride
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will cancel the ride and
                                                notify all passengers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Go back
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => onCancelRide(ride.id)}
                                            >
                                                Yes, cancel ride
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
            <Dialog
                open={messageDialogOpen}
                onOpenChange={setMessageDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Message {selectedPassenger?.name}
                        </DialogTitle>
                    </DialogHeader>
                    <Textarea
                        placeholder="Type your message here."
                        id="message"
                        className="min-h-[100px]"
                    />
                    <div className="flex justify-end mt-4">
                        <Button
                            onClick={() =>
                                handleSendMessage(
                                    (
                                        document.getElementById(
                                            "message"
                                        ) as HTMLTextAreaElement
                                    ).value
                                )
                            }
                        >
                            Send Message
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Dialog>
    );
}
