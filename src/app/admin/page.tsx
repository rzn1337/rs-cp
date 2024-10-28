'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Car, MessageSquare, Search } from "lucide-react"

// Dummy data for rides
const allRides = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  driver: `Driver ${i + 1}`,
  from: `Location ${i + 1}`,
  to: `Destination ${i + 1}`,
  date: `2023-07-${String(Math.floor(Math.random() * 31) + 1).padStart(2, '0')}`,
  time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  price: `$${Math.floor(Math.random() * 50) + 10}`,
  status: ["Scheduled", "En Route", "Completed", "Cancelled"][Math.floor(Math.random() * 4)],
}))

// Dummy data for complaints
const initialComplaints = [
  { id: 1, user: "John Doe", rideId: 3, description: "Driver was late", status: "Open" },
  { id: 2, user: "Jane Smith", rideId: 7, description: "Incorrect fare charged", status: "In Progress" },
  { id: 3, user: "Mike Johnson", rideId: 12, description: "Vehicle was not clean", status: "Resolved" },
]

export default function AdminDashboard() {
  const [filteredRides, setFilteredRides] = useState([])
  const [complaints, setComplaints] = useState(initialComplaints)
  const [filters, setFilters] = useState({ driver: '', from: '', to: '', date: '', status: '' })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value) => {
    setFilters(prev => ({ ...prev, status: value }))
  }

  const generateRidesList = () => {
    const filtered = allRides.filter(ride => 
      (filters.driver === '' || ride.driver.toLowerCase().includes(filters.driver.toLowerCase())) &&
      (filters.from === '' || ride.from.toLowerCase().includes(filters.from.toLowerCase())) &&
      (filters.to === '' || ride.to.toLowerCase().includes(filters.to.toLowerCase())) &&
      (filters.date === '' || ride.date === filters.date) &&
      (filters.status === '' || ride.status === filters.status)
    )
    setFilteredRides(filtered)
  }

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

  const getComplaintStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-red-500'
      case 'in progress':
        return 'bg-yellow-500'
      case 'resolved':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handleComplaintStatusChange = (complaintId, newStatus) => {
    setComplaints(complaints.map(complaint =>
      complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
    ))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="rides" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rides">Rides</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
        </TabsList>
        <TabsContent value="rides">
          <Card>
            <CardHeader>
              <CardTitle>Rides Management</CardTitle>
              <CardDescription>Filter and view rides in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="driver">Driver</Label>
                  <Input
                    id="driver"
                    name="driver"
                    value={filters.driver}
                    onChange={handleFilterChange}
                    placeholder="Filter by driver"
                  />
                </div>
                <div>
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    name="from"
                    value={filters.from}
                    onChange={handleFilterChange}
                    placeholder="Filter by origin"
                  />
                </div>
                <div>
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    name="to"
                    value={filters.to}
                    onChange={handleFilterChange}
                    placeholder="Filter by destination"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={handleStatusChange} value={filters.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="En Route">En Route</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={generateRidesList} className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Generate List
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[400px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRides.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell>{ride.id}</TableCell>
                        <TableCell>{ride.driver}</TableCell>
                        <TableCell>{ride.from}</TableCell>
                        <TableCell>{ride.to}</TableCell>
                        <TableCell>{ride.date}</TableCell>
                        <TableCell>{ride.time}</TableCell>
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
        <TabsContent value="complaints">
          <Card>
            <CardHeader>
              <CardTitle>Complaints</CardTitle>
              <CardDescription>View and manage user complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Ride ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell>{complaint.id}</TableCell>
                        <TableCell>{complaint.user}</TableCell>
                        <TableCell>{complaint.rideId}</TableCell>
                        <TableCell>{complaint.description}</TableCell>
                        <TableCell>
                          <Badge className={getComplaintStatusColor(complaint.status)}>{complaint.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            onValueChange={(value) => handleComplaintStatusChange(complaint.id, value)}
                            defaultValue={complaint.status}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Change status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Open">Open</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}