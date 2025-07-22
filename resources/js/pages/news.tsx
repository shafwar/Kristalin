import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Share, ArrowLeft, Sparkles, Search, Eye, User, Clock, TrendingUp, ExternalLink, BarChart3, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { router, usePage } from '@inertiajs/react';

interface NewsItem {
  id: number;
  title: string;
  subtitle?: string;
  date: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  content?: string;
  author?: string;
  views?: string;
  readTime?: string;
  isFeatured?: boolean;
  trending?: boolean;
  type?: string;
  metrics?: { [key: string]: string };
}

// Enhanced news data for gold mining company
const newsData: NewsItem[] = [
  {
    id: 38,
    title: "Program Pelatihan Komputer untuk Masyarakat Desa Nifasi",
    subtitle: "PT Kristalin Ekalestari mengadakan pelatihan komputer gratis untuk meningkatkan keterampilan digital masyarakat",
    date: "20 Jul 2025",
    category: "Community Development",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.39.03.jpeg",
    excerpt: "Program pelatihan komputer yang bertujuan untuk meningkatkan literasi digital dan keterampilan teknologi masyarakat Desa Nifasi.",
    content: `PT Kristalin Ekalestari meluncurkan program pelatihan komputer gratis untuk masyarakat Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan literasi digital dan keterampilan teknologi masyarakat dalam menghadapi era digital.\n\n"Kami percaya bahwa penguasaan teknologi komputer adalah keterampilan penting yang harus dimiliki masyarakat di era digital ini," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup pengenalan komputer, penggunaan Microsoft Office, internet, dan aplikasi digital lainnya.\n\n"Kami menyediakan 20 unit komputer dan tenaga pengajar profesional untuk memastikan pelatihan berjalan efektif," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 50 peserta dari berbagai usia dan latar belakang pendidikan.\n\n"Kami berharap pelatihan ini dapat membuka peluang kerja baru dan meningkatkan produktivitas masyarakat," ujar Maria.\n\nSelain pelatihan, perusahaan juga memberikan sertifikat kompetensi kepada peserta yang berhasil menyelesaikan program.`,
    author: "Tim Teknologi PT Kristalin Ekalestari",
    views: "1.4K",
    readTime: "3 min",
    trending: false,
    type: "Pelatihan Digital",
    metrics: { peserta: "50 Orang", komputer: "20 Unit" }
  },
  {
    id: 37,
    title: "Bantuan Alat Musik untuk Sanggar Seni Lokal",
    subtitle: "PT Kristalin Ekalestari mendukung pengembangan seni budaya melalui bantuan alat musik",
    date: "20 Jul 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.39.02 (2).jpeg",
    excerpt: "Program bantuan alat musik yang bertujuan untuk mendukung pengembangan seni budaya dan kreativitas masyarakat lokal.",
    content: `PT Kristalin Ekalestari memberikan bantuan alat musik kepada sanggar seni lokal di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk mendukung pengembangan seni budaya dan kreativitas masyarakat melalui peningkatan fasilitas kesenian.\n\n"Kami menghargai seni budaya sebagai bagian penting dari identitas masyarakat dan berkomitmen untuk mendukung pengembangannya," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nBantuan yang diberikan meliputi gitar, keyboard, drum set, dan alat musik tradisional Papua.\n\n"Kami bekerja sama dengan seniman lokal untuk memastikan alat musik yang diberikan sesuai dengan kebutuhan dan budaya setempat," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 5 sanggar seni yang tersebar di berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap bantuan ini dapat mendorong kreativitas anak-anak muda dan melestarikan seni budaya lokal," ujar Maria.\n\nSelain bantuan alat musik, perusahaan juga mendukung penyelenggaraan festival seni budaya tahunan.`,
    author: "Tim Budaya PT Kristalin Ekalestari",
    views: "950",
    readTime: "2 min",
    trending: false,
    type: "Pengembangan Seni",
    metrics: { sanggar: "5 Sanggar", alat: "20+ Alat Musik" }
  },
  {
    id: 36,
    title: "Program Pelatihan Pertanian Organik",
    subtitle: "PT Kristalin Ekalestari mengadakan pelatihan pertanian organik untuk petani lokal",
    date: "20 Jul 2025",
    category: "Environmental",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.39.02 (1).jpeg",
    excerpt: "Program pelatihan pertanian organik yang bertujuan untuk meningkatkan kualitas hasil pertanian dan kesehatan lingkungan.",
    content: `PT Kristalin Ekalestari mengadakan program pelatihan pertanian organik untuk petani lokal di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan kualitas hasil pertanian dan kesehatan lingkungan melalui praktik pertanian yang berkelanjutan.\n\n"Kami berkomitmen untuk mendukung pertanian yang ramah lingkungan dan berkelanjutan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup teknik pertanian organik, pembuatan pupuk alami, pengendalian hama secara alami, dan pemasaran produk organik.\n\n"Kami mengundang ahli pertanian organik untuk memberikan pelatihan yang berkualitas kepada petani," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 75 petani dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap pelatihan ini dapat meningkatkan pendapatan petani dan menjaga kelestarian lingkungan," ujar Maria.\n\nSelain pelatihan, perusahaan juga memberikan bantuan bibit tanaman organik dan peralatan pertanian.`,
    author: "Tim Pertanian PT Kristalin Ekalestari",
    views: "1.1K",
    readTime: "3 min",
    trending: false,
    type: "Pertanian Organik",
    metrics: { petani: "75 Orang", durasi: "1 Bulan" }
  },
  {
    id: 35,
    title: "Pembangunan Taman Bermain untuk Anak-anak",
    subtitle: "PT Kristalin Ekalestari membangun taman bermain modern untuk anak-anak Desa Nifasi",
    date: "20 Jul 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.39.02.jpeg",
    excerpt: "Proyek pembangunan taman bermain yang akan memberikan ruang bermain yang aman dan edukatif bagi anak-anak.",
    content: `PT Kristalin Ekalestari memulai proyek pembangunan taman bermain modern untuk anak-anak di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.\n\nTaman bermain ini akan dilengkapi dengan berbagai permainan edukatif yang aman dan sesuai dengan standar keamanan anak.\n\n"Kami berkomitmen untuk memberikan ruang bermain yang aman dan edukatif bagi anak-anak di sekitar area operasional perusahaan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nFasilitas yang akan dibangun meliputi ayunan, perosotan, jungkat-jungkit, dan area bermain pasir yang dilengkapi dengan pagar pengaman.\n\n"Kami bekerja sama dengan ahli desain taman bermain untuk memastikan fasilitas yang dibangun aman dan menarik bagi anak-anak," tambah Andrian Lubis.\n\nTaman bermain ini akan menjadi pusat aktivitas anak-anak dan tempat berkumpul keluarga di akhir pekan.\n\n"Kami berharap taman bermain ini dapat mendorong aktivitas fisik anak-anak dan meningkatkan kualitas hidup keluarga," ujar Maria.\n\nProyek ini diperkirakan akan selesai dalam waktu 3 bulan dan akan langsung dapat digunakan oleh masyarakat.`,
    author: "Tim Infrastruktur PT Kristalin Ekalestari",
    views: "1.3K",
    readTime: "3 min",
    trending: false,
    type: "Infrastruktur Anak",
    metrics: { luas: "500 m²", durasi: "3 Bulan" }
  },
  {
    id: 23,
    title: "Distribusi Sembako 500 Paket untuk Warga Desa Nifasi",
    subtitle: "Program CSR bulanan PT Kristalin Ekalestari berhasil menyalurkan 500 paket sembako kepada warga Desa Nifasi dan sekitarnya",
    date: "20 Jul 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.47 (2).jpeg",
    excerpt: "PT Kristalin Ekalestari kembali menunjukkan komitmennya dalam membantu masyarakat sekitar dengan menyalurkan 500 paket sembako melalui program CSR bulanan.",
    content: `PT Kristalin Ekalestari kembali menunjukkan komitmennya dalam membantu masyarakat sekitar dengan menyalurkan 500 paket sembako melalui program Corporate Social Responsibility (CSR) bulanan.\n\nProgram ini merupakan bagian dari komitmen perusahaan untuk memberikan dampak positif bagi masyarakat Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.\n\n"Kami konsisten dalam menjalankan program CSR ini setiap bulannya. Kali ini kami menyalurkan 500 paket sembako yang berisi beras, telur, mie instan, minyak goreng, dan kebutuhan pokok lainnya," ujar Andrian Lubis, Senior Manager & Finance Division PT Kristalin Ekalestari.\n\nDistribusi dilakukan secara merata kepada 500 Kepala Keluarga (KK) yang tersebar di berbagai kampung termasuk Nifasi, Biha, Samabusa, Wahario, Polsek, dan Koramil.\n\nProgram ini tidak hanya memberikan bantuan material, tetapi juga menunjukkan kepedulian perusahaan terhadap kesejahteraan masyarakat sekitar area operasional.\n\n"Kami berharap bantuan ini dapat meringankan beban ekonomi keluarga dan memberikan manfaat nyata bagi masyarakat," tambah Maria Erari, Humas PT Kristalin Ekalestari.\n\nSelain program sembako, PT Kristalin Ekalestari juga telah melaksanakan berbagai program CSR lainnya seperti pembangunan infrastruktur, bantuan pendidikan, dan pengembangan ekonomi masyarakat.`,
    author: "Humas PT Kristalin Ekalestari",
    views: "2.1K",
    readTime: "4 min",
    trending: true,
    type: "CSR Sembako",
    metrics: { paket: "500 Paket", lokasi: "Desa Nifasi & Sekitarnya" }
  },
  {
    id: 22,
    title: "Peningkatan Produksi Emas dengan Teknologi Modern",
    subtitle: "PT Kristalin Ekalestari berhasil meningkatkan produksi emas sebesar 35% dengan implementasi teknologi mining terbaru",
    date: "19 Jul 2025",
    category: "Mining Operations",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.47 (1).jpeg",
    excerpt: "Implementasi teknologi mining modern berhasil meningkatkan efisiensi produksi emas dan mengurangi dampak lingkungan.",
    content: `PT Kristalin Ekalestari berhasil meningkatkan produksi emas sebesar 35% melalui implementasi teknologi mining modern di area operasional Nabire, Papua Tengah.\n\nPeningkatan ini dicapai melalui penggunaan heavy equipment terbaru dan sistem monitoring digital yang memungkinkan optimasi proses ekstraksi emas.\n\n"Kami terus berinvestasi dalam teknologi mining modern untuk meningkatkan efisiensi produksi sambil mempertahankan standar keselamatan dan lingkungan yang tinggi," ujar Andrian Lubis, Senior Manager & Finance Division PT Kristalin Ekalestari.\n\nTeknologi yang diimplementasikan meliputi sistem GPS untuk monitoring lokasi penambangan, sensor digital untuk mengukur kadar emas, dan software analisis data real-time.\n\n"Peningkatan produksi ini tidak hanya menguntungkan perusahaan, tetapi juga memberikan dampak positif bagi perekonomian lokal," tambah Maria Erari, Humas PT Kristalin Ekalestari.\n\nSelain peningkatan produksi, teknologi baru ini juga berhasil mengurangi konsumsi energi sebesar 20% dan meminimalkan dampak lingkungan.\n\n"Kami berkomitmen untuk terus mengembangkan operasi mining yang berkelanjutan dan ramah lingkungan," ujar Andrian.\n\nKeberhasilan ini menegaskan posisi PT Kristalin Ekalestari sebagai perusahaan mining yang inovatif dan bertanggung jawab.`,
    author: "Tim Mining Operations PT Kristalin Ekalestari",
    views: "1.8K",
    readTime: "4 min",
    trending: true,
    type: "Mining Technology",
    metrics: { peningkatan: "35%", efisiensi: "20%" }
  },
  {
    id: 21,
    title: "Penghargaan Best Mining Company 2025",
    subtitle: "PT Kristalin Ekalestari meraih penghargaan Best Mining Company 2025 untuk kategori Sustainable Gold Mining",
    date: "18 Jul 2025",
    category: "Achievement",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.47.jpeg",
    excerpt: "Penghargaan prestisius yang mengakui komitmen perusahaan dalam sustainable mining dan pengembangan masyarakat.",
    content: `PT Kristalin Ekalestari berhasil meraih penghargaan Best Mining Company 2025 untuk kategori Sustainable Gold Mining dalam ajang Indonesia Mining Awards 2025.\n\nPenghargaan ini diberikan atas komitmen perusahaan dalam menerapkan praktik mining yang berkelanjutan dan pengembangan masyarakat yang komprehensif.\n\n"Penghargaan ini adalah pengakuan atas dedikasi kami dalam menjalankan operasi mining yang bertanggung jawab dan berkontribusi positif bagi masyarakat," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nJuri menilai berbagai aspek termasuk implementasi teknologi ramah lingkungan, program CSR yang berkelanjutan, dan kontribusi terhadap perekonomian lokal.\n\n"Kami bangga dengan pencapaian ini dan akan terus mempertahankan standar tinggi dalam operasi mining kami," tambah Andrian Lubis.\n\nPenghargaan ini juga mengakui program pengembangan masyarakat yang telah dilaksanakan perusahaan selama bertahun-tahun.\n\n"Keberhasilan ini tidak lepas dari dukungan masyarakat lokal dan komitmen tim kami dalam menjalankan visi perusahaan," ujar Maria.\n\nPenghargaan ini menegaskan posisi PT Kristalin Ekalestari sebagai perusahaan mining terdepan di Indonesia.`,
    author: "Tim Corporate Affairs PT Kristalin Ekalestari",
    views: "2.3K",
    readTime: "3 min",
    trending: true,
    type: "Industry Award",
    metrics: { kategori: "Sustainable Mining", tahun: "2025" }
  },
  {
    id: 1,
    title: "Kristalin Eka Lestari Achieves Record Gold Production with Revolutionary Extraction Technology",
    subtitle: "Breakthrough sustainable mining practices set new industry standards",
    date: "02 Jan 2024",
    category: "Mining Operations",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    excerpt: "Revolutionary extraction methods increase gold yield by 40% while reducing environmental impact through sustainable mining practices and cutting-edge technology implementation.",
    content: "Mining excellence is one of the main pillars to ensure sustainable growth and environmental responsibility in Indonesia's mining sector. Kristalin Eka Lestari has successfully implemented cutting-edge extraction technology that not only increases gold production efficiency but also maintains strict environmental standards. Our latest breakthrough in sustainable gold mining has resulted in a 40% increase in extraction yield while reducing water consumption by 35% and minimizing carbon footprint through renewable energy integration.",
    author: "Mining Operations Team",
    views: "2.4K",
    readTime: "8 min",
    isFeatured: true,
    trending: true,
    type: "Technology Breakthrough",
    metrics: { impact: "40% Yield Increase", duration: "18 Months Development" }
  }
];

const KristalinNewsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewMode, setViewMode] = useState<'grid'>('grid');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const page = usePage();
  
  // Ambil id dari query string
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const idParam = urlParams.get('id');
  const selectedNews = idParam ? newsData.find(n => n.id === Number(idParam)) : null;
  
  const newsPerPage = 6;
  const categories = ['All', 'Mining Operations', 'CSR Initiative', 'Environmental', 'Achievement', 'Community Development', 'Partnership'];
  
  // Simple CSS animations with black, gold, and white theme
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from { 
          opacity: 0; 
          transform: translateY(20px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      
      @keyframes fadeInScale {
        from { 
          opacity: 0; 
          transform: scale(0.95); 
        }
        to { 
          opacity: 1; 
          transform: scale(1); 
        }
      }
      
      @keyframes slideInRight {
        from { 
          opacity: 0; 
          transform: translateX(20px); 
        }
        to { 
          opacity: 1; 
          transform: translateX(0); 
        }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      
      .animate-fadeInUp { 
        animation: fadeInUp 0.6s ease-out forwards; 
      }
      
      .animate-fadeInScale { 
        animation: fadeInScale 0.5s ease-out forwards; 
      }
      
      .animate-slideInRight { 
        animation: slideInRight 0.5s ease-out forwards; 
      }
      
      .animate-float { 
        animation: float 3s ease-in-out infinite; 
      }
      
      /* Simple glassmorphism effects */
      .glass-card {
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 215, 0, 0.2);
      }
      
      .glass-gold {
        background: rgba(255, 215, 0, 0.15);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 215, 0, 0.3);
      }
      
      /* Simple hover effects */
      .hover-lift {
        transition: all 0.3s ease;
      }
      
      .hover-lift:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(255, 215, 0, 0.2);
      }
      
      /* Smooth page transitions */
      .page-transition {
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Filter news based on category and search
  const filteredNews = newsData.filter(news => {
    const matchesCategory = selectedCategory === 'All' || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);
  
  const featuredNews = currentNews[0];
  const gridNews = currentNews.slice(1);

  // Enhanced Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          (entry.target as HTMLElement).style.animationDelay = `${index * 0.1}s`;
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Initialize observers
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach((el, index) => {
        el.setAttribute('data-index', index.toString());
        if (observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [currentPage]);

  // Enhanced navigation with smooth transitions
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleNewsClick = (news: NewsItem) => {
    router.visit(`/news?id=${news.id}`, { replace: false });
  };

  const handleBackToList = () => {
    router.visit('/news', { replace: false });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Mining Operations': 'from-yellow-400 to-amber-500',
      'CSR Initiative': 'from-green-400 to-emerald-500',
      'Environmental': 'from-emerald-400 to-green-500',
      'Achievement': 'from-yellow-300 to-amber-400',
      'Community Development': 'from-blue-400 to-indigo-500',
      'Partnership': 'from-orange-400 to-amber-500'
    };
    return colors[category] || 'from-gray-400 to-gray-500';
  };

  // News Detail View
  if (selectedNews) {
    return (
      <div className={`min-h-screen bg-black page-transition ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <Header />

        {/* Header Navigation */}
        <div className="bg-black border-b border-gray-800/50 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-start">
              <button
                onClick={handleBackToList}
                className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to List
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto px-6 py-8 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Left Column - Image */}
            <div className="lg:col-span-2">
              <div className="relative w-full aspect-[4/3] max-h-[70vh] rounded-xl overflow-hidden">
                <img
                  src={selectedNews.imageUrl}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover rounded-xl"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`bg-gradient-to-r ${getCategoryColor(selectedNews.category)} text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg`}>
                    {selectedNews.category}
                  </div>
                </div>
                {/* Trending Badge */}
                {selectedNews.trending && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-red-500 text-white p-1.5 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </div>
              {selectedNews.metrics && (
                <div className="glass-card rounded-2xl p-4 mt-4 w-full">
                  <h4 className="text-white font-bold mb-2 flex items-center text-sm">
                    <BarChart3 className="w-4 h-4 mr-2 text-yellow-400" />
                    Project Metrics
                  </h4>
                  <div className="flex flex-col gap-2">
                    {Object.entries(selectedNews.metrics).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-yellow-400 uppercase tracking-wider text-xs">{key}</span>
                        <span className="block text-white font-medium text-xs break-words">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-3">
              {/* Article Metadata */}
              <div className="flex flex-wrap items-center gap-4 mb-5 text-xs text-gray-400">
                <div className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                  <Calendar className="w-3 h-3" />
                  <span>{selectedNews.date}</span>
                </div>
                <div className="flex items-center gap-1 hover:text-white transition-colors">
                  <User className="w-3 h-3" />
                  <span>{selectedNews.author}</span>
                </div>
                <div className="flex items-center gap-1 hover:text-white transition-colors">
                  <Clock className="w-3 h-3" />
                  <span>{selectedNews.readTime}</span>
                </div>
                <div className="flex items-center gap-1 hover:text-white transition-colors">
                  <Eye className="w-3 h-3" />
                  <span>{selectedNews.views}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight text-white">
                {selectedNews.title}
              </h1>
              
              {selectedNews.subtitle && (
                <h2 className="text-base lg:text-lg text-yellow-400 mb-5 font-medium leading-relaxed">
                  {selectedNews.subtitle}
                </h2>
              )}

              {/* Content */}
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed space-y-4 text-sm lg:text-base">
                  {selectedNews.content?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Impact Statement */}
                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/30 rounded-lg p-4 my-6">
                  <h3 className="text-base font-bold text-yellow-400 mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Impact Statement
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Program CSR ini menunjukkan komitmen nyata PT Kristalin Ekalestari dalam memberikan dampak positif bagi masyarakat sekitar, meningkatkan kualitas hidup dan kesejahteraan keluarga di daerah operasi.
                  </p>
                </div>

                {/* Trending Indicator */}
                {selectedNews.trending && (
                  <div className="bg-black/40 border border-red-500/30 rounded-lg p-4 my-6">
                    <div className="flex items-center gap-2 text-red-400 font-bold mb-2 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending Article</span>
                    </div>
                    <p className="text-gray-300 text-xs">Artikel ini sedang trending dan mendapat perhatian tinggi dari pembaca.</p>
                  </div>
                )}
              </div>

              {/* Related Articles */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <h3 className="text-lg font-bold text-yellow-400 mb-4">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="group bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/30 rounded-lg p-3 cursor-pointer hover:from-yellow-400/30 hover:to-yellow-500/30 transition-all duration-300">
                    <div className="text-xs mb-1 text-yellow-400 font-medium">Mining Operations • 27 Dec 2023</div>
                    <div className="font-semibold text-white text-xs mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                      Advanced Geological Survey Reveals New Gold Reserves
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">4 min read</span>
                      <ArrowRight className="w-3 h-3 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="group bg-black/40 border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-yellow-500/20 hover:border-yellow-400/30 transition-all duration-300">
                    <div className="text-xs mb-1 text-gray-400 font-medium group-hover:text-yellow-400">Technology • 10 Dec 2023</div>
                    <div className="font-semibold text-white text-xs mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                      Smart Mining Technology Implementation
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">7 min read</span>
                      <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="fixed bottom-0 left-0 w-full z-50">
          <Footer />
        </div>
      </div>
    );
  }

  // Main News List View
  return (
    <div className={`min-h-screen bg-black page-transition ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-black py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white animate-fadeInScale">
              News <span className="text-yellow-400">Update</span>
            </h1>
            <p className="text-xl text-yellow-400 max-w-3xl mx-auto mb-8 leading-relaxed animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              Latest developments in sustainable gold mining
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-slideInRight mb-8" style={{animationDelay: '0.5s'}}>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 z-10" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 glass-card rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover-lift animate-fadeInUp ${
                    selectedCategory === category
                      ? 'bg-yellow-400 text-black font-bold'
                      : 'glass-card text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10'
                  }`}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Stats - Moved below filters */}
            <div className="flex justify-center gap-8 animate-fadeInUp" style={{animationDelay: '0.8s'}}>
              <div className="glass-card rounded-xl px-8 py-4 text-center hover-lift transition-all duration-300">
                <div className="text-2xl font-bold text-yellow-400">{filteredNews.length}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider mt-1">Articles</div>
              </div>
              <div className="glass-card rounded-xl px-8 py-4 text-center hover-lift transition-all duration-300">
                <div className="text-2xl font-bold text-yellow-400">{categories.length - 1}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider mt-1">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="min-h-screen relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Navigation */}
          <div className="flex items-center justify-center mb-12 animate-fadeInUp">
            <div className="flex items-center space-x-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="group w-14 h-14 rounded-full glass-card hover:glass-gold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 border border-yellow-400/20 hover:border-yellow-400/40 hover-lift"
              >
                <ChevronLeft className="w-6 h-6 text-yellow-400 group-hover:-translate-x-0.5 transition-transform group-hover:text-black" />
              </button>

              <div className="text-white text-2xl font-light flex items-center space-x-3">
                <span className="text-yellow-400 font-normal">{currentPage}</span>
                <span className="text-gray-500">/</span>
                <span className="text-gray-400">{totalPages}</span>
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="group w-14 h-14 rounded-full glass-card hover:glass-gold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 border border-yellow-400/20 hover:border-yellow-400/40 hover-lift"
              >
                <ChevronRight className="w-6 h-6 text-yellow-400 group-hover:translate-x-0.5 transition-transform group-hover:text-black" />
              </button>
            </div>
          </div>

          {/* Content Area - Grid Layout Only */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentNews.map((news, index) => (
              <div
                key={news.id}
                className="group cursor-pointer hover-lift transition-all duration-300 animate-fadeInScale"
                onClick={() => handleNewsClick(news)}
                data-animate="true"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="glass-card rounded-2xl overflow-hidden hover:bg-yellow-400/10 transition-all duration-300 h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`bg-gradient-to-r ${getCategoryColor(news.category)} text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                        {news.category}
                      </span>
                      {news.trending && (
                        <div className="bg-red-500 text-white rounded-full p-1">
                          <TrendingUp className="w-3 h-3" />
                        </div>
                      )}
                      {news.isFeatured && (
                        <div className="bg-yellow-400 text-black rounded-full px-2 py-1">
                          <Sparkles className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/10 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                        <div className="bg-white/90 rounded-full p-3 shadow-2xl">
                          <ExternalLink className="w-5 h-5 text-black" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Metadata */}
                    <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                        <Calendar className="w-3 h-3" />
                        <span>{news.date}</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-white transition-colors">
                        <Clock className="w-3 h-3" />
                        <span>{news.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-white transition-colors">
                        <Eye className="w-3 h-3" />
                        <span>{news.views}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300 flex-shrink-0">
                      {news.title}
                    </h3>

                    {news.subtitle && (
                      <h4 className="text-sm text-yellow-400 mb-3 line-clamp-1 flex-shrink-0">
                        {news.subtitle}
                      </h4>
                    )}

                    <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                      {news.excerpt}
                    </p>

                    {/* Bottom section */}
                    <div className="mt-auto">
                      {/* Author info */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <div className="flex items-center gap-1 hover:text-white transition-colors">
                          <User className="w-3 h-3" />
                          <span className="truncate">{news.author}</span>
                        </div>
                        {news.metrics && (
                          <div className="text-yellow-400 font-medium text-right">
                            {Object.values(news.metrics)[0]}
                          </div>
                        )}
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-1 rounded-full w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default KristalinNewsPage;
