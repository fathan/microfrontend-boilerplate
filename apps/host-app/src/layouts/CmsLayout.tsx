import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function CmsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          flex-shrink-0 transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-60" : "w-16"}
          bg-gray-900 text-white flex flex-col
        `}
      >
        <Sidebar collapsed={!sidebarOpen} />
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="h-14 flex-shrink-0 bg-white border-b border-gray-200 flex items-center px-4">
          <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}