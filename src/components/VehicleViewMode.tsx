import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface VehicleViewModeProps {
    vehicle: {
        make: string;
        model: string;
        year: number;
        licensePlate: string;
        vehicleType: string;
        seats: number;
        createdDate: string;
    };
    onEdit: () => void;
    onDelete: () => void;
}

export function VehicleViewMode({
    vehicle,
    onEdit,
    onDelete,
}: VehicleViewModeProps) {
    return (
        <>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-medium">Make:</span>
                    <span className="col-span-3">{vehicle.make}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-medium">Model:</span>
                    <span className="col-span-3">{vehicle.model}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-medium">Year:</span>
                    <span className="col-span-3">{vehicle.year}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-medium">License Plate:</span>
                    <span className="col-span-3">{vehicle.licensePlate}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-medium">Vehicle Type:</span>
                    <span className="col-span-3">{vehicle.vehicleType}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-medium">Seats:</span>
                    <span className="col-span-3">{vehicle.seats}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-medium">Created Date:</span>
                    <span className="col-span-3">
                        {new Date(vehicle.createdDate).toLocaleDateString()}
                    </span>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onEdit}>
                    Edit Details
                </Button>
                <Button variant="destructive" onClick={onDelete}>
                    Delete/Deregister
                </Button>
            </DialogFooter>
        </>
    );
}
