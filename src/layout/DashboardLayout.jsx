import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger and close icons
import DashboardMenu from "../components/Menu/DashboardMenu";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="font-urbanist min-h-screen bg-gray-50 relative">
      
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-white shadow-md px-4 py-3">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <button
          className="text-2xl text-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <HiMenu />
        </button>
      </div>

      <section className="grid grid-cols-12 gap-4">
        {/* Sidebar - desktop */}
        <div className="hidden md:block col-span-2 bg-white  rounded-md p-4">
          <DashboardMenu />
        </div>

        {/* Sidebar - mobile off-canvas */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar panel */}
            <div className="relative w-64 bg-white shadow-md p-4">
              <button
                className="absolute top-4 right-4 text-gray-700 text-2xl"
                onClick={() => setSidebarOpen(false)}
              >
                <HiX />
              </button>
              <DashboardMenu />
            </div>
          </div>
        )}

        {/* Content area */}
        <div className="col-span-12 md:col-span-10 px-4 md:px-5 py-6 md:py-10 rounded-md mt-4 md:mt-10">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;