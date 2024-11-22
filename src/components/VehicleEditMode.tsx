import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface VehicleEditModeProps {
    vehicle: {
        make: string;
        model: string;
        year: number;
        licensePlate: string;
        vehicleType: string;
        seats: number;
        createdDate: string;
    };
    onChange: (updatedVehicle: any) => void;
    onSave: () => void;
    onCancel: () => void;
}

export function VehicleEditMode({
    vehicle,
    onChange,
    onSave,
    onCancel,
}: VehicleEditModeProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...vehicle, [name]: value });
    };

    return (
        <>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="make" className="text-right">
                        Make
                    </Label>
                    <Input
                        id="make"
                        name="make"
                        value={vehicle.make}
                        onChange={handleInputChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="model" className="text-right">
                        Model
                    </Label>
                    <Input
                        id="model"
                        name="model"
                        value={vehicle.model}
                        onChange={handleInputChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">
                        Year
                    </Label>
                    <Input
                        id="year"
                        name="year"
                        type="number"
                        value={vehicle.year}
                        onChange={handleInputChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="licensePlate" className="text-right">
                        License Plate
                    </Label>
                    <Input
                        id="licensePlate"
                        name="licensePlate"
                        value={vehicle.licensePlate}
                        onChange={handleInputChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="vehicleType" className="text-right">
                        Vehicle Type
                    </Label>
                    <Input
                        id="vehicleType"
                        name="vehicleType"
                        value={vehicle.vehicleType}
                        onChange={handleInputChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="seats" className="text-right">
                        Seats
                    </Label>
                    <Input
                        id="seats"
                        name="seats"
                        type="number"
                        value={vehicle.seats}
                        onChange={handleInputChange}
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={onSave}>Save Changes</Button>
            </DialogFooter>
        </>
    );
}
