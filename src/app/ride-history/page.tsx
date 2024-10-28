'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { User, MapPin, Calendar, Clock, Edit, Plus, X } from "lucide-react"

// Dummy data for ride history
const rideHistory = [
  { id: 1, from: "Downtown", to: "Airport", date: "2023-06-15", time: "14:00", price: "$25", status: "Completed", driver: "John Doe" },
  { id: 2, from: "Suburb", to: "City Center", date: "2023-06-16", time: "09:30", price: "$18", status: "En Route", driver: "Jane Smith" },
  { id: 3, from: "Beach", to: "Mountain View", date: "2023-06-17", time: "11:15", price: "$30", status: "Cancelled", driver: "Mike Johnson" },
  { id: 4, from: "University", to: "Shopping Mall", date: "2023-06-18", time: "13:45", price: "$15", status: "Completed", driver: "Sarah Brown" },
]

// Dummy data for created rides
const initialCreatedRides = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  from: `Location ${i + 1}`,
  to: `Destination ${i + 1}`,
  date: `2023-07-${String(i + 1).padStart(2, '0')}`,
  time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  price: `$${Math.floor(Math.random() * 50) + 10}`,
  status: ["Scheduled", "En Route", "Completed", "Cancelled"][Math.floor(Math.random() * 4)],
  passengers: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, j) => ({
    id: j + 1,
    name: `Passenger ${j + 1}`,
    avatar: `P${j + 1}`,
  })),
}))

export default function RideHistory() {
  const [createdRides, setCreatedRides] = useState(initialCreatedRides)
  const [editingRide, setEditingRide] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newRide, setNewRide] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    price: '',
    status: 'Scheduled',
    passengers: []
  })
  const [currentPage, setCurrentPage] = useState(1)
  const ridesPerPage = 10

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500'
      case 'en route':
        return 'bg-blue-500'
      case 'cancelled':
        return 'bg-red-500'
      case 'scheduled':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handleEditRide = (ride) => {
    setEditingRide({ ...ride })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    setCreatedRides(createdRides.map(ride => 
      ride.id === editingRide.id ? editingRide : ride
    ))
    setIsEditDialogOpen(false)
  }

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target
    if (isEditing) {
      setEditingRide(prev => ({ ...prev, [name]: value }))
    } else {
      setNewRide(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleStatusChange = (value, isEditing = false) => {
    if (isEditing) {
      setEditingRide(prev => ({ ...prev, status: value }))
    } else {
      setNewRide(prev => ({ ...prev, status: value }))
    }
  }

  const handleCreateRide = () => {
    const id = createdRides.length + 1
    const createdRide = { ...newRide, id }
    setCreatedRides(prev => [...prev, createdRide])
    setIsCreateDialogOpen(false)
    setNewRide({
      from: '',
      to: '',
      date: '',
      time: '',
      price: '',
      status: 'Scheduled',
      passengers: []
    })
  }

  const handleCancelRide = (rideId) => {
    setCreatedRides(createdRides.map(ride => 
      ride.id === rideId ? { ...ride, status: 'Cancelled' } : ride
    ))
  }

  const handleRemovePassenger = (rideId, passengerId) => {
    setCreatedRides(createdRides.map(ride => 
      ride.id === rideId
        ? { ...ride, passengers: ride.passengers.filter(p => p.id !== passengerId) }
        : ride
    ))
  }

  const indexOfLastRide = currentPage * ridesPerPage
  const indexOfFirstRide = indexOfLastRide - ridesPerPage
  const currentRides = createdRides.slice(indexOfFirstRide, indexOfLastRide)
  const totalPages = Math.ceil(createdRides.length / ridesPerPage)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Rides</h1>
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Booking History</TabsTrigger>
          <TabsTrigger value="created">Created Rides</TabsTrigger>
          <TabsTrigger value="complaint">Create Complaint</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Ride Booking History</CardTitle>
              <CardDescription>View all your past and upcoming rides</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rideHistory.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell>{ride.from}</TableCell>
                        <TableCell>{ride.to}</TableCell>
                        <TableCell>{ride.date}</TableCell>
                        <TableCell>{ride.price}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(ride.status)}>{ride.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="created">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Created Rides</CardTitle>
                  <CardDescription>Manage the rides you've created</CardDescription>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Ride
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create New Ride</DialogTitle>
                      <DialogDescription>
                        Enter the details for your new ride. Click create when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-from" className="text-right">
                          From
                        </Label>
                        <Input
                          id="create-from"
                          name="from"
                          value={newRide.from}
                          onChange={(e) => handleInputChange(e, false)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-to" className="text-right">
                          To
                        </Label>
                        <Input
                          id="create-to"
                          name="to"
                          value={newRide.to}
                          onChange={(e) => handleInputChange(e, false)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-date" className="text-right">
                          Date
                        </Label>
                        <Input
                          id="create-date"
                          name="date"
                          type="date"
                          value={newRide.date}
                          onChange={(e) => handleInputChange(e, false)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-time" className="text-right">
                          Time
                        </Label>
                        <Input
                          id="create-time"
                          name="time"
                          type="time"
                          value={newRide.time}
                          onChange={(e) => handleInputChange(e, false)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-price" className="text-right">
                          Price
                        </Label>
                        <Input
                          id="create-price"
                          name="price"
                          value={newRide.price}
                          onChange={(e) => handleInputChange(e, false)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-status" className="text-right">
                          Status
                        </Label>
                        <Select
                          onValueChange={(value) => handleStatusChange(value, false)}
                          defaultValue={newRide.status}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                            <SelectItem value="En Route">En Route</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleCreateRide}>Create Ride</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {currentRides.map((ride) => (
                  <Card key={ride.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{ride.from} to {ride.to}</span>
                        <Badge className={getStatusColor(ride.status)}>{ride.status}</Badge>
                      </CardTitle>
                      <CardDescription>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {ride.date}
                          <Clock className="ml-4 mr-2 h-4 w-4" />
                          {ride.time}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{ride.from} → {ride.to}</span>
                        </div>
                        <p className="text-lg font-semibold">{ride.price}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Passengers:</h4>
                        <div className="flex flex-wrap gap-2">
                          {ride.passengers.map((passenger) => (
                            <div key={passenger.id} className="relative">
                              <Avatar className="h-8 w-8">
                                <AvatarImage  src={`https://api.dicebear.com/6.x/initials/svg?seed=${passenger.name}`} />
                                <AvatarFallback>{passenger.avatar}</AvatarFallback>
                              </Avatar>
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-4 w-4 rounded-full absolute -top-1 -right-1"
                                onClick={() => handleRemovePassenger(ride.id, passenger.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" onClick={() => handleEditRide(ride)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Ride
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">Cancel Ride</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently cancel the ride.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleCancelRide(ride.id)}>
                                Confirm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* <TabsContent value="complaint">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>My Complaints</CardTitle>
                  <CardDescription>Manage your complaints</CardDescription>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Ride
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create New Ride</DialogTitle>
                      <DialogDescription>
                        Enter the details for your new ride. Click create when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-from" className="text-right">
                          From
                        </Label>
                        <Input
                          id="create-from"
                          name="from"
                          value={newRide.from}
                          onChange={(e) => handleInputChange(e, false)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-to" className="text-right">
                          To
                        </Label>
                        <Input
                          id="create-to"
                          name="to"
                          value={newRide.to}
                          onChange={(e) => handleInputChange(e, false)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-date" className="text-right">
                          Date
                        </Label>
                        <Input
                          id="create-date"
                          name="date"
                          type="date"
                          value={newRide.date}
                          onChange={(e) => handleInputChange(e, false)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-time" className="text-right">
                          Time
                        </Label>
                        <Input
                          id="create-time"
                          name="time"
                          type="time"
                          value={newRide.time}
                          onChange={(e) => handleInputChange(e, false)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-price" className="text-right">
                          Price
                        </Label>
                        <Input
                          id="create-price"
                          name="price"
                          value={newRide.price}
                          onChange={(e) => handleInputChange(e, false)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="create-status" className="text-right">
                          Status
                        </Label>
                        <Select
                          onValueChange={(value) => handleStatusChange(value, false)}
                          defaultValue={newRide.status}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                            <SelectItem value="En Route">En Route</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleCreateRide}>Create Ride</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {currentRides.map((ride) => (
                  <Card key={ride.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{ride.from} to {ride.to}</span>
                        <Badge className={getStatusColor(ride.status)}>{ride.status}</Badge>
                      </CardTitle>
                      <CardDescription>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {ride.date}
                          <Clock className="ml-4 mr-2 h-4 w-4" />
                          {ride.time}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{ride.from} → {ride.to}</span>
                        </div>
                        <p className="text-lg font-semibold">{ride.price}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Passengers:</h4>
                        <div className="flex flex-wrap gap-2">
                          {ride.passengers.map((passenger) => (
                            <div key={passenger.id} className="relative">
                              <Avatar className="h-8 w-8">
                                <AvatarImage  src={`https://api.dicebear.com/6.x/initials/svg?seed=${passenger.name}`} />
                                <AvatarFallback>{passenger.avatar}</AvatarFallback>
                              </Avatar>
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-4 w-4 rounded-full absolute -top-1 -right-1"
                                onClick={() => handleRemovePassenger(ride.id, passenger.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" onClick={() => handleEditRide(ride)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Ride
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">Cancel Ride</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently cancel the ride.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleCancelRide(ride.id)}>
                                Confirm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Ride</DialogTitle>
            <DialogDescription>
              Make changes to your ride. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editingRide && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="from" className="text-right">
                  From
                </Label>
                <Input
                  id="from"
                  name="from"
                  value={editingRide.from}
                  onChange={(e) => handleInputChange(e, true)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="to" className="text-right">
                  To
                </Label>
                <Input
                  id="to"
                  name="to"
                  value={editingRide.to}
                  onChange={(e) => handleInputChange(e, true)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={editingRide.date}
                  onChange={(e) => handleInputChange(e, true)}
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
                  value={editingRide.time}
                  onChange={(e) => handleInputChange(e, true)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  value={editingRide.price}
                  onChange={(e) => handleInputChange(e, true)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  onValueChange={(value) => handleStatusChange(value, true)}
                  defaultValue={editingRide.status}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="En Route">En Route</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="submit">Save changes</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will update the ride details. Do you want to proceed?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSaveEdit}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}