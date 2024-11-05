"use client";

import { useEffect, useState } from "react";
import { MapPin, CreditCard, Car, Plus, X, CheckCircle2 } from "lucide-react";
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const PAYMENT_METHODS = [
    {
        id: "visa",
        name: "Visa",
        icon: "/visa.svg",
        description: "**** **** **** 1234",
    },
    {
        id: "mastercard",
        name: "Mastercard",
        icon: "/mastercard.svg",
        description: "**** **** **** 5678",
    },
    {
        id: "paypal",
        name: "PayPal",
        icon: "/paypal.svg",
        description: "john.doe@example.com",
    },
    {
        id: "apple_pay",
        name: "Apple Pay",
        icon: "/applepay.svg",
        description: "iPhone 14 Pro",
    },
    {
        id: "google_pay",
        name: "Google Pay",
        icon: "/gpay.svg",
        description: "Personal Account",
    },
];

// Helper function to generate random ride data for the past year
const generateRideData = () => {
    const today = new Date()
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    const data = {}
    
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split('T')[0]
      data[key] = Math.floor(Math.random() * 5) // 0 to 4 rides per day
    }
    
    return data
  }
  
  const rideData = generateRideData()

export default function UserProfile() {
    const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [selectedPayments, setSelectedPayments] = useState([]);

    const handlePaymentMethodToggle = (paymentId) => {
        setSelectedPayments((prev) =>
            prev.includes(paymentId)
                ? prev.filter((id) => id !== paymentId)
                : [...prev, paymentId]
        );
    };

    const handleAddNewVehicle = async (event) => {
        event.preventDefault();
        try {
            // Get form data
            const vehicleData = {
                type: event.target["vehicle-type"].value,
                make: event.target["make"].value,
                model: event.target["model"].value,
                seats: event.target["seats"].value,
                year: event.target["year"].value,
                licensePlate: event.target["license-plate"].value,
            };

            // Send POST request to the API
            const response = await axios.post(
                "/api/register-vehicle",
                vehicleData
            );

            // Update the vehicles state with the response data
            setVehicles((prevVehicles) => [
                ...prevVehicles,
                response.data.data,
            ]);
            setIsAddVehicleOpen(false);
        } catch (error) {
            console.error("Error registering vehicle:", error);
        }
    };

    useEffect(() => {
        const fetchVehicles = async () => {
            const response = await axios.get("/api/get-vehicles");
            console.log(response);
            setVehicles(response.data.data);
        };
        fetchVehicles();
    }, []);
    const [hoveredDay, setHoveredDay] = useState(null)

  const getColor = (count) => {
    if (count === 0) return 'bg-gray-100'
    if (count === 1) return 'bg-green-200'
    if (count === 2) return 'bg-green-300'
    if (count === 3) return 'bg-green-400'
    return 'bg-green-600'
  }

    const renderHeatmap = () => {
        const cells = Object.entries(rideData).map(([date, count]) => (
          <TooltipProvider key={date}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`w-3 h-3 rounded-sm ${getColor(count)}`}
                  onMouseEnter={() => setHoveredDay({ date, count })}
                  onMouseLeave={() => setHoveredDay(null)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{date}: {count} ride{count !== 1 ? 's' : ''}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))
    
        return (
          <div className="grid grid-cols-[repeat(53,_1fr)] gap-1 mb-4">
            {cells}
          </div>
        )
      }

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="flex items-center gap-4 mb-8">
                <img
                    src={`https://api.dicebear.com/9.x/notionists/svg?seed=abcd`}
                    alt={`abcd`}
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                    <h1 className="text-2xl font-bold">John Doe</h1>
                    <div className="flex items-center">
                        <span className="text-yellow-400">★★★★☆</span>
                        <span className="ml-2 text-sm text-gray-600">
                            4.5 (120 rides)
                        </span>
                    </div>
                </div>
            </header>

            <Tabs defaultValue="trip-history">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="trip-history">
                        <MapPin className="w-4 h-4 mr-2" />
                        Trip History
                    </TabsTrigger>
                    <TabsTrigger value="payment-methods">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Payment Methods
                    </TabsTrigger>
                    <TabsTrigger value="vehicle-info">
                        <Car className="w-4 h-4 mr-2" />
                        Vehicle Info
                    </TabsTrigger>
                </TabsList>
                {/* <TabsContent value="trip-history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Trip History</CardTitle>
                            <CardDescription>
                                View your past rides on the map
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">
                                    Interactive Map View
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent> */}
                <TabsContent value="trip-history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Trip History</CardTitle>
                            <CardDescription>
                                View your past rides on the map and yearly
                                overview
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6">
                                <h3 className="text-sm font-medium mb-2">
                                    Ride Frequency (Past Year)
                                </h3>
                                {renderHeatmap()}
                            </div>
                            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">
                                    Interactive Map View
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="payment-methods">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Methods</CardTitle>
                            <CardDescription>
                                Select your preferred payment methods
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {PAYMENT_METHODS.map((method) => (
                                    <div
                                        key={method.id}
                                        onClick={() =>
                                            handlePaymentMethodToggle(method.id)
                                        }
                                        className={cn(
                                            "p-4 rounded-lg border-2 cursor-pointer transition-all",
                                            "hover:border-blue-500 hover:bg-blue-50",
                                            selectedPayments.includes(method.id)
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={method.icon}
                                                    alt={`${method.name} icon`}
                                                    className="w-6 h-6"
                                                />
                                                <div>
                                                    <h3 className="font-medium">
                                                        {method.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {method.description}
                                                    </p>
                                                </div>
                                            </div>
                                            {selectedPayments.includes(
                                                method.id
                                            ) && (
                                                <CheckCircle2 className="w-6 h-6 text-blue-500" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button>Save Payment Preferences</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="vehicle-info">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Vehicle Information</CardTitle>
                                <CardDescription>
                                    Manage your registered vehicles
                                </CardDescription>
                            </div>
                            <Button onClick={() => setIsAddVehicleOpen(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Vehicle
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {vehicles.map((vehicle) => (
                                    <Card key={vehicle.id}>
                                        <CardHeader>
                                            <CardTitle>
                                                {vehicle.make +
                                                    " " +
                                                    vehicle.model}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>
                                                Type:{" "}
                                                {vehicle.type.toLowerCase()}
                                            </p>
                                            <p>Seats: {vehicle.seats}</p>
                                            <p>Model: {vehicle.year}</p>
                                            <p>
                                                License Plate:{" "}
                                                {vehicle.licensePlate}
                                            </p>
                                            <p>
                                                Registration Date:{" "}
                                                {
                                                    new Date(vehicle.createdAt)
                                                        .toISOString()
                                                        .split("T")[0]
                                                }
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add New Vehicle</DialogTitle>
                        <DialogDescription>
                            Enter the details of your new vehicle here
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddNewVehicle} className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="vehicle-type">
                                    Vehicle Type
                                </Label>
                                <Select name="vehicle-type">
                                    <SelectTrigger id="vehicle-type">
                                        <SelectValue placeholder="Select vehicle type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SEDAN">
                                            Sedan
                                        </SelectItem>
                                        <SelectItem value="SUV">SUV</SelectItem>
                                        <SelectItem value="VAN">Van</SelectItem>
                                        <SelectItem value="COUPE">
                                            Coupe
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="make">Make</Label>
                                <Input
                                    id="make"
                                    name="make"
                                    placeholder="Enter make"
                                />
                            </div>
                            <div>
                                <Label htmlFor="model">Model</Label>
                                <Input
                                    id="model"
                                    name="model"
                                    placeholder="Enter model"
                                />
                            </div>
                            <div>
                                <Label htmlFor="seats">Seat Count</Label>
                                <Input
                                    min={2}
                                    id="seats"
                                    name="seats"
                                    type="number"
                                    placeholder="Enter seat count"
                                />
                            </div>
                            <div>
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    name="year"
                                    type="number"
                                    placeholder="Enter year of vehicle registration"
                                />
                            </div>
                            <div>
                                <Label htmlFor="license-plate">
                                    License Plate
                                </Label>
                                <Input
                                    id="license-plate"
                                    name="license-plate"
                                    placeholder="Enter license plate"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add Vehicle</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
