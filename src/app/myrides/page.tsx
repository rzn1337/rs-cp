'use client'

import { useState, useMemo } from 'react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO } from 'date-fns'
import { ChevronLeft, ChevronRight, MapPin, MessageSquare, Star as StarIcon, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const StarRating = ({ rating, onRate }: { rating: number | null, onRate?: (rating: number) => void }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate && onRate(star)}
          className={`${onRate ? 'cursor-pointer' : 'cursor-default'} ${star <= (rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          <StarIcon className="w-6 h-6" />
        </button>
      ))}
    </div>
  )
}

interface Ride {
  id: string
  date: string
  time: string
  status: 'scheduled' | 'enroute' | 'completed' | 'cancelled'
  pickup: string
  destination: string
  driverName: string
  price: string
  rating?: number
}

interface DayRides {
  [date: string]: Ride[]
}

const mockRides: DayRides = {
  '2024-11-15': [
    { id: '1', date: '2024-11-15', time: '09:00', status: 'scheduled', pickup: 'Home', destination: 'Office', driverName: 'John Doe', price: '$15' },
    { id: '2', date: '2024-11-15', time: '18:00', status: 'scheduled', pickup: 'Office', destination: 'Home', driverName: 'Jane Smith', price: '$15' },
  ],
  '2024-11-16': [
    { id: '3', date: '2024-11-16', time: '10:00', status: 'completed', pickup: 'Home', destination: 'Gym', driverName: 'Mike Johnson', price: '$10', rating: 5 },
  ],
  '2024-11-17': [
    { id: '4', date: '2024-11-17', time: '14:00', status: 'enroute', pickup: 'Mall', destination: 'Park', driverName: 'Sarah Lee', price: '$12' },
  ],
  '2024-11-18': [
    { id: '5', date: '2024-11-18', time: '11:00', status: 'cancelled', pickup: 'Home', destination: 'Airport', driverName: 'Tom Brown', price: '$25' },
  ],
  '2024-11-20': [
    { id: '6', date: '2024-11-20', time: '08:30', status: 'scheduled', pickup: 'Home', destination: 'School', driverName: 'Alice Green', price: '$8' },
  ],
  '2024-11-22': [
    { id: '7', date: '2024-11-22', time: '19:00', status: 'scheduled', pickup: 'Restaurant', destination: 'Home', driverName: 'Bob White', price: '$20' },
  ],
}

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  enroute: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const complaintCategories = [
  'Late Arrival',
  'Unsafe Driving',
  'Cleanliness',
  'Rude Behavior',
  'Wrong Route',
  'Other'
]

export default function MyRidesCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [ratingComment, setRatingComment] = useState('')
  const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false)
  const [complaintCategory, setComplaintCategory] = useState<string | null>(null)
  const [complaintComment, setComplaintComment] = useState('')
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {})
  const [confirmMessage, setConfirmMessage] = useState('')

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  const handleRideClick = (ride: Ride) => {
    setSelectedRide(ride)
  }

  const handleCancelRide = () => {
    setConfirmMessage('Are you sure you want to cancel this ride?')
    setConfirmAction(() => () => {
      // In a real application, you would call an API to cancel the ride
      console.log(`Cancelling ride with ID: ${selectedRide?.id}`)
      setSelectedRide(null)
      setIsConfirmDialogOpen(false)
    })
    setIsConfirmDialogOpen(true)
  }

  const handleContactDriver = () => {
    setIsMessageDialogOpen(true)
  }

  const handleSendMessage = () => {
    setConfirmMessage('Are you sure you want to send this message?')
    setConfirmAction(() => () => {
      // In a real application, you would send this message to the driver
      console.log(`Sending message to driver: ${message}`)
      setMessage('')
      setIsMessageDialogOpen(false)
      setIsConfirmDialogOpen(false)
    })
    setIsConfirmDialogOpen(true)
  }

  const handleRateRide = () => {
    setIsRatingDialogOpen(true)
  }

  const handleSubmitRating = () => {
    if (!rating) {
      // Show an error message or prevent submission
      return;
    }
    setConfirmMessage('Are you sure you want to submit this rating?')
    setConfirmAction(() => () => {
      // In a real application, you would submit this rating to an API
      console.log(`Submitting rating: ${rating} stars, Comment: ${ratingComment}`)
      if (selectedRide) {
        const updatedRide = { ...selectedRide, rating };
        // Update the ride in your state or data store
        console.log('Updated ride:', updatedRide);
      }
      setRating(null)
      setRatingComment('')
      setIsRatingDialogOpen(false)
      setIsConfirmDialogOpen(false)
    })
    setIsConfirmDialogOpen(true)
  }

  const handleFileComplaint = () => {
    setIsComplaintDialogOpen(true)
  }

  const handleSubmitComplaint = () => {
    setConfirmMessage('Are you sure you want to submit this complaint?')
    setConfirmAction(() => () => {
      // In a real application, you would submit this complaint to an API
      console.log(`Submitting complaint: Category: ${complaintCategory}, Comment: ${complaintComment}`)
      setComplaintCategory(null)
      setComplaintComment('')
      setIsComplaintDialogOpen(false)
      setIsConfirmDialogOpen(false)
    })
    setIsConfirmDialogOpen(true)
  }

  const selectedDateRides = selectedDate ? mockRides[format(selectedDate, 'yyyy-MM-dd')] || [] : []

  const upcomingRides = useMemo(() => {
    const today = new Date()
    return Object.values(mockRides)
      .flat()
      .filter(ride => ride.status === 'scheduled' && parseISO(ride.date) >= today)
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-left">My Rides</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</CardTitle>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {monthDays.map((day, dayIdx) => {
                  const dateKey = format(day, 'yyyy-MM-dd')
                  const dayRides = mockRides[dateKey] || []
                  return (
                    <Button
                      key={day.toString()}
                      variant="outline"
                      className={`
                        h-20 p-2 flex flex-col items-start justify-start
                        ${!isSameMonth(day, currentDate) ? 'opacity-50' : ''}
                        ${isToday(day) ? 'border-blue-500 border-2' : ''}
                        ${isSameDay(day, selectedDate) ? 'bg-blue-100' : ''}
                      `}
                      onClick={() => handleDateClick(day)}
                    >
                      <span className={`text-sm font-medium ${isToday(day) ? 'text-blue-600' : ''}`}>
                        {format(day, 'd')}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {dayRides.slice(0, 3).map((ride) => (
                          <div
                            key={ride.id}
                            className={`w-2 h-2 rounded-full ${statusColors[ride.status].split(' ')[0]}`}
                          ></div>
                        ))}
                      </div>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date to view rides'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateRides.length > 0 ? (
                <ScrollArea className="h-[300px] w-full">
                  <div className="space-y-4">
                    {selectedDateRides.map((ride) => (
                      <Card key={ride.id}>
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex flex-col flex-grow">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-lg font-semibold">{ride.time}</span>
                              <Badge variant="secondary" className={`${statusColors[ride.status]} uppercase`}>
                                {ride.status}
                              </Badge>
                            </div>
                            <span className="text-sm text-gray-500">{ride.driverName}</span>
                            <div className="flex items-center mt-2 text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              {ride.pickup} to {ride.destination}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <span className="text-lg font-bold">{ride.price}</span>
                            {ride.rating && (
                              <div className="mt-1">
                                <StarRating rating={ride.rating} />
                              </div>
                            )}
                            <Button variant="outline" size="sm" className="mt-2" onClick={() => handleRideClick(ride)}>
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <p className="text-center text-gray-500">No rides scheduled for this day.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {upcomingRides.map((ride) => (
                    <Card key={ride.id} className={isToday(parseISO(ride.date)) ? 'border-blue-500 border-2' : ''}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-semibold">{format(parseISO(ride.date), 'MMM d')} - {ride.time}</span>
                          <Badge variant="secondary" className={`${statusColors[ride.status]} uppercase`}>
                            {ride.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{ride.pickup} to {ride.destination}</div>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => handleRideClick(ride)}>
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={!!selectedRide} onOpenChange={(open) => !open && setSelectedRide(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ride Details</DialogTitle>
          </DialogHeader>
          {selectedRide && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{format(parseISO(selectedRide.date), 'MMM d')} - {selectedRide.time}</span>
                <Badge variant="secondary" className={`${statusColors[selectedRide.status]} uppercase`}>
                  {selectedRide.status}
                </Badge>
              </div>
              <div>
                <div className="font-medium">Driver</div>
                <div>{selectedRide.driverName}</div>
              </div>
              <div>
                <div className="font-medium">Route</div>
                <div>{selectedRide.pickup} to {selectedRide.destination}</div>
              </div>
              <div>
                <div className="font-medium">Price</div>
                <div>{selectedRide.price}</div>
              </div>
              {selectedRide.rating && (
                <div>
                  <div className="font-medium">Rating</div>
                  <StarRating rating={selectedRide.rating} />
                </div>
              )}
              <div className="flex justify-end space-x-2">
                {selectedRide.status === 'scheduled' && (
                  <Button variant="destructive" onClick={handleCancelRide}>
                    Cancel Ride
                  </Button>
                )}
                <Button variant="outline" onClick={handleContactDriver}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Driver
                </Button>
                {selectedRide.status === 'completed' && !selectedRide.rating && (
                  <Button variant="outline" onClick={handleRateRide}>
                    <StarIcon className="mr-2 h-4 w-4" />
                    Rate Ride
                  </Button>
                )}
                {selectedRide.status === 'completed' && (
                  <Button variant="outline" onClick={handleFileComplaint}>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    File Complaint
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Driver</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSendMessage}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Your Ride</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rating</Label>
              <StarRating rating={rating} onRate={setRating} />
            </div>
            <div>
              <Label>Comment (Optional)</Label>
              <Textarea
                placeholder="Leave a comment about your ride..."
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRatingDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitRating}>Submit Rating</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isComplaintDialogOpen} onOpenChange={setIsComplaintDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>File a Complaint</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Complaint Category</Label>
              <Select value={complaintCategory || ''} onValueChange={setComplaintCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {complaintCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Describe your complaint..."
                value={complaintComment}
                onChange={(e) => setComplaintComment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsComplaintDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitComplaint}>Submit Complaint</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          <DialogDescription>{confirmMessage}</DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}