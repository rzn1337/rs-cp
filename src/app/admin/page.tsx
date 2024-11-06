// 'use client'

// import { useState } from 'react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { AlertCircle, Car, MessageSquare, Search } from "lucide-react"

// // Dummy data for rides
// const allRides = Array.from({ length: 100 }, (_, i) => ({
//   id: i + 1,
//   driver: `Driver ${i + 1}`,
//   from: `Location ${i + 1}`,
//   to: `Destination ${i + 1}`,
//   date: `2023-07-${String(Math.floor(Math.random() * 31) + 1).padStart(2, '0')}`,
//   time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
//   price: `$${Math.floor(Math.random() * 50) + 10}`,
//   status: ["Scheduled", "En Route", "Completed", "Cancelled"][Math.floor(Math.random() * 4)],
// }))

// // Dummy data for complaints
// const initialComplaints = [
//   { id: 1, user: "John Doe", rideId: 3, description: "Driver was late", status: "Open" },
//   { id: 2, user: "Jane Smith", rideId: 7, description: "Incorrect fare charged", status: "In Progress" },
//   { id: 3, user: "Mike Johnson", rideId: 12, description: "Vehicle was not clean", status: "Resolved" },
// ]

// export default function AdminDashboard() {
//   const [filteredRides, setFilteredRides] = useState([])
//   const [complaints, setComplaints] = useState(initialComplaints)
//   const [filters, setFilters] = useState({ driver: '', from: '', to: '', date: '', status: '' })

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target
//     setFilters(prev => ({ ...prev, [name]: value }))
//   }

//   const handleStatusChange = (value) => {
//     setFilters(prev => ({ ...prev, status: value }))
//   }

//   const generateRidesList = () => {
//     const filtered = allRides.filter(ride =>
//       (filters.driver === '' || ride.driver.toLowerCase().includes(filters.driver.toLowerCase())) &&
//       (filters.from === '' || ride.from.toLowerCase().includes(filters.from.toLowerCase())) &&
//       (filters.to === '' || ride.to.toLowerCase().includes(filters.to.toLowerCase())) &&
//       (filters.date === '' || ride.date === filters.date) &&
//       (filters.status === '' || ride.status === filters.status)
//     )
//     setFilteredRides(filtered)
//   }

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'completed':
//         return 'bg-green-500'
//       case 'en route':
//         return 'bg-blue-500'
//       case 'cancelled':
//         return 'bg-red-500'
//       case 'scheduled':
//         return 'bg-yellow-500'
//       default:
//         return 'bg-gray-500'
//     }
//   }

//   const getComplaintStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'open':
//         return 'bg-red-500'
//       case 'in progress':
//         return 'bg-yellow-500'
//       case 'resolved':
//         return 'bg-green-500'
//       default:
//         return 'bg-gray-500'
//     }
//   }

//   const handleComplaintStatusChange = (complaintId, newStatus) => {
//     setComplaints(complaints.map(complaint =>
//       complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
//     ))
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//       <Tabs defaultValue="rides" className="w-full">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="rides">Rides</TabsTrigger>
//           <TabsTrigger value="complaints">Complaints</TabsTrigger>
//         </TabsList>
//         <TabsContent value="rides">
//           <Card>
//             <CardHeader>
//               <CardTitle>Rides Management</CardTitle>
//               <CardDescription>Filter and view rides in the system</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                 <div>
//                   <Label htmlFor="driver">Driver</Label>
//                   <Input
//                     id="driver"
//                     name="driver"
//                     value={filters.driver}
//                     onChange={handleFilterChange}
//                     placeholder="Filter by driver"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="from">From</Label>
//                   <Input
//                     id="from"
//                     name="from"
//                     value={filters.from}
//                     onChange={handleFilterChange}
//                     placeholder="Filter by origin"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="to">To</Label>
//                   <Input
//                     id="to"
//                     name="to"
//                     value={filters.to}
//                     onChange={handleFilterChange}
//                     placeholder="Filter by destination"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="date">Date</Label>
//                   <Input
//                     id="date"
//                     name="date"
//                     type="date"
//                     value={filters.date}
//                     onChange={handleFilterChange}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="status">Status</Label>
//                   <Select onValueChange={handleStatusChange} value={filters.status}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="All">All</SelectItem>
//                       <SelectItem value="Scheduled">Scheduled</SelectItem>
//                       <SelectItem value="En Route">En Route</SelectItem>
//                       <SelectItem value="Completed">Completed</SelectItem>
//                       <SelectItem value="Cancelled">Cancelled</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="flex items-end">
//                   <Button onClick={generateRidesList} className="w-full">
//                     <Search className="mr-2 h-4 w-4" />
//                     Generate List
//                   </Button>
//                 </div>
//               </div>
//               <ScrollArea className="h-[400px] w-full">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>ID</TableHead>
//                       <TableHead>Driver</TableHead>
//                       <TableHead>From</TableHead>
//                       <TableHead>To</TableHead>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Time</TableHead>
//                       <TableHead>Price</TableHead>
//                       <TableHead>Status</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredRides.map((ride) => (
//                       <TableRow key={ride.id}>
//                         <TableCell>{ride.id}</TableCell>
//                         <TableCell>{ride.driver}</TableCell>
//                         <TableCell>{ride.from}</TableCell>
//                         <TableCell>{ride.to}</TableCell>
//                         <TableCell>{ride.date}</TableCell>
//                         <TableCell>{ride.time}</TableCell>
//                         <TableCell>{ride.price}</TableCell>
//                         <TableCell>
//                           <Badge className={getStatusColor(ride.status)}>{ride.status}</Badge>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </ScrollArea>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="complaints">
//           <Card>
//             <CardHeader>
//               <CardTitle>Complaints</CardTitle>
//               <CardDescription>View and manage user complaints</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ScrollArea className="h-[400px] w-full">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>ID</TableHead>
//                       <TableHead>User</TableHead>
//                       <TableHead>Ride ID</TableHead>
//                       <TableHead>Description</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Action</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {complaints.map((complaint) => (
//                       <TableRow key={complaint.id}>
//                         <TableCell>{complaint.id}</TableCell>
//                         <TableCell>{complaint.user}</TableCell>
//                         <TableCell>{complaint.rideId}</TableCell>
//                         <TableCell>{complaint.description}</TableCell>
//                         <TableCell>
//                           <Badge className={getComplaintStatusColor(complaint.status)}>{complaint.status}</Badge>
//                         </TableCell>
//                         <TableCell>
//                           <Select
//                             onValueChange={(value) => handleComplaintStatusChange(complaint.id, value)}
//                             defaultValue={complaint.status}
//                           >
//                             <SelectTrigger className="w-[180px]">
//                               <SelectValue placeholder="Change status" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="Open">Open</SelectItem>
//                               <SelectItem value="In Progress">In Progress</SelectItem>
//                               <SelectItem value="Resolved">Resolved</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </ScrollArea>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    Users,
    Car,
    DollarSign,
    AlertTriangle,
    CheckCircle,
    XCircle,
    MessageSquare,
    Search,
} from "lucide-react";

const statsData = [
    { name: "Users", value: 5280, icon: Users },
    { name: "Rides", value: 12350, icon: Car },
    { name: "Revenue", value: 98500, icon: DollarSign },
    { name: "Complaints", value: 24, icon: AlertTriangle },
];

const rideData = [
    { name: "Mon", rides: 400 },
    { name: "Tue", rides: 300 },
    { name: "Wed", rides: 520 },
    { name: "Thu", rides: 400 },
    { name: "Fri", rides: 700 },
    { name: "Sat", rides: 600 },
    { name: "Sun", rides: 380 },
];

const complaints = [
    {
        id: 1,
        type: "Driver",
        user: "John Doe",
        subject: "Late arrival",
        status: "Open",
    },
    {
        id: 2,
        type: "Passenger",
        user: "Jane Smith",
        subject: "Incorrect fare",
        status: "In Progress",
    },
    {
        id: 3,
        type: "Driver",
        user: "Mike Johnson",
        subject: "App malfunction",
        status: "Closed",
    },
];

const tickets = [
    {
        id: 1,
        user: "Alice Brown",
        subject: "Account verification issue",
        priority: "High",
        status: "Open",
    },
    {
        id: 2,
        user: "Bob Wilson",
        subject: "Payment not received",
        priority: "Medium",
        status: "In Progress",
    },
    {
        id: 3,
        user: "Carol Davis",
        subject: "Unable to update profile",
        priority: "Low",
        status: "Closed",
    },
];

const users = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active" },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        status: "Suspended",
    },
];

export default function AdminDashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = users.filter(
            (user) =>
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleUserAction = (userId, action) => {
        setFilteredUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId
                    ? {
                          ...user,
                          status: action === "suspend" ? "Suspended" : "Banned",
                      }
                    : user
            )
        );
    };
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsData.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.name}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stat.value.toLocaleString()}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {/* 
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Rides Overview</CardTitle>
                    <CardDescription>
                        Number of rides per day this week
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={rideData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="rides" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card> */}

            <Tabs defaultValue="complaints" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="complaints">
                        Complaint Handling
                    </TabsTrigger>
                    <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
                    <TabsTrigger value="users">User Management</TabsTrigger>
                </TabsList>
                <TabsContent value="complaints">
                    <Card>
                        <CardHeader>
                            <CardTitle>Complaints</CardTitle>
                            <CardDescription>
                                Manage and resolve user complaints
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {complaints.map((complaint) => (
                                        <TableRow key={complaint.id}>
                                            <TableCell>
                                                {complaint.id}
                                            </TableCell>
                                            <TableCell>
                                                {complaint.type}
                                            </TableCell>
                                            <TableCell>
                                                {complaint.user}
                                            </TableCell>
                                            <TableCell>
                                                {complaint.subject}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        complaint.status ===
                                                        "Open"
                                                            ? "destructive"
                                                            : complaint.status ===
                                                              "In Progress"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {complaint.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                setSelectedComplaint(
                                                                    complaint
                                                                )
                                                            }
                                                        >
                                                            View
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Complaint
                                                                Details
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Review and
                                                                update the
                                                                complaint status
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="complaint-id"
                                                                    className="text-right"
                                                                >
                                                                    ID
                                                                </Label>
                                                                <Input
                                                                    id="complaint-id"
                                                                    value={
                                                                        selectedComplaint?.id
                                                                    }
                                                                    className="col-span-3"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="complaint-type"
                                                                    className="text-right"
                                                                >
                                                                    Type
                                                                </Label>
                                                                <Input
                                                                    id="complaint-type"
                                                                    value={
                                                                        selectedComplaint?.type
                                                                    }
                                                                    className="col-span-3"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="complaint-user"
                                                                    className="text-right"
                                                                >
                                                                    User
                                                                </Label>
                                                                <Input
                                                                    id="complaint-user"
                                                                    value={
                                                                        selectedComplaint?.user
                                                                    }
                                                                    className="col-span-3"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="complaint-subject"
                                                                    className="text-right"
                                                                >
                                                                    Subject
                                                                </Label>
                                                                <Input
                                                                    id="complaint-subject"
                                                                    value={
                                                                        selectedComplaint?.subject
                                                                    }
                                                                    className="col-span-3"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="complaint-status"
                                                                    className="text-right"
                                                                >
                                                                    Status
                                                                </Label>
                                                                <Select
                                                                    defaultValue={
                                                                        selectedComplaint?.status
                                                                    }
                                                                >
                                                                    <SelectTrigger className="col-span-3">
                                                                        <SelectValue placeholder="Select status" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Open">
                                                                            Open
                                                                        </SelectItem>
                                                                        <SelectItem value="In Progress">
                                                                            In
                                                                            Progress
                                                                        </SelectItem>
                                                                        <SelectItem value="Closed">
                                                                            Closed
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="complaint-response"
                                                                    className="text-right"
                                                                >
                                                                    Response
                                                                </Label>
                                                                <Textarea
                                                                    id="complaint-response"
                                                                    placeholder="Enter your response"
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <Button type="submit">
                                                                Update Complaint
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="tickets">
                    <Card>
                        <CardHeader>
                            <CardTitle>Support Tickets</CardTitle>
                            <CardDescription>
                                Manage support tickets and escalated issues
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tickets.map((ticket) => (
                                        <TableRow key={ticket.id}>
                                            <TableCell>{ticket.id}</TableCell>
                                            <TableCell>{ticket.user}</TableCell>
                                            <TableCell>
                                                {ticket.subject}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        ticket.priority ===
                                                        "High"
                                                            ? "destructive"
                                                            : ticket.priority ===
                                                              "Medium"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {ticket.priority}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        ticket.status === "Open"
                                                            ? "destructive"
                                                            : ticket.status ===
                                                              "In Progress"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {ticket.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                setSelectedTicket(
                                                                    ticket
                                                                )
                                                            }
                                                        >
                                                            View
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Support Ticket
                                                                Details
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Review and
                                                                update the
                                                                support ticket
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="ticket-id"
                                                                    className="text-right"
                                                                >
                                                                    ID
                                                                </Label>
                                                                <Input
                                                                    id="ticket-id"
                                                                    value={
                                                                        selectedTicket?.id
                                                                    }
                                                                    className="col-span-3"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="ticket-user"
                                                                    className="text-right"
                                                                >
                                                                    User
                                                                </Label>
                                                                <Input
                                                                    id="ticket-user"
                                                                    value={
                                                                        selectedTicket?.user
                                                                    }
                                                                    className="col-span-3"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="ticket-subject"
                                                                    className="text-right"
                                                                >
                                                                    Subject
                                                                </Label>
                                                                <Input
                                                                    id="ticket-subject"
                                                                    value={
                                                                        selectedTicket?.subject
                                                                    }
                                                                    className="col-span-3"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="ticket-priority"
                                                                    className="text-right"
                                                                >
                                                                    Priority
                                                                </Label>
                                                                <Select
                                                                    defaultValue={
                                                                        selectedTicket?.priority
                                                                    }
                                                                >
                                                                    <SelectTrigger className="col-span-3">
                                                                        <SelectValue placeholder="Select priority" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="High">
                                                                            High
                                                                        </SelectItem>
                                                                        <SelectItem value="Medium">
                                                                            Medium
                                                                        </SelectItem>
                                                                        <SelectItem value="Low">
                                                                            Low
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="ticket-status"
                                                                    className="text-right"
                                                                >
                                                                    Status
                                                                </Label>
                                                                <Select
                                                                    defaultValue={
                                                                        selectedTicket?.status
                                                                    }
                                                                >
                                                                    <SelectTrigger className="col-span-3">
                                                                        <SelectValue placeholder="Select status" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Open">
                                                                            Open
                                                                        </SelectItem>
                                                                        <SelectItem value="In Progress">
                                                                            In
                                                                            Progress
                                                                        </SelectItem>
                                                                        <SelectItem value="Closed">
                                                                            Closed
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="ticket-response"
                                                                    className="text-right"
                                                                >
                                                                    Response
                                                                </Label>
                                                                <Textarea
                                                                    id="ticket-response"
                                                                    placeholder="Enter your response"
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <Button type="submit">
                                                                Update Ticket
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>
                                Search and manage user accounts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2 mb-4">
                                <Input
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    className="max-w-sm"
                                />
                                <Button
                                    variant="secondary"
                                    className="shrink-0"
                                >
                                    <Search className="h-4 w-4 mr-2" />
                                    Search
                                </Button>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        user.status === "Active"
                                                            ? "default"
                                                            : user.status ===
                                                              "Suspended"
                                                            ? "warning"
                                                            : "destructive"
                                                    }
                                                >
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="mr-2"
                                                    onClick={() =>
                                                        handleUserAction(
                                                            user.id,
                                                            "suspend"
                                                        )
                                                    }
                                                    disabled={
                                                        user.status !== "Active"
                                                    }
                                                >
                                                    Suspend
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleUserAction(
                                                            user.id,
                                                            "ban"
                                                        )
                                                    }
                                                    disabled={
                                                        user.status === "Banned"
                                                    }
                                                >
                                                    Ban
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
