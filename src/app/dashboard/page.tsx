"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
    Search,
    Calendar,
    Clock,
    MapPin,
    Car,
    Star,
    User2,
    ArrowRight,
    CalendarClock,
    DollarSign,
    Check,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import axios from "axios";
import { trackFallbackParamAccessed } from "next/dist/server/app-render/dynamic-rendering";
import { useToast } from "@/hooks/use-toast";

// const SeatMap = ({ vehicle, onSeatSelect, selectedSeat }) => {
//     const seatConfigs = {
//         sedan: {
//             rows: 2, // 1 front row + 1 back row
//             layout: [
//                 [1, null, "DRIVER"], // Driver (hidden) + Seat 1 (shotgun)
//                 [2, 3, 4], // Back row with 3 seats
//             ],
//         },
//         suv: {
//             rows: 3, // 1 front row + 2 back rows
//             layout: [
//                 ["DRIVER", null, 1], // Driver (hidden) + Seat 1 (shotgun)
//                 [2, 3, 4], // Back rows with 3 seats each
//                 [5, 6, 7],
//             ],
//         },
//         van: {
//             rows: 4, // 1 front row + 3 back rows
//             layout: [
//                 ["DRIVER", null, 1], // Driver (hidden) + Seat 1 (shotgun)
//                 [2, 3, 4], // Back rows with 3 seats each
//                 [5, 6, 7],
//                 [8, 9, 10],
//             ],
//         },
//     };

//     const config =
//         seatConfigs[vehicle.type?.toLowerCase()] || seatConfigs.sedan;

//     // Helper functions
//     const isSeatTaken = (seatId) => vehicle.takenSeats?.includes(seatId);
//     const isPremiumSeat = (seatId) => vehicle.premiumSeats?.includes(seatId);
//     const shouldShowSeat = (seatId) => seatId !== "DRIVER";

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
//                         <div
//                             key={rowIndex}
//                             className="flex justify-center space-x-4"
//                         >
//                             {row.map((seatId, seatIndex) => {
//                                 if (seatId === null) {
//                                     return (
//                                         <div
//                                             key={`space-${seatIndex}`}
//                                             className="w-8 h-8"
//                                         />
//                                     );
//                                 }

//                                 if (!shouldShowSeat(seatId)) {
//                                     return (
//                                         <div key={seatId} className="w-8 h-8" />
//                                     );
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
//                                                     taken &&
//                                                         "bg-gray-200 cursor-not-allowed",
//                                                     premium &&
//                                                         !taken &&
//                                                         "bg-yellow-100 hover:bg-yellow-200",
//                                                     !premium &&
//                                                         !taken &&
//                                                         "bg-white hover:bg-gray-100",
//                                                     selected &&
//                                                         "ring-2 ring-blue-500"
//                                                 )}
//                                                 onClick={() =>
//                                                     !taken &&
//                                                     onSeatSelect(seatId)
//                                                 }
//                                                 disabled={taken}
//                                             >
//                                                 {selected ? (
//                                                     <Check className="h-4 w-4 text-blue-500" />
//                                                 ) : (
//                                                     <span className="text-xs">
//                                                         {seatId}
//                                                     </span>
//                                                 )}
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

// const SeatMap = ({ seats = [], onSeatSelect, selectedSeat }) => {
//   // Helper functions
//   const isSeatTaken = (seatId) => seats.find(seat => seat.id === seatId)?.isTaken;
//   const isPremiumSeat = (seatId) => seats.find(seat => seat.id === seatId)?.isPremium;
//   const shouldShowSeat = (seatId) => seatId !== "DRIVER";

//   // Group seats into rows: front row with 2 seats + driver, others with up to 3 seats each
//   const groupedSeats = seats.reduce((acc, seat, index) => {
//     if (index === 0) {
//       // Front row (left seat + empty middle + driver)
//       acc.push([seat.id, null, "DRIVER"]);
//     } else {
//       // Other rows with up to 3 seats
//       const rowIndex = Math.floor((index - 1) / 3) + 1;
//       acc[rowIndex] = acc[rowIndex] || [];
//       acc[rowIndex].push(seat.id);
//     }
//     return acc;
//   }, []);

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

//         <div className="flex flex-col items-center space-y-2">
//           {groupedSeats.map((row, rowIndex) => (
//             <div
//               key={rowIndex}
//               className="grid grid-cols-3 gap-0 w-full place-items-center"
//             >
//               {row.map((seatId, seatIndex) => {
//                 if (seatId === null) {
//                   return (
//                     <div
//                       key={`space-${seatIndex}`}
//                       className="w-8 h-8"
//                     />
//                   );
//                 }

//                 if (!shouldShowSeat(seatId)) {
//                   return (
//                     <div
//                       key={`driver-${seatIndex}`}
//                       className="w-8 h-8 bg-gray-100 rounded-sm flex items-center justify-center"
//                     >
//                       <span className="text-xs text-gray-400">D</span>
//                     </div>
//                   );
//                 }

//                 const taken = isSeatTaken(seatId);
//                 const premium = isPremiumSeat(seatId);
//                 const selected = selectedSeat === seatId;

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
//                         {selected ? (
//                           <Check className="h-4 w-4 text-blue-500" />
//                         ) : (
//                           <span className="text-xs">{seatId}</span>
//                         )}
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
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// interface SeatMapProps {
//     seats: Seat[];
//     onSeatSelect: (seatId: string) => void;
//     selectedSeat: string | null;
// }

// interface Seat {
//     id: string;
//     isTaken: boolean;
//     isPremium: boolean;
// }

// function SeatMap({ seats = [], onSeatSelect, selectedSeat }) {
//     // Helper functions
//     const isSeatTaken = (seatId: string) =>
//         seats.find((seat) => seat.id === seatId)?.isTaken;
//     const isPremiumSeat = (seatId: string) =>
//         seats.find((seat) => seat.id === seatId)?.isPremium;
//     const shouldShowSeat = (seatId: string) => seatId !== "DRIVER";

//     // Group seats into rows: front row with 2 seats + driver, others with up to 3 seats each
//     const groupedSeats = seats.reduce<string[][]>((acc, seat, index) => {
//         if (index === 0) {
//             // Front row (left seat + empty middle + driver)
//             acc.push([seat.id, null, "DRIVER"]);
//         } else {
//             // Other rows with up to 3 seats
//             const rowIndex = Math.floor((index - 1) / 3) + 1;
//             acc[rowIndex] = acc[rowIndex] || [];
//             acc[rowIndex].push(seat.id);
//         }
//         return acc;
//     }, []);

//     return (
//         <Card className="w-full max-w-sm mx-auto">
//             <CardHeader>
//                 <CardTitle className="text-center">Seat Selection</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="mb-4 flex items-center justify-center space-x-4 text-sm">
//                     <div className="flex items-center">
//                         <Badge variant="outline" className="mr-2 w-4 h-4 p-0" />
//                         <span>Available</span>
//                     </div>
//                     <div className="flex items-center">
//                         <Badge
//                             variant="secondary"
//                             className="mr-2 w-4 h-4 p-0 bg-yellow-100"
//                         />
//                         <span>Premium</span>
//                     </div>
//                     <div className="flex items-center">
//                         <Badge
//                             variant="secondary"
//                             className="mr-2 w-4 h-4 p-0"
//                         />
//                         <span>Taken</span>
//                     </div>
//                 </div>

//                 <div className="relative bg-white p-4 rounded-lg border">
//                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground bg-background px-2">
//                         Front
//                     </div>

//                     <TooltipProvider>
//                         <div className="flex flex-col items-center space-y-1">
//                             {groupedSeats.map((row, rowIndex) => (
//                                 <div
//                                     key={rowIndex}
//                                     className="grid grid-cols-3 gap-1 w-full place-items-center"
//                                 >
//                                     {row.map((seatId, seatIndex) => {
//                                         if (seatId === null) {
//                                             return (
//                                                 <div
//                                                     key={`space-${seatIndex}`}
//                                                     className="w-8 h-8"
//                                                 />
//                                             );
//                                         }

//                                         if (!shouldShowSeat(seatId)) {
//                                             return (
//                                                 <div
//                                                     key={`driver-${seatIndex}`}
//                                                     className="w-8 h-8 bg-muted rounded-sm flex items-center justify-center"
//                                                 >
//                                                     <span className="text-xs text-muted-foreground">
//                                                         D
//                                                     </span>
//                                                 </div>
//                                             );
//                                         }

//                                         const taken = isSeatTaken(seatId);
//                                         const premium = isPremiumSeat(seatId);
//                                         const selected =
//                                             selectedSeat === seatId;

//                                         return (
//                                             <Tooltip key={seatId}>
//                                                 <TooltipTrigger asChild>
//                                                     <button
//                                                         className={cn(
//                                                             "w-8 h-8 rounded-sm border flex items-center justify-center transition-colors",
//                                                             taken &&
//                                                                 "bg-secondary cursor-not-allowed",
//                                                             premium &&
//                                                                 !taken &&
//                                                                 "bg-yellow-100 hover:bg-yellow-200",
//                                                             !premium &&
//                                                                 !taken &&
//                                                                 "bg-background hover:bg-muted",
//                                                             selected &&
//                                                                 "ring-2 ring-primary"
//                                                         )}
//                                                         onClick={() =>
//                                                             !taken &&
//                                                             onSeatSelect(seatId)
//                                                         }
//                                                         disabled={taken}
//                                                         aria-label={`Select seat ${seatId}${
//                                                             premium
//                                                                 ? " (Premium)"
//                                                                 : ""
//                                                         }${
//                                                             taken
//                                                                 ? " - Taken"
//                                                                 : ""
//                                                         }`}
//                                                     >
//                                                         {selected ? (
//                                                             <Check className="h-4 w-4 text-primary" />
//                                                         ) : (
//                                                             <span className="text-xs">
//                                                                 {seatId}
//                                                             </span>
//                                                         )}
//                                                     </button>
//                                                 </TooltipTrigger>
//                                                 <TooltipContent>
//                                                     <p>
//                                                         Seat {seatId}
//                                                         {premium &&
//                                                             " (Premium)"}
//                                                         {taken && " - Taken"}
//                                                     </p>
//                                                 </TooltipContent>
//                                             </Tooltip>
//                                         );
//                                     })}
//                                 </div>
//                             ))}
//                         </div>
//                     </TooltipProvider>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

function SeatMap({ seats = [], takenSeats = [], onSeatSelect, selectedSeat }) {
    // Helper functions
    const isSeatTaken = (seatId: string) => takenSeats.includes(seatId);
    const isPremiumSeat = (seatId: string) =>
        seats.find((seat) => seat.id === seatId)?.isPremium;
    const shouldShowSeat = (seatId: string) => seatId !== "DRIVER";

    // Group seats into rows: front row with 2 seats + driver, others with up to 3 seats each
    const groupedSeats = seats.reduce<string[][]>((acc, seat, index) => {
        if (index === 0) {
            // Front row (left seat + empty middle + driver)
            acc.push([seat.id, null, "DRIVER"]);
        } else {
            // Other rows with up to 3 seats
            const rowIndex = Math.floor((index - 1) / 3) + 1;
            acc[rowIndex] = acc[rowIndex] || [];
            acc[rowIndex].push(seat.id);
        }
        return acc;
    }, []);

    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader>
                <CardTitle className="text-center">Seat Selection</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center">
                        <Badge variant="outline" className="mr-2 w-4 h-4 p-0" />
                        <span>Available</span>
                    </div>
                    <div className="flex items-center">
                        <Badge
                            variant="secondary"
                            className="mr-2 w-4 h-4 p-0 bg-yellow-100"
                        />
                        <span>Premium</span>
                    </div>
                    <div className="flex items-center">
                        <Badge
                            variant="secondary"
                            className="mr-2 w-4 h-4 p-0"
                        />
                        <span>Taken</span>
                    </div>
                </div>

                <div className="relative bg-white p-4 rounded-lg border">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground bg-background px-2">
                        Front
                    </div>

                    <TooltipProvider>
                        <div className="flex flex-col items-center space-y-1">
                            {groupedSeats.map((row, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className="grid grid-cols-3 gap-1 w-full place-items-center"
                                >
                                    {row.map((seatId, seatIndex) => {
                                        if (seatId === null) {
                                            return (
                                                <div
                                                    key={`space-${seatIndex}`}
                                                    className="w-8 h-8"
                                                />
                                            );
                                        }

                                        if (!shouldShowSeat(seatId)) {
                                            return (
                                                <div
                                                    key={`driver-${seatIndex}`}
                                                    className="w-8 h-8 bg-muted rounded-sm flex items-center justify-center"
                                                >
                                                    <span className="text-xs text-muted-foreground">
                                                        D
                                                    </span>
                                                </div>
                                            );
                                        }

                                        const taken = isSeatTaken(seatId);
                                        const premium = isPremiumSeat(seatId);
                                        const selected =
                                            selectedSeat === seatId;

                                        const seatNumber =
                                            seats.find(
                                                (seat) => seat.id === seatId
                                            )?.seatNumber || "";

                                        return (
                                            <Tooltip key={seatId}>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className={cn(
                                                            "w-8 h-8 rounded-sm border flex items-center justify-center transition-colors",
                                                            taken &&
                                                                "bg-secondary cursor-not-allowed",
                                                            premium &&
                                                                !taken &&
                                                                "bg-yellow-100 hover:bg-yellow-200",
                                                            !premium &&
                                                                !taken &&
                                                                "bg-background hover:bg-muted",
                                                            selected &&
                                                                "ring-2 ring-primary"
                                                        )}
                                                        onClick={() =>
                                                            !taken &&
                                                            onSeatSelect(seatId)
                                                        }
                                                        disabled={taken}
                                                        aria-label={`Select seat ${seatNumber}${
                                                            premium
                                                                ? " (Premium)"
                                                                : ""
                                                        }${
                                                            taken
                                                                ? " - Taken"
                                                                : ""
                                                        }`}
                                                    >
                                                        {selected ? (
                                                            <Check className="h-4 w-4 text-primary" />
                                                        ) : (
                                                            <span className="text-xs">
                                                                {seatNumber}
                                                            </span>
                                                        )}
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        Seat {seatNumber}
                                                        {premium &&
                                                            " (Premium)"}
                                                        {taken && " - Taken"}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    );
}

// const RideCard = ({ ride, onBookRide }) => (
//     <Card className="hover:bg-gray-50 transition-colors">
//         <CardContent className="p-4">
//             <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center space-x-3">
//                     <Avatar>
//                         <AvatarImage
//                             src={`https://api.dicebear.com/9.x/notionists/svg?seed=${ride.driver.username}`}
//                             alt={ride.driver.username}
//                         />
//                         <AvatarFallback>
//                             <User2 className="h-4 w-4" />
//                         </AvatarFallback>
//                     </Avatar>
//                     <div>
//                         <h3 className="font-medium">{ride.driver.username}</h3>
//                         <div className="flex items-center">
//                             <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//                             <span className="text-sm text-gray-600 ml-1">
//                                 4.85
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//                 <Badge variant="secondary" className="ml-2">
//                     {ride.vehicle.make} {ride.vehicle.model}
//                 </Badge>
//             </div>

//             <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2 text-sm text-gray-600">
//                         <MapPin className="h-4 w-4" />
//                         <div className="flex items-center">
//                             <span className="truncate max-w-[100px]">
//                                 {ride.route.from}
//                             </span>
//                             <ArrowRight className="h-4 w-4 mx-2" />
//                             <span className="truncate max-w-[100px]">
//                                 {ride.route.to}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center text-gray-600">
//                         <CalendarClock className="h-4 w-4 mr-2" />
//                         <span>
//                             {format(new Date(ride.scheduledFor), "MMM d, yyyy")}{" "}
//                             at {format(new Date(ride.scheduledFor), "HH:mm")}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center text-gray-600">
//                         <Car className="h-4 w-4 mr-2" />
//                         <span>{ride.vehicle.seats.length - ride.bookings.length} seats available</span>
//                     </div>
//                     <div className="flex items-center font-medium">
//                         <DollarSign className="h-4 w-4" />
//                         {ride.fare}
//                     </div>
//                     {ride.premiumFare && (
//                         <div className="flex items-center font-medium">
//                             <DollarSign className="h-4 w-4" />
//                             <DollarSign className="h-4 w-4" />
//                             {ride.premiumFare}
//                         </div>
//                     )}
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

function RideCard({ ride, onBookRide }) {
    return (
        <Card className="hover:bg-accent transition-colors">
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                        <Avatar>
                            <AvatarImage
                                src={`https://api.dicebear.com/9.x/notionists/svg?seed=${ride.driver.username}`}
                                alt={ride.driver.username}
                            />
                            <AvatarFallback>
                                <User2 className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-medium">
                                {ride.driver.username}
                            </h3>
                            <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm text-muted-foreground ml-1">
                                    4.85
                                </span>
                            </div>
                        </div>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                        {ride.vehicle.make} {ride.vehicle.model}
                    </Badge>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <div className="flex items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="truncate max-w-[100px]">
                                                {ride.route.from}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {ride.route.from}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <ArrowRight className="h-4 w-4 mx-2" />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="truncate max-w-[100px]">
                                                {ride.route.to}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {ride.route.to}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                            <CalendarClock className="h-4 w-4 mr-2" />
                            <span>
                                {format(
                                    new Date(ride.scheduledFor),
                                    "MMM d, yyyy"
                                )}{" "}
                                at{" "}
                                {format(new Date(ride.scheduledFor), "HH:mm")}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                            <Car className="h-4 w-4 mr-2" />
                            <span>
                                {ride.vehicle.seats.length -
                                    ride.bookings.length}{" "}
                                seats available
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center font-medium">
                                <DollarSign className="h-4 w-4" />
                                <span>{ride.fare}</span>
                            </div>
                            {ride.premiumFare && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="flex items-center font-medium text-yellow-600">
                                                <DollarSign className="h-4 w-4" />
                                                <span>{ride.premiumFare}</span>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Premium Fare
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </div>
                    </div>

                    <Button
                        className="w-full mt-2"
                        onClick={() => onBookRide(ride)}
                    >
                        Book Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Dashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRide, setSelectedRide] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [rides, setRides] = useState([]);

    const handleBookRide = (ride) => {
        setSelectedRide(ride);
        setSelectedSeat(null);
    };

    const seats = [
        { id: "1", isPremium: true, seatNumber: "1" },
        { id: "2", isPremium: false, seatNumber: "2" },
        { id: "3", isPremium: true, seatNumber: "3" },
    ];

    const takenSeats = ["3"];

    const isPremiumSeat = (seatId) => {
        const premiumSeats = {
            sedan: ["1A", "1B"],
            suv: ["1A", "1B", "2A", "2B"],
            van: ["1A", "1B", "1C"],
        };
        const vehicleType =
            selectedRide?.vehicle.make?.toLowerCase() || "sedan";
        return premiumSeats[vehicleType]?.includes(seatId);
    };

    const { toast } = useToast();

    const getCurrentFare = () => {
        if (!selectedRide || !selectedSeat)
            return parseFloat(selectedRide?.fare || 0);
        return parseFloat(selectedRide?.premiumFare || selectedRide?.fare);
    };

    const handleConfirmBooking = async () => {
        const bookingData = { seatID: selectedSeat, rideID: selectedRide.id };
        console.log(bookingData);
        try {
            const response = await axios.post("/api/book-ride", bookingData);
            toast({
                title: "Ride booked Successfully",
            });
            setRides((prev) =>
                prev.filter((ride) => ride.id !== selectedRide.id)
            );
        } catch (error) {
            console.error(error);
            toast({
                title: "Error booking ride. Please try again",
                description: error.message,
            });
        } finally {
            setSelectedRide(null);
            setSelectedSeat(null);
        }
    };

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await axios.get("/api/get-public-rides");
                setRides(response.data.data);
                console.log(response);
            } catch (error) {
                console.error("Error fetching rides:", error);
            }
        };

        fetchRides();
    }, [searchTerm]);

    // const seats = [
    //     { id: 1, isTaken: false, isPremium: true },
    //     { id: 2, isTaken: false },
    //     { id: 3, isTaken: true },
    //     { id: 4, isTaken: false },
    //     { id: 5, isTaken: true, isPremium: true },
    // ];

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Book a Ride</h1>
                <p className="text-gray-600">
                    Find and book available rides in your area
                </p>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Search Rides</CardTitle>
                    <CardDescription>
                        Enter your travel details to find available rides
                    </CardDescription>
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
                            <Input
                                placeholder="Enter destination"
                                className="pl-8"
                            />
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
                        <RideCard
                            key={ride.id}
                            ride={ride}
                            onBookRide={handleBookRide}
                        />
                    ))}
                </div>
            </ScrollArea>

            <Dialog
                open={!!selectedRide}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedRide(null);
                        setSelectedSeat(null);
                    }
                }}
            >
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Select Your Seat</DialogTitle>
                        <DialogDescription>
                            Choose your preferred seat. Premium seats are marked
                            in yellow and cost 20% extra.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedRide && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium">From</p>
                                    <p className="text-sm text-gray-600">
                                        {selectedRide.from}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">To</p>
                                    <p className="text-sm text-gray-600">
                                        {selectedRide.to}
                                    </p>
                                </div>
                            </div>

                            <SeatMap
                                seats={selectedRide.vehicle.seats}
                                takenSeats={selectedRide.vehicle.seats.filter(
                                    (seat) =>
                                        selectedRide.bookings.some(
                                            (s) => s.id === seat.id
                                        )
                                )}
                                selectedSeat={selectedSeat}
                                onSeatSelect={setSelectedSeat}
                            />

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium">
                                        Selected Seat
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {selectedSeat
                                            ? `${selectedSeat} ${
                                                  isPremiumSeat(selectedSeat)
                                                      ? "(Premium)"
                                                      : ""
                                              }`
                                            : "None selected"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        Total Fare
                                    </p>
                                    <p className="text-sm font-semibold">
                                        ${getCurrentFare().toFixed(2)}
                                        {isPremiumSeat(selectedSeat) && (
                                            <span className="text-xs text-yellow-600 ml-1">
                                                (Premium)
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium">
                                    Date & Time
                                </p>
                                <p className="text-sm text-gray-600">
                                    {format(
                                        new Date(selectedRide.scheduledFor),
                                        "PPP p"
                                    )}
                                </p>
                            </div>

                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedRide(null);
                                        setSelectedSeat(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirmBooking}
                                    disabled={!selectedSeat}
                                >
                                    {selectedSeat
                                        ? `Confirm Booking ($${getCurrentFare().toFixed(
                                              2
                                          )})`
                                        : "Select a seat to continue"}
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
