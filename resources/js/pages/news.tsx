import { router } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, BarChart3, Calendar, ChevronLeft, ChevronRight, Clock, Eye, Search, Sparkles, TrendingUp, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

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

// Updated newsData with additional articles from newData
const newsData: NewsItem[] = [
    {
        id: 38,
        title: 'Program Pelatihan Komputer untuk Masyarakat Desa Nifasi',
        subtitle: 'PT Kristalin Ekalestari mengadakan pelatihan komputer gratis untuk meningkatkan keterampilan digital masyarakat',
        date: '20 Jul 2025',
        category: 'Community Development',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.39.03.jpeg',
        excerpt: 'Program pelatihan komputer yang bertujuan untuk meningkatkan literasi digital dan keterampilan teknologi masyarakat Desa Nifasi.',
        content: `PT Kristalin Ekalestari meluncurkan program pelatihan komputer gratis untuk masyarakat Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan literasi digital dan keterampilan teknologi masyarakat dalam menghadapi era digital.\n\n"Kami percaya bahwa penguasaan teknologi komputer adalah keterampilan penting yang harus dimiliki masyarakat di era digital ini," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup pengenalan komputer, penggunaan Microsoft Office, internet, dan aplikasi digital lainnya.\n\n"Kami menyediakan 20 unit komputer dan tenaga pengajar profesional untuk memastikan pelatihan berjalan efektif," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 50 peserta dari berbagai usia dan latar belakang pendidikan.\n\n"Kami berharap pelatihan ini dapat membuka peluang kerja baru dan meningkatkan produktivitas masyarakat," ujar Maria.\n\nSelain pelatihan, perusahaan juga memberikan sertifikat kompetensi kepada peserta yang berhasil menyelesaikan program.`,
        author: 'Tim Teknologi PT Kristalin Ekalestari',
        views: '1.4K',
        readTime: '3 min',
        trending: false,
        type: 'Pelatihan Digital',
        metrics: { peserta: '50 Orang', komputer: '20 Unit' },
    },
    {
        id: 37,
        title: 'Bantuan Alat Musik untuk Sanggar Seni Lokal',
        subtitle: 'PT Kristalin Ekalestari mendukung pengembangan seni budaya melalui bantuan alat musik',
        date: '20 Jul 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.39.02 (2).jpeg',
        excerpt: 'Program bantuan alat musik yang bertujuan untuk mendukung pengembangan seni budaya dan kreativitas masyarakat lokal.',
        content: `PT Kristalin Ekalestari memberikan bantuan alat musik kepada sanggar seni lokal di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk mendukung pengembangan seni budaya dan kreativitas masyarakat melalui peningkatan fasilitas kesenian.\n\n"Kami menghargai seni budaya sebagai bagian penting dari identitas masyarakat dan berkomitmen untuk mendukung pengembangannya," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nBantuan yang diberikan meliputi gitar, keyboard, drum set, dan alat musik tradisional Papua.\n\n"Kami bekerja sama dengan seniman lokal untuk memastikan alat musik yang diberikan sesuai dengan kebutuhan dan budaya setempat," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 5 sanggar seni yang tersebar di berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap bantuan ini dapat mendorong kreativitas anak-anak muda dan melestarikan seni budaya lokal," ujar Maria.\n\nSelain bantuan alat musik, perusahaan juga mendukung penyelenggaraan festival seni budaya tahunan.`,
        author: 'Tim Budaya PT Kristalin Ekalestari',
        views: '950',
        readTime: '2 min',
        trending: false,
        type: 'Pengembangan Seni',
        metrics: { sanggar: '5 Sanggar', alat: '20+ Alat Musik' },
    },
    {
        id: 36,
        title: 'Program Pelatihan Pertanian Organik',
        subtitle: 'PT Kristalin Ekalestari mengadakan pelatihan pertanian organik untuk petani lokal',
        date: '20 Jul 2025',
        category: 'Environmental',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.39.02 (1).jpeg',
        excerpt: 'Program pelatihan pertanian organik yang bertujuan untuk meningkatkan kualitas hasil pertanian dan kesehatan lingkungan.',
        content: `PT Kristalin Ekalestari mengadakan program pelatihan pertanian organik untuk petani lokal di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan kualitas hasil pertanian dan kesehatan lingkungan melalui praktik pertanian yang berkelanjutan.\n\n"Kami berkomitmen untuk mendukung pertanian yang ramah lingkungan dan berkelanjutan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup teknik pertanian organik, pembuatan pupuk alami, pengendalian hama secara alami, dan pemasaran produk organik.\n\n"Kami mengundang ahli pertanian organik untuk memberikan pelatihan yang berkualitas kepada petani," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 75 petani dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap pelatihan ini dapat meningkatkan pendapatan petani dan menjaga kelestarian lingkungan," ujar Maria.\n\nSelain pelatihan, perusahaan juga memberikan bantuan bibit tanaman organik dan peralatan pertanian.`,
        author: 'Tim Pertanian PT Kristalin Ekalestari',
        views: '1.1K',
        readTime: '3 min',
        trending: false,
        type: 'Pertanian Organik',
        metrics: { petani: '75 Orang', durasi: '1 Bulan' },
    },
    {
        id: 35,
        title: 'Pembangunan Taman Bermain untuk Anak-anak',
        subtitle: 'PT Kristalin Ekalestari membangun taman bermain modern untuk anak-anak Desa Nifasi',
        date: '20 Jul 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.39.02.jpeg',
        excerpt: 'Proyek pembangunan taman bermain yang akan memberikan ruang bermain yang aman dan edukatif bagi anak-anak.',
        content: `PT Kristalin Ekalestari memulai proyek pembangunan taman bermain modern untuk anak-anak di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.\n\nTaman bermain ini akan dilengkapi dengan berbagai permainan edukatif yang aman dan sesuai dengan standar keamanan anak.\n\n"Kami berkomitmen untuk memberikan ruang bermain yang aman dan edukatif bagi anak-anak di sekitar area operasional perusahaan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nFasilitas yang akan dibangun meliputi ayunan, perosotan, jungkat-jungkit, dan area bermain pasir yang dilengkapi dengan pagar pengaman.\n\n"Kami bekerja sama dengan ahli desain taman bermain untuk memastikan fasilitas yang dibangun aman dan menarik bagi anak-anak," tambah Andrian Lubis.\n\nTaman bermain ini akan menjadi pusat aktivitas anak-anak dan tempat berkumpul keluarga di akhir pekan.\n\n"Kami berharap taman bermain ini dapat mendorong aktivitas fisik anak-anak dan meningkatkan kualitas hidup keluarga," ujar Maria.\n\nProyek ini diperkirakan akan selesai dalam waktu 3 bulan dan akan langsung dapat digunakan oleh masyarakat.`,
        author: 'Tim Infrastruktur PT Kristalin Ekalestari',
        views: '1.3K',
        readTime: '3 min',
        trending: false,
        type: 'Infrastruktur Anak',
        metrics: { luas: '500 m²', durasi: '3 Bulan' },
    },
    {
        id: 34,
        title: 'Program Pelatihan Kerajinan Tangan',
        subtitle: 'PT Kristalin Ekalestari mengadakan pelatihan kerajinan tangan untuk pemberdayaan ekonomi perempuan',
        date: '20 Jul 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.39.01 (1).jpeg',
        excerpt: 'Program pelatihan kerajinan tangan yang bertujuan untuk memberdayakan ekonomi perempuan melalui pengembangan keterampilan kreatif.',
        content: `PT Kristalin Ekalestari mengadakan program pelatihan kerajinan tangan untuk perempuan di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk memberdayakan ekonomi perempuan melalui pengembangan keterampilan kreatif dan wirausaha.\n\n"Kami percaya bahwa pemberdayaan perempuan adalah kunci untuk pembangunan masyarakat yang berkelanjutan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup pembuatan kerajinan dari bahan lokal seperti rotan, bambu, dan kain tradisional Papua.\n\n"Kami mengundang pengrajin lokal dan ahli desain untuk memberikan pelatihan yang berkualitas kepada peserta," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 60 perempuan dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap pelatihan ini dapat membantu perempuan mengembangkan usaha kerajinan dan meningkatkan pendapatan keluarga," ujar Maria.\n\nSelain pelatihan, perusahaan juga membantu pemasaran produk kerajinan melalui berbagai saluran distribusi.`,
        author: 'Tim Pemberdayaan PT Kristalin Ekalestari',
        views: '1.0K',
        readTime: '3 min',
        trending: false,
        type: 'Kerajinan Tangan',
        metrics: { peserta: '60 Perempuan', produk: '10+ Jenis' },
    },
    {
        id: 33,
        title: 'Bantuan Peralatan Olahraga untuk Sekolah',
        subtitle: 'PT Kristalin Ekalestari memberikan bantuan peralatan olahraga untuk sekolah-sekolah di Desa Nifasi',
        date: '20 Jul 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.39.01.jpeg',
        excerpt: 'Program bantuan peralatan olahraga yang bertujuan untuk mendukung pengembangan olahraga di sekolah-sekolah.',
        content: `PT Kristalin Ekalestari memberikan bantuan peralatan olahraga kepada sekolah-sekolah di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk mendukung pengembangan olahraga dan kesehatan siswa melalui penyediaan peralatan olahraga yang memadai.\n\n"Kami berkomitmen untuk mendukung pengembangan olahraga di sekolah sebagai bagian dari pendidikan yang holistik," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nBantuan yang diberikan meliputi bola sepak, bola basket, bola voli, net, dan peralatan olahraga lainnya.\n\n"Kami bekerja sama dengan guru olahraga untuk memastikan peralatan yang diberikan sesuai dengan kebutuhan sekolah," tambah Andrian Lubis.\n\nProgram ini mencakup 3 sekolah dasar dan 1 sekolah menengah pertama di Desa Nifasi dan sekitarnya.\n\n"Kami berharap bantuan ini dapat mendorong siswa untuk lebih aktif berolahraga dan mengembangkan bakat olahraga mereka," ujar Maria.\n\nSelain bantuan peralatan, perusahaan juga mendukung penyelenggaraan turnamen olahraga antar sekolah.`,
        author: 'Tim Pendidikan PT Kristalin Ekalestari',
        views: '850',
        readTime: '2 min',
        trending: false,
        type: 'Peralatan Olahraga',
        metrics: { sekolah: '4 Sekolah', peralatan: '50+ Item' },
    },
    {
        id: 32,
        title: 'Program Pelatihan Bahasa Inggris',
        subtitle: 'PT Kristalin Ekalestari mengadakan pelatihan bahasa Inggris gratis untuk masyarakat',
        date: '20 Jul 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.39.00 (1).jpeg',
        excerpt: 'Program pelatihan bahasa Inggris yang bertujuan untuk meningkatkan keterampilan komunikasi dan peluang kerja masyarakat.',
        content: `PT Kristalin Ekalestari mengadakan program pelatihan bahasa Inggris gratis untuk masyarakat di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan keterampilan komunikasi dan membuka peluang kerja yang lebih luas bagi masyarakat.\n\n"Kami percaya bahwa penguasaan bahasa Inggris adalah keterampilan penting di era global ini," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup percakapan sehari-hari, tata bahasa dasar, dan persiapan untuk tes bahasa Inggris.\n\n"Kami mengundang pengajar bahasa Inggris profesional untuk memberikan pelatihan yang berkualitas kepada peserta," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 80 peserta dari berbagai usia dan latar belakang pendidikan.\n\n"Kami berharap pelatihan ini dapat meningkatkan kepercayaan diri peserta dalam berkomunikasi dalam bahasa Inggris," ujar Maria.\n\nSelain pelatihan, perusahaan juga menyediakan buku pelajaran dan materi pembelajaran digital.`,
        author: 'Tim Pendidikan PT Kristalin Ekalestari',
        views: '1.2K',
        readTime: '3 min',
        trending: false,
        type: 'Pelatihan Bahasa',
        metrics: { peserta: '80 Orang', durasi: '3 Bulan' },
    },
    {
        id: 31,
        title: 'Bantuan Alat Kebersihan untuk Masyarakat',
        subtitle: 'PT Kristalin Ekalestari memberikan bantuan alat kebersihan untuk menjaga kebersihan lingkungan',
        date: '20 Jul 2025',
        category: 'Environmental',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.39.00.jpeg',
        excerpt: 'Program bantuan alat kebersihan yang bertujuan untuk mendukung program kebersihan lingkungan masyarakat.',
        content: `PT Kristalin Ekalestari memberikan bantuan alat kebersihan kepada masyarakat di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk mendukung program kebersihan lingkungan dan meningkatkan kesadaran masyarakat akan pentingnya menjaga kebersihan.\n\n"Kami berkomitmen untuk mendukung program kebersihan lingkungan sebagai bagian dari tanggung jawab sosial perusahaan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nBantuan yang diberikan meliputi sapu, tempat sampah, alat pel, dan perlengkapan kebersihan lainnya.\n\n"Kami bekerja sama dengan pemerintah desa untuk memastikan bantuan didistribusikan secara merata kepada masyarakat," tambah Andrian Lubis.\n\nProgram ini mencakup 5 desa di sekitar area operasional perusahaan dengan total 200 kepala keluarga.\n\n"Kami berharap bantuan ini dapat mendorong masyarakat untuk lebih aktif dalam menjaga kebersihan lingkungan," ujar Maria.\n\nSelain bantuan alat, perusahaan juga mengadakan sosialisasi tentang pentingnya kebersihan lingkungan.`,
        author: 'Tim Lingkungan PT Kristalin Ekalestari',
        views: '750',
        readTime: '2 min',
        trending: false,
        type: 'Alat Kebersihan',
        metrics: { kk: '200 KK', desa: '5 Desa' },
    },
    {
        id: 30,
        title: 'Program Pelatihan Fotografi',
        subtitle: 'PT Kristalin Ekalestari mengadakan pelatihan fotografi untuk mengembangkan bakat kreatif masyarakat',
        date: '20 Jul 2025',
        category: 'Community Development',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.38.58 (1).jpeg',
        excerpt: 'Program pelatihan fotografi yang bertujuan untuk mengembangkan bakat kreatif dan potensi ekonomi masyarakat.',
        content: `PT Kristalin Ekalestari mengadakan program pelatihan fotografi untuk masyarakat di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk mengembangkan bakat kreatif masyarakat dan membuka peluang ekonomi baru di bidang fotografi.\n\n"Kami percaya bahwa fotografi adalah seni yang dapat mengembangkan kreativitas dan membuka peluang usaha baru," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup teknik fotografi dasar, pengeditan foto, dan pemasaran jasa fotografi.\n\n"Kami mengundang fotografer profesional untuk memberikan pelatihan yang berkualitas kepada peserta," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 40 peserta dari berbagai usia dan latar belakang.\n\n"Kami berharap pelatihan ini dapat membantu peserta mengembangkan bakat fotografi mereka dan membuka usaha fotografi," ujar Maria.\n\nSelain pelatihan, perusahaan juga menyediakan kamera dan peralatan fotografi untuk praktik.`,
        author: 'Tim Kreatif PT Kristalin Ekalestari',
        views: '1.1K',
        readTime: '3 min',
        trending: false,
        type: 'Pelatihan Fotografi',
        metrics: { peserta: '40 Orang', kamera: '10 Unit' },
    },
    {
        id: 29,
        title: 'Bantuan Alat Memasak untuk Dapur Umum',
        subtitle: 'PT Kristalin Ekalestari memberikan bantuan alat memasak untuk dapur umum masyarakat',
        date: '20 Jul 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.38.58.jpeg',
        excerpt: 'Program bantuan alat memasak yang bertujuan untuk mendukung kegiatan dapur umum dan pemberdayaan ekonomi masyarakat.',
        content: `PT Kristalin Ekalestari memberikan bantuan alat memasak kepada dapur umum masyarakat di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk mendukung kegiatan dapur umum dan pemberdayaan ekonomi masyarakat melalui pengembangan usaha kuliner.\n\n"Kami berkomitmen untuk mendukung pengembangan usaha kuliner masyarakat sebagai bagian dari pemberdayaan ekonomi," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nBantuan yang diberikan meliputi kompor gas, panci, wajan, dan peralatan memasak lainnya.\n\n"Kami bekerja sama dengan kelompok wanita tani untuk memastikan bantuan diberikan kepada yang benar-benar membutuhkan," tambah Andrian Lubis.\n\nProgram ini mencakup 3 dapur umum yang melayani 150 keluarga di berbagai desa.\n\n"Kami berharap bantuan ini dapat meningkatkan kualitas makanan dan mendorong pengembangan usaha kuliner masyarakat," ujar Maria.\n\nSelain bantuan alat, perusahaan juga memberikan pelatihan pengolahan makanan yang sehat dan bergizi.`,
        author: 'Tim Pemberdayaan PT Kristalin Ekalestari',
        views: '900',
        readTime: '2 min',
        trending: false,
        type: 'Alat Memasak',
        metrics: { dapur: '3 Dapur', keluarga: '150 KK' },
    },
    {
        id: 28,
        title: 'Program Pelatihan Menjahit',
        subtitle: 'PT Kristalin Ekalestari mengadakan pelatihan menjahit untuk pemberdayaan ekonomi perempuan',
        date: '20 Jul 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.38.57.jpeg',
        excerpt: 'Program pelatihan menjahit yang bertujuan untuk memberdayakan ekonomi perempuan melalui pengembangan keterampilan menjahit.',
        content: `PT Kristalin Ekalestari mengadakan program pelatihan menjahit untuk perempuan di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk memberdayakan ekonomi perempuan melalui pengembangan keterampilan menjahit dan wirausaha.\n\n"Kami percaya bahwa keterampilan menjahit dapat menjadi sumber penghasilan yang stabil bagi perempuan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup teknik menjahit dasar, pembuatan pakaian, dan manajemen usaha jahit.\n\n"Kami mengundang penjahit profesional untuk memberikan pelatihan yang berkualitas kepada peserta," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 45 perempuan dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap pelatihan ini dapat membantu perempuan mengembangkan usaha jahit dan meningkatkan pendapatan keluarga," ujar Maria.\n\nSelain pelatihan, perusahaan juga menyediakan mesin jahit dan peralatan menjahit untuk praktik.`,
        author: 'Tim Pemberdayaan PT Kristalin Ekalestari',
        views: '1.0K',
        readTime: '3 min',
        trending: false,
        type: 'Pelatihan Menjahit',
        metrics: { peserta: '45 Perempuan', mesin: '15 Unit' },
    },
    {
        id: 27,
        title: 'Bantuan Alat Pertukangan',
        subtitle: 'PT Kristalin Ekalestari memberikan bantuan alat pertukangan untuk tukang lokal',
        date: '20 Jul 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.38.56.jpeg',
        excerpt: 'Program bantuan alat pertukangan yang bertujuan untuk meningkatkan produktivitas dan kesejahteraan tukang lokal.',
        content: `PT Kristalin Ekalestari memberikan bantuan alat pertukangan kepada tukang lokal di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan produktivitas dan kesejahteraan tukang lokal melalui penyediaan alat pertukangan yang berkualitas.\n\n"Kami berkomitmen untuk mendukung pengembangan keterampilan pertukangan dan meningkatkan kesejahteraan tukang lokal," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nBantuan yang diberikan meliputi gergaji, palu, obeng, dan alat pertukangan lainnya yang dapat meningkatkan efisiensi kerja.\n\n"Kami bekerja sama dengan tukang senior untuk memastikan alat yang diberikan sesuai dengan kebutuhan dan standar keamanan," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 30 tukang dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap bantuan ini dapat meningkatkan kualitas hasil kerja dan pendapatan tukang lokal," ujar Maria.\n\nSelain bantuan alat, perusahaan juga memberikan pelatihan keselamatan kerja dan teknik pertukangan modern.`,
        author: 'Tim Infrastruktur PT Kristalin Ekalestari',
        views: '800',
        readTime: '2 min',
        trending: false,
        type: 'Alat Pertukangan',
        metrics: { tukang: '30 Orang', alat: '50+ Item' },
    },
    {
        id: 26,
        title: 'Program Pelatihan Perikanan',
        subtitle: 'PT Kristalin Ekalestari mengadakan pelatihan perikanan untuk nelayan lokal',
        date: '20 Jul 2025',
        category: 'Environmental',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.38.55 (1).jpeg',
        excerpt: 'Program pelatihan perikanan yang bertujuan untuk meningkatkan produktivitas dan kesejahteraan nelayan lokal.',
        content: `PT Kristalin Ekalestari mengadakan program pelatihan perikanan untuk nelayan lokal di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan produktivitas dan kesejahteraan nelayan melalui pengembangan teknik perikanan yang modern dan berkelanjutan.\n\n"Kami berkomitmen untuk mendukung pengembangan sektor perikanan lokal yang merupakan sumber penghidupan penting masyarakat," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup teknik penangkapan ikan yang ramah lingkungan, pengolahan hasil tangkapan, dan pemasaran produk perikanan.\n\n"Kami mengundang ahli perikanan untuk memberikan pelatihan yang berkualitas kepada nelayan," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 40 nelayan dari berbagai desa pesisir di sekitar area operasional perusahaan.\n\n"Kami berharap pelatihan ini dapat meningkatkan hasil tangkapan dan pendapatan nelayan lokal," ujar Maria.\n\nSelain pelatihan, perusahaan juga memberikan bantuan alat tangkap dan peralatan pengolahan ikan.`,
        author: 'Tim Perikanan PT Kristalin Ekalestari',
        views: '950',
        readTime: '3 min',
        trending: false,
        type: 'Pelatihan Perikanan',
        metrics: { nelayan: '40 Orang', durasi: '2 Minggu' },
    },
    {
        id: 25,
        title: 'Bantuan Alat Elektronik untuk Sekolah',
        subtitle: 'PT Kristalin Ekalestari memberikan bantuan alat elektronik untuk mendukung pembelajaran digital',
        date: '20 Jul 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.38.55.jpeg',
        excerpt: 'Program bantuan alat elektronik yang bertujuan untuk mendukung pembelajaran digital di sekolah-sekolah.',
        content: `PT Kristalin Ekalestari memberikan bantuan alat elektronik kepada sekolah-sekolah di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk mendukung pembelajaran digital dan meningkatkan kualitas pendidikan melalui penggunaan teknologi.\n\n"Kami berkomitmen untuk mendukung pengembangan pendidikan digital sebagai bagian dari peningkatan kualitas pendidikan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nBantuan yang diberikan meliputi laptop, proyektor, speaker, dan peralatan elektronik pendukung pembelajaran lainnya.\n\n"Kami bekerja sama dengan guru dan kepala sekolah untuk memastikan peralatan yang diberikan sesuai dengan kebutuhan pembelajaran," tambah Andrian Lubis.\n\nProgram ini mencakup 2 sekolah dasar dan 1 sekolah menengah pertama di Desa Nifasi dan sekitarnya.\n\n"Kami berharap bantuan ini dapat meningkatkan kualitas pembelajaran dan mempersiapkan siswa menghadapi era digital," ujar Maria.\n\nSelain bantuan alat, perusahaan juga memberikan pelatihan penggunaan teknologi dalam pembelajaran kepada guru.`,
        author: 'Tim Pendidikan PT Kristalin Ekalestari',
        views: '1.1K',
        readTime: '3 min',
        trending: false,
        type: 'Alat Elektronik',
        metrics: { sekolah: '3 Sekolah', laptop: '15 Unit' },
    },
    {
        id: 24,
        title: 'Program Pelatihan Peternakan',
        subtitle: 'PT Kristalin Ekalestari mengadakan pelatihan peternakan untuk peternak lokal',
        date: '20 Jul 2025',
        category: 'Environmental',
        imageUrl: '/WhatsApp Image 2025-07-20 at 10.38.54.jpeg',
        excerpt: 'Program pelatihan peternakan yang bertujuan untuk meningkatkan produktivitas dan kesejahteraan peternak lokal.',
        content: `PT Kristalin Ekalestari mengadakan program pelatihan peternakan untuk peternak lokal di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan produktivitas dan kesejahteraan peternak melalui pengembangan teknik peternakan yang modern dan berkelanjutan.\n\n"Kami berkomitmen untuk mendukung pengembangan sektor peternakan lokal yang merupakan sumber penghidupan penting masyarakat," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup teknik pemeliharaan ternak, pencegahan penyakit, dan pengolahan hasil ternak.\n\n"Kami mengundang ahli peternakan untuk memberikan pelatihan yang berkualitas kepada peternak," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 35 peternak dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap pelatihan ini dapat meningkatkan hasil ternak dan pendapatan peternak lokal," ujar Maria.\n\nSelain pelatihan, perusahaan juga memberikan bantuan bibit ternak dan peralatan peternakan.`,
        author: 'Tim Peternakan PT Kristalin Ekalestari',
        views: '900',
        readTime: '3 min',
        trending: false,
        type: 'Pelatihan Peternakan',
        metrics: { peternak: '35 Orang', ternak: '100+ Ekor' },
    },
    {
        id: 23,
        title: 'Distribusi Sembako 500 Paket untuk Warga Desa Nifasi',
        subtitle: 'Program CSR bulanan PT Kristalin Ekalestari berhasil menyalurkan 500 paket sembako kepada warga Desa Nifasi dan sekitarnya',
        date: '20 Jul 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.47 (2).jpeg',
        excerpt:
            'PT Kristalin Ekalestari kembali menunjukkan komitmennya dalam membantu masyarakat sekitar dengan menyalurkan 500 paket sembako melalui program CSR bulanan.',
        content: `PT Kristalin Ekalestari kembali menunjukkan komitmennya dalam membantu masyarakat sekitar dengan menyalurkan 500 paket sembako melalui program Corporate Social Responsibility (CSR) bulanan.\n\nProgram ini merupakan bagian dari komitmen perusahaan untuk memberikan dampak positif bagi masyarakat Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.\n\n"Kami konsisten dalam menjalankan program CSR ini setiap bulannya. Kali ini kami menyalurkan 500 paket sembako yang berisi beras, telur, mie instan, minyak goreng, dan kebutuhan pokok lainnya," ujar Andrian Lubis, Senior Manager & Finance Division PT Kristalin Ekalestari.\n\nDistribusi dilakukan secara merata kepada 500 Kepala Keluarga (KK) yang tersebar di berbagai kampung termasuk Nifasi, Biha, Samabusa, Wahario, Polsek, dan Koramil.\n\nProgram ini tidak hanya memberikan bantuan material, tetapi juga menunjukkan kepedulian perusahaan terhadap kesejahteraan masyarakat sekitar area operasional.\n\n"Kami berharap bantuan ini dapat meringankan beban ekonomi keluarga dan memberikan manfaat nyata bagi masyarakat," tambah Maria Erari, Humas PT Kristalin Ekalestari.\n\nSelain program sembako, PT Kristalin Ekalestari juga telah melaksanakan berbagai program CSR lainnya seperti pembangunan infrastruktur, bantuan pendidikan, dan pengembangan ekonomi masyarakat.`,
        author: 'Humas PT Kristalin Ekalestari',
        views: '2.1K',
        readTime: '4 min',
        trending: true,
        type: 'CSR Sembako',
        metrics: { paket: '500 Paket', lokasi: 'Desa Nifasi & Sekitarnya' },
    },
    {
        id: 22,
        title: 'Peningkatan Produksi Emas dengan Teknologi Modern',
        subtitle: 'PT Kristalin Ekalestari berhasil meningkatkan produksi emas sebesar 35% dengan implementasi teknologi mining terbaru',
        date: '19 Jul 2025',
        category: 'Mining Operations',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.47 (1).jpeg',
        excerpt: 'Implementasi teknologi mining modern berhasil meningkatkan efisiensi produksi emas dan mengurangi dampak lingkungan.',
        content: `PT Kristalin Ekalestari berhasil meningkatkan produksi emas sebesar 35% melalui implementasi teknologi mining modern di area operasional Nabire, Papua Tengah.\n\nPeningkatan ini dicapai melalui penggunaan heavy equipment terbaru dan sistem monitoring digital yang memungkinkan optimasi proses ekstraksi emas.\n\n"Kami terus berinvestasi dalam teknologi mining modern untuk meningkatkan efisiensi produksi sambil mempertahankan standar keselamatan dan lingkungan yang tinggi," ujar Andrian Lubis, Senior Manager & Finance Division PT Kristalin Ekalestari.\n\nTeknologi yang diimplementasikan meliputi sistem GPS untuk monitoring lokasi penambangan, sensor digital untuk mengukur kadar emas, dan software analisis data real-time.\n\n"Peningkatan produksi ini tidak hanya menguntungkan perusahaan, tetapi juga memberikan dampak positif bagi perekonomian lokal," tambah Maria Erari, Humas PT Kristalin Ekalestari.\n\nSelain peningkatan produksi, teknologi baru ini juga berhasil mengurangi konsumsi energi sebesar 20% dan meminimalkan dampak lingkungan.\n\n"Kami berkomitmen untuk terus mengembangkan operasi mining yang berkelanjutan dan ramah lingkungan," ujar Andrian.\n\nKeberhasilan ini menegaskan posisi PT Kristalin Ekalestari sebagai perusahaan mining yang inovatif dan bertanggung jawab.`,
        author: 'Tim Mining Operations PT Kristalin Ekalestari',
        views: '1.8K',
        readTime: '4 min',
        trending: true,
        type: 'Mining Technology',
        metrics: { peningkatan: '35%', efisiensi: '20%' },
    },
    {
        id: 21,
        title: 'Penghargaan Best Mining Company 2025',
        subtitle: 'PT Kristalin Ekalestari meraih penghargaan Best Mining Company 2025 untuk kategori Sustainable Gold Mining',
        date: '18 Jul 2025',
        category: 'Achievement',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.47.jpeg',
        excerpt: 'Penghargaan prestisius yang mengakui komitmen perusahaan dalam sustainable mining dan pengembangan masyarakat.',
        content: `PT Kristalin Ekalestari berhasil meraih penghargaan Best Mining Company 2025 untuk kategori Sustainable Gold Mining dalam ajang Indonesia Mining Awards 2025.\n\nPenghargaan ini diberikan atas komitmen perusahaan dalam menerapkan praktik mining yang berkelanjutan dan pengembangan masyarakat yang komprehensif.\n\n"Penghargaan ini adalah pengakuan atas dedikasi kami dalam menjalankan operasi mining yang bertanggung jawab dan berkontribusi positif bagi masyarakat," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nJuri menilai berbagai aspek termasuk implementasi teknologi ramah lingkungan, program CSR yang berkelanjutan, dan kontribusi terhadap perekonomian lokal.\n\n"Kami bangga dengan pencapaian ini dan akan terus mempertahankan standar tinggi dalam operasi mining kami," tambah Andrian Lubis.\n\nPenghargaan ini juga mengakui program pengembangan masyarakat yang telah dilaksanakan perusahaan selama bertahun-tahun.\n\n"Keberhasilan ini tidak lepas dari dukungan masyarakat lokal dan komitmen tim kami dalam menjalankan visi perusahaan," ujar Maria.\n\nPenghargaan ini menegaskan posisi PT Kristalin Ekalestari sebagai perusahaan mining terdepan di Indonesia.`,
        author: 'Tim Corporate Affairs PT Kristalin Ekalestari',
        views: '2.3K',
        readTime: '3 min',
        trending: true,
        type: 'Industry Award',
        metrics: { kategori: 'Sustainable Mining', tahun: '2025' },
    },
    {
        id: 20,
        title: 'Kerjasama Strategis dengan Universitas Papua',
        subtitle: 'PT Kristalin Ekalestari menandatangani MoU dengan Universitas Papua untuk pengembangan SDM lokal',
        date: '17 Jul 2025',
        category: 'Partnership',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.46 (1).jpeg',
        excerpt: 'Kerjasama strategis yang bertujuan untuk mengembangkan sumber daya manusia lokal dan transfer teknologi.',
        content: `PT Kristalin Ekalestari menandatangani Memorandum of Understanding (MoU) dengan Universitas Papua untuk kerjasama pengembangan sumber daya manusia lokal dan transfer teknologi.\n\nKerjasama ini mencakup program magang untuk mahasiswa, pelatihan teknologi mining, dan penelitian bersama di bidang sustainable mining.\n\n"Kerjasama ini merupakan komitmen kami untuk mengembangkan SDM lokal dan memberikan kesempatan belajar teknologi mining modern," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nProgram yang akan dilaksanakan meliputi magang mahasiswa di area operasional, pelatihan teknologi mining, dan penelitian bersama tentang sustainable mining practices.\n\n"Kami berharap kerjasama ini dapat menghasilkan SDM lokal yang berkualitas dan siap berkontribusi dalam industri mining," tambah Andrian Lubis.\n\nUniversitas Papua akan menyediakan fasilitas penelitian dan tenaga pengajar untuk mendukung program kerjasama ini.\n\n"Kerjasama ini akan memberikan manfaat besar bagi mahasiswa dan masyarakat Papua," ujar Maria.\n\nMoU ini menandai dimulainya kerjasama jangka panjang antara PT Kristalin Ekalestari dan Universitas Papua.`,
        author: 'Tim Partnership PT Kristalin Ekalestari',
        views: '1.5K',
        readTime: '3 min',
        trending: false,
        type: 'Academic Partnership',
        metrics: { durasi: '5 Tahun', mahasiswa: '100+ Orang' },
    },
    {
        id: 19,
        title: 'Ekspansi Area Mining di Nabire',
        subtitle: 'PT Kristalin Ekalestari memulai ekspansi area mining untuk meningkatkan kapasitas produksi',
        date: '16 Jul 2025',
        category: 'Mining Operations',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.46.jpeg',
        excerpt: 'Ekspansi area mining yang akan meningkatkan kapasitas produksi dan memberikan lapangan kerja baru.',
        content: `PT Kristalin Ekalestari memulai ekspansi area mining di Kabupaten Nabire, Papua Tengah untuk meningkatkan kapasitas produksi dan memberikan lapangan kerja baru bagi masyarakat lokal.\n\nEkspansi ini mencakup area seluas 500 hektar dengan implementasi teknologi mining modern dan standar keselamatan yang tinggi.\n\n"Ekspansi ini merupakan bagian dari rencana jangka panjang kami untuk meningkatkan kapasitas produksi sambil tetap mempertahankan komitmen terhadap lingkungan," ujar Andrian Lubis, Senior Manager & Finance Division PT Kristalin Ekalestari.\n\nProyek ekspansi akan menciptakan 200 lapangan kerja baru bagi masyarakat lokal dengan fokus pada pemberdayaan SDM setempat.\n\n"Kami berkomitmen untuk memberikan prioritas kepada masyarakat lokal dalam rekrutmen tenaga kerja," tambah Maria Erari, Humas PT Kristalin Ekalestari.\n\nEkspansi ini juga akan dilengkapi dengan infrastruktur pendukung seperti jalan akses, fasilitas kesehatan, dan program pengembangan masyarakat.\n\n"Kami berharap ekspansi ini dapat memberikan manfaat ekonomi yang signifikan bagi masyarakat Nabire," ujar Andrian.\n\nProyek ini diperkirakan akan selesai dalam waktu 18 bulan dan akan langsung memberikan kontribusi positif bagi perekonomian lokal.`,
        author: 'Tim Mining Operations PT Kristalin Ekalestari',
        views: '1.6K',
        readTime: '4 min',
        trending: false,
        type: 'Mining Expansion',
        metrics: { area: '500 Ha', lapangan_kerja: '200 Orang' },
    },
    {
        id: 18,
        title: 'Sertifikasi ISO 14001 untuk Environmental Management',
        subtitle: 'PT Kristalin Ekalestari berhasil memperoleh sertifikasi ISO 14001 untuk sistem manajemen lingkungan',
        date: '15 Jul 2025',
        category: 'Achievement',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.45 (2).jpeg',
        excerpt: 'Sertifikasi internasional yang mengakui komitmen perusahaan dalam pengelolaan lingkungan yang berkelanjutan.',
        content: `PT Kristalin Ekalestari berhasil memperoleh sertifikasi ISO 14001 untuk sistem manajemen lingkungan, mengakui komitmen perusahaan dalam pengelolaan lingkungan yang berkelanjutan.\n\nSertifikasi ini diberikan setelah melalui proses audit yang ketat oleh badan sertifikasi internasional yang mengakui implementasi sistem manajemen lingkungan yang efektif.\n\n"Sertifikasi ISO 14001 adalah pengakuan atas komitmen kami dalam menerapkan praktik mining yang ramah lingkungan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nSistem manajemen lingkungan yang diimplementasikan mencakup monitoring dampak lingkungan, pengelolaan limbah, dan program konservasi lingkungan.\n\n"Kami terus berkomitmen untuk mempertahankan standar lingkungan yang tinggi dalam semua operasi kami," tambah Andrian Lubis.\n\nSertifikasi ini juga mengakui program reklamasi lahan dan konservasi keanekaragaman hayati yang telah dilaksanakan perusahaan.\n\n"Keberhasilan ini menegaskan posisi kami sebagai perusahaan mining yang bertanggung jawab terhadap lingkungan," ujar Maria.\n\nSertifikasi ISO 14001 akan membantu perusahaan dalam mempertahankan standar lingkungan yang tinggi dan meningkatkan kepercayaan stakeholder.`,
        author: 'Tim Environmental PT Kristalin Ekalestari',
        views: '1.4K',
        readTime: '3 min',
        trending: false,
        type: 'Environmental Certification',
        metrics: { standar: 'ISO 14001', tahun: '2025' },
    },
    {
        id: 17,
        title: 'Kerjasama dengan Pemerintah Daerah Nabire',
        subtitle: 'PT Kristalin Ekalestari menandatangani kerjasama dengan Pemerintah Daerah Nabire untuk pengembangan infrastruktur',
        date: '14 Jul 2025',
        category: 'Partnership',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.45 (1).jpeg',
        excerpt: 'Kerjasama strategis untuk pengembangan infrastruktur dan peningkatan kesejahteraan masyarakat Nabire.',
        content: `PT Kristalin Ekalestari menandatangani kerjasama strategis dengan Pemerintah Daerah Nabire untuk pengembangan infrastruktur dan peningkatan kesejahteraan masyarakat.\n\nKerjasama ini mencakup pembangunan jalan akses, fasilitas kesehatan, dan program pengembangan ekonomi masyarakat.\n\n"Kerjasama ini merupakan wujud komitmen kami untuk berkontribusi dalam pembangunan daerah dan peningkatan kesejahteraan masyarakat," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nProgram yang akan dilaksanakan meliputi pembangunan 10 km jalan akses, renovasi 3 puskesmas, dan program pelatihan wirausaha untuk 500 masyarakat lokal.\n\n"Kami berharap kerjasama ini dapat memberikan manfaat nyata bagi masyarakat Nabire," tambah Andrian Lubis.\n\nPemerintah Daerah Nabire akan menyediakan dukungan administratif dan koordinasi untuk memastikan program berjalan efektif.\n\n"Kerjasama ini akan memperkuat hubungan antara sektor swasta dan pemerintah dalam pembangunan daerah," ujar Maria.\n\nKerjasama ini menandai dimulainya kolaborasi jangka panjang untuk pembangunan Nabire yang berkelanjutan.`,
        author: 'Tim Partnership PT Kristalin Ekalestari',
        views: '1.3K',
        readTime: '3 min',
        trending: false,
        type: 'Government Partnership',
        metrics: { durasi: '3 Tahun', investasi: 'Rp 5 Miliar' },
    },
    {
        id: 16,
        title: 'Peningkatan Sistem Monitoring Mining dengan Teknologi Modern',
        subtitle: 'PT Kristalin Ekalestari mengimplementasikan sistem monitoring digital untuk operasi mining yang lebih efisien',
        date: '13 Jul 2025',
        category: 'Mining Operations',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.45.jpeg',
        excerpt: 'Implementasi sistem monitoring digital yang berhasil meningkatkan efisiensi operasi mining dan akurasi pengukuran kadar emas.',
        content: `PT Kristalin Ekalestari berhasil mengimplementasikan sistem monitoring digital untuk optimasi operasi mining di area Nabire, Papua Tengah.\n\nSistem monitoring yang diimplementasikan mencakup sensor digital untuk pengukuran kadar emas, GPS tracking untuk monitoring lokasi penambangan, dan software analisis data real-time.\n\n"Implementasi sistem monitoring digital telah berhasil meningkatkan efisiensi operasi mining sebesar 25% dan akurasi pengukuran kadar emas sebesar 90%," ujar Andrian Lubis, Senior Manager & Finance Division PT Kristalin Ekalestari.\n\nSistem yang dikembangkan bekerja sama dengan tim engineering lokal mencakup monitoring suhu, tekanan, dan kondisi peralatan mining secara real-time.\n\n"Kami terus berinvestasi dalam teknologi monitoring modern untuk memastikan operasi mining yang efisien dan aman," tambah Maria Erari, Humas PT Kristalin Ekalestari.\n\nSistem ini juga membantu dalam pengurangan konsumsi energi dan meminimalkan dampak lingkungan dari operasi mining.\n\n"Implementasi sistem monitoring digital adalah langkah maju dalam modernisasi operasi mining kami," ujar Andrian.\n\nKeberhasilan implementasi sistem ini menegaskan posisi PT Kristalin Ekalestari sebagai perusahaan mining yang mengutamakan efisiensi dan keselamatan.`,
        author: 'Tim Mining Operations PT Kristalin Ekalestari',
        views: '1.7K',
        readTime: '4 min',
        trending: true,
        type: 'Digital Monitoring',
        metrics: { efisiensi: '25%', akurasi: '90%' },
    },
    {
        id: 15,
        title: 'Program Pelatihan Kewirausahaan untuk Masyarakat Lokal',
        subtitle: 'PT Kristalin Ekalestari mengadakan pelatihan kewirausahaan untuk memberdayakan ekonomi masyarakat',
        date: '12 Jul 2025',
        category: 'Community Development',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.44.jpeg',
        excerpt: 'Program pelatihan kewirausahaan yang bertujuan untuk memberdayakan ekonomi masyarakat melalui pengembangan keterampilan bisnis.',
        content: `PT Kristalin Ekalestari mengadakan program pelatihan kewirausahaan untuk masyarakat lokal di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk memberdayakan ekonomi masyarakat melalui pengembangan keterampilan bisnis dan manajemen usaha.\n\n"Kami percaya bahwa pemberdayaan ekonomi masyarakat adalah kunci untuk pembangunan yang berkelanjutan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nPelatihan mencakup berbagai aspek kewirausahaan termasuk perencanaan bisnis, manajemen keuangan, pemasaran, dan pengembangan produk.\n\n"Kami mengundang para ahli bisnis dan konsultan untuk memberikan pelatihan yang berkualitas kepada peserta," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 100 peserta dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap pelatihan ini dapat membantu masyarakat mengembangkan usaha mereka dan meningkatkan pendapatan keluarga," ujar Maria.\n\nSelain pelatihan, perusahaan juga akan memberikan bantuan modal usaha kepada peserta yang memiliki rencana bisnis yang feasible.\n\nProgram ini merupakan bagian dari komitmen perusahaan dalam pengembangan ekonomi masyarakat lokal.`,
        author: 'Tim Pengembangan Ekonomi PT Kristalin Ekalestari',
        views: '1.0K',
        readTime: '3 min',
        trending: false,
        type: 'Pengembangan Ekonomi',
        metrics: { peserta: '100 Orang', durasi: '2 Minggu' },
    },
    {
        id: 14,
        title: 'Pembangunan Jembatan Penghubung Antar Desa',
        subtitle: 'PT Kristalin Ekalestari membangun jembatan untuk meningkatkan aksesibilitas antar desa',
        date: '01 Jul 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.44 (3).jpeg',
        excerpt: 'Proyek pembangunan jembatan yang akan meningkatkan aksesibilitas dan mobilitas masyarakat antar desa.',
        content: `PT Kristalin Ekalestari memulai proyek pembangunan jembatan penghubung antar desa di Kabupaten Nabire, Papua Tengah.\n\nJembatan ini akan menghubungkan beberapa desa yang selama ini terpisah oleh sungai dan sulit diakses terutama pada musim hujan.\n\n"Kami berkomitmen untuk meningkatkan aksesibilitas dan mobilitas masyarakat melalui pembangunan infrastruktur yang berkualitas," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nJembatan yang dibangun menggunakan teknologi modern dan material berkualitas tinggi untuk memastikan keamanan dan ketahanan.\n\n"Kami bekerja sama dengan ahli konstruksi dan insinyur lokal untuk memastikan jembatan dibangun sesuai standar keamanan," tambah Andrian Lubis.\n\nPembangunan jembatan ini akan memberikan manfaat besar bagi masyarakat dalam hal akses ke fasilitas kesehatan, pendidikan, dan ekonomi.\n\n"Kami berharap jembatan ini dapat meningkatkan kualitas hidup masyarakat dan mendorong pertumbuhan ekonomi lokal," ujar Maria.\n\nProyek ini diperkirakan akan selesai dalam waktu 8 bulan dan akan langsung memberikan manfaat bagi ribuan masyarakat.\n\nProgram ini merupakan bagian dari komitmen perusahaan dalam pengembangan infrastruktur masyarakat.`,
        author: 'Tim Infrastruktur PT Kristalin Ekalestari',
        views: '1.1K',
        readTime: '3 min',
        trending: false,
        type: 'Infrastruktur Jembatan',
        metrics: { panjang: '50 Meter', durasi: '8 Bulan' },
    },
    {
        id: 13,
        title: 'Program Pemberdayaan Perempuan dan Anak',
        subtitle: 'PT Kristalin Ekalestari meluncurkan program khusus untuk pemberdayaan perempuan dan anak',
        date: '28 Jun 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.44 (2).jpeg',
        excerpt: 'Program pemberdayaan yang fokus pada pengembangan keterampilan dan peningkatan kualitas hidup perempuan dan anak.',
        content: `PT Kristalin Ekalestari meluncurkan program pemberdayaan perempuan dan anak di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan kualitas hidup perempuan dan anak melalui pengembangan keterampilan, pendidikan, dan kesehatan.\n\n"Kami percaya bahwa pemberdayaan perempuan dan anak adalah investasi penting untuk masa depan masyarakat," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nProgram ini mencakup pelatihan keterampilan, pendidikan kesehatan, dan pengembangan bakat anak-anak.\n\n"Kami bekerja sama dengan organisasi perempuan dan lembaga pendidikan untuk memastikan program ini memberikan manfaat maksimal," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 200 perempuan dan 150 anak dari berbagai desa di sekitar area operasional perusahaan.\n\n"Kami berharap program ini dapat membantu perempuan dan anak-anak mencapai potensi terbaik mereka," ujar Maria.\n\nSelain pelatihan, perusahaan juga memberikan bantuan modal usaha kepada perempuan yang ingin mengembangkan usaha.\n\nProgram ini merupakan bagian dari komitmen perusahaan dalam pengembangan masyarakat yang inklusif.`,
        author: 'Tim Pemberdayaan PT Kristalin Ekalestari',
        views: '950',
        readTime: '3 min',
        trending: false,
        type: 'Pemberdayaan Perempuan',
        metrics: { peserta: '350 Orang', fokus: 'Perempuan & Anak' },
    },
    {
        id: 12,
        title: 'Program Konservasi Air dan Sungai',
        subtitle: 'PT Kristalin Ekalestari melakukan program konservasi air untuk menjaga kelestarian sungai',
        date: '25 Jun 2025',
        category: 'Environmental',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.44 (1).jpeg',
        excerpt: 'Program konservasi air yang bertujuan untuk menjaga kelestarian sungai dan sumber air bagi masyarakat.',
        content: `PT Kristalin Ekalestari melaksanakan program konservasi air dan sungai di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk menjaga kelestarian sungai dan sumber air yang merupakan kebutuhan vital bagi masyarakat dan ekosistem.\n\n"Kami berkomitmen untuk menjaga kelestarian lingkungan dan sumber daya air yang merupakan hak semua makhluk hidup," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nProgram ini mencakup pembersihan sungai, penanaman pohon di bantaran sungai, dan edukasi masyarakat tentang pentingnya konservasi air.\n\n"Kami bekerja sama dengan masyarakat lokal dan organisasi lingkungan untuk memastikan program ini berjalan efektif," tambah Andrian Lubis.\n\nProgram ini melibatkan partisipasi aktif masyarakat dalam berbagai kegiatan konservasi air.\n\n"Kami berharap program ini dapat membantu menjaga kualitas air dan kelestarian sungai untuk generasi mendatang," ujar Maria.\n\nSelain konservasi, perusahaan juga melakukan monitoring kualitas air secara berkala.\n\nProgram ini merupakan bagian dari komitmen perusahaan dalam pengelolaan lingkungan yang berkelanjutan.`,
        author: 'Tim Lingkungan PT Kristalin Ekalestari',
        views: '1.2K',
        readTime: '3 min',
        trending: false,
        type: 'Konservasi Air',
        metrics: { sungai: '5 Sungai', durasi: '6 Bulan' },
    },
    {
        id: 11,
        title: 'Program Pengembangan Olahraga dan Kesehatan',
        subtitle: 'PT Kristalin Ekalestari mendukung pengembangan olahraga dan kesehatan masyarakat',
        date: '22 Jun 2025',
        category: 'CSR Initiative',
        imageUrl: '/WhatsApp Image 2025-07-20 at 09.57.44.jpeg',
        excerpt: 'Program pengembangan olahraga yang bertujuan untuk meningkatkan kesehatan dan kebugaran masyarakat.',
        content: `PT Kristalin Ekalestari meluncurkan program pengembangan olahraga dan kesehatan masyarakat di Kabupaten Nabire, Papua Tengah.\n\nProgram ini bertujuan untuk meningkatkan kesehatan dan kebugaran masyarakat melalui kegiatan olahraga yang terorganisir.\n\n"Kami percaya bahwa kesehatan adalah aset berharga yang harus dijaga dan dikembangkan," ujar Maria Erari, Humas PT Kristalin Ekalestari.\n\nProgram ini mencakup pembangunan fasilitas olahraga, pelatihan olahraga, dan penyelenggaraan turnamen olahraga.\n\n"Kami bekerja sama dengan pelatih olahraga dan organisasi olahraga lokal untuk memastikan program ini berkualitas," tambah Andrian Lubis.\n\nProgram ini diikuti oleh 300 peserta dari berbagai usia dan latar belakang.\n\n"Kami berharap program ini dapat mendorong masyarakat untuk hidup lebih sehat dan aktif," ujar Maria.\n\nSelain olahraga, perusahaan juga memberikan edukasi tentang pentingnya pola hidup sehat.\n\nProgram ini merupakan bagian dari komitmen perusahaan dalam pengembangan masyarakat yang sehat dan produktif.`,
        author: 'Tim Olahraga PT Kristalin Ekalestari',
        views: '850',
        readTime: '2 min',
        trending: false,
        type: 'Pengembangan Olahraga',
        metrics: { peserta: '300 Orang', fasilitas: 'Lapangan & Peralatan' },
    },
    {
        id: 10,
        title: '406 Paket Sembako CSR PT Kristalin Ekalestari Disalurkan Warga Nifasi',
        subtitle: '406 Paket sembako untuk warga Desa Nifasi, Biha, Samabusa, Wahario, Polsek, dan Koramil',
        date: '31 Aug 2024',
        category: 'CSR Initiative',
        imageUrl: '/kristalinberita4.jpg',
        excerpt:
            'PT Kristalin Ekalestari konsisten membantu masyarakat Desa Nifasi dan sekitarnya dengan menyalurkan 406 paket sembako melalui program CSR di bulan Juli 2024.',
        content: `PT Kristalin Ekalestari konsisten membantu masyarakat Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, dengan menyalurkan sembako melalui Corporate Social Responsibility (CSR).\n\nSenior Manager & Finance Division PT Kristalin Ekalestari Andrian Lubis menuturkan, pihaknya menyalurkan sembako di bulan Juli 2024 kemarin.\n\n"Setiap bulan program CSR dari kami untuk masyarakat pembagian sembako di Bulan Juli 2024, yakni menyebar di Kampung Nifasi, Kampung Biha, Samabusa dan Wahario, Polsek dan Koramil," terang Andrian Lubis dalam keterangannya diterima Sabtu, 31 Agustus 2024.\n\nKehadiran PT Kristalin Ekalestari hadir memenuhi kebutuhan Masyarakat Nifasi terbukti melalui program-program CSR demi mensejahterakan warga dekat area lokasi pekerjaan perusahaan.\n\nMenurut Andrian, sebanyak 406 paket sembako untuk 406 Kartu Keluarga yang ada di Desa Nifasi ditebar oleh warga. Untuk jenis sembako paket tersebut yakni beras, telur, mie instan, minyak goreng, kopi dan teh.\n\n"Tentu setiap bulan kami distribusikan paket sembako kepada warga dalam program CSR kami," imbuhnya.\n\nSementara itu Humas PT Kristalin Ekalestari Maria Erari menambahkan, pihaknya senantiasa berkontribusi untuk masyarakat di Desa Nabire.\n\nSelain CSR sembako, banyak program-program lain yang sudah direalisasikan antara lain, renovasi sekolahan, gereja, bedah rumah warga dan kegiatan masyarakat.\n\n"Untuk dalam waktu dekat CSR tahun ini program selain sembako untuk warga, pembangunan rumah untuk warga Hak Adat dan juga rencana pembangunan Pustu seperti Klinik 24 jam pelayanan kesehatan untuk masyarakat masih dalam RAB," pungkas Maria.`,
        author: 'Andrian Lubis & Humas PT Kristalin Ekalestari',
        views: '1.0K',
        readTime: '5 min',
        trending: false,
        type: 'CSR Sembako',
        metrics: { paket: '406 Paket', lokasi: 'Nifasi, Biha, Samabusa, Wahario, Polsek, Koramil' },
    },
    {
        id: 9,
        title: 'Kehadiran PT Kristalin Ekalestari Bukti Kontribusi Warga Desa Nifasi',
        subtitle: '506 Paket sembako untuk warga Desa Nifasi dan sekitarnya, 50% diantaranya untuk Janda Lansia',
        date: '08 Jul 2025',
        category: 'CSR Initiative',
        imageUrl: '/kristalinberita2.jpg',
        excerpt:
            'Sebanyak 506 paket sembako diserahkan ke warga Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, oleh PT Kristalin Ekalestari dalam rangka CSR. Sekitar 50% penerima adalah janda lansia.',
        content: `Sebanyak 506 Paket sembako diserahkan ke warga Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, oleh PT Kristalin Ekalestari dalam rangka Corporate Social Responsibility (CSR). Dari sekira 50 persen diantaranya para janda Lanjut Usia (Lansia).\n\nHumas PT Kristalin Ekalestari Maria Erari menerangkan, pihaknya menyerahkan bantuan 506 paket sembako bulan Juli 2025 untuk 506 Kepala Keluarga (KK) warga di Desa Nifasi dan sekitarnya sebagai tanggung jawab sosial Perusahaan.\n\n"Untuk bantuan bulan Juli 2025 ini, kami rutin ya setiap bulannya dan tidak ada yang berkurang dan menambah sebanyak 506 paket sembako untuk 506 KK," ucap Maria Erari dikonfirmasi di Jakarta pada Selasa, 8 Juli 2025.\n\nMaria menambahkan Bantuan ratusan paket sembako dari PT Kristalin Ekalestari hampir sama di bulan-bulan sebelumnya yakni 506 paket sembako diberikan ke masyarakat, tempat ibadah seperti gereja, masjid dan kantor pelayanan publik.\n\n"Dari 506 yang disalurkan hampir sekira 50 persen yang menerima dari kalangan Janda Lansia (Lanjut Usia-red) kami antarkan langsung dari data yang sudah ditentukan dan rekomendasi kepala suku dan adat," ujarnya.\n\nMenurutnya program bantuan sembako yang disalurkan setiap bulannya oleh PT Kristalin Ekalestari dalam program Corporate Social Responsibilty (CSR). Maria menilai konsistensi program CSR perusahaanya untuk Masyarakat sekitar lingkungan area pekerjaan dengan menyalurkan sembako.\n\nBantuan sembako tersebut disebar di lokasi Desa Nifasi, Suku Dani, Kp. Mamai, Kp. Orluk, Kp. Mamai, Kp. Makimi, Desa Samabusa dan Desa Waharia.\n\n"Terima kasih kepada PT Kristalin Ekalestari sudah memberikan bantuan sembako setiap bulannya, anak-anak sudah menerima," kata salah satu warga Suku Mamai menerima bantuan sembako.\n\nSembako yang dibagikan tetap sama rutin setiap bulannya yakni beras, telur, mie instan, minyak goreng, tepung terigu, sabun cuci, kopi dan teh. Program-program lain PT Kristalin Ekalestari yang sudah direalisasikan merupakan tanggung jawab sosial Perusahaan terhadap lingkungan dan masyarakat antara lain, pendidikan, renovasi sekolahan, gereja, bedah rumah warga dan kegiatan masyarakat.`,
        author: 'Humas PT Kristalin Ekalestari',
        views: '1.1K',
        readTime: '5 min',
        trending: false,
        type: 'CSR Sembako',
        metrics: { paket: '506 Paket', lokasi: 'Desa Nifasi & Sekitarnya' },
    },
    {
        id: 8,
        title: 'Komitmen CSR PT Kristalin Ekalestari Berikan Manfaat Warga Desa Nifasi',
        subtitle: 'Bantuan rumah layak untuk keluarga di Desa Nifasi, Nabire, Papua Tengah',
        date: '25 Jun 2025',
        category: 'CSR Initiative',
        imageUrl: '/beritacsrkristalin.jpg',
        excerpt:
            'PT Kristalin Ekalestari melalui program CSR kembali memberikan bantuan rumah layak huni kepada warga Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Bantuan ini menjadi bukti komitmen perusahaan dalam memberikan manfaat nyata bagi masyarakat sekitar tambang.',
        content: `Pasangan suami istri (Pasutri) ini bahagia lepas bahagia setelah mendapatkan bantuan berupa satu rumah layak di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.\n\nYuliana Manuaron mendapatkan rumah dari PT Kristalin Ekalestari dalam program Corporate Social Responsibility (CSR).\n\nIbu Rumah Tangga ini bersama suaminya yang hanya bekerja sebagai Buruh Lepas bisa menempati rumah bangunan cat berwarna hijau. Pasalnya, PT Kristalin Ekalestari sudah menyerahkan rumah tipe 57 spesifikasi bangunan rumah tembok semi permanen memiliki dua kamar tidur dan satu kamar mandi.\n\nYuliana bersyukur karena memang belum memiliki rumah. "Terima kasih banyak perusahaan PT Kristalin Ekalestari Puji Tuhan, saya bisa dapat rumah dari Kristalin. Terima kasih," ucap Yuliana.\n\nSementara itu Humas PT Kristalin Ekalestari Maria Erari menerangkan sudah kesekian kalinya pihaknya menyerahkan rumah untuk masyarakat yang belum memiliki rumah dan sudah mendata secara detail sekaligus rekomendasikan dari Ketua Adat.\n\n"Ini bukti komitmen kami sebagai perusahaan yang bergerak di Tambang, memberikan manfaat banyak kepada masyarakat terutama warga yang belum mendapatkan rumah lewat program CSR," ujar Maria Erari dalam keterangannya di Jakarta, Selasa 24 Juni 2025.\n\nMenurut Maria, ia mengilustrasikan Desa Nifasi ini sebagai seorang wanita berubah menjadi cantik yang terawat. "Kami ibaratkan Desa ini sebelumnya biasa-biasa saja, kini menjadi berubah seperti wanita cantik yang terawat dan memberikan manfaat banyak kepada masyarakat dengan kehadiran kami PT Kristalin Ekalestari," katanya.\n\nIa juga menambahkan dalam situasi apapun perusahaannya akan berkontribusi dan konsisten sebagai perusahaan yang legal dan berizin di wilayaha Nabire, Papua Tengah, akan terus berupaya memberikan kontribusi yang terbaik untuk masyarakat sekitar.\n\n"Dalam situasi apapun kami akan memberikan yang terbaik untuk warga. Bisa melihat pembangunan Desa ini luar biasa selain itu kami juga menggerakan roda ekonomi untuk lokasi wisata Sungai Musairo," tutur Maria.\n\nMelalui program Corporate Social Responsibility (CSR) membantu warga yang belum punya rumah dan renovasi total rumah tidak layak. PT Kristalin Ekalestari selain membangun rumah untuk warga yang belum memiliki rumah dan bedah rumah, membangun Pembangunan gereja, pendidikan, bantuan sembako, kendaraan operasional masyarakat dan gereja.`,
        author: 'Humas PT Kristalin Ekalestari',
        views: '1.2K',
        readTime: '6 min',
        trending: true,
        type: 'CSR Housing',
        metrics: { rumah: '1 Unit', lokasi: 'Desa Nifasi' },
    },
    {
        id: 7,
        title: 'Kristalin Eka Lestari Achieves Record Gold Production with Revolutionary Extraction Technology',
        subtitle: 'Breakthrough sustainable mining practices set new industry standards',
        date: '02 Jan 2024',
        category: 'Mining Operations',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
        excerpt:
            'Revolutionary extraction methods increase gold yield by 40% while reducing environmental impact through sustainable mining practices and cutting-edge technology implementation.',
        content: `Mining excellence is one of the main pillars to ensure sustainable growth and environmental responsibility in Indonesia's mining sector. Kristalin Eka Lestari has successfully implemented cutting-edge extraction technology that not only increases gold production efficiency but also maintains strict environmental standards. Our latest breakthrough in sustainable gold mining has resulted in a 40% increase in extraction yield while reducing water consumption by 35% and minimizing carbon footprint through renewable energy integration.`,
        author: 'Mining Operations Team',
        views: '2.4K',
        readTime: '8 min',
        isFeatured: true,
        trending: true,
        type: 'Technology Breakthrough',
        metrics: { impact: '40% Yield Increase', duration: '18 Months Development' },
    },
    {
        id: 6,
        title: 'Golden Community Program: Mining Education Center Opens in Central Kalimantan',
        subtitle: 'Empowering local communities through sustainable education initiatives',
        date: '28 Dec 2023',
        category: 'CSR Initiative',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop',
        excerpt:
            'State-of-the-art education facility provides mining technology training for 500+ local youth, creating sustainable career opportunities in the region.',
        content: `State-of-the-art education facility provides comprehensive mining technology training for over 500 local youth, creating sustainable career opportunities and building technical expertise in the region. The program includes hands-on training, theoretical education, and practical internships with leading industry professionals.`,
        author: 'CSR Division',
        views: '1.8K',
        readTime: '5 min',
        trending: true,
        type: 'Community Development',
        metrics: { beneficiaries: '500+ Students', investment: 'Rp 5M Facility' },
    },
    {
        id: 5,
        title: 'Environmental Excellence: 75,000 Trees Planted in Reforestation Project',
        subtitle: 'Massive environmental restoration initiative shows measurable impact',
        date: '20 Dec 2023',
        category: 'Environmental',
        imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
        excerpt:
            'Massive reforestation initiative restores 400 hectares of post-mining land to natural habitat, supporting biodiversity and carbon sequestration.',
        content: `Massive reforestation initiative successfully restores 400 hectares of post-mining land to natural habitat, supporting local biodiversity conservation and carbon sequestration efforts. The project includes native species planting, soil rehabilitation, and long-term ecosystem monitoring.`,
        author: 'Environmental Team',
        views: '1.5K',
        readTime: '6 min',
        trending: false,
        type: 'Environmental Impact',
        metrics: { trees: '75,000 Planted', area: '400 Hectares Restored' },
    },
    {
        id: 4,
        title: 'International Safety Award for Zero-Incident Mining Operations',
        subtitle: 'Global recognition for exceptional workplace safety standards',
        date: '15 Dec 2023',
        category: 'Achievement',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
        excerpt: 'Global recognition for maintaining 1,200+ consecutive days without workplace incidents, setting new industry safety benchmarks.',
        content: `Global recognition for maintaining over 1,200 consecutive days without workplace incidents, setting new industry safety benchmarks and demonstrating excellence in occupational health and safety management. The achievement reflects comprehensive safety protocols and continuous training programs.`,
        author: 'Safety Division',
        views: '2.1K',
        readTime: '4 min',
        trending: true,
        type: 'Safety Excellence',
        metrics: { days: '1,200+ Incident-Free', rating: 'ISO 45001 Certified' },
    },
    {
        id: 3,
        title: 'Smart Mining: AI-Powered Gold Detection System Implementation',
        subtitle: 'Cutting-edge artificial intelligence revolutionizes exploration processes',
        date: '10 Dec 2023',
        category: 'Technology',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
        excerpt:
            'Artificial intelligence technology increases ore detection accuracy by 85%, revolutionizing exploration efficiency and precision in gold mining operations.',
        content: `Artificial intelligence technology increases ore detection accuracy by 85%, revolutionizing exploration efficiency and precision in gold mining operations. The system utilizes machine learning algorithms and advanced geological data analysis to optimize resource identification and extraction planning.`,
        author: 'Technology Team',
        views: '3.2K',
        readTime: '7 min',
        trending: true,
        type: 'AI Innovation',
        metrics: { accuracy: '85% Detection Rate', efficiency: '60% Time Reduction' },
    },
    {
        id: 2,
        title: 'Strategic Partnership with Global Mining Technology Leader',
        subtitle: 'International collaboration enhances technological capabilities',
        date: '05 Dec 2023',
        category: 'Partnership',
        imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
        excerpt:
            'International collaboration brings cutting-edge automation to Indonesian operations, enhancing efficiency and environmental sustainability.',
        content: `International collaboration brings cutting-edge automation to Indonesian operations, enhancing operational efficiency and environmental sustainability through advanced mining technologies and best practices sharing. The partnership focuses on sustainable mining innovation and knowledge transfer.`,
        author: 'Business Development',
        views: '1.9K',
        readTime: '5 min',
        trending: false,
        type: 'Strategic Alliance',
        metrics: { investment: '$10M Partnership', timeline: '3-Year Agreement' },
    },
    {
        id: 1,
        title: 'Sustainable Mining Certification Achieved from International Council',
        subtitle: 'Global certification confirms environmental leadership commitment',
        date: '25 Nov 2023',
        category: 'Achievement',
        imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&h=400&fit=crop',
        excerpt:
            'Global certification confirms our commitment to responsible mining practices and environmental stewardship in gold extraction operations.',
        content: `Global certification confirms our unwavering commitment to responsible mining practices and environmental stewardship in all gold extraction operations. The certification validates comprehensive sustainability programs, environmental protection measures, and community engagement initiatives implemented across all operational sites.`,
        author: 'Sustainability Team',
        views: '1.7K',
        readTime: '6 min',
        trending: false,
        type: 'Certification',
        metrics: { standard: 'ICMM Certified', scope: 'All Operations' },
    },
];

// Enhanced animations with professional timing
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
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

// Enhanced Counter Animation
interface CounterAnimationProps {
    target: number;
    suffix?: string;
    duration?: number;
    delay?: number;
}

const CounterAnimation = ({ target, suffix = '', duration = 2000, delay = 0 }: CounterAnimationProps) => {
    const [count, setCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startCounting = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        setCount(0);

        const increment = target / (duration / 50);
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
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mb-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
        >
            <motion.span
                animate={{
                    scale: isAnimating ? [1, 1.05, 1] : 1,
                }}
                transition={{
                    duration: 0.5,
                    repeat: isAnimating ? Infinity : 0,
                    repeatType: 'reverse',
                }}
            >
                {count.toLocaleString()}
                {suffix}
            </motion.span>
        </motion.div>
    );
};

const KristalinNewsPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    // Removed unused state to fix ESLint error
    const [scrollY, setScrollY] = useState(0);

    // Parallax effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Ambil id dari query string
    const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const idParam = urlParams.get('id');
    const selectedNews = idParam ? newsData.find((n) => n.id === Number(idParam)) : null;

    const newsPerPage = 6;
    const categories = [
        'All',
        'Mining Operations',
        'CSR Initiative',
        'Environmental',
        'Achievement',
        'Community Development',
        'Partnership',
        'Technology',
    ];

    // Filter news based on category and search
    const filteredNews = newsData.filter((news) => {
        const matchesCategory = selectedCategory === 'All' || news.category === selectedCategory;
        const matchesSearch =
            news.title.toLowerCase().includes(searchQuery.toLowerCase()) || news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredNews.length / newsPerPage);
    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    const currentNews = filteredNews.slice(startIndex, endIndex);

    // Enhanced navigation with smooth transitions
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Removed unused function to fix ESLint error

    const handleBackToList = () => {
        router.visit('/news', { replace: false });
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Mining Operations': 'from-yellow-400 to-amber-500',
            'CSR Initiative': 'from-green-400 to-emerald-500',
            Environmental: 'from-emerald-400 to-green-500',
            Achievement: 'from-yellow-300 to-amber-400',
            'Community Development': 'from-blue-400 to-indigo-500',
            Partnership: 'from-orange-400 to-amber-500',
            Technology: 'from-purple-400 to-indigo-500',
        };
        return colors[category] || 'from-gray-400 to-gray-500';
    };

    // Reset currentPage to 1 when filter/search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    // Ensure currentPage is not greater than totalPages after filtering
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);

    // News Detail View
    if (selectedNews) {
        return (
            <div className="min-h-screen bg-black">
                <Header />

                {/* Header Navigation */}
                <div className="sticky top-0 z-50 border-b border-gray-800/50 bg-black">
                    <div className="mx-auto max-w-6xl px-6 py-4">
                        <div className="flex items-center justify-start">
                            <button
                                onClick={handleBackToList}
                                className="group flex items-center rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:from-yellow-300 hover:to-yellow-400"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Back to List
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Container */}
                <div className="mx-auto max-w-6xl px-6 py-8 pb-32">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                        {/* Left Column - Image */}
                        <div className="lg:col-span-2">
                            <div className="relative aspect-[4/3] max-h-[70vh] w-full overflow-hidden rounded-xl">
                                <img src={selectedNews.imageUrl} alt={selectedNews.title} className="h-full w-full rounded-xl object-cover" />
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <div
                                        className={`bg-gradient-to-r ${getCategoryColor(selectedNews.category)} rounded-full px-3 py-1.5 text-xs font-bold text-black shadow-lg`}
                                    >
                                        {selectedNews.category}
                                    </div>
                                </div>
                                {/* Trending Badge */}
                                {selectedNews.trending && (
                                    <div className="absolute top-4 right-4">
                                        <div className="rounded-full bg-red-500 p-1.5 text-white">
                                            <TrendingUp className="h-3 w-3" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {selectedNews.metrics && (
                                <div className="mt-4 w-full rounded-2xl border border-amber-500/20 bg-gray-900/50 p-4 backdrop-blur-sm">
                                    <h4 className="mb-2 flex items-center text-sm font-bold text-white">
                                        <BarChart3 className="mr-2 h-4 w-4 text-yellow-400" />
                                        Project Metrics
                                    </h4>
                                    <div className="flex flex-col gap-2">
                                        {Object.entries(selectedNews.metrics).map(([key, value]) => (
                                            <div key={key}>
                                                <span className="text-xs tracking-wider text-yellow-400 uppercase">{key}</span>
                                                <span className="block text-xs font-medium break-words text-white">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Content */}
                        <div className="lg:col-span-3">
                            {/* Article Metadata */}
                            <div className="mb-5 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                                <div className="flex items-center gap-1 transition-colors hover:text-yellow-400">
                                    <Calendar className="h-3 w-3" />
                                    <span>{selectedNews.date}</span>
                                </div>
                                <div className="flex items-center gap-1 transition-colors hover:text-white">
                                    <User className="h-3 w-3" />
                                    <span>{selectedNews.author}</span>
                                </div>
                                <div className="flex items-center gap-1 transition-colors hover:text-white">
                                    <Clock className="h-3 w-3" />
                                    <span>{selectedNews.readTime}</span>
                                </div>
                                <div className="flex items-center gap-1 transition-colors hover:text-white">
                                    <Eye className="h-3 w-3" />
                                    <span>{selectedNews.views}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="mb-3 text-2xl leading-tight font-bold text-white lg:text-3xl">{selectedNews.title}</h1>

                            {selectedNews.subtitle && (
                                <h2 className="mb-5 text-base leading-relaxed font-medium text-yellow-400 lg:text-lg">{selectedNews.subtitle}</h2>
                            )}

                            {/* Content */}
                            <div className="prose prose-invert max-w-none">
                                <div className="space-y-4 text-sm leading-relaxed text-gray-300 lg:text-base">
                                    {selectedNews.content?.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="mb-4">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                {/* Impact Statement */}
                                <div className="my-6 rounded-lg border border-yellow-400/30 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 p-4">
                                    <h3 className="mb-2 flex items-center text-base font-bold text-yellow-400">
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Impact Statement
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-300">
                                        Program CSR ini menunjukkan komitmen nyata PT Kristalin Ekalestari dalam memberikan dampak positif bagi
                                        masyarakat sekitar, meningkatkan kualitas hidup dan kesejahteraan keluarga di daerah operasi.
                                    </p>
                                </div>

                                {/* Trending Indicator */}
                                {selectedNews.trending && (
                                    <div className="my-6 rounded-lg border border-red-500/30 bg-black/40 p-4">
                                        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-red-400">
                                            <TrendingUp className="h-4 w-4" />
                                            <span>Trending Article</span>
                                        </div>
                                        <p className="text-xs text-gray-300">
                                            Artikel ini sedang trending dan mendapat perhatian tinggi dari pembaca.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Related Articles */}
                            <div className="mt-8 border-t border-gray-800 pt-6">
                                <h3 className="mb-4 text-lg font-bold text-yellow-400">Related Articles</h3>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {newsData.slice(0, 2).map((relatedNews) => (
                                        <div
                                            key={relatedNews.id}
                                            className="group cursor-pointer rounded-lg border border-yellow-400/30 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 p-3 transition-all duration-300 hover:from-yellow-400/30 hover:to-yellow-500/30"
                                        >
                                            <div className="mb-1 text-xs font-medium text-yellow-400">
                                                {relatedNews.category} • {relatedNews.date}
                                            </div>
                                            <div className="mb-2 line-clamp-2 text-xs font-semibold text-white transition-colors group-hover:text-yellow-400">
                                                {relatedNews.title}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-400">{relatedNews.readTime}</span>
                                                <ArrowRight className="h-3 w-3 text-yellow-400 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }

    // Enhanced News List View
    return (
        <div className="min-h-screen bg-white">
            <Header sticky={true} transparent={true} />

            {/* Hero Section with Parallax */}
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=1080&fit=crop')",
                        backgroundAttachment: 'fixed',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
                </div>

                <motion.div
                    className="relative z-20 mx-auto w-full max-w-5xl px-4 py-24 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <motion.div
                        className="transform transition-all duration-1000 ease-out"
                        style={{
                            transform: `translateY(${scrollY * 0.2}px)`,
                            opacity: Math.max(0, 1 - scrollY / 600),
                        }}
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <motion.h1
                            className="mb-8 text-5xl leading-tight font-bold md:text-7xl"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                        >
                            <motion.span
                                className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                News
                            </motion.span>
                            <br />
                            <motion.span
                                className="text-white drop-shadow-lg"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                            >
                                Update
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed font-light text-white/95 md:text-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                        >
                            Latest developments in sustainable gold mining and community empowerment.
                        </motion.p>

                        {/* Enhanced Search Bar */}
                        <motion.div
                            className="mx-auto mb-8 max-w-2xl"
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
                        >
                            <div className="group relative">
                                <Search className="absolute top-1/2 left-4 z-10 h-5 w-5 -translate-y-1/2 transform text-amber-400" />
                                <input
                                    type="text"
                                    placeholder="Search mining news..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-xl border border-amber-400/30 bg-black/30 py-4 pr-4 pl-12 text-white placeholder-gray-300 backdrop-blur-md transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-amber-400"
                                />
                            </div>
                        </motion.div>

                        {/* Enhanced Category Filters */}
                        <motion.div
                            className="mb-8 flex flex-wrap justify-center gap-3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.6 }}
                        >
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.6 + index * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                                        selectedCategory === category
                                            ? 'bg-gradient-to-r from-amber-400 to-yellow-500 font-bold text-black shadow-lg'
                                            : 'border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-amber-400'
                                    }`}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8, ease: 'easeOut' }}
                >
                    <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/60">
                        <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-white"></div>
                    </div>
                </motion.div>
            </section>

            {/* Enhanced Stats Section - Reduced gap */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-amber-50/30 py-12"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-amber-400 blur-3xl"></div>
                    <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-yellow-400 blur-3xl"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4">
                    <motion.div variants={fadeInUp} className="mb-12 text-center">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="mb-6 text-4xl leading-tight font-bold md:text-5xl"
                        >
                            <span className="text-gray-800">Our </span>
                            <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">News Statistics</span>
                        </motion.h2>
                        <div className="mx-auto mb-6 h-0.5 w-16 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
                            Stay informed with the latest updates from our operations and community initiatives.
                        </p>
                    </motion.div>

                    {/* Enhanced Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
                        {[
                            {
                                number: filteredNews.length,
                                label: 'Total Articles',
                                description: 'Latest news and updates from our operations',
                                suffix: '',
                            },
                            {
                                number: categories.length - 1,
                                label: 'Categories',
                                description: 'Different areas of our business coverage',
                                suffix: '',
                            },
                            {
                                number: filteredNews.filter((n) => n.trending).length,
                                label: 'Trending Stories',
                                description: 'Most popular articles this month',
                                suffix: '',
                            },
                            {
                                number: 2025,
                                label: 'Latest Updates',
                                description: 'Current year news and announcements',
                                suffix: '',
                            },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.15,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                whileHover={{
                                    y: -12,
                                    scale: 1.02,
                                    boxShadow: '0 25px 50px rgba(251, 191, 36, 0.25)',
                                }}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/90 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:bg-white hover:shadow-lg"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                                <div className="relative z-10">
                                    <CounterAnimation target={stat.number} suffix={stat.suffix} duration={2000} delay={index * 300} />

                                    <h4 className="mb-3 text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-amber-600">
                                        {stat.label}
                                    </h4>

                                    <p className="text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                                        {stat.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Enhanced News Grid Section - Reduced gap */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-gradient-to-br from-white via-gray-50 to-white py-12"
            >
                <div className="mx-auto max-w-7xl px-4">
                    {/* Navigation */}
                    <motion.div variants={fadeInUp} className="mb-12 flex items-center justify-center">
                        <div className="flex items-center space-x-6">
                            <motion.button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group flex h-14 w-14 items-center justify-center rounded-full border border-amber-200 bg-white shadow-sm transition-all duration-300 hover:bg-amber-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <ChevronLeft className="h-6 w-6 text-amber-600 transition-transform group-hover:-translate-x-0.5" />
                            </motion.button>

                            <div className="flex items-center space-x-3 text-2xl font-light text-gray-800">
                                <span className="font-semibold text-amber-600">{currentPage}</span>
                                <span className="text-gray-400">/</span>
                                <span className="text-gray-500">{totalPages}</span>
                            </div>

                            <motion.button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group flex h-14 w-14 items-center justify-center rounded-full border border-amber-200 bg-white shadow-sm transition-all duration-300 hover:bg-amber-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <ChevronRight className="h-6 w-6 text-amber-600 transition-transform group-hover:translate-x-0.5" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Enhanced News Grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {currentNews.map((news) => (
                            <motion.div
                                key={news.id}
                                variants={fadeInUp}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                                }}
                                onClick={() => router.visit(`/news?id=${news.id}`)}
                                className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl"
                            >
                                {/* Gambar dengan badge kategori */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={news.imageUrl}
                                        alt={news.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span
                                            className={`bg-gradient-to-r ${getCategoryColor(news.category)} rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-lg`}
                                        >
                                            {news.category}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                </div>
                                {/* Konten */}
                                <div className="group relative flex flex-1 flex-col p-4 leading-snug before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-yellow-400 before:transition-all before:duration-300 hover:before:w-full">
                                    {/* Metadata (tanggal, waktu baca, views) */}
                                    <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1 transition-colors hover:text-amber-600">
                                            <Calendar className="h-3 w-3" />
                                            <span>{news.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1 transition-colors hover:text-gray-700">
                                            <Clock className="h-3 w-3" />
                                            <span>{news.readTime}</span>
                                        </div>
                                        <div className="flex items-center gap-1 transition-colors hover:text-gray-700">
                                            <Eye className="h-3 w-3" />
                                            <span>{news.views}</span>
                                        </div>
                                    </div>
                                    {/* Judul & Subjudul */}
                                    <h3 className="mb-1 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-700">
                                        {news.title}
                                    </h3>
                                    {news.subtitle && <h4 className="mb-2 line-clamp-1 text-sm text-amber-600">{news.subtitle}</h4>}
                                    {/* Excerpt */}
                                    <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">{news.excerpt}</p>
                                    {/* Info Penulis + Metrics */}
                                    <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            <span>{news.author}</span>
                                        </div>
                                        {news.metrics && <span className="font-semibold text-amber-600">{Object.values(news.metrics)[0]}</span>}
                                    </div>
                                    {/* Progress bar */}
                                    <div className="h-1 w-full rounded-full bg-gray-200">
                                        <div className="h-1 w-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-1000 ease-out group-hover:w-full"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {currentNews.length === 0 && <div className="col-span-full py-12 text-center text-gray-500">Tidak ada berita ditemukan.</div>}
                    </motion.div>
                </div>
            </motion.section>

            <Footer />
        </div>
    );
};

export default KristalinNewsPage;





