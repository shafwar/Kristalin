import { useTranslation } from '@/hooks/useTranslation';
import { Link } from '@inertiajs/react';
import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import FloatingActionMenu from './FloatingActionMenu';
import { imageUrl } from '@/lib/assets';

export default function Footer({ className = '', minimal = false }) {
    const { t } = useTranslation();
    
    if (minimal) {
        return (
            <>
                <FloatingActionMenu />
                <footer className={`relative w-full bg-stone-950 py-3 sm:py-4 text-stone-300 overflow-hidden shrink-0 border-t border-white/5 ${className}`} style={{ zIndex: 100 }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent blur-sm" />
                    <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                            <div className="text-stone-400 text-xs sm:text-sm text-center md:text-left font-medium tracking-wide flex items-center gap-2">
                                <span className="text-amber-500 text-[10px]">◆</span> {t('pages.footer.copyright')}
                            </div>
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-stone-400 font-medium tracking-wide">
                                <Link href="/privacy-policy" className="hover:text-amber-400 transition-all duration-300 hover:-translate-y-0.5 inline-block">{t('pages.footer.privacy_policy') || 'Privacy Policy'}</Link>
                                <span className="text-stone-700 hidden sm:inline-block">|</span>
                                <Link href="/terms" className="hover:text-amber-400 transition-all duration-300 hover:-translate-y-0.5 inline-block">{t('pages.footer.terms_of_service') || 'Terms of Service'}</Link>
                                <span className="text-stone-700 hidden sm:inline-block">|</span>
                                <Link href="/internal-feedback" className="hover:text-amber-400 transition-all duration-300 hover:-translate-y-0.5 inline-block">{t('pages.footer.whistleblower') || 'Whistleblower'}</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        );
    }

    return (
        <>
            <FloatingActionMenu />
            <footer className={`relative w-full bg-stone-950 pt-20 pb-8 text-stone-300 overflow-hidden ${className}`} style={{ zIndex: 100 }}>
                {/* Decorative Background Glows */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 -left-20 w-80 h-80 bg-stone-800/40 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                        
                        {/* Brand Column */}
                        <div className="lg:col-span-5 flex flex-col items-start">
                            <Link href="/" className="mb-6 inline-block group">
                                <div className="flex items-center gap-4">
                                    <img 
                                        src="/kristalin-assets/public/Mark-Gold.webp" 
                                        alt="Kristalin Mark" 
                                        className="h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-transform duration-500 group-hover:scale-105" 
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold tracking-tight text-white leading-none">Kristalin</span>
                                        <span className="text-lg font-light tracking-[0.2em] text-stone-400 leading-none mt-1.5 uppercase">Ekalestari</span>
                                    </div>
                                </div>
                            </Link>
                            <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-md mb-8">
                                Trusted partner in integrated gold exploration, refining, and trading since 1989. Committed to sustainable operations and community development across Papua and Indonesia.
                            </p>
                            <div className="flex gap-4">
                                <a 
                                    href="https://instagram.com/kristalin_ekalestari" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-stone-900 border border-stone-800 text-stone-400 transition-all duration-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:-translate-y-1"
                                >
                                    <Instagram className="h-4 w-4" strokeWidth={2} />
                                </a>
                                <a 
                                    href="#" 
                                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-stone-900 border border-stone-800 text-stone-400 transition-all duration-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:-translate-y-1"
                                >
                                    <Linkedin className="h-4 w-4" strokeWidth={2} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links Column */}
                        <div className="lg:col-span-3 lg:col-start-7">
                            <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">Explore</h4>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="/about" className="text-stone-400 hover:text-white transition-colors inline-flex items-center group text-sm md:text-base">
                                        <span className="w-0 h-px bg-amber-400 mr-0 transition-all duration-300 ease-out group-hover:w-6 group-hover:mr-3 opacity-0 group-hover:opacity-100"></span>
                                        {t('pages.welcome.buttons.learn_more') || 'About Us'}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business-activity" className="text-stone-400 hover:text-white transition-colors inline-flex items-center group text-sm md:text-base">
                                        <span className="w-0 h-px bg-amber-400 mr-0 transition-all duration-300 ease-out group-hover:w-6 group-hover:mr-3 opacity-0 group-hover:opacity-100"></span>
                                        Business Activities
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/investor" className="text-stone-400 hover:text-white transition-colors inline-flex items-center group text-sm md:text-base">
                                        <span className="w-0 h-px bg-amber-400 mr-0 transition-all duration-300 ease-out group-hover:w-6 group-hover:mr-3 opacity-0 group-hover:opacity-100"></span>
                                        Investors & Partners
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/csr" className="text-stone-400 hover:text-white transition-colors inline-flex items-center group text-sm md:text-base">
                                        <span className="w-0 h-px bg-amber-400 mr-0 transition-all duration-300 ease-out group-hover:w-6 group-hover:mr-3 opacity-0 group-hover:opacity-100"></span>
                                        Community (CSR)
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Column */}
                        <div className="lg:col-span-3">
                            <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">Contact Us</h4>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-4 text-stone-400 text-sm md:text-base">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 border border-stone-800">
                                        <MapPin className="h-3.5 w-3.5 text-amber-500" />
                                    </div>
                                    <span className="leading-relaxed">Jakarta Head Office<br/>Indonesia</span>
                                </li>
                                <li className="flex items-center gap-4 text-stone-400 text-sm md:text-base">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 border border-stone-800">
                                        <Phone className="h-3.5 w-3.5 text-amber-500" />
                                    </div>
                                    <a href="tel:+622122978900" className="hover:text-white transition-colors">+62 21 22978900</a>
                                </li>
                                <li className="flex items-center gap-4 text-stone-400 text-sm md:text-base">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 border border-stone-800">
                                        <Mail className="h-3.5 w-3.5 text-amber-500" />
                                    </div>
                                    <a href="mailto:info@kristalin.co.id" className="hover:text-white transition-colors">info@kristalin.co.id</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar / Copyright */}
                    <div className="w-full border-t border-stone-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                        <div className="text-stone-500 text-xs sm:text-sm text-center md:text-left font-medium tracking-wide">
                            {t('pages.footer.copyright')}
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-stone-500 font-medium tracking-wide">
                            <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">{t('pages.footer.privacy_policy') || 'Privacy Policy'}</Link>
                            <Link href="/terms" className="hover:text-amber-400 transition-colors">{t('pages.footer.terms_of_service') || 'Terms of Service'}</Link>
                            <Link href="/internal-feedback" className="hover:text-amber-400 transition-colors">{t('pages.footer.whistleblower') || 'Whistleblower'}</Link>
                        </div>
                    </div>
                </div>

                {/* Huge Watermark Typography (Awwwards Style) */}
                <div className="absolute -bottom-8 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none opacity-[0.02]">
                    <span className="text-[18vw] font-black tracking-tighter whitespace-nowrap leading-none text-white">
                        KRISTALIN
                    </span>
                </div>
            </footer>
        </>
    );
}
