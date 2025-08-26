import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../AppNavbar/AppNavbar";
import AppFooter from "../AppFooter/AppFooter";

export default function Layout() {
  return (
    <>
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <AppNavbar />
        <main className="flex-1 text-white flex items-center justify-center relative">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </>
  );
}
