'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-semibold text-slate-100">Counter: {count}</h2>
      <div className="flex gap-3 justify-center">
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
        >
          Decrement
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

