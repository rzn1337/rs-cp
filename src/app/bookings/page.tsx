'use client'

import React, { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChevronDown,
  ChevronUp,
  Search,
  Calendar,
  Star,
  MessageSquare,
  AlertCircle,
  Clock,
  MapPin,
  Car,
  Receipt,
  Flag
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { format } from 'date-fns'

// Types
type RideStatus = 'COMPLETED' | 'CANCELLED' | 'UPCOMING'

interface Driver {
  name: string
  rating: number
  vehicleModel: string
  licensePlate: string
}

interface PastRide {
  id: number
  date: string
  time: string
  pickup: string
  destination: string
  status: RideStatus
  fare: number
  driver: Driver
  totalDistance: string
  duration: string
  bookedSeats: number
  rating?: number
  hasComplaint?: boolean
}

// Sample data
const pastRides: PastRide[] = [
  {
    id: 1,
    date: '2024-03-15',
    time: '14:30',
    pickup: 'Downtown Station',
    destination: 'Airport Terminal 1',
    status: 'COMPLETED',
    fare: 45,
    driver: {
      name: 'John Smith',
      rating: 4.8,
      vehicleModel: 'Toyota Camry 2022',
      licensePlate: 'ABC 123'
    },
    totalDistance: '15.5 miles',
    duration: '45 mins',
    bookedSeats: 2,
    rating: 5
  },
  {
    id: 2,
    date: '2024-03-14',
    time: '09:15',
    pickup: 'Suburban Mall',
    destination: 'City Center',
    status: 'CANCELLED',
    fare: 0,
    driver: {
      name: 'Sarah Johnson',
      rating: 4.9,
      vehicleModel: 'Honda CR-V 2023',
      licensePlate: 'XYZ 789'
    },
    totalDistance: '12.3 miles',
    duration: '35 mins',
    bookedSeats: 1
  },
  {
    id: 3,
    date: '2024-03-13',
    time: '18:45',
    pickup: 'University Campus',
    destination: 'Sports Stadium',
    status: 'COMPLETED',
    fare: 30,
    driver: {
      name: 'Mike Wilson',
      rating: 4.7,
      vehicleModel: 'Ford Escape 2021',
      licensePlate: 'DEF 456'
    },
    totalDistance: '8.7 miles',
    duration: '25 mins',
    bookedSeats: 1,
    rating: 4,
    hasComplaint: true
  }
]

const ComplaintDialog = ({ ride }: { ride: PastRide }) => {
  const [complaintText, setComplaintText] = useState('')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Flag className="h-4 w-4 mr-2" />
          File Complaint
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>File a Complaint</DialogTitle>
          <DialogDescription>
            Please provide details about your issue with this ride. Our support team will review it.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Ride Details</h4>
            <p className="text-sm text-gray-600">
              {format(new Date(ride.date), 'MMM d, yyyy')} at {ride.time}
            </p>
            <p className="text-sm text-gray-600">
              {ride.pickup} → {ride.destination}
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="complaint" className="text-sm font-medium">
              Describe your issue
            </label>
            <Textarea
              id="complaint"
              placeholder="Please provide specific details about your complaint..."
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              className="h-32"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button onClick={() => alert('Complaint submitted')}>Submit Complaint</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${
          star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))}
  </div>
)

const RideCard = ({ ride, isExpanded, onToggle }: { ride: PastRide, isExpanded: boolean, onToggle: () => void }) => (
  <Card className="hover:bg-gray-100 transition-colors">
    <CardContent className="p-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      >
        <div>
          <p className="font-semibold">
            {format(new Date(ride.date), 'MMM d, yyyy')} at {ride.time}
          </p>
          <p className="text-sm text-gray-600">
            {ride.pickup} → {ride.destination}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            ${ride.fare} • {ride.bookedSeats} seat{ride.bookedSeats > 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              ride.status === 'COMPLETED' ? 'success' :
              ride.status === 'CANCELLED' ? 'destructive' : 'secondary'
            }
          >
            {ride.status}
          </Badge>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Ride Details</h4>
              <div className="space-y-2">
                <p className="text-sm flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  Duration: {ride.duration}
                </p>
                <p className="text-sm flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  Distance: {ride.totalDistance}
                </p>
                <p className="text-sm flex items-center">
                  <Car className="h-4 w-4 mr-2 text-gray-500" />
                  Vehicle: {ride.driver.vehicleModel}
                </p>
                <p className="text-sm flex items-center">
                  <Receipt className="h-4 w-4 mr-2 text-gray-500" />
                  License Plate: {ride.driver.licensePlate}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Driver Information</h4>
              <div className="space-y-2">
                <p className="text-sm">{ride.driver.name}</p>
                <div className="flex items-center space-x-2">
                  <RatingStars rating={ride.driver.rating} />
                  <span className="text-sm text-gray-600">
                    {ride.driver.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              {ride.status === 'COMPLETED' && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Your Rating</h4>
                  {ride.rating ? (
                    <div className="flex items-center space-x-2">
                      <RatingStars rating={ride.rating} />
                      <span className="text-sm text-gray-600">
                        {ride.rating.toFixed(1)}
                      </span>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Star className="h-4 w-4 mr-2" />
                      Rate this ride
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <ComplaintDialog ride={ride} />
            <Button size="sm" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button size="sm" variant="outline">
              <Receipt className="h-4 w-4 mr-2" />
              View Receipt
            </Button>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
)

export default function PassengerPastRidesPage() {
  const [expandedPastRide, setExpandedPastRide] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredRides = useMemo(() => {
    return pastRides.filter(ride => {
      const matchesSearch = 
        ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.driver.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = 
        filterStatus === 'all' || 
        ride.status.toLowerCase() === filterStatus.toLowerCase()

      return matchesSearch && matchesFilter
    })
  }, [filterStatus, searchTerm])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Rides</h1>
        <p className="text-gray-600">View your ride history and manage bookings</p>
      </div>

      <div className="space-y-6">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            className="min-w-[100px]"
          >
            All Rides
          </Button>
          <Button 
            variant={filterStatus === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('completed')}
            className="min-w-[100px]"
          >
            Completed
          </Button>
          <Button 
            variant={filterStatus === 'cancelled' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('cancelled')}
            className="min-w-[100px]"
          >
            Cancelled
          </Button>
        </div>

        {/* Search and Date Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by location or driver name"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" aria-label="Select Date Range">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>

        {/* Rides List */}
        <ScrollArea className="h-[calc(100vh-300px)] pr-4">
          <div className="space-y-4">
            {filteredRides.map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                isExpanded={expandedPastRide === ride.id}
                onToggle={() => setExpandedPastRide(expandedPastRide === ride.id ? null : ride.id)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}