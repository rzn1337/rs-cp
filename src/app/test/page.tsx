"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ChevronUp, ChevronDown, Play, Pause, StopCircle, Edit, X, Trash, UserMinus, MessageSquare, MapPin, Clock, Users } from 'lucide-react'

export default function Component() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [rideStatus, setRideStatus] = useState('scheduled')
  const [isRideActive, setIsRideActive] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [isRemovePassengerDialogOpen, setIsRemovePassengerDialogOpen] = useState(false)
  const [selectedPassenger, setSelectedPassenger] = useState(null)

  const toggleExpand = () => setIsExpanded(!isExpanded)
  const toggleMinimize = () => setIsMinimized(!isMinimized)

  const startRide = () => {
    setIsRideActive(true)
    setRideStatus('in-progress')
  }

  const pauseRide = () => {
    setRideStatus('paused')
  }

  const endRide = () => {
    setIsRideActive(false)
    setRideStatus('completed')
  }

  const openEditDialog = () => setIsEditDialogOpen(true)
  const closeEditDialog = () => setIsEditDialogOpen(false)

  const openCancelDialog = () => setIsCancelDialogOpen(true)
  const closeCancelDialog = () => setIsCancelDialogOpen(false)

  const openRemovePassengerDialog = (passenger) => {
    setSelectedPassenger(passenger)
    setIsRemovePassengerDialogOpen(true)
  }
  const closeRemovePassengerDialog = () => {
    setSelectedPassenger(null)
    setIsRemovePassengerDialogOpen(false)
  }

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500'
      case 'in-progress': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'completed': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const passengers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
  ]

  return (
    <>
      <motion.div
        className="fixed bottom-0 left-0 right-0 md:bottom-4 md:right-4 md:left-auto md:w-80 lg:w-96"
        animate={isMinimized ? { y: "calc(100% - 40px)" } : { y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card className="rounded-t-lg md:rounded-lg shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Ride Management</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={openEditDialog}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleExpand}>
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleMinimize}>
                  {isMinimized ? <ChevronUp className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <Badge className={`${getStatusBadgeColor(rideStatus)} text-white`}>
                {rideStatus.charAt(0).toUpperCase() + rideStatus.slice(1)}
              </Badge>
              <span className="text-sm font-medium">ETA: 15 mins</span>
            </div>

            <div className="flex justify-between gap-2 mb-4">
              <Button className="flex-1" onClick={startRide} disabled={isRideActive}>
                <Play className="w-4 h-4 mr-2" /> Start
              </Button>
              <Button className="flex-1" onClick={pauseRide} disabled={!isRideActive}>
                <Pause className="w-4 h-4 mr-2" /> Pause
              </Button>
              <Button className="flex-1" onClick={endRide} disabled={!isRideActive}>
                <StopCircle className="w-4 h-4 mr-2" /> End
              </Button>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold mb-2">Ride Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>123 Main St → 456 Elm St</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Scheduled for: 2:30 PM</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{passengers.length} passengers</span>
                      </div>
                    </div>

                    <h3 className="font-semibold mt-4 mb-2">Passengers</h3>
                    <div className="space-y-2">
                      {passengers.map((passenger) => (
                        <div key={passenger.id} className="flex items-center justify-between">
                          <span>{passenger.name}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => openRemovePassengerDialog(passenger)}>
                              <UserMinus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button variant="destructive" className="w-full mt-4" onClick={openCancelDialog}>
                      <Trash className="w-4 h-4 mr-2" /> Cancel Ride
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Ride</DialogTitle>
            <DialogDescription>Make changes to your scheduled ride.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="pickup">Pickup Location</Label>
              <Input id="pickup" defaultValue="123 Main St" />
            </div>
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input id="destination" defaultValue="456 Elm St" />
            </div>
            <div>
              <Label htmlFor="datetime">Date and Time</Label>
              <Input id="datetime" type="datetime-local" defaultValue="2023-06-15T14:30" />
            </div>
            <div>
              <Label htmlFor="stops">Additional Stops</Label>
              <Textarea id="stops" placeholder="Enter additional stops..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeEditDialog}>Cancel</Button>
            <Button onClick={closeEditDialog}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Ride</DialogTitle>
            <DialogDescription>Are you sure you want to cancel this ride?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cancelReason">Reason for Cancellation</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="change-of-plans">Change of plans</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="alternative-transport">Found alternative transport</SelectItem>
                  <SelectItem value="wrong-destination">Wrong destination entered</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cancelComment">Additional Comments (Optional)</Label>
              <Textarea id="cancelComment" placeholder="Enter any additional comments..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeCancelDialog}>Keep Ride</Button>
            <Button variant="destructive" onClick={closeCancelDialog}>Cancel Ride</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRemovePassengerDialogOpen} onOpenChange={setIsRemovePassengerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Passenger</DialogTitle>
            <DialogDescription>Are you sure you want to remove this passenger?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Passenger</Label>
              <p className="font-medium">{selectedPassenger?.name}</p>
            </div>
            <div>
              <Label htmlFor="removeReason">Reason for Removal</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-show">No-show</SelectItem>
                  <SelectItem value="passenger-request">Passenger request</SelectItem>
                  <SelectItem value="capacity-adjustment">Capacity adjustment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="removeComment">Additional Comments (Optional)</Label>
              <Textarea id="removeComment" placeholder="Enter any additional comments..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeRemovePassengerDialog}>Cancel</Button>
            <Button variant="destructive" onClick={closeRemovePassengerDialog}>Remove Passenger</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}