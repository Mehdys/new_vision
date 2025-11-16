'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center space-y-6 p-8 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        Counter: <span className="text-4xl">{count}</span>
      </h2>
      <div className="flex gap-4 justify-center flex-wrap">
        <button 
          onClick={() => setCount(count + 1)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105"
        >
          ➕ Increment
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:from-sky-600 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          ➖ Decrement
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-6 py-3 bg-white border-2 border-blue-400 text-blue-600 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all transform hover:scale-105"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

