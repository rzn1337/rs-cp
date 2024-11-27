"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Clock, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <div className="text-2xl font-bold text-primary"></div>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <Link
                                    href="#how-it-works"
                                    className="text-gray-600 hover:text-primary"
                                >
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#benefits"
                                    className="text-gray-600 hover:text-primary"
                                >
                                    Benefits
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#faq"
                                    className="text-gray-600 hover:text-primary"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow">
                <section className="bg-black text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Share Rides, Save Money, Reduce Traffic
                        </h1>
                        <p className="text-xl mb-8">
                            Join our carpooling community and enjoy a smarter
                            way to commute
                        </p>
                        <div className="flex justify-center space-x-4 text-black">
                            <Button
                                onClick={() => router.replace("/sign-in")}
                                size="lg"
                                variant="secondary"
                            >
                                Sign Up
                            </Button>

                            <Button
                                onClick={() => router.replace("/sign-in")}
                                size="lg"
                                variant="outline"
                            >
                                Log In
                            </Button>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            How It Works
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <div className="mb-4 flex justify-center">
                                        <Users className="h-12 w-12 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Join as Driver or Passenger
                                    </h3>
                                    <p>
                                        Sign up and choose your role for each
                                        trip. Flexibility is key!
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <div className="mb-4 flex justify-center">
                                        <MapPin className="h-12 w-12 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Find or Offer Rides
                                    </h3>
                                    <p>
                                        Easily search for available rides or
                                        offer your own to fellow commuters.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <div className="mb-4 flex justify-center">
                                        <Clock className="h-12 w-12 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Travel Together
                                    </h3>
                                    <p>
                                        Meet at the designated spot and enjoy a
                                        shared, eco-friendly commute.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section id="benefits" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Benefits of Carpooling
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="flex items-start space-x-4">
                                <DollarSign className="h-8 w-8 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Save Money
                                    </h3>
                                    <p>
                                        Split fuel costs and reduce your daily
                                        commute expenses significantly.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Clock className="h-8 w-8 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Save Time
                                    </h3>
                                    <p>
                                        Access carpool lanes and reduce your
                                        time spent in traffic.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Users className="h-8 w-8 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Meet New People
                                    </h3>
                                    <p>
                                        Connect with like-minded commuters and
                                        expand your social network.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <svg
                                    className="h-8 w-8 text-primary flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Reduce Emissions
                                    </h3>
                                    <p>
                                        Decrease your carbon footprint by
                                        sharing rides and reducing the number of
                                        cars on the road.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="faq" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-6 max-w-2xl mx-auto">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Is it safe to carpool with strangers?
                                </h3>
                                <p>
                                    We prioritize safety with user verification,
                                    ratings, and reviews. You can also choose to
                                    carpool only with coworkers or people from
                                    your organization.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    How do I split costs with my carpool mates?
                                </h3>
                                <p>
                                    Our app calculates fair cost-sharing based
                                    on distance traveled. You can easily settle
                                    up through the app or in person.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    What if my schedule changes?
                                </h3>
                                <p>
                                    No problem! You can easily update your
                                    availability or cancel rides with adequate
                                    notice without penalties.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-primary text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">
                            Ready to Start Carpooling?
                        </h2>
                        <p className="text-xl mb-8">
                            Join our community today and experience a better way
                            to commute!
                        </p>
                        <Button size="lg" variant="secondary">
                            Sign Up Now
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <h3 className="text-xl font-bold mb-4">
                                CarpoolConnect
                            </h3>
                            <p>
                                Connecting commuters for a greener, more
                                efficient future.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <h3 className="text-xl font-bold mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-primary-light"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-primary-light"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-primary-light"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-primary-light"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/3">
                            <h3 className="text-xl font-bold mb-4">
                                Connect With Us
                            </h3>
                            <div className="flex space-x-4">
                                <Link
                                    href="#"
                                    className="hover:text-primary-light"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </Link>
                                <Link
                                    href="#"
                                    className="hover:text-primary-light"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </Link>
                                <Link
                                    href="#"
                                    className="hover:text-primary-light"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.995 16.979H7.005v-9.98h9.99v9.98zM9.503 7.003V5.001h4.994v2.002H9.503zm4.994 2.001v1.996H9.503V9.004h4.994z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-sm">
                        © 2023 CarpoolConnect. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
