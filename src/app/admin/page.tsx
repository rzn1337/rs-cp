"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CarFront, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { addDays } from "date-fns";
import axios from "axios";

const statsData = [
    { name: "Active Users", value: 5280, icon: Users },
    { name: "Active Rides", value: 22350, icon: Car },
    { name: "Today's Rides", value: 12350, icon: Users },
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
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2023, 5, 20),
        to: addDays(new Date(2023, 5, 20), 20),
    });
    const [complaints, setComplaints] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false);
    const [isDismissDialogOpen, setIsDismissDialogOpen] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [adminNote, setAdminNote] = useState("");
    const [adminStats, setAdminStats] = useState(null);
    const [users, setUsers] = useState(null);

    const handleViewComplaintDetails = (complaint) => {
        setSelectedComplaint(complaint);
        setIsOpen(true);
    };

    const handleAdminNoteChange = (note) => {
        setAdminNote(note);
    };

    const handleResolveComplaint = async () => {
        const data = {
            complaintID: selectedComplaint.id,
            status: "RESOLVED",
            adminNote,
        };
        try {
            const response = await axios.patch(
                "/api/update-complaint-status",
                data
            );
            const updatedComplaint = {
                ...selectedComplaint,
                status: "RESOLVED",
                adminNote,
            };

            setComplaints((prev) =>
                prev.map((complaint) =>
                    complaint.id === updatedComplaint.id
                        ? updatedComplaint
                        : complaint
                )
            );
        } catch (error) {
            console.error(error.message);
        } finally {
            setAdminNote("");
            setIsOpen(false);
            setSelectedComplaint(null);
        }
    };

    const handleDismissComplaint = async () => {
        const data = {
            complaintID: selectedComplaint.id,
            status: "DISMISSED",
            adminNote,
        };
        try {
            const response = await axios.patch(
                "/api/update-complaint-status",
                data
            );
            const updatedComplaint = {
                ...selectedComplaint,
                status: "DISMISSED",
                adminNote,
            };

            setComplaints((prev) =>
                prev.map((complaint) =>
                    complaint.id === updatedComplaint.id
                        ? updatedComplaint
                        : complaint
                )
            );
        } catch (error) {
            console.error(error.message);
        } finally {
            setAdminNote("");
            setIsOpen(false);
            setSelectedComplaint(null);
        }
    };

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get("/api/get-complaints");
                console.log(response);
                setComplaints(response.data.data);
                const adminStatsResponse = await axios.get(
                    "/api/get-admin-stats"
                );
                setAdminStats(adminStatsResponse.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchComplaints();
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/get-users");
                console.log(response);
                setUsers(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
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

    const handleUserAction = async (user, action) => {
        let response;
        try {
            if (user.status === "ACTIVE") {
                setUsers((prev) =>
                    prev.map((u) =>
                        u.id === user.id ? { ...u, status: "SUSPENDED" } : u
                    )
                );
                response = await axios.patch(
                    `/api/update-account-status/${user.id}`,
                    {
                        status: "SUSPENDED",
                    }
                );
            } else {
                setUsers((prev) =>
                    prev.map((u) =>
                        u.id === user.id ? { ...u, status: "ACTIVE" } : u
                    )
                );
                response = await axios.patch(
                    `/api/update-account-status/${user.id}`,
                    {
                        status: "ACTIVE",
                    }
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [selectedTicket, setSelectedTicket] = useState(null);

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Users
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {adminStats?.activeUsersCount}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Rides
                        </CardTitle>
                        <CarFront className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {adminStats?.totalRidesCount}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            New Users
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {adminStats?.newUsersCount}
                        </div>
                    </CardContent>
                </Card>

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
                    {/* <TabsTrigger value="tickets">Support Tickets</TabsTrigger> */}
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
                                        <TableRow key={complaint.id}>
                                            <TableCell className="font-medium">
                                                {complaint.altID}
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
                                                        "PENDING"
                                                            ? "destructive"
                                                            : "default"
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
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleViewComplaintDetails(
                                                                    complaint
                                                                )
                                                            }
                                                        >
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
                                    // value={searchQuery}
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
                                        <TableHead>Username</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users?.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                {user.username}
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        user.status === "ACTIVE"
                                                            ? "default"
                                                            : user.status ===
                                                              "SUSPENDED"
                                                            ? "destructive"
                                                            : "default"
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
                                                    onClick={() => {
                                                        if (
                                                            user.status ===
                                                            "ACTIVE"
                                                        ) {
                                                            handleUserAction(
                                                                user,
                                                                "SUSPENDED"
                                                            );
                                                        } else {
                                                            handleUserAction(
                                                                user,
                                                                "ACTIVE"
                                                            );
                                                        }
                                                    }}
                                                    /* disabled={
                                                        user.status !== "ACTIVE"
                                                    } */
                                                >
                                                    {user.status === "ACTIVE"
                                                        ? "Suspend"
                                                        : "Reinstate"}
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
            {/* {selectedComplaint && (
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
            )} */}
            {selectedComplaint && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader className="p-4">
                            <DialogTitle>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold tracking-tight">
                                        Complaint Details
                                    </span>
                                    <div className="flex items-center gap-4">
                                        {/* <span className="text-xl font-semibold text-gray-700">
                                        C1
                                    </span> */}
                                        <Badge
                                            variant={
                                                selectedComplaint?.status ===
                                                "PENDING"
                                                    ? "destructive"
                                                    : "default"
                                            }
                                        >
                                            {selectedComplaint?.status}
                                        </Badge>
                                    </div>
                                </div>
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-8">
                            <Card className="border-gray-200">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-semibold text-gray-800">
                                        Basic Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <div className="grid gap-4">
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-700 min-w-[120px]">
                                                Related Ride ID:
                                            </span>
                                            <span>
                                                {selectedComplaint?.altID}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="ml-4 text-gray-600 hover:text-gray-900"
                                            >
                                                View Ride Details
                                                <ExternalLink className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="font-medium text-gray-700 min-w-[120px]">
                                                Subject:
                                            </span>
                                            <span>
                                                {selectedComplaint?.subject}
                                            </span>
                                        </div>

                                        <div className="flex items-start">
                                            <span className="font-medium text-gray-700 min-w-[120px]">
                                                Description:
                                            </span>
                                            <span>
                                                {selectedComplaint?.description}
                                            </span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="font-medium text-gray-700 min-w-[120px]">
                                                Date Reported:
                                            </span>
                                            <span>
                                                {
                                                    new Date(
                                                        selectedComplaint?.createdAt
                                                    )
                                                        .toISOString()
                                                        .split("T")[0]
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-200">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-semibold text-gray-800">
                                        Admin Notes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        id="ticket-response"
                                        placeholder="Enter your response"
                                        value={adminNote}
                                        onChange={(e) =>
                                            handleAdminNoteChange(
                                                e.target.value
                                            )
                                        }
                                        className="mt-2 w-full"
                                    />
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-4 pt-4">
                                <Button
                                    variant="outline"
                                    className="px-6"
                                    onClick={() => setIsDismissDialogOpen(true)}
                                >
                                    Dismiss Complaint
                                </Button>
                                <Button
                                    className="px-6"
                                    onClick={() => setIsResolveDialogOpen(true)}
                                >
                                    Resolve Complaint
                                </Button>
                            </div>
                        </div>
                    </DialogContent>

                    <AlertDialog
                        open={isResolveDialogOpen}
                        onOpenChange={setIsResolveDialogOpen}
                    >
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-semibold">
                                    Are you sure you want to resolve this
                                    complaint?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-600">
                                    This action is final and cannot be undone.
                                    The complaint will be marked as resolved.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="gap-3">
                                <AlertDialogCancel className="border-gray-200">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleResolveComplaint}
                                >
                                    Resolve Complaint
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog
                        open={isDismissDialogOpen}
                        onOpenChange={setIsDismissDialogOpen}
                    >
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-semibold">
                                    Are you sure you want to dismiss this
                                    complaint?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-600">
                                    This action is final and cannot be undone.
                                    The complaint will be marked as dismissed.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="gap-3">
                                <AlertDialogCancel className="border-gray-200">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDismissComplaint}
                                >
                                    Dismiss Complaint
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </Dialog>
            )}
        </div>
    );
}
