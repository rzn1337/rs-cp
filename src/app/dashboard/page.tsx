"use client"

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Car,
  Star,
  User2,
  ArrowRight,
  CalendarClock,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const RideCard = ({ ride, onBookRide }) => (
  <Card className="hover:bg-gray-50 transition-colors">
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage 
              src={`https://api.dicebear.com/9.x/notionists/svg?seed=${ride.ride.driver.username}`} 
              alt={ride.ride.driver.username} 
            />
            <AvatarFallback><User2 className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{ride.ride.driver.username}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">4.85</span>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="ml-2">
          {ride.ride.vehicle.make} {ride.ride.vehicle.model}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <div className="flex items-center">
              <span className="truncate max-w-[100px]">{ride.from}</span>
              <ArrowRight className="h-4 w-4 mx-2" />
              <span className="truncate max-w-[100px]">{ride.to}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <CalendarClock className="h-4 w-4 mr-2" />
            <span>
              {format(new Date(ride.ride.scheduledFor), 'MMM d, yyyy')} at{' '}
              {format(new Date(ride.ride.scheduledFor), 'HH:mm')}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Car className="h-4 w-4 mr-2" />
            <span>{ride.ride.vehicle.seats} seats available</span>
          </div>
          <div className="flex items-center font-medium">
            <DollarSign className="h-4 w-4" />
            {ride.ride.fare}
          </div>
        </div>

        <Button className="w-full mt-2" onClick={() => onBookRide(ride)}>
          Book Now
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [rides, setRides] = useState([]);

  const handleBookRide = (ride) => {
    setSelectedRide(ride);
  };

  useEffect(() => {
    // Simulated API call - replace with actual API call
    const fetchRides = async () => {
      try {
        const response = await fetch(`/api/get-public-rides?search=${searchTerm}&limit=10`);
        const data = await response.json();
        setRides(data.data);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    fetchRides();
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Book a Ride</h1>
        <p className="text-gray-600">Find and book available rides in your area</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Rides</CardTitle>
          <CardDescription>
            Enter your travel details to find available rides
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="date" className="pl-8" />
            </div>
            <div className="relative">
              <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="time" className="pl-8" />
            </div>
            <div className="relative">
              <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Enter destination" className="pl-8" />
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by location or driver name"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="h-[calc(100vh-400px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((ride) => (
            <RideCard
              key={ride.ride.id}
              ride={ride}
              onBookRide={handleBookRide}
            />
          ))}
        </div>
      </ScrollArea>

      <Dialog open={!!selectedRide} onOpenChange={() => setSelectedRide(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogDescription>
              Review and confirm your ride details
            </DialogDescription>
          </DialogHeader>
          {selectedRide && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">From</p>
                  <p className="text-sm text-gray-600">{selectedRide.from}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">To</p>
                  <p className="text-sm text-gray-600">{selectedRide.to}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date & Time</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(selectedRide.ride.scheduledFor), 'PPP p')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Price</p>
                  <p className="text-sm text-gray-600">${selectedRide.ride.fare}</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedRide(null)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  // Handle booking confirmation
                  alert('Booking confirmed!');
                  setSelectedRide(null);
                }}>
                  Confirm Booking
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}