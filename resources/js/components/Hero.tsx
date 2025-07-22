import React from "react";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 bg-white relative overflow-hidden">
      {/* SVG Pattern Emas */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 600 400">
        <g stroke="#FFD700" strokeWidth="1.5">
          <circle cx="100" cy="100" r="80" fill="none" />
          <circle cx="400" cy="300" r="60" fill="none" />
          <line x1="0" y1="0" x2="600" y2="400" />
          <line x1="0" y1="400" x2="600" y2="0" />
        </g>
      </svg>
      <div className="max-w-xl z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Mitra Terpercaya <span className="text-yellow-600">Eksplorasi & Perdagangan Emas</span>
        </h1>
        <p className="mb-8 text-lg text-gray-700">
          Sejak 1989, berkomitmen untuk pertambangan emas berkelanjutan di Papua.
        </p>
        <button className="bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded shadow hover:bg-yellow-600 transition">
          Pelajari Lebih Lanjut
        </button>
      </div>
      <img src="https://kristalin.co.id/wp-content/uploads/2019/10/Logo-Kristalin.png" alt="Kristalin Logo" className="w-64 h-64 object-contain mx-auto md:mx-0 z-10" />
    </section>
  );
} 