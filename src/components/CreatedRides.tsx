import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import {
    Calendar,
    Clock,
    Edit,
    MapPin,
    PlusIcon,
    PlayCircle,
} from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const initialCreatedRides = [
    {
        id: 1,
        from: "Airport",
        to: "Downtown",
        date: "2023-07-20",
        time: "10:00",
        price: "$28",
        status: "Scheduled",
        passengers: [
            { id: 1, name: "Alice Johnson", avatar: "AJ" },
            { id: 2, name: "Bob Smith", avatar: "BS" },
        ],
    },
    {
        id: 2,
        from: "City Center",
        to: "Beach",
        date: "2023-07-21",
        time: "14:30",
        price: "$22",
        status: "Completed",
        passengers: [
            { id: 3, name: "Charlie Brown", avatar: "CB" },
            { id: 4, name: "Diana Prince", avatar: "DP" },
        ],
    },
];

const vehicles = [
    { id: 1, name: "Car" },
    { id: 2, name: "Motorcycle" },
    { id: 3, name: "Van" },
    { id: 4, name: "Bicycle" },
];

interface Vehicle {
    createdAt: string;
    id: string;
    licensePlate: string;
    make: string;
    model: string;
    seats: number;
    userID: string;
    year: number;
}

export default function CreatedRides() {
    const [createdRides, setCreatedRides] = useState([]);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingRide, setEditingRide] = useState(null);
    const [newRide, setNewRide] = useState({
        from: "",
        to: "",
        date: "",
        scheduledFor: "",
        fare: "",
        vehicleID: "",
    });


    const { toast } = useToast();

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        const fetchRides = async () => {
            const response = await axios.get("/api/get-rides");
            console.log(response);
            setCreatedRides(response.data.data);
        };
        const fetchVehicles = async () => {
            const response = await axios.get("/api/get-vehicles");
            setVehicles(response.data.data);
            console.log(response.data);
        };
        fetchRides();
        fetchVehicles();
    }, []);

    const scheduledRides = createdRides.filter(
        (ride) => ride.status === "SCHEDULED"
    );
    const otherRides = createdRides.filter(
        (ride) => ride.status !== "SCHEDULED"
    );

    const handleCreateRide = async () => {
        // Optimistic UI update
        const optimisticRides = [...createdRides, newRide];
        setCreatedRides(optimisticRides);
        setIsCreateDialogOpen(false);

        try {
            const response = await axios.post("/api/create-ride", newRide);
            console.log(response);
            setCreatedRides([...createdRides, response.data.data]);
        } catch (error) {
            // Revert optimistic update in case of error
            setCreatedRides(createdRides);
            console.log(error);
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
            });
        }
    };

    const [cars, setCars] = useState([]);

    const handleEditRide = (ride) => {
        setEditingRide(ride);
        setIsEditDialogOpen(true);
    };

    const handleUpdateRide = () => {
        setCreatedRides((rides) =>
            rides.map((ride) =>
                ride.id === editingRide.id ? editingRide : ride
            )
        );
        setIsEditDialogOpen(false);
        setEditingRide(null);
    };

    const handleCancelRide = (rideId) => {
        setCreatedRides((rides) =>
            rides.map((ride) =>
                ride.id === rideId ? { ...ride, status: "Cancelled" } : ride
            )
        );
    };

    const handleStartRide = (rideId) => {
        setCreatedRides((rides) =>
            rides.map((ride) =>
                ride.id === rideId ? { ...ride, status: "En Route" } : ride
            )
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "COMPLETED":
                return "bg-green-500";
            case "ENROUTE":
                return "bg-blue-500";
            case "CANCELLED":
                return "bg-red-500";
            case "SCHEDULED":
                return "bg-yellow-500";
            default:
                return "bg-gray-500";
        }
    };

    const RideCard = ({ ride }) => (
        <Card key={ride.id} className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>
                        {ride.route.from} to {ride.route.to}
                    </span>
                    <Badge className={getStatusColor(ride.status)}>
                        {ride.status}
                    </Badge>
                </CardTitle>
                <CardDescription>
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date(ride.scheduledFor).toISOString().split('T')[0]}
                        <Clock className="ml-4 mr-2 h-4 w-4" />
                        {new Date(ride.scheduledFor).toISOString().split('T')[1].split(".")[0]}
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                            {ride.route.from} → {ride.route.to}
                        </span>
                    </div>
                    <p className="text-lg font-semibold">${ride.fare}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Passengers:</h4>
                    <div className="flex flex-wrap gap-2">
                        {/* {ride.passengers.map((passenger) => (
                            <Avatar key={passenger.id} className="h-8 w-8">
                                <AvatarImage
                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${passenger.name}`}
                                    alt={passenger.name}
                                />
                                <AvatarFallback>
                                    {passenger.avatar}
                                </AvatarFallback>
                            </Avatar>
                        ))} */}
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    {ride.status === "SCHEDULED" && (
                        <div className="flex gap-2 w-auto">
                            <Button
                                variant="outline"
                                onClick={() => handleEditRide(ride)}
                                className="flex-1"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                            <Button
                                onClick={() => handleStartRide(ride.id)}
                                className="flex-1 bg-green-500 hover:bg-green-600"
                            >
                                <PlayCircle className="mr-2 h-4 w-4" />
                                Start Ride
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        className="flex-1"
                                    >
                                        Cancel Ride
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently cancel the ride.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() =>
                                                handleCancelRide(ride.id)
                                            }
                                        >
                                            Confirm
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                    {ride.status !== "SCHEDULED" && (
                        <Button variant="secondary" className="w-full">
                            View Details
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Scheduled Rides</CardTitle>
                            <CardDescription>
                                Upcoming rides that need your attention
                            </CardDescription>
                        </div>
                        <Button onClick={() => setIsCreateDialogOpen(true)}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Create New Ride
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {scheduledRides.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No scheduled rides at the moment
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {createdRides.map((ride) => (
                                <RideCard key={ride.id} ride={ride} />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Other Rides</CardTitle>
                    <CardDescription>
                        View your completed, en route, and cancelled rides
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {otherRides.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No other rides to display
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {otherRides.map((ride) => (
                                <RideCard key={ride.id} ride={ride} />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Ride</DialogTitle>
                        <DialogDescription>
                            Enter the details for your new ride.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="from" className="text-right">
                                From
                            </Label>
                            <Input
                                id="from"
                                value={newRide.from}
                                onChange={(e) =>
                                    setNewRide({
                                        ...newRide,
                                        from: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="to" className="text-right">
                                To
                            </Label>
                            <Input
                                id="to"
                                value={newRide.to}
                                onChange={(e) =>
                                    setNewRide({
                                        ...newRide,
                                        to: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Date
                            </Label>
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
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">
                                Time
                            </Label>
                            <Input
                                id="scheduledFor"
                                type="time"
                                value={newRide.scheduledFor}
                                onChange={(e) =>
                                    setNewRide({
                                        ...newRide,
                                        scheduledFor: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fare" className="text-right">
                                Fare
                            </Label>
                            <Input
                                id="fare"
                                value={newRide.fare}
                                onChange={(e) =>
                                    setNewRide({
                                        ...newRide,
                                        fare: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="vehicle" className="text-right">
                                Vehicle
                            </Label>
                            <Select
                                value={newRide.vehicleID}
                                onValueChange={(value) =>
                                    setNewRide({ ...newRide, vehicleID: value })
                                }
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a vehicle" />
                                </SelectTrigger>
                                <SelectContent>
                                    {vehicles.map((vehicle) => (
                                        <SelectItem
                                            key={vehicle.id}
                                            value={vehicle.id.toString()}
                                        >
                                            {vehicle.make + " " + vehicle.model}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleCreateRide}>
                            Create Ride
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Ride</DialogTitle>
                        <DialogDescription>
                            Make changes to your ride here. Click save when
                            you're done.
                        </DialogDescription>
                    </DialogHeader>
                    {editingRide && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="edit-from"
                                    className="text-right"
                                >
                                    From
                                </Label>
                                <Input
                                    id="edit-from"
                                    value={editingRide.from}
                                    onChange={(e) =>
                                        setEditingRide({
                                            ...editingRide,
                                            from: e.target.value,
                                        })
                                    }
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-to" className="text-right">
                                    To
                                </Label>
                                <Input
                                    id="edit-to"
                                    value={editingRide.to}
                                    onChange={(e) =>
                                        setEditingRide({
                                            ...editingRide,
                                            to: e.target.value,
                                        })
                                    }
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="edit-date"
                                    className="text-right"
                                >
                                    Date
                                </Label>

                                <Input
                                    id="edit-date"
                                    type="date"
                                    value={editingRide.date}
                                    onChange={(e) =>
                                        setEditingRide({
                                            ...editingRide,
                                            date: e.target.value,
                                        })
                                    }
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="edit-time"
                                    className="text-right"
                                >
                                    Time
                                </Label>
                                <Input
                                    id="edit-time"
                                    type="time"
                                    value={editingRide.time}
                                    onChange={(e) =>
                                        setEditingRide({
                                            ...editingRide,
                                            time: e.target.value,
                                        })
                                    }
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="edit-price"
                                    className="text-right"
                                >
                                    Price
                                </Label>
                                <Input
                                    id="edit-price"
                                    value={editingRide.price}
                                    onChange={(e) =>
                                        setEditingRide({
                                            ...editingRide,
                                            price: e.target.value,
                                        })
                                    }
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" onClick={handleUpdateRide}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
