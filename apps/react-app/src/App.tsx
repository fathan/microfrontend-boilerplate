import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Vite + React</h1>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center gap-4">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 text-black font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          count is {count}
        </button>
        <p className="text-gray-600 text-center">
          Edit <code className="bg-gray-100 px-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>

      {/* Footer */}
      <p className="mt-6 text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App