"use client";

import { useEffect, useState } from "react";
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
    MoreHorizontal,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addDays, toDate } from "date-fns";
import axios from "axios";

const statsData = [
    { name: "Active Users", value: 5280, icon: Users },
    { name: "Active Rides", value: 22350, icon: Car },
    { name: "Today's Rides", value: 12350, icon: Users },
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
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2023, 5, 20),
        to: addDays(new Date(2023, 5, 20), 20),
    });
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get("/api/get-complaints");
                console.log(response);
                setComplaints(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchComplaints();
    }, []);

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
        <div className="container mx-auto px-4 py-8 min-h-screen">
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
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Complaints
                        </CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {complaints.length}
                        </div>
                    </CardContent>
                </Card>
            </div>

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
                                        <TableHead className="w-[100px]">
                                            Case ID
                                        </TableHead>
                                        <TableHead>Date Reported</TableHead>
                                        <TableHead>Complainant</TableHead>
                                        <TableHead>Complainee</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Status</TableHead>

                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {complaints.map((complaint) => (
                                        <TableRow
                                            key={complaint.id}
                                            onClick={() =>
                                                setSelectedComplaint(complaint)
                                            }
                                        >
                                            <TableCell className="font-medium">
                                                {complaint.id}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    new Date(
                                                        complaint.createdAt
                                                    )
                                                        .toISOString()
                                                        .split("T")[0]
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {complaint.complainant.username}
                                            </TableCell>
                                            <TableCell>
                                                {complaint.complainee.username}
                                            </TableCell>
                                            <TableCell>
                                                {complaint.subject}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        complaint.status ===
                                                        "New"
                                                            ? "default"
                                                            : complaint.status ===
                                                              "In Review"
                                                            ? "secondary"
                                                            : complaint.status ===
                                                              "Escalated"
                                                            ? "destructive"
                                                            : complaint.status ===
                                                              "Resolved"
                                                            ? "success"
                                                            : "outline"
                                                    }
                                                >
                                                    {complaint.status}
                                                </Badge>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <span className="sr-only">
                                                                Open menu
                                                            </span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Actions
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            View details
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem>
                                                            Resolve
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
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
            {selectedComplaint && (
                <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Case Details: {selectedComplaint}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium">
                                Complaint Description
                            </h3>
                            <p className="text-sm text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium">Incident Timeline</h3>
                            <ul className="text-sm text-gray-600 list-disc list-inside">
                                <li>2023-06-15 09:30 - Complaint filed</li>
                                <li>2023-06-15 10:15 - Assigned to agent</li>
                                <li>
                                    2023-06-15 11:00 - Initial review completed
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium">
                                Related Ride Details
                            </h3>
                            <p className="text-sm text-gray-600">
                                Ride ID: R5678, Date: 2023-06-14, Driver: John
                                Doe
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium">
                                Communication History
                            </h3>
                            <div className="text-sm text-gray-600">
                                <p>
                                    2023-06-15 10:30 - Email sent to complainant
                                </p>
                                <p>
                                    2023-06-15 11:45 - Phone call with subject
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium">Attached Evidence</h3>
                            <p className="text-sm text-gray-600">
                                2 images, 1 video file
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium">Action History</h3>
                            <ul className="text-sm text-gray-600 list-disc list-inside">
                                <li>2023-06-15 10:00 - Case opened</li>
                                <li>
                                    2023-06-15 11:30 - Escalated to supervisor
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium">Resolution Notes</h3>
                            <p className="text-sm text-gray-600">
                                Pending resolution. Awaiting additional
                                information from the driver.
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <Button size="sm">Escalate</Button>
                            <Button size="sm">Assign</Button>
                            <Button size="sm">Add Note</Button>
                            <Button size="sm" variant="outline">
                                Mark Resolved
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
