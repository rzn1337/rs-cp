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

const CreatedRides = () => {
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
    <Card>
                        <CardHeader>
                            <CardTitle>Created Rides</CardTitle>
                            <CardDescription>
                                Manage the rides you've created
                            </CardDescription>
                            <Button onClick={() => setIsCreateDialogOpen(true)}>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Create New Ride
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {createdRides.map((ride) => (
                                    <Card key={ride.id}>
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center">
                                                <span>
                                                    {ride.from} to {ride.to}
                                                </span>
                                                <Badge
                                                    className={getStatusColor(
                                                        ride.status
                                                    )}
                                                >
                                                    {ride.status}
                                                </Badge>
                                            </CardTitle>
                                            <CardDescription>
                                                <div className="flex items-center">
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    {ride.date}
                                                    <Clock className="ml-4 mr-2 h-4 w-4" />
                                                    {ride.time}
                                                </div>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center text-muted-foreground">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    <span className="text-sm">
                                                        {ride.from} → {ride.to}
                                                    </span>
                                                </div>
                                                <p className="text-lg font-semibold">
                                                    {ride.price}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">
                                                    Passengers:
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {ride.passengers.map(
                                                        (passenger) => (
                                                            <div
                                                                key={
                                                                    passenger.id
                                                                }
                                                                className="relative"
                                                            >
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage
                                                                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${passenger.name}`}
                                                                        alt={
                                                                            passenger.name
                                                                        }
                                                                    />
                                                                    <AvatarFallback>
                                                                        {
                                                                            passenger.avatar
                                                                        }
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                {ride.status ===
                                                                    "Scheduled" && (
                                                                    <Button
                                                                        variant="destructive"
                                                                        size="icon"
                                                                        className="h-4 w-4 rounded-full absolute -top-1 -right-1"
                                                                        onClick={() =>
                                                                            handleRemovePassenger(
                                                                                ride.id,
                                                                                passenger.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <X className="h-3 w-3" />
                                                                        <span className="sr-only">
                                                                            Remove
                                                                            passenger
                                                                        </span>
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-4">
                                                {ride.status ===
                                                    "Scheduled" && (
                                                    <>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => {
                                                                setIsEditDialogOpen(
                                                                    !isEditDialogOpen
                                                                );
                                                            }}
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit Ride
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger
                                                                asChild
                                                            >
                                                                <Button variant="destructive">
                                                                    Cancel Ride
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        Are you
                                                                        sure?
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This
                                                                        action
                                                                        cannot
                                                                        be
                                                                        undone.
                                                                        This
                                                                        will
                                                                        permanently
                                                                        cancel
                                                                        the
                                                                        ride.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>
                                                                        Cancel
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() =>
                                                                            handleCancelRide(
                                                                                ride.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Confirm
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </>
                                                )}
                                                {ride.status !==
                                                    "Scheduled" && (
                                                    <Button
                                                        variant="secondary"
                                                        className="w-full"
                                                    >
                                                        View Details
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
  )
}

export default CreatedRides