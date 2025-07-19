import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Share, ArrowLeft, Sparkles, Mountain, Search, Filter, Eye, User, Clock, TrendingUp, ExternalLink, Award, Target, Users, BarChart3, Zap, Shield, Globe, Play, ArrowRight, Bookmark } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

interface IsVisibleState {
  [key: string]: boolean;
}

// Enhanced news data for gold mining company
const newsData: NewsItem[] = [
  {
    id: 11,
    title: "406 Paket Sembako CSR PT Kristalin Ekalestari Disalurkan Warga Nifasi",
    subtitle: "406 Paket sembako untuk warga Desa Nifasi, Biha, Samabusa, Wahario, Polsek, dan Koramil",
    date: "31 Aug 2024",
    category: "CSR Initiative",
    imageUrl: "/kristalinberita4.jpg", // Pastikan path gambar benar
    excerpt: "PT Kristalin Ekalestari konsisten membantu masyarakat Desa Nifasi dan sekitarnya dengan menyalurkan 406 paket sembako melalui program CSR di bulan Juli 2024.",
    content: `PT Kristalin Ekalestari konsisten membantu masyarakat Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, dengan menyalurkan sembako melalui Corporate Social Responsibility (CSR).\n\nSenior Manager & Finance Division PT Kristalin Ekalestari Andrian Lubis menuturkan, pihaknya menyalurkan sembako di bulan Juli 2024 kemarin.\n\n"Setiap bulan program CSR dari kami untuk masyarakat pembagian sembako di Bulan Juli 2024, yakni menyebar di Kampung Nifasi, Kampung Biha, Samabusa dan Wahario, Polsek dan Koramil," terang Andrian Lubis dalam keterangannya diterima Sabtu, 31 Agustus 2024.\n\nKehadiran PT Kristalin Ekalestari hadir memenuhi kebutuhan Masyarakat Nifasi terbukti melalui program-program CSR demi mensejahterakan warga dekat area lokasi pekerjaan perusahaan.\n\nMenurut Andrian, sebanyak 406 paket sembako untuk 406 Kartu Keluarga yang ada di Desa Nifasi ditebar oleh warga. Untuk jenis sembako paket tersebut yakni beras, telur, mie instan, minyak goreng, kopi dan teh.\n\n"Tentu setiap bulan kami distribusikan paket sembako kepada warga dalam program CSR kami," imbuhnya.\n\nSementara itu Humas PT Kristalin Ekalestari Maria Erari menambahkan, pihaknya senantiasa berkontribusi untuk masyarakat di Desa Nabire.\n\nSelain CSR sembako, banyak program-program lain yang sudah direalisasikan antara lain, renovasi sekolahan, gereja, bedah rumah warga dan kegiatan masyarakat.\n\n"Untuk dalam waktu dekat CSR tahun ini program selain sembako untuk warga, pembangunan rumah untuk warga Hak Adat dan juga rencana pembangunan Pustu seperti Klinik 24 jam pelayanan kesehatan untuk masyarakat masih dalam RAB," pungkas Maria. (Ril)\n\nDapatkan berita dan informasi menarik lainnya di Google News dan jangan lupa ikuti kanal WhatsApp Poskota agar tak ketinggalan update berita setiap hari.`,
    author: "Andrian Lubis & Humas PT Kristalin Ekalestari",
    views: "1.0K",
    readTime: "5 min",
    trending: false,
    type: "CSR Sembako",
    metrics: { paket: "406 Paket", lokasi: "Nifasi, Biha, Samabusa, Wahario, Polsek, Koramil" }
  },
  {
    id: 10,
    title: "Kehadiran PT Kristalin Ekalestari Bukti Kontribusi Warga Desa Nifasi",
    subtitle: "506 Paket sembako untuk warga Desa Nifasi dan sekitarnya, 50% diantaranya untuk Janda Lansia",
    date: "08 Jul 2025",
    category: "CSR Initiative",
    imageUrl: "/kristalinberita2.jpg",
    excerpt: "Sebanyak 506 paket sembako diserahkan ke warga Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, oleh PT Kristalin Ekalestari dalam rangka CSR. Sekitar 50% penerima adalah janda lansia.",
    content: `Sebanyak 506 Paket sembako diserahkan ke warga Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, oleh PT Kristalin Ekalestari dalam rangka Corporate Social Responsibility (CSR). Dari sekira 50 persen diantaranya para janda Lanjut Usia (Lansia).\n\nHumas PT Kristalin Ekalestari Maria Erari menerangkan, pihaknya menyerahkan bantuan 506 paket sembako bulan Juli 2025 untuk 506 Kepala Keluarga (KK) warga di Desa Nifasi dan sekitarnya sebagai tanggung jawab sosial Perusahaan.\n\n“Untuk bantuan bulan Juli 2025 ini, kami rutin ya setiap bulannya dan tidak ada yang berkurang dan menambah sebanyak 506 paket sembako untuk 506 KK,” ucap Maria Erari dikonfirmasi di Jakarta pada Selasa, 8 Juli 2025.\n\nMaria menambahkan Bantuan ratusan paket sembako dari PT Kristalin Ekalestari hampir sama di bulan-bulan sebelumnya yakni 506 paket sembako diberikan ke masyarakat, tempat ibadah seperti gereja, masjid dan kantor pelayanan publik.\n\n“Dari 506 yang disalurkan hampir sekira 50 persen yang menerima dari kalangan Janda Lansia (Lanjut Usia-red) kami antarkan langsung dari data yang sudah ditentukan dan rekomendasi kepala suku dan adat,” ujarnya.\n\nMenurutnya program bantuan sembako yang disalurkan setiap bulannya oleh PT Kristalin Ekalestari dalam program Corporate Social Responsibilty (CSR). Maria menilai konsistensi program CSR perusahaanya untuk Masyarakat sekitar lingkungan area pekerjaan dengan menyalurkan sembako.\n\nBantuan sembako tersebut disebar di lokasi Desa Nifasi, Suku Dani, Kp. Mamai, Kp. Orluk, Kp. Mamai, Kp. Makimi, Desa Samabusa dan Desa Waharia.\n\n“Terima kasih kepada PT Kristalin Ekalestari sudah memberikan bantuan sembako setiap bulannya, anak-anak sudah menerima,” kata salah satu warga Suku Mamai menerima bantuan sembako.\n\nSembako yang dibagikan tetap sama rutin setiap bulannya yakni beras, telur, mie instan, minyak goreng, tepung terigu, sabun cuci, kopi dan teh. Program-program lain PT Kristalin Ekalestari yang sudah direalisasikan merupakan tanggung jawab sosial Perusahaan terhadap lingkungan dan masyarakat antara lain, pendidikan, renovasi sekolahan, gereja, bedah rumah warga dan kegiatan masyarakat.`,
    author: "Humas PT Kristalin Ekalestari",
    views: "1.1K",
    readTime: "5 min",
    trending: false,
    type: "CSR Sembako",
    metrics: { paket: "506 Paket", lokasi: "Desa Nifasi & Sekitarnya" }
  },
  {
    id: 9,
    title: "Komitmen CSR PT Kristalin Ekalestari Berikan Manfaat Warga Desa Nifasi",
    subtitle: "Bantuan rumah layak untuk keluarga di Desa Nifasi, Nabire, Papua Tengah",
    date: "25 Jun 2025",
    category: "CSR Initiative",
    imageUrl: "/beritacsrkristalin.jpg",
    excerpt: "PT Kristalin Ekalestari melalui program CSR kembali memberikan bantuan rumah layak huni kepada warga Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Bantuan ini menjadi bukti komitmen perusahaan dalam memberikan manfaat nyata bagi masyarakat sekitar tambang.",
    content: `Pasangan suami istri (Pasutri) ini bahagia lepas bahagia setelah mendapatkan bantuan berupa satu rumah layak di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.\n\nYuliana Manuaron mendapatkan rumah dari PT Kristalin Ekalestari dalam program Corporate Social Responsibility (CSR).\n\nIbu Rumah Tangga ini bersama suaminya yang hanya bekerja sebagai Buruh Lepas bisa menempati rumah bangunan cat berwarna hijau. Pasalnya, PT Kristalin Ekalestari sudah menyerahkan rumah tipe 57 spesifikasi bangunan rumah tembok semi permanen memiliki dua kamar tidur dan satu kamar mandi.\n\nYuliana bersyukur karena memang belum memiliki rumah. “Terima kasih banyak perusahaan PT Kristalin Ekalestari Puji Tuhan, saya bisa dapat rumah dari Kristalin. Terima kasih,” ucap Yuliana.\n\nSementara itu Humas PT Kristalin Ekalestari Maria Erari menerangkan sudah kesekian kalinya pihaknya menyerahkan rumah untuk masyarakat yang belum memiliki rumah dan sudah mendata secara detail sekaligus rekomendasikan dari Ketua Adat.\n\n“Ini bukti komitmen kami sebagai perusahaan yang bergerak di Tambang, memberikan manfaat banyak kepada masyarakat terutama warga yang belum mendapatkan rumah lewat program CSR,” ujar Maria Erari dalam keterangannya di Jakarta, Selasa 24 Juni 2025.\n\nMenurut Maria, ia mengilustrasikan Desa Nifasi ini sebagai seorang wanita berubah menjadi cantik yang terawat. “Kami ibaratkan Desa ini sebelumnya biasa-biasa saja, kini menjadi berubah seperti wanita cantik yang terawat dan memberikan manfaat banyak kepada masyarakat dengan kehadiran kami PT Kristalin Ekalestari,” katanya.\n\nIa juga menambahkan dalam situasi apapun perusahaannya akan berkontribusi dan konsisten sebagai perusahaan yang legal dan berizin di wilayaha Nabire, Papua Tengah, akan terus berupaya memberikan kontribusi yang terbaik untuk masyarakat sekitar.\n\n“Dalam situasi apapun kami akan memberikan yang terbaik untuk warga. Bisa melihat pembangunan Desa ini luar biasa selain itu kami juga menggerakan roda ekonomi untuk lokasi wisata Sungai Musairo,” tutur Maria.\n\nMelalui program Corporate Social Responsibility (CSR) membantu warga yang belum punya rumah dan renovasi total rumah tidak layak. PT Kristalin Ekalestari selain membangun rumah untuk warga yang belum memiliki rumah dan bedah rumah, membangun Pembangunan gereja, pendidikan, bantuan sembako, kendaraan operasional masyarakat dan gereja. (Ril)`,
    author: "Humas PT Kristalin Ekalestari",
    views: "1.2K",
    readTime: "6 min",
    trending: true,
    type: "CSR Housing",
    metrics: { rumah: "1 Unit", lokasi: "Desa Nifasi" }
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
  },
  {
    id: 2,
    title: "Golden Community Program: Mining Education Center Opens in Central Kalimantan",
    subtitle: "Empowering local communities through sustainable education initiatives",
    date: "28 Dec 2023",
    category: "CSR Initiative",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
    excerpt: "State-of-the-art education facility provides mining technology training for 500+ local youth, creating sustainable career opportunities in the region.",
    author: "CSR Division",
    views: "1.8K",
    readTime: "5 min",
    trending: true,
    type: "Community Development",
    metrics: { beneficiaries: "500+ Students", investment: "Rp 5M Facility" }
  },
  {
    id: 3,
    title: "Environmental Excellence: 75,000 Trees Planted in Reforestation Project",
    subtitle: "Massive environmental restoration initiative shows measurable impact",
    date: "20 Dec 2023",
    category: "Environmental",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    excerpt: "Massive reforestation initiative restores 400 hectares of post-mining land to natural habitat, supporting biodiversity and carbon sequestration.",
    author: "Environmental Team",
    views: "1.5K",
    readTime: "6 min",
    trending: false,
    type: "Environmental Impact",
    metrics: { trees: "75,000 Planted", area: "400 Hectares Restored" }
  },
  {
    id: 4,
    title: "International Safety Award for Zero-Incident Mining Operations",
    subtitle: "Global recognition for exceptional workplace safety standards",
    date: "15 Dec 2023",
    category: "Achievement",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    excerpt: "Global recognition for maintaining 1,200+ consecutive days without workplace incidents, setting new industry safety benchmarks.",
    author: "Safety Division",
    views: "2.1K",
    readTime: "4 min",
    trending: true,
    type: "Safety Excellence",
    metrics: { days: "1,200+ Incident-Free", rating: "ISO 45001 Certified" }
  },
  {
    id: 5,
    title: "Smart Mining: AI-Powered Gold Detection System Implementation",
    subtitle: "Cutting-edge artificial intelligence revolutionizes exploration processes",
    date: "10 Dec 2023",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    excerpt: "Artificial intelligence technology increases ore detection accuracy by 85%, revolutionizing exploration efficiency and precision in gold mining operations.",
    author: "Technology Team",
    views: "3.2K",
    readTime: "7 min",
    trending: true,
    type: "AI Innovation",
    metrics: { accuracy: "85% Detection Rate", efficiency: "60% Time Reduction" }
  },
  {
    id: 6,
    title: "Strategic Partnership with Global Mining Technology Leader",
    subtitle: "International collaboration enhances technological capabilities",
    date: "05 Dec 2023",
    category: "Partnership",
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
    excerpt: "International collaboration brings cutting-edge automation to Indonesian operations, enhancing efficiency and environmental sustainability.",
    author: "Business Development",
    views: "1.9K",
    readTime: "5 min",
    trending: false,
    type: "Strategic Alliance",
    metrics: { investment: "$10M Partnership", timeline: "3-Year Agreement" }
  },
  {
    id: 7,
    title: "Sustainable Mining Certification Achieved from International Council",
    subtitle: "Global certification confirms environmental leadership commitment",
    date: "25 Nov 2023",
    category: "Achievement",
    imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&h=400&fit=crop",
    excerpt: "Global certification confirms our commitment to responsible mining practices and environmental stewardship in gold extraction operations.",
    author: "Sustainability Team",
    views: "1.7K",
    readTime: "6 min",
    trending: false,
    type: "Certification",
    metrics: { standard: "ICMM Certified", scope: "All Operations" }
  },
  {
    id: 8,
    title: "Golden Future Scholarship: 100 Students Receive Mining Engineering Education",
    subtitle: "Investment in next generation of Indonesian mining professionals",
    date: "20 Nov 2023",
    category: "CSR Initiative",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    excerpt: "Educational investment program develops next generation of Indonesian mining engineers through comprehensive scholarship and mentorship programs.",
    author: "HR Development",
    views: "1.4K",
    readTime: "4 min",
    trending: false,
    type: "Education Program",
    metrics: { scholars: "100 Students", budget: "Rp 2M Annual" }
  }
];

const KristalinNewsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isVisible, setIsVisible] = useState<IsVisibleState>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewMode, setViewMode] = useState<'masonry' | 'grid'>('masonry');
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const newsPerPage = 6;
  const categories = ['All', 'Mining Operations', 'CSR Initiative', 'Environmental', 'Achievement', 'Technology', 'Partnership'];
  
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
        const id = entry.target.id;
        setIsVisible(prev => ({
          ...prev,
          [id]: entry.isIntersecting
        }));
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          // Add staggered animation delay for multiple elements
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
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedNews(news);
      setIsTransitioning(false);
    }, 200);
  };

  const handleBackToList = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedNews(null);
      setIsTransitioning(false);
    }, 200);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Mining Operations': 'from-yellow-400 to-amber-500',
      'CSR Initiative': 'from-green-400 to-emerald-500',
      'Environmental': 'from-emerald-400 to-green-500',
      'Achievement': 'from-yellow-300 to-amber-400',
      'Technology': 'from-amber-400 to-yellow-500',
      'Partnership': 'from-orange-400 to-amber-500'
    };
    return colors[category] || 'from-gray-400 to-gray-500';
  };

  // News Detail View with simple animations and black/gold/white theme
  if (selectedNews) {
    return (
      <div className={`min-h-screen bg-black page-transition ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <Header />

        {/* Improved Header Navigation */}
        <div className="bg-black border-b border-gray-800/50 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToList}
                className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to List
              </button>
              <button className="group bg-white hover:bg-gray-100 text-black px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center text-sm">
                <Share className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Container - Improved sizing */}
        <div className="max-w-6xl mx-auto px-6 py-8 pb-32"> {/* Tambah pb-32 agar konten tidak tertutup footer */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Left Column - Image (2/5 width) */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="relative rounded-xl overflow-hidden group">
                  <img
                    src={selectedNews.imageUrl}
                    alt={selectedNews.title}
                    className="w-full h-auto max-h-[70vh] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    style={{ display: 'block', margin: 0 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
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

                  {/* Project Metrics - Smaller */}
                  {selectedNews.metrics && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-yellow-400/20">
                        <h4 className="text-white font-semibold mb-2 flex items-center text-xs">
                          <BarChart3 className="w-3 h-3 mr-1 text-yellow-400" />
                          Project Metrics
                        </h4>
                        <div className="space-y-1">
                          {Object.entries(selectedNews.metrics).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-xs">
                              <span className="text-yellow-400 uppercase tracking-wider">{key}</span>
                              <span className="text-white font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Content (3/5 width) */}
            <div className="lg:col-span-3">
              {/* Article Metadata - Smaller */}
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

              {/* Title - Proper sizing */}
              <h1 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight text-white">
                {selectedNews.title}
              </h1>
              
              {selectedNews.subtitle && (
                <h2 className="text-base lg:text-lg text-yellow-400 mb-5 font-medium leading-relaxed">
                  {selectedNews.subtitle}
                </h2>
              )}

              {/* Content - Better formatted */}
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed space-y-4 text-sm lg:text-base">
                  {selectedNews.content?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Impact Statement - Compact */}
                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/30 rounded-lg p-4 my-6">
                  <h3 className="text-base font-bold text-yellow-400 mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Impact Statement
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Program CSR ini menunjukkan komitmen nyata PT Kristalin Ekalestari dalam memberikan dampak positif bagi masyarakat sekitar, meningkatkan kualitas hidup dan kesejahteraan keluarga di daerah operasi.
                  </p>
                </div>

                {/* Trending Indicator - Compact */}
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

              {/* Related Articles - Compact */}
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
        {/* Footer sticky di bawah viewport */}
        <div className="fixed bottom-0 left-0 w-full z-50">
          <Footer />
        </div>
      </div>
    );
  }

  // Main News List View with simple animations and black/gold/white theme
  return (
    <div className={`min-h-screen bg-black page-transition ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <Header />

      {/* Simple Hero Section with black/gold/white theme */}
      <section className="relative bg-black py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white animate-fadeInScale">
              News <span className="text-yellow-400">Update</span>
            </h1>
            <p className="text-xl text-yellow-400 max-w-3xl mx-auto mb-8 leading-relaxed animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              Latest developments in sustainable gold mining
            </p>
            
            {/* Simple Search and Filter */}
            <div className="max-w-4xl mx-auto animate-slideInRight" style={{animationDelay: '0.5s'}}>
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 z-10" />
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 glass-card rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode(viewMode === 'masonry' ? 'grid' : 'masonry')}
                    className="glass-gold bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 px-6 py-4 rounded-xl font-semibold hover:bg-yellow-400/30 transition-all duration-300 hover-lift"
                  >
                    {viewMode === 'masonry' ? 'Grid View' : 'Masonry View'}
                  </button>
                </div>
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-3">
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
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="flex min-h-screen relative z-10">
        {/* Left Sidebar */}
        <div className="w-1/3 p-12 flex flex-col justify-between relative">
          {/* Simple decorative border */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-yellow-400/40" />
          
          {/* Top Section */}
          <div className="relative">
            {/* Simple floating elements */}
            <div className="absolute -top-6 -left-6 w-4 h-4 bg-yellow-400/30 rounded-full animate-float" />
            <div className="absolute -top-4 -right-4 w-2 h-2 bg-yellow-400/50 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
            
            {/* Main Title */}
            <h1 className="text-7xl font-light text-white mb-4 leading-none tracking-wide animate-fadeInScale">
              News
            </h1>
            <h2 className="text-7xl font-light text-yellow-400 leading-none tracking-wide animate-slideInRight" style={{animationDelay: '0.2s'}}>
              Update
            </h2>
            
            {/* Subtitle */}
            <p className="text-gray-300 mt-8 text-lg font-light leading-relaxed animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              Latest developments in sustainable gold mining
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <div className="glass-card rounded-lg p-4 text-center hover-lift transition-all duration-300">
                <div className="text-2xl font-bold text-yellow-400">{filteredNews.length}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Articles</div>
              </div>
              <div className="glass-card rounded-lg p-4 text-center hover-lift transition-all duration-300">
                <div className="text-2xl font-bold text-yellow-400">{categories.length - 1}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Categories</div>
              </div>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex justify-center mt-6 animate-slideInRight" style={{animationDelay: '0.8s'}}>
              <div className="glass-card rounded-lg p-1 flex border border-yellow-400/20">
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover-lift ${
                    viewMode === 'masonry' 
                      ? 'bg-yellow-400 text-black shadow-sm' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Masonry
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover-lift ${
                    viewMode === 'grid' 
                      ? 'bg-yellow-400 text-black shadow-sm' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Grid
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="space-y-8 animate-fadeInUp" style={{animationDelay: '1s'}}>
            <div className="flex items-center space-x-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="group w-16 h-16 rounded-full glass-card hover:glass-gold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 border border-yellow-400/20 hover:border-yellow-400/40 hover-lift"
              >
                <ChevronLeft className="w-7 h-7 text-yellow-400 group-hover:-translate-x-0.5 transition-transform group-hover:text-black" />
              </button>

              <div className="text-white text-4xl font-light flex items-center space-x-4">
                <span className="text-yellow-400 font-normal">{currentPage}</span>
                <span className="text-gray-500">/</span>
                <span className="text-gray-400">{totalPages}</span>
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="group w-16 h-16 rounded-full glass-card hover:glass-gold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 border border-yellow-400/20 hover:border-yellow-400/40 hover-lift"
              >
                <ChevronRight className="w-7 h-7 text-yellow-400 group-hover:translate-x-0.5 transition-transform group-hover:text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="w-2/3 p-12 pr-16">
          {viewMode === 'masonry' ? (
            // Masonry Layout
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Featured News - Large Card */}
              {featuredNews && (
                <div 
                  className="col-span-1 row-span-2 relative overflow-hidden rounded-2xl cursor-pointer group hover-lift transition-all duration-500 animate-fadeInScale"
                  onClick={() => handleNewsClick(featuredNews)}
                  data-animate="true"
                >
                  <img
                    src={featuredNews.imageUrl}
                    alt={featuredNews.title}
                    className="w-full h-auto max-h-[60vh] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    style={{ display: 'block', margin: 0 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Featured Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide flex items-center shadow-lg">
                      <Sparkles className="w-3 h-3 mr-1" />
                      FEATURED
                    </div>
                  </div>

                  {/* Trending Badge */}
                  {featuredNews.trending && (
                    <div className="absolute top-6 left-6">
                      <div className="bg-red-500 text-white p-2 rounded-full">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <div className="text-sm mb-3 text-yellow-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredNews.category} • {featuredNews.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight group-hover:text-yellow-400 transition-colors">
                      {featuredNews.title}
                    </h3>
                    <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                      {featuredNews.subtitle}
                    </p>
                  </div>
                </div>
              )}

              {/* Grid Cards */}
              <div className="col-span-1 grid grid-cols-2 gap-4 h-fit">
                {gridNews.slice(0, 2).map((news, index) => (
                  <div
                    key={news.id}
                    className="relative rounded-xl cursor-pointer group hover-lift transition-all duration-300 animate-fadeInUp overflow-hidden"
                    onClick={() => handleNewsClick(news)}
                    data-animate="true"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      backgroundImage: news.imageUrl ? `url(${news.imageUrl})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Gradient hitam di bawah teks agar tetap terbaca */}
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                      <div className="text-xs text-white mb-3 font-medium drop-shadow">
                        {news.category} • {news.date}
                      </div>
                      <h4 className="text-white font-bold text-sm leading-tight drop-shadow group-hover:text-yellow-400 transition-colors">
                        {news.title}
                      </h4>
                      {news.views && (
                        <div className="flex items-center mt-3 text-xs text-white/80 drop-shadow">
                          <Eye className="w-3 h-3 mr-1" />
                          <span>{news.views}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Middle Row Cards */}
              <div className="col-span-1 grid grid-cols-2 gap-4 h-fit">
                {gridNews.slice(2, 4).map((news, index) => (
                  <div
                    key={news.id}
                    className="relative rounded-xl cursor-pointer group hover-lift transition-all duration-300 animate-fadeInUp overflow-hidden"
                    onClick={() => handleNewsClick(news)}
                    data-animate="true"
                    style={{
                      animationDelay: `${(index + 2) * 0.1}s`,
                      backgroundImage: news.imageUrl ? `url(${news.imageUrl})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Gradient hitam di bawah teks agar tetap terbaca */}
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                      <div className="text-xs text-white mb-3 font-medium drop-shadow">
                        {news.category} • {news.date}
                      </div>
                      <h4 className="text-white font-bold text-sm leading-tight drop-shadow group-hover:text-yellow-400 transition-colors">
                        {news.title}
                      </h4>
                      {news.views && (
                        <div className="flex items-center mt-3 text-xs text-white/80 drop-shadow">
                          <Eye className="w-3 h-3 mr-1" />
                          <span>{news.views}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Row Cards */}
              <div className="col-span-2 grid grid-cols-4 gap-4">
                {gridNews.slice(4, 8).map((news, index) => (
                  <div
                    key={news.id}
                    className="relative rounded-xl cursor-pointer group hover-lift transition-all duration-300 animate-fadeInUp overflow-hidden"
                    onClick={() => handleNewsClick(news)}
                    data-animate="true"
                    style={{
                      animationDelay: `${(index + 4) * 0.1}s`,
                      backgroundImage: news.imageUrl ? `url(${news.imageUrl})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Gradient hitam di bawah teks agar tetap terbaca */}
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                      <div className="text-xs text-white mb-2 font-medium drop-shadow">
                        {news.category} • {news.date}
                      </div>
                      <h4 className="text-white font-bold text-xs leading-tight drop-shadow group-hover:text-yellow-400 transition-colors">
                        {news.title}
                      </h4>
                      {news.views && (
                        <div className="flex items-center mt-2 text-xs text-white/80 drop-shadow">
                          <Eye className="w-3 h-3 mr-1" />
                          <span>{news.views}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Grid Layout
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentNews.map((news, index) => (
                <div
                  key={news.id}
                  className="group cursor-pointer hover-lift transition-all duration-300 animate-fadeInScale"
                  onClick={() => handleNewsClick(news)}
                  data-animate="true"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="glass-card rounded-2xl overflow-hidden hover:bg-yellow-400/10 transition-all duration-300 h-full">
                    {/* Image Section */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
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
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/10 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                          <div className="bg-white/90 rounded-full p-3 shadow-2xl">
                            <ExternalLink className="w-5 h-5 text-black" />
                          </div>
                        </div>
                      </div>

                      {/* Type overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
                          {news.type}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
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

                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                        {news.title}
                      </h3>

                      {news.subtitle && (
                        <h4 className="text-sm text-yellow-400 mb-3 line-clamp-1">
                          {news.subtitle}
                        </h4>
                      )}

                      <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {news.excerpt}
                      </p>

                      {/* Author info */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <div className="flex items-center gap-1 hover:text-white transition-colors">
                          <User className="w-3 h-3" />
                          <span>{news.author}</span>
                        </div>
                        {news.metrics && (
                          <div className="text-yellow-400 font-medium">
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
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default KristalinNewsPage;