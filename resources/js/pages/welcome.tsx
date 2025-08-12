import { useTranslation } from '@/hooks/useTranslation';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

// Import data berita dari news.tsx
const newsData = [
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
];

const InternalFeedbackModal = ({ onClose }: { onClose: () => void }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'report' | 'track'>('report');
    const [category, setCategory] = useState('');
    const [department, setDepartment] = useState('');
    const [priority, setPriority] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [incidentDate, setIncidentDate] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [ticketNumber, setTicketNumber] = useState('');
    const [showTicket, setShowTicket] = useState(false);
    const [trackInput, setTrackInput] = useState('');
    const [trackResult, setTrackResult] = useState<null | {
        error?: string;
        subject?: string;
        status?: string;
        ticket_number?: string;
        category?: string;
        priority?: string;
        incident_date?: string;
    }>(null);
    const [fileNames, setFileNames] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const ticketRef = useRef<HTMLDivElement>(null);

    const statusText: Record<string, string> = {
        submitted: t('pages.welcome.feedback.status.submitted'),
        review: t('pages.welcome.feedback.status.review'),
        progress: t('pages.welcome.feedback.status.progress'),
        resolved: t('pages.welcome.feedback.status.resolved'),
    };
    const priorityText: Record<string, string> = {
        low: t('pages.welcome.feedback.priority.low'),
        medium: t('pages.welcome.feedback.priority.medium'),
        high: t('pages.welcome.feedback.priority.high'),
        urgent: t('pages.welcome.feedback.priority.urgent'),
    };

    useEffect(() => {
        // Lock body scroll (juga di mobile)
        document.body.classList.add('overflow-hidden');
        // Untuk iOS Safari, bisa juga set touch-action: none pada backdrop, sudah ada di kode kamu
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('category', category);
        formData.append('department', department);
        formData.append('priority', priority);
        formData.append('subject', subject);
        formData.append('description', description);
        formData.append('incident_date', incidentDate);
        if (files[0]) formData.append('file', files[0]);

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        fetch('/feedback', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': csrfToken || '',
            },
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.ok && data.ticket_number) {
                    setTicketNumber(data.ticket_number);
                    setShowTicket(true);
                    setCategory('');
                    setDepartment('');
                    setPriority('');
                    setSubject('');
                    setDescription('');
                    setIncidentDate('');
                    setFiles([]);
                    setFileNames('');
                    setTimeout(() => {
                        if (ticketRef.current) ticketRef.current.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                } else {
                    alert(data.error || 'Failed to submit feedback.');
                }
            })
            .catch(() => alert('Failed to submit feedback.'));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files ? Array.from(e.target.files) : [];
        setFiles(fileList);
        setFileNames(fileList.map((f) => f.name).join(', '));
    }

    function handleTrack() {
        if (!trackInput.trim()) {
            setTrackResult({ error: 'Please enter a ticket number.' });
            return;
        }
        fetch(`/feedback/${trackInput.trim()}`)
            .then(async (res) => {
                const data = await res.json();
                if (res.ok && data.ticket_number) {
                    setTrackResult(data);
                } else {
                    setTrackResult({ error: data.error || 'Ticket number not found.' });
                }
            })
            .catch(() => setTrackResult({ error: 'Failed to fetch ticket.' }));
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
            <div
                className="animate-containerFade max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header dengan close button yang lebih terlihat */}
                <div className="relative rounded-t-2xl bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 p-6">
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="pr-12">
                        <h1 className="text-2xl font-bold text-white drop-shadow md:text-3xl">{t('pages.welcome.feedback.modal_title')}</h1>
                        <p className="mt-2 text-yellow-100">{t('pages.welcome.feedback.modal_subtitle')}</p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200 bg-gray-50 px-6">
                    <nav className="flex justify-center space-x-8">
                        <button
                            onClick={() => {
                                setActiveTab('report');
                                setShowTicket(false);
                            }}
                            className={`px-6 py-4 text-sm font-semibold transition-all duration-200 focus:outline-none ${
                                activeTab === 'report' ? 'border-b-3 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-yellow-700'
                            }`}
                        >
                            {t('pages.welcome.feedback.report_tab')}
                        </button>
                        <button
                            onClick={() => setActiveTab('track')}
                            className={`px-6 py-4 text-sm font-semibold transition-all duration-200 focus:outline-none ${
                                activeTab === 'track' ? 'border-b-3 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-yellow-700'
                            }`}
                        >
                            {t('pages.welcome.feedback.track_tab')}
                        </button>
                    </nav>
                </div>

                {/* Content Area */}
                <div className="max-h-[60vh] overflow-y-auto p-6">
                    {activeTab === 'report' && (
                        <div className="space-y-6">
                            {/* Anonymous Notice */}
                            <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4 text-sm text-blue-800">
                                <div className="flex items-start">
                                    <svg className="mt-0.5 mr-3 h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                    <div>{t('pages.welcome.feedback.anonymous_notice')}</div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* 2-Column Grid untuk Category & Department */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="category" className="mb-2 block text-sm font-semibold text-gray-700">
                                            {t('pages.welcome.feedback.category_label')} <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="category"
                                            required
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                                        >
                                            <option value="">{t('pages.welcome.feedback.select_category')}</option>
                                            <option value="workplace">{t('pages.welcome.feedback.categories.workplace')}</option>
                                            <option value="safety">{t('pages.welcome.feedback.categories.safety')}</option>
                                            <option value="harassment">{t('pages.welcome.feedback.categories.harassment')}</option>
                                            <option value="policy">{t('pages.welcome.feedback.categories.policy')}</option>
                                            <option value="management">{t('pages.welcome.feedback.categories.management')}</option>
                                            <option value="facilities">{t('pages.welcome.feedback.categories.facilities')}</option>
                                            <option value="ethics">{t('pages.welcome.feedback.categories.ethics')}</option>
                                            <option value="suggestion">{t('pages.welcome.feedback.categories.suggestion')}</option>
                                            <option value="other">{t('pages.welcome.feedback.categories.other')}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="department" className="mb-2 block text-sm font-semibold text-gray-700">
                                            {t('pages.welcome.feedback.department_label')} {t('pages.welcome.feedback.optional')}
                                        </label>
                                        <select
                                            id="department"
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                                        >
                                            <option value="">{t('pages.welcome.feedback.select_department')}</option>
                                            <option value="hr">{t('pages.welcome.feedback.departments.hr')}</option>
                                            <option value="finance">{t('pages.welcome.feedback.departments.finance')}</option>
                                            <option value="it">{t('pages.welcome.feedback.departments.it')}</option>
                                            <option value="marketing">{t('pages.welcome.feedback.departments.marketing')}</option>
                                            <option value="operations">{t('pages.welcome.feedback.departments.operations')}</option>
                                            <option value="management">{t('pages.welcome.feedback.departments.management')}</option>
                                            <option value="general">{t('pages.welcome.feedback.departments.general')}</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Priority Level - Responsive Grid */}
                                <div>
                                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                                        {t('pages.welcome.feedback.priority_label')} <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                        {['low', 'medium', 'high', 'urgent'].map((level) => (
                                            <label
                                                key={level}
                                                className={`cursor-pointer rounded-lg border-2 px-4 py-3 text-center text-sm font-medium transition-all duration-200 select-none ${
                                                    priority === level
                                                        ? level === 'low'
                                                            ? 'border-green-500 bg-green-50 text-green-700'
                                                            : level === 'medium'
                                                              ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                                                              : level === 'high'
                                                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                                : 'border-red-500 bg-red-50 text-red-700'
                                                        : 'border-gray-200 text-gray-500 hover:border-yellow-400'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    id={level}
                                                    name="priority"
                                                    value={level}
                                                    checked={priority === level}
                                                    onChange={(e) => setPriority(e.target.value)}
                                                    className="hidden"
                                                />
                                                {t(`pages.welcome.feedback.priority_display.${level}`)}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Report Title */}
                                <div>
                                    <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-gray-700">
                                        {t('pages.welcome.feedback.subject_label')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        required
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder={t('pages.welcome.feedback.subject_placeholder')}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="mb-2 block text-sm font-semibold text-gray-700">
                                        {t('pages.welcome.feedback.description_label')} <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder={t('pages.welcome.feedback.description_placeholder')}
                                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                                        rows={4}
                                    />
                                </div>

                                {/* 2-Column Grid untuk Date & File Upload */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="incident-date" className="mb-2 block text-sm font-semibold text-gray-700">
                                            {t('pages.welcome.feedback.date_label')} {t('pages.welcome.feedback.optional')}
                                        </label>
                                        <input
                                            type="date"
                                            id="incident-date"
                                            value={incidentDate}
                                            onChange={(e) => setIncidentDate(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            {t('pages.welcome.feedback.files_label')} {t('pages.welcome.feedback.optional')}
                                        </label>
                                        <div
                                            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-4 py-8 transition-colors duration-300 hover:border-yellow-400 hover:bg-yellow-50"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                multiple
                                                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                            <div className="text-center text-xs text-gray-500">
                                                {files.length === 0 ? (
                                                    <>
                                                        <svg
                                                            className="mx-auto mb-2 h-8 w-8 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                            />
                                                        </svg>
                                                        {t('pages.welcome.feedback.upload_text')}
                                                        <br />
                                                        <span className="text-xs">{t('pages.welcome.feedback.upload_format')}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg
                                                            className="mx-auto mb-2 h-8 w-8 text-green-500"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        {files.length} {t('pages.welcome.feedback.files_selected')}
                                                        <br />
                                                        <span className="text-xs">{fileNames}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-yellow-600 hover:to-amber-600 hover:shadow-xl"
                                >
                                    🚀 {t('pages.welcome.feedback.submit_button')}
                                </button>
                            </form>

                            {/* Success Ticket Display */}
                            {showTicket && (
                                <div
                                    ref={ticketRef}
                                    className="animate-premiumFadeIn mt-6 rounded-xl bg-gradient-to-r from-green-400 to-teal-400 p-6 text-center text-white"
                                >
                                    <div className="mb-2 text-4xl">✅</div>
                                    <h3 className="mb-2 text-lg font-bold">Report Successfully Submitted!</h3>
                                    <p className="text-sm opacity-90">Your Ticket Number:</p>
                                    <div className="my-3 rounded-lg bg-white/20 px-4 py-2 text-xl font-bold tracking-widest break-all backdrop-blur-sm">
                                        {ticketNumber}
                                    </div>
                                    <p className="text-xs opacity-80">Save this number to track your report status</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Track Status Tab */}
                    {activeTab === 'track' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="mb-2 text-xl font-bold text-gray-800">{t('pages.welcome.feedback.track_title')}</h2>
                                <p className="text-gray-600">{t('pages.welcome.feedback.track_subtitle')}</p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-6">
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <input
                                        type="text"
                                        value={trackInput}
                                        onChange={(e) => setTrackInput(e.target.value)}
                                        placeholder={t('pages.welcome.feedback.track_example')}
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleTrack();
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="rounded-lg bg-yellow-500 px-6 py-3 text-sm font-semibold text-white shadow transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg sm:w-auto"
                                        onClick={handleTrack}
                                    >
                                        🔍 {t('pages.welcome.feedback.track_report_button')}
                                    </button>
                                </div>
                            </div>

                            {/* Track Results */}
                            {trackResult && (
                                <div className="animate-premiumFadeIn rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                                    {trackResult.error ? (
                                        <div className="text-center">
                                            <div className="mb-4 text-4xl">❌</div>
                                            <p className="mb-2 text-lg font-semibold text-red-600">{trackResult.error}</p>
                                            <p className="text-sm text-gray-500">
                                                {t('pages.welcome.feedback.track_error_format')}
                                                <br />
                                                {t('pages.welcome.feedback.track_error_message')}
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <h3 className="flex-1 text-lg font-bold text-black">{trackResult.subject}</h3>
                                                <span
                                                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                                                        trackResult.status === 'submitted'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : trackResult.status === 'review'
                                                              ? 'bg-orange-100 text-orange-700'
                                                              : trackResult.status === 'progress'
                                                                ? 'bg-purple-100 text-purple-700'
                                                                : 'bg-green-100 text-green-700'
                                                    }`}
                                                >
                                                    {trackResult.status ? statusText[trackResult.status] : 'Unknown'}
                                                </span>
                                            </div>

                                            <div className="mb-4 grid gap-4 sm:grid-cols-2">
                                                <div className="rounded-lg bg-gray-50 p-4">
                                                    <div className="text-sm font-medium text-gray-700">Ticket Number</div>
                                                    <div className="font-mono text-sm break-all text-gray-900">{trackResult.ticket_number}</div>
                                                </div>
                                                <div className="rounded-lg bg-gray-50 p-4">
                                                    <div className="text-sm font-medium text-gray-700">Category</div>
                                                    <div className="text-sm text-gray-900">{trackResult.category}</div>
                                                </div>
                                                <div className="rounded-lg bg-gray-50 p-4">
                                                    <div className="text-sm font-medium text-gray-700">Priority</div>
                                                    <div className="text-sm text-gray-900">
                                                        {trackResult.priority ? priorityText[trackResult.priority] : 'Unknown'}
                                                    </div>
                                                </div>
                                                <div className="rounded-lg bg-gray-50 p-4">
                                                    <div className="text-sm font-medium text-gray-700">Report Date</div>
                                                    <div className="text-sm text-gray-900">{trackResult.incident_date}</div>
                                                </div>
                                            </div>

                                            <div className="rounded-lg bg-blue-50 p-4">
                                                <div className="flex items-start">
                                                    <svg
                                                        className="mt-0.5 mr-3 h-5 w-5 text-blue-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    <div>
                                                        <div className="text-sm font-medium text-blue-800">Latest Update</div>
                                                        <div className="text-sm text-blue-700">
                                                            The relevant team is handling your report. Estimated resolution time: 3-5 business days.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Floating Feedback Button Component
const FloatingFeedbackButton = ({ onClick }: { onClick: () => void }) => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}

            className="floating-feedback-button hover:shadow-3xl group fixed right-4 bottom-4 z-[10000] transform rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 p-3 text-white shadow-2xl transition-all duration-300 hover:scale-110 sm:right-6 sm:bottom-6 sm:p-4"
            style={{ transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
            <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h6a2 2 0 002-2V8M9 12h6"
                    />
                </svg>
                <AnimatePresence>
                    {isHovered && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="hidden overflow-hidden text-xs font-medium whitespace-nowrap sm:inline sm:text-sm"
                        >
                            {t('pages.welcome.feedback.button_text')}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Pulse Effect */}
            <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 opacity-20"></div>
        </motion.button>
    );
};

// Main Welcome Component
const Welcome = () => {
    const { t } = useTranslation();
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [currentNews, setCurrentNews] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [currentContent, setCurrentContent] = useState(0);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    // Ambil 4 berita terbaru berdasarkan 5 id terbesar lalu ambil yang teratas
    const newsItems = React.useMemo(() => {
        const sorted = [...newsData].sort((a, b) => b.id - a.id).slice(0, 5);

        return sorted.slice(0, 4).map((n) => {
            const titleKey = `pages.news.articles.${n.id}.title`;
            const excerptKey = `pages.news.articles.${n.id}.excerpt`;
            const tTitle = t(titleKey) as string;
            const tExcerpt = t(excerptKey) as string;
            return {
                date: n.date,
                title: tTitle === titleKey ? n.title : tTitle,
                excerpt: tExcerpt === excerptKey ? n.excerpt : tExcerpt,
            };
        });
    }, [t]);

    const contentSets = [
        {
            title1: t('pages.welcome.content_set_1.title1'),
            title2: t('pages.welcome.content_set_1.title2'),
            subtitle: t('pages.welcome.content_set_1.subtitle'),
            titleColors: 'text-white',
            title2Colors: 'text-white',
        },
        {
            title1: t('pages.welcome.content_set_2.title1'),
            title2: t('pages.welcome.content_set_2.title2'),
            subtitle: t('pages.welcome.content_set_2.subtitle'),
            titleColors: 'text-white',
            title2Colors: 'text-white',
        },
    ];

    // Loading screen effect - show on first visit or page reload
    useEffect(() => {
        // Check if this is a page reload (sessionStorage is cleared on reload)
        const isReload = !sessionStorage.getItem('kristalin_session');

        if (isReload) {
            // This is a reload, show loading screen
            const loadingTimer = setTimeout(() => {
                setShowLoadingScreen(false);
                // Mark session as started
                sessionStorage.setItem('kristalin_session', 'true');
            }, 3500); // 3.5 seconds loading duration to match LoadingScreen

            return () => clearTimeout(loadingTimer);
        } else {
            // This is navigation within the same session, skip loading screen
            setShowLoadingScreen(false);
        }
    }, []);

    // Content rotation - Slower rotation for better UX
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Start with "Introducing" and give it more time
        const initialDelay = setTimeout(() => {
            setCurrentContent(0); // Start with "Introducing"
        }, 1000); // Wait 1 second after loading

        // Then rotate content every 10 seconds (longer duration)
        const interval = setInterval(() => {
            setCurrentContent((prev) => (prev + 1) % contentSets.length);
        }, 10000); // 10 seconds - longer and more comfortable

        return () => {
            clearTimeout(initialDelay);
            clearInterval(interval);
        };
    }, [contentSets.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNews((prev) => (prev + 1) % newsItems.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [newsItems.length]);

    // Loading Screen Component - Clean & Professional
    const LoadingScreen = () => {
        const [isComplete, setIsComplete] = useState(false);

        useEffect(() => {
            // Simulate loading completion after 3.5 seconds
            const timer = setTimeout(() => {
                setIsComplete(true);
            }, 3500);

            return () => clearTimeout(timer);
        }, []);

        return (
            <AnimatePresence>
                {!isComplete && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            scale: 1.05,
                            filter: 'blur(10px)',
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
                        style={{
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
                        }}
                    >
                        {/* Subtle background pattern */}
                        <div className="absolute inset-0 opacity-[0.02]">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 25% 25%, #FFD700 1px, transparent 1px),
                                                    radial-gradient(circle at 75% 75%, #FFD700 1px, transparent 1px)`,
                                    backgroundSize: '50px 50px',
                                    backgroundPosition: '0 0, 25px 25px',
                                }}
                            />
                        </div>

                        <div className="relative mx-auto flex max-w-md flex-col items-center justify-center px-6">
                            {/* Logo Container */}
                            <motion.div
                                initial={{
                                    scale: 0.3,
                                    opacity: 0,
                                    rotateY: -15,
                                }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    rotateY: 0,
                                }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.2,
                                }}
                                className="relative mb-8"
                                style={{ perspective: '1000px' }}
                            >
                                {/* Subtle glow effect - Clean and Minimal */}
                                <motion.div
                                    className="absolute inset-0 -z-10"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 60%)',
                                        filter: 'blur(25px)',
                                    }}
                                    initial={{ scale: 0.3, opacity: 0 }}
                                    animate={{ scale: 1.1, opacity: 1 }}
                                    transition={{
                                        duration: 1.8,
                                        ease: [0.22, 1, 0.36, 1],
                                        delay: 0.6,
                                    }}
                                />

                                {/* Logo - Smooth Fade In Animation */}
                                <motion.img
                                    src="/kristalinlogotransisi1.png"
                                    alt="Kristalin Eka Lestari Logo"
                                    className="relative z-10 h-24 w-24 object-contain sm:h-32 sm:w-32 md:h-36 md:w-36"
                                    style={{
                                        filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))',
                                    }}
                                    initial={{
                                        scale: 0.6,
                                        opacity: 0,
                                        y: 20,
                                        filter: 'blur(3px) brightness(0.8) drop-shadow(0 0 5px rgba(255, 215, 0, 0.1))',
                                    }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        y: 0,
                                        filter: 'blur(0px) brightness(1.05) drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))',
                                    }}
                                    transition={{
                                        scale: {
                                            duration: 2,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            delay: 0.8,
                                        },
                                        opacity: {
                                            duration: 1.6,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            delay: 0.8,
                                        },
                                        y: {
                                            duration: 1.8,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            delay: 0.8,
                                        },
                                        filter: {
                                            duration: 2,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            delay: 0.8,
                                        },
                                    }}
                                />

                                {/* Smooth Glow Effect */}
                                <motion.div
                                    className="absolute inset-0"
                                    initial={{ scale: 0.7, opacity: 0 }}
                                    animate={{
                                        scale: [0.7, 1.1, 0.9],
                                        opacity: [0, 0.15, 0.06],
                                    }}
                                    transition={{
                                        scale: {
                                            duration: 4,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            repeat: Infinity,
                                            delay: 2,
                                        },
                                        opacity: {
                                            duration: 4,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            repeat: Infinity,
                                            delay: 2,
                                        },
                                    }}
                                    style={{
                                        background:
                                            'radial-gradient(circle, rgba(255, 215, 0, 0.12) 0%, rgba(255, 165, 0, 0.06) 40%, transparent 70%)',
                                        filter: 'blur(20px)',
                                    }}
                                />

                                {/* Subtle White Glow */}
                                <motion.div
                                    className="absolute inset-0"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{
                                        scale: [0.5, 1.0, 0.7],
                                        opacity: [0, 0.1, 0.03],
                                    }}
                                    transition={{
                                        scale: {
                                            duration: 5,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            repeat: Infinity,
                                            delay: 2.5,
                                        },
                                        opacity: {
                                            duration: 5,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            repeat: Infinity,
                                            delay: 2.5,
                                        },
                                    }}
                                    style={{
                                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
                                        filter: 'blur(15px)',
                                    }}
                                />
                            </motion.div>

                            {/* Welcome Text - Ultra Elegant */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                    delay: 1.2,
                                }}
                                className="mb-8 text-center"
                            >
                                <motion.div className="relative inline-block">
                                    {/* Subtle underline accent */}
                                    <motion.div
                                        className="absolute -bottom-1 left-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                                        initial={{ width: 0, x: '-50%' }}
                                        animate={{ width: '120%' }}
                                        transition={{
                                            duration: 1.8,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            delay: 2,
                                        }}
                                    />

                                    <motion.h3
                                        className="text-sm font-normal tracking-[0.3em] text-gray-500 sm:text-base md:text-lg"
                                        initial={{
                                            opacity: 0,
                                            y: 15,
                                            letterSpacing: '0.1em',
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            letterSpacing: '0.3em',
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            delay: 1.4,
                                        }}
                                    >
                                        WELCOME TO
                                    </motion.h3>
                                </motion.div>
                            </motion.div>

                            {/* Company Name - Clean & Professional */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                    delay: 1.8,
                                }}
                                className="mb-6 space-y-3 text-center"
                            >
                                {/* KRISTALIN - Clean Elegance */}
                                <motion.h1
                                    className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
                                    style={{
                                        color: '#1F2937',
                                        fontWeight: '300',
                                        letterSpacing: '-0.02em',
                                    }}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.95,
                                        filter: 'blur(4px)',
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        filter: 'blur(0px)',
                                    }}
                                    transition={{
                                        duration: 1.4,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                        delay: 2,
                                    }}
                                >
                                    KRISTALIN
                                </motion.h1>

                                {/* EKA LESTARI - Golden Accent */}
                                <motion.div className="relative">
                                    {/* Minimal golden glow */}
                                    <motion.div
                                        className="absolute inset-0 -z-10 opacity-20 blur-3xl"
                                        style={{
                                            background: 'radial-gradient(ellipse 100% 40%, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
                                        }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 0.2, scale: 1 }}
                                        transition={{
                                            duration: 2,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            delay: 2.4,
                                        }}
                                    />

                                    <motion.h2
                                        className="relative text-xl font-normal tracking-wide sm:text-2xl md:text-3xl lg:text-4xl"
                                        style={{
                                            background: 'linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #DAA520 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            fontWeight: '400',
                                        }}
                                        initial={{
                                            opacity: 0,
                                            scale: 0.95,
                                            filter: 'blur(4px)',
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            filter: 'blur(0px)',
                                        }}
                                        transition={{
                                            duration: 1.4,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            delay: 2.3,
                                        }}
                                    >
                                        EKA LESTARI
                                    </motion.h2>
                                </motion.div>

                                {/* Tagline - Refined */}
                                <motion.p
                                    className="mt-8 text-sm font-normal tracking-wide text-gray-600 sm:text-base md:text-lg"
                                    style={{
                                        fontWeight: '400',
                                        lineHeight: '1.6',
                                    }}
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 1,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                        delay: 2.6,
                                    }}
                                >
                                    Trusted Gold Mining Company{' '}
                                    <motion.span
                                        className="font-medium"
                                        style={{
                                            color: '#B8860B',
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 2.8,
                                        }}
                                    >
                                        Since 1989
                                    </motion.span>
                                </motion.p>
                            </motion.div>

                            {/* Loading Progress */}
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                transition={{
                                    duration: 0.6,
                                    delay: 2.2,
                                }}
                                className="mt-8 w-48"
                            >
                                <div className="h-0.5 overflow-hidden rounded-full bg-gray-200">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{
                                            background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)',
                                        }}
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{
                                            duration: 1.2,
                                            ease: [0.22, 1, 0.36, 1],
                                            delay: 2.4,
                                        }}
                                    />
                                </div>

                                {/* Loading text */}
                                <motion.p
                                    className="mt-3 text-center text-xs font-medium text-gray-500"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: 2,
                                        ease: 'easeInOut',
                                        repeat: Infinity,
                                        delay: 2.6,
                                    }}
                                >
                                    Loading...
                                </motion.p>
                            </motion.div>

                            {/* Subtle accent elements */}
                            <motion.div
                                className="absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-yellow-400/40"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 0.6, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    ease: 'easeInOut',
                                    repeat: Infinity,
                                    delay: 2,
                                }}
                            />

                            <motion.div
                                className="absolute right-1/4 bottom-1/4 h-1 w-1 rounded-full bg-yellow-400/40"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 0.6, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    ease: 'easeInOut',
                                    repeat: Infinity,
                                    delay: 2.5,
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    };

    // Main Content
    return (
        <div className="welcome-page relative flex min-h-screen flex-col overflow-x-hidden bg-white">
            {/* Loading Screen */}
            <AnimatePresence>{showLoadingScreen && <LoadingScreen />}</AnimatePresence>

            {/* Header - Hidden during loading */}
            <AnimatePresence>
                {!showLoadingScreen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                    >
                        <Header sticky={true} transparent={false} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-1 flex-col overflow-hidden pt-16 sm:pt-20">
                {/* Main Content with Elegant Fade In */}
                <AnimatePresence>
                    {!showLoadingScreen && (
                        <motion.div
                            className="flex flex-1 flex-col"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
                        >
                            {/* Feedback Form Modal */}
                            {showFeedbackForm && <InternalFeedbackModal onClose={() => setShowFeedbackForm(false)} />}

                            {/* Floating Feedback Button */}
                            <FloatingFeedbackButton onClick={() => setShowFeedbackForm(true)} />

                            {/* Hero Section - top half of viewport on desktop */}
                            <section className="flex h-auto flex-col lg:h-[48vh] lg:flex-row">
                                {/* Left Section - Background putih bersih tanpa elemen dekoratif */}
                                <div className="relative flex h-full w-full flex-col justify-center bg-white p-6 sm:p-8 lg:w-1/2 lg:p-16">
                                    <div
                                        className={`relative z-10 transition-all duration-1000 ${
                                            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                                        }`}
                                    >
                                        {/* Konten Kristalin dengan animasi letter by letter hanya untuk "Introducing" */}
                                        <div className="relative">
                                            <div key={currentContent} className="animate-containerFade">
                                                <h1 className="mb-6 text-center text-2xl leading-tight font-bold sm:text-center sm:text-3xl lg:text-left lg:text-4xl xl:text-5xl">
                                                    {/* Introducing - Letter by Letter Animation */}
                                                    <div className="inline-block text-gray-800">
                                                        {contentSets[currentContent].title1.split('').map((letter: string, index: number) => (
                                                            <motion.span
                                                                key={index}
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 20,
                                                                    scale: 0.8,
                                                                    filter: 'blur(4px)',
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                    scale: 1,
                                                                    filter: 'blur(0px)',
                                                                }}
                                                                transition={{
                                                                    duration: 0.8,
                                                                    ease: [0.22, 1, 0.36, 1],
                                                                    delay: 0.5 + index * 0.12, // Staggered delay per letter (lebih lama)
                                                                }}
                                                                className="inline-block"
                                                            >
                                                                {letter === ' ' ? '\u00A0' : letter}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                    <br />
                                                    {/* Kristalin Ekalestari - Tetap seperti sebelumnya */}
                                                    <div
                                                        className="animate-staggeredFadeScale inline-block delay-200"
                                                        style={{
                                                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            backgroundClip: 'text',
                                                        }}
                                                    >
                                                        {contentSets[currentContent].title2}
                                                    </div>
                                                </h1>
                                            </div>
                                        </div>

                                        {/* Subtitle dengan warna abu-abu terang */}
                                        <div className="relative">
                                            <p
                                                key={`subtitle-${currentContent}`}
                                                className="animate-staggeredFadeScale mb-6 text-center text-sm text-gray-600 delay-400 sm:text-center sm:text-base lg:text-left lg:text-lg"
                                            >
                                                {contentSets[currentContent].subtitle}
                                            </p>
                                        </div>

                                        {/* Buttons - responsive alignment */}
                                        <div className="mt-6 w-full">
                                            <div className="button-container flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-4 md:flex-row md:justify-center md:gap-4 lg:flex-row lg:justify-start lg:gap-4">
                                                <button
                                                    className="flex h-12 w-full max-w-[280px] cursor-pointer items-center justify-center rounded-xl border-none bg-gradient-to-r from-yellow-400 to-amber-500 px-7 py-3.5 text-base font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-amber-500 hover:to-orange-500 hover:shadow-xl sm:w-auto sm:min-w-[180px] md:w-auto md:min-w-[180px] lg:w-auto lg:min-w-[180px]"
                                                    onClick={() => (window.location.href = '/about#about-kristalin')}
                                                >
                                                    {t('pages.welcome.buttons.learn_more')}
                                                </button>

                                                <button
                                                    className="relative flex h-12 w-full max-w-[280px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-yellow-400 bg-transparent px-7 py-3.5 text-base font-semibold text-gray-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:text-gray-900 hover:shadow-lg sm:w-auto sm:min-w-[180px] md:w-auto md:min-w-[180px] lg:w-auto lg:min-w-[180px]"
                                                    onClick={() => setShowFeedbackForm(true)}
                                                >
                                                    {t('pages.welcome.buttons.send_feedback')}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Konten tanpa elemen dekoratif */}
                                        <div className="relative"></div>
                                    </div>
                                </div>

                                {/* Right Section - CSR Card dengan gambar papua-children.png */}
                                <Link
                                    href="/csr"
                                    className="relative flex h-full min-h-[400px] w-full cursor-pointer flex-col justify-end overflow-hidden bg-gray-100 p-6 text-white no-underline sm:p-8 lg:min-h-0 lg:w-1/2 lg:p-12"
                                    onMouseEnter={() => setHoveredCard(4)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Background Image - papua-children.png */}
                                    <img
                                        src="/papua-children.png"
                                        alt="CSR - Papua Children"
                                        className={`absolute top-0 left-0 h-full w-full object-cover transition-transform duration-500 ${
                                            hoveredCard === 4 ? 'scale-105' : 'scale-100'
                                        }`}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />

                                    {/* Dark overlay untuk readability text */}
                                    <div className="absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                                    <div className="relative z-10">
                                        <div className="mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm">
                                            {t('pages.welcome.csr.category')}
                                        </div>
                                        <h3
                                            className={`mb-4 text-2xl leading-tight font-bold transition-transform duration-300 sm:text-3xl lg:text-4xl ${
                                                hoveredCard === 4 ? 'translate-x-2' : 'translate-x-0'
                                            }`}
                                        >
                                            {t('pages.welcome.csr.title')}
                                        </h3>
                                        <span
                                            className={`text-base font-medium underline transition-colors duration-300 ${
                                                hoveredCard === 4 ? 'text-yellow-400' : 'text-white'
                                            }`}
                                        >
                                            {t('pages.welcome.buttons.discover_more')}
                                        </span>
                                    </div>
                                </Link>
                            </section>

                            {/* Bottom Grid - fills remaining height and touches footer on desktop */}
                            <section className="flex flex-1 flex-col bg-white lg:flex-row">
                                {/* Portfolio Card - 50% width, gambar asli tanpa overlay warna */}
                                <div
                                    className="relative flex min-h-[300px] w-full flex-1 cursor-pointer flex-col justify-end overflow-hidden p-6 text-white sm:p-8 lg:w-1/2 lg:p-8"
                                    onMouseEnter={() => setHoveredCard(0)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    onClick={() => (window.location.href = '/line-of-business')}
                                >
                                    {/* Background Image tanpa filter warna */}
                                    <img
                                        src="https://web-assets.bcg.com/56/d2/d0e00f1a4355852a4bb364c4e513/valuecreationinmining-heroimage.jpg"
                                        alt={t('pages.welcome.portfolio_alt')}
                                        className={`absolute top-0 left-0 h-full w-full object-cover transition-transform duration-500 ${
                                            hoveredCard === 0 ? 'scale-105' : 'scale-100'
                                        }`}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />

                                    {/* Dark overlay untuk readability text */}
                                    <div className="absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                                    <div className="relative z-10">
                                        <div className="mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm">
                                            {t('pages.welcome.portfolio.category')}
                                        </div>
                                        <h3
                                            className={`mb-4 text-xl font-bold transition-transform duration-300 sm:text-2xl lg:text-3xl ${
                                                hoveredCard === 0 ? 'translate-x-2' : 'translate-x-0'
                                            }`}
                                        >
                                            {t('pages.welcome.portfolio.title')}
                                        </h3>
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                    </div>
                                </div>

                                {/* Business Activities Card - 25% width, gambar asli tanpa overlay warna */}
                                <Link
                                    href="/business-activity"
                                    className="relative flex min-h-[300px] w-full flex-1 cursor-pointer flex-col justify-end overflow-hidden p-6 text-white no-underline sm:p-8 lg:w-1/4 lg:p-8"
                                    onMouseEnter={() => setHoveredCard(1)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Background Image tanpa filter warna */}
                                    <img
                                        src="https://i0.wp.com/startuptipsdaily.com/wp-content/uploads/2017/06/mining-business-ideas-and-opportunity.jpg?fit=3072%2C2048&ssl=1"
                                        alt={t('pages.welcome.business_activities_alt')}
                                        className={`absolute top-0 left-0 h-full w-full object-cover transition-transform duration-500 ${
                                            hoveredCard === 1 ? 'scale-105' : 'scale-100'
                                        }`}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />

                                    {/* Dark overlay untuk readability text */}
                                    <div className="absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                                    <div className="relative z-10">
                                        <h3
                                            className={`mb-4 text-lg leading-tight font-bold transition-transform duration-300 sm:text-xl lg:text-2xl ${
                                                hoveredCard === 1 ? 'translate-x-2' : 'translate-x-0'
                                            }`}
                                        >
                                            {t('pages.welcome.business_activities.title')}
                                        </h3>
                                        <span
                                            className={`text-sm font-medium underline transition-colors duration-300 ${
                                                hoveredCard === 1 ? 'text-yellow-400' : 'text-white'
                                            }`}
                                        >
                                            {t('pages.welcome.business_activities.find_out_more')}
                                        </span>
                                    </div>
                                </Link>

                                {/* News Card - 25% width, warna emas konsisten */}
                                <Link
                                    href="/news"
                                    className="relative flex min-h-[300px] w-full flex-1 cursor-pointer flex-col justify-between bg-yellow-400 p-6 no-underline sm:p-8 lg:w-1/4 lg:p-8"
                                    onMouseEnter={() => setHoveredCard(2)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Background Image - Hidden by default, shown on hover */}
                                    <div
                                        className={`absolute top-0 right-0 bottom-0 left-0 transition-opacity duration-700 ${
                                            hoveredCard === 2 ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                        <img
                                            src={newsData[currentNews].imageUrl}
                                            alt={newsData[currentNews].title}
                                            className="h-full w-full object-cover"
                                        />
                                        {/* Dark overlay for text readability */}
                                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/70 transition-all duration-700" />
                                    </div>

                                    {/* Top Section - Header */}
                                    <div className="relative z-10 mb-4">
                                        <div className="flex items-center justify-between">
                                            <div
                                                className={`text-xl font-bold transition-all duration-500 sm:text-2xl lg:text-3xl ${
                                                    hoveredCard === 2 ? 'scale-110 text-white' : 'scale-100 text-gray-800'
                                                }`}
                                            >
                                                {t('pages.welcome.news.title_short')}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length);
                                                    }}
                                                    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent transition-all duration-300 hover:scale-110 hover:bg-black/20 ${
                                                        hoveredCard === 2 ? 'text-white' : 'text-gray-800'
                                                    }`}
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setCurrentNews((prev) => (prev + 1) % newsItems.length);
                                                    }}
                                                    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent transition-all duration-300 hover:scale-110 hover:bg-black/20 ${
                                                        hoveredCard === 2 ? 'text-white' : 'text-gray-800'
                                                    }`}
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle Section - Content dengan berita Kristalin */}
                                    <div className="relative z-10 flex flex-1 flex-col justify-center">
                                        <div key={currentNews} className="mb-4 translate-y-0 transform transition-all duration-500">
                                            {/* Date */}
                                            <div
                                                className={`mb-2 text-xs font-medium opacity-80 transition-colors duration-500 sm:text-sm ${
                                                    hoveredCard === 2 ? 'text-gray-300' : 'text-gray-600'
                                                }`}
                                            >
                                                {newsItems[currentNews].date}
                                            </div>

                                            {/* Title dengan line clamp */}
                                            <div
                                                className={`mb-2 line-clamp-3 text-sm leading-tight font-bold transition-colors duration-500 sm:text-base lg:text-lg ${
                                                    hoveredCard === 2 ? 'text-white' : 'text-gray-800'
                                                }`}
                                            >
                                                {newsItems[currentNews].title}
                                            </div>

                                            {/* Description dengan line clamp */}
                                            <div
                                                className={`line-clamp-2 text-xs leading-relaxed opacity-90 transition-colors duration-500 sm:text-sm ${
                                                    hoveredCard === 2 ? 'text-gray-200' : 'text-gray-600'
                                                }`}
                                            >
                                                {newsItems[currentNews].excerpt}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Section - View button */}
                                    <div
                                        className={`relative z-10 border-t pt-4 transition-colors duration-500 ${
                                            hoveredCard === 2 ? 'border-white/20' : 'border-black/10'
                                        }`}
                                    >
                                        <div
                                            className={`flex items-center text-sm font-semibold transition-all duration-300 sm:text-base ${
                                                hoveredCard === 2 ? 'text-white' : 'text-gray-800'
                                            }`}
                                        >
                                            <span>{t('pages.welcome.news.view_button')}</span>
                                            <div
                                                className={`ml-2 transition-transform duration-300 ${hoveredCard === 2 ? 'translate-x-1' : 'translate-x-0'}`}
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Navigation dots - tanpa dot kotak */}
                                    <div className="absolute right-4 bottom-4 z-10 flex gap-2 lg:right-6 lg:bottom-6">
                                        {[...Array(4)].map((_, index) => (
                                            <div
                                                key={index}
                                                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                                                    index === currentNews
                                                        ? hoveredCard === 2
                                                            ? 'bg-white'
                                                            : 'bg-gray-800'
                                                        : hoveredCard === 2
                                                          ? 'bg-white/30'
                                                          : 'bg-gray-800/30'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </Link>
                            </section>

                            {/* Footer moved outside animated block */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {!showLoadingScreen && <Footer />}

            {/* Premium Staggered Animation Styles */}
            <style
                dangerouslySetInnerHTML={{
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

          /* Custom scrollbar styling */
          .overflow-y-auto::-webkit-scrollbar {
            width: 8px;
          }

          .overflow-y-auto::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }

          /* Enhanced input focus states */
          input:focus, select:focus, textarea:focus {
            box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
          }

          /* File upload hover effects */
          .border-dashed:hover {
            border-color: #f59e0b;
            background-color: #fef3c7;
          }

          /* Button hover effects */
          button:hover {
            transform: translateY(-1px);
          }

          button:active {
            transform: translateY(0);
          }

          /* Tab animation */
          .border-b-3 {
            border-bottom-width: 3px;
          }

          /* Modal backdrop */
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }

          /* Mobile responsive improvements */
          @media (max-width: 640px) {
            .line-clamp-2 {
              -webkit-line-clamp: 2;
            }

            .line-clamp-3 {
              -webkit-line-clamp: 2;
            }
          }

          /* Additional responsive utilities */
          @media (max-width: 1024px) {
            .lg\\:h-\\[400px\\] {
              height: auto;
              min-height: 400px;
            }

            .lg\\:h-\\[300px\\] {
              height: auto;
              min-height: 300px;
            }
          }

          @media (max-width: 768px) {
            .md\\:h-\\[350px\\] {
              height: auto;
              min-height: 350px;
            }

            .md\\:h-\\[250px\\] {
              height: auto;
              min-height: 250px;
            }
          }

          /* Responsive section heights */
          @media (max-width: 1023px) {
            section {
              height: auto !important;
            }

            section > div {
              min-height: 300px;
            }
          }

          /* Custom responsive button layout - Desktop left, mobile center */
          @media (max-width: 639px) {
            /* Mobile phones - buttons stacked vertically, centered */
            .button-container {
              flex-direction: column !important;
              align-items: center !important;
              justify-content: center !important;
            }
          }

          @media (min-width: 640px) and (max-width: 1023px) {
            /* Tablets (iPad, iPad Air, etc.) - buttons horizontal, centered */
            .button-container {
              flex-direction: row !important;
              align-items: center !important;
              justify-content: center !important;
              gap: 1rem !important;
            }
          }

          @media (min-width: 1024px) {
            /* Desktop - buttons horizontal, left-aligned */
            .button-container {
              flex-direction: row !important;
              align-items: center !important;
              justify-content: flex-start !important;
              gap: 1rem !important;
            }
          }

          /* Responsive button alignment */
          .button-container {
            align-items: center !important;
          }

          @media (min-width: 1024px) {
            .button-container {
              justify-content: flex-start !important;
            }
          }

          @media (max-width: 640px) {
            section > div {
              min-height: 250px;
            }

            .text-2xl {
              font-size: 1.75rem;
            }

            .text-3xl {
              font-size: 2rem;
            }

            .text-4xl {
              font-size: 2.25rem;
            }
          }

          /* Smooth transitions for all interactive elements */
          * {
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          }

          /* Enhanced hover states for cards */
          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          /* Image optimization for different screen sizes */
          img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }

          /* Typography responsive scaling */
          @media (max-width: 480px) {
            h1 {
              line-height: 1.1;
            }

            h2, h3 {
              line-height: 1.2;
            }

            p {
              line-height: 1.5;
            }
          }

          /* Loading states */
          .loading {
            opacity: 0.7;
            pointer-events: none;
          }

          /* Focus states for accessibility */
          *:focus {
            outline: 2px solid #fbbf24;
            outline-offset: 2px;
          }

          /* Print styles */
          @media print {
            .no-print {
              display: none !important;
            }

            * {
              color: black !important;
              background: white !important;
            }
          }

          /* High contrast mode support */
          @media (prefers-contrast: high) {
            .text-gray-600 {
              color: #000000 !important;
            }

            .text-gray-800 {
              color: #000000 !important;
            }

            .bg-yellow-400 {
              background-color: #000000 !important;
              color: #ffffff !important;
            }
          }

          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          /* Dark mode support (if needed in future) */
          @media (prefers-color-scheme: dark) {
            .dark-mode-ready {
              background-color: #1f2937;
              color: #f9fafb;
            }
          }

          /* Performance optimizations */
          .will-change-transform {
            will-change: transform;
          }

          .will-change-opacity {
            will-change: opacity;
          }

          /* GPU acceleration for smooth animations */
          .gpu-accelerated {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000;
          }

          /* Perspective utilities for 3D effects */
          .perspective-1000 {
            perspective: 1000px;
          }

          .perspective-500 {
            perspective: 500px;
          }

          /* Enhanced drop shadow for premium feel */
          .drop-shadow-premium {
            filter: drop-shadow(0 25px 50px rgba(251, 191, 36, 0.2));
          }

          /* Smooth blur transitions */
          .blur-transition {
            transition: filter 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          /* Shift floating feedback button when mobile menu is open */
          .floating-feedback-button { transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
          body.mobile-menu-open .floating-feedback-button { right: 21rem !important; }
          @media (min-width: 640px) { /* match drawer sm:w-96 */
            body.mobile-menu-open .floating-feedback-button { right: 25rem !important; }
          }

          /* Floating animation keyframes */
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          /* Particle animation keyframes */
          @keyframes particle-float {
            0% {
              transform: translateY(0px) scale(0);
              opacity: 0;
            }
            50% {
              transform: translateY(-20px) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-40px) scale(0);
              opacity: 0;
            }
          }

          .animate-particle {
            animation: particle-float 4s ease-in-out infinite;
          }

          /* Gradient text animation */
          @keyframes gradient-shift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animate-gradient-text {
            animation: gradient-shift 3s ease infinite;
          }

          /* Enhanced logo rotation */
          @keyframes logo-float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-5px) rotate(180deg);
            }
          }

          .animate-logo-float {
            animation: logo-float 8s ease-in-out infinite;
          }

          /* Premium glow animation */
          @keyframes premium-glow {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }

          .animate-premium-glow {
            animation: premium-glow 4s ease-in-out infinite;
          }

          /* Loading bar animation */
          @keyframes loading-pulse {
            0%, 100% {
              opacity: 0.7;
            }
            50% {
              opacity: 1;
            }
          }

          .animate-loading-pulse {
            animation: loading-pulse 2s ease-in-out infinite;
          }
        `,
                }}
            />
        </div>
    );
};

export default Welcome;
