"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/RideShareSidebar";

export default function SidebarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Define routes where the sidebar should not appear
    const excludeSidebarRoutes = ["/sign-in", "/sign-up", "/"];
    const showSidebar = !excludeSidebarRoutes.includes(pathname);
    

    return (
        <>
            {showSidebar ? (
                <SidebarProvider>
                    <AppSidebar />
                    <main className="flex-1 w-0 overflow-auto">
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            ) : (
                <div>{children}</div>
            )}
        </>
    );
}
