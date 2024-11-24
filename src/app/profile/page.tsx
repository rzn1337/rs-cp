// "use client";

// import { useEffect, useState } from "react";
// import {
//     MapPin,
//     CreditCard,
//     Car,
//     Plus,
//     X,
//     CheckCircle2,
//     Eye,
//     Edit,
//     Trash2,
// } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import axios from "axios";

// import { cn } from "@/lib/utils";
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "@/components/ui/tooltip";
// import AddVehicleDialog from "@/components/AddRideDialog";
// const PAYMENT_METHODS = [
//     {
//         id: "visa",
//         name: "Visa",
//         icon: "/visa.svg",
//         description: "**** **** **** 1234",
//     },
//     {
//         id: "mastercard",
//         name: "Mastercard",
//         icon: "/mastercard.svg",
//         description: "**** **** **** 5678",
//     },
//     {
//         id: "paypal",
//         name: "PayPal",
//         icon: "/paypal.svg",
//         description: "john.doe@example.com",
//     },
//     {
//         id: "apple_pay",
//         name: "Apple Pay",
//         icon: "/applepay.svg",
//         description: "iPhone 14 Pro",
//     },
//     {
//         id: "google_pay",
//         name: "Google Pay",
//         icon: "/gpay.svg",
//         description: "Personal Account",
//     },
// ];

// interface Seat {
//     id: string;
//     vehicleID: string;
//     seatNumber: number;
//     isPremium: boolean;
// }

// interface Vehicle {
//     id: string;
//     userID: string;
//     make: string;
//     model: string;
//     year: number;
//     type: string;
//     licensePlate: string;
//     createdAt: string;
//     seats: Seat[];
// }

// // Helper function to generate random ride data for the past year
// const generateRideData = () => {
//     const today = new Date();
//     const oneYearAgo = new Date(
//         today.getFullYear() - 1,
//         today.getMonth(),
//         today.getDate()
//     );
//     const data = {};

//     for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
//         const key = d.toISOString().split("T")[0];
//         data[key] = Math.floor(Math.random() * 5); // 0 to 4 rides per day
//     }

//     return data;
// };

// const rideData = generateRideData();

// export default function UserProfile() {
//     const [selectedPayments, setSelectedPayments] = useState([]);
//     const [isOpen, setIsOpen] = useState(false);

//     const handleSubmit = async (vehicleData) => {
//         // Handle the vehicle and seats creation
//         try {
//             console.log(vehicleData);
//             const response = await axios.post(
//                 "/api/register-vehicle",
//                 vehicleData
//             );
//             setVehicles((prev) => [...prev, response.data.data]);
//             console.log(response);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setIsAddVehicleOpen(false);
//         }
//     };

//     const [vehicles, setVehicles] = useState([]);
//     const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
//     const [selectedVehicle, setSelectedVehicle] = useState(null);
//     const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//     const [user, setUser] = useState(null);

//     const handleEdit = (updatedVehicle: Vehicle) => {
//         // Placeholder for edit functionality
//         setVehicles(
//             vehicles.map((v) =>
//                 v.id === updatedVehicle.id ? updatedVehicle : v
//             )
//         );
//         setIsEditModalOpen(false);
//     };

//     const handleDelete = (id: string) => {
//         // Placeholder for delete functionality
//         setVehicles(vehicles.filter((v) => v.id !== id));
//         setIsDeleteDialogOpen(false);
//     };

//     const handlePaymentMethodToggle = (paymentId) => {
//         setSelectedPayments((prev) =>
//             prev.includes(paymentId)
//                 ? prev.filter((id) => id !== paymentId)
//                 : [...prev, paymentId]
//         );
//     };

//     const handleAddNewVehicle = async (event) => {
//         event.preventDefault();
//         try {
//             // Get form data
//             const vehicleData = {
//                 type: event.target["vehicle-type"].value,
//                 make: event.target["make"].value,
//                 model: event.target["model"].value,
//                 seats: event.target["seats"].value,
//                 year: event.target["year"].value,
//                 licensePlate: event.target["license-plate"].value,
//             };

//             // Send POST request to the API
//             const response = await axios.post(
//                 "/api/register-vehicle",
//                 vehicleData
//             );

//             // Update the vehicles state with the response data
//             setVehicles((prevVehicles) => [
//                 ...prevVehicles,
//                 response.data.data,
//             ]);
//             setIsAddVehicleOpen(false);
//         } catch (error) {
//             console.error("Error registering vehicle:", error);
//         }
//     };

//     useEffect(() => {
//         const fetchVehicles = async () => {
//             const response = await axios.get("/api/get-vehicles");
//             console.log(response);
//             setVehicles(response.data.data);
//         };
//         const fetchUser = async () => {
//             const response = await axios.get("/api/get-user");
//             console.log(response);
//             setUser(response.data.data);
//         };
//         fetchUser();
//         fetchVehicles();
//     }, []);
//     const [hoveredDay, setHoveredDay] = useState(null);

//     const getColor = (count) => {
//         if (count === 0) return "bg-gray-100";
//         if (count === 1) return "bg-green-200";
//         if (count === 2) return "bg-green-300";
//         if (count === 3) return "bg-green-400";
//         return "bg-green-600";
//     };

//     const renderHeatmap = () => {
//         const cells = Object.entries(rideData).map(([date, count]) => (
//             <TooltipProvider key={date}>
//                 <Tooltip>
//                     <TooltipTrigger asChild>
//                         <div
//                             className={`w-3 h-3 rounded-sm ${getColor(count)}`}
//                             onMouseEnter={() => setHoveredDay({ date, count })}
//                             onMouseLeave={() => setHoveredDay(null)}
//                         />
//                     </TooltipTrigger>
//                     <TooltipContent>
//                         <p>
//                             {date}: {count} ride{count !== 1 ? "s" : ""}
//                         </p>
//                     </TooltipContent>
//                 </Tooltip>
//             </TooltipProvider>
//         ));

//         return (
//             <div className="grid grid-cols-[repeat(53,_1fr)] gap-1 mb-4">
//                 {cells}
//             </div>
//         );
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <header className="flex items-center gap-4 mb-8">
//                 <img
//                     src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user?.username}`}
//                     alt={`${user?.username}`}
//                     className="w-24 h-24 rounded-full object-cover"
//                 />
//                 <div>
//                     <h1 className="text-2xl font-bold">John Doe</h1>
//                     <div className="flex items-center"></div>
//                 </div>
//             </header>

//             <Tabs defaultValue="trip-history">
//                 <TabsList className="grid w-full grid-cols-3">
//                     <TabsTrigger value="trip-history">
//                         <MapPin className="w-4 h-4 mr-2" />
//                         Trip History
//                     </TabsTrigger>
//                     <TabsTrigger value="payment-methods">
//                         <CreditCard className="w-4 h-4 mr-2" />
//                         Payment Methods
//                     </TabsTrigger>
//                     <TabsTrigger value="vehicle-info">
//                         <Car className="w-4 h-4 mr-2" />
//                         Vehicle Info
//                     </TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="trip-history">
//                     {/* <Card>
//                         <CardHeader>
//                             <CardTitle>Trip History</CardTitle>
//                             <CardDescription>
//                                 View your past rides on the map and yearly
//                                 overview
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="mb-6">
//                                 <h3 className="text-sm font-medium mb-2">
//                                     Ride Frequency (Past Year)
//                                 </h3>
//                                 {renderHeatmap()}
//                             </div>
//                             <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
//                                 <span className="text-gray-500">
//                                     Interactive Map View
//                                 </span>
//                             </div>
//                         </CardContent>
//                     </Card> */}
//                     TODO:
//                     -> Fix this component.
//                     -> Add a page for user to view their complaints

//                 </TabsContent>
//                 <TabsContent value="payment-methods">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Payment Methods</CardTitle>
//                             <CardDescription>
//                                 Select your preferred payment methods
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 {PAYMENT_METHODS.map((method) => (
//                                     <div
//                                         key={method.id}
//                                         onClick={() =>
//                                             handlePaymentMethodToggle(method.id)
//                                         }
//                                         className={cn(
//                                             "p-4 rounded-lg border-2 cursor-pointer transition-all",
//                                             "hover:border-blue-500 hover:bg-blue-50",
//                                             selectedPayments.includes(method.id)
//                                                 ? "border-blue-500 bg-blue-50"
//                                                 : "border-gray-200"
//                                         )}
//                                     >
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center space-x-4">
//                                                 <img
//                                                     src={method.icon}
//                                                     alt={`${method.name} icon`}
//                                                     className="w-6 h-6"
//                                                 />
//                                                 <div>
//                                                     <h3 className="font-medium">
//                                                         {method.name}
//                                                     </h3>
//                                                     <p className="text-sm text-gray-500">
//                                                         {method.description}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             {selectedPayments.includes(
//                                                 method.id
//                                             ) && (
//                                                 <CheckCircle2 className="w-6 h-6 text-blue-500" />
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="mt-6 flex justify-end">
//                                 <Button>Save Payment Preferences</Button>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </TabsContent>

//                 <TabsContent value="vehicle-info">
//                     <Card>
//                         <CardHeader className="flex flex-row items-center justify-between">
//                             <div>
//                                 <CardTitle>Vehicle Information</CardTitle>
//                                 <CardDescription>
//                                     Manage your registered vehicles
//                                 </CardDescription>
//                             </div>
//                             <Button onClick={() => setIsAddVehicleOpen(true)}>
//                                 <Plus className="w-4 h-4 mr-2" />
//                                 Add Vehicle
//                             </Button>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                                 {vehicles.map((vehicle) => (
//                                     <Card key={vehicle.id}>
//                                         <CardHeader>
//                                             <CardTitle>
//                                                 {vehicle.make +
//                                                     " " +
//                                                     vehicle.model}
//                                             </CardTitle>
//                                         </CardHeader>
//                                         <CardContent>
//                                             <p>
//                                                 Type:{" "}
//                                                 {vehicle.type.toLowerCase()}
//                                             </p>
//                                             <p>Seats: {vehicle.seats.length}</p>
//                                             <p>Year: {vehicle.year}</p>
//                                             <p>
//                                                 License Plate:{" "}
//                                                 {vehicle.licensePlate}
//                                             </p>
//                                             <p>
//                                                 Registration Date:{" "}
//                                                 {
//                                                     new Date(vehicle.createdAt)
//                                                         .toISOString()
//                                                         .split("T")[0]
//                                                 }
//                                             </p>
//                                         </CardContent>
//                                         <CardFooter className="flex justify-between">
//                                             <Button
//                                                 variant="outline"
//                                                 size="icon"
//                                                 onClick={() => {
//                                                     setSelectedVehicle(vehicle);
//                                                     setIsViewModalOpen(true);
//                                                 }}
//                                             >
//                                                 <Eye className="h-4 w-4" />
//                                             </Button>
//                                             <Button
//                                                 variant="outline"
//                                                 size="icon"
//                                                 onClick={() => {
//                                                     setSelectedVehicle(vehicle);
//                                                     setIsEditModalOpen(true);
//                                                 }}
//                                             >
//                                                 <Edit className="h-4 w-4" />
//                                             </Button>
//                                             <Button
//                                                 variant="outline"
//                                                 size="icon"
//                                                 onClick={() => {
//                                                     setSelectedVehicle(vehicle);
//                                                     setIsDeleteDialogOpen(true);
//                                                 }}
//                                             >
//                                                 <Trash2 className="h-4 w-4" />
//                                             </Button>
//                                         </CardFooter>
//                                     </Card>
//                                 ))}
//                             </div>
//                         </CardContent>
//                     </Card>

//                     {/* View Modal */}
//                     <Dialog
//                         open={isViewModalOpen}
//                         onOpenChange={setIsViewModalOpen}
//                     >
//                         <DialogContent>
//                             <DialogHeader>
//                                 <DialogTitle>Vehicle Details</DialogTitle>
//                             </DialogHeader>
//                             {selectedVehicle && (
//                                 <div className="space-y-4">
//                                     <p>
//                                         <strong>Make:</strong>{" "}
//                                         {selectedVehicle.make}
//                                     </p>
//                                     <p>
//                                         <strong>Model:</strong>{" "}
//                                         {selectedVehicle.model}
//                                     </p>
//                                     <p>
//                                         <strong>Year:</strong>{" "}
//                                         {selectedVehicle.year}
//                                     </p>
//                                     <p>
//                                         <strong>Type:</strong>{" "}
//                                         {selectedVehicle.type}
//                                     </p>
//                                     <p>
//                                         <strong>License Plate:</strong>{" "}
//                                         {selectedVehicle.licensePlate}
//                                     </p>
//                                     <p>
//                                         <strong>Registration Date:</strong>{" "}
//                                         {new Date(
//                                             selectedVehicle.createdAt
//                                         ).toLocaleDateString()}
//                                     </p>
//                                     <p>
//                                         <strong>Seats:</strong>
//                                     </p>
//                                     <ul>
//                                         {selectedVehicle.seats.map((seat) => (
//                                             <li key={seat.id}>
//                                                 Seat {seat.seatNumber}:{" "}
//                                                 {seat.isPremium
//                                                     ? "Premium"
//                                                     : "Standard"}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             )}
//                         </DialogContent>
//                     </Dialog>

//                     {/* Edit Modal */}
//                     <Dialog
//                         open={isEditModalOpen}
//                         onOpenChange={setIsEditModalOpen}
//                     >
//                         <DialogContent>
//                             <DialogHeader>
//                                 <DialogTitle>Edit Vehicle</DialogTitle>
//                             </DialogHeader>
//                             {selectedVehicle && (
//                                 <form
//                                     onSubmit={(e) => {
//                                         e.preventDefault();
//                                         const formData = new FormData(
//                                             e.currentTarget
//                                         );
//                                         const updatedVehicle = {
//                                             ...selectedVehicle,
//                                             make: formData.get(
//                                                 "make"
//                                             ) as string,
//                                             model: formData.get(
//                                                 "model"
//                                             ) as string,
//                                             year: parseInt(
//                                                 formData.get("year") as string
//                                             ),
//                                             type: formData.get(
//                                                 "type"
//                                             ) as string,
//                                             licensePlate: formData.get(
//                                                 "licensePlate"
//                                             ) as string,
//                                         };
//                                         handleEdit(updatedVehicle);
//                                     }}
//                                 >
//                                     <div className="space-y-4">
//                                         <div>
//                                             <Label htmlFor="make">Make</Label>
//                                             <Input
//                                                 id="make"
//                                                 name="make"
//                                                 defaultValue={
//                                                     selectedVehicle.make
//                                                 }
//                                             />
//                                         </div>
//                                         <div>
//                                             <Label htmlFor="model">Model</Label>
//                                             <Input
//                                                 id="model"
//                                                 name="model"
//                                                 defaultValue={
//                                                     selectedVehicle.model
//                                                 }
//                                             />
//                                         </div>
//                                         <div>
//                                             <Label htmlFor="year">Year</Label>
//                                             <Input
//                                                 id="year"
//                                                 name="year"
//                                                 type="number"
//                                                 defaultValue={
//                                                     selectedVehicle.year
//                                                 }
//                                             />
//                                         </div>
//                                         <div>
//                                             <Label htmlFor="type">Type</Label>
//                                             <Input
//                                                 id="type"
//                                                 name="type"
//                                                 defaultValue={
//                                                     selectedVehicle.type
//                                                 }
//                                             />
//                                         </div>
//                                         <div>
//                                             <Label htmlFor="licensePlate">
//                                                 License Plate
//                                             </Label>
//                                             <Input
//                                                 id="licensePlate"
//                                                 name="licensePlate"
//                                                 defaultValue={
//                                                     selectedVehicle.licensePlate
//                                                 }
//                                             />
//                                         </div>
//                                     </div>
//                                     <DialogFooter className="mt-4">
//                                         <Button type="submit">
//                                             Save changes
//                                         </Button>
//                                     </DialogFooter>
//                                 </form>
//                             )}
//                         </DialogContent>
//                     </Dialog>

//                     {/* Delete Confirmation Dialog */}
//                     <Dialog
//                         open={isDeleteDialogOpen}
//                         onOpenChange={setIsDeleteDialogOpen}
//                     >
//                         <DialogContent>
//                             <DialogHeader>
//                                 <DialogTitle>Confirm Deletion</DialogTitle>
//                                 <DialogDescription>
//                                     Are you sure you want to delete this
//                                     vehicle? This action cannot be undone.
//                                 </DialogDescription>
//                             </DialogHeader>
//                             <DialogFooter>
//                                 <Button
//                                     variant="outline"
//                                     onClick={() => setIsDeleteDialogOpen(false)}
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     variant="destructive"
//                                     onClick={() =>
//                                         selectedVehicle &&
//                                         handleDelete(selectedVehicle.id)
//                                     }
//                                 >
//                                     Delete
//                                 </Button>
//                             </DialogFooter>
//                         </DialogContent>
//                     </Dialog>
//                 </TabsContent>
//             </Tabs>

//             {/* <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
//                 <DialogContent className="sm:max-w-md">
//                     <DialogHeader>
//                         <DialogTitle>Add New Vehicle</DialogTitle>
//                         <DialogDescription>
//                             Enter the details of your new vehicle here
//                         </DialogDescription>
//                     </DialogHeader>
//                     <form onSubmit={handleAddNewVehicle} className="space-y-4">
//                         <div className="space-y-4">
//                             <div>
//                                 <Label htmlFor="vehicle-type">
//                                     Vehicle Type
//                                 </Label>
//                                 <Select name="vehicle-type">
//                                     <SelectTrigger id="vehicle-type">
//                                         <SelectValue placeholder="Select vehicle type" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="SEDAN">
//                                             Sedan
//                                         </SelectItem>
//                                         <SelectItem value="SUV">SUV</SelectItem>
//                                         <SelectItem value="VAN">Van</SelectItem>
//                                         <SelectItem value="COUPE">
//                                             Coupe
//                                         </SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div>
//                                 <Label htmlFor="make">Make</Label>
//                                 <Input
//                                     id="make"
//                                     name="make"
//                                     placeholder="Enter make"
//                                 />
//                             </div>
//                             <div>
//                                 <Label htmlFor="model">Model</Label>
//                                 <Input
//                                     id="model"
//                                     name="model"
//                                     placeholder="Enter model"
//                                 />
//                             </div>
//                             <div>
//                                 <Label htmlFor="seats">Seat Count</Label>
//                                 <Input
//                                     min={2}
//                                     id="seats"
//                                     name="seats"
//                                     type="number"
//                                     placeholder="Enter seat count"
//                                 />
//                             </div>
//                             <div>
//                                 <Label htmlFor="year">Year</Label>
//                                 <Input
//                                     id="year"
//                                     name="year"
//                                     type="number"
//                                     placeholder="Enter year of vehicle registration"
//                                 />
//                             </div>
//                             <div>
//                                 <Label htmlFor="license-plate">
//                                     License Plate
//                                 </Label>
//                                 <Input
//                                     id="license-plate"
//                                     name="license-plate"
//                                     placeholder="Enter license plate"
//                                 />
//                             </div>
//                         </div>
//                         <DialogFooter>
//                             <Button type="submit">Add Vehicle</Button>
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog> */}

//             <AddVehicleDialog
//                 isOpen={isAddVehicleOpen}
//                 onOpenChange={setIsAddVehicleOpen}
//                 onSubmit={handleSubmit}
//             />
//         </div>
//     );
// }

// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import {
//     CalendarIcon,
//     CarIcon,
//     MapPinIcon,
//     PhoneIcon,
//     MailIcon,
//     UserIcon,
//     User2,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function UserProfile() {
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         const fetchUserProfileData = async () => {
//             const response = await axios.get("/api/get-user-profile");
//             setUserData(response.data.data);
//         };
//         fetchUserProfileData();
//     }, []);

//     return (
//         <div className="container mx-auto p-4">
//             {/* Header Section */}
//             <header className="flex justify-between items-center mb-8 p-6 bg-background rounded-lg shadow">
//                 <div className="flex items-center space-x-4">
//                     <Avatar>
//                         <AvatarImage
//                             src={`https://api.dicebear.com/9.x/notionists/svg?seed=${userData?.username}`}
//                             alt={userData?.username}
//                         />
//                         <AvatarFallback>
//                             <User2 className="h-4 w-4" />
//                         </AvatarFallback>
//                     </Avatar>
//                     <div>
//                         <h1 className="text-3xl font-bold">{userData?.name}</h1>
//                         <p className="text-muted-foreground text-sm">
//                             @ {userData?.username}
//                         </p>
//                         <p className="text-sm text-muted-foreground">
//                             <CalendarIcon className="inline mr-1 w-4 h-4" />
//                             Joined {userData?.createdAt.split("T")[0]}
//                         </p>
//                     </div>
//                 </div>
//                 <Button>Edit Profile</Button>
//             </header>

//             {/* Main Content */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Left Section - 2/3 Width */}
//                 <div className="md:col-span-2 space-y-6">
//                     {/* Recent Rides Card */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Recent Rides</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="space-y-4">
//                                 <div className="flex justify-between items-center">
//                                     <div>
//                                         <p className="font-semibold">
//                                             Downtown → Airport
//                                         </p>
//                                         <p className="text-sm text-muted-foreground">
//                                             May 15, 2023 10:30 AM | $25.50
//                                         </p>
//                                         <p className="text-sm text-muted-foreground">
//                                             Toyota Camry | Seat 2
//                                         </p>
//                                     </div>
//                                     <MapPinIcon className="w-6 h-6 text-muted-foreground" />
//                                 </div>
//                                 <Button variant="outline" className="w-full">
//                                     View All Rides
//                                 </Button>
//                             </div>
//                         </CardContent>
//                         {/* {userData?.bookedRides.map((booking) => (
//                             <CardContent key={booking.id}>
//                                 <div className="space-y-4">
//                                     <div className="flex justify-between items-center">
//                                         <div>
//                                             <p className="font-semibold">
//                                                 Downtown → Airport
//                                             </p>
//                                             <p className="text-sm text-muted-foreground">
//                                                 May 15, 2023 10:30 AM | $25.50
//                                             </p>
//                                             <p className="text-sm text-muted-foreground">
//                                                 Toyota Camry | Seat 2
//                                             </p>
//                                         </div>
//                                         <MapPinIcon className="w-6 h-6 text-muted-foreground" />
//                                     </div>
//                                     <Button
//                                         variant="outline"
//                                         className="w-full"
//                                     >
//                                         View All Rides
//                                     </Button>
//                                 </div>
//                             </CardContent>
//                         ))} */}
//                     </Card>

//                     {/* Registered Vehicles Card */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Registered Vehicles</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="space-y-4">
//                                 <div className="flex justify-between items-center">
//                                     <div>
//                                         <p className="font-semibold">
//                                             Toyota Camry 2020
//                                         </p>
//                                         <p className="text-sm text-muted-foreground">
//                                             License Plate: ABC 123
//                                         </p>
//                                         <p className="text-sm text-muted-foreground">
//                                             <Badge>SEDAN</Badge> | 5 Seats
//                                         </p>
//                                     </div>
//                                     <CarIcon className="w-6 h-6 text-muted-foreground" />
//                                 </div>
//                                 <Button variant="outline" className="w-full">
//                                     Add New Vehicle
//                                 </Button>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     {/* Complaints Section */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Complaints History</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="space-y-4">
//                                 <div className="flex justify-between items-center">
//                                     <div>
//                                         <p className="font-semibold">
//                                             Complaint ID: #12345
//                                         </p>
//                                         <p className="text-sm text-muted-foreground">
//                                             Against: Driver XYZ
//                                         </p>
//                                         <p className="text-sm text-muted-foreground">
//                                             Status:{" "}
//                                             <Badge variant="outline">
//                                                 PENDING
//                                             </Badge>
//                                         </p>
//                                         <p className="text-sm text-muted-foreground">
//                                             Filed on: May 10, 2023
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>

//                 {/* Right Section - 1/3 Width */}
//                 <div className="space-y-6">
//                     {/* Statistics Card */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Statistics</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="space-y-2">
//                                 <p className="text-lg font-semibold">
//                                     Total Rides Count
//                                 </p>
//                                 <p className="text-sm text-muted-foreground">
//                                     As Driver: 50 rides
//                                 </p>
//                                 <p className="text-sm text-muted-foreground">
//                                     As Passenger: 30 rides
//                                 </p>
//                                 <p className="text-sm text-muted-foreground">
//                                     Total Distance Traveled: 1,500 km
//                                 </p>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     {/* Account Details Card */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Account Details</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="space-y-2">
//                                 <p className="flex items-center">
//                                     <MailIcon className="w-4 h-4 mr-2" />
//                                     john.doe@example.com
//                                 </p>
//                                 <p className="flex items-center">
//                                     <PhoneIcon className="w-4 h-4 mr-2" />
//                                     +1 (555) 123-4567
//                                 </p>
//                                 <p className="flex items-center">
//                                     <UserIcon className="w-4 h-4 mr-2" />
//                                     Account Status: Active
//                                 </p>
//                                 <p className="flex items-center">
//                                     <Badge variant="outline" className="mt-2">
//                                         ID Verified
//                                     </Badge>
//                                 </p>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    CalendarIcon,
    CarIcon,
    MapPinIcon,
    PhoneIcon,
    MailIcon,
    UserIcon,
    User2,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import AddVehicleDialog from "@/components/AddRideDialog";
import { VehicleViewDialog } from "@/components/VehileDetailsDialog";

export default function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfileData = async () => {
            const response = await axios.get("/api/get-user-profile");
            setUserData(response.data.data);
        };
        try {
            fetchUserProfileData();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSave = (updatedVehicle) => {
        setVehicle(updatedVehicle);
        console.log("Vehicle updated:", updatedVehicle);
    };

    const handleDelete = async () => {
        console.log(selectedVehicle);
        try {
            const response = await axios.delete(
                `api/delete-vehicle/${selectedVehicle?.id}`
            );
            const updatedVehicles = (userData?.Vehicle || []).filter(
                (vehicle) => vehicle.id !== selectedVehicle.id
            );
            setUserData((prev) => ({ ...prev, Vehicle: updatedVehicles }));
        } catch (error) {
            console.error(error);
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleViewRide = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsDialogOpen(true);
    };

    const handleAddVehicle = async (vehicleData) => {
        try {
            console.log(vehicleData);
            const response = await axios.post(
                "/api/register-vehicle",
                vehicleData
            );
            const updatedVehicles = [...userData?.Vehicle, response.data.data];

            setUserData((prev) => ({ ...prev, Vehicle: updatedVehicles }));
            // setVehicles((prev) => [...prev, response.data.data]);
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsAddVehicleOpen(false);
        }
    };

    return isLoading ?  (<div>Loading...</div>) : (
        <div className="container mx-auto p-4">
            {/* Header Section */}
            <header className="flex justify-between items-center mb-8 p-6 bg-background rounded-lg shadow">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage
                            src={`https://api.dicebear.com/9.x/notionists/svg?seed=${userData?.username}`}
                            alt={userData?.username}
                        />
                        <AvatarFallback>
                            <User2 className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold">{userData?.name}</h1>
                        <p className="text-muted-foreground text-sm">
                            @ {userData?.username}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <CalendarIcon className="inline mr-1 w-4 h-4" />
                            Joined {userData?.createdAt?.split("T")[0]}
                        </p>
                    </div>
                </div>
                <Button>Edit Profile</Button>
            </header>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Section - 2/3 Width */}
                <div className="md:col-span-2 space-y-6">
                    {/* Recent Rides Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Rides</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[200px] w-full pr-4">
                                <div className="space-y-4">
                                    {userData?.bookedRides.map(
                                        (booking, index) => (
                                            <div
                                                key={booking.id}
                                                className="flex justify-between items-center"
                                            >
                                                <div>
                                                    <p className="font-semibold">
                                                        {
                                                            booking.ride.route
                                                                .from
                                                        }{" "}
                                                        →{" "}
                                                        {booking.ride.route.to}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {
                                                            booking.ride.scheduledFor.split(
                                                                "T"
                                                            )[0]
                                                        }
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        ${booking.farePaid}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {
                                                            booking.ride.vehicle
                                                                .make
                                                        }{" "}
                                                        {
                                                            booking.ride.vehicle
                                                                .model
                                                        }{" "}
                                                        | Seat{" "}
                                                        {
                                                            booking.seat
                                                                .seatNumber
                                                        }
                                                    </p>
                                                </div>
                                                <MapPinIcon className="w-6 h-6 text-muted-foreground" />
                                            </div>
                                        )
                                    )}
                                </div>
                            </ScrollArea>
                            <Link href="/myrides">
                                <Button
                                    variant="outline"
                                    className="w-full mt-4"
                                >
                                    View All Rides
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Registered Vehicles Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Registered Vehicles</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[200px] w-full pr-4">
                                <div className="space-y-4">
                                    {userData?.Vehicle.map((vehicle) => (
                                        <>
                                            <div
                                                key={vehicle.id}
                                                className="flex justify-between items-center"
                                            >
                                                <div>
                                                    <p className="font-semibold">
                                                        {vehicle.make}{" "}
                                                        {vehicle.model}{" "}
                                                        {vehicle.year}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        License Plate:{" "}
                                                        {vehicle.licensePlate}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {vehicle._count.seats}{" "}
                                                        Seats | {vehicle.type}
                                                    </p>
                                                </div>
                                                <Button
                                                    onClick={() =>
                                                        handleViewRide(vehicle)
                                                    }
                                                >
                                                    Open Vehicle Details
                                                </Button>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </ScrollArea>
                            <Button
                                variant="outline"
                                className="w-full mt-4"
                                onClick={() => setIsAddVehicleOpen(true)}
                            >
                                Add New Vehicle
                            </Button>
                        </CardContent>
                    </Card>
                    <AddVehicleDialog
                        isOpen={isAddVehicleOpen}
                        onOpenChange={setIsAddVehicleOpen}
                        onSubmit={handleAddVehicle}
                    />

                    {/* Complaints Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Complaints History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[200px] w-full pr-4">
                                <div className="space-y-4">
                                    {userData?.complaintsAsComplainant.map(
                                        (complaint, index) => (
                                            <div
                                                key={complaint.id}
                                                className="flex justify-between items-center"
                                            >
                                                <div>
                                                    <p className="font-semibold">
                                                        Complaint ID:{" "}
                                                        {complaint.altID}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Against:{" "}
                                                        {
                                                            complaint.complainee
                                                                .name
                                                        }
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Status:{" "}
                                                        <Badge variant="outline">
                                                            {complaint.status}
                                                        </Badge>
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Filed on:{" "}
                                                        {
                                                            complaint.createdAt.split(
                                                                "T"
                                                            )[0]
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Section - 1/3 Width */}
                <div className="space-y-6">
                    {/* Statistics Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-lg font-semibold">
                                    Total Rides Count
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    As Driver: {userData?._count.Ride}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    As Passenger: {userData?._count.bookedRides}
                                </p>
                                {/* <p className="text-sm text-muted-foreground">
                                    Time Spent Riding: 1,500 km
                                </p> */}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="flex items-center">
                                    <MailIcon className="w-4 h-4 mr-2" />
                                    {userData?.email}
                                </p>
                                {/* <p className="flex items-center">
                                    <PhoneIcon className="w-4 h-4 mr-2" />
                                    +1 (555) 123-4567
                                </p> */}
                                <p className="flex items-center">
                                    <UserIcon className="w-4 h-4 mr-2" />
                                    Account Status: Active
                                </p>
                                <p className="flex items-center">
                                    <Badge variant="outline" className="mt-2">
                                        ID Verified
                                    </Badge>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {selectedVehicle && (
                <VehicleViewDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    vehicle={selectedVehicle}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
