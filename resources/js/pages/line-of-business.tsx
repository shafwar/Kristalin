import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

const services = [
  {
    icon: "🧭",
    title: "Eksplorasi & Survei Geologi",
    desc: "Survei mineral, pemetaan geologi, pengeboran, dan pengujian laboratorium."
  },
  {
    icon: "⛏️",
    title: "Penambangan Emas Skala Menengah hingga Besar",
    desc: "Open-pit & underground mining dengan teknologi modern."
  },
  {
    icon: "⚗️",
    title: "Pengolahan & Pemurnian",
    desc: "Proses CIL (Carbon in Leach) untuk ekstraksi emas murni."
  },
  {
    icon: "🚚",
    title: "Distribusi & Penjualan",
    desc: "Kemitraan dengan smelter dan lembaga keuangan nasional/internasional."
  },
  {
    icon: "🌱",
    title: "Pengelolaan Lingkungan",
    desc: "Reklamasi lahan, pengolahan limbah, dan audit lingkungan berkala."
  },
];

const projects = [
  {
    title: "Blok Gunung Kristal – Kalimantan Tengah",
    image: "/gold-bars.jpg",
    details: [
      { label: "Luas Wilayah", value: "± 5.000 ha" },
      { label: "Status", value: "Produksi sejak 2018" },
      { label: "Cadangan Emas", value: "1,2 juta oz" },
      { label: "Kapasitas Produksi", value: "± 120.000 oz/tahun" },
    ],
  },
  {
    title: "Tambang Lestari – Sulawesi Selatan",
    image: "/building.jpg",
    details: [
      { label: "Luas Wilayah", value: "± 3.200 ha" },
      { label: "Status", value: "Tahap Eksplorasi" },
      { label: "Potensi Kandungan", value: "Emas & Tembaga" },
    ],
  },
  {
    title: "Pabrik Pemurnian Kristalin – Jawa Barat",
    image: "/portfolio.jpg",
    details: [
      { label: "Kapasitas", value: "150.000 ton ore/tahun" },
      { label: "Fasilitas", value: "Lab Uji Mineral, Pengolahan Kimia, Pemurnian Emas" },
    ],
  },
];

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

const achievements = [
  { year: "2021", produksi: "80.000", pendapatan: "1.100", laba: "210" },
  { year: "2022", produksi: "95.000", pendapatan: "1.350", laba: "275" },
  { year: "2023", produksi: "120.000", pendapatan: "1.750", laba: "360" },
];

const certifications = [
  "ISO 14001:2015",
  "PROPER Hijau KLHK"
];

const csrPrograms = [
  "Beasiswa Tambang Emas Cerdas",
  "Klinik Gratis untuk Warga",
  "Pelatihan UMKM"
];

const contact = {
  address: "Menara 165 Lantai 21 A~C, Jl. TB Simatupang No.Kav 1, RT.3/RW.3, Cilandak Tim., Ps. Minggu, Kota Jakarta Selatan, DKI Jakarta 12560",
  location: "ESQ Leadership Centre - 165 Tower",
  phone: "(021) 22978900",
  email: "info@kristalin.co.id",
  website: "www.kristalin.co.id",
  instagram: "@kristalinmining",
  linkedin: "PT Kristalin Eka Lestari"
};

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
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero Section with background image and value row */}
      <section className="relative min-h-[100vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Background image */}
        <img
          src="/goldmining.jpg"
          alt="Gold Mining"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10" />
        
        {/* Main Content */}
        <div className="relative z-20 w-full max-w-4xl mx-auto text-center px-4 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-2 drop-shadow-lg">
              LINE OF BUSINESS
            </h1>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg" style={{ letterSpacing: '-2px' }}>
              FUELING THE FUTURE
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto mb-8 drop-shadow leading-relaxed">
              PT Kristalin Eka Lestari is committed to sustainable gold mining, innovation, and empowering Indonesia's future.
            </p>
          </motion.div>
        </div>
        
        {/* Value Cards - Fixed Layout */}
        <div className="relative z-20 w-full px-4 mb-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {/* Integrity Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4, ease: "easeInOut" }}
                className="bg-black/85 backdrop-blur-lg rounded-2xl shadow-2xl p-6 lg:p-8 border border-white/20 hover:scale-105 hover:shadow-3xl transition-all duration-300 hover:bg-black/90"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center">
                    {/* Globe SVG Icon */}
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="white" strokeWidth="2" />
                      <path d="M2 12a10 10 0 0 0 20 0" stroke="white" strokeWidth="2" />
                      <path d="M12 2a15 15 0 0 1 0 20" stroke="white" strokeWidth="2" />
                      <path d="M12 2a15 15 0 0 0 0 20" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl lg:text-2xl mb-3">
                      INTEGRITY
                    </h3>
                    <p className="text-white/85 text-sm lg:text-base font-light leading-relaxed">
                      We uphold the highest standards of integrity in all our actions, ensuring transparency and ethical practices.
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* Commitment Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.4, ease: "easeInOut" }}
                className="bg-black/85 backdrop-blur-lg rounded-2xl shadow-2xl p-6 lg:p-8 border border-white/20 hover:scale-105 hover:shadow-3xl transition-all duration-300 hover:bg-black/90"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center">
                    {/* People/Team SVG Icon */}
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="9" cy="10" r="4" stroke="white" strokeWidth="2" />
                      <circle cx="17" cy="13" r="3" stroke="white" strokeWidth="2" />
                      <path d="M2 20c0-2.5 3.5-4.5 7-4.5s7 2 7 4.5" stroke="white" strokeWidth="2" />
                      <path d="M14 20c0-1.5 2-2.5 4-2.5s4 1 4 2.5" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl lg:text-2xl mb-3">
                      COMMITMENT
                    </h3>
                    <p className="text-white/85 text-sm lg:text-base font-light leading-relaxed">
                      Dedicated to delivering value and sustainable growth for all stakeholders and communities.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Profile Section */}
      <motion.section 
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
            COMPANY PROFILE
          </h2>
          <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
            Professional Gold Mining
            <br className="hidden md:block" />
            Company Since 2009
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
                  <span className="font-semibold text-gray-800">Company Name:</span>
                  <span className="ml-2 text-gray-700">PT Kristalin Eka Lestari</span>
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
                  <span className="font-semibold text-gray-800">Business Field:</span>
                  <span className="ml-2 text-gray-700">Gold Mining & Mineral Processing</span>
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
                  <span className="font-semibold text-gray-800">Established:</span>
                  <span className="ml-2 text-gray-700">2009</span>
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
                  <span className="font-semibold text-gray-800">Head Office:</span>
                  <span className="ml-2 text-gray-700">Jakarta, Indonesia</span>
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
                  <span className="font-semibold text-gray-800">Business License:</span>
                  <span className="ml-2 text-gray-700">IUP Operation Production No. 561/2021/DESDM</span>
                </div>
              </motion.div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4, ease: "easeInOut" }}
              className="text-gray-600 leading-relaxed mt-8 text-lg"
            >
              PT Kristalin Eka Lestari is committed to sustainable mining, innovation, and strategic partnerships 
              for a better future in Indonesia. We operate with the highest standards of integrity and environmental responsibility.
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
              <img src="/logo.svg" alt="Kristalin Logo" className="mx-auto mb-6 h-40 w-40 md:h-56 md:w-56 object-contain" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Vision & Mission Section - White background with dark cards */}
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
              VISION & MISSION
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
              Our Vision & Mission
              <br className="hidden md:block" />
              For Sustainable Future
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div 
              variants={slideInLeft}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
              className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                    className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5S21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12S9.24 7 12 7 17 9.24 17 12 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12S10.34 15 12 15 15 13.66 15 12 13.66 9 12 9Z" fill="white"/>
                    </svg>
                  </motion.div>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-2xl mb-3 tracking-wide">VISION</h4>
                  <p className="text-white leading-relaxed text-sm">
                    To be the most trusted, innovative, and sustainable gold mining company in Indonesia, creating value for all stakeholders and future generations.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div 
              variants={slideInRight}
              transition={{ delay: 0.5, duration: 0.4, ease: "easeInOut" }}
              className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                    className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" fill="white"/>
                    </svg>
                  </motion.div>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-2xl mb-3 tracking-wide">MISSION</h4>
                  <ul className="space-y-3">
                    {[
                      "Operate with integrity and transparency in all business practices.",
                      "Apply advanced technology for efficient and responsible mining.",
                      "Empower local communities and support national development.",
                      "Uphold environmental stewardship and sustainable growth."
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index, duration: 0.4, ease: "easeInOut" }}
                        className="flex items-start"
                      >
                        <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-white text-sm leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Company Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto py-20 px-4"
      >
        <motion.div 
          variants={fadeInUp} 
          transition={{ duration: 0.4, ease: "easeInOut" }} 
          className="text-center"
        >
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-700 tracking-[0.25em] mb-4">
              ABOUT COMPANY
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800 leading-tight max-w-5xl mx-auto">
              We Have a Proud Tradition of Excellence in
              <br className="hidden md:block" />
              Gold Mining Since 2009
            </h3>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
            className="text-base md:text-lg text-gray-600 leading-relaxed max-w-5xl mx-auto font-normal"
          >
            Berjalan selama 15+ tahun di Indonesia oleh para profesional muda dengan pengalaman dalam Pertambangan Emas dan Investasi. 
            Pengetahuan yang mereka miliki dari perusahaan sebelumnya membuat mereka penuh dengan pengalaman baik dan buruk serta dapat 
            mencapai target bisnis dengan presisi.
          </motion.p>
        </motion.div>
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
              OUR SERVICES
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
              We Provide Best Services
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
                GOLD MINING & PROCESSING
              </h4>
              <p className="text-gray-600 leading-relaxed font-normal">
                PT Kristalin Eka Lestari bergerak dalam bidang pertambangan emas yang berlokasi di 
                Kalimantan Tengah - Indonesia. Wilayah ini merupakan sumber perdagangan terbesar 
                untuk produk mineral emas seperti batangan emas, konsentrat emas, dan produk 
                turunan lainnya.
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
                ENVIRONMENTAL MANAGEMENT
              </h4>
              <p className="text-gray-600 leading-relaxed font-normal">
                Terdiri dari 2 divisi utama, kami siap memberikan kebutuhan pengelolaan lingkungan 
                Anda ke setiap area yang dapat dijangkau oleh tim kami melalui ASWP (Any Safe World 
                Port). Mencakup reklamasi lahan, pengolahan limbah, dan audit lingkungan berkala.
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
              Successful Projects Completed
            </motion.h3>
            <CounterAnimation target={15} duration={1000} />
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.4, ease: "easeInOut" }}
              className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              We use an integrated mining system across our projects to create a better environment for our employees and partners, 
              and deliver excellence to our stakeholders.
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
              HOW WE WORK
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
              We Constructed Secure
              <br className="hidden md:block" />
              Experience For You
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
                1. SELECT YOUR SERVICE
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Please choose our service, we will provide an extraordinary experience for your mining and investment needs.
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
                2. MAKE APPOINTMENT
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Schedule a meeting to discuss what you want to achieve in your business, we will provide the best solution.
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
                3. COMPLETE YOUR DATA
              </h4>
              <p className="text-gray-600 leading-relaxed">
                After your service is selected, complete your company data and requirements for seamless collaboration.
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
                4. GET AMAZING SERVICES
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Our professional services are ready to make your business dreams come true with sustainable mining solutions.
              </p>
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/goldmining.jpg')`
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
                CONTACT US
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

      {/* Enhanced Contact Section */}
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
              GET IN TOUCH
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
              Do Not Hesitate To Contact Us
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Phone */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mb-4"
              >
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-2xl font-normal text-gray-800 mb-4">Phone</h4>
              <span className="text-gray-700 text-lg">{contact.phone}</span>
            </motion.div>

            {/* Email */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mb-4"
              >
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-2xl font-normal text-gray-800 mb-4">Email</h4>
              <a href={`mailto:${contact.email}`} className="text-yellow-600 hover:text-yellow-700 transition-colors text-lg">
                {contact.email}
              </a>
            </motion.div>

            {/* Address */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mb-4"
              >
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-2xl font-normal text-gray-800 mb-4">Address</h4>
              <div className="text-gray-700">
                <div className="font-semibold text-yellow-700 mb-2">{contact.location}</div>
                <div className="text-sm leading-relaxed">
                  {contact.address}
                </div>
              </div>
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
              IN COLLABORATION WITH
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
              Our Trusted Partners
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
              GLOBAL GOLD PRICE
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
              Daily / Weekly Gold Price
              <br className="hidden md:block" />
              Information
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
                alt="Gold Mining Operations" 
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
                Stay updated with the latest global gold price trends. For real-time gold, silver, and precious metal prices, click below to view the official gold price chart.
              </p>
              <a
                href="https://goldprice.org/gold-price-indonesia.html"
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
                <span>SHOW MORE</span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  );
}