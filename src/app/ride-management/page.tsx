"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateRideTab from "@/components/CreateRideTab";
import RideDashboard from "@/components/RideDashboard";
import axios from "axios";

export default function RideManagement() {
    const [rides, setRides] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            const response = await axios.get("/api/get-vehicles");
            setVehicles(response.data.data);
            console.log(response.data);
        };
        const fetchRides = async () => {
            const response = await axios.get("/api/get-rides");
            setRides(response.data.data);
            console.log(response);
        };
        fetchRides();
        fetchVehicles();
    }, []);

    return (
        <>
            <div className="container relative mx-auto px-4 py-8min-h-screen">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Ride Management
                </h1>

                <Tabs defaultValue="create-ride" className="">
                    <TabsList className="grid w-full grid-cols-2  gap-2">
                        <TabsTrigger value="create-ride" className="">
                            Create Ride
                        </TabsTrigger>
                        <TabsTrigger value="ride-dashboard" className="">
                            Ride Dashboard
                        </TabsTrigger>
                    </TabsList>

                    <CreateRideTab setRides={setRides} />

                    <RideDashboard rides={rides} />
                </Tabs>
            </div>
        </>
    );
}
