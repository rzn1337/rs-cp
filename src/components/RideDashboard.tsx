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
import { Badge } from "./ui/badge";

const RideDashboard = () => {
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
                                                {ride.date} at {ride.time}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {ride.pickup} →{" "}
                                                {ride.destination}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                {ride.seatsBooked} seats booked
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
                                                <p className="text-sm text-gray-600">
                                                    {ride.pickup} →{" "}
                                                    {ride.destination}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-semibold">
                                                    <Badge>CANCELLED</Badge>
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
                                            <div className="mt-4 pt-4 border-t border-gray-200">
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
                                                        <Star
                                                            className="fill-current"
                                                            size={16}
                                                        />
                                                        <Star
                                                            className="fill-current"
                                                            size={16}
                                                        />
                                                        <Star
                                                            className="fill-current"
                                                            size={16}
                                                        />
                                                        <Star
                                                            className="fill-current"
                                                            size={16}
                                                        />
                                                        <Star size={16} />
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
    );
};

export default RideDashboard;
