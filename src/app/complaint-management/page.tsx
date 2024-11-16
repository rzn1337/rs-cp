"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    CalendarIcon,
    ChevronDown,
    MoreHorizontal,
    Search,
} from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Mock data for complaints
const complaints = [
    {
        id: "C1234",
        severity: "high",
        dateReported: "2023-06-15",
        complainant: "John Doe",
        complainantType: "Rider",
        subjectAgainst: "Driver X",
        subjectType: "Driver",
        category: "Safety",
        status: "New",
        priority: "Critical",
    },
    {
        id: "C1235",
        severity: "medium",
        dateReported: "2023-06-14",
        complainant: "Jane Smith",
        complainantType: "Driver",
        subjectAgainst: "Rider Y",
        subjectType: "Rider",
        category: "Behavior",
        status: "In Review",
        priority: "High",
    },
    {
        id: "C1236",
        severity: "low",
        dateReported: "2023-06-13",
        complainant: "Alice Johnson",
        complainantType: "Rider",
        subjectAgainst: "Driver Z",
        subjectType: "Driver",
        category: "Service Quality",
        status: "Escalated",
        priority: "Medium",
    },
    {
        id: "C1237",
        severity: "high",
        dateReported: "2023-06-12",
        complainant: "Bob Williams",
        complainantType: "Rider",
        subjectAgainst: "Driver A",
        subjectType: "Driver",
        category: "Payment",
        status: "Resolved",
        priority: "Low",
    },
    {
        id: "C1238",
        severity: "medium",
        dateReported: "2023-06-11",
        complainant: "Carol Brown",
        complainantType: "Driver",
        subjectAgainst: "Rider B",
        subjectType: "Rider",
        category: "Other",
        status: "Closed",
        priority: "Medium",
    },
];

export default function ComplaintManagement() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2023, 5, 20),
        to: addDays(new Date(2023, 5, 20), 20),
    });
    const [selectedComplaint, setSelectedComplaint] = React.useState<
        string | null
    >(null);

    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col overflow-hidden">
                

                {/* Main content */}
                <main className="flex-1 overflow-auto p-4">
                    

                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Complaint table */}
                        <div className="flex-1">
                            <div className="bg-white p-4 rounded-lg shadow">
                                {/* Search and filters */}
                                <div className="flex flex-col md:flex-row gap-4 mb-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                            <Input
                                                type="search"
                                                placeholder="Search complaints..."
                                                className="pl-8"
                                            />
                                        </div>
                                    </div>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Statuses
                                            </SelectItem>
                                            <SelectItem value="new">
                                                New
                                            </SelectItem>
                                            <SelectItem value="in-review">
                                                In Review
                                            </SelectItem>
                                            <SelectItem value="escalated">
                                                Escalated
                                            </SelectItem>
                                            <SelectItem value="resolved">
                                                Resolved
                                            </SelectItem>
                                            <SelectItem value="closed">
                                                Closed
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Priorities
                                            </SelectItem>
                                            <SelectItem value="critical">
                                                Critical
                                            </SelectItem>
                                            <SelectItem value="high">
                                                High
                                            </SelectItem>
                                            <SelectItem value="medium">
                                                Medium
                                            </SelectItem>
                                            <SelectItem value="low">
                                                Low
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Categories
                                            </SelectItem>
                                            <SelectItem value="safety">
                                                Safety
                                            </SelectItem>
                                            <SelectItem value="service-quality">
                                                Service Quality
                                            </SelectItem>
                                            <SelectItem value="payment">
                                                Payment
                                            </SelectItem>
                                            <SelectItem value="behavior">
                                                Behavior
                                            </SelectItem>
                                            <SelectItem value="other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="date"
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[260px] justify-start text-left font-normal",
                                                    !date &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date?.from ? (
                                                    date.to ? (
                                                        <>
                                                            {format(
                                                                date.from,
                                                                "LLL dd, y"
                                                            )}{" "}
                                                            -{" "}
                                                            {format(
                                                                date.to,
                                                                "LLL dd, y"
                                                            )}
                                                        </>
                                                    ) : (
                                                        format(
                                                            date.from,
                                                            "LLL dd, y"
                                                        )
                                                    )
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={date?.from}
                                                selected={date}
                                                onSelect={setDate}
                                                numberOfMonths={2}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Complaint table */}
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
                                                    setSelectedComplaint(
                                                        complaint.id
                                                    )
                                                }
                                            >
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        <div
                                                            className={`w-2 h-2 rounded-full ${
                                                                complaint.severity ===
                                                                "high"
                                                                    ? "bg-red-500"
                                                                    : complaint.severity ===
                                                                      "medium"
                                                                    ? "bg-yellow-500"
                                                                    : "bg-green-500"
                                                            }`}
                                                        />
                                                        <span>
                                                            {complaint.id}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {complaint.dateReported}
                                                </TableCell>
                                                <TableCell>
                                                    {complaint.complainant}
                                                    
                                                </TableCell>
                                                <TableCell>
                                                    {complaint.subjectAgainst}
                                                </TableCell>
                                                <TableCell>
                                                    {complaint.category}
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
                                                                Escalate
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
                            </div>
                        </div>

                        {/* Details panel */}
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
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            Incident Timeline
                                        </h3>
                                        <ul className="text-sm text-gray-600 list-disc list-inside">
                                            <li>
                                                2023-06-15 09:30 - Complaint
                                                filed
                                            </li>
                                            <li>
                                                2023-06-15 10:15 - Assigned to
                                                agent
                                            </li>
                                            <li>
                                                2023-06-15 11:00 - Initial
                                                review completed
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            Related Ride Details
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Ride ID: R5678, Date: 2023-06-14,
                                            Driver: John Doe
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            Communication History
                                        </h3>
                                        <div className="text-sm text-gray-600">
                                            <p>
                                                2023-06-15 10:30 - Email sent to
                                                complainant
                                            </p>
                                            <p>
                                                2023-06-15 11:45 - Phone call
                                                with subject
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            Attached Evidence
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            2 images, 1 video file
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            Action History
                                        </h3>
                                        <ul className="text-sm text-gray-600 list-disc list-inside">
                                            <li>
                                                2023-06-15 10:00 - Case opened
                                            </li>
                                            <li>
                                                2023-06-15 11:30 - Escalated to
                                                supervisor
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            Resolution Notes
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Pending resolution. Awaiting
                                            additional information from the
                                            driver.
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
                </main>
            </div>
        </div>
    );
}
