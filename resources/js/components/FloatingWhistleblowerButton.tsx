import { useTranslation } from '@/hooks/useTranslation';
import { Link } from '@inertiajs/react';

/**
 * Floating circular whistleblower/internal feedback button, fixed on the right side.
 * Shown on pages that use the public layout (with Footer). Click navigates to /internal-feedback.
 * - Mobile/iOS: positioned lower with safe-area inset for a tidy look.
 * - Prefetch on mount so the internal-feedback page loads quickly on tap.
 */
export default function FloatingWhistleblowerButton() {
    const { t } = useTranslation();

    return (
        <>
            <style>{`
                .floating-wb-btn { bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px)); right: 1rem; }
                @media (min-width: 640px) { .floating-wb-btn { bottom: 1.5rem; right: 1.5rem; } }
            `}</style>
            <Link
                href="/internal-feedback"
                prefetch="mount"
                className="floating-wb-btn fixed z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg ring-2 ring-amber-400/50 transition-all duration-300 hover:scale-110 hover:bg-amber-600 hover:shadow-xl hover:ring-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 active:scale-95"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                title={t('pages.internal_feedback.page_title')}
                aria-label={t('pages.internal_feedback.page_title')}
            >
                <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-hidden
            >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            </Link>
        </>
    );
}
