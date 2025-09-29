import { Link, Head } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
            <Head title="404" />
            <Header sticky={false} transparent={false} />
            <main className="flex flex-1 items-center justify-center px-6 py-16">
                <div className="max-w-4xl text-center">
                    {/* Construction Scene Illustration */}
                    <div className="relative mb-12">
                        
                        {/* Background construction elements */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <div className="w-32 h-48 border-8 border-gray-400 rounded-t-lg"></div>
                            <div className="w-40 h-32 bg-gray-300 ml-8 rounded"></div>
                        </div>

                        {/* Main 404 Number */}
                        <div className="relative">
                            <h1 className="text-[220px] md:text-[320px] font-black leading-none text-white select-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] animate-404-float">
                                404
                            </h1>
                            
                            {/* Construction barrier stripe across 404 */}
                            <div className="absolute top-1/2 left-0 right-0 h-20 md:h-15 bg-gradient-to-r from-transparent via-black to-transparent transform -translate-y-1/2 overflow-hidden">
                                <div className="absolute inset-0 flex">
                                    <div className="w-16 h-full bg-yellow-400 transform -skew-x-12"></div>
                                    <div className="w-16 h-full bg-black transform -skew-x-12"></div>
                                    <div className="w-16 h-full bg-yellow-400 transform -skew-x-12"></div>
                                    <div className="w-16 h-full bg-black transform -skew-x-12"></div>
                                    <div className="w-16 h-full bg-yellow-400 transform -skew-x-12"></div>
                                    <div className="w-16 h-full bg-black transform -skew-x-12"></div>
                                    <div className="w-16 h-full bg-yellow-400 transform -skew-x-12"></div>
                                    <div className="w-16 h-full bg-black transform -skew-x-12"></div>
                                    <div className="w-16 h-full bg-yellow-400 transform -skew-x-12"></div>
                                    <div className="w-16 h-full bg-black transform -skew-x-12"></div>
                                    <div className="w-16 h-full bg-yellow-400 transform -skew-x-12"></div>
                                    <div className="w-16 h-full bg-black transform -skew-x-12"></div>
                                </div>
                                {/* moving shine */}
                                <div className="pointer-events-none absolute -inset-10 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-404-shine rotate-6"></div>
                            </div>

                            {/* Construction elements removed as requested */}
                            
                            {/* Traffic cone */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 animate-404-bob">
                                <div className="relative">
                                    <div className="w-12 h-16 md:w-16 md:h-20 bg-gradient-to-b from-orange-500 to-orange-600 clip-triangle mx-auto"></div>
                                    <div className="w-3 h-2 md:w-4 md:h-3 bg-white absolute top-1/4 left-1/2 transform -translate-x-1/2"></div>
                                    <div className="w-3 h-2 md:w-4 md:h-3 bg-white absolute top-2/4 left-1/2 transform -translate-x-1/2"></div>
                                    <div className="w-16 h-3 md:w-20 md:h-4 bg-orange-700 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                                </div>
                            </div>

                            {/* Excavator/Shovel illustration */}
                            <div className="absolute -right-4 md:right-8 bottom-0 text-5xl md:text-7xl origin-bottom-left animate-404-swing">
                                ⛏️
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 mt-16">
                        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900">
                            {t('pages.notFound.title') || 'Ooops... Halaman Tidak Ditemukan'}
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto">
                            {t('pages.notFound.subtitle') || 
                                'Area ini sedang dalam tahap penggalian. Silakan kembali ke halaman utama.'}
                        </p>
                    </div>

                    {/* Action button */}
                    <div className="mt-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-4 text-gray-900 font-bold text-lg transition-all hover:bg-yellow-500 hover:scale-105 hover:shadow-xl"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {t('pages.notFound.backToHome') || 'Kembali ke Beranda'}
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
            
            <style dangerouslySetInnerHTML={{__html: `
                .clip-triangle {
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                }
                 @keyframes notFoundFloat {
                     0%, 100% { transform: translateY(0); }
                     50% { transform: translateY(-10px); }
                 }
                 @keyframes notFoundBob {
                     0%, 100% { transform: translate(-50%, 0) translateY(8px); }
                     50% { transform: translate(-50%, 0) translateY(2px); }
                 }
                 @keyframes notFoundSwing {
                     0% { transform: rotate(-6deg); }
                     50% { transform: rotate(6deg); }
                     100% { transform: rotate(-6deg); }
                 }
                 @keyframes notFoundShine {
                     0% { transform: translateX(-120%) skewX(-10deg); }
                     100% { transform: translateX(120%) skewX(-10deg); }
                 }
                 .animate-404-float { animation: notFoundFloat 4s ease-in-out infinite; }
                 .animate-404-bob { animation: notFoundBob 3.2s ease-in-out infinite; }
                 .animate-404-swing { animation: notFoundSwing 2.8s ease-in-out infinite; }
                 .animate-404-shine { animation: notFoundShine 2.4s linear infinite; }
            `}} />
        </div>
    );
}   