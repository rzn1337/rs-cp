"use client";

import { useState, useMemo, useEffect } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
    parseISO,
} from "date-fns";
import {
    ChevronLeft,
    ChevronRight,
    MapPin,
    MessageSquare,
    Star as StarIcon,
    AlertTriangle,
    User,
    Clock,
    DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import ViewRideDialog from "@/components/ViewRideDialog";

const StarRating = ({
    rating,
    onRate,
}: {
    rating: number | null;
    onRate?: (rating: number) => void;
}) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => onRate && onRate(star)}
                    className={`${
                        onRate ? "cursor-pointer" : "cursor-default"
                    } ${
                        star <= (rating || 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                    }`}
                >
                    <StarIcon className="w-6 h-6" />
                </button>
            ))}
        </div>
    );
};

interface Ride {
    id: string;
    date: string;
    time: string;
    status: "scheduled" | "enroute" | "completed" | "cancelled";
    pickup: string;
    destination: string;
    driverName: string;
    price: string;
    rating?: number;
}

interface DayRides {
    [date: string]: Ride[];
}

const mockRides: DayRides = {
    "2024-11-15": [
        {
            id: "1",
            date: "2024-11-15",
            time: "09:00",
            status: "scheduled",
            pickup: "Home",
            destination: "Office",
            driverName: "John Doe",
            price: "$15",
        },
        {
            id: "2",
            date: "2024-11-15",
            time: "18:00",
            status: "scheduled",
            pickup: "Office",
            destination: "Home",
            driverName: "Jane Smith",
            price: "$15",
        },
    ],
    "2024-11-16": [
        {
            id: "3",
            date: "2024-11-16",
            time: "10:00",
            status: "completed",
            pickup: "Home",
            destination: "Gym",
            driverName: "Mike Johnson",
            price: "$10",
            rating: 5,
        },
    ],
    "2024-11-17": [
        {
            id: "4",
            date: "2024-11-17",
            time: "14:00",
            status: "enroute",
            pickup: "Mall",
            destination: "Park",
            driverName: "Sarah Lee",
            price: "$12",
        },
    ],
    "2024-11-18": [
        {
            id: "5",
            date: "2024-11-18",
            time: "11:00",
            status: "cancelled",
            pickup: "Home",
            destination: "Airport",
            driverName: "Tom Brown",
            price: "$25",
        },
    ],
    "2024-11-20": [
        {
            id: "6",
            date: "2024-11-20",
            time: "08:30",
            status: "scheduled",
            pickup: "Home",
            destination: "School",
            driverName: "Alice Green",
            price: "$8",
        },
    ],
    "2024-11-22": [
        {
            id: "7",
            date: "2024-11-22",
            time: "19:00",
            status: "scheduled",
            pickup: "Restaurant",
            destination: "Home",
            driverName: "Bob White",
            price: "$20",
        },
    ],
};

const statusColors = {
    SCHEDULED: "bg-blue-200 text-blue-800",
    ENROUTE: "bg-yellow-200 text-yellow-800",
    COMPLETED: "bg-green-200 text-green-800",
    CANCELLED: "bg-red-200 text-red-800",
};

const complaintCategories = [
    "Late Arrival",
    "Unsafe Driving",
    "Cleanliness",
    "Rude Behavior",
    "Wrong Route",
    "Other",
];

export default function MyRidesCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
    const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
    const [rating, setRating] = useState<number | null>(null);
    const [ratingComment, setRatingComment] = useState("");
    const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false);
    const [complaintCategory, setComplaintCategory] = useState<string | null>(
        null
    );
    const [bookings, setBookings] = useState([]);
    const [bookingsByDate, setBookingsByDate] = useState({});
    const [complaintComment, setComplaintComment] = useState("");
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
    const [confirmMessage, setConfirmMessage] = useState("");

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };

    const handleRideClick = (ride: Ride) => {
        setSelectedRide(ride);
    };

    const handleCancelRide = () => {
        setConfirmMessage("Are you sure you want to cancel this ride?");
        setConfirmAction(() => () => {
            // In a real application, you would call an API to cancel the ride
            console.log(`Cancelling ride with ID: ${selectedRide?.id}`);
            setSelectedRide(null);
            setIsConfirmDialogOpen(false);
        });
        setIsConfirmDialogOpen(true);
    };

    const handleContactDriver = () => {
        setIsMessageDialogOpen(true);
    };

    const handleSendMessage = () => {
        setConfirmMessage("Are you sure you want to send this message?");
        setConfirmAction(() => () => {
            // In a real application, you would send this message to the driver
            console.log(`Sending message to driver: ${message}`);
            setMessage("");
            setIsMessageDialogOpen(false);
            setIsConfirmDialogOpen(false);
        });
        setIsConfirmDialogOpen(true);
    };

    const handleRateRide = () => {
        setIsRatingDialogOpen(true);
    };

    const handleSubmitRating = () => {
        if (!rating) {
            // Show an error message or prevent submission
            return;
        }
        setConfirmMessage("Are you sure you want to submit this rating?");
        setConfirmAction(() => () => {
            // In a real application, you would submit this rating to an API
            console.log(
                `Submitting rating: ${rating} stars, Comment: ${ratingComment}`
            );
            if (selectedRide) {
                const updatedRide = { ...selectedRide, rating };
                // Update the ride in your state or data store
                console.log("Updated ride:", updatedRide);
            }
            setRating(null);
            setRatingComment("");
            setIsRatingDialogOpen(false);
            setIsConfirmDialogOpen(false);
        });
        setIsConfirmDialogOpen(true);
    };

    const handleFileComplaint = () => {
        setIsComplaintDialogOpen(true);
    };

    const handleSubmitComplaint = () => {
        setConfirmMessage("Are you sure you want to submit this complaint?");
        setConfirmAction(() => () => {
            // In a real application, you would submit this complaint to an API
            console.log(
                `Submitting complaint: Category: ${complaintCategory}, Comment: ${complaintComment}`
            );
            setComplaintCategory(null);
            setComplaintComment("");
            setIsComplaintDialogOpen(false);
            setIsConfirmDialogOpen(false);
        });
        setIsConfirmDialogOpen(true);
    };

    const selectedDateRides = selectedDate
        ? bookingsByDate[format(selectedDate, "yyyy-MM-dd")] || []
        : [];

    const indexBookingsByDate = (bookings) => {
        return bookings.reduce((acc, booking) => {
            const dateKey = new Date(booking.scheduledFor)
                .toISOString()
                .split("T")[0];

            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }

            acc[dateKey].push(booking);
            return acc;
        }, {});
    };

    const upcomingRides = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return Object.values(bookingsByDate)
            .flat()
            .filter(
                (ride) =>
                    ride.status === "SCHEDULED" &&
                new Date(ride.scheduledFor)
                 >= today
            )
            .sort(
                (a, b) =>
                    parseISO(a.scheduledFor).getTime() -
                    parseISO(b.scheduledFor).getTime()
            );
    }, [bookingsByDate]);

    useEffect(() => {
        const fetchAndIndexMyBookings = async () => {
            try {
                const response = await axios.get("/api/get-my-bookings");
                console.log(response.data.data);
                setBookings(response.data.data);
                const indexedBookings = indexBookingsByDate(response.data.data);
                console.log("indexed bookings:", indexedBookings);
                setBookingsByDate(indexedBookings);
                console.log(indexedBookings);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchAndIndexMyBookings();
    }, []);

    const DetailItem = ({ icon: Icon, label, value, className = "" }) => (
        <div className={`flex items-start space-x-3 ${className}`}>
            <div className="mt-1">
                <Icon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1">
                <div className="text-sm text-gray-500">{label}</div>
                <div className="text-base mt-1 font-medium">{value}</div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-3xl font-bold mb-8 text-left">My Rides</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card className="mb-8">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-bold">
                                {format(currentDate, "MMMM yyyy")}
                            </CardTitle>
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handlePrevMonth}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleNextMonth}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-7 gap-2 mb-4">
                                {[
                                    "Sun",
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat",
                                ].map((day) => (
                                    <div
                                        key={day}
                                        className="text-center font-medium text-gray-500 py-2"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                                {monthDays.map((day, dayIdx) => {
                                    const dateKey = format(day, "yyyy-MM-dd");
                                    const dayRides =
                                        bookingsByDate[dateKey] || [];
                                    return (
                                        <Button
                                            key={day.toString()}
                                            variant="outline"
                                            className={`
                        h-20 p-2 flex flex-col items-start justify-start
                        ${!isSameMonth(day, currentDate) ? "opacity-50" : ""}
                        ${isToday(day) ? "border-blue-500 border-2" : ""}
                        ${isSameDay(day, selectedDate) ? "bg-blue-100" : ""}
                      `}
                                            onClick={() => handleDateClick(day)}
                                        >
                                            <span
                                                className={`text-sm font-medium ${
                                                    isToday(day)
                                                        ? "text-blue-600"
                                                        : ""
                                                }`}
                                            >
                                                {format(day, "d")}
                                            </span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {dayRides
                                                    .slice(0, 3)
                                                    .map((ride) => (
                                                        <div
                                                            key={ride.id}
                                                            className={`w-2 h-2 rounded-full ${
                                                                statusColors[
                                                                    ride.status
                                                                ].split(" ")[0]
                                                            }`}
                                                        ></div>
                                                    ))}
                                            </div>
                                        </Button>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {selectedDate
                                    ? format(selectedDate, "MMMM d, yyyy")
                                    : "Select a date to view rides"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            {selectedDateRides.length > 0 ? (
                                <ScrollArea className="h-[500px] w-full pr-4">
                                    <div className="space-y-4">
                                        {selectedDateRides.map((ride) => (
                                            <Card
                                                key={ride.id}
                                                className="hover:shadow-md transition-shadow duration-200"
                                            >
                                                <CardContent className="p-6">
                                                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                                                        <div className="flex-grow space-y-4">
                                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                                <div className="flex items-center space-x-2">
                                                                    <Clock className="h-5 w-5 text-gray-400" />
                                                                    <span className="font-bold">
                                                                        {new Date(
                                                                            "2024-11-09T16:56:00.000Z"
                                                                        ).toLocaleTimeString(
                                                                            [],
                                                                            {
                                                                                hour: "2-digit",
                                                                                minute: "2-digit",
                                                                            }
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-3">
                                                                <div className="flex items-center space-x-2">
                                                                    <User className="h-4 w-4 text-gray-400" />
                                                                    <span className="text-sm text-gray-600">
                                                                        {
                                                                            ride
                                                                                .driver
                                                                                .username
                                                                        }
                                                                    </span>
                                                                </div>

                                                                <div className="flex items-center space-x-2">
                                                                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                                                    <span className="text-sm text-gray-600">
                                                                        {
                                                                            ride
                                                                                .route
                                                                                .from
                                                                        }{" "}
                                                                        →{" "}
                                                                        {
                                                                            ride
                                                                                .route
                                                                                .to
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col items-end space-y-3 min-w-[120px]">
                                                            <Badge
                                                                variant="secondary"
                                                                className={`${
                                                                    statusColors[
                                                                        ride
                                                                            .status
                                                                    ]
                                                                } uppercase font-semibold px-3 py-1`}
                                                            >
                                                                {ride.status}
                                                            </Badge>
                                                            <span className="text-xl font-bold text-green-600">
                                                                $
                                                                {
                                                                    ride
                                                                        .bookings[0]
                                                                        .farePaid
                                                                }
                                                            </span>

                                                            {ride.rating && (
                                                                <StarRating
                                                                    rating={
                                                                        ride.rating
                                                                    }
                                                                />
                                                            )}

                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="w-full sm:w-auto"
                                                                onClick={() =>
                                                                    handleRideClick(
                                                                        ride
                                                                    )
                                                                }
                                                            >
                                                                View Details
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollArea>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
                                    <div className="text-gray-400">
                                        <MapPin className="w-12 h-12" />
                                    </div>
                                    <p className="text-gray-500 text-lg">
                                        No rides scheduled for this day
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Rides</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[600px]">
                                <div className="space-y-4">
                                    {upcomingRides.map((ride) => (
                                        <Card
                                            key={ride.id}
                                            className={
                                                isToday(parseISO(ride.scheduledFor))
                                                    ? "border-blue-500 border-2"
                                                    : ""
                                            }
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-lg font-semibold">
                                                        {format(
                                                            parseISO(
                                                                ride.scheduledFor
                                                            ),
                                                            "MMM d"
                                                        )}{" "}
                                                        -{" "}
                                                        {new Date(
                                                            ride.scheduledFor
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                    </span>
                                                    <Badge
                                                        variant="secondary"
                                                        className={`${
                                                            statusColors[
                                                                ride.status
                                                            ]
                                                        } uppercase`}
                                                    >
                                                        {ride.status}
                                                    </Badge>
                                                </div>
                                                <div className="text-sm text-gray-600 mb-2">
                                                    {ride.route.from} to{" "}
                                                    {ride.route.to}
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={() =>
                                                        handleRideClick(ride)
                                                    }
                                                >
                                                    View Details
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog
                open={!!selectedRide}
                onOpenChange={(open) => !open && setSelectedRide(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ride Details</DialogTitle>
                    </DialogHeader>
                    {selectedRide && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">
                                    {format(
                                        parseISO(selectedRide.scheduledFor),
                                        "MMM d"
                                    )}{" "}
                                    -{" "}
                                    {new Date(
                                        selectedRide.scheduledFor
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                                <Badge
                                    variant="secondary"
                                    className={`${
                                        statusColors[selectedRide.status]
                                    } uppercase`}
                                >
                                    {selectedRide.status}
                                </Badge>
                            </div>
                            <div>
                                <div className="font-medium">Driver</div>
                                <div>{selectedRide.driver.username}</div>
                            </div>
                            <div>
                                <div className="font-medium">Route</div>
                                <div>
                                    {selectedRide.route.from} to{" "}
                                    {selectedRide.route.to}
                                </div>
                            </div>
                            <div>
                                <div className="font-medium">Price</div>
                                <div>${selectedRide.bookings[0].farePaid}</div>
                            </div>
                            {selectedRide.rating && (
                                <div>
                                    <div className="font-medium">Rating</div>
                                    <StarRating rating={selectedRide.rating} />
                                </div>
                            )}
                            <div className="flex justify-end space-x-2">
                                {selectedRide.status === "SCHEDULED" && (
                                    <Button
                                        variant="destructive"
                                        onClick={handleCancelRide}
                                    >
                                        Cancel Booking
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    onClick={handleContactDriver}
                                >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Contact Driver
                                </Button>
                                {selectedRide.status === "completed" &&
                                    !selectedRide.rating && (
                                        <Button
                                            variant="outline"
                                            onClick={handleRateRide}
                                        >
                                            <StarIcon className="mr-2 h-4 w-4" />
                                            Rate Ride
                                        </Button>
                                    )}
                                {selectedRide.status === "COMPLETED" && (
                                    <Button
                                        variant="outline"
                                        onClick={handleFileComplaint}
                                    >
                                        <AlertTriangle className="mr-2 h-4 w-4" />
                                        File Complaint
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* <ViewRideDialog
                selectedRide={selectedRide}
                setSelectedRide={setSelectedRide}
            /> */}

            <Dialog
                open={isMessageDialogOpen}
                onOpenChange={setIsMessageDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Message Driver</DialogTitle>
                    </DialogHeader>
                    <Textarea
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[100px]"
                    />
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsMessageDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSendMessage}>
                            Send Message
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isRatingDialogOpen}
                onOpenChange={setIsRatingDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rate Your Ride</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Rating</Label>
                            <StarRating rating={rating} onRate={setRating} />
                        </div>
                        <div>
                            <Label>Comment (Optional)</Label>
                            <Textarea
                                placeholder="Leave a comment about your ride..."
                                value={ratingComment}
                                onChange={(e) =>
                                    setRatingComment(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsRatingDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSubmitRating}>
                            Submit Rating
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isComplaintDialogOpen}
                onOpenChange={setIsComplaintDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>File a Complaint</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Complaint Category</Label>
                            <Select
                                value={complaintCategory || ""}
                                onValueChange={setComplaintCategory}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {complaintCategories.map((category) => (
                                        <SelectItem
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                placeholder="Describe your complaint..."
                                value={complaintComment}
                                onChange={(e) =>
                                    setComplaintComment(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsComplaintDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSubmitComplaint}>
                            Submit Complaint
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isConfirmDialogOpen}
                onOpenChange={setIsConfirmDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Action</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>{confirmMessage}</DialogDescription>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsConfirmDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={confirmAction}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
