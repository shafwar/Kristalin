import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type SplashScreenProps = {
    minDurationMs?: number; // durasi minimum tampil
    fadeDurationMs?: number; // durasi fade in/out
    onDone?: () => void; // callback ketika selesai
    title?: string;
    subtitle?: string;
};

export function SplashScreen({
    minDurationMs = 4200,
    fadeDurationMs = 900,
    onDone,
    title = 'Kristalin Ekalestari',
    subtitle = 'Gold Mining Excellence',
}: SplashScreenProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t = window.setTimeout(() => {
            setVisible(false);
            onDone?.();
        }, minDurationMs);
        return () => window.clearTimeout(t);
    }, [minDurationMs, onDone]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: fadeDurationMs / 1000, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        className="flex flex-col items-center justify-center px-8"
                        style={{ transform: 'translateY(-6vh)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Title with Gold Gradient Shimmer Effect - Letter by Letter Animation */}
                        <div className="text-center">
                            <motion.h1
                                className="text-4xl font-normal sm:text-5xl md:text-6xl"
                                style={{
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                    fontWeight: 400,
                                    letterSpacing: '0.016em',
                                    lineHeight: '1.2',
                                }}
                                variants={{
                                    visible: {
                                        transition: { staggerChildren: 0.085, delayChildren: 0.35 },
                                    },
                                }}
                                initial="hidden"
                                animate="visible"
                            >
                                {title.split('').map((letter, index) => (
                                    <motion.span
                                        key={index}
                                        className="shimmer-text inline-block"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, #0c0c0c 0%, #191919 20%, #b88e25 42%, #eacc72 52%, #b88e25 62%, #191919 80%, #0c0c0c 100%)',
                                            backgroundSize: '260% 260%',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        }}
                                        variants={{
                                            hidden: { opacity: 0, y: 26, filter: 'blur(14px)', scale: 0.95 },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                filter: 'blur(0px)',
                                                scale: 1,
                                                transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
                                            },
                                        }}
                                    >
                                        {letter === ' ' ? '\u00A0' : letter}
                                    </motion.span>
                                ))}
                            </motion.h1>

                            {/* Subtitle */}
                            {subtitle && (
                                <motion.p
                                    className="mt-4 text-sm font-medium text-neutral-600 sm:text-base"
                                    style={{
                                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                        fontWeight: 500,
                                        letterSpacing: '0.03em',
                                    }}
                                    initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    transition={{
                                        duration: 0.9,
                                        ease: [0.22, 1, 0.36, 1],
                                        delay: 0.35 + title.length * 0.085,
                                    }}
                                >
                                    {subtitle}
                                </motion.p>
                            )}
                        </div>

                        {/* Skip button removed for a cleaner look */}
                    </motion.div>

                    {/* Shimmer Animation Keyframes */}
                    <style>{`
            @keyframes shimmer {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            .shimmer-text {
              animation: shimmer 6s ease-in-out infinite;
            }
          `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
