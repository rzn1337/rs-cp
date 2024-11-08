// "use client";

// import React, { useState, useEffect } from "react";
// import { format } from "date-fns";
// import {
//     Search,
//     Calendar,
//     Clock,
//     MapPin,
//     Car,
//     Star,
//     User2,
//     ArrowRight,
//     CalendarClock,
//     DollarSign,
// } from "lucide-react";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
//     CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//     DialogFooter,
// } from "@/components/ui/dialog";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import SideBar from "@/components/RideShareSidebar";

// const RideCard = ({ ride, onBookRide }) => (
//     <Card className="hover:bg-gray-50 transition-colors">
//         <CardContent className="p-4">
//             <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center space-x-3">
//                     <Avatar>
//                         <AvatarImage
//                             src={`https://api.dicebear.com/9.x/notionists/svg?seed=${ride.ride.driver.username}`}
//                             alt={ride.ride.driver.username}
//                         />
//                         <AvatarFallback>
//                             <User2 className="h-4 w-4" />
//                         </AvatarFallback>
//                     </Avatar>
//                     <div>
//                         <h3 className="font-medium">
//                             {ride.ride.driver.username}
//                         </h3>
//                         <div className="flex items-center">
//                             <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//                             <span className="text-sm text-gray-600 ml-1">
//                                 4.85
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//                 <Badge variant="secondary" className="ml-2">
//                     {ride.ride.vehicle.make} {ride.ride.vehicle.model}
//                 </Badge>
//             </div>

//             <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2 text-sm text-gray-600">
//                         <MapPin className="h-4 w-4" />
//                         <div className="flex items-center">
//                             <span className="truncate max-w-[100px]">
//                                 {ride.from}
//                             </span>
//                             <ArrowRight className="h-4 w-4 mx-2" />
//                             <span className="truncate max-w-[100px]">
//                                 {ride.to}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center text-gray-600">
//                         <CalendarClock className="h-4 w-4 mr-2" />
//                         <span>
//                             {format(
//                                 new Date(ride.ride.scheduledFor),
//                                 "MMM d, yyyy"
//                             )}{" "}
//                             at{" "}
//                             {format(new Date(ride.ride.scheduledFor), "HH:mm")}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center text-gray-600">
//                         <Car className="h-4 w-4 mr-2" />
//                         <span>{ride.ride.vehicle.seats} seats available</span>
//                     </div>
//                     <div className="flex items-center font-medium">
//                         <DollarSign className="h-4 w-4" />
//                         {ride.ride.fare}
//                     </div>
//                 </div>

//                 <Button
//                     className="w-full mt-2"
//                     onClick={() => onBookRide(ride)}
//                 >
//                     Book Now
//                 </Button>
//             </div>
//         </CardContent>
//     </Card>
// );

// export default function Dashboard() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedRide, setSelectedRide] = useState(null);
//     const [rides, setRides] = useState([]);

//     const handleBookRide = (ride) => {
//         setSelectedRide(ride);
//     };

//     useEffect(() => {
//         // Simulated API call - replace with actual API call
//         const fetchRides = async () => {
//             try {
//                 const response = await fetch(
//                     `/api/get-public-rides?search=${searchTerm}&limit=10`
//                 );
//                 const data = await response.json();
//                 setRides(data.data);
//             } catch (error) {
//                 console.error("Error fetching rides:", error);
//             }
//         };

//         fetchRides();
//     }, [searchTerm]);

//     return (
//         <div className="container mx-auto px-4 py-6">
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold mb-2">Book a Ride</h1>
//                 <p className="text-gray-600">
//                     Find and book available rides in your area
//                 </p>
//             </div>

//             <Card className="mb-8">
//                 <CardHeader>
//                     <CardTitle>Search Rides</CardTitle>
//                     <CardDescription>
//                         Enter your travel details to find available rides
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//                         <div className="relative">
//                             <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                             <Input type="date" className="pl-8" />
//                         </div>
//                         <div className="relative">
//                             <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                             <Input type="time" className="pl-8" />
//                         </div>
//                         <div className="relative">
//                             <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                             <Input
//                                 placeholder="Enter destination"
//                                 className="pl-8"
//                             />
//                         </div>
//                     </div>
//                     <div className="relative">
//                         <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                         <Input
//                             placeholder="Search by location or driver name"
//                             className="pl-8"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                 </CardContent>
//             </Card>

//             <ScrollArea className="h-[calc(100vh-400px)]">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {rides.map((ride) => (
//                         <RideCard
//                             key={ride.ride.id}
//                             ride={ride}
//                             onBookRide={handleBookRide}
//                         />
//                     ))}
//                 </div>
//             </ScrollArea>

//             <Dialog
//                 open={!!selectedRide}
//                 onOpenChange={() => setSelectedRide(null)}
//             >
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Confirm Booking</DialogTitle>
//                         <DialogDescription>
//                             Review and confirm your ride details
//                         </DialogDescription>
//                     </DialogHeader>
//                     {selectedRide && (
//                         <div className="space-y-4">
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <p className="text-sm font-medium">From</p>
//                                     <p className="text-sm text-gray-600">
//                                         {selectedRide.from}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-medium">To</p>
//                                     <p className="text-sm text-gray-600">
//                                         {selectedRide.to}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-medium">
//                                         Date & Time
//                                     </p>
//                                     <p className="text-sm text-gray-600">
//                                         {format(
//                                             new Date(
//                                                 selectedRide.ride.scheduledFor
//                                             ),
//                                             "PPP p"
//                                         )}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-medium">Price</p>
//                                     <p className="text-sm text-gray-600">
//                                         ${selectedRide.ride.fare}
//                                     </p>
//                                 </div>
//                             </div>
//                             <DialogFooter>
//                                 <Button
//                                     variant="outline"
//                                     onClick={() => setSelectedRide(null)}
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     onClick={() => {
//                                         // Handle booking confirmation
//                                         alert("Booking confirmed!");
//                                         setSelectedRide(null);
//                                     }}
//                                 >
//                                     Confirm Booking
//                                 </Button>
//                             </DialogFooter>
//                         </div>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }




























// "use client";

// import React, { useState, useEffect } from "react";
// import { format } from "date-fns";
// import {
//     Search,
//     Calendar,
//     Clock,
//     MapPin,
//     Car,
//     Star,
//     User2,
//     ArrowRight,
//     CalendarClock,
//     DollarSign,
//     Check,
//     AlertCircle,
// } from "lucide-react";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
//     CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//     DialogFooter,
// } from "@/components/ui/dialog";
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { cn } from "@/lib/utils";

// // Seat Map Component
// const SeatMap = ({ vehicle, onSeatSelect, selectedSeat }) => {
//     const seatConfigs = {
//         sedan: {
//             rows: 2,
//             seatsPerRow: 2,
//             premiumSeats: ['1A', '1B'],
//             layout: [
//                 ['1A', null, '1B'],
//                 ['2A', null, '2B']
//             ]
//         },
//         suv: {
//             rows: 3,
//             seatsPerRow: 2,
//             premiumSeats: ['1A', '1B', '2A', '2B'],
//             layout: [
//                 ['1A', null, '1B'],
//                 ['2A', null, '2B'],
//                 ['3A', '3B', '3C']
//             ]
//         },
//         van: {
//             rows: 4,
//             seatsPerRow: 3,
//             premiumSeats: ['1A', '1B', '1C'],
//             layout: [
//                 ['1A', '1B', '1C'],
//                 ['2A', '2B', '2C'],
//                 ['3A', '3B', '3C'],
//                 ['4A', '4B', '4C']
//             ]
//         }
//     };

//     const config = seatConfigs[vehicle.type?.toLowerCase()] || seatConfigs.sedan;

//     const isSeatTaken = (seatId) => {
//         return vehicle.takenSeats?.includes(seatId);
//     };

//     const isPremiumSeat = (seatId) => {
//         return config.premiumSeats.includes(seatId);
//     };

//     return (
//         <div className="w-full max-w-xs mx-auto">
//             <div className="mb-4 flex items-center justify-center space-x-4 text-sm">
//                 <div className="flex items-center">
//                     <div className="w-4 h-4 rounded-sm border border-gray-300 bg-white mr-2" />
//                     <span>Available</span>
//                 </div>
//                 <div className="flex items-center">
//                     <div className="w-4 h-4 rounded-sm border border-gray-300 bg-yellow-100 mr-2" />
//                     <span>Premium</span>
//                 </div>
//                 <div className="flex items-center">
//                     <div className="w-4 h-4 rounded-sm border border-gray-300 bg-gray-200 mr-2" />
//                     <span>Taken</span>
//                 </div>
//             </div>

//             <div className="relative bg-white p-4 rounded-lg border">
//                 <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
//                     Front
//                 </div>

//                 <div className="space-y-4">
//                     {config.layout.map((row, rowIndex) => (
//                         <div key={rowIndex} className="flex justify-center space-x-4">
//                             {row.map((seatId, seatIndex) => {
//                                 if (seatId === null) {
//                                     return <div key={`space-${seatIndex}`} className="w-8 h-8" />;
//                                 }
                                
//                                 const taken = isSeatTaken(seatId);
//                                 const premium = isPremiumSeat(seatId);
//                                 const selected = selectedSeat === seatId;

//                                 return (
//                                     <Tooltip key={seatId}>
//                                         <TooltipTrigger>
//                                             <button
//                                                 className={cn(
//                                                     "w-8 h-8 rounded-sm border flex items-center justify-center transition-colors",
//                                                     taken && "bg-gray-200 cursor-not-allowed",
//                                                     premium && !taken && "bg-yellow-100 hover:bg-yellow-200",
//                                                     !premium && !taken && "bg-white hover:bg-gray-100",
//                                                     selected && "ring-2 ring-blue-500"
//                                                 )}
//                                                 onClick={() => !taken && onSeatSelect(seatId)}
//                                                 disabled={taken}
//                                             >
//                                                 {selected && <Check className="h-4 w-4 text-blue-500" />}
//                                             </button>
//                                         </TooltipTrigger>
//                                         <TooltipContent>
//                                             <p>
//                                                 Seat {seatId}
//                                                 {premium && " (Premium)"}
//                                                 {taken && " - Taken"}
//                                             </p>
//                                         </TooltipContent>
//                                     </Tooltip>
//                                 );
//                             })}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Ride Card Component
// const RideCard = ({ ride, onBookRide }) => (
//     <Card className="hover:bg-gray-50 transition-colors">
//         <CardContent className="p-4">
//             <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center space-x-3">
//                     <Avatar>
//                         <AvatarImage
//                             src={`https://api.dicebear.com/9.x/notionists/svg?seed=${ride.ride.driver.username}`}
//                             alt={ride.ride.driver.username}
//                         />
//                         <AvatarFallback>
//                             <User2 className="h-4 w-4" />
//                         </AvatarFallback>
//                     </Avatar>
//                     <div>
//                         <h3 className="font-medium">
//                             {ride.ride.driver.username}
//                         </h3>
//                         <div className="flex items-center">
//                             <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//                             <span className="text-sm text-gray-600 ml-1">
//                                 4.85
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//                 <Badge variant="secondary" className="ml-2">
//                     {ride.ride.vehicle.make} {ride.ride.vehicle.model}
//                 </Badge>
//             </div>

//             <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2 text-sm text-gray-600">
//                         <MapPin className="h-4 w-4" />
//                         <div className="flex items-center">
//                             <span className="truncate max-w-[100px]">
//                                 {ride.from}
//                             </span>
//                             <ArrowRight className="h-4 w-4 mx-2" />
//                             <span className="truncate max-w-[100px]">
//                                 {ride.to}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center text-gray-600">
//                         <CalendarClock className="h-4 w-4 mr-2" />
//                         <span>
//                             {format(
//                                 new Date(ride.ride.scheduledFor),
//                                 "MMM d, yyyy"
//                             )}{" "}
//                             at{" "}
//                             {format(new Date(ride.ride.scheduledFor), "HH:mm")}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center text-gray-600">
//                         <Car className="h-4 w-4 mr-2" />
//                         <span>{ride.ride.vehicle.seats} seats available</span>
//                     </div>
//                     <div className="flex items-center font-medium">
//                         <DollarSign className="h-4 w-4" />
//                         {ride.ride.fare}
//                     </div>
//                 </div>

//                 <Button
//                     className="w-full mt-2"
//                     onClick={() => onBookRide(ride)}
//                 >
//                     Book Now
//                 </Button>
//             </div>
//         </CardContent>
//     </Card>
// );

// // Main Dashboard Component
// export default function Dashboard() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedRide, setSelectedRide] = useState(null);
//     const [selectedSeat, setSelectedSeat] = useState(null);
//     const [rides, setRides] = useState([]);

//     const handleBookRide = (ride) => {
//         setSelectedRide(ride);
//         setSelectedSeat(null); // Reset seat selection when opening dialog
//     };

//     const isPremiumSeat = (seatId) => {
//         const premiumSeats = {
//             sedan: ['1A', '1B'],
//             suv: ['1A', '1B', '2A', '2B'],
//             van: ['1A', '1B', '1C']
//         };
//         const vehicleType = selectedRide?.ride.vehicle.make?.toLowerCase() || 'sedan';
//         return premiumSeats[vehicleType]?.includes(seatId);
//     };

//     const getCurrentFare = () => {
//         if (!selectedRide || !selectedSeat) return parseFloat(selectedRide?.ride.fare || 0);
//         const baseFare = parseFloat(selectedRide.ride.fare);
//         return isPremiumSeat(selectedSeat) ? baseFare * 1.2 : baseFare;
//     };

//     const handleConfirmBooking = () => {
//         if (!selectedSeat) {
//             alert("Please select a seat");
//             return;
//         }

//         // Here you would typically make an API call to confirm the booking
//         alert(`Booking confirmed!\nSeat: ${selectedSeat}\nFare: $${getCurrentFare().toFixed(2)}`);
//         setSelectedRide(null);
//         setSelectedSeat(null);
//     };

//     useEffect(() => {
//         // Simulated API call - replace with actual API call
//         const fetchRides = async () => {
//             try {
//                 const response = await fetch(
//                     `/api/get-public-rides?search=${searchTerm}&limit=10`
//                 );
//                 const data = await response.json();
//                 setRides(data.data);
//             } catch (error) {
//                 console.error("Error fetching rides:", error);
//             }
//         };

//         fetchRides();
//     }, [searchTerm]);

//     return (
//         <div className="container mx-auto px-4 py-6">
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold mb-2">Book a Ride</h1>
//                 <p className="text-gray-600">
//                     Find and book available rides in your area
//                 </p>
//             </div>

//             <Card className="mb-8">
//                 <CardHeader>
//                     <CardTitle>Search Rides</CardTitle>
//                     <CardDescription>
//                         Enter your travel details to find available rides
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//                         <div className="relative">
//                             <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                             <Input type="date" className="pl-8" />
//                         </div>
//                         <div className="relative">
//                             <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                             <Input type="time" className="pl-8" />
//                         </div>
//                         <div className="relative">
//                             <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                             <Input
//                                 placeholder="Enter destination"
//                                 className="pl-8"
//                             />
//                         </div>
//                     </div>
//                     <div className="relative">
//                         <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                         <Input
//                             placeholder="Search by location or driver name"
//                             className="pl-8"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                 </CardContent>
//             </Card>

//             <ScrollArea className="h-[calc(100vh-400px)]">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {rides.map((ride) => (
//                         <RideCard
//                             key={ride.ride.id}
//                             ride={ride}
//                             onBookRide={handleBookRide}
//                         />
//                     ))}
//                 </div>
//             </ScrollArea>

//             <Dialog
//                 open={!!selectedRide}
//                 onOpenChange={(open) => {
//                     if (!open) {
//                         setSelectedRide(null);
//                         setSelectedSeat(null);
//                     }
//                 }}
//             >
//                 <DialogContent className="sm:max-w-[500px]">
//                     <DialogHeader>
//                         <DialogTitle>Select Your Seat</DialogTitle>
//                         <DialogDescription>
//                             Choose your preferred seat. Premium seats are marked in yellow and cost 20% extra.
//                         </DialogDescription>
//                     </DialogHeader>
//                     {selectedRide && (
//                         <div className="space-y-6">
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <p className="text-sm font-medium">From</p>
//                                     <p className="text-sm text-gray-600">{selectedRide.from}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-medium">To</p>
//                                     <p className="text-sm text-gray-600">{selectedRide.to}</p>
//                                 </div>
//                             </div>

//                             <SeatMap
//                                 vehicle={{
//                                     type: selectedRide.ride.vehicle.make,
//                                     takenSeats: selectedRide.ride.takenSeats || []
//                                 }}
//                                 selectedSeat={selectedSeat}
//                                 onSeatSelect={setSelectedSeat}
//                             />

//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <p className="text-sm font-medium">Selected Seat</p>
//                                     <p className="text-sm text-gray-600">
//                                         {selectedSeat ? 
//                                             `${selectedSeat} ${isPremiumSeat(selectedSeat) ? '(Premium)' : ''}` 
//                                             : 'None selected'}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-medium">Total Fare</p>
//                                     <p className="text-sm font-semibold">
//                                         ${getCurrentFare().toFixed(2)}
//                                         {isPremiumSeat(selectedSeat) && (
//                                             <span className="text-xs text-yellow-600 ml-1">(Premium)</span>
//                                         )}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div>
//                                 <p className="text-sm font-medium">Date & Time</p>
//                                 <p className="text-sm text-gray-600">
//                                     {format(
//                                         new Date(selectedRide.ride.scheduledFor),
//                                         "PPP p"
//                                     )}
//                                 </p>
//                             </div>

//                             <DialogFooter>
//                                 <Button
//                                     variant="outline"
//                                     onClick={() => {
//                                         setSelectedRide(null);
//                                         setSelectedSeat(null);
//                                     }}
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     onClick={handleConfirmBooking}
//                                     disabled={!selectedSeat}
//                                 >
//                                     {selectedSeat 
//                                         ? `Confirm Booking ($${getCurrentFare().toFixed(2)})` 
//                                         : 'Select a seat to continue'}
//                                 </Button>
//                             </DialogFooter>
//                         </div>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }






'use client'

import React, { useState, useEffect } from "react"
import { format } from "date-fns"
import { Search, Calendar, Clock, MapPin, Car, Star, User2, ArrowRight, CalendarClock, DollarSign, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// const SeatMap = ({ vehicle, onSeatSelect, selectedSeat }) => {
//   const seatConfigs = {
//     sedan: {
//       rows: 3,
//       seatsPerRow: 3,
//       premiumSeats: ['1A', '1B'],
//       layout: [
//         ['1A', null, '1B'],
//         ['2A', null, '2B']
//       ]
//     },
//     suv: {
//       rows: 3,
//       seatsPerRow: 2,
//       premiumSeats: ['1A', '1B', '2A', '2B'],
//       layout: [
//         ['1A', null, '1B'],
//         ['2A', null, '2B'],
//         ['3A', '3B', '3C']
//       ]
//     },
//     van: {
//       rows: 4,
//       seatsPerRow: 3,
//       premiumSeats: ['1A', '1B', '1C'],
//       layout: [
//         ['1A', '1B', '1C'],
//         ['2A', '2B', '2C'],
//         ['3A', '3B', '3C'],
//         ['4A', '4B', '4C']
//       ]
//     }
//   }

//   const config = seatConfigs[vehicle.type?.toLowerCase()] || seatConfigs.sedan
//   const isSeatTaken = (seatId) => vehicle.takenSeats?.includes(seatId)
//   const isPremiumSeat = (seatId) => config.premiumSeats.includes(seatId)

//   return (
//     <div className="w-full max-w-xs mx-auto">
//       <div className="mb-4 flex items-center justify-center space-x-4 text-sm">
//         <div className="flex items-center">
//           <div className="w-4 h-4 rounded-sm border border-gray-300 bg-white mr-2" />
//           <span>Available</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-4 h-4 rounded-sm border border-gray-300 bg-yellow-100 mr-2" />
//           <span>Premium</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-4 h-4 rounded-sm border border-gray-300 bg-gray-200 mr-2" />
//           <span>Taken</span>
//         </div>
//       </div>

//       <div className="relative bg-white p-4 rounded-lg border">
//         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
//           Front
//         </div>

//         <div className="space-y-4">
//           {config.layout.map((row, rowIndex) => (
//             <div key={rowIndex} className="flex justify-center space-x-4">
//               {row.map((seatId, seatIndex) => {
//                 if (seatId === null) {
//                   return <div key={`space-${seatIndex}`} className="w-8 h-8" />
//                 }
                
//                 const taken = isSeatTaken(seatId)
//                 const premium = isPremiumSeat(seatId)
//                 const selected = selectedSeat === seatId

//                 return (
//                   <Tooltip key={seatId}>
//                     <TooltipTrigger>
//                       <button
//                         className={cn(
//                           "w-8 h-8 rounded-sm border flex items-center justify-center transition-colors",
//                           taken && "bg-gray-200 cursor-not-allowed",
//                           premium && !taken && "bg-yellow-100 hover:bg-yellow-200",
//                           !premium && !taken && "bg-white hover:bg-gray-100",
//                           selected && "ring-2 ring-blue-500"
//                         )}
//                         onClick={() => !taken && onSeatSelect(seatId)}
//                         disabled={taken}
//                       >
//                         {selected && <Check className="h-4 w-4 text-blue-500" />}
//                       </button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>
//                         Seat {seatId}
//                         {premium && " (Premium)"}
//                         {taken && " - Taken"}
//                       </p>
//                     </TooltipContent>
//                   </Tooltip>
//                 )
//               })}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// const SeatMap = ({ vehicle, onSeatSelect, selectedSeat }) => {
//     const seatConfigs = {
//       sedan: {
//         rows: 2,  // 1 front row + 1 back row
//         layout: [
//           ['DRIVER', null, '1A'],  // Driver (hidden) + Shotgun
//           ['2A', '2B', '2C']       // Back row with 3 seats
//         ]
//       },
//       suv: {
//         rows: 3,  // 1 front row + 2 back rows
//         layout: [
//           ['DRIVER', null, '1A'],  // Driver (hidden) + Shotgun
//           ['2A', '2B', '2C'],      // Back rows with 3 seats each
//           ['3A', '3B', '3C']
//         ]
//       },
//       van: {
//         rows: 4,  // 1 front row + 3 back rows
//         layout: [
//           ['DRIVER', null, '1A'],  // Driver (hidden) + Shotgun
//           ['2A', '2B', '2C'],      // Back rows with 3 seats each
//           ['3A', '3B', '3C'],
//           ['4A', '4B', '4C']
//         ]
//       }
//     };
  
//     const config = seatConfigs[vehicle.type?.toLowerCase()] || seatConfigs.sedan;
//     const isSeatTaken = (seatId) => vehicle.takenSeats?.includes(seatId);
    
//     // Helper to check if seat is a front seat (shotgun)
//     const isFrontSeat = (seatId) => seatId === '1A';
    
//     // Helper to check if seat should be shown (not driver's seat)
//     const shouldShowSeat = (seatId) => seatId !== 'DRIVER';
  
//     return (
//       <div className="w-full max-w-xs mx-auto">
//         <div className="mb-4 flex items-center justify-center space-x-4 text-sm">
//           <div className="flex items-center">
//             <div className="w-4 h-4 rounded-sm border border-gray-300 bg-white mr-2" />
//             <span>Available</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 rounded-sm border border-gray-300 bg-gray-200 mr-2" />
//             <span>Taken</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 rounded-sm border border-gray-300 bg-gray-300 mr-2" />
//             <span>Front Seat</span>
//           </div>
//         </div>
  
//         <div className="relative bg-white p-4 rounded-lg border">
//           <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
//             Front
//           </div>
  
//           <div className="space-y-4">
//             {config.layout.map((row, rowIndex) => (
//               <div key={rowIndex} className="flex justify-center space-x-4">
//                 {row.map((seatId, seatIndex) => {
//                   if (seatId === null) {
//                     return <div key={`space-${seatIndex}`} className="w-8 h-8" />;
//                   }
                  
//                   if (!shouldShowSeat(seatId)) {
//                     return <div key={seatId} className="w-8 h-8" />;
//                   }
  
//                   const taken = isSeatTaken(seatId);
//                   const isFront = isFrontSeat(seatId);
//                   const selected = selectedSeat === seatId;
  
//                   return (
//                     <Tooltip key={seatId}>
//                       <TooltipTrigger>
//                         <button
//                           className={cn(
//                             "w-8 h-8 rounded-sm border flex items-center justify-center transition-colors",
//                             taken && "bg-gray-200 cursor-not-allowed",
//                             isFront && "bg-gray-300 cursor-not-allowed",
//                             !isFront && !taken && "bg-white hover:bg-gray-100",
//                             selected && "ring-2 ring-blue-500"
//                           )}
//                           onClick={() => !taken && !isFront && onSeatSelect(seatId)}
//                           disabled={taken || isFront}
//                         >
//                           {selected && <Check className="h-4 w-4 text-blue-500" />}
//                         </button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>
//                           {isFront ? "Front Seat" : `Seat ${seatId}`}
//                           {taken && " - Taken"}
//                         </p>
//                       </TooltipContent>
//                     </Tooltip>
//                   )
//                 })}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }


const SeatMap = ({ vehicle, onSeatSelect, selectedSeat }) => {
    const seatConfigs = {
      sedan: {
        rows: 2,  // 1 front row + 1 back row
        layout: [
          [1 , null, 'DRIVER'],     // Driver (hidden) + Seat 1 (shotgun)
          [2, 3, 4]                // Back row with 3 seats
        ]
      },
      suv: {
        rows: 3,  // 1 front row + 2 back rows
        layout: [
          ['DRIVER', null, 1],     // Driver (hidden) + Seat 1 (shotgun)
          [2, 3, 4],               // Back rows with 3 seats each
          [5, 6, 7]
        ]
      },
      van: {
        rows: 4,  // 1 front row + 3 back rows
        layout: [
          ['DRIVER', null, 1],     // Driver (hidden) + Seat 1 (shotgun)
          [2, 3, 4],               // Back rows with 3 seats each
          [5, 6, 7],
          [8, 9, 10]
        ]
      }
    };
  
    const config = seatConfigs[vehicle.type?.toLowerCase()] || seatConfigs.sedan;
    
    // Helper functions
    const isSeatTaken = (seatId) => vehicle.takenSeats?.includes(seatId);
    const isPremiumSeat = (seatId) => vehicle.premiumSeats?.includes(seatId);
    const shouldShowSeat = (seatId) => seatId !== 'DRIVER';
    
    return (
      <div className="w-full max-w-xs mx-auto">
        <div className="mb-4 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm border border-gray-300 bg-white mr-2" />
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm border border-gray-300 bg-yellow-100 mr-2" />
            <span>Premium</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm border border-gray-300 bg-gray-200 mr-2" />
            <span>Taken</span>
          </div>
        </div>
  
        <div className="relative bg-white p-4 rounded-lg border">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
            Front
          </div>
  
          <div className="space-y-4">
            {config.layout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-4">
                {row.map((seatId, seatIndex) => {
                  if (seatId === null) {
                    return <div key={`space-${seatIndex}`} className="w-8 h-8" />;
                  }
                  
                  if (!shouldShowSeat(seatId)) {
                    return <div key={seatId} className="w-8 h-8" />;
                  }
  
                  const taken = isSeatTaken(seatId);
                  const premium = isPremiumSeat(seatId);
                  const selected = selectedSeat === seatId;
  
                  return (
                    <Tooltip key={seatId}>
                      <TooltipTrigger>
                        <button
                          className={cn(
                            "w-8 h-8 rounded-sm border flex items-center justify-center transition-colors",
                            taken && "bg-gray-200 cursor-not-allowed",
                            premium && !taken && "bg-yellow-100 hover:bg-yellow-200",
                            !premium && !taken && "bg-white hover:bg-gray-100",
                            selected && "ring-2 ring-blue-500"
                          )}
                          onClick={() => !taken && onSeatSelect(seatId)}
                          disabled={taken}
                        >
                          {selected ? (
                            <Check className="h-4 w-4 text-blue-500" />
                          ) : (
                            <span className="text-xs">{seatId}</span>
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Seat {seatId}
                          {premium && " (Premium)"}
                          {taken && " - Taken"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

const RideCard = ({ ride, onBookRide }) => (
  <Card className="hover:bg-gray-50 transition-colors">
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/9.x/notionists/svg?seed=${ride.ride.driver.username}`}
              alt={ride.ride.driver.username}
            />
            <AvatarFallback>
              <User2 className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{ride.ride.driver.username}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">4.85</span>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="ml-2">
          {ride.ride.vehicle.make} {ride.ride.vehicle.model}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <div className="flex items-center">
              <span className="truncate max-w-[100px]">{ride.from}</span>
              <ArrowRight className="h-4 w-4 mx-2" />
              <span className="truncate max-w-[100px]">{ride.to}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <CalendarClock className="h-4 w-4 mr-2" />
            <span>
              {format(new Date(ride.ride.scheduledFor), "MMM d, yyyy")} at{" "}
              {format(new Date(ride.ride.scheduledFor), "HH:mm")}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Car className="h-4 w-4 mr-2" />
            <span>{ride.ride.vehicle.seats.length} seats available</span>
          </div>
          <div className="flex items-center font-medium">
            <DollarSign className="h-4 w-4" />
            {ride.ride.fare}
          </div>
        </div>

        <Button className="w-full mt-2" onClick={() => onBookRide(ride)}>
          Book Now
        </Button>
      </div>
    </CardContent>
  </Card>
)

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRide, setSelectedRide] = useState(null)
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [rides, setRides] = useState([])

  const handleBookRide = (ride) => {
    setSelectedRide(ride)
    setSelectedSeat(null)
  }

  const isPremiumSeat = (seatId) => {
    const premiumSeats = {
      sedan: ['1A', '1B'],
      suv: ['1A', '1B', '2A', '2B'],
      van: ['1A', '1B', '1C']
    }
    const vehicleType = selectedRide?.ride.vehicle.make?.toLowerCase() || 'sedan'
    return premiumSeats[vehicleType]?.includes(seatId)
  }

  const getCurrentFare = () => {
    if (!selectedRide || !selectedSeat) return parseFloat(selectedRide?.ride.fare || 0)
    const baseFare = parseFloat(selectedRide.ride.fare)
    return isPremiumSeat(selectedSeat) ? baseFare * 1.2 : baseFare
  }

  const handleConfirmBooking = () => {
    if (!selectedSeat) {
      alert("Please select a seat")
      return
    }

    // Here you would typically make an API call to confirm the booking
    alert(`Booking confirmed!\nSeat: ${selectedSeat}\nFare: $${getCurrentFare().toFixed(2)}`)
    setSelectedRide(null)
    setSelectedSeat(null)
  }

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch(`/api/get-public-rides?search=${searchTerm}&limit=10`)
        const data = await response.json()
        setRides(data.data)
        console.log(data)
      } catch (error) {
        console.error("Error fetching rides:", error)
      }
    }

    fetchRides()
  }, [searchTerm])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Book a Ride</h1>
        <p className="text-gray-600">Find and book available rides in your area</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Rides</CardTitle>
          <CardDescription>Enter your travel details to find available rides</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="date" className="pl-8" />
            </div>
            <div className="relative">
              <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="time" className="pl-8" />
            </div>
            <div className="relative">
              <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Enter destination" className="pl-8" />
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by location or driver name"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="h-[calc(100vh-400px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((ride) => (
            <RideCard key={ride.ride.id} ride={ride} onBookRide={handleBookRide} />
          ))}
        </div>
      </ScrollArea>

      <Dialog
        open={!!selectedRide}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedRide(null)
            setSelectedSeat(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select Your Seat</DialogTitle>
            <DialogDescription>
              Choose your preferred seat. Premium seats are marked in yellow and cost 20% extra.
            </DialogDescription>
          </DialogHeader>
          {selectedRide && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">From</p>
                  <p className="text-sm text-gray-600">{selectedRide.from}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">To</p>
                  <p className="text-sm text-gray-600">{selectedRide.to}</p>
                </div>
              </div>

              <SeatMap
                vehicle={{
                  type: selectedRide.ride.vehicle.make,
                  takenSeats: selectedRide.ride.takenSeats || []
                }}
                selectedSeat={selectedSeat}
                onSeatSelect={setSelectedSeat}
              />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Selected Seat</p>
                  <p className="text-sm text-gray-600">
                    {selectedSeat ? 
                      `${selectedSeat} ${isPremiumSeat(selectedSeat) ? '(Premium)' : ''}` 
                      : 'None selected'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Fare</p>
                  <p className="text-sm font-semibold">
                    ${getCurrentFare().toFixed(2)}
                    {isPremiumSeat(selectedSeat) && (
                      <span className="text-xs text-yellow-600 ml-1">(Premium)</span>
                    )}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Date & Time</p>
                <p className="text-sm text-gray-600">
                  {format(new Date(selectedRide.ride.scheduledFor), "PPP p")}
                </p>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedRide(null)
                    setSelectedSeat(null)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleConfirmBooking} disabled={!selectedSeat}>
                  {selectedSeat 
                    ? `Confirm Booking ($${getCurrentFare().toFixed(2)})` 
                    : 'Select a seat to continue'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}