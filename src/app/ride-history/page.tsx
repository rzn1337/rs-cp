"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatedRides from "@/components/CreatedRides";
import BookingHistory from "@/components/BookingHistory";
import Complaints from "@/components/Complaints";

export default function RideHistory() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">My Rides</h1>
            <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="history">Booking History</TabsTrigger>
                    <TabsTrigger value="created">Created Rides</TabsTrigger>
                    <TabsTrigger value="complaints">Complaints</TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                    <BookingHistory />
                </TabsContent>
                <TabsContent value="created">
                    <CreatedRides />
                </TabsContent>
                <TabsContent value="complaints">
                    <Complaints />
                </TabsContent>
            </Tabs>
        </div>
    );
}
