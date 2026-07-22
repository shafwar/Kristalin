import { useTranslation } from '@/hooks/useTranslation';
import { Link } from '@inertiajs/react';
import { Mail, MessageCircle, Phone, Shield, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function FloatingActionMenu() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Corporate Landline Number
    const phoneNumber = '+622122978900';
    const phoneUrl = `tel:${phoneNumber}`;

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div 
            ref={menuRef}
            className="fixed z-[9999] flex flex-col-reverse items-end bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-6 sm:right-6"
        >
            {/* Main Toggle Button */}
            <button
                onClick={toggleMenu}
                className={`relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg ring-2 transition-all duration-300 focus:outline-none focus:ring-offset-2 active:scale-95 ${
                    isOpen 
                    ? 'bg-stone-800 ring-stone-700 hover:bg-stone-900 shadow-xl' 
                    : 'bg-amber-500 ring-amber-400/50 hover:bg-amber-600 hover:shadow-xl hover:ring-amber-400'
                }`}
                aria-label="Toggle Contact Menu"
                style={{ WebkitTapHighlightColor: 'transparent' }}
            >
                <span className={`absolute transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'}`}>
                    <MessageCircle className="h-6 w-6" strokeWidth={2} />
                </span>
                <span className={`absolute transition-all duration-300 ${isOpen ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'}`}>
                    <X className="h-6 w-6" strokeWidth={2} />
                </span>
            </button>

            {/* Pop-up Container Menu */}
            <div className={`mb-4 w-[280px] origin-bottom-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                isOpen ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto' : 'translate-y-4 scale-90 opacity-0 pointer-events-none'
            }`}>
                
                {/* Header Container */}
                <div className="border-b border-stone-100 px-4 py-3">
                    <h3 className="text-sm font-bold text-stone-900">{t('pages.floating_menu.title') || 'How can we help?'}</h3>
                    <p className="mt-0.5 text-xs text-stone-500">{t('pages.floating_menu.subtitle') || 'Choose a way to connect with us'}</p>
                </div>

                {/* List Container */}
                <div className="mt-2 flex flex-col space-y-1">
                    
                    {/* 1. Internal Feedback */}
                    <Link
                        href="/internal-feedback"
                        className="group flex items-center rounded-xl px-3 py-2.5 transition-colors hover:bg-stone-50 focus:bg-stone-50 focus:outline-none"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                            <Shield className="h-4 w-4" strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-medium text-stone-700 transition-colors group-hover:text-amber-600">
                            {t('pages.internal_feedback.page_title') || 'Internal Feedback'}
                        </span>
                    </Link>

                    {/* 2. Phone Call */}
                    <a
                        href={phoneUrl}
                        className="group flex items-center rounded-xl px-3 py-2.5 transition-colors hover:bg-stone-50 focus:bg-stone-50 focus:outline-none"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                            <Phone className="h-4 w-4" strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-medium text-stone-700 transition-colors group-hover:text-blue-600">
                            {t('pages.floating_menu.call_us') || 'Call Us'}
                        </span>
                    </a>

                    {/* 3. Contact Page */}
                    <Link
                        href="/contact"
                        className="group flex items-center rounded-xl px-3 py-2.5 transition-colors hover:bg-stone-50 focus:bg-stone-50 focus:outline-none"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors group-hover:bg-stone-800 group-hover:text-white">
                            <Mail className="h-4 w-4" strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-medium text-stone-700 transition-colors group-hover:text-stone-900">
                            {t('pages.floating_menu.contact_page') || 'Contact Page'}
                        </span>
                    </Link>

                </div>
            </div>
        </div>
    );
}
