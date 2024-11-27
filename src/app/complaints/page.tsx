"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CarIcon, UserIcon } from "lucide-react";

type Complaint = {
    id: string;
    date: string;
    rideId: string;
    subject: string;
    status: "PENDING" | "RESOLVED" | "DISMISSED";
    description: string;
    complainant: string;
};

const complaints: Complaint[] = [
    {
        id: "1",
        date: "Oct 15, 2024",
        rideId: "RD123",
        subject: "Late Arrival",
        status: "PENDING",
        description: "Driver was 30 minutes late without any communication.",
        complainant: "John Doe",
    },
    {
        id: "2",
        date: "Sep 22, 2024",
        rideId: "RD456",
        subject: "Bad Behavior",
        status: "RESOLVED",
        description: "Driver was rude and unprofessional throughout the ride.",
        complainant: "Jane Smith",
    },
];

export default function ComplaintsLayout() {
    const [selectedComplaint, setSelectedComplaint] =
        useState<Complaint | null>(null);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Complaints</h1>

            <Tabs defaultValue="made" className="w-full">
                {/* <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="made">Complaints I Made</TabsTrigger>
                    <TabsTrigger value="against">
                        Complaints Against Me
                    </TabsTrigger>
                </TabsList> */}
                <TabsContent value="made">
                    <ComplaintsTable
                        complaints={complaints}
                        onSelectComplaint={setSelectedComplaint}
                    />
                </TabsContent>
                <TabsContent value="against">
                    <ComplaintsTable
                        complaints={[]}
                        onSelectComplaint={setSelectedComplaint}
                    />
                </TabsContent>
            </Tabs>

            <ComplaintDetailsModal
                complaint={selectedComplaint}
                onClose={() => setSelectedComplaint(null)}
            />
        </div>
    );
}

function ComplaintsTable({
    complaints,
    onSelectComplaint,
}: {
    complaints: Complaint[];
    onSelectComplaint: (complaint: Complaint) => void;
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Ride ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {complaints.map((complaint) => (
                    <TableRow
                        key={complaint.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => onSelectComplaint(complaint)}
                    >
                        <TableCell>{complaint.date}</TableCell>
                        <TableCell>{complaint.rideId}</TableCell>
                        <TableCell>{complaint.subject}</TableCell>
                        <TableCell>
                            <StatusBadge status={complaint.status} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function StatusBadge({ status }: { status: Complaint["status"] }) {
    const colorMap = {
        PENDING: "bg-yellow-200 text-yellow-800",
        RESOLVED: "bg-green-200 text-green-800",
        DISMISSED: "bg-gray-200 text-gray-800",
    };

    return <Badge className={colorMap[status]}>{status}</Badge>;
}

function ComplaintDetailsModal({
    complaint,
    onClose,
}: {
    complaint: Complaint | null;
    onClose: () => void;
}) {
    if (!complaint) return null;

    return (
        <Dialog open={!!complaint} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Complaint Details</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                        <CarIcon className="w-5 h-5 text-muted-foreground" />
                        <span className="font-semibold">Ride ID:</span>{" "}
                        {complaint.rideId}
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                        <span className="font-semibold">Date:</span>{" "}
                        {complaint.date}
                    </div>
                    <div>
                        <span className="font-semibold">Subject:</span>{" "}
                        {complaint.subject}
                    </div>
                    <div>
                        <span className="font-semibold">Status:</span>{" "}
                        <StatusBadge status={complaint.status} />
                    </div>
                    <div>
                        <span className="font-semibold">Description:</span>
                        <p className="mt-1">{complaint.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <UserIcon className="w-5 h-5 text-muted-foreground" />
                        <span className="font-semibold">Complainant:</span>{" "}
                        {complaint.complainant}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
