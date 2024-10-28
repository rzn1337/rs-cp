'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Search, User } from "lucide-react"

// Dummy data for rides
const rides = [
  { id: 1, driver: "John Doe", from: "Downtown", to: "Airport", date: "2023-06-15", time: "14:00", price: "$25", status: "Available" },
  { id: 2, driver: "Jane Smith", from: "Suburb", to: "City Center", date: "2023-06-16", time: "09:30", price: "$18", status: "En Route" },
  { id: 3, driver: "Mike Johnson", from: "Beach", to: "Mountain View", date: "2023-06-17", time: "11:15", price: "$30", status: "Completed" },
  { id: 4, driver: "Sarah Brown", from: "University", to: "Shopping Mall", date: "2023-06-18", time: "13:45", price: "$15", status: "Available" },
  { id: 5, driver: "Chris Lee", from: "Tech Park", to: "Residential Area", date: "2023-06-19", time: "17:00", price: "$22", status: "En Route" },
  { id: 6, driver: "Emily Davis", from: "Airport", to: "Hotel District", date: "2023-06-20", time: "20:30", price: "$28", status: "Available" },
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRides = rides.filter(ride =>
    ride.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ride.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ride.driver.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-6">Ride Sharing Dashboard</h1> */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rides..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRides.map(ride => (
          <Card key={ride.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{ride.from} to {ride.to}</span>
                <Badge variant={ride.status === "Available" ? "default" : ride.status === "En Route" ? "secondary" : "outline"}>
                  {ride.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${ride.driver}`} alt={ride.driver} />
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">{ride.driver}</p>
                  <p className="text-sm text-muted-foreground">{ride.date} at {ride.time}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{ride.from} → {ride.to}</span>
                </div>
                <p className="text-lg font-semibold">{ride.price}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}