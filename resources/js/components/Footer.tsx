interface FooterProps {
    text?: string;
    className?: string;
}

export default function Footer({ className = '' }) {
    return (
        <footer className={`w-full bg-neutral-900 py-4 text-center text-white ${className}`} style={{ position: 'relative', zIndex: 50 }}>
            <p>© 2025 PT Kristalin Eka Lestari.</p>
        </footer>
    );
}
