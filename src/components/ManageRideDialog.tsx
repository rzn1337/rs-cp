'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, UserMinus, Users } from 'lucide-react'

// This would typically come from your app's global state or be passed as a prop
const initialRide = {
  id: '1',
  date: '2024-03-15',
  time: '14:00',
  pickup: '123 Main St',
  destination: '456 Elm St',
  seatsBooked: 3,
  passengers: [
    { id: '1', name: 'Alice Johnson', avatar: '/avatars/alice.jpg' },
    { id: '2', name: 'Bob Smith', avatar: '/avatars/bob.jpg' },
    { id: '3', name: 'Carol Davis', avatar: '/avatars/carol.jpg' },
  ]
}

export default function ManageRideDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [ride, setRide] = useState(initialRide)
  const [messageDialogOpen, setMessageDialogOpen] = useState(false)
  const [selectedPassenger, setSelectedPassenger] = useState(null)

  const handleUpdateRide = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const updatedRide = {
      ...ride,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      pickup: formData.get('pickup') as string,
      destination: formData.get('destination') as string,
    }
    setRide(updatedRide)
    // Here you would typically update the ride details in your backend
    alert('Ride details updated successfully!')
  }

  const handleRemovePassenger = (passengerId: string) => {
    const updatedPassengers = ride.passengers.filter(p => p.id !== passengerId)
    setRide({ ...ride, passengers: updatedPassengers, seatsBooked: updatedPassengers.length })
    // Here you would typically update the passenger list in your backend
    alert('Passenger removed successfully!')
  }

  const handleMessagePassenger = (passenger) => {
    setSelectedPassenger(passenger)
    setMessageDialogOpen(true)
  }

  const handleSendMessage = (message: string) => {
    // Here you would typically send the message to the passenger via your backend
    alert(`Message sent to ${selectedPassenger.name}: ${message}`)
    setMessageDialogOpen(false)
  }

  const handleStartGroupChat = () => {
    // Here you would typically initiate a group chat with all passengers
    alert('Group chat started with all passengers!')
  }

  const handleCancelRide = () => {
    // Here you would typically cancel the ride in your backend
    alert('Ride cancelled successfully!')
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Manage</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Ride</DialogTitle>
          <DialogDescription>
            Update ride details, manage passengers, or cancel the ride.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdateRide}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={ride.date}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                name="time"
                type="time"
                defaultValue={ride.time}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pickup" className="text-right">
                Pickup
              </Label>
              <Input
                id="pickup"
                name="pickup"
                defaultValue={ride.pickup}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="destination" className="text-right">
                Destination
              </Label>
              <Input
                id="destination"
                name="destination"
                defaultValue={ride.destination}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update Ride</Button>
          </DialogFooter>
        </form>
        <div className="mt-6">
          <h4 className="mb-4 font-semibold">Passengers ({ride.seatsBooked})</h4>
          <ScrollArea className="h-[200px]">
            {ride.passengers.map((passenger) => (
              <div key={passenger.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={passenger.avatar} alt={passenger.name} />
                    <AvatarFallback>{passenger.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{passenger.name}</span>
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMessagePassenger(passenger)}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePassenger(passenger.id)}
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={handleStartGroupChat}>
            <Users className="mr-2 h-4 w-4" />
            Start Group Chat
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Cancel Ride</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will cancel the ride and notify all passengers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Go back</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancelRide}>Yes, cancel ride</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogContent>
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message {selectedPassenger?.name}</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Type your message here."
            id="message"
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button onClick={() => handleSendMessage((document.getElementById('message') as HTMLTextAreaElement).value)}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  )
}