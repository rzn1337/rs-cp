'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, User, CarFront } from "lucide-react"

interface Passenger {
  id: string
  name: string
  avatar: string
}

interface Car {
  id: string
  name: string
}

interface Ride {
  id: string
  from: string
  to: string
  date: string
  time: string
  price: string
  carId: string
  car: Car
  status: string
  passengers: Passenger[]
  driver: {
    name: string
    avatar: string
  }
}

interface ViewRideDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  ride: Ride | null
}

export default function ViewRideDetailsDialog({ isOpen, onClose, ride }: ViewRideDetailsDialogProps) {
  if (!ride) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-500 hover:bg-blue-600'
      case 'In Progress':
        return 'bg-yellow-500 hover:bg-yellow-600'
      case 'Completed':
        return 'bg-green-500 hover:bg-green-600'
      case 'Cancelled':
        return 'bg-red-500 hover:bg-red-600'
      default:
        return 'bg-gray-500 hover:bg-gray-600'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Ride Details</DialogTitle>
          <DialogDescription>
            View the details of your ride.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{ride.from} to {ride.to}</h3>
            <Badge className={getStatusColor(ride.status)}>{ride.status}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 opacity-70" />
              <span>{ride.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 opacity-70" />
              <span>{ride.time}</span>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 opacity-70" />
            <span>{ride.from} → {ride.to}</span>
          </div>
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4 opacity-70" />
            <span>Driver: {ride.driver.name}</span>
          </div>
          <div className="flex items-center">
            <CarFront className="mr-2 h-4 w-4 opacity-70" />
            <span>Vehicle: {ride.car.name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Price:</span>
            <span>{ride.price}</span>
          </div>
          <div>
            <Label className="text-base">Passengers:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {ride.bookings.map((passenger) => (
                <div key={passenger.id} className="flex items-center bg-secondary rounded-full pl-1 pr-3 py-1">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${passenger.name}`} alt={passenger.name} />
                    <AvatarFallback>{passenger.avatar}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{passenger.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}