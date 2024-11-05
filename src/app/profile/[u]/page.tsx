"use client";

import { useState } from "react";
import {
    Star,
    Shield,
    CheckCircle,
    XCircle,
    MessageCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UserProfile() {
    const [showMore, setShowMore] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true); // Availability indicator
    const [newReview, setNewReview] = useState({
        author: "",
        rating: 0,
        content: "",
    });
    const [reviews, setReviews] = useState([
        {
            author: "Emma S.",
            content: "Great conversation, very punctual!",
            rating: 5,
        },
        {
            author: "Michael L.",
            content: "Safe driver and friendly personality.",
            rating: 5,
        },
        {
            author: "Sarah P.",
            content: "Pleasant ride, would carpool again.",
            rating: 4,
        },
    ]);

    const user = {
        name: "Alex Johnson",
        username: "alexj92",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Eco-friendly commuter, music lover, and software engineer. Always up for a good conversation during rides!",
        joinDate: "September 2021",
        totalRides: 127,
        totalDistance: 1430,
        averageRating: 4.8,
        verifications: ["ID", "Phone", "Email"],
        preferences: ["Quiet rides", "Non-smoking", "Pets allowed"],
    };

    const recentRides = [
        {
            date: "2023-06-15",
            from: "San Francisco",
            to: "San Jose",
            rating: 5,
        },
        { date: "2023-06-10", from: "Oakland", to: "Mountain View", rating: 4 },
        {
            date: "2023-06-05",
            from: "San Francisco",
            to: "Palo Alto",
            rating: 5,
        },
    ];

    const handleReviewSubmit = () => {
        if (newReview.author && newReview.rating && newReview.content) {
            setReviews((prevReviews) => [newReview, ...prevReviews]);
            setNewReview({ author: "", rating: 0, content: "" }); // Reset form
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                            {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left">
                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                        <CardDescription>@{user.username}</CardDescription>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                            {user.verifications.map((verification) => (
                                <Badge key={verification} variant="secondary">
                                    <Shield className="w-3 h-3 mr-1" />
                                    {verification} Verified
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center ml-auto">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-6 h-6 cursor-pointer ${
                                    newReview.rating >= star
                                        ? "text-yellow-500"
                                        : "text-gray-300"
                                }`}
                                onClick={() =>
                                    setNewReview({
                                        ...newReview,
                                        rating: star,
                                    })
                                }
                            />
                        ))}
                    </div>
                </CardHeader>

                <CardContent>
                    <p className="text-muted-foreground mb-4">{user.bio}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="text-lg">
                                    Total Rides
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 text-2xl font-bold">
                                {user.totalRides}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="text-lg">
                                    Total Distance
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 text-2xl font-bold">
                                {user.totalDistance} km
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="text-lg">
                                    Avg. Rating
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold mr-2">
                                        {user.averageRating}
                                    </span>
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="text-lg">
                                    Member Since
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 text-2xl font-bold">
                                {user.joinDate}
                            </CardContent>
                        </Card>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Preferences</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {user.preferences.map((preference, index) => (
                            <Badge key={index} variant="secondary">
                                {preference}
                            </Badge>
                        ))}
                    </div>

                    <h3 className="text-xl font-semibold mb-3">Recent Rides</h3>
                    <div className="space-y-4 mb-6">
                        {recentRides.map((ride, index) => (
                            <Card key={index}>
                                <CardContent className="p-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">
                                            {ride.from} to {ride.to}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {ride.date}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-1">
                                            {ride.rating}
                                        </span>
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* <h3 className="text-xl font-semibold mb-2">Leave a Review</h3>
                    <Card className="p-4 mb-6">
                        <Input
                            placeholder="Your Name"
                            value={newReview.author}
                            onChange={(e) =>
                                setNewReview({ ...newReview, author: e.target.value })
                            }
                            className="mb-2"
                        />
                        <Input
                            placeholder="Rating (1 to 5)"
                            type="number"
                            min="1"
                            max="5"
                            value={newReview.rating}
                            onChange={(e) =>
                                setNewReview({ ...newReview, rating: parseInt(e.target.value) })
                            }
                            className="mb-2"
                        />
                        <Textarea
                            placeholder="Write your review..."
                            value={newReview.content}
                            onChange={(e) =>
                                setNewReview({ ...newReview, content: e.target.value })
                            }
                            className="mb-2"
                        />
                        <Button onClick={handleReviewSubmit}>Submit Review</Button>
                    </Card> */}

                    <h3 className="text-xl font-semibold mb-2">
                        Leave a Review
                    </h3>
                    <Card className="p-4 mb-6">
                        <Input
                            placeholder="Your Name"
                            value={newReview.author}
                            onChange={(e) =>
                                setNewReview({
                                    ...newReview,
                                    author: e.target.value,
                                })
                            }
                            className="mb-2"
                        />
                        <div className="flex items-center mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-6 h-6 cursor-pointer ${
                                        newReview.rating >= star
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                    onClick={() =>
                                        setNewReview({
                                            ...newReview,
                                            rating: star,
                                        })
                                    }
                                />
                            ))}
                        </div>
                        <Button onClick={handleReviewSubmit}>
                            Submit Rating
                        </Button>
                    </Card>

                    <h3 className="text-xl font-semibold mb-3">Reviews</h3>
                    <div className="space-y-4">
                        {reviews
                            .slice(0, showMore ? undefined : 2)
                            .map((review, index) => (
                                <Card key={index}>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="font-semibold">
                                                {review.author}
                                            </p>
                                            <div className="flex items-center">
                                                <span className="mr-1">
                                                    {review.rating}
                                                </span>
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground">
                                            {review.content}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                    {reviews.length > 2 && (
                        <Button
                            variant="link"
                            onClick={() => setShowMore(!showMore)}
                            className="mt-2"
                        >
                            {showMore ? "Show Less" : "Show More"}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
