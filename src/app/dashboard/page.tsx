// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { CarFront, MapPin, Search, User } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import axios from "axios";

// export default function Dashboard() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [rides, setRides] = useState([]);
//     const [selectedRide, setSelectedRide] = useState(null);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);

//     const { toast } = useToast();

//     const handleBookRide = (ride) => {
//         setSelectedRide(ride);
//         setIsDialogOpen(true);
//     };

//     const confirmBooking = async () => {
//         console.log(selectedRide.rideID);
//         const response = await axios.post("/api/book-ride", {
//             rideID: selectedRide.ride.id,
//         });
//         console.log(response);
//         if (response.status === 200) {
//             setRides((rides) =>
//                 rides.filter((ride) => ride.ride.id !== selectedRide.ride.id)
//             );
//             toast({
//                 title: "Ride Booked!",
//                 description: `You've successfully booked a ride with ${selectedRide?.ride.driver} from ${selectedRide?.from} to ${selectedRide.to}.`,
//             });
//         } else {
//             toast({
//                 title: "Couldn't book your ride",
//                 description: "Please try again",
//             });
//         }
//         setIsDialogOpen(false);
//     };

//     useEffect(() => {
//         const fetchAvailables = async () => {
//             const response = await axios.get(
//                 `/api/get-public-rides?search=${searchTerm}&limit=10`
//             );
//             console.log(response);
//             setRides(response.data.data);
//         };
//         fetchAvailables();
//     }, [searchTerm]);

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-6">Book a Ride</h1>
//             <div className="mb-6">
//                 <div className="relative">
//                     <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                     <Input
//                         placeholder="Search rides..."
//                         className="pl-8"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//             </div>
//             {rides.length > 0 ? (
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                     {rides.map((ride) => (
//                         <Card key={ride.id}>
//                             <CardHeader>
//                                 <CardTitle className="flex justify-between items-center">
//                                     <span>
//                                         {ride.from} to {ride.to}
//                                     </span>
//                                     <Badge className="bg-green-500">
//                                         {"AVAILABLE"}
//                                     </Badge>
//                                 </CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="flex items-center mb-4">
//                                     <Avatar className="h-9 w-9">
//                                         <AvatarImage
//                                             src={`https://api.dicebear.com/9.x/notionists/svg?seed=${ride.ride.driver.username}`}
//                                             alt={ride.ride.driver.username}
//                                         />
//                                         <AvatarFallback>
//                                             <User className="h-4 w-4" />
//                                         </AvatarFallback>
//                                     </Avatar>
//                                     <div className="ml-3">
//                                         <p className="text-sm font-medium">
//                                             {ride.ride.driver.username}
//                                         </p>
//                                         <p className="text-sm text-muted-foreground">
//                                             {
//                                                 new Date(ride.ride.scheduledFor)
//                                                     .toISOString()
//                                                     .split("T")[0]
//                                             }{" "}
//                                             at{" "}
//                                             {
//                                                 new Date(ride.ride.scheduledFor)
//                                                     .toISOString()
//                                                     .split("T")[1]
//                                                     .split(".")[0]
//                                             }
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     {/* <div className="flex gap-2 items-center text-muted-foreground">
//                                         <MapPin className="h-4 w-4 mr-1" />
//                                         <span className="text-sm">
//                                             {ride.from} → {ride.to}
//                                         </span>
//                                         <CarFront className="h-4 w-4 mr-1" />
//                                         <span className="text-sm">
//                                             {`${ride.ride.vehicle.make} ${ride.ride.vehicle.model}`}
//                                         </span>
//                                     </div> */}
//                                     <div className="flex flex-col gap-2 items-start text-muted-foreground">
//                                         <div className="flex items-center">
//                                             <MapPin className="h-4 w-4 mr-1" />
//                                             <span className="text-sm">
//                                                 {ride.from} → {ride.to}
//                                             </span>
//                                         </div>
//                                         <div className="flex items-center">
//                                             <CarFront className="h-4 w-4 mr-1" />
//                                             <span className="text-sm">
//                                                 {`${ride.ride.vehicle.make} ${ride.ride.vehicle.model}`}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     <p className="text-lg font-semibold">
//                                         ${ride.ride.fare}
//                                     </p>
//                                 </div>
//                                 {ride.ride.status === "SCHEDULED" && (
//                                     <Button
//                                         className="w-full mt-4"
//                                         onClick={() => handleBookRide(ride)}
//                                     >
//                                         Book Now
//                                     </Button>
//                                 )}
//                             </CardContent>
//                         </Card>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
//                     <h2 className="text-lg font-semibold text-gray-800">
//                         No rides are available at the moment
//                     </h2>
//                     <p className="text-gray-500 mt-2">
//                         Check back soon or try adjusting your search filters.
//                     </p>
//                     <Button onClick={() => {}}>Refresh</Button>
//                 </div>
//             )}

//             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Confirm Booking</DialogTitle>
//                         <DialogDescription>
//                             Are you sure you want to book this ride?
//                         </DialogDescription>
//                     </DialogHeader>
//                     {selectedRide && (
//                         <div className="py-4">
//                             <p>
//                                 <strong>Driver:</strong>{" "}
//                                 {selectedRide.ride.driverID}
//                             </p>
//                             <p>
//                                 <strong>From:</strong> {selectedRide.from}
//                             </p>
//                             <p>
//                                 <strong>To:</strong> {selectedRide.to}
//                             </p>
//                             <p>
//                                 <strong>Vehicle:</strong>{" "}
//                                 {selectedRide.ride.vehicleID}
//                             </p>
//                             <p>
//                                 <strong>Date:</strong>{" "}
//                                 {
//                                     new Date(selectedRide.ride.scheduledFor)
//                                         .toISOString()
//                                         .split("T")[0]
//                                 }
//                             </p>
//                             <p>
//                                 <strong>Time:</strong>{" "}
//                                 {
//                                     new Date(selectedRide.ride.scheduledFor)
//                                         .toISOString()
//                                         .split("T")[1]
//                                         .split(".")[0]
//                                 }
//                             </p>
//                             <p>
//                                 <strong>Price:</strong> $
//                                 {selectedRide.ride.fare}
//                             </p>
//                         </div>
//                     )}
//                     <DialogFooter>
//                         <Button
//                             variant="outline"
//                             onClick={() => setIsDialogOpen(false)}
//                         >
//                             Cancel
//                         </Button>
//                         <Button onClick={confirmBooking}>
//                             Confirm Booking
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import {
    Calendar,
    Clock,
    MapPin,
    Car,
    DollarSign,
    Star,
    Search,
    User2,
    CalendarClock,
} from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

const availableRides = [
    {
        id: 1,
        driver: {
            name: "John Doe",
            photo: "/placeholder.svg?height=40&width=40",
            rating: 4.8,
        },
        vehicle: {
            make: "Toyota",
            model: "Camry",
            year: 2020,
            color: "Silver",
        },
        departure: {
            date: "2023-05-25",
            time: "14:00",
            location: "Central Park",
        },
        arrival: { location: "JFK Airport" },
        price: 35,
        seats: { total: 4, available: 3, premium: [2, 3] },
    },
    {
        id: 2,
        driver: {
            name: "Jane Smith",
            photo: "/placeholder.svg?height=40&width=40",
            rating: 4.9,
        },
        vehicle: { make: "Honda", model: "Civic", year: 2021, color: "Blue" },
        departure: {
            date: "2023-05-25",
            time: "15:30",
            location: "Times Square",
        },
        arrival: { location: "LaGuardia Airport" },
        price: 30,
        seats: { total: 4, available: 4, premium: [3, 4] },
    },
    // Add more ride options here...
];

export default function Dashboard() {
    const [selectedRide, setSelectedRide] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [rides, setRides] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchAvailables = async () => {
            const response = await axios.get(
                `/api/get-public-rides?search=${searchTerm}&limit=10`
            );
            console.log(response);
            setRides(response.data.data);
        };
        fetchAvailables();
    }, [setRides, searchTerm]);

    const handleSeatSelection = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(
                selectedSeats.filter((seat) => seat !== seatNumber)
            );
        } else if (selectedSeats.length < selectedRide.seats.available) {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Ride Booking & Scheduling
            </h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Filter Available Rides</CardTitle>
                    <CardDescription>
                        Customize your search for the perfect ride
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <div className="relative">
                                <Input id="date" type="date" className="pl-8" />
                                <Calendar
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    size={16}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="time">Time</Label>
                            <div className="relative">
                                <Input id="time" type="time" className="pl-8" />
                                <Clock
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    size={16}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <div className="relative">
                                <Input
                                    id="location"
                                    placeholder="Enter pickup location"
                                    className="pl-8"
                                />
                                <MapPin
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    size={16}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="vehicle">Vehicle Preference</Label>
                            <Select>
                                <SelectTrigger id="vehicle">
                                    <SelectValue placeholder="Any" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Any</SelectItem>
                                    <SelectItem value="sedan">Sedan</SelectItem>
                                    <SelectItem value="suv">SUV</SelectItem>
                                    <SelectItem value="luxury">
                                        Luxury
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>
                    <div className="w-full">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search rides..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button className="mt-4 w-full">
                        <Search className="w-4 h-4 mr-2" />
                        Search Rides
                    </Button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rides.map((ride) => (
                    <Card
                        key={ride.rideID}
                        className="hover:shadow-lg transition-shadow"
                    >
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage
                                            src={`https://api.dicebear.com/9.x/notionists/svg?seed=${ride.ride.driver.username}`}
                                            alt={ride.ride.driver.username}
                                        />
                                        <AvatarFallback>
                                            <User2 />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle>
                                            {ride.ride.driver.username}
                                        </CardTitle>
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="ml-1 text-sm">
                                                {4.85}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Badge variant="secondary">
                                    {ride.ride.vehicle.make}{" "}
                                    {ride.ride.vehicle.model}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Journey row with map pin and route visualization */}

                                <div className="w-full flex justify-center">
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center justify-between w-[250px]">
                                            <div className="flex items-center space-x-2 min-w-0">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                <span className="text-sm truncate">
                                                    {ride.from}
                                                </span>
                                            </div>
                                            <div className="mx-4 w-16 flex-shrink-0">
                                                <div className="h-0.5 w-full bg-gray-300"></div>
                                            </div>
                                            <div className="flex items-center space-x-2 min-w-0">
                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                <span className="text-sm truncate">
                                                    {ride.to}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        <CalendarClock className="h-4 w-4" />
                                    </span>
                                    <span>
                                        {
                                            new Date(ride.ride.scheduledFor)
                                                .toISOString()
                                                .split("T")[0]
                                        }{" "}
                                        at{" "}
                                        {
                                            new Date(ride.ride.scheduledFor)
                                                .toISOString()
                                                .split("T")[1]
                                                .split(".")[0]
                                        }
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        <DollarSign className="h-4 w-4" />
                                    </span>
                                    <span className="font-semibold">
                                        ${ride.ride.fare}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Available Seats:
                                    </span>
                                    <span>
                                        {1} / {ride.ride.vehicle.seats}
                                    </span>
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="w-full mt-4"
                                        onClick={() => setSelectedRide(ride)}
                                    >
                                        Book Now
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Select Your Seat(s)
                                        </DialogTitle>
                                        <DialogDescription>
                                            Click on the seats you want to book.
                                            Premium seats are highlighted.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-2 gap-4 py-4">
                                        <div className="col-span-2 bg-gray-100 p-4 rounded-lg">
                                            <div className="w-full h-40 bg-gray-300 rounded-t-lg flex items-center justify-center">
                                                <Car className="w-16 h-16 text-gray-500" />
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-sm text-gray-500 mb-2">
                                                Selected Seats:{" "}
                                                {selectedSeats.join(", ")}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-4">
                                                Total Price: $
                                                {selectedSeats.length *
                                                    ride.ride.fare}
                                            </p>
                                            <Button
                                                className="w-full"
                                                disabled={
                                                    selectedSeats.length === 0
                                                }
                                            >
                                                Confirm Booking
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
