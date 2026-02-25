import { useTranslation } from '@/hooks/useTranslation';
import { Link } from '@inertiajs/react';
import FloatingWhistleblowerButton from './FloatingWhistleblowerButton';

export default function Footer({ className = '' }) {
    const { t } = useTranslation();

    return (
        <>
            <FloatingWhistleblowerButton />
            <footer className={`w-full bg-neutral-900 py-4 text-center text-white ${className}`} style={{ position: 'relative', zIndex: 100 }}>
            <p className="text-sm text-neutral-300">© 2025 PT Kristalin Ekalestari.</p>
            <p className="mt-2">
                <Link
                    href="/internal-feedback"
                    className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-amber-400"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    {t('pages.internal_feedback.page_title')}
                </Link>
            </p>
        </footer>
        </>
    );
}
