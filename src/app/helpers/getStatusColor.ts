export const getStatusColor = (status) => {
    switch (status) {
        case "COMPLETED":
            return "bg-green-500";
        case "ENROUTE":
            return "bg-blue-500";
        case "CANCELLED":
            return "bg-red-500";
        case "SCHEDULED":
            return "bg-orange-500";
        default:
            return "bg-gray-500";
    }
};
