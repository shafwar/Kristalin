import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "../hooks/useTranslation";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

// Enhanced scroll animations
const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const partners = [
  { 
    name: "Bank Mandiri", 
    logo: (
      <svg className="w-16 h-12" viewBox="0 0 100 50" fill="none">
        <rect x="10" y="15" width="80" height="20" rx="2" fill="#1e3a8a"/>
        <rect x="15" y="20" width="70" height="10" rx="1" fill="white"/>
        <text x="50" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">MANDIRI</text>
      </svg>
    )
  },
  { 
    name: "Pegadaian", 
    logo: (
      <svg className="w-16 h-12" viewBox="0 0 100 50" fill="none">
        <circle cx="50" cy="25" r="20" fill="#fbbf24"/>
        <text x="50" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#444">PG</text>
      </svg>
    )
  },
  { 
    name: "ANTAM", 
    logo: (
      <svg className="w-16 h-12" viewBox="0 0 100 50" fill="none">
        <rect x="10" y="10" width="80" height="30" rx="4" fill="#dc2626"/>
        <text x="50" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">ANTAM</text>
      </svg>
    )
  },
  { 
    name: "Kementerian ESDM", 
    logo: (
      <svg className="w-16 h-12" viewBox="0 0 100 50" fill="none">
        <rect x="15" y="10" width="70" height="30" rx="3" fill="#059669"/>
        <text x="50" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">ESDM</text>
      </svg>
    )
  },
  { 
    name: "Universitas (Riset Geologi)", 
    logo: (
      <svg className="w-16 h-12" viewBox="0 0 100 50" fill="none">
        <rect x="10" y="15" width="80" height="20" rx="2" fill="#7c3aed"/>
        <circle cx="50" cy="25" r="8" fill="white"/>
        <text x="50" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">UNI</text>
      </svg>
    )
  },
];

// CounterAnimation component for smooth animated counter
const CounterAnimation = ({ target, duration = 1000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) {
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        setCount(prevCount => {
          const nextCount = prevCount + increment;
          if (nextCount >= target) {
            clearInterval(timer);
            return target;
          }
          return nextCount;
        });
      }, 16);
      return () => clearInterval(timer);
    }
  }, [hasStarted, target, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1, 
        rotateY: 0,
        transition: { 
          duration: 0.5, 
          ease: "easeInOut",
          scale: { duration: 0.4 },
          rotateY: { duration: 0.7 }
        }
      }}
      viewport={{ once: true }}
      onViewportEnter={() => setHasStarted(true)}
      className="text-6xl md:text-8xl font-bold text-white mb-6"
    >
      {Math.floor(count)}+
    </motion.div>
  );
};



export default function KristalinPortfolio() {
  const { t } = useTranslation();
  const companyProfileRef = React.useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToCompanyProfile = () => {
    if (companyProfileRef.current) {
      companyProfileRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      <Header sticky={true} transparent={true} />
      
      {/* Hero Section with Parallax - PERBAIKAN MOBILE */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <img
            src="https://web-assets.bcg.com/56/d2/d0e00f1a4355852a4bb364c4e513/valuecreationinmining-heroimage.jpg"
            alt={t('pages.line_of_business.alt_texts.mining_future')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>
        
        <motion.div 
          className="relative z-20 w-full max-w-5xl mx-auto text-center px-4 pt-16 pb-4"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.span 
                className="text-white drop-shadow-lg"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {t('pages.line_of_business.hero_title_1')}{" "}
              </motion.span>
              <motion.span 
                className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                {t('pages.line_of_business.hero_title_2')}
              </motion.span>
            </motion.h1>
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg" 
              style={{ letterSpacing: '-1px' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            >
              {t('pages.line_of_business.hero_subtitle')}
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed font-light px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            >
              {t('pages.line_of_business.hero_description')}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Value Cards with FIXED Mobile Responsive */}
        <motion.div 
          className="relative z-20 w-full px-3 sm:px-4 mb-4 sm:mb-6 -mt-2"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
            opacity: Math.max(0.3, 1 - scrollY / 800)
          }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
            >
              {/* Integrity Card - MOBILE OPTIMIZED */}
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 15px 30px rgba(251, 191, 36, 0.2)"
                }}
                className="bg-black/85 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 transition-all duration-300 hover:bg-black/90 hover:border-amber-400/30"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center">
                    {/* Globe SVG Icon - MOBILE SIZED */}
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="white" strokeWidth="2" />
                      <path d="M2 12a10 10 0 0 0 20 0" stroke="white" strokeWidth="2" />
                      <path d="M12 2a15 15 0 0 1 0 20" stroke="white" strokeWidth="2" />
                      <path d="M12 2a15 15 0 0 0 0 20" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3">
                      {t('pages.line_of_business.values.integrity.title')}
                    </h3>
                    <p className="text-white/85 text-xs sm:text-sm lg:text-base font-light leading-relaxed">
                      {t('pages.line_of_business.values.integrity.description')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Commitment Card - MOBILE OPTIMIZED */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 15px 30px rgba(251, 191, 36, 0.2)"
                }}
                className="bg-black/85 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 transition-all duration-300 hover:bg-black/90 hover:border-amber-400/30"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center">
                    {/* People/Team SVG Icon - MOBILE SIZED */}
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="9" cy="10" r="4" stroke="white" strokeWidth="2" />
                      <circle cx="17" cy="13" r="3" stroke="white" strokeWidth="2" />
                      <path d="M2 20c0-2.5 3.5-4.5 7-4.5s7 2 7 4.5" stroke="white" strokeWidth="2" />
                      <path d="M14 20c0-1.5 2-2.5 4-2.5s4 1 4 2.5" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3">
                      {t('pages.line_of_business.values.commitment.title')}
                    </h3>
                    <p className="text-white/85 text-xs sm:text-sm lg:text-base font-light leading-relaxed">
                      {t('pages.line_of_business.values.commitment.description')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Explore Operations Button - MOBILE OPTIMIZED */}
        <motion.div 
          className="relative z-20 w-full px-4 mb-6 sm:mb-8"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            opacity: Math.max(0.4, 1 - scrollY / 700)
          }}
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
        >
          <div className="flex justify-center">
            <motion.button
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToCompanyProfile}
              className="group relative bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-full font-semibold text-sm sm:text-base lg:text-lg overflow-hidden transition-all duration-300 shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                {t('pages.line_of_business.explore_operations_btn')}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator - MOBILE OPTIMIZED */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.8, ease: "easeOut" }}
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2 animate-bounce"></div>
          </div>
        </motion.div>

      </section>

      {/* Company Profile Section */}
      <motion.section 
        ref={companyProfileRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto py-20 px-4"
      >
        <motion.div 
          variants={fadeInUp} 
          transition={{ duration: 0.4, ease: "easeInOut" }} 
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-gray-700 tracking-[0.25em] mb-4">
            {t('pages.line_of_business.company_profile.header')}
          </h2>
          <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
            {t('pages.line_of_business.company_profile.title_line1')}
            <br className="hidden md:block" />
            {t('pages.line_of_business.company_profile.title_line2')}
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Company Details */}
          <motion.div 
            variants={slideInLeft}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex items-start space-x-4"
              >
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-800">{t('pages.line_of_business.company_info.company_name_label')}:</span>
                  <span className="ml-2 text-gray-700">{t('pages.line_of_business.company_info.company_name_value')}</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-start space-x-4"
              >
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-800">{t('pages.line_of_business.company_info.business_field_label')}:</span>
                  <span className="ml-2 text-gray-700">{t('pages.line_of_business.company_info.business_field_value')}</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex items-start space-x-4"
              >
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-800">{t('pages.line_of_business.company_info.established_label')}:</span>
                  <span className="ml-2 text-gray-700">{t('pages.line_of_business.company_info.established_value')}</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex items-start space-x-4"
              >
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-800">{t('pages.line_of_business.company_info.head_office_label')}:</span>
                  <span className="ml-2 text-gray-700">{t('pages.line_of_business.company_info.head_office_value')}</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex items-start space-x-4"
              >
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-800">{t('pages.line_of_business.company_info.business_license_label')}:</span>
                  <span className="ml-2 text-gray-700">{t('pages.line_of_business.company_info.business_license_value')}</span>
                </div>
              </motion.div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4, ease: "easeInOut" }}
              className="text-gray-600 leading-relaxed mt-8 text-lg"
            >
              {t('pages.line_of_business.company_description')}
            </motion.p>
          </motion.div>

          {/* Right Content - Company Logo/Visual */}
          <motion.div 
            variants={scaleIn}
            transition={{ delay: 0.4, duration: 0.4, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md mx-auto text-center"
            >
              <img src="https://kristalin.co.id/wp-content/uploads/2019/10/Logo-Kristalin.png" alt="Kristalin Logo" className="mx-auto mb-6 h-40 w-40 md:h-56 md:w-56 object-contain" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Services Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gray-50 py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            variants={fadeInUp} 
            transition={{ duration: 0.4, ease: "easeInOut" }} 
            className="text-center mb-16"
          >
            <h2 className="text-sm font-semibold text-gray-700 tracking-[0.25em] mb-4">
              {t('pages.line_of_business.services.header')}
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
              {t('pages.line_of_business.services.title')}
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mt-20">
            {/* Gold Mining & Processing */}
            <motion.div 
              variants={slideInLeft}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
              className="text-center"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mb-8"
              >
                <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L19 4L14.74 9.91L21 12L14.74 14.09L19 20L13.09 15.74L12 22L10.91 15.74L5 20L9.26 14.09L3 12L9.26 9.91L5 4L10.91 8.26L12 2Z" />
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-800 mb-6 tracking-wide">
                {t('pages.line_of_business.services.gold_mining.title')}
              </h4>
              <p className="text-gray-600 leading-relaxed font-normal">
                {t('pages.line_of_business.services.gold_mining.description')}
              </p>
            </motion.div>

            {/* Environmental Management */}
            <motion.div 
              variants={slideInRight}
              transition={{ delay: 0.5, duration: 0.4, ease: "easeInOut" }}
              className="text-center"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mb-8"
              >
                <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L11.92 12.25L18.5 5.67L21 7V9ZM3.5 4L2 5.5L10.84 14.34L7.07 18.11C6.68 18.5 6.68 19.13 7.07 19.52C7.46 19.91 8.09 19.91 8.48 19.52L13 15L14.5 16.5L16 15L15 14L14 13L12 11L8.5 7.5L3.5 4Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-800 mb-6 tracking-wide">
                {t('pages.line_of_business.services.environmental.title')}
              </h4>
              <p className="text-gray-600 leading-relaxed font-normal">
                {t('pages.line_of_business.services.environmental.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Achievement Stats Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-black py-20"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                transition: { 
                  duration: 0.7, 
                  ease: "easeInOut",
                  rotate: { duration: 0.7 }
                }
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 360,
                transition: { duration: 0.4 }
              }}
              className="flex justify-center mb-8"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z"/>
                </svg>
              </div>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
              className="text-2xl md:text-3xl text-white mb-4 font-normal"
            >
              {t('pages.line_of_business.projects.title')}
            </motion.h3>
            <CounterAnimation target={15} duration={1000} />
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.4, ease: "easeInOut" }}
              className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              {t('pages.line_of_business.projects.description')}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* How We Work Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-white py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            variants={fadeInUp} 
            transition={{ duration: 0.4, ease: "easeInOut" }} 
            className="text-center mb-16"
          >
            <h2 className="text-sm font-semibold text-gray-700 tracking-[0.25em] mb-4">
              {t('pages.line_of_business.how_we_work.header')}
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
              {t('pages.line_of_business.how_we_work.title_line1')}
              <br className="hidden md:block" />
              {t('pages.line_of_business.how_we_work.title_line2')}
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeInOut" }}
              className="text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotateY: 180 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center group-hover:bg-yellow-600 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                {t('pages.line_of_business.how_we_work.steps.step1.title')}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.line_of_business.how_we_work.steps.step1.description')}
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
              className="text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotateY: 180 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center group-hover:bg-yellow-600 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 6C13.1 6 14 6.9 14 8S13.1 10 12 10 10 9.1 10 8 10.9 6 12 6ZM18 18H6V16.5C6 14.6 9.8 13.5 12 13.5S18 14.6 18 16.5V18Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                {t('pages.line_of_business.how_we_work.steps.step2.title')}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.line_of_business.how_we_work.steps.step2.description')}
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
              className="text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotateY: 180 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center group-hover:bg-yellow-600 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                {t('pages.line_of_business.how_we_work.steps.step3.title')}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.line_of_business.how_we_work.steps.step3.description')}
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: "easeInOut" }}
              className="text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotateY: 180 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center group-hover:bg-yellow-600 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H11.81L14,23L16.19,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5ZM7.5,6H16.5V7.5H7.5V6ZM7.5,9H13.5V10.5H7.5V9ZM7.5,12H16.5V13.5H7.5V12ZM7.5,15H13.5V16.5H7.5V15Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                {t('pages.line_of_business.how_we_work.steps.step4.title')}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.line_of_business.how_we_work.steps.step4.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Enhanced Partners Collaboration Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gray-50 py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            variants={fadeInUp} 
            transition={{ duration: 0.4, ease: "easeInOut" }} 
            className="text-center mb-16"
          >
            <h2 className="text-sm font-semibold text-gray-700 tracking-[0.25em] mb-4">
              {t('pages.line_of_business.collaboration.header')}
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
              {t('pages.line_of_business.collaboration.title')}
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.4, ease: "easeInOut" }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10,
                  rotateX: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 text-center cursor-pointer group hover:shadow-2xl"
              >
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center mb-4 group-hover:brightness-110"
                >
                  {partner.logo}
                </motion.div>
                <div className="text-gray-700 font-medium text-sm group-hover:text-yellow-600 transition-colors">
                  {partner.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

{/* Gold Price Information Section */}
<motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-white py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            variants={fadeInUp} 
            transition={{ duration: 0.4, ease: "easeInOut" }} 
            className="text-center mb-16"
          >
            <h2 className="text-sm font-semibold text-gray-700 tracking-[0.25em] mb-4">
              {t('pages.line_of_business.gold_price.header')}
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
              {t('pages.line_of_business.gold_price.title_line1')}
              <br className="hidden md:block" />
              {t('pages.line_of_business.gold_price.title_line2')}
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <motion.div 
              variants={slideInLeft}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="/gold-bars.jpg" 
                alt={t('pages.line_of_business.gold_price.alt_text')} 
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div 
              variants={slideInRight}
              transition={{ delay: 0.4, duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center text-center"
            >
              <p className="text-lg md:text-xl text-gray-700 mb-8 font-light max-w-lg">
                {t('pages.line_of_business.gold_price.description')}
              </p>
              <a
                href="https://goldprice.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs bg-yellow-500 text-white py-4 px-8 font-bold text-lg rounded-lg shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-yellow-600 hover:scale-105"
              >
                <motion.svg 
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.4 }}
                  className="w-6 h-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                </motion.svg>
                <span>{t('pages.line_of_business.gold_price.button')}</span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

            {/* Why Choose Us Section */}
            <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative py-20 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/hero-linebusiness.png')`
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
                {t('pages.line_of_business.why_choose_us.header')}
              </h2>
              <div className="w-20 h-0.5 bg-yellow-600 mb-8"></div>
              <h3 className="text-4xl md:text-5xl font-normal text-white mb-6 leading-tight">
                {t('pages.line_of_business.why_choose_us.title')}
              </h3>
              <p className="text-xl text-white/90 mb-8">
                {t('pages.line_of_business.why_choose_us.subtitle')}
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
                {t('pages.line_of_business.why_choose_us.contact_button')}
                </a>
              </motion.button>
            </motion.div>

            {/* Right Content - Features */}
            <motion.div 
              variants={slideInRight}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
              className="space-y-6"
            >
              {              [
                t('pages.line_of_business.why_choose_us.features.professional'),
                t('pages.line_of_business.why_choose_us.features.on_time'), 
                t('pages.line_of_business.why_choose_us.features.friendly'),
                t('pages.line_of_business.why_choose_us.features.best_fair')
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