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
    id: 34,
    title: "Program Pelatihan Kerajinan Tangan",
    subtitle: "PT Kristalin Ekalestari mengadakan pelatihan kerajinan tangan untuk pemberdayaan ekonomi perempuan",
    date: "20 Jul 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.39.01 (1).jpeg",
    excerpt: "Program pelatihan kerajinan tangan yang bertujuan untuk memberdayakan ekonomi perempuan melalui pengembangan keterampilan kreatif.",
    content: `PT Kristalin Ekalestari mengadakan program pelatihan kerajinan tangan untuk perempuan di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk memberdayakan ekonomi perempuan melalui pengembangan keterampilan kreatif dan wirausaha.\n\n"Kami percaya bahwa pemberdayaan perempuan adalah kunci untuk pembangunan masyarakat yang berkelanjutan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup pembuatan kerajinan dari bahan lokal seperti rotan, bambu, dan kain tradisional Papua.\n\n"Kami mengundang pengrajin lokal dan ahli desain untuk memberikan pelatihan yang berkualitas kepada peserta," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 60 perempuan dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap pelatihan ini dapat membantu perempuan mengembangkan usaha kerajinan dan meningkatkan pendapatan keluarga," ujar Maria.\n\nSelain pelatihan, perusahaan juga membantu pemasaran produk kerajinan melalui berbagai saluran distribusi.`,
    author: "Tim Pemberdayaan PT Kristalin Ekalestari",
    views: "1.0K",
    readTime: "3 min",
    trending: false,
    type: "Kerajinan Tangan",
    metrics: { peserta: "60 Perempuan", produk: "10+ Jenis" }
  },
  {
    id: 33,
    title: "Bantuan Peralatan Olahraga untuk Sekolah",
    subtitle: "PT Kristalin Ekalestari memberikan bantuan peralatan olahraga untuk sekolah-sekolah di Desa Nifasi",
    date: "20 Jul 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.39.01.jpeg",
    excerpt: "Program bantuan peralatan olahraga yang bertujuan untuk mendukung pengembangan olahraga di sekolah-sekolah.",
    content: `PT Kristalin Ekalestari memberikan bantuan peralatan olahraga kepada sekolah-sekolah di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk mendukung pengembangan olahraga dan kesehatan siswa melalui penyediaan peralatan olahraga yang memadai.\n\n"Kami berkomitmen untuk mendukung pengembangan olahraga di sekolah sebagai bagian dari pendidikan yang holistik," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nBantuan yang diberikan meliputi bola sepak, bola basket, bola voli, net, dan peralatan olahraga lainnya.\n\n"Kami bekerja sama dengan guru olahraga untuk memastikan peralatan yang diberikan sesuai dengan kebutuhan sekolah," tambah Andrian Lubis.\n\nProgram ini mencakup 3 sekolah dasar dan 1 sekolah menengah pertama di Desa Nifasi dan sekitarnya.\n\n"Kami berharap bantuan ini dapat mendorong siswa untuk lebih aktif berolahraga dan mengembangkan bakat olahraga mereka," ujar Maria.\n\nSelain bantuan peralatan, perusahaan juga mendukung penyelenggaraan turnamen olahraga antar sekolah.`,
    author: "Tim Pendidikan PT Kristalin Ekalestari",
    views: "850",
    readTime: "2 min",
    trending: false,
    type: "Peralatan Olahraga",
    metrics: { sekolah: "4 Sekolah", peralatan: "50+ Item" }
  },
  {
    id: 32,
    title: "Program Pelatihan Bahasa Inggris",
    subtitle: "PT Kristalin Ekalestari mengadakan pelatihan bahasa Inggris gratis untuk masyarakat",
    date: "20 Jul 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.39.00 (1).jpeg",
    excerpt: "Program pelatihan bahasa Inggris yang bertujuan untuk meningkatkan keterampilan komunikasi dan peluang kerja masyarakat.",
    content: `PT Kristalin Ekalestari mengadakan program pelatihan bahasa Inggris gratis untuk masyarakat di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan keterampilan komunikasi dan membuka peluang kerja yang lebih luas bagi masyarakat.\n\n"Kami percaya bahwa penguasaan bahasa Inggris adalah keterampilan penting di era global ini," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup percakapan sehari-hari, tata bahasa dasar, dan persiapan untuk tes bahasa Inggris.\n\n"Kami mengundang pengajar bahasa Inggris profesional untuk memberikan pelatihan yang berkualitas kepada peserta," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 80 peserta dari berbagai usia dan latar belakang pendidikan.\n\n"Kami berharap pelatihan ini dapat meningkatkan kepercayaan diri peserta dalam berkomunikasi dalam bahasa Inggris," ujar Maria.\n\nSelain pelatihan, perusahaan juga menyediakan buku pelajaran dan materi pembelajaran digital.`,
    author: "Tim Pendidikan PT Kristalin Ekalestari",
    views: "1.2K",
    readTime: "3 min",
    trending: false,
    type: "Pelatihan Bahasa",
    metrics: { peserta: "80 Orang", durasi: "3 Bulan" }
  },
  {
    id: 31,
    title: "Bantuan Alat Kebersihan untuk Masyarakat",
    subtitle: "PT Kristalin Ekalestari memberikan bantuan alat kebersihan untuk menjaga kebersihan lingkungan",
    date: "20 Jul 2025",
    category: "Environmental",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.39.00.jpeg",
    excerpt: "Program bantuan alat kebersihan yang bertujuan untuk mendukung program kebersihan lingkungan masyarakat.",
    content: `PT Kristalin Ekalestari memberikan bantuan alat kebersihan kepada masyarakat di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk mendukung program kebersihan lingkungan dan meningkatkan kesadaran masyarakat akan pentingnya menjaga kebersihan.\n\n"Kami berkomitmen untuk mendukung program kebersihan lingkungan sebagai bagian dari tanggung jawab sosial perusahaan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nBantuan yang diberikan meliputi sapu, tempat sampah, alat pel, dan perlengkapan kebersihan lainnya.\n\n"Kami bekerja sama dengan pemerintah desa untuk memastikan bantuan didistribusikan secara merata kepada masyarakat," tambah Andrian Lubis.\n\nProgram ini mencakup 5 desa di sekitar area operasional perusahaan dengan total 200 kepala keluarga.\n\n"Kami berharap bantuan ini dapat mendorong masyarakat untuk lebih aktif dalam menjaga kebersihan lingkungan," ujar Maria.\n\nSelain bantuan alat, perusahaan juga mengadakan sosialisasi tentang pentingnya kebersihan lingkungan.`,
    author: "Tim Lingkungan PT Kristalin Ekalestari",
    views: "750",
    readTime: "2 min",
    trending: false,
    type: "Alat Kebersihan",
    metrics: { kk: "200 KK", desa: "5 Desa" }
  },
  {
    id: 30,
    title: "Program Pelatihan Fotografi",
    subtitle: "PT Kristalin Ekalestari mengadakan pelatihan fotografi untuk mengembangkan bakat kreatif masyarakat",
    date: "20 Jul 2025",
    category: "Community Development",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.38.58 (1).jpeg",
    excerpt: "Program pelatihan fotografi yang bertujuan untuk mengembangkan bakat kreatif dan potensi ekonomi masyarakat.",
    content: `PT Kristalin Ekalestari mengadakan program pelatihan fotografi untuk masyarakat di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk mengembangkan bakat kreatif masyarakat dan membuka peluang ekonomi baru di bidang fotografi.\n\n"Kami percaya bahwa fotografi adalah seni yang dapat mengembangkan kreativitas dan membuka peluang usaha baru," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup teknik fotografi dasar, pengeditan foto, dan pemasaran jasa fotografi.\n\n"Kami mengundang fotografer profesional untuk memberikan pelatihan yang berkualitas kepada peserta," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 40 peserta dari berbagai usia dan latar belakang.\n\n"Kami berharap pelatihan ini dapat membantu peserta mengembangkan bakat fotografi mereka dan membuka usaha fotografi," ujar Maria.\n\nSelain pelatihan, perusahaan juga menyediakan kamera dan peralatan fotografi untuk praktik.`,
    author: "Tim Kreatif PT Kristalin Ekalestari",
    views: "1.1K",
    readTime: "3 min",
    trending: false,
    type: "Pelatihan Fotografi",
    metrics: { peserta: "40 Orang", kamera: "10 Unit" }
  },
  {
    id: 29,
    title: "Bantuan Alat Memasak untuk Dapur Umum",
    subtitle: "PT Kristalin Ekalestari memberikan bantuan alat memasak untuk dapur umum masyarakat",
    date: "20 Jul 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.38.58.jpeg",
    excerpt: "Program bantuan alat memasak yang bertujuan untuk mendukung kegiatan dapur umum dan pemberdayaan ekonomi masyarakat.",
    content: `PT Kristalin Ekalestari memberikan bantuan alat memasak kepada dapur umum masyarakat di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk mendukung kegiatan dapur umum dan pemberdayaan ekonomi masyarakat melalui pengembangan usaha kuliner.\n\n"Kami berkomitmen untuk mendukung pengembangan usaha kuliner masyarakat sebagai bagian dari pemberdayaan ekonomi," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nBantuan yang diberikan meliputi kompor gas, panci, wajan, dan peralatan memasak lainnya.\n\n"Kami bekerja sama dengan kelompok wanita tani untuk memastikan bantuan diberikan kepada yang benar-benar membutuhkan," tambah Andrian Lubis.\n\nProgram ini mencakup 3 dapur umum yang melayani 150 keluarga di berbagai desa.\n\n"Kami berharap bantuan ini dapat meningkatkan kualitas makanan dan mendorong pengembangan usaha kuliner masyarakat," ujar Maria.\n\nSelain bantuan alat, perusahaan juga memberikan pelatihan pengolahan makanan yang sehat dan bergizi.`,
    author: "Tim Pemberdayaan PT Kristalin Ekalestari",
    views: "900",
    readTime: "2 min",
    trending: false,
    type: "Alat Memasak",
    metrics: { dapur: "3 Dapur", keluarga: "150 KK" }
  },
  {
    id: 28,
    title: "Program Pelatihan Menjahit",
    subtitle: "PT Kristalin Ekalestari mengadakan pelatihan menjahit untuk pemberdayaan ekonomi perempuan",
    date: "20 Jul 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.38.57.jpeg",
    excerpt: "Program pelatihan menjahit yang bertujuan untuk memberdayakan ekonomi perempuan melalui pengembangan keterampilan menjahit.",
    content: `PT Kristalin Ekalestari mengadakan program pelatihan menjahit untuk perempuan di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk memberdayakan ekonomi perempuan melalui pengembangan keterampilan menjahit dan wirausaha.\n\n"Kami percaya bahwa keterampilan menjahit dapat menjadi sumber penghasilan yang stabil bagi perempuan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup teknik menjahit dasar, pembuatan pakaian, dan manajemen usaha jahit.\n\n"Kami mengundang penjahit profesional untuk memberikan pelatihan yang berkualitas kepada peserta," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 45 perempuan dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap pelatihan ini dapat membantu perempuan mengembangkan usaha jahit dan meningkatkan pendapatan keluarga," ujar Maria.\n\nSelain pelatihan, perusahaan juga menyediakan mesin jahit dan peralatan menjahit untuk praktik.`,
    author: "Tim Pemberdayaan PT Kristalin Ekalestari",
    views: "1.0K",
    readTime: "3 min",
    trending: false,
    type: "Pelatihan Menjahit",
    metrics: { peserta: "45 Perempuan", mesin: "15 Unit" }
  },
  {
    id: 27,
    title: "Bantuan Alat Pertukangan",
    subtitle: "PT Kristalin Ekalestari memberikan bantuan alat pertukangan untuk tukang lokal",
    date: "20 Jul 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.38.56.jpeg",
    excerpt: "Program bantuan alat pertukangan yang bertujuan untuk meningkatkan produktivitas dan kesejahteraan tukang lokal.",
    content: `PT Kristalin Ekalestari memberikan bantuan alat pertukangan kepada tukang lokal di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan produktivitas dan kesejahteraan tukang lokal melalui penyediaan alat pertukangan yang berkualitas.\n\n"Kami berkomitmen untuk mendukung pengembangan keterampilan pertukangan dan meningkatkan kesejahteraan tukang lokal," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nBantuan yang diberikan meliputi gergaji, palu, obeng, dan alat pertukangan lainnya yang dapat meningkatkan efisiensi kerja.\n\n"Kami bekerja sama dengan tukang senior untuk memastikan alat yang diberikan sesuai dengan kebutuhan dan standar keamanan," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 30 tukang dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap bantuan ini dapat meningkatkan kualitas hasil kerja dan pendapatan tukang lokal," ujar Maria.\n\nSelain bantuan alat, perusahaan juga memberikan pelatihan keselamatan kerja dan teknik pertukangan modern.`,
    author: "Tim Infrastruktur PT Kristalin Ekalestari",
    views: "800",
    readTime: "2 min",
    trending: false,
    type: "Alat Pertukangan",
    metrics: { tukang: "30 Orang", alat: "50+ Item" }
  },
  {
    id: 26,
    title: "Program Pelatihan Perikanan",
    subtitle: "PT Kristalin Ekalestari mengadakan pelatihan perikanan untuk nelayan lokal",
    date: "20 Jul 2025",
    category: "Environmental",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.38.55 (1).jpeg",
    excerpt: "Program pelatihan perikanan yang bertujuan untuk meningkatkan produktivitas dan kesejahteraan nelayan lokal.",
    content: `PT Kristalin Ekalestari mengadakan program pelatihan perikanan untuk nelayan lokal di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan produktivitas dan kesejahteraan nelayan melalui pengembangan teknik perikanan yang modern dan berkelanjutan.\n\n"Kami berkomitmen untuk mendukung pengembangan sektor perikanan lokal yang merupakan sumber penghidupan penting masyarakat," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup teknik penangkapan ikan yang ramah lingkungan, pengolahan hasil tangkapan, dan pemasaran produk perikanan.\n\n"Kami mengundang ahli perikanan untuk memberikan pelatihan yang berkualitas kepada nelayan," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 40 nelayan dari berbagai desa pesisir di sekitar area operasional perusahaan.\n\n"Kami berharap pelatihan ini dapat meningkatkan hasil tangkapan dan pendapatan nelayan lokal," ujar Maria.\n\nSelain pelatihan, perusahaan juga memberikan bantuan alat tangkap dan peralatan pengolahan ikan.`,
    author: "Tim Perikanan PT Kristalin Ekalestari",
    views: "950",
    readTime: "3 min",
    trending: false,
    type: "Pelatihan Perikanan",
    metrics: { nelayan: "40 Orang", durasi: "2 Minggu" }
  },
  {
    id: 25,
    title: "Bantuan Alat Elektronik untuk Sekolah",
    subtitle: "PT Kristalin Ekalestari memberikan bantuan alat elektronik untuk mendukung pembelajaran digital",
    date: "20 Jul 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.38.55.jpeg",
    excerpt: "Program bantuan alat elektronik yang bertujuan untuk mendukung pembelajaran digital di sekolah-sekolah.",
    content: `PT Kristalin Ekalestari memberikan bantuan alat elektronik kepada sekolah-sekolah di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk mendukung pembelajaran digital dan meningkatkan kualitas pendidikan melalui penggunaan teknologi.\n\n"Kami berkomitmen untuk mendukung pengembangan pendidikan digital sebagai bagian dari peningkatan kualitas pendidikan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nBantuan yang diberikan meliputi laptop, proyektor, speaker, dan peralatan elektronik pendukung pembelajaran lainnya.\n\n"Kami bekerja sama dengan guru dan kepala sekolah untuk memastikan peralatan yang diberikan sesuai dengan kebutuhan pembelajaran," tambah Andrian Lubis.\n\nProgram ini mencakup 2 sekolah dasar dan 1 sekolah menengah pertama di Desa Nifasi dan sekitarnya.\n\n"Kami berharap bantuan ini dapat meningkatkan kualitas pembelajaran dan mempersiapkan siswa menghadapi era digital," ujar Maria.\n\nSelain bantuan alat, perusahaan juga memberikan pelatihan penggunaan teknologi dalam pembelajaran kepada guru.`,
    author: "Tim Pendidikan PT Kristalin Ekalestari",
    views: "1.1K",
    readTime: "3 min",
    trending: false,
    type: "Alat Elektronik",
    metrics: { sekolah: "3 Sekolah", laptop: "15 Unit" }
  },
  {
    id: 24,
    title: "Program Pelatihan Peternakan",
    subtitle: "PT Kristalin Ekalestari mengadakan pelatihan peternakan untuk peternak lokal",
    date: "20 Jul 2025",
    category: "Environmental",
    imageUrl: "/WhatsApp Image 2025-07-20 at 10.38.54.jpeg",
    excerpt: "Program pelatihan peternakan yang bertujuan untuk meningkatkan produktivitas dan kesejahteraan peternak lokal.",
    content: `PT Kristalin Ekalestari mengadakan program pelatihan peternakan untuk peternak lokal di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan produktivitas dan kesejahteraan peternak melalui pengembangan teknik peternakan yang modern dan berkelanjutan.\n\n"Kami berkomitmen untuk mendukung pengembangan sektor peternakan lokal yang merupakan sumber penghidupan penting masyarakat," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup teknik pemeliharaan ternak, pencegahan penyakit, dan pengolahan hasil ternak.\n\n"Kami mengundang ahli peternakan untuk memberikan pelatihan yang berkualitas kepada peternak," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 35 peternak dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap pelatihan ini dapat meningkatkan hasil ternak dan pendapatan peternak lokal," ujar Maria.\n\nSelain pelatihan, perusahaan juga memberikan bantuan bibit ternak dan peralatan peternakan.`,
    author: "Tim Peternakan PT Kristalin Ekalestari",
    views: "900",
    readTime: "3 min",
    trending: false,
    type: "Pelatihan Peternakan",
    metrics: { peternak: "35 Orang", ternak: "100+ Ekor" }
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
    id: 20,
    title: "Kerjasama Strategis dengan Universitas Papua",
    subtitle: "PT Kristalin Ekalestari menandatangani MoU dengan Universitas Papua untuk pengembangan SDM lokal",
    date: "17 Jul 2025",
    category: "Partnership",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.46 (1).jpeg",
    excerpt: "Kerjasama strategis yang bertujuan untuk mengembangkan sumber daya manusia lokal dan transfer teknologi.",
    content: `PT Kristalin Ekalestari menandatangani Memorandum of Understanding (MoU) dengan Universitas Papua untuk kerjasama pengembangan sumber daya manusia lokal dan transfer teknologi.\n\nKerjasama ini mencakup program magang untuk mahasiswa, pelatihan teknologi mining, dan penelitian bersama di bidang sustainable mining.\n\n"Kerjasama ini merupakan komitmen kami untuk mengembangkan SDM lokal dan memberikan kesempatan belajar teknologi mining modern," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nProgram yang akan dilaksanakan meliputi magang mahasiswa di area operasional, pelatihan teknologi mining, dan penelitian bersama tentang sustainable mining practices.\n\n"Kami berharap kerjasama ini dapat menghasilkan SDM lokal yang berkualitas dan siap berkontribusi dalam industri mining," tambah Andrian Lubis.\n\nUniversitas Papua akan menyediakan fasilitas penelitian dan tenaga pengajar untuk mendukung program kerjasama ini.\n\n"Kerjasama ini akan memberikan manfaat besar bagi mahasiswa dan masyarakat Papua," ujar Maria.\n\nMoU ini menandai dimulainya kerjasama jangka panjang antara PT Kristalin Ekalestari dan Universitas Papua.`,
    author: "Tim Partnership PT Kristalin Ekalestari",
    views: "1.5K",
    readTime: "3 min",
    trending: false,
    type: "Academic Partnership",
    metrics: { durasi: "5 Tahun", mahasiswa: "100+ Orang" }
  },
  {
    id: 19,
    title: "Ekspansi Area Mining di Nabire",
    subtitle: "PT Kristalin Ekalestari memulai ekspansi area mining untuk meningkatkan kapasitas produksi",
    date: "16 Jul 2025",
    category: "Mining Operations",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.46.jpeg",
    excerpt: "Ekspansi area mining yang akan meningkatkan kapasitas produksi dan memberikan lapangan kerja baru.",
    content: `PT Kristalin Ekalestari memulai ekspansi area mining di Kabupaten Nabire, Papua Tengah untuk meningkatkan kapasitas produksi dan memberikan lapangan kerja baru bagi masyarakat lokal.\n\nEkspansi ini mencakup area seluas 500 hektar dengan implementasi teknologi mining modern dan standar keselamatan yang tinggi.\n\n"Ekspansi ini merupakan bagian dari rencana jangka panjang kami untuk meningkatkan kapasitas produksi sambil tetap mempertahankan komitmen terhadap lingkungan," ujar Andrian Lubis, Senior Manager & Finance Division PT Kristalin Ekalestari.\n\nProyek ekspansi akan menciptakan 200 lapangan kerja baru bagi masyarakat lokal dengan fokus pada pemberdayaan SDM setempat.\n\n"Kami berkomitmen untuk memberikan prioritas kepada masyarakat lokal dalam rekrutmen tenaga kerja," tambah Maria Erari, Humas PT Kristalin Ekalestari.\n\nEkspansi ini juga akan dilengkapi dengan infrastruktur pendukung seperti jalan akses, fasilitas kesehatan, dan program pengembangan masyarakat.\n\n"Kami berharap ekspansi ini dapat memberikan manfaat ekonomi yang signifikan bagi masyarakat Nabire," ujar Andrian.\n\nProyek ini diperkirakan akan selesai dalam waktu 18 bulan dan akan langsung memberikan kontribusi positif bagi perekonomian lokal.`,
    author: "Tim Mining Operations PT Kristalin Ekalestari",
    views: "1.6K",
    readTime: "4 min",
    trending: false,
    type: "Mining Expansion",
    metrics: { area: "500 Ha", lapangan_kerja: "200 Orang" }
  },
  {
    id: 18,
    title: "Sertifikasi ISO 14001 untuk Environmental Management",
    subtitle: "PT Kristalin Ekalestari berhasil memperoleh sertifikasi ISO 14001 untuk sistem manajemen lingkungan",
    date: "15 Jul 2025",
    category: "Achievement",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.45 (2).jpeg",
    excerpt: "Sertifikasi internasional yang mengakui komitmen perusahaan dalam pengelolaan lingkungan yang berkelanjutan.",
    content: `PT Kristalin Ekalestari berhasil memperoleh sertifikasi ISO 14001 untuk sistem manajemen lingkungan, mengakui komitmen perusahaan dalam pengelolaan lingkungan yang berkelanjutan.\n\nSertifikasi ini diberikan setelah melalui proses audit yang ketat oleh badan sertifikasi internasional yang mengakui implementasi sistem manajemen lingkungan yang efektif.\n\n"Sertifikasi ISO 14001 adalah pengakuan atas komitmen kami dalam menerapkan praktik mining yang ramah lingkungan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nSistem manajemen lingkungan yang diimplementasikan mencakup monitoring dampak lingkungan, pengelolaan limbah, dan program konservasi lingkungan.\n\n"Kami terus berkomitmen untuk mempertahankan standar lingkungan yang tinggi dalam semua operasi kami," tambah Andrian Lubis.\n\nSertifikasi ini juga mengakui program reklamasi lahan dan konservasi keanekaragaman hayati yang telah dilaksanakan perusahaan.\n\n"Keberhasilan ini menegaskan posisi kami sebagai perusahaan mining yang bertanggung jawab terhadap lingkungan," ujar Maria.\n\nSertifikasi ISO 14001 akan membantu perusahaan dalam mempertahankan standar lingkungan yang tinggi dan meningkatkan kepercayaan stakeholder.`,
    author: "Tim Environmental PT Kristalin Ekalestari",
    views: "1.4K",
    readTime: "3 min",
    trending: false,
    type: "Environmental Certification",
    metrics: { standar: "ISO 14001", tahun: "2025" }
  },
  {
    id: 17,
    title: "Kerjasama dengan Pemerintah Daerah Nabire",
    subtitle: "PT Kristalin Ekalestari menandatangani kerjasama dengan Pemerintah Daerah Nabire untuk pengembangan infrastruktur",
    date: "14 Jul 2025",
    category: "Partnership",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.45 (1).jpeg",
    excerpt: "Kerjasama strategis untuk pengembangan infrastruktur dan peningkatan kesejahteraan masyarakat Nabire.",
    content: `PT Kristalin Ekalestari menandatangani kerjasama strategis dengan Pemerintah Daerah Nabire untuk pengembangan infrastruktur dan peningkatan kesejahteraan masyarakat.\n\nKerjasama ini mencakup pembangunan jalan akses, fasilitas kesehatan, dan program pengembangan ekonomi masyarakat.\n\n"Kerjasama ini merupakan wujud komitmen kami untuk berkontribusi dalam pembangunan daerah dan peningkatan kesejahteraan masyarakat," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nProgram yang akan dilaksanakan meliputi pembangunan 10 km jalan akses, renovasi 3 puskesmas, dan program pelatihan wirausaha untuk 500 masyarakat lokal.\n\n"Kami berharap kerjasama ini dapat memberikan manfaat nyata bagi masyarakat Nabire," tambah Andrian Lubis.\n\nPemerintah Daerah Nabire akan menyediakan dukungan administratif dan koordinasi untuk memastikan program berjalan efektif.\n\n"Kerjasama ini akan memperkuat hubungan antara sektor swasta dan pemerintah dalam pembangunan daerah," ujar Maria.\n\nKerjasama ini menandai dimulainya kolaborasi jangka panjang untuk pembangunan Nabire yang berkelanjutan.`,
    author: "Tim Partnership PT Kristalin Ekalestari",
    views: "1.3K",
    readTime: "3 min",
    trending: false,
    type: "Government Partnership",
    metrics: { durasi: "3 Tahun", investasi: "Rp 5 Miliar" }
  },
  {
    id: 16,
    title: "Peningkatan Sistem Monitoring Mining dengan Teknologi Modern",
    subtitle: "PT Kristalin Ekalestari mengimplementasikan sistem monitoring digital untuk operasi mining yang lebih efisien",
    date: "13 Jul 2025",
    category: "Mining Operations",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.45.jpeg",
    excerpt: "Implementasi sistem monitoring digital yang berhasil meningkatkan efisiensi operasi mining dan akurasi pengukuran kadar emas.",
    content: `PT Kristalin Ekalestari berhasil mengimplementasikan sistem monitoring digital untuk optimasi operasi mining di area Nabire, Papua Tengah.\n\nSistem monitoring yang diimplementasikan mencakup sensor digital untuk pengukuran kadar emas, GPS tracking untuk monitoring lokasi penambangan, dan software analisis data real-time.\n\n"Implementasi sistem monitoring digital telah berhasil meningkatkan efisiensi operasi mining sebesar 25% dan akurasi pengukuran kadar emas sebesar 90%," ujar Andrian Lubis, Senior Manager & Finance Division PT Kristalin Ekalestari.\n\nSistem yang dikembangkan bekerja sama dengan tim engineering lokal mencakup monitoring suhu, tekanan, dan kondisi peralatan mining secara real-time.\n\n"Kami terus berinvestasi dalam teknologi monitoring modern untuk memastikan operasi mining yang efisien dan aman," tambah Maria Erari, Humas PT Kristalin Ekalestari.\n\nSistem ini juga membantu dalam pengurangan konsumsi energi dan meminimalkan dampak lingkungan dari operasi mining.\n\n"Implementasi sistem monitoring digital adalah langkah maju dalam modernisasi operasi mining kami," ujar Andrian.\n\nKeberhasilan implementasi sistem ini menegaskan posisi PT Kristalin Ekalestari sebagai perusahaan mining yang mengutamakan efisiensi dan keselamatan.`,
    author: "Tim Mining Operations PT Kristalin Ekalestari",
    views: "1.7K",
    readTime: "4 min",
    trending: true,
    type: "Digital Monitoring",
    metrics: { efisiensi: "25%", akurasi: "90%" }
  },
  {
    id: 15,
    title: "Program Pelatihan Kewirausahaan untuk Masyarakat Lokal",
    subtitle: "PT Kristalin Ekalestari mengadakan pelatihan kewirausahaan untuk memberdayakan ekonomi masyarakat",
    date: "12 Jul 2025",
    category: "Community Development",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.44.jpeg",
    excerpt: "Program pelatihan kewirausahaan yang bertujuan untuk memberdayakan ekonomi masyarakat melalui pengembangan keterampilan bisnis.",
    content: `PT Kristalin Ekalestari mengadakan program pelatihan kewirausahaan untuk masyarakat lokal di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk memberdayakan ekonomi masyarakat melalui pengembangan keterampilan bisnis dan manajemen usaha.\n\n"Kami percaya bahwa pemberdayaan ekonomi masyarakat adalah kunci untuk pembangunan yang berkelanjutan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup berbagai aspek kewirausahaan termasuk perencanaan bisnis, manajemen keuangan, pemasaran, dan pengembangan produk.\n\n"Kami mengundang para ahli bisnis dan konsultan untuk memberikan pelatihan yang berkualitas kepada peserta," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 100 peserta dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap pelatihan ini dapat membantu masyarakat mengembangkan usaha mereka dan meningkatkan pendapatan keluarga," ujar Maria.\n\nSelain pelatihan, perusahaan juga akan memberikan bantuan modal usaha kepada peserta yang memiliki rencana bisnis yang feasible.\n\nProgram ini merupakan bagian dari komitmen perusahaan dalam pengembangan ekonomi masyarakat lokal.`,
    author: "Tim Pengembangan Ekonomi PT Kristalin Ekalestari",
    views: "1.0K",
    readTime: "3 min",
    trending: false,
    type: "Pengembangan Ekonomi",
    metrics: { peserta: "100 Orang", durasi: "2 Minggu" }
  },
  {
    id: 15,
    title: "Pembangunan Jembatan Penghubung Antar Desa",
    subtitle: "PT Kristalin Ekalestari membangun jembatan untuk meningkatkan aksesibilitas antar desa",
    date: "01 Jul 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.44 (3).jpeg",
    excerpt: "Proyek pembangunan jembatan yang akan meningkatkan aksesibilitas dan mobilitas masyarakat antar desa.",
    content: `PT Kristalin Ekalestari memulai proyek pembangunan jembatan penghubung antar desa di Kabupaten Nabire, Papua Tengah.\n\nJembatan ini akan menghubungkan beberapa desa yang selama ini terpisah oleh sungai dan sulit diakses terutama pada musim hujan.\n\n"Kami berkomitmen untuk meningkatkan aksesibilitas dan mobilitas masyarakat melalui pembangunan infrastruktur yang berkualitas," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nJembatan yang dibangun menggunakan teknologi modern dan material berkualitas tinggi untuk memastikan keamanan dan ketahanan.\n\n"Kami bekerja sama dengan ahli konstruksi dan insinyur lokal untuk memastikan jembatan dibangun sesuai standar keamanan," tambah Andrian Lubis.\n\nPembangunan jembatan ini akan memberikan manfaat besar bagi masyarakat dalam hal akses ke fasilitas kesehatan, pendidikan, dan ekonomi.\n\n"Kami berharap jembatan ini dapat meningkatkan kualitas hidup masyarakat dan mendorong pertumbuhan ekonomi lokal," ujar Maria.\n\nProyek ini diperkirakan akan selesai dalam waktu 8 bulan dan akan langsung memberikan manfaat bagi ribuan masyarakat.\n\nProgram ini merupakan bagian dari komitmen perusahaan dalam pengembangan infrastruktur masyarakat.`,
    author: "Tim Infrastruktur PT Kristalin Ekalestari",
    views: "1.1K",
    readTime: "3 min",
    trending: false,
    type: "Infrastruktur Jembatan",
    metrics: { panjang: "50 Meter", durasi: "8 Bulan" }
  },
  {
    id: 14,
    title: "Program Pemberdayaan Perempuan dan Anak",
    subtitle: "PT Kristalin Ekalestari meluncurkan program khusus untuk pemberdayaan perempuan dan anak",
    date: "28 Jun 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.44 (2).jpeg",
    excerpt: "Program pemberdayaan yang fokus pada pengembangan keterampilan dan peningkatan kualitas hidup perempuan dan anak.",
    content: `PT Kristalin Ekalestari meluncurkan program pemberdayaan perempuan dan anak di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan kualitas hidup perempuan dan anak melalui pengembangan keterampilan, pendidikan, dan kesehatan.\n\n"Kami percaya bahwa pemberdayaan perempuan dan anak adalah investasi penting untuk masa depan masyarakat," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nProgram ini mencakup pelatihan keterampilan, pendidikan kesehatan, dan pengembangan bakat anak-anak.\n\n"Kami bekerja sama dengan organisasi perempuan dan lembaga pendidikan untuk memastikan program ini memberikan manfaat maksimal," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 200 perempuan dan 150 anak dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap program ini dapat membantu perempuan dan anak-anak mencapai potensi terbaik mereka," ujar Maria.\n\nSelain pelatihan, perusahaan juga memberikan bantuan modal usaha kepada perempuan yang ingin mengembangkan usaha.\n\nProgram ini merupakan bagian dari komitmen perusahaan dalam pengembangan masyarakat yang inklusif.`,
    author: "Tim Pemberdayaan PT Kristalin Ekalestari",
    views: "950",
    readTime: "3 min",
    trending: false,
    type: "Pemberdayaan Perempuan",
    metrics: { peserta: "350 Orang", fokus: "Perempuan & Anak" }
  },
  {
    id: 13,
    title: "Program Konservasi Air dan Sungai",
    subtitle: "PT Kristalin Ekalestari melakukan program konservasi air untuk menjaga kelestarian sungai",
    date: "25 Jun 2025",
    category: "Environmental",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.44 (1).jpeg",
    excerpt: "Program konservasi air yang bertujuan untuk menjaga kelestarian sungai dan sumber air bagi masyarakat.",
    content: `PT Kristalin Ekalestari melaksanakan program konservasi air dan sungai di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk menjaga kelestarian sungai dan sumber air yang merupakan kebutuhan vital bagi masyarakat dan ekosistem.\n\n"Kami berkomitmen untuk menjaga kelestarian lingkungan dan sumber daya air yang merupakan hak semua makhluk hidup," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nProgram ini mencakup pembersihan sungai, penanaman pohon di bantaran sungai, dan edukasi masyarakat tentang pentingnya konservasi air.\n\n"Kami bekerja sama dengan masyarakat lokal dan organisasi lingkungan untuk memastikan program ini berjalan efektif," tambah Andrian Lubis.\n\nProgram ini melibatkan partisipasi aktif masyarakat dalam berbagai kegiatan konservasi air.\n\n"Kami berharap program ini dapat membantu menjaga kualitas air dan kelestarian sungai untuk generasi mendatang," ujar Maria.\n\nSelain konservasi, perusahaan juga melakukan monitoring kualitas air secara berkala.\n\nProgram ini merupakan bagian dari komitmen perusahaan dalam pengelolaan lingkungan yang berkelanjutan.`,
    author: "Tim Lingkungan PT Kristalin Ekalestari",
    views: "1.2K",
    readTime: "3 min",
    trending: false,
    type: "Konservasi Air",
    metrics: { sungai: "5 Sungai", durasi: "6 Bulan" }
  },
  {
    id: 12,
    title: "Program Pengembangan Olahraga dan Kesehatan",
    subtitle: "PT Kristalin Ekalestari mendukung pengembangan olahraga dan kesehatan masyarakat",
    date: "22 Jun 2025",
    category: "CSR Initiative",
    imageUrl: "/WhatsApp Image 2025-07-20 at 09.57.44.jpeg",
    excerpt: "Program pengembangan olahraga yang bertujuan untuk meningkatkan kesehatan dan kebugaran masyarakat.",
    content: `PT Kristalin Ekalestari meluncurkan program pengembangan olahraga dan kesehatan masyarakat di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan kesehatan dan kebugaran masyarakat melalui kegiatan olahraga yang terorganisir.\n\n"Kami percaya bahwa kesehatan adalah aset berharga yang harus dijaga dan dikembangkan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nProgram ini mencakup pembangunan fasilitas olahraga, pelatihan olahraga, dan penyelenggaraan turnamen olahraga.\n\n"Kami bekerja sama dengan pelatih olahraga dan organisasi olahraga lokal untuk memastikan program ini berkualitas," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 300 peserta dari berbagai usia dan latar belakang.\n\n"Kami berharap program ini dapat mendorong masyarakat untuk hidup lebih sehat dan aktif," ujar Maria.\n\nSelain olahraga, perusahaan juga memberikan edukasi tentang pentingnya pola hidup sehat.\n\nProgram ini merupakan bagian dari komitmen perusahaan dalam pengembangan masyarakat yang sehat dan produktif.`,
    author: "Tim Olahraga PT Kristalin Ekalestari",
    views: "850",
    readTime: "2 min",
    trending: false,
    type: "Pengembangan Olahraga",
    metrics: { peserta: "300 Orang", fasilitas: "Lapangan & Peralatan" }
  },
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
    content: `Sebanyak 506 Paket sembako diserahkan ke warga Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, oleh PT Kristalin Ekalestari dalam rangka Corporate Social Responsibility (CSR). Dari sekira 50 persen diantaranya para janda Lanjut Usia (Lansia).\n\nHumas PT Kristalin Ekalestari Maria Erari menerangkan, pihaknya menyerahkan bantuan 506 paket sembako bulan Juli 2025 untuk 506 Kepala Keluarga (KK) warga di Desa Nifasi dan sekitarnya sebagai tanggung jawab sosial Perusahaan.\n\n"Untuk bantuan bulan Juli 2025 ini, kami rutin ya setiap bulannya dan tidak ada yang berkurang dan menambah sebanyak 506 paket sembako untuk 506 KK," ucap Maria Erari dikonfirmasi di Jakarta pada Selasa, 8 Juli 2025.\n\nMaria menambahkan Bantuan ratusan paket sembako dari PT Kristalin Ekalestari hampir sama di bulan-bulan sebelumnya yakni 506 paket sembako diberikan ke masyarakat, tempat ibadah seperti gereja, masjid dan kantor pelayanan publik.\n\n"Dari 506 yang disalurkan hampir sekira 50 persen yang menerima dari kalangan Janda Lansia (Lanjut Usia-red) kami antarkan langsung dari data yang sudah ditentukan dan rekomendasi kepala suku dan adat," ujarnya.\n\nMenurutnya program bantuan sembako yang disalurkan setiap bulannya oleh PT Kristalin Ekalestari dalam program Corporate Social Responsibilty (CSR). Maria menilai konsistensi program CSR perusahaanya untuk Masyarakat sekitar lingkungan area pekerjaan dengan menyalurkan sembako.\n\nBantuan sembako tersebut disebar di lokasi Desa Nifasi, Suku Dani, Kp. Mamai, Kp. Orluk, Kp. Mamai, Kp. Makimi, Desa Samabusa dan Desa Waharia.\n\n"Terima kasih kepada PT Kristalin Ekalestari sudah memberikan bantuan sembako setiap bulannya, anak-anak sudah menerima," kata salah satu warga Suku Mamai menerima bantuan sembako.\n\nSembako yang dibagikan tetap sama rutin setiap bulannya yakni beras, telur, mie instan, minyak goreng, tepung terigu, sabun cuci, kopi dan teh. Program-program lain PT Kristalin Ekalestari yang sudah direalisasikan merupakan tanggung jawab sosial Perusahaan terhadap lingkungan dan masyarakat antara lain, pendidikan, renovasi sekolahan, gereja, bedah rumah warga dan kegiatan masyarakat.`,
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
    content: `Pasangan suami istri (Pasutri) ini bahagia lepas bahagia setelah mendapatkan bantuan berupa satu rumah layak di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.\n\nYuliana Manuaron mendapatkan rumah dari PT Kristalin Ekalestari dalam program Corporate Social Responsibility (CSR).\n\nIbu Rumah Tangga ini bersama suaminya yang hanya bekerja sebagai Buruh Lepas bisa menempati rumah bangunan cat berwarna hijau. Pasalnya, PT Kristalin Ekalestari sudah menyerahkan rumah tipe 57 spesifikasi bangunan rumah tembok semi permanen memiliki dua kamar tidur dan satu kamar mandi.\n\nYuliana bersyukur karena memang belum memiliki rumah. "Terima kasih banyak perusahaan PT Kristalin Ekalestari Puji Tuhan, saya bisa dapat rumah dari Kristalin. Terima kasih," ucap Yuliana.\n\nSementara itu Humas PT Kristalin Ekalestari Maria Erari menerangkan sudah kesekian kalinya pihaknya menyerahkan rumah untuk masyarakat yang belum memiliki rumah dan sudah mendata secara detail sekaligus rekomendasikan dari Ketua Adat.\n\n"Ini bukti komitmen kami sebagai perusahaan yang bergerak di Tambang, memberikan manfaat banyak kepada masyarakat terutama warga yang belum mendapatkan rumah lewat program CSR," ujar Maria Erari dalam keterangannya di Jakarta, Selasa 24 Juni 2025.\n\nMenurut Maria, ia mengilustrasikan Desa Nifasi ini sebagai seorang wanita berubah menjadi cantik yang terawat. "Kami ibaratkan Desa ini sebelumnya biasa-biasa saja, kini menjadi berubah seperti wanita cantik yang terawat dan memberikan manfaat banyak kepada masyarakat dengan kehadiran kami PT Kristalin Ekalestari," katanya.\n\nIa juga menambahkan dalam situasi apapun perusahaannya akan berkontribusi dan konsisten sebagai perusahaan yang legal dan berizin di wilayaha Nabire, Papua Tengah, akan terus berupaya memberikan kontribusi yang terbaik untuk masyarakat sekitar.\n\n"Dalam situasi apapun kami akan memberikan yang terbaik untuk warga. Bisa melihat pembangunan Desa ini luar biasa selain itu kami juga menggerakan roda ekonomi untuk lokasi wisata Sungai Musairo," tutur Maria.\n\nMelalui program Corporate Social Responsibility (CSR) membantu warga yang belum punya rumah dan renovasi total rumah tidak layak. PT Kristalin Ekalestari selain membangun rumah untuk warga yang belum memiliki rumah dan bedah rumah, membangun Pembangunan gereja, pendidikan, bantuan sembako, kendaraan operasional masyarakat dan gereja. (Ril)`,
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewMode, setViewMode] = useState<'masonry' | 'grid'>('masonry');
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

  // Ganti handleNewsClick agar push state ke /news?id=...
  const handleNewsClick = (news: NewsItem) => {
    router.visit(`/news?id=${news.id}`, { replace: false });
  };

  // Ganti handleBackToList agar push state ke /news (tanpa id)
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

  // News Detail View with simple animations and black/gold/white theme
  if (selectedNews) {
    return (
      <div className={`min-h-screen bg-black page-transition ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <Header />

        {/* Improved Header Navigation */}
        <div className="bg-black border-b border-gray-800/50 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-start"> {/* Ubah justify-between jadi justify-start */}
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

        {/* Main Content Container - Improved sizing */}
        <div className="max-w-6xl mx-auto px-6 py-8 pb-32"> {/* Tambah pb-32 agar konten tidak tertutup footer */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Left Column - Image (2/5 width) */}
            <div className="lg:col-span-2">
              <div className="relative w-full aspect-[4/3] max-h-[70vh] rounded-xl overflow-hidden">
                <img
                  src={selectedNews.imageUrl}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover rounded-xl"
                  style={{ display: 'block' }}
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
                    }}
                  >
                    {/* Background Image */}
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                      onLoad={() => console.log('Image loaded:', news.imageUrl)}
                      onError={(e) => {
                        console.log('Image failed to load:', news.imageUrl);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Fallback background if image fails - only show if image is hidden */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0" style={{ display: 'none' }} />
                    
                    {/* Gradient hitam di bawah teks agar tetap terbaca */}
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent z-10" />
                    <div className="relative z-20 p-6 h-full flex flex-col justify-end">
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
                    }}
                  >
                    {/* Background Image */}
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                      onLoad={() => console.log('Image loaded:', news.imageUrl)}
                      onError={(e) => {
                        console.log('Image failed to load:', news.imageUrl);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Fallback background if image fails - only show if image is hidden */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0" style={{ display: 'none' }} />
                    
                    {/* Gradient hitam di bawah teks agar tetap terbaca */}
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent z-10" />
                    <div className="relative z-20 p-6 h-full flex flex-col justify-end">
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
                    }}
                  >
                    {/* Background Image */}
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                      onLoad={() => console.log('Image loaded:', news.imageUrl)}
                      onError={(e) => {
                        console.log('Image failed to load:', news.imageUrl);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Fallback background if image fails - only show if image is hidden */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0" style={{ display: 'none' }} />
                    
                    {/* Gradient hitam di bawah teks agar tetap terbaca */}
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent z-10" />
                    <div className="relative z-20 p-4 h-full flex flex-col justify-end">
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