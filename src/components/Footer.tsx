import { Car } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="border-t bg-black text-white border-white">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <Car className="h-6 w-6" />
                            {/* <span className="text-xl font-bold">RideShare</span> */}
                        </Link>
                    </div>
                    <nav className="flex flex-wrap justify-center md:justify-end space-x-4 mb-4 md:mb-0">
                        <Link href="/about" className="hover:text-gray-300">
                            About
                        </Link>
                        <Link href="/contact" className="hover:text-gray-300">
                            Contact
                        </Link>
                        <Link href="/terms" className="hover:text-gray-300">
                            Terms of Service
                        </Link>
                        <Link href="/privacy" className="hover:text-gray-300">
                            Privacy Policy
                        </Link>
                    </nav>
                    <div className="text-sm text-gray-400">
                        © {new Date().getFullYear()}. All rights
                        reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
