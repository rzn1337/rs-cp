"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import {
    User,
    MapPin,
    Calendar,
    Clock,
    Edit,
    Plus,
    CarFront,
    X,
    AlertCircle,
    Star,
    PlusIcon,
} from "lucide-react";
import ViewRideDetailsDialog from "@/components/ViewRideDetailsDialog";
import CreatedRides from "@/components/CreatedRides";
import BookingHistory from "@/components/BookingHistory";
import Complaints from "@/components/Complaints";


// Dummy data for ride history
const rideHistory = [
    {
        id: 1,
        from: "Downtown",
        to: "Airport",
        date: "2023-06-15",
        time: "14:00",
        price: "$25",
        status: "Completed",
        driver: "John Doe",
    },
    {
        id: 2,
        from: "Suburb",
        to: "City Center",
        date: "2023-06-16",
        time: "09:30",
        price: "$18",
        status: "Completed",
        driver: "Jane Smith",
    },
    {
        id: 3,
        from: "Beach",
        to: "Mountain View",
        date: "2023-06-17",
        time: "11:15",
        price: "$30",
        status: "Completed",
        driver: "Mike Johnson",
    },
    {
        id: 4,
        from: "University",
        to: "Shopping Mall",
        date: "2023-06-18",
        time: "13:45",
        price: "$15",
        status: "Completed",
        driver: "Sarah Brown",
    },
];

// Dummy data for created rides
const initialCreatedRides = [
    {
        id: 1,
        from: "Airport",
        to: "Downtown",
        date: "2023-07-20",
        time: "10:00",
        price: "$28",
        status: "Completed",
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
            { id: 5, name: "Ethan Hunt", avatar: "EH" },
        ],
    },
    {
        id: 3,
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
];

// Dummy data for complaints
const initialComplaints = [
    {
        id: 1,
        rideId: 2,
        against: "Driver",
        description: "Driver was rude and unprofessional",
        status: "Under Review",
    },
    {
        id: 2,
        rideId: 3,
        against: "Passenger",
        description: "Passenger left trash in the car",
        status: "Resolved",
    },
];

export default function RideHistory() {
    const userCars = [
        { id: "1", name: "Toyota Corolla" },
        { id: "2", name: "Honda Civic" },
        { id: "3", name: "Ford Mustang" },
    ];
    // const [createdRides, setCreatedRides] = useState([]);
    const [createdRides, setCreatedRides] = useState(initialCreatedRides);
    const [editingRide, setEditingRide] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newRide, setNewRide] = useState({
        from: "",
        to: "",
        date: "",
        time: "",
        price: "",
        status: "Scheduled",
        vehicle: "",
    });

    const handleCreateRide = () => {
        const createdRide = {
            ...newRide,
            id: createdRides.length + 1,
            passengers: [],
        };
        setCreatedRides([...createdRides, createdRide]);
        setIsCreateDialogOpen(false);
        setNewRide({
            from: "",
            to: "",
            date: "",
            time: "",
            price: "",
            status: "Scheduled",
            passengers: [],
        });
    };

    const ride = {
        id: "ride123",
        from: "Downtown",
        to: "Uptown",
        date: "2024-11-01",
        time: "09:00 AM",
        price: "15.00",
        carId: "car456",
        car: {
            make: "Toyota",
            model: "Camry",
            year: 2021,
            color: "Silver",
        },
        status: "scheduled",
        passengers: [
            {
                name: "Alice",
                avatar: "https://example.com/avatar/alice.jpg",
            },
            {
                name: "Bob",
                avatar: "https://example.com/avatar/bob.jpg",
            },
        ],
        driver: {
            name: "John Doe",
            avatar: "https://example.com/avatar/johndoe.jpg",
        },
    };

    const onClose = () => {
        setIsEditDialogOpen(!isEditDialogOpen);
    };
    const handleSubmit = () => {};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRide({ ...newRide, [name]: value });
    };

    const handleEditRide = (ride) => {
        // Implement edit functionality
        console.log("Edit ride:", ride);
    };

    const [selectedRide, setSelectedRide] = useState(null);
    const [complaintType, setComplaintType] = useState("");
    const [complaintDescription, setComplaintDescription] = useState("");
    const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false);
    const [complaints, setComplaints] = useState(initialComplaints);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-500";
            case "en route":
                return "bg-blue-500";
            case "cancelled":
                return "bg-red-500";
            case "scheduled":
                return "bg-orange-500";
            default:
                return "bg-gray-500";
        }
    };

    const handleOpenComplaintDialog = (ride) => {
        setSelectedRide(ride);
        setIsComplaintDialogOpen(true);
    };

    const handleCancelRide = () => {};

    const handleCarSelect = () => {};

    const handleSubmitComplaint = () => {
        const newComplaint = {
            id: complaints.length + 1,
            rideId: selectedRide.id,
            against: complaintType,
            description: complaintDescription,
            status: "Under Review",
        };
        setComplaints([...complaints, newComplaint]);
        setIsComplaintDialogOpen(false);
        setComplaintType("");
        setComplaintDescription("");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">My Rides</h1>
            <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="history">Booking History</TabsTrigger>
                    <TabsTrigger value="created">Created Rides</TabsTrigger>
                    <TabsTrigger value="complaints">Complaints</TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                    <BookingHistory />
                </TabsContent>
                <TabsContent value="created">
                    <CreatedRides />
                </TabsContent>
                <TabsContent value="complaints">
                    <Complaints />
                </TabsContent>
            </Tabs>

            {/* complaint dialog */}
            <Dialog
                open={isComplaintDialogOpen}
                onOpenChange={setIsComplaintDialogOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Submit a Complaint</DialogTitle>
                        <DialogDescription>
                            Please provide details about your complaint.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="complaintType"
                                className="text-right"
                            >
                                Type
                            </Label>
                            <Select
                                onValueChange={setComplaintType}
                                value={complaintType}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select complaint type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Driver">
                                        Driver
                                    </SelectItem>
                                    <SelectItem value="Vehicle">
                                        Vehicle
                                    </SelectItem>
                                    <SelectItem value="Passenger">
                                        Other Passenger
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="complaintDescription"
                                className="text-right"
                            >
                                Description
                            </Label>
                            <Textarea
                                id="complaintDescription"
                                value={complaintDescription}
                                onChange={(e) =>
                                    setComplaintDescription(e.target.value)
                                }
                                className="col-span-3"
                                placeholder="Describe your complaint..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmitComplaint}>
                            Submit Complaint
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


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
                                name="from"
                                value={newRide.from}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="to" className="text-right">
                                To
                            </Label>
                            <Input
                                id="to"
                                name="to"
                                value={newRide.to}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Date
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={newRide.date}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">
                                Time
                            </Label>
                            <Input
                                id="time"
                                name="time"
                                type="time"
                                value={newRide.time}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                value={newRide.price}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="car" className="text-right">
                                Car
                            </Label>
                            <Select
                                onValueChange={handleCarSelect}
                                value={newRide.carId}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a car" />
                                </SelectTrigger>
                                <SelectContent>
                                    {userCars.map((car) => (
                                        <SelectItem key={car.id} value={car.id}>
                                            {car.name}
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

            <Dialog open={false} onOpenChange={() => {}}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Ride Details</DialogTitle>
                        <DialogDescription>
                            View the details of your ride.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">
                                {ride.from} to {ride.to}
                            </h3>
                            <Badge className={getStatusColor(ride.status)}>
                                {ride.status}
                            </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 opacity-70" />
                                <span>{ride.date}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 opacity-70" />
                                <span>{ride.time}</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 opacity-70" />
                            <span>
                                {ride.from} → {ride.to}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 opacity-70" />
                            <span>Driver: {ride.driver.name}</span>
                        </div>
                        <div className="flex items-center">
                            <CarFront className="mr-2 h-4 w-4 opacity-70" />
                            <span>Vehicle: {ride.car.name}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold mr-2">Price:</span>
                            <span>{ride.price}</span>
                        </div>
                        <div>
                            <Label className="text-base">Passengers:</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {ride.passengers.map((passenger) => (
                                    <div
                                        key={passenger.id}
                                        className="flex items-center bg-secondary rounded-full pl-1 pr-3 py-1"
                                    >
                                        <Avatar className="h-6 w-6 mr-2">
                                            <AvatarImage
                                                src={`https://api.dicebear.com/6.x/initials/svg?seed=${passenger.name}`}
                                                alt={passenger.name}
                                            />
                                            <AvatarFallback>
                                                {passenger.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">
                                            {passenger.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={onClose}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditDialogOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Ride</DialogTitle>
                        <DialogDescription>
                            Make changes to your ride here. Click save when
                            you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="from" className="text-right">
                                    From
                                </Label>
                                <Input
                                    id="from"
                                    name="from"
                                    value="{editedRide.from}"
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="to" className="text-right">
                                    To
                                </Label>
                                <Input
                                    id="to"
                                    name="to"
                                    value="{editedRide.to}"
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date" className="text-right">
                                    Date
                                </Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value="{editedRide.date}"
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="time" className="text-right">
                                    Time
                                </Label>
                                <Input
                                    id="time"
                                    name="time"
                                    type="time"
                                    value="{editedRide.time}"
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">
                                    Price
                                </Label>
                                <Input
                                    id="price"
                                    name="price"
                                    value="{editedRide.price}"
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="car" className="text-right">
                                    Car
                                </Label>
                                <Select
                                    value="{editedRide.carId}"
                                    onValueChange={(value) =>
                                        handleSelectChange("carId", value)
                                    }
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a car" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[{ id: "1", name: "Corolla" }].map(
                                            (car) => (
                                                <SelectItem
                                                    key={car.id}
                                                    value={car.id}
                                                >
                                                    {car.name}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">
                                    Status
                                </Label>
                                <Select
                                    value="{editedRide.status}"
                                    onValueChange={(value) =>
                                        handleSelectChange("status", value)
                                    }
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Scheduled">
                                            Scheduled
                                        </SelectItem>
                                        <SelectItem value="In Progress">
                                            In Progress
                                        </SelectItem>
                                        <SelectItem value="Completed">
                                            Completed
                                        </SelectItem>
                                        <SelectItem value="Cancelled">
                                            Cancelled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
