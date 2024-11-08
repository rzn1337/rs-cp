import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const AddVehicleDialog = ({ isOpen, onOpenChange, onSubmit }) => {
    const [seatCount, setSeatCount] = useState(2);
    const [premiumSeats, setPremiumSeats] = useState([]);

    const handleAddNewVehicle = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        // Create seats array based on seat count
        const seats = Array.from({ length: parseInt(seatCount) }, (_, index) => ({
            seatNumber: index + 1,
            isPremium: premiumSeats.includes(index + 1)
        }));

        const vehicleData = {
            make: formData.get('make'),
            model: formData.get('model'),
            year: parseInt(formData.get('year')),
            type: formData.get('vehicle-type'),
            licensePlate: formData.get('license-plate'),
            seats: seats
        };

        onSubmit(vehicleData);
        
    };

    const handleSeatPremiumToggle = (seatNumber) => {
        setPremiumSeats(prev => 
            prev.includes(seatNumber)
                ? prev.filter(num => num !== seatNumber)
                : [...prev, seatNumber]
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                            <Label htmlFor="vehicle-type">Vehicle Type</Label>
                            <Select name="vehicle-type" defaultValue="SEDAN">
                                <SelectTrigger id="vehicle-type">
                                    <SelectValue placeholder="Select vehicle type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SEDAN">Sedan</SelectItem>
                                    <SelectItem value="SUV">SUV</SelectItem>
                                    <SelectItem value="VAN">Van</SelectItem>
                                    <SelectItem value="COUPE">Coupe</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="make">Make</Label>
                            <Input
                                id="make"
                                name="make"
                                placeholder="Enter make"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="model">Model</Label>
                            <Input
                                id="model"
                                name="model"
                                placeholder="Enter model"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="seats">Seat Count</Label>
                            <Input
                                min={2}
                                max={8}
                                id="seats"
                                type="number"
                                value={seatCount}
                                onChange={(e) => setSeatCount(parseInt(e.target.value))}
                                placeholder="Enter seat count"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Premium Seats</Label>
                            <div className="grid grid-cols-4 gap-2">
                                {Array.from({ length: seatCount }, (_, i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`seat-${i + 1}`}
                                            checked={premiumSeats.includes(i + 1)}
                                            onCheckedChange={() => handleSeatPremiumToggle(i + 1)}
                                        />
                                        <Label htmlFor={`seat-${i + 1}`} className="text-sm">
                                            Seat {i + 1}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="year">Year</Label>
                            <Input
                                id="year"
                                name="year"
                                type="number"
                                min={1900}
                                max={new Date().getFullYear() + 1}
                                placeholder="Enter year of vehicle registration"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="license-plate">License Plate</Label>
                            <Input
                                id="license-plate"
                                name="license-plate"
                                placeholder="Enter license plate"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Vehicle</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddVehicleDialog;