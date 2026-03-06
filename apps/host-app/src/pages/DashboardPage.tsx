export default function DashboardPage() {
  const cards = [
    { label: "Total Remotes", value: "2", sub: "React + Vue", color: "bg-indigo-500" },
    { label: "Host Framework", value: "React", sub: "TypeScript + Vite", color: "bg-sky-500" },
    { label: "Pattern", value: "MFE", sub: "Module Federation", color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Microfrontend boilerplate dengan Vite Module Federation</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`${card.color} w-10 h-10 rounded-lg flex-shrink-0`} />
            <div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-xs text-gray-500">{card.label}</p>
              <p className="text-xs text-gray-400">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Remote status */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Remote Apps</h3>
        <div className="space-y-3">
          {[
            { name: "ReactApp", url: "http://localhost:5176/assets/remoteEntry.js", path: "/react-app" },
            { name: "VueApp", url: "http://localhost:5177/assets/remoteEntry.js", path: "/vue-app" },
          ].map((remote) => (
            <div key={remote.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-700">{remote.name}</p>
                <p className="text-xs text-gray-400 font-mono">{remote.url}</p>
              </div>
              <a
                href={remote.path}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Open →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}