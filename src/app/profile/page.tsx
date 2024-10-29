"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import { User } from "lucide-react";
import axios from "axios";

// Dummy user data
const user = {
    id: 1,
    username: "johndoe",
    email: "john.doe@example.com",
    avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=johndoe",
};

// Dummy vehicle data
const initialVehicles = [
    {
        id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2020,
        licensePlate: "ABC123",
        seats: 4,
    },
];

export default function UserProfile() {
    // const [vehicles, setVehicles] = useState(initialVehicles);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {};
        fetchVehicles();
    }, []);

    const [newVehicle, setNewVehicle] = useState({
        make: "",
        model: "",
        year: "",
        licensePlate: "",
        seats: "",
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewVehicle((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = vehicles.length + 1;
        setVehicles((prev) => [...prev, { id, ...newVehicle }]);
        const response = await axios.post("/api/register-vehicle", newVehicle);
        console.log("response", response);
        setNewVehicle({
            make: "",
            model: "",
            year: "",
            licensePlate: "",
            seats: "",
        });
        setIsDialogOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="mb-8">
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage
                                src={user.avatarUrl}
                                alt={user.username}
                            />
                            <AvatarFallback>
                                <User className="h-10 w-10" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">
                                {user.username}
                            </CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">
                        Registered Vehicles
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Make</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>Seats</TableHead>
                                <TableHead>License Plate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehicles.map((vehicle) => (
                                <TableRow key={vehicle.id}>
                                    <TableCell>{vehicle.make}</TableCell>
                                    <TableCell>{vehicle.model}</TableCell>
                                    <TableCell>{vehicle.year}</TableCell>
                                    <TableCell>{vehicle.seats}</TableCell>
                                    <TableCell>
                                        {vehicle.licensePlate}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>Register New Vehicle</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>
                                        Register New Vehicle
                                    </DialogTitle>
                                    <DialogDescription>
                                        Enter the details of your new vehicle
                                        here. Click save when you&apos;re done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="make"
                                            className="text-right"
                                        >
                                            Make
                                        </Label>
                                        <Input
                                            id="make"
                                            name="make"
                                            value={newVehicle.make}
                                            onChange={handleInputChange}
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="model"
                                            className="text-right"
                                        >
                                            Model
                                        </Label>
                                        <Input
                                            id="model"
                                            name="model"
                                            value={newVehicle.model}
                                            onChange={handleInputChange}
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="year"
                                            className="text-right"
                                        >
                                            Year
                                        </Label>
                                        <Input
                                            id="year"
                                            name="year"
                                            type="number"
                                            value={newVehicle.year}
                                            onChange={handleInputChange}
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="seats"
                                            className="text-right"
                                        >
                                            Number of Seats
                                        </Label>
                                        <Input
                                            id="seats"
                                            name="seats"
                                            value={newVehicle.seats}
                                            onChange={handleInputChange}
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="licensePlate"
                                            className="text-right"
                                        >
                                            License Plate
                                        </Label>
                                        <Input
                                            id="licensePlate"
                                            name="licensePlate"
                                            value={newVehicle.licensePlate}
                                            onChange={handleInputChange}
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save Vehicle</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>
    );
}
