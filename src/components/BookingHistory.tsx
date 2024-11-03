import React, { useEffect } from "react";

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
    AlertTriangle,
} from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

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
        status: "Scheduled",
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
    {
        id: 4,
        from: "City ",
        to: "Beach",
        date: "2023-07-21",
        time: "14:30",
        price: "$202",
        status: "Scheduled",
        passengers: [
            { id: 3, name: "Charlie Brown", avatar: "CB" },
            { id: 4, name: "Diana Prince", avatar: "DP" },
            { id: 5, name: "Ethan Hunt", avatar: "EH" },
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

const BookingHistory = () => {
    const { toast } = useToast();
    const [createdRides, setCreatedRides] = useState(initialCreatedRides);
    const [editingRide, setEditingRide] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
    const [bookedRides, setBookedRides] = useState([]);
    const [newRide, setNewRide] = useState({
        from: "",
        to: "",
        date: "",
        time: "",
        price: "",
        status: "Scheduled",
        vehicle: "",
    });

    useEffect(() => {
        const fetchBookedRides = async () => {
            const response = await axios.get("/api/get-bookings");
            console.log(response);
            setBookedRides(response.data.data);
        };
        fetchBookedRides();
    }, []);

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

    const handleOpenCancelDialog = (booking) => {
        setSelectedBooking(booking);
        console.log(booking);
        setIsCancelDialogOpen(true);
    };

    const handleCancelRide = async () => {
        console.log(selectedBooking);

        try {
            const response = await axios.post("/api/cancel-booking", {
                rideID: selectedBooking!.ride.id,
            });
            toast({ title: "Booking cancelled successfully" });
            setBookedRides((bookedRides) =>
                bookedRides.filter(
                    (bookedRide) => bookedRide.id !== selectedBooking!.id
                )
            );
            setSelectedBooking(null);
        } catch (error) {
            toast({ title: "Failed to cancel your booking. Please try again" });
        } finally {
            setIsCancelDialogOpen(false);
        }
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

    const [selectedBooking, setSelectedBooking] = useState(null);
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
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Ride Booking History</CardTitle>
                    <CardDescription>
                        View all your past and upcoming rides
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[400px] w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>From</TableHead>
                                    <TableHead>To</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Fare</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bookedRides.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell>
                                            {booking.ride.route.from}
                                        </TableCell>
                                        <TableCell>
                                            {booking.ride.route.to}
                                        </TableCell>
                                        <TableCell>
                                            {booking.bookedAt.split("T")[0]}
                                        </TableCell>
                                        <TableCell>
                                            {booking.ride.fare}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={getStatusColor(
                                                    booking.ride.status
                                                )}
                                            >
                                                {booking.ride.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {/* <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleOpenComplaintDialog(
                                                        ride
                                                    )
                                                }
                                            >
                                                <AlertCircle className="mr-2 h-4 w-4" />
                                                Complain
                                            </Button> */}
                                            {booking.ride.status ===
                                            "SCHEDULED" ? (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleOpenCancelDialog(
                                                            booking
                                                        )
                                                    }
                                                >
                                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                                    Cancel
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleOpenComplaintDialog(
                                                            booking
                                                        )
                                                    }
                                                >
                                                    <AlertCircle className="mr-2 h-4 w-4" />
                                                    Complain
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
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
            <AlertDialog
                open={isCancelDialogOpen}
                onOpenChange={setIsCancelDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to cancel this ride?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. You may be charged a
                            cancellation fee.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            No, keep my booking
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancelRide}>
                            Yes, cancel the ride
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default BookingHistory;
