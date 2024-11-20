import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CarIcon, MapPinIcon, PhoneIcon, MailIcon, UserIcon } from 'lucide-react'

export default function UserProfile() {
  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8 p-6 bg-background rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">@johndoe</p>
            <p className="text-sm text-muted-foreground">
              <CalendarIcon className="inline mr-1 w-4 h-4" />
              Joined January 2023
            </p>
          </div>
        </div>
        <Button>Edit Profile</Button>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - 2/3 Width */}
        <div className="md:col-span-2 space-y-6">
          {/* Recent Rides Card */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Downtown → Airport</p>
                    <p className="text-sm text-muted-foreground">
                      May 15, 2023 10:30 AM | $25.50
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Toyota Camry | Seat 2
                    </p>
                  </div>
                  <MapPinIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <Button variant="outline" className="w-full">View All Rides</Button>
              </div>
            </CardContent>
          </Card>

          {/* Registered Vehicles Card */}
          <Card>
            <CardHeader>
              <CardTitle>Registered Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Toyota Camry 2020</p>
                    <p className="text-sm text-muted-foreground">License Plate: ABC 123</p>
                    <p className="text-sm text-muted-foreground">
                      <Badge>SEDAN</Badge> | 5 Seats
                    </p>
                  </div>
                  <CarIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <Button variant="outline" className="w-full">Add New Vehicle</Button>
              </div>
            </CardContent>
          </Card>

          {/* Complaints Section */}
          <Card>
            <CardHeader>
              <CardTitle>Complaints History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Complaint ID: #12345</p>
                    <p className="text-sm text-muted-foreground">Against: Driver XYZ</p>
                    <p className="text-sm text-muted-foreground">
                      Status: <Badge variant="outline">PENDING</Badge>
                    </p>
                    <p className="text-sm text-muted-foreground">Filed on: May 10, 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - 1/3 Width */}
        <div className="space-y-6">
          {/* Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Total Rides Count</p>
                <p className="text-sm text-muted-foreground">As Driver: 50 rides</p>
                <p className="text-sm text-muted-foreground">As Passenger: 30 rides</p>
                <p className="text-sm text-muted-foreground">Total Distance Traveled: 1,500 km</p>
              </div>
            </CardContent>
          </Card>

          {/* Account Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex items-center">
                  <MailIcon className="w-4 h-4 mr-2" />
                  john.doe@example.com
                </p>
                <p className="flex items-center">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  +1 (555) 123-4567
                </p>
                <p className="flex items-center">
                  <UserIcon className="w-4 h-4 mr-2" />
                  Account Status: Active
                </p>
                <p className="flex items-center">
                  <Badge variant="outline" className="mt-2">ID Verified</Badge>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}