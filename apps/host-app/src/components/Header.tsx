import { useLocation } from "react-router-dom";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/react-app": "React App",
  "/vue-app": "Vue App",
};

export default function Header({ onToggleSidebar }: HeaderProps) {
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? "Page";

  return (
    <div className="flex items-center justify-between w-full">
      {/* Left: toggle + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-sm font-semibold text-gray-700">{title}</h1>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors" aria-label="Notifications">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
      </div>
    </div>
  );
}