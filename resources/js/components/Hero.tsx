export default function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-between overflow-hidden bg-white px-8 py-20 md:flex-row">
            {/* SVG Pattern Emas */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-10" viewBox="0 0 600 400">
                <g stroke="#FFD700" strokeWidth="1.5">
                    <circle cx="100" cy="100" r="80" fill="none" />
                    <circle cx="400" cy="300" r="60" fill="none" />
                    <line x1="0" y1="0" x2="600" y2="400" />
                    <line x1="0" y1="400" x2="600" y2="0" />
                </g>
            </svg>
            <div className="z-10 max-w-xl">
                <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                    Mitra Terpercaya <span className="text-yellow-600">Eksplorasi & Perdagangan Emas</span>
                </h1>
                <p className="mb-8 text-lg text-gray-700">Sejak 1989, berkomitmen untuk pertambangan emas berkelanjutan di Papua.</p>
                <button className="rounded bg-yellow-500 px-8 py-3 font-bold text-gray-900 shadow transition hover:bg-yellow-600">
                    Pelajari Lebih Lanjut
                </button>
            </div>
            <img src="/kristalinlogotransisi1.png" alt="Kristalin Logo" className="z-10 mx-auto h-64 w-64 object-contain md:mx-0" />
        </section>
    );
}
