export default function Footer({ className = '' }) {
    return (
        <footer className={`w-full bg-neutral-900 py-4 text-center text-white ${className}`} style={{ position: 'relative', zIndex: 100 }}>
            <p className="text-sm text-neutral-300">© 2025 PT Kristalin Ekalestari.</p>
        </footer>
    );
}
