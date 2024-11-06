'use client'

import React, { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChevronDown,
  ChevronUp,
  Search,
  Calendar,
  Download,
  DollarSign,
  Clock,
  Users,
  MapPin,
  AlertCircle
} from 'lucide-react'
import { format } from 'date-fns'

// Types
type RideStatus = 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
type Passenger = { name: string; rating: number }

interface PastRide {
  id: number
  date: string
  time: string
  pickup: string
  destination: string
  status: RideStatus
  seatsBooked: number
  earnings: number
  cancellationFee?: number
  passengerDetails: Passenger[]
  cancellationReason?: string
  totalDistance: string
  duration: string
  pricePerSeat: number
}

// Sample data
const pastRides: PastRide[] = [
  {
    id: 1,
    date: '2024-03-15',
    time: '14:30',
    pickup: 'Downtown Station',
    destination: 'Airport Terminal 1',
    status: 'CANCELLED',
    seatsBooked: 2,
    earnings: 45,
    cancellationFee: 10,
    passengerDetails: [
      { name: 'Sarah M.', rating: 4.8 },
      { name: 'Mike R.', rating: 4.9 }
    ],
    cancellationReason: 'Passenger no-show',
    totalDistance: '15.5 miles',
    duration: '45 mins',
    pricePerSeat: 25
  },
  {
    id: 2,
    date: '2024-03-14',
    time: '09:15',
    pickup: 'Suburban Mall',
    destination: 'City Center',
    status: 'COMPLETED',
    seatsBooked: 3,
    earnings: 60,
    passengerDetails: [
      { name: 'John D.', rating: 4.7 },
      { name: 'Emma S.', rating: 5.0 },
      { name: 'Alex W.', rating: 4.5 }
    ],
    totalDistance: '12.3 miles',
    duration: '35 mins',
    pricePerSeat: 20
  },
  {
    id: 3,
    date: '2024-03-13',
    time: '18:45',
    pickup: 'University Campus',
    destination: 'Sports Stadium',
    status: 'NO_SHOW',
    seatsBooked: 4,
    earnings: 0,
    cancellationFee: 15,
    passengerDetails: [
      { name: 'Group Booking', rating: 0 }
    ],
    cancellationReason: 'Passengers did not arrive',
    totalDistance: '8.7 miles',
    duration: '25 mins',
    pricePerSeat: 15
  }
]

// Components
const EarningsSummaryCard = ({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string, color: string }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center space-x-2">
        {React.cloneElement(icon as React.ReactElement, { className: `h-5 w-5 ${color}` })}
        <span className="text-sm text-gray-600">{title}</span>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </CardContent>
  </Card>
)

const RideCard = ({ ride, isExpanded, onToggle }: { ride: PastRide, isExpanded: boolean, onToggle: () => void }) => (
  <Card className="hover:bg-gray-100 transition-colors">
    <CardContent className="p-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      >
        <div>
          <p className="font-semibold">
            {format(new Date(ride.date), 'MMM d, yyyy')} at {ride.time}
          </p>
          <p className="text-sm text-gray-600">
            {ride.pickup} → {ride.destination}
          </p>
          <p className="text-sm text-green-600 font-medium mt-1">
            ${ride.earnings} earned
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              ride.status === 'CANCELLED' ? 'destructive' :
              ride.status === 'COMPLETED' ? 'success' : 'secondary'
            }
          >
            {ride.status.replace('_', ' ')}
          </Badge>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Ride Details</h4>
              <p className="text-sm"><strong>Distance:</strong> {ride.totalDistance}</p>
              <p className="text-sm"><strong>Duration:</strong> {ride.duration}</p>
              <p className="text-sm"><strong>Price per Seat:</strong> ${ride.pricePerSeat}</p>
              <p className="text-sm"><strong>Seats Booked:</strong> {ride.seatsBooked}</p>
              {ride.status !== 'COMPLETED' && (
                <div className="mt-2">
                  <p className="text-sm text-red-600">
                    <strong>Cancellation Reason:</strong> {ride.cancellationReason}
                  </p>
                  {ride.cancellationFee && (
                    <p className="text-sm">
                      <strong>Cancellation Fee:</strong> ${ride.cancellationFee}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div>
              <h4 className="font-semibold mb-2">Passenger Information</h4>
              {ride.passengerDetails.map((passenger, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span className="text-sm">{passenger.name}</span>
                  <Badge variant="secondary">★ {passenger.rating.toFixed(1)}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline">
              <AlertCircle className="h-4 w-4 mr-2" />
              Report an Issue
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
)

// Main Component
export default function DriverPastRidesTab() {
  const [expandedPastRide, setExpandedPastRide] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredRides = useMemo(() => {
    return pastRides.filter(ride => {
      const matchesSearch = 
        ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.passengerDetails.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesFilter = 
        filterStatus === 'all' || 
        ride.status.toLowerCase() === filterStatus.toLowerCase()

      return matchesSearch && matchesFilter
    })
  }, [filterStatus, searchTerm])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Past Rides</h1>
        <p className="text-gray-600">View and manage your ride history</p>
      </div>

      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <EarningsSummaryCard icon={<DollarSign />} title="Today's Earnings" value="$145.00" color="text-green-600" />
          <EarningsSummaryCard icon={<Users />} title="Passengers Today" value="8" color="text-blue-600" />
          <EarningsSummaryCard icon={<MapPin />} title="Miles Driven" value="124.5" color="text-purple-600" />
          <EarningsSummaryCard icon={<Clock />} title="Hours Active" value="6.5" color="text-orange-600" />
        </div>

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
          <Button 
            variant={filterStatus === 'no_show' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('no_show')}
            className="min-w-[100px]"
          >
            No Show
          </Button>
        </div>

        {/* Search and Export */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by location or passenger name"
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
        <ScrollArea className="h-[calc(100vh-480px)] pr-4">
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