import * as React from "react";
import { useState, useEffect } from "react";
import { motion, Variants, Easing } from "framer-motion";
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

// Enhanced Counter Animation with gold shimmer effect
interface CounterAnimationProps {
  target: number;
  duration?: number;
  suffix?: string;
}
const CounterAnimation = ({ target, duration = 2500, suffix = "+" }: CounterAnimationProps) => {
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
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      onViewportEnter={() => setHasStarted(true)}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative"
    >
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-2 animate-shimmer">
        {Math.floor(count)}{suffix}
      </div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={hasStarted ? { backgroundPosition: ["-200% 0", "200% 0"] } : {}}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
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

export default function BusinessActivityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Background image */}
        <img
          src="https://i0.wp.com/startuptipsdaily.com/wp-content/uploads/2017/06/mining-business-ideas-and-opportunity.jpg?fit=3072%2C2048&ssl=1"
          alt="Mining Operations"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Main Content */}
        <div className="relative z-20 w-full max-w-4xl mx-auto text-center px-4 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Business
              </span>
              <br />
              <span className="text-white">Activities</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-normal drop-shadow"
            >
              Premium gold mining operations with sustainable practices and cutting-edge technology
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(251, 191, 36, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-10 py-4 rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10">Explore Operations</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Business Sectors - WHITE BACKGROUND */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1, color: "#fbbf24" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Mining
              </span>
              <span className="text-gray-800"> Sectors</span>
            </motion.h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-6"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-normal">
              Diversified operations across premium gold extraction, precious metals processing, 
              and strategic mineral exploration
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              {[
                { 
                  icon: "mining",
                  name: "Premium Gold Mining", 
                  description: "Advanced alluvial gold extraction using sustainable processing techniques in the mineral-rich Musairo River basin with state-of-the-art equipment",
                  highlight: "Primary Focus",
                  stats: "85% Revenue"
                },
                { 
                  icon: "processing",
                  name: "Silver & Precious Metals", 
                  description: "Comprehensive secondary mineral processing operations through integrated separation systems and advanced refinement technology",
                  highlight: "Value Addition",
                  stats: "12% Revenue"
                },
                { 
                  icon: "search",
                  name: "Rare Earth Elements", 
                  description: "Strategic exploration and extraction of rare earth minerals using cutting-edge geological survey technology and sustainable methods",
                  highlight: "Future Growth",
                  stats: "3% Revenue"
                }
              ].map((sector) => (
                <motion.div 
                  key={sector.name}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.06, y: -6, boxShadow: "0 8px 32px rgba(251,191,36,0.12)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="group bg-gray-50 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 hover:border-amber-400/40 transition-all duration-500"
                >
                  <div className="flex items-start gap-6">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="p-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl"
                    >
                      <Icon type={sector.icon} className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                          {sector.name}
                        </h3>
                        <div className="flex flex-col items-end space-y-1">
                          <span className="text-xs bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1 rounded-full font-semibold">
                            {sector.highlight}
                          </span>
                          <span className="text-xs text-amber-600 font-medium">
                            {sector.stats}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {sector.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="relative bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-700 p-10 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 text-center text-black">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 bg-black/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm"
                  >
                    <Icon type="mining" className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold mb-6">Alluvial Gold Mining</h3>
                  <p className="text-base opacity-90 mb-8 leading-relaxed">
                    Advanced operations utilizing precision equipment for maximum yield 
                    while maintaining environmental responsibility and sustainability standards
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-black/20 p-4 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl font-bold mb-1">4,200</div>
                      <div className="text-sm opacity-90">Hectares</div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl font-bold mb-1">46.4</div>
                      <div className="text-sm opacity-90">Tons Gold</div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Location Section - BLACK BACKGROUND */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="py-20 bg-black"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
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
              className="text-base md:text-lg text-gray-400 max-w-5xl mx-auto leading-relaxed font-normal mb-12"
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
              variants={fadeInUp}
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
            <motion.div variants={staggerContainer} className="space-y-8">
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

      {/* Advanced Technology Section - WHITE BACKGROUND */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1, color: "#fbbf24" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Advanced
              </span>
              <span className="text-gray-800"> Technology</span>
            </motion.h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-6"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-normal">
              Leveraging cutting-edge technology for efficient, sustainable, and safe mining operations
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                title: "AI Analytics", 
                description: "Machine learning algorithms for resource optimization, predictive maintenance, and operational efficiency enhancement", 
                icon: "analytics",
                features: ["Predictive Analysis", "Real-time Monitoring", "Automated Optimization", "Risk Assessment"],
                percentage: "40% Efficiency Gain"
              },
              { 
                title: "Drone Surveillance", 
                description: "Advanced aerial monitoring systems for safety protocols, environmental compliance, and site security", 
                icon: "drone",
                features: ["24/7 Monitoring", "Safety Compliance", "Environmental Tracking", "Security Patrol"],
                percentage: "95% Coverage"
              },
              { 
                title: "IoT Network", 
                description: "Connected sensor networks for equipment monitoring, automated control systems, and data analytics", 
                icon: "network",
                features: ["Smart Sensors", "Remote Control", "Data Analytics", "Equipment Health"],
                percentage: "99.9% Uptime"
              }
            ].map((tech) => (
              <motion.div 
                key={tech.title}
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
                }}
                className="group bg-gray-50 backdrop-blur-sm border border-gray-200 hover:border-amber-400/40 rounded-2xl p-8 transition-all duration-500 relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="p-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl"
                    >
                      <Icon type={tech.icon} className="w-8 h-8 text-white" />
                    </motion.div>
                    <span className="text-sm font-semibold text-amber-600 bg-amber-500/20 px-3 py-1 rounded-full">
                      {tech.percentage}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-gray-800 group-hover:text-amber-600 transition-colors duration-300 mb-4">
                    {tech.title}
                  </h4>
                  
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-6 leading-relaxed text-sm font-normal">
                    {tech.description}
                  </p>
                  
                  <div className="space-y-3">
                    {tech.features.map((feature) => (
                      <motion.div 
                        key={feature} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.2 }}
                          className="w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mr-3"
                        />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

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
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
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
            ].map((stat) => (
              <motion.div 
                key={stat.label}
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
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
                  
                  <CounterAnimation target={stat.number} suffix={stat.suffix} />
                  
                  <h4 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors duration-300 mb-3">
                    {stat.label}
                  </h4>
                  
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed font-normal">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Community Impact - WHITE BACKGROUND */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1, color: "#fbbf24" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Community
              </span>
              <span className="text-gray-800"> Impact</span>
            </motion.h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-6"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-normal">
              Creating lasting positive impact through sustainable development and environmental stewardship
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={staggerContainer} className="space-y-8">
              {[
                { 
                  icon: "users", 
                  title: "Local Employment", 
                  description: "Sustainable employment opportunities for local communities with competitive compensation packages and comprehensive benefits",
                  stat: "750+ Jobs Created",
                  impact: "Direct employment"
                },
                { 
                  icon: "education", 
                  title: "Skills Development", 
                  description: "Comprehensive training programs in mining technology, safety protocols, and technical expertise development",
                  stat: "350+ Trained",
                  impact: "Certified professionals"
                },
                { 
                  icon: "environment", 
                  title: "Environmental Restoration", 
                  description: "Land rehabilitation, reforestation initiatives, and biodiversity conservation programs with measurable outcomes",
                  stat: "200+ Hectares",
                  impact: "Restored land"
                },
                { 
                  icon: "health", 
                  title: "Healthcare Infrastructure", 
                  description: "Modern medical facilities and comprehensive health programs for community healthcare advancement",
                  stat: "8 Facilities",
                  impact: "Healthcare centers"
                }
              ].map((impact) => (
                <motion.div 
                  key={impact.title}
                  variants={fadeInUp}
                  whileHover={{ 
                    x: 10,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
                  }}
                  className="group bg-gray-50 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 hover:border-amber-400/40 transition-all duration-500"
                >
                  <div className="flex items-start gap-6">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="p-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl"
                    >
                      <Icon type={impact.icon} className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xl font-semibold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                          {impact.title}
                        </h4>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-amber-600">{impact.stat}</div>
                          <div className="text-xs text-gray-500">{impact.impact}</div>
                        </div>
                      </div>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed text-sm font-normal">
                        {impact.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black p-10 rounded-3xl border border-amber-500/20 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 text-center text-white">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8"
                  >
                    <Icon type="handshake" className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                    Community Partnership
                  </h3>
                  
                  <p className="text-base text-gray-300 mb-10 leading-relaxed font-normal">
                    Building lasting relationships through sustainable development initiatives 
                    and collaborative growth strategies that benefit all stakeholders
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Communities", value: "25+", desc: "Partner villages" },
                      { label: "Programs", value: "40+", desc: "Active initiatives" },
                      { label: "Investment", value: "$2.5M", desc: "Annual funding" },
                      { label: "Impact", value: "5000+", desc: "Lives improved" }
                    ].map((stat) => (
                      <motion.div 
                        key={stat.label} 
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-amber-500/20"
                      >
                        <div className="text-2xl font-bold text-amber-400">{stat.value}</div>
                        <div className="text-sm text-white font-medium">{stat.label}</div>
                        <div className="text-xs text-gray-400">{stat.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section - BLACK BACKGROUND WITH MINING IMAGE */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-black relative overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Mining Operations" 
            className="w-full h-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <motion.div variants={fadeInUp} className="text-white">
              <div className="mb-8">
                <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">
                  WHY CHOOSE US
                </span>
                <div className="w-16 h-0.5 bg-amber-400 mt-2"></div>
              </div>
              
              <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1, color: "#fbbf24" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
              >
                Experience Work With<br />
                Global Industries
              </motion.h2>
              
              <p className="text-gray-300 text-base mb-8 leading-relaxed font-normal">
                ARE ALWAYS READY TO SERVE
              </p>
              
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(251, 191, 36, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-amber-400 text-amber-400 px-8 py-3 font-medium hover:bg-amber-400 hover:text-black transition-all duration-300"
              >
                CONTACT US
              </motion.button>
            </motion.div>
            
            {/* Right Side - Features */}
            <motion.div variants={staggerContainer} className="space-y-6">
              {[
                "We Have Professional Workers",
                "On Time In Progress", 
                "Friendly To Serve Customers",
                "Give The Best & Fair"
              ].map((feature) => (
                <motion.div
                  key={feature}
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 text-white group"
                >
                  <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-base group-hover:text-amber-400 transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section - WHITE BACKGROUND */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="text-amber-600 text-sm font-medium tracking-wider uppercase">
              GET IN TOUCH
            </span>
            <div className="w-16 h-0.5 bg-amber-600 mx-auto mt-2 mb-8"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Do Not Hesitate To Contact Us
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {/* Phone */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-700 transition-colors duration-300"
              >
                <Icon type="phone" className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                Phone
              </h3>
              
              <p className="text-gray-600 text-base font-normal">
                (021) 22978900
              </p>
            </motion.div>

            {/* Email */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-700 transition-colors duration-300"
              >
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                Email
              </h3>
              
              <p className="text-gray-600 text-base font-normal">
                info@kristalin.co.id
              </p>
            </motion.div>

            {/* Address */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-700 transition-colors duration-300"
              >
                <Icon type="location" className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                Address
              </h3>
              
              <div className="text-gray-600 text-base leading-relaxed font-normal">
                <p className="font-medium mb-2">ESO Leadership Centre - 165 Tower</p>
                <p className="text-sm">
                  Menara 165 Lantai 21 A-C, Jl. TB Simatupang<br />
                  No.Kav 1, RT.3/RW.3, Cilandak Tim., Ps.<br />
                  Minggu, Kota Jakarta Selatan, DKI Jakarta<br />
                  12560
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}