import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const heroImage = "/papua-children.png";

const galeriPoso = [
  "/galeri-poso1.png",
  "/galeri-poso2.png",
  "/galeri-poso3.png",
  "/galeri-poso4.png",
  "/galeri-poso5.png",
];
const galeriPapua = [
  "/galeri-papua1.png",
  "/galeri-papua2.png",
  "/galeri-papua3.png",
  "/galeri-papua4.png",
];
const galeriMenara = [
  "/galeri-menara1.jpeg",
  "/galeri-menara2.jpeg",
  "/galeri-menara3.jpeg",
  "/galeri-menara4.jpeg",
  "/galeri-menara5.jpeg",
  "/galeri-menara6.jpeg",
];
const galeriPapua2 = [
  "/galeri-papua2-1.jpeg",
  "/galeri-papua2-2.jpeg",
  "/galeri-papua2-3.jpeg",
  "/galeri-papua2-4.jpeg",
  "/galeri-papua2-5.jpeg",
];

// Gabungkan data galeri ke satu array
const gallerySections = [
  {
    title: "CSR Activities 2025 - Latest Updates",
    description: "Latest corporate social responsibility activities by PT Kristalin Ekalestari including food distribution, infrastructure development, and community empowerment programs.",
    images: [
      "/WhatsApp Image 2025-07-20 at 09.57.47 (2).jpeg",
      "/WhatsApp Image 2025-07-20 at 09.57.47 (1).jpeg",
      "/WhatsApp Image 2025-07-20 at 09.57.47.jpeg",
      "/WhatsApp Image 2025-07-20 at 09.57.46 (1).jpeg",
      "/WhatsApp Image 2025-07-20 at 09.57.46.jpeg",
      "/WhatsApp Image 2025-07-20 at 09.57.45 (2).jpeg",
      "/WhatsApp Image 2025-07-20 at 09.57.45 (1).jpeg",
      "/WhatsApp Image 2025-07-20 at 09.57.45.jpeg",
      "/WhatsApp Image 2025-07-20 at 09.57.44 (3).jpeg",
      "/WhatsApp Image 2025-07-20 at 09.57.44 (2).jpeg",
      "/WhatsApp Image 2025-07-20 at 09.57.44 (1).jpeg",
      "/WhatsApp Image 2025-07-20 at 09.57.44.jpeg",
    ],
  },
  {
    title: "Community Development Programs 2025",
    description: "Comprehensive community development programs including computer training, music equipment assistance, organic farming training, and children's playground construction.",
    images: [
      "/WhatsApp Image 2025-07-20 at 10.39.03.jpeg",
      "/WhatsApp Image 2025-07-20 at 10.39.02 (2).jpeg",
      "/WhatsApp Image 2025-07-20 at 10.39.02 (1).jpeg",
      "/WhatsApp Image 2025-07-20 at 10.39.02.jpeg",
      "/WhatsApp Image 2025-07-20 at 10.39.01 (1).jpeg",
      "/WhatsApp Image 2025-07-20 at 10.39.01.jpeg",
      "/WhatsApp Image 2025-07-20 at 10.39.00 (1).jpeg",
      "/WhatsApp Image 2025-07-20 at 10.39.00.jpeg",
      "/WhatsApp Image 2025-07-20 at 10.38.58 (1).jpeg",
      "/WhatsApp Image 2025-07-20 at 10.38.58.jpeg",
      "/WhatsApp Image 2025-07-20 at 10.38.57.jpeg",
      "/WhatsApp Image 2025-07-20 at 10.38.56.jpeg",
      "/WhatsApp Image 2025-07-20 at 10.38.55 (1).jpeg",
      "/WhatsApp Image 2025-07-20 at 10.38.55.jpeg",
      "/WhatsApp Image 2025-07-20 at 10.38.54.jpeg",
    ],
  },
  {
    title: "3.000 Groceries for Poso People",
    description: "PT Kristalin Ekalestari distributed 3,000 groceries to help Poso people in need, as a form of corporate social responsibility.",
    images: galeriPoso,
  },
  {
    title: "CSR Activities for Papua",
    description: "Various social activities for the people of Papua, ranging from food aid, education, to support for sports and social activities.",
    images: galeriPapua,
  },
  {
    title: "Food Distribution for 'Menara 165' Employees",
    description: "Distribution of food packages to Menara 165 employees as a form of company support in difficult times.",
    images: galeriMenara,
  },
  {
    title: "Food Distribution for Papua",
    description: "Distribution of food aid and basic needs for the Papuan people in various villages and regions.",
    images: galeriPapua2,
  },
];

function GalleryShowcaseCarousel({ sections }: { sections: typeof gallerySections }) {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % sections.length);
  const prev = () => setCurrent((c) => (c - 1 + sections.length) % sections.length);
  // Gambar slider per section
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => { setImgIdx(0); }, [current]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setImgIdx((i) => (i === sections[current].images.length - 1 ? 0 : i + 1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [imgIdx, current, sections]);
  return (
    <div className="w-full max-w-6xl mx-auto py-16 md:px-12 relative">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Teks kiri */}
        <div className="flex-1 flex flex-col justify-center items-start md:items-start text-left">
          <div className="text-sm font-semibold uppercase tracking-wider mb-3 text-green-600">CSR Activity</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-700">{sections[current].title}</h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-xl">{sections[current].description}</p>
        </div>
        {/* Gambar kanan */}
        <div className="flex-1 w-full">
          <div className="relative w-full h-[260px] md:h-[340px] flex items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
            <motion.img
              key={sections[current].images[imgIdx]}
              src={sections[current].images[imgIdx]}
              alt={sections[current].title + ' ' + (imgIdx + 1)}
              className="object-cover w-full h-full"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
      {/* Indicator dots & Prev/Next Buttons */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={prev}
          className="bg-white/80 hover:bg-green-100 rounded-full w-12 h-12 flex items-center justify-center shadow"
          aria-label="Previous Section"
          type="button"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="flex gap-3">
          {sections.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-4 h-4 rounded-full ${idx === current ? 'bg-green-500' : 'bg-gray-300'}`}
              aria-label={`Go to section ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="bg-white/80 hover:bg-green-100 rounded-full w-12 h-12 flex items-center justify-center shadow"
          aria-label="Next Section"
          type="button"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

export default function CSRPage() {
  const commitmentRef = React.useRef<HTMLDivElement>(null);
  const handleLearnMore = () => {
    if (commitmentRef.current) {
      commitmentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col justify-center items-center overflow-hidden">
        <img
          src={heroImage}
          alt="CSR Hero"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 w-full max-w-4xl mx-auto text-center px-4 py-24">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg"
          >
            <span className="bg-gradient-to-r from-green-400 via-dark-green-500 to-green-600 bg-clip-text text-transparent">
              Corporate Social
            </span>
            <br />
            <span className="text-white">Responsibility</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed font-normal drop-shadow"
          >
            We believe that true business success is measured not only by financial growth, but also by the positive impact we create for society and the environment.
          </motion.p>
          <motion.button
            onClick={handleLearnMore}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="relative group bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 mt-8 shadow"
          >
            <span className="relative z-10">Learn More</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </div>
      </section>
      {/* Section Judul CSR */}
      <section ref={commitmentRef} className="w-full max-w-3xl mx-auto text-center py-16 px-4">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-green-400 rounded-full mb-4"
          />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-green-500">Our Commitment</span> <span className="text-black">to Community & Sustainability</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto"
          >
            PT Kristalin Ekalestari is staying committed to doing corporate social responsibility activities through other development activities such as constructing more clinics, giving scholarship for local children with outstanding academic performance in order to develop Nabire.
          </motion.p>
        </div>
      </section>
      {/* Galeri Section dengan slider */}
      <main className="flex flex-col items-center px-0">
        <GalleryShowcaseCarousel sections={gallerySections} />
      </main>
      <Footer />
    </div>
  );
} 