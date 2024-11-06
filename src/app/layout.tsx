import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/RideShareSidebar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="flex-1 w-0 overflow-auto">
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            </body>
        </html>
    );
}
