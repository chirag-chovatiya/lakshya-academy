"use client"
import { usePathname } from "next/navigation";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Link from "next/link";
import AppNavbar from "./app-navbar";
import { useState } from "react";

export default function AppSidebar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);  
      };
  return (
    <>
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <AppNavbar toggleSidebar={toggleSidebar}/>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul class="space-y-2 font-medium">
            <SidebarLinkGroup
              activeCondition={
                pathname.includes("/students/") || pathname.includes("dashboard")
              }
            >
              {(handleClick, open) => (
                <Link
                  href="/students/"
                  className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                    pathname.includes("/students/")
                      ? "bg-graydark dark:bg-meta-4"
                      : ""
                  }`}
                >
                  <i className="me-3 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 fa-solid fa-house"></i> Dashboard
                </Link>
              )}
            </SidebarLinkGroup>
          </ul>
        </div>
      </aside>
    </>
  );
}
