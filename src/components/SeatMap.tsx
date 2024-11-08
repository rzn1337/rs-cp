import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SeatMap = ({ vehicle, onSeatSelect, selectedSeat }) => {
    const seatConfigs = {
        sedan: {
            rows: 2,  // 1 front row + 1 back row
            layout: [
                [1, null, 'DRIVER'],     // Driver (hidden) + Seat 1 (shotgun)
                [2, 3, 4]                // Back row with 3 seats
            ]
        },
        suv: {
            rows: 3,  // 1 front row + 2 back rows
            layout: [
                ['DRIVER', null, 1],     // Driver (hidden) + Seat 1 (shotgun)
                [2, 3, 4],               // Back rows with 3 seats each
                [5, 6, 7]
            ]
        },
        van: {
            rows: 4,  // 1 front row + 3 back rows
            layout: [
                ['DRIVER', null, 1],     // Driver (hidden) + Seat 1 (shotgun)
                [2, 3, 4],               // Back rows with 3 seats each
                [5, 6, 7],
                [8, 9, 10]
            ]
        }
    };

    const config = seatConfigs[vehicle.type?.toLowerCase()] || seatConfigs.sedan;

    // Helper functions
    const isSeatTaken = (seatId) => vehicle.takenSeats?.includes(seatId);
    const isPremiumSeat = (seatId) => vehicle.premiumSeats?.includes(seatId);
    const shouldShowSeat = (seatId) => seatId !== 'DRIVER';

    return (
        <div className="w-full max-w-xs mx-auto">
            <div className="mb-4 flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm border border-gray-300 bg-white mr-2" />
                    <span>Available</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm border border-gray-300 bg-yellow-100 mr-2" />
                    <span>Premium</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm border border-gray-300 bg-gray-200 mr-2" />
                    <span>Taken</span>
                </div>
            </div>

            <div className="relative bg-white p-4 rounded-lg border">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
                    Front
                </div>

                <div className="space-y-4">
                    {config.layout.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex justify-center space-x-4">
                            {row.map((seatId, seatIndex) => {
                                if (seatId === null) {
                                    return <div key={`space-${seatIndex}`} className="w-8 h-8" />;
                                }

                                if (!shouldShowSeat(seatId)) {
                                    return <div key={seatId} className="w-8 h-8" />;
                                }

                                const taken = isSeatTaken(seatId);
                                const premium = isPremiumSeat(seatId);
                                const selected = selectedSeat === seatId;

                                return (
                                    <Tooltip key={seatId}>
                                        <TooltipTrigger>
                                            <button
                                                className={cn(
                                                    "w-8 h-8 rounded-sm border flex items-center justify-center transition-colors",
                                                    taken && "bg-gray-200 cursor-not-allowed",
                                                    premium && !taken && "bg-yellow-100 hover:bg-yellow-200",
                                                    !premium && !taken && "bg-white hover:bg-gray-100",
                                                    selected && "ring-2 ring-blue-500"
                                                )}
                                                onClick={() => !taken && onSeatSelect(seatId)}
                                                disabled={taken}
                                            >
                                                {selected ? (
                                                    <Check className="h-4 w-4 text-blue-500" />
                                                ) : (
                                                    <span className="text-xs">{seatId}</span>
                                                )}
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                Seat {seatId}
                                                {premium && " (Premium)"}
                                                {taken && " - Taken"}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SeatMap;