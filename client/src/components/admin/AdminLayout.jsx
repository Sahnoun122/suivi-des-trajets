import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
