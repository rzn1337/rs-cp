import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  X,
  AlertCircle,
  Phone,
  Mail,
  Trash2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const RideManagementModal = ({ ride, isOpen, onClose, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRemovePassengerDialog, setShowRemovePassengerDialog] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [editedRide, setEditedRide] = useState({ ...ride });
  
  // Mock passenger data - replace with actual data in production
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      seats: 2,
      avatar: null
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1987654321",
      seats: 1,
      avatar: null
    }
  ]);

  const handleInputChange = (e) => {
    setEditedRide({
      ...editedRide,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate(editedRide);
      onClose();
    } catch (error) {
      console.error('Error updating ride:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRide = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate({ ...editedRide, status: 'cancelled' });
      setShowCancelDialog(false);
      onClose();
    } catch (error) {
      console.error('Error cancelling ride:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePassenger = async (passengerId) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPassengers(passengers.filter(p => p.id !== passengerId));
      setEditedRide({
        ...editedRide,
        seatsBooked: editedRide.seatsBooked - selectedPassenger.seats
      });
      setShowRemovePassengerDialog(false);
      setSelectedPassenger(null);
    } catch (error) {
      console.error('Error removing passenger:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Manage Ride</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Edit Ride Details Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={editedRide.date}
                        onChange={handleInputChange}
                        className="pl-8"
                      />
                      <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <div className="relative">
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={editedRide.time}
                        onChange={handleInputChange}
                        className="pl-8"
                      />
                      <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <div className="relative">
                      <Input
                        id="pickup"
                        name="pickup"
                        value={editedRide.pickup}
                        onChange={handleInputChange}
                        className="pl-8"
                      />
                      <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative">
                      <Input
                        id="destination"
                        name="destination"
                        value={editedRide.destination}
                        onChange={handleInputChange}
                        className="pl-8"
                      />
                      <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passenger List Section */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Passengers ({passengers.length})</h3>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    {passengers.map((passenger) => (
                      <div key={passenger.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={passenger.avatar} />
                            <AvatarFallback>{passenger.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{passenger.name}</p>
                            <p className="text-sm text-gray-500">{passenger.seats} seats booked</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setSelectedPassenger(passenger);
                              setShowRemovePassengerDialog(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="space-x-2">
            <Button
              variant="destructive"
              onClick={() => setShowCancelDialog(true)}
              disabled={isLoading}
            >
              Cancel Ride
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Close
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Ride Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Ride</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this ride? This action cannot be undone
              and all passengers will be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>No, keep ride</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelRide}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground"
            >
              Yes, cancel ride
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Passenger Confirmation Dialog */}
      <AlertDialog open={showRemovePassengerDialog} onOpenChange={setShowRemovePassengerDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Passenger</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {selectedPassenger?.name} from this ride?
              They will be notified of this change.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleRemovePassenger(selectedPassenger?.id)}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground"
            >
              Remove Passenger
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RideManagementModal;