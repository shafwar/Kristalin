import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "@inertiajs/react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

// Import data berita dari news.tsx
const newsData = [
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
];

const PlaceholderImg = ({ text }: { text: string }) => (
  <svg width="100%" height="100%" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="600" height="400" fill="#e5e7eb" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fill="#6b7280">{text}</text>
  </svg>
);

const contact = {
  phone: "(021) 22978900",
  email: "info@kristalin.co.id",
  location: "ESQ Leadership Centre - 165 Tower",
  address: "Menara 165 Lantai 21 A~C, Jl. TB Simatupang No.Kav 1, RT.3/RW.3, Cilandak Tim., Ps. Minggu, Kota Jakarta Selatan, DKI Jakarta 12560"
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function Welcome() {
  const [currentNews, setCurrentNews] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentContent, setCurrentContent] = useState(0);

  // Contact form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    inquiry: '',
    attachment: null as File | null
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Menggunakan 4 berita terbaru dari newsData
  const newsItems = newsData.slice(0, 4).map(news => ({
    date: news.date,
    title: news.title,
    excerpt: news.excerpt
  }));

  // Contact form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFileError('File size should be less than 10MB');
        return;
      }
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Please select PDF, JPG, PNG, or PPT files only');
        return;
      }
      setFormData(prev => ({ ...prev, attachment: file }));
      setFileName(file.name);
      setFileError('');
    } else {
      setFormData(prev => ({ ...prev, attachment: null }));
      setFileName('');
      setFileError('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.inquiry.trim()) newErrors.inquiry = 'Inquiry is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAlert({ type: 'success', message: 'Your inquiry has been submitted successfully! We will get back to you soon.' });
      setFormData({ name: '', email: '', phone: '', subject: '', inquiry: '', attachment: null });
      setFileName('');
      setErrors({});
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to submit inquiry. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', subject: '', inquiry: '', attachment: null });
    setFileName('');
    setFileError('');
    setErrors({});
    setAlert(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const contentSets = [
    {
      title1: "Introducing",
      title2: "Kristalin Ekalestari",
      subtitle: "Trusted gold mining company since 1989",
      titleColors: "text-gray-900",
      title2Colors: "bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent"
    },
    {
      title1: "Trusted Partner",
      title2: "Gold Exploration & Trading",
      subtitle: "Since 1989, committed to sustainable gold mining in Papua.",
      titleColors: "text-gray-900",
      title2Colors: "text-yellow-600"
    }
  ];

  // Content rotation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentContent((prev) => (prev + 1) % contentSets.length);
    }, 5000); // Change content every 5 seconds
    return () => clearInterval(interval);
  }, [contentSets.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

  // Main Content
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <Header sticky={true} />

      {/* Hero Section */}
      <section className="h-[66.5vh] w-full flex flex-col md:flex-row bg-white relative py-6 md:py-8 pt-20">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center pl-8 md:pl-20 pr-4 relative">
          {/* Animated SVG Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 600 400">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#FFD700">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)"/>
          </svg>
          
          <div className={`relative z-10 max-w-xl transition-all duration-1000 ${
            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            {/* Premium Staggered Animation with Fade + Scale */}
            <div className="relative">
              <div 
                key={currentContent}
                className="animate-containerFade"
              >
                <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                  <span className={`inline-block animate-staggeredFadeScale delay-0 ${contentSets[currentContent].titleColors}`}>
                    {contentSets[currentContent].title1}
                  </span>
                  <br />
                  <span className={`inline-block animate-staggeredFadeScale delay-200 ${contentSets[currentContent].title2Colors}`}>
                    {contentSets[currentContent].title2}
                  </span>
                </h1>
              </div>
            </div>

            {/* Subtitle with Elegant Fade */}
            <div className="relative">
              <p 
                key={`subtitle-${currentContent}`}
                className="mb-4 text-base md:text-lg text-gray-700 animate-staggeredFadeScale delay-400"
              >
                {contentSets[currentContent].subtitle}
              </p>
            </div>

            {/* Button with Final Reveal */}
            <a
              href="/about#about-kristalin"
              className="bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-600 hover:shadow-xl hover:scale-105 transition-all duration-300 text-base md:text-lg inline-block mt-6 transform animate-staggeredFadeScale delay-600"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className={`relative transition-all duration-1000 delay-400 ${
            isLoaded ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-10 opacity-0 scale-95'
          }`}>
            <img
              src="/menara165.jpg"
              alt="Menara 165"
              className="w-full max-w-[420px] h-[220px] md:h-[320px] object-cover object-top rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Grid Section with enhanced animations */}
      <section className="w-full flex flex-col md:flex-row h-[260px] md:h-[320px] bg-black items-stretch">
        {/* Portfolio */}
        <div 
          className="flex-1 relative flex flex-col justify-end px-14 py-10 overflow-hidden border-r border-gray-800 cursor-pointer group"
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => window.location.href = '/line-of-business'}
        >
          <img
            src="https://web-assets.bcg.com/56/d2/d0e00f1a4355852a4bb364c4e513/valuecreationinmining-heroimage.jpg"
            alt="Our Portfolio"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              hoveredCard === 0 ? 'opacity-60 scale-110' : 'opacity-40 scale-100'
            }`}
            style={{ zIndex: 1 }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const next = e.currentTarget.nextElementSibling;
              if (next && next instanceof HTMLElement) {
                next.style.display = 'block';
              }
            }}
          />
          <div className="hidden absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <PlaceholderImg text="Portfolio Image" />
          </div>
          <div className="relative z-10">
            <div className={`text-xs uppercase tracking-widest text-gray-300 mb-1 transition-all duration-300 ${
              hoveredCard === 0 ? 'text-yellow-300' : ''
            }`}>
              Business Line
            </div>
            <div className={`text-2xl md:text-3xl font-bold text-white mb-2 transition-all duration-300 ${
              hoveredCard === 0 ? 'transform translate-x-2' : ''
            }`}>
              Our Portfolio
            </div>
            <div className={`h-1 bg-yellow-500 rounded mb-2 transition-all duration-300 ${
              hoveredCard === 0 ? 'w-16' : 'w-10'
            }`}></div>
          </div>
        </div>

        {/* Business Activities */}
        <Link 
          href="/business-activity"
          className="flex-1 relative flex flex-col justify-end px-14 py-10 overflow-hidden border-r border-gray-800 cursor-pointer group"
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <img
            src="https://i0.wp.com/startuptipsdaily.com/wp-content/uploads/2017/06/mining-business-ideas-and-opportunity.jpg?fit=3072%2C2048&ssl=1"
            alt="Business Activities"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              hoveredCard === 1 ? 'opacity-60 scale-110' : 'opacity-40 scale-100'
            }`}
            style={{ zIndex: 1 }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const next = e.currentTarget.nextElementSibling;
              if (next && next instanceof HTMLElement) {
                next.style.display = 'block';
              }
            }}
          />
          <div className="hidden absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <PlaceholderImg text="Governance Image" />
          </div>
          <div className="relative z-10">
            <div className={`text-2xl md:text-3xl font-bold text-white mb-2 transition-all duration-300 ${
              hoveredCard === 1 ? 'transform translate-x-2' : ''
            }`}>
              Business Activities
            </div>
            <span 
              className={`underline text-white hover:text-yellow-400 text-lg md:text-xl mt-2 transition-all duration-300 ${
                hoveredCard === 1 ? 'text-yellow-400' : ''
              }`}
            >
              Find out more →
            </span>
          </div>
        </Link>

        {/* News with proper normal sizing */}
        <Link 
          href="/news"
          className="flex-1 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 flex flex-col justify-between px-8 md:px-12 py-8 relative overflow-hidden transition-all duration-700 group cursor-pointer"
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Background Image - Hidden by default, shown on hover */}
          <div className="absolute inset-0 transition-all duration-700 group-hover:opacity-100 opacity-0">
            <img
              src={newsData[currentNews].imageUrl}
              alt={newsData[currentNews].title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-all duration-700"></div>
          </div>

          {/* Clean background - Visible by default, hidden on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent group-hover:opacity-0 transition-all duration-700"></div>

          {/* Top Section - Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className={`text-2xl md:text-3xl font-bold transition-all duration-500 ${
                hoveredCard === 2 ? 'transform scale-110 text-white' : 'text-gray-900'
              }`}>
                News
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length);
                  }}
                  className="w-8 h-8 flex items-center justify-center text-black group-hover:text-white hover:bg-black hover:bg-opacity-20 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentNews((prev) => (prev + 1) % newsItems.length);
                  }}
                  className="w-8 h-8 flex items-center justify-center text-black group-hover:text-white hover:bg-black hover:bg-opacity-20 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Middle Section - Content with improved spacing and text handling */}
          <div className="relative z-10 flex-1 flex flex-col justify-center min-h-0">
            <div key={currentNews} className="transform transition-all duration-500 space-y-4">
              {/* Date */}
              <div className="text-xs text-gray-800 group-hover:text-gray-200 font-medium opacity-80 transition-all duration-500">
                {newsItems[currentNews].date}
              </div>
              
              {/* Title with line clamp */}
              <div className="text-base md:text-lg lg:text-xl font-bold text-black group-hover:text-white leading-tight line-clamp-3 transition-all duration-500">
                {newsItems[currentNews].title}
              </div>
              
              {/* Description with line clamp */}
              <div className="text-sm md:text-base text-gray-900 group-hover:text-gray-200 leading-relaxed opacity-90 line-clamp-3 transition-all duration-500">
                {newsItems[currentNews].excerpt}
              </div>
            </div>
          </div>
          
          {/* Bottom Section - View button with proper spacing */}
          <div className="relative z-10 mt-6 pt-4 border-t border-black/10 group-hover:border-white/20 transition-all duration-500">
            <div className="inline-flex items-center text-black group-hover:text-white font-semibold text-base md:text-lg group transition-all duration-300">
              <span className="relative z-10">View</span>
              <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent group-hover:via-white/30 transition-all duration-500"></div>
        </Link>
      </section>



      {/* Contact Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-white mt-16"
      >
        <div className="flex flex-col lg:flex-row flex-1 min-h-screen relative w-full max-w-none">
          {/* Form Section - Expands to fill available space */}
          <div className="w-full lg:flex-1 bg-white flex flex-col justify-start px-6 md:px-12 py-2 md:py-4 relative z-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mb-2 text-left"
            >
              <div className="h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mb-2 w-20" />
              <h1 className="text-4xl md:text-5xl font-bold mb-1">
                <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">Contact</span>{' '}
                <span className="text-gray-800">Us</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-black/90 font-medium mb-1 mt-0 text-left"
            >
              Find out more information about Kristalin Eka Lestari
            </motion.p>
            
            {/* Form takes full available width */}
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-2xl p-3 md:p-5 w-full max-w-none z-10 mb-4"
              onSubmit={handleSubmit}
              autoComplete="off"
              noValidate
              style={{ minWidth: '100%', boxSizing: 'border-box' }}
            >
              <AnimatePresence>
                {alert && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mb-4 px-3 py-2 rounded-lg text-center font-semibold text-sm shadow transition-all duration-300 w-full max-w-full ${
                      alert.type === 'success'
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                    }`}
                    style={{ wordWrap: 'break-word', boxSizing: 'border-box' }}
                    role="alert"
                  >
                    {alert.message}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="w-full">
                  <Label htmlFor="name" className="text-base text-gray-900 font-semibold">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Insert Name"
                    className={`bg-white mt-2 text-gray-900 placeholder:text-gray-500 w-full ${errors.name ? 'border-red-400' : ''}`}
                    value={formData.name}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                    style={{ boxSizing: 'border-box' }}
                  />
                  {errors.name && <div id="name-error" className="text-xs text-red-500 mt-1">{errors.name}</div>}
        </div>
                <div className="w-full">
                  <Label htmlFor="email" className="text-base text-gray-900 font-semibold">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Insert Email"
                    className={`bg-white mt-2 text-gray-900 placeholder:text-gray-500 w-full ${errors.email ? 'border-red-400' : ''}`}
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    style={{ boxSizing: 'border-box' }}
                  />
                  {errors.email && <div id="email-error" className="text-xs text-red-500 mt-1">{errors.email}</div>}
                </div>
              </div>
              <div className="mt-3 w-full">
                <Label htmlFor="phone" className="text-base text-gray-900 font-semibold">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Insert Phone Number (optional)"
                  className="bg-white mt-2 text-gray-900 placeholder:text-gray-500 w-full"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{ boxSizing: 'border-box' }}
                />
              </div>
              <div className="mt-3 w-full">
                <Label htmlFor="subject" className="text-base text-gray-900 font-semibold">Subject *</Label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className={`mt-2 w-full rounded-md border px-3 py-2 text-base bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-300 ${errors.subject ? 'border-red-400' : 'border-gray-300'}`}
                  value={formData.subject}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.subject}
                  aria-describedby="subject-error"
                  style={{ boxSizing: 'border-box' }}
                >
                  <option value="">Select Subject</option>
                  <option value="General">General</option>
                  <option value="Partnership">Partnership</option>
                  <option value="CSR">CSR</option>
                  <option value="Career">Career</option>
                </select>
                {errors.subject && <div id="subject-error" className="text-xs text-red-500 mt-1">{errors.subject}</div>}
              </div>
              <div className="mt-3 w-full">
                <Label htmlFor="attachment" className="text-base text-gray-900 font-semibold">Attachment</Label>
                <div
                  className={`flex items-center gap-3 mt-2 border-2 rounded-md p-4 transition-all duration-200 cursor-pointer hover:border-amber-300 hover:bg-gray-50 w-full max-w-full ${dragActive ? 'border-amber-400 bg-amber-50' : 'border-gray-300 border-dashed'}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  tabIndex={0}
                  role="button"
                  aria-label="Upload file"
                  style={{ boxSizing: 'border-box' }}
                >
                  <input
                    ref={fileInputRef}
                    id="attachment"
                    name="attachment"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.ppt,.pptx"
                    className="hidden"
                    onChange={e => handleFileChange(e.target.files?.[0] || null)}
                  />
                  {/* Upload Icon */}
                  <div className="flex-shrink-0">
                    {fileName ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    {fileName ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-green-600">{fileName}</span>
                        <button
                          type="button"
                          className="ml-2 text-red-500 hover:text-red-700 hover:underline text-xs"
                          onClick={e => {
                            e.stopPropagation();
                            handleFileChange(null);
                          }}
                          aria-label="Remove file"
                        >Remove</button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 font-medium">Click or drag file here (optional)</div>
                        <div className="text-xs text-gray-500 mt-1">PDF, JPG, PNG, PPT (max 10MB)</div>
                      </div>
                    )}
                  </div>
                </div>
                {fileError && <div className="text-xs text-red-500 mt-1">{fileError}</div>}
              </div>
              <div className="mt-3">
                <Label htmlFor="inquiry" className="text-base text-gray-900 font-semibold">Inquiry *</Label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  required
                  placeholder="Write your question here"
                  rows={4}
                  className={`mt-2 w-full rounded-md border px-3 py-2 text-base bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-300 ${errors.inquiry ? 'border-red-400' : 'border-gray-300'}`}
                  value={formData.inquiry}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.inquiry}
                  aria-describedby="inquiry-error"
                />
                {errors.inquiry && <div id="inquiry-error" className="text-xs text-red-500 mt-1">{errors.inquiry}</div>}
              </div>
              <div className="mt-3 flex items-center">
                <input type="checkbox" id="captcha" required className="mr-2" />
                <label htmlFor="captcha" className="text-sm text-gray-900 font-medium">I'm not a robot</label>
              </div>
              <div className="mt-4 flex flex-col md:flex-row gap-4 justify-end">
                <Button
                  type="submit"
                  className="w-full md:w-auto px-10 h-12 text-base font-bold bg-yellow-400 hover:bg-yellow-500 text-black rounded-md shadow transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? <span className="animate-pulse">Submitting...</span> : 'Submit Inquiry'}
                </Button>
                <Button
                  type="button"
                  className="w-full md:w-auto px-10 h-12 text-base font-bold bg-gray-200 hover:bg-gray-300 text-black rounded-md shadow transition-all duration-200"
                  onClick={handleReset}
                  disabled={loading}
                >
                  Reset
                </Button>
              </div>
            </motion.form>
          </div>
          
          {/* Image Section - Fixed width at right edge */}
          <div className="w-full h-64 lg:w-[500px] lg:min-w-[500px] lg:h-auto lg:mt-[-4rem] relative bg-black overflow-hidden flex-shrink-0 z-10">
            <img
              src="/menara165-sore.webp"
              alt="Menara 165"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </motion.section>

      {/* Contact Info Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-black py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            variants={fadeInUp} 
            transition={{ duration: 0.4, ease: "easeInOut" }} 
            className="text-center mb-16"
          >
            <h2 className="text-sm font-semibold text-gray-400 tracking-[0.25em] mb-4">
              GET IN TOUCH
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white">
              Do Not Hesitate To Contact Us
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Phone */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
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
                  scale: 1.15, 
                  rotate: 360,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
                className="flex justify-center mb-4"
              >
                <motion.div 
                  className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                </motion.div>
              </motion.div>
              <h4 className="text-2xl font-normal text-white mb-4">Phone</h4>
              <span className="text-gray-300 text-lg">{contact.phone}</span>
            </motion.div>

            {/* Email */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
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
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-2xl font-normal text-white mb-4">Email</h4>
              <a href={`mailto:${contact.email}`} className="text-yellow-500 hover:text-yellow-400 transition-colors text-lg">
                {contact.email}
              </a>
            </motion.div>

            {/* Address */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
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
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-2xl font-normal text-white mb-4">Address</h4>
              <div className="text-gray-300">
                <div className="font-semibold text-yellow-500 mb-2">{contact.location}</div>
                <div className="text-sm leading-relaxed">
                  {contact.address}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />

      {/* Premium Staggered Animation Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes containerFade {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          
          @keyframes staggeredFadeScale {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
              filter: blur(2px);
            }
            60% {
              opacity: 0.8;
              transform: translateY(5px) scale(0.98);
              filter: blur(1px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
          
          @keyframes premiumFadeIn {
            0% {
              opacity: 0;
              transform: translateY(15px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes newsSlideIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
          }
          
          .animate-containerFade {
            animation: containerFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          .animate-staggeredFadeScale {
            opacity: 0;
            animation: staggeredFadeScale 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          .animate-premiumFadeIn {
            animation: premiumFadeIn 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          /* Delay Classes for Staggered Effect */
          .delay-0 {
            animation-delay: 0ms;
          }
          
          .delay-200 {
            animation-delay: 200ms;
          }
          
          .delay-400 {
            animation-delay: 400ms;
          }
          
          .delay-600 {
            animation-delay: 600ms;
          }
          
          .delay-800 {
            animation-delay: 800ms;
          }
          
          /* Hover Enhancement */
          .hover-enhance {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .hover-enhance:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
        `
      }} />
    </div>
  );
}