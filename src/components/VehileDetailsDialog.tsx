"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

// Vehicle interface to match the backend schema
interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    type: string;
    _count: {
        seats: number;
    };
    createdDate?: string;
}

// Props for the dialog


export function VehicleViewDialog({
    isOpen,
    onClose,
    vehicle,
    onSave,
    onDelete,
}) {
    // State management
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedVehicle, setEditedVehicle] = useState<Vehicle>(vehicle);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Handler functions
    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleSave = () => {
        onSave(editedVehicle);
        setIsEditMode(false);
    };

    const handleCancel = () => {
        setEditedVehicle(vehicle);
        setIsEditMode(false);
    };

    const handleDelete = () => {
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        onDelete();
        setIsDeleteDialogOpen(false);
        onClose();
    };

    // Input change handler for edit mode
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedVehicle((prev) => ({
            ...prev,
            [name]: name === "year" ? parseInt(value, 10) : value,
        }));
    };

    // Delete Confirmation Dialog
    const DeleteConfirmationDialog = () => (
        <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={() => setIsDeleteDialogOpen(false)}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Deregistration</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to deregister this vehicle? This
                        action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsDeleteDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={confirmDelete}>
                        Confirm Deregistration
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit Vehicle" : "Vehicle Details"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? "Make changes to vehicle information."
                            : "View and manage vehicle information."}
                    </DialogDescription>
                    {/* <Button
            variant="ghost"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button> */}
                </DialogHeader>

                {isEditMode ? (
                    // Edit Mode
                    <>
                        <div className="grid gap-4 py-4">
                            {[
                                { label: "Make", name: "make", type: "text" },
                                { label: "Model", name: "model", type: "text" },
                                { label: "Year", name: "year", type: "number" },
                                {
                                    label: "License Plate",
                                    name: "licensePlate",
                                    type: "text",
                                },
                                {
                                    label: "Vehicle Type",
                                    name: "type",
                                    type: "text",
                                },
                                {
                                    label: "Seats",
                                    name: "seats",
                                    type: "number",
                                    value: editedVehicle._count.seats,
                                },
                            ].map(({ label, name, type, value }) => (
                                <div
                                    key={name}
                                    className="grid grid-cols-4 items-center gap-4"
                                >
                                    <Label
                                        htmlFor={name}
                                        className="text-right"
                                    >
                                        {label}
                                    </Label>
                                    <Input
                                        id={name}
                                        name={name}
                                        type={type}
                                        value={
                                            name === "seats"
                                                ? value
                                                : editedVehicle[
                                                      name as keyof Vehicle
                                                  ]
                                        }
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>Save Changes</Button>
                        </DialogFooter>
                    </>
                ) : (
                    // View Mode
                    <>
                        <div className="grid gap-4 py-4">
                            {[
                                { label: "Make", value: vehicle.make },
                                { label: "Model", value: vehicle.model },
                                { label: "Year", value: vehicle.year },
                                {
                                    label: "License Plate",
                                    value: vehicle.licensePlate,
                                },
                                { label: "Vehicle Type", value: vehicle.type },
                                { label: "Seats", value: vehicle._count.seats },
                                {
                                    label: "Created Date",
                                    value: vehicle.createdDate
                                        ? new Date(
                                              vehicle.createdDate
                                          ).toLocaleDateString()
                                        : "N/A",
                                },
                            ].map(({ label, value }) => (
                                <div
                                    key={label}
                                    className="grid grid-cols-4 items-center gap-4"
                                >
                                    <span className="font-medium">
                                        {label}:
                                    </span>
                                    <span className="col-span-3">{value}</span>
                                </div>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleEdit}>
                                Edit Details
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                            >
                                Delete Vehicle
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {/* Delete Confirmation Dialog */}
                <DeleteConfirmationDialog />
            </DialogContent>
        </Dialog>
    );
}
