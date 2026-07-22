import { imageUrl } from '@/lib/assets';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

type SplashScreenProps = {
    minDurationMs?: number;
    fadeDurationMs?: number;
    onDone?: () => void;
};

export function SplashScreen({
    minDurationMs = 2000,
    fadeDurationMs = 900,
    onDone,
}: SplashScreenProps) {
    const [visible, setVisible] = useState(() => {
        if (typeof window !== 'undefined') {
            return !sessionStorage.getItem('splash_played');
        }
        return true;
    });
    const containerRef = useRef<HTMLDivElement>(null);
    const baseLogoRef = useRef<HTMLImageElement>(null);
    const colorLogoWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!visible) {
            onDone?.();
            return;
        }


        const ctx = gsap.context(() => {
            // Initial states: base logo is slightly scaled down and hidden
            gsap.set(baseLogoRef.current, { opacity: 0, scale: 0.96, filter: 'blur(8px)' });
            // Color logo wrapper starts completely cropped from the right
            gsap.set(colorLogoWrapperRef.current, { clipPath: 'inset(0% 100% 0% 0%)' });

            const tl = gsap.timeline({
                onComplete: () => {
                    // Agency-style exit: Smoothly slide the entire splash screen UP to reveal the site
                    gsap.to(containerRef.current, {
                        yPercent: -100,
                        duration: fadeDurationMs / 1000,
                        ease: 'power4.inOut',
                        delay: 0.4,
                        onComplete: () => {
                            if (typeof window !== 'undefined') {
                                sessionStorage.setItem('splash_played', 'true');
                            }
                            setVisible(false);
                            onDone?.();
                        }
                    });
                }
            });

            // 1. Cinematic fade-in of the base silhouette
            tl.to(baseLogoRef.current, {
                opacity: 0.15,
                scale: 1,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: 'power3.out',
            })
            // 2. Elegant color fill wipe (Awwwards preloader style)
            // No cheap glowing lines, just a smooth, mathematically perfect wipe
            .to(colorLogoWrapperRef.current, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.6,
                ease: 'power3.inOut',
            }, '-=0.4');

        }, containerRef);

        return () => ctx.revert();
    }, [fadeDurationMs, onDone]);

    if (!visible) return null;

    const logoSrc = imageUrl('Kristalin-New-Logo.webp');

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#FCFCFC]"
        >
            <div className="relative flex items-center justify-center" style={{ transform: 'translateY(-5vh)' }}>
                
                {/* 1. Base Logo (Subtle Silhouette) */}
                <img 
                    ref={baseLogoRef}
                    src={logoSrc} 
                    alt="Kristalin Ekalestari"
                    className="w-auto h-auto max-w-[85vw] max-h-16 sm:max-h-none sm:h-24 md:h-28 object-contain grayscale opacity-20"
                    style={{ willChange: 'transform, opacity, filter' }}
                />
                
                {/* 2. Full Color Logo (Revealed via smooth clip-path wipe) */}
                <div 
                    ref={colorLogoWrapperRef}
                    className="absolute inset-0 z-10 flex items-center justify-center"
                    style={{ willChange: 'clip-path' }}
                >
                    <img 
                        src={logoSrc} 
                        alt="Kristalin Full Color"
                        className="w-auto h-auto max-w-[85vw] max-h-16 sm:max-h-none sm:h-24 md:h-28 object-contain drop-shadow-sm"
                    />
                </div>
                
            </div>
        </div>
    );
}
