import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CarIcon, MapPinIcon, AlertTriangleIcon, UserIcon, UserPlusIcon, UserXIcon, ClockIcon } from 'lucide-react'

export default function UserProfilePublic() {
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
        <Button variant="destructive">
          <AlertTriangleIcon className="w-4 h-4 mr-2" />
          Report User
        </Button>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - 2/3 Width */}
        <div className="md:col-span-2 space-y-6">
          {/* Shared Rides History Card */}
          <Card>
            <CardHeader>
              <CardTitle>Rides Together</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Downtown → Airport</p>
                    <p className="text-sm text-muted-foreground">
                      May 15, 2023 10:30 AM
                    </p>
                    <p className="text-sm">
                      Your Role: <Badge variant="secondary">Passenger</Badge>
                    </p>
                    <p className="text-sm">
                      Their Role: <Badge variant="secondary">Driver</Badge>
                    </p>
                  </div>
                  <MapPinIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Suburb → City Center</p>
                    <p className="text-sm text-muted-foreground">
                      April 22, 2023 09:15 AM
                    </p>
                    <p className="text-sm">
                      Your Role: <Badge variant="secondary">Passenger</Badge>
                    </p>
                    <p className="text-sm">
                      Their Role: <Badge variant="secondary">Driver</Badge>
                    </p>
                  </div>
                  <MapPinIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <Button variant="outline" className="w-full">Load More</Button>
              </div>
            </CardContent>
          </Card>

          {/* Interaction History Card */}
          <Card>
            <CardHeader>
              <CardTitle>Interaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">First Ride Together:</span> March 10, 2023
                </p>
                <p>
                  <span className="font-semibold">Total Shared Rides:</span> 15
                </p>
                <p>
                  <span className="font-semibold">Last Shared Ride:</span> May 15, 2023
                </p>
                <div>
                  <p className="font-semibold">Common Routes:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Downtown → Airport</li>
                    <li>Suburb → City Center</li>
                    <li>Mall → Residential Area</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - 1/3 Width */}
        <div className="space-y-6">
          {/* User Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <CalendarIcon className="inline mr-2 w-4 h-4" />
                  Member Since: January 2023
                </p>
                <p>
                  <CarIcon className="inline mr-2 w-4 h-4" />
                  Total Rides: 65
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground pl-6">
                  <li>As Driver: 40 rides</li>
                  <li>As Passenger: 25 rides</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <CarIcon className="mr-2 h-4 w-4" />
                  Book a ride with this user
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ClockIcon className="mr-2 h-4 w-4" />
                  View scheduled rides
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangleIcon className="mr-2 h-4 w-4" />
                  Report user
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <UserXIcon className="mr-2 h-4 w-4" />
                  Block user
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}