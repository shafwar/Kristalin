import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, Variants, Easing, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Enhanced animations with professional timing
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as unknown as Easing[],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Enhanced Counter Animation with counting up effect
interface CounterAnimationProps {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}

const CounterAnimation = ({ target, suffix = "", duration = 2000, delay = 0 }: CounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCounting = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCount(0);
    
    const increment = target / (duration / 50); // Update every 50ms
    let current = 0;
    
    intervalRef.current = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        setCount(target);
        setIsAnimating(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      } else {
        setCount(Math.floor(current));
      }
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      onViewportEnter={() => {
        setTimeout(startCounting, delay);
      }}
      transition={{ 
        duration: 0.8, 
        delay: delay / 1000, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-2 relative overflow-hidden"
      style={{ 
        backgroundImage: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)',
        WebkitBackgroundClip: 'text',
        color: 'transparent'
      }}
    >
      <motion.span
        animate={{ 
          scale: isAnimating ? [1, 1.05, 1] : 1,
          color: isAnimating ? ["#fbbf24", "#f59e0b", "#fbbf24"] : "#fbbf24"
        }}
        transition={{ 
          duration: 0.5,
          repeat: isAnimating ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        {count.toLocaleString()}{suffix}
      </motion.span>
      
      {/* Shimmer effect that starts after counting */}
      {!isAnimating && count === target && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear"
          }}
        />
      )}
    </motion.div>
  );
};

// Professional Mining Icons with enhanced styling
interface IconProps {
  type: string;
  className?: string;
}
const icons: Record<string, React.ReactElement> = {
  mining: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.341A8 8 0 116.343 2.257M22 22l-5-5" />
    </svg>
  ),
  processing: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" />
    </svg>
  ),
  search: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="11" cy="11" r="8" strokeWidth={2} />
      <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth={2} />
    </svg>
  ),
  truck: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="1" y="3" width="15" height="13" rx="2" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8h3l4 4v4a2 2 0 01-2 2h-1" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="9" cy="7" r="4" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="17" cy="7" r="4" strokeWidth={2} />
    </svg>
  ),
  education: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 13.5c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5c0-.638.214-1.24.584-1.922L12 14z" />
    </svg>
  ),
  environment: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22c4.418 0 8-4.03 8-9 0-3.866-3.134-7-7-7S4 9.134 4 13c0 4.97 3.582 9 8 9z" />
    </svg>
  ),
  health: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m-4-4h8" />
    </svg>
  ),
  analytics: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17v-6m4 6V7m4 10v-3" />
    </svg>
  ),
  drone: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  network: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  location: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="17.657" cy="16.657" r="4" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  trophy: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  phone: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.515l.7 2.8a2 2 0 01-.45 1.95l-1.35 1.35a16.001 16.001 0 006.586 6.586l1.35-1.35a2 2 0 011.95-.45l2.8.7A2 2 0 0121 17.72V21a2 2 0 01-2 2h-1C7.163 23 1 16.837 1 9V8a2 2 0 012-2z" />
    </svg>
  ),
  handshake: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17l6 6m0 0l6-6m-6 6V10" />
    </svg>
  ),
  globe: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  ),
};
const Icon = ({ type, className = "w-6 h-6" }: IconProps) => {
  const icon = icons[type] || icons.processing;
  if (React.isValidElement(icon) && icon.type === "svg") {
    return React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className });
  }
  return icon;
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

function EnhancedMiningSectors() {
  const sectors = [
    {
      name: "Gold",
      description: "Ekstraksi emas premium menggunakan teknologi aluvial modern di cekungan Sungai Musairo. Proses berkelanjutan dengan peralatan canggih untuk hasil maksimal sambil menjaga lingkungan.",
      highlight: "Primary Focus"
    },
    {
      name: "Silver", 
      description: "Pemrosesan perak dan logam mulia lainnya melalui sistem separasi terintegrasi. Teknologi penyulingan canggih memastikan kemurnian tinggi dan kualitas terbaik.",
      highlight: "Secondary Operations"
    },
    {
      name: "Other Metals",
      description: "Eksplorasi dan ekstraksi mineral strategis termasuk unsur tanah jarang. Menggunakan survei geologi terdepan untuk identifikasi potensi sumber daya mineral baru.",
      highlight: "Future Development"
    }
  ];
  const images = [
    { src: "/gold1.jpg", alt: "Gold mining" },
    { src: "/silver.jpg", alt: "Silver mining" }
  ];
  const [activeIndex, setActiveIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);
  const [showGoldDetail, setShowGoldDetail] = useState(false);
  // Lock body scroll when modal is open (Gold or Silver)
  const [showSilverDetail, setShowSilverDetail] = useState(false);
  React.useEffect(() => {
    if (showGoldDetail || showSilverDetail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showGoldDetail, showSilverDetail]);
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
              Mining
            </span>{" "}
            <span className="text-gray-800">Sectors</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            To achieve our goals, our company operates in several specialized sectors with 
            advanced technology and sustainable practices across premium mineral extraction operations.
          </p>
        </motion.div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-12 items-center">
          {/* Left Side - Detailed List */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="xl:col-span-3 space-y-8"
          >
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  x: 8,
                  transition: { duration: 0.3 }
                }}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg border border-gray-100 hover:border-amber-200 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  {/* Enhanced Bullet Point */}
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg mt-1"
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </motion.div>
                  <div className="flex-1">
                    {/* Sector Name and Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                        {sector.name}
                      </h3>
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {sector.highlight}
                      </span>
                    </div>
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {sector.description}
                    </p>
                    {/* Learn More Link for Gold */}
                    {sector.name === "Gold" && (
                      <motion.div 
                        className="mt-4 opacity-100"
                        whileHover={{ x: 5 }}
                      >
                        <button
                          type="button"
                          onClick={() => setShowGoldDetail(true)}
                          className="text-amber-600 font-medium text-sm cursor-pointer hover:text-amber-700 inline-flex items-center gap-2 focus:outline-none focus:underline"
                        >
                          Learn more about gold operations
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </motion.div>
                    )}
                    {/* Learn More Link for Silver */}
                    {sector.name === "Silver" && (
                      <motion.div 
                        className="mt-4 opacity-100"
                        whileHover={{ x: 5 }}
                      >
                        <button
                          type="button"
                          onClick={() => setShowSilverDetail(true)}
                          className="text-amber-600 font-medium text-sm cursor-pointer hover:text-amber-700 inline-flex items-center gap-2 focus:outline-none focus:underline"
                        >
                          Learn more about silver operations
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Right Side - Enhanced Visual */}
          <div className="relative overflow-visible xl:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative overflow-visible rounded-2xl shadow-xl bg-white p-12 flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-center overflow-hidden rounded-lg" style={{ minHeight: 240 }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={images[activeIndex].src}
                      src={images[activeIndex].src}
                      alt={images[activeIndex].alt}
                      className="w-full h-auto rounded-lg"
                      style={{ maxHeight: 320 }}
                      initial={{ x: 100, opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
                      animate={{ x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ x: -100, opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
                      transition={{ duration: 1.2, ease: [0.4, 0.0, 0.2, 1] }}
                    />
                  </AnimatePresence>
                </div>
                {/* Image Caption */}
                <div className="mt-4 text-center">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Modern Mining Operations
                  </h4>
                  <p className="text-sm text-gray-600">
                    Advanced equipment and sustainable practices in mineral extraction
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Gold Detail Popup */}
        <AnimatePresence>
        {showGoldDetail && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              onClick={() => setShowGoldDetail(false)}
            />
            {/* Card */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 40 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full px-4 sm:px-8 py-8 border border-amber-200 flex flex-col items-center">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 z-20"
                  onClick={() => setShowGoldDetail(false)}
                  aria-label="Close"
                  tabIndex={0}
                >
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100/80 text-gray-500 hover:bg-red-100 hover:text-red-500 shadow transition-colors duration-200 text-xl border border-gray-200"
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 7L15 15M15 7L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div className="w-full flex justify-center">
                  <img src="/gold1.jpg" alt="Gold Operation" className="rounded-xl object-contain aspect-[4/3] w-full max-w-xs mb-6 bg-white" />
                </div>
                <h2 className="text-2xl font-bold text-amber-600 mb-4 text-center">Gold Operations</h2>
                <p className="text-gray-700 text-base mb-5 leading-relaxed text-center max-w-md">
                  Operasi pertambangan emas kami memanfaatkan teknologi aluvial modern di daerah aliran Sungai Musairo, Papua. Kami berkomitmen pada penambangan yang berkelanjutan, menjaga kelestarian lingkungan, dan memaksimalkan hasil dengan peralatan canggih. Tim kami juga aktif membangun kemitraan dengan masyarakat lokal serta terus berinovasi untuk menciptakan nilai jangka panjang bagi seluruh pemangku kepentingan.
                </p>
                <ul className="text-gray-600 text-base list-disc pl-5 space-y-2 mb-2 max-w-md mx-auto">
                  <li>Teknologi aluvial modern dan efisien</li>
                  <li>Pengelolaan lingkungan yang ketat</li>
                  <li>Program pemberdayaan masyarakat sekitar</li>
                  <li>Produksi emas berkadar tinggi</li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
        {/* Silver Detail Popup */}
        {showSilverDetail && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              onClick={() => setShowSilverDetail(false)}
            />
            {/* Card */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 40 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full px-4 sm:px-8 py-8 border border-amber-200 flex flex-col items-center">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 z-20"
                  onClick={() => setShowSilverDetail(false)}
                  aria-label="Close"
                  tabIndex={0}
                >
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100/80 text-gray-500 hover:bg-red-100 hover:text-red-500 shadow transition-colors duration-200 text-xl border border-gray-200"
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 7L15 15M15 7L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div className="w-full flex justify-center">
                  <img src="/silver.jpg" alt="Silver Operation" className="rounded-xl object-contain aspect-[4/3] w-full max-w-xs mb-6 bg-white" />
                </div>
                <h2 className="text-2xl font-bold text-amber-600 mb-4 text-center">Silver Operations</h2>
                <p className="text-gray-700 text-base mb-5 leading-relaxed text-center max-w-md">
                  Operasi pemrosesan perak kami menggunakan teknologi pemurnian canggih untuk menghasilkan perak berkadar tinggi dengan standar kualitas ekspor. Proses terintegrasi kami memastikan efisiensi, ramah lingkungan, dan konsistensi hasil. Tim kami berkomitmen pada inovasi berkelanjutan dan pengelolaan limbah yang bertanggung jawab demi menjaga kelestarian lingkungan dan memberikan nilai tambah bagi seluruh pemangku kepentingan.
                </p>
                <ul className="text-gray-600 text-base list-disc pl-5 space-y-2 mb-2 max-w-md mx-auto">
                  <li>Teknologi pemurnian canggih</li>
                  <li>Kadar kemurnian tinggi</li>
                  <li>Proses ramah lingkungan</li>
                  <li>Produk perak berkualitas ekspor</li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
        </AnimatePresence>
        {/* Bottom Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center bg-gray-800 rounded-2xl p-8 text-white"
        >
          <h3 className="text-xl font-semibold mb-4">
            Sustainable Mining Excellence
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Our diversified approach across gold, silver, and other metals ensures comprehensive 
            resource utilization while maintaining the highest environmental and safety standards 
            throughout all operations in the mineral-rich Musairo River basin.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// NEW ENHANCED ALLUVIAL GOLD MINING SECTION - MINIMALIST VERSION
function AlluvialGoldMiningSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-gradient-to-r from-amber-500 to-yellow-600 mx-auto mb-6"
          />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ALLUVIAL GOLD MINING
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sustainable mining operations in Papua's mineral-rich region
          </p>
        </motion.div>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Main Text */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                The Papua province of Indonesia is rich of natural resources. Papua joined the Republic of Indonesia May 1st, 1963 
                with a total area of 404,669 kilometer square, and only inhabited by 7,310,000 population, approximately 18 people per kilometer square. 
                The city of Timika that is located in the Mimika district is dominant in the area, where PT Freeport Indonesia, 
                the biggest mining company with the most gold and silver output in the nation is located.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Aside from Mimika, also located in Nabire is a mining site of alluvial gold. As a newly established district, 
                the area contains a high level of minerals, especially gold. PT Kristalin Ekalestari entered the gold mining sector 
                in Nabire on 2007, owning authority to gold mining and exploration for 5000 hectares of land around Nifase village, 
                along the musairo river, Nabire, Papua.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                In 2010, the authority to mine changed into mining lisence for exploration. In addition, in 2011, PT Kristalin Ekalestari 
                was also granted mining lisence for operational production for 198 hectares in Makimi village. To conduct mass mining for 
                alluvial gold, PT Kristalin Ekalestari is cooperating with local and foreign investors to optimize the mining sector, 
                with a noble purpose to improve the local and national economies.
              </p>
            </div>
            {/* Key Operations */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Current Operations</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">Gold exploration in Nabire, Papua</span>
                  </div>
                  <span className="text-amber-600 font-semibold">5,000 Ha</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">Gold processing in Nabire, Papua</span>
                  </div>
                  <span className="text-amber-600 font-semibold">198 Ha</span>
                </div>
              </div>
            </div>
            {/* Economic Impact */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Economic Impact</h3>
              <p className="text-gray-700 leading-relaxed">
                Gold minerals have a significant role in improving the nation's economy. PT Kristalin Ekalestari aims to contribute 
                to the region's government, optimizing underdeveloped economies of local areas, and support potential mining sites in Nabire, Papua.
              </p>
            </div>
          </motion.div>
          {/* Right Column - Image & Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/tracktor.png"
                alt="Gold mining operations" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-medium">Modern Mining Equipment</p>
                <p className="text-xs opacity-90">Nabire, Papua</p>
              </div>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">2007</div>
                <div className="text-sm text-gray-600">Est. Year</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">17+</div>
                <div className="text-sm text-gray-600">Years Exp</div>
              </div>
            </div>
            {/* Timeline */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-gray-800">2007</span>
                    <span className="text-gray-600 text-sm ml-2">Mining authority granted</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-gray-800">2010</span>
                    <span className="text-gray-600 text-sm ml-2">Exploration license</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-gray-800">2011</span>
                    <span className="text-gray-600 text-sm ml-2">Production license</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function BusinessActivityPage() {
  const miningSectorsRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header sticky={true} transparent={true} />
      
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <img
            src="https://i0.wp.com/startuptipsdaily.com/wp-content/uploads/2017/06/mining-business-ideas-and-opportunity.jpg?fit=3072%2C2048&ssl=1"
            alt="Mining Operations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>
        <motion.div 
          className="relative z-20 w-full max-w-5xl mx-auto text-center px-4 py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="transform transition-all duration-1000 ease-out"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: Math.max(0, 1 - scrollY / 600)
            }}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.span 
                className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Business
              </motion.span>
              <br />
              <motion.span 
                className="text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                Activities
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/95 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            >
              Premium gold mining operations with sustainable practices and cutting-edge technology for Indonesia's future.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            >
              <motion.button
                onClick={() => {
                  if (miningSectorsRef.current) {
                    miningSectorsRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group relative bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-12 py-5 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Operations
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Mining Sectors Section */}
      <div ref={miningSectorsRef}>
        <EnhancedMiningSectors />
      </div>

      {/* Our Location Section - BLACK BACKGROUND */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative py-20 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/nabire.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-amber-400 text-sm font-medium tracking-wider uppercase"
            >
              OUR LOCATION
            </motion.span>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 bg-amber-400 mx-auto mt-2 mb-8"
            />
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
            >
              Strategic Mining Location
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-gray-200 max-w-5xl mx-auto leading-relaxed font-normal mb-12"
            >
              PT Kristalin Ekalestari explores gold along the Musairo River, in Makimi district, Nabire, Papua. 
              The exploration site spans 60km towards the eastern town of Nabire. Our location can be travelled 
              by land transportation for 1.5 to 2 hours, reaching Legari village/SP-1, then using a specialized 
              4x4 vehicle along the Musairo river for another 10km that takes about 0.5 hours.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Map/Visual */}
            <motion.div 
              variants={slideInLeft}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-500">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden relative">
                  {/* Simple Map Placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 relative">
                    {/* Papua Island Shape Representation */}
                    <div className="absolute inset-4 bg-gradient-to-br from-green-700 to-green-800 rounded-lg opacity-80 transform rotate-12"></div>
                    <div className="absolute inset-6 bg-gradient-to-br from-green-600 to-green-700 rounded-lg opacity-90 transform rotate-6"></div>
                    {/* Location Marker */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.4 }}
                      className="absolute top-1/2 right-1/3 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    >
                      <div className="relative">
                        <motion.div 
                          animate={{ 
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(251, 191, 36, 0.7)",
                              "0 0 0 10px rgba(251, 191, 36, 0)",
                              "0 0 0 0 rgba(251, 191, 36, 0)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="w-5 h-5 bg-amber-400 rounded-full shadow-lg"
                        />
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-amber-400 text-black px-3 py-1 rounded text-xs font-medium whitespace-nowrap"
                      >
                        PT Kristalin Ekalestari
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-400"></div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-6 text-center"
                >
                  <p className="text-gray-300 text-sm font-medium">
                    Musairo River Basin, Makimi District, Nabire, Papua
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Details */}
            <motion.div variants={slideInRight} className="space-y-8">
              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-500">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-xl font-semibold text-white mb-6"
                  >
                    Mining Area Details
                  </motion.h3>
                  <div className="space-y-4">
                    {[
                      { label: "Total Area", value: "4,200 Hectares", icon: "location" },
                      { label: "Distance from Nabire", value: "60 km", icon: "truck" },
                      { label: "Land Transportation", value: "1.5 - 2 Hours", icon: "truck" },
                      { label: "River Access", value: "10 km (30 mins)", icon: "location" }
                    ].map((detail) => (
                      <motion.div 
                        key={detail.label}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ x: 8, scale: 1.02 }}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div 
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center group-hover:bg-amber-400 transition-colors duration-300"
                          >
                            <Icon type={detail.icon} className="w-4 h-4 text-white" />
                          </motion.div>
                          <span className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                            {detail.label}
                          </span>
                        </div>
                        <span className="text-white font-semibold group-hover:text-amber-400 transition-colors duration-300">
                          {detail.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-500">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-xl font-semibold text-white mb-6"
                  >
                    Mineral Resources
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-gray-400 text-sm font-normal leading-relaxed mb-6"
                  >
                    Based on geological observation of the surface and construction of testing wells 
                    as well as drillings conducted by our internal exploration team, the potential area 
                    covers 4,200 hectares with significant inferred mineral resources.
                  </motion.p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "32.7", label: "Tons AU (Total Resources)" },
                      { value: "13.7", label: "Tons AU (Ready to Mine)" }
                    ].map((stat) => (
                      <motion.div 
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="text-2xl font-bold text-amber-400 mb-1 group-hover:text-amber-300 transition-colors duration-300">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Alluvial Gold Mining Section */}
      <AlluvialGoldMiningSection />

      {/* Our Achievements Section - BLACK BACKGROUND */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="py-20 bg-black"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1, color: "#fbbf24" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Our </span>
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Achievements</span>
            </motion.h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-6"></div>
            <p className="text-base md:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed font-normal">
              Proven track record of excellence in sustainable mining operations and community development.
            </p>
          </motion.div>
          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { 
                number: 18, 
                label: "Years Experience", 
                description: "Proven mining operations with sustainable practices",
                icon: "trophy",
                suffix: "+"
              },
              { 
                number: 12, 
                label: "Mining Sites", 
                description: "Active locations across Papua region",
                icon: "location",
                suffix: ""
              },
              { 
                number: 46, 
                label: "Gold Reserves", 
                description: "Tons of proven mineral resources identified",
                icon: "mining",
                suffix: ".4T"
              },
              { 
                number: 99, 
                label: "Success Rate", 
                description: "Project completion and safety compliance",
                icon: "analytics",
                suffix: "%"
              }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15, 
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -12,
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(251, 191, 36, 0.25)",
                  borderColor: "rgba(251, 191, 36, 0.6)"
                }}
                className="group text-center p-8 bg-gray-900/50 backdrop-blur-sm border border-amber-500/20 hover:border-amber-400/40 rounded-2xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="p-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl w-fit mx-auto mb-6"
                  >
                    <Icon type={stat.icon} className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <CounterAnimation 
                    target={stat.number} 
                    suffix={stat.suffix}
                    duration={2000}
                    delay={index * 300}
                  />
                  
                  <h4 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors duration-300 mb-3">
                    {stat.label}
                  </h4>
                  
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed font-normal">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Community Impact - ENHANCED BACKGROUND */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-50px" }}
        className="py-24 bg-gradient-to-br from-gray-50 via-white to-amber-50/30 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-300 rounded-full blur-3xl opacity-20"></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e0b' fill-opacity='0.3'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              Community Impact
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Community <span className="text-amber-600">Impact</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Creating meaningful change through sustainable development and community empowerment
            </p>
          </motion.div>

          {/* Main Content - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
          >
            {/* Image with Enhanced Background */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white p-2">
                <img
                  src="/comdevelop.jpg"
                  alt="Community Development"
                  className="w-full h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-2 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>

            {/* Content with Enhanced Background */}
            <div className="relative">
              <div className="absolute -inset-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50"></div>
              <div className="relative p-6 space-y-8">
                <div>
                  <div className="inline-block bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    Community Development
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    Empowering Local Communities
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Aside from big scale gold mining activities, PT Kristalin Ekalestari also supports gold mining businesses of the locals. This collaboration with the locals with customary rights aim to improve local gold commodity. Local minings are supported and trained to assure excellent processing, effectivity, and efficiency.
                  </p>
                </div>
                
                {/* Enhanced Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-bold text-amber-600 mb-1">350+</div>
                    <div className="text-sm text-gray-500">Miners Trained</div>
                  </div>
                  <div className="text-center p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-bold text-amber-600 mb-1">95%</div>
                    <div className="text-sm text-gray-500">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-bold text-amber-600 mb-1">12</div>
                    <div className="text-sm text-gray-500">Villages</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Impact Areas - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: "users",
                title: "Employment",
                value: "750+",
                description: "Jobs created for local communities"
              },
              {
                icon: "education", 
                title: "Training",
                value: "350+",
                description: "People trained in mining skills"
              },
              {
                icon: "environment",
                title: "Environment",
                value: "200+",
                description: "Hectares of land restored"
              },
              {
                icon: "health",
                title: "Healthcare",
                value: "8",
                description: "Medical facilities established"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                {/* Card Background Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                
                <div className="relative text-center p-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-gradient-to-br from-amber-100 to-yellow-100 border border-amber-200 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Icon type={item.icon} className="w-7 h-7 text-amber-600" />
                  </motion.div>
                  
                  <div className="text-3xl font-bold text-gray-900 mb-2">{item.value}</div>
                  <div className="text-lg font-semibold text-gray-800 mb-2">{item.title}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Partnership Summary - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 rounded-3xl blur-2xl"></div>
            
            <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Building Sustainable Communities
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                Our commitment to community development goes beyond mining operations. We advocate for local miners to get proper licensing and optimize gold commodity through sustainable practices, improving living standards in Nabire, Papua.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "25+", label: "Partner Villages" },
                  { value: "40+", label: "Active Programs" },
                  { value: "$2.5M", label: "Annual Investment" },
                  { value: "5000+", label: "Lives Improved" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <div className="text-3xl font-bold text-amber-600 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative py-20 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://i0.wp.com/startuptipsdaily.com/wp-content/uploads/2017/06/mining-business-ideas-and-opportunity.jpg?fit=3072%2C2048&ssl=1')`
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              variants={slideInLeft}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h2 className="text-sm font-semibold text-white tracking-[0.25em] mb-4">
                WHY CHOOSE US
              </h2>
              <div className="w-20 h-0.5 bg-yellow-600 mb-8"></div>
              <h3 className="text-4xl md:text-5xl font-normal text-white mb-6 leading-tight">
                Experience Work With Global Industries
              </h3>
              <p className="text-xl text-white/90 mb-8">
                ARE ALWAYS READY TO SERVE
              </p>
              
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, backgroundColor: "white", color: "black" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 font-semibold tracking-wide transition-all duration-300"
              >
                <a href="/contact">
                CONTACT US
                </a>
              </motion.button>
            </motion.div>

            {/* Right Content - Features */}
            <motion.div 
              variants={slideInRight}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
              className="space-y-6"
            >
              {[
                "We Have Professional Workers",
                "On Time In Progress", 
                "Friendly To Serve Customers",
                "Give The Best & Fair"
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4, ease: "easeInOut" }}
                  className="flex items-center space-x-4 group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                    className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z"/>
                    </svg>
                  </motion.div>
                  <span className="text-white text-lg group-hover:text-yellow-300 transition-colors duration-300">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}