'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { AlertTriangle, Clock, DollarSign, MapPin, MessageSquare, Star, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

// Assuming these functions are defined elsewhere
// import { handleCancelRide, handleContactDriver, handleRateRide, handleFileComplaint } from '@/lib/ride-actions'
import { StarRating } from './StarRating'


const statusColors = {
  SCHEDULED: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

const statusSteps = ['SCHEDULED', 'ENROUTE', 'COMPLETED']

export default function ViewRideDialog({ selectedRide, setSelectedRide }) {
  const [isOpen, setIsOpen] = useState(!!selectedRide)

  const onOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) setSelectedRide(null)
  }

  if (!selectedRide) return null

  const currentStatusIndex = statusSteps.indexOf(selectedRide.status)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Ride Details</DialogTitle>
            <Badge
              variant="secondary"
              className={`${statusColors[selectedRide.status]} uppercase px-3 py-1 text-sm font-medium`}
            >
              {selectedRide.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-8">
          {/* Status Timeline */}
          <div className="flex justify-between items-center">
            {statusSteps.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStatusIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <span className="mt-2 text-sm font-medium">{step}</span>
              </div>
            ))}
          </div>

          {/* Ride Overview */}
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <DetailItem
              icon={Clock}
              label="Scheduled Time"
              value={`${format(parseISO(selectedRide.scheduledFor), "MMM d")} - ${
                new Date(selectedRide.scheduledFor).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }`}
            />
            <DetailItem
              icon={User}
              label="Driver"
              value={selectedRide.driver.username}
            />
            <DetailItem
              icon={DollarSign}
              label="Fare"
              value={`$${selectedRide.bookings[0].farePaid}`}
              valueClassName="text-green-600 font-semibold"
            />
          </div>

          {/* Route */}
          <div className="bg-muted/50 rounded-lg p-6">
            <DetailItem
              icon={MapPin}
              label="Route"
              value={
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>{selectedRide.route.from}</span>
                  </div>
                  <div className="border-l-2 border-dashed border-primary/30 h-6 ml-1.5" />
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>{selectedRide.route.to}</span>
                  </div>
                </div>
              }
            />
          </div>

          {/* Rating */}
          {selectedRide.rating && (
            <div className="bg-muted/50 rounded-lg p-6">
              <DetailItem
                icon={Star}
                label="Rating"
                value={<StarRating rating={selectedRide.rating} />}
              />
            </div>
          )}

          <Separator className="my-6" />

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            {selectedRide.status === "SCHEDULED" && (
              <Button
                variant="destructive"
                onClick={()=> {}}
                className="w-full"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Cancel Ride
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={() => {}}
              className="w-full"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Driver
            </Button>

            {selectedRide.status === "COMPLETED" && !selectedRide.rating && (
              <Button
                variant="outline"
                onClick={() => {}}
                className="w-full"
              >
                <Star className="mr-2 h-4 w-4" />
                Rate Ride
              </Button>
            )}

            {selectedRide.status === "COMPLETED" && (
              <Button
                variant="outline"
                onClick={() => {}}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                File Complaint
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DetailItem({ icon: Icon, label, value, valueClassName = '' }) {
  return (
    <div className="flex items-start space-x-3">
      <Icon className="w-5 h-5 text-muted-foreground mt-0.5" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className={`mt-1 font-medium ${valueClassName}`}>{value}</p>
      </div>
    </div>
  )
}