import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
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

const PlaceholderImg = ({ text }: { text: string }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        <rect width="600" height="400" fill="#e5e7eb" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fill="#6b7280">
            {text}
        </text>
    </svg>
);

// --- Modal diperbaiki agar tidak terpotong ---
const InternalFeedbackModal = ({ onClose }: { onClose: () => void }) => {
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
        submitted: 'Submitted',
        review: 'Under Review',
        progress: 'In Progress',
        resolved: 'Resolved',
    };
    const priorityText: Record<string, string> = {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        urgent: 'Urgent',
    };

    // Removed unused function to fix ESLint error

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
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-2 pt-20 backdrop-blur-sm sm:p-4 sm:pt-24" onClick={onClose}>
            <div
                className="animate-containerFade max-h-[calc(100vh-8rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-all duration-200 hover:bg-yellow-100 hover:text-yellow-500 sm:top-4 sm:right-4 sm:h-10 sm:w-10"
                >
                    <span className="text-xl sm:text-2xl">×</span>
                </button>
                <div className="rounded-t-2xl bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 p-4 pb-3 sm:rounded-t-3xl sm:p-6 sm:pb-4">
                    <h1 className="text-center text-xl font-bold text-white drop-shadow sm:text-2xl md:text-3xl">Internal Feedback System</h1>
                    <p className="mt-1 text-center text-sm text-yellow-100 sm:text-base">Secure Channel for Employee Feedback and Complaints</p>
                </div>
                <div className="border-b border-gray-200 bg-gray-50 px-4 sm:px-6">
                    <nav className="flex justify-center space-x-2 sm:space-x-4">
                        <button
                            onClick={() => {
                                setActiveTab('report');
                                setShowTicket(false);
                            }}
                            className={`rounded-t-lg px-3 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none sm:px-6 sm:py-3 sm:text-base ${activeTab === 'report' ? 'border-b-3 border-yellow-500 bg-white text-yellow-600 shadow sm:border-b-4' : 'text-gray-500 hover:text-yellow-700'}`}
                        >
                            Submit Report
                        </button>
                        <button
                            onClick={() => setActiveTab('track')}
                            className={`rounded-t-lg px-3 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none sm:px-6 sm:py-3 sm:text-base ${activeTab === 'track' ? 'border-b-3 border-yellow-500 bg-white text-yellow-600 shadow sm:border-b-4' : 'text-gray-500 hover:text-yellow-700'}`}
                        >
                            Track Status
                        </button>
                    </nav>
                </div>
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {activeTab === 'report' && (
                        <div className="space-y-3 sm:space-y-4">
                            <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4 text-sm text-blue-800">
                                <strong>Anonymous Report:</strong> Your identity is fully protected. The system does not store any data that can trace
                                back to individual users.
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-3 pb-6 sm:space-y-4">
                                <div>
                                    <label htmlFor="category" className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm">
                                        Report Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="category"
                                        required
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 sm:px-4 sm:py-3 sm:text-base"
                                    >
                                        <option value="">Select category...</option>
                                        <option value="workplace">Workplace Environment</option>
                                        <option value="safety">Safety & Health</option>
                                        <option value="harassment">Harassment/Discrimination</option>
                                        <option value="policy">Company Policy</option>
                                        <option value="management">Management Issues</option>
                                        <option value="facilities">Facilities</option>
                                        <option value="ethics">Work Ethics</option>
                                        <option value="suggestion">Improvement Suggestion</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="department" className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm">
                                        Related Department (Optional)
                                    </label>
                                    <select
                                        id="department"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 sm:px-4 sm:py-3 sm:text-base"
                                    >
                                        <option value="">Select department...</option>
                                        <option value="hr">Human Resources</option>
                                        <option value="finance">Finance</option>
                                        <option value="it">Information Technology</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="operations">Operations</option>
                                        <option value="management">Management</option>
                                        <option value="general">General</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm">
                                        Priority Level <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
                                        {['low', 'medium', 'high', 'urgent'].map((level) => (
                                            <label
                                                key={level}
                                                className={`cursor-pointer rounded-lg border-2 px-2 py-2 text-center text-xs font-medium transition-all duration-200 select-none sm:text-sm ${priority === level ? (level === 'low' ? 'border-green-500 bg-green-50 text-green-700' : level === 'medium' ? 'border-yellow-400 bg-yellow-50 text-yellow-700' : level === 'high' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-red-500 bg-red-50 text-red-700') : 'border-gray-200 text-gray-500 hover:border-yellow-400'}`}
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
                                                {level === 'low'
                                                    ? '📗 Low'
                                                    : level === 'medium'
                                                      ? '📙 Medium'
                                                      : level === 'high'
                                                        ? '📕 High'
                                                        : '🚨 Urgent'}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm">
                                        Report Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        required
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Brief summary of the issue..."
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 sm:px-4 sm:py-3 sm:text-base"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm">
                                        Detailed Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Please describe the issue in detail, including chronology of events, impact experienced, and suggested solutions if any..."
                                        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 sm:px-4 sm:py-3 sm:text-base"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="incident-date" className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm">
                                        Incident Date (Optional)
                                    </label>
                                    <input
                                        type="date"
                                        id="incident-date"
                                        value={incidentDate}
                                        onChange={(e) => setIncidentDate(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 sm:px-4 sm:py-3 sm:text-base"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm">
                                        Upload Supporting Evidence (Optional)
                                    </label>
                                    <div
                                        className="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-3 pt-3 pb-3 transition-colors duration-300 hover:border-yellow-400 sm:px-6 sm:pt-4 sm:pb-4"
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
                                        <div className="text-center text-xs text-gray-500 sm:text-sm">
                                            {files.length === 0 ? (
                                                <>
                                                    <span role="img" aria-label="clip">
                                                        📎
                                                    </span>{' '}
                                                    Click to upload files
                                                    <br />
                                                    <span className="text-xs">Format: JPG, PNG, PDF, DOC (Max 10MB)</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span role="img" aria-label="check">
                                                        ✅
                                                    </span>{' '}
                                                    {files.length} file(s) selected:
                                                    <br />
                                                    <span className="text-xs">{fileNames}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-yellow-600 hover:to-amber-600 sm:px-6 sm:py-3 sm:text-base"
                                >
                                    🚀 Submit Report
                                </button>
                            </form>
                            {showTicket && (
                                <div
                                    ref={ticketRef}
                                    className="animate-premiumFadeIn mt-3 rounded-xl bg-gradient-to-r from-green-400 to-teal-400 p-3 text-center text-white sm:p-4"
                                >
                                    <h3 className="mb-1 text-base font-bold sm:text-lg">✅ Report Successfully Submitted!</h3>
                                    <p className="text-sm">Your Ticket Number:</p>
                                    <div className="my-1 text-lg font-bold tracking-widest break-all sm:text-xl">{ticketNumber}</div>
                                    <p className="text-xs">Save this number to track your report status</p>
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 'track' && (
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <h2 className="mb-1 text-lg font-bold text-gray-800 sm:text-xl">Track Report Status</h2>
                                <p className="mb-3 text-sm text-gray-600 sm:text-base">Enter your ticket number to view your report status</p>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                                <input
                                    type="text"
                                    value={trackInput}
                                    onChange={(e) => setTrackInput(e.target.value)}
                                    placeholder="Example: TKT-2025-001234"
                                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 sm:px-4 sm:py-3 sm:text-base"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleTrack();
                                    }}
                                />
                                <button
                                    type="button"
                                    className="w-full rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white shadow transition-all duration-300 hover:bg-yellow-600 sm:w-auto sm:px-6 sm:py-3 sm:text-base"
                                    onClick={handleTrack}
                                >
                                    Track
                                </button>
                            </div>
                            {trackResult && (
                                <div className="animate-premiumFadeIn mt-3 rounded-xl border border-gray-200 bg-white p-3 shadow">
                                    {trackResult.error ? (
                                        <div>
                                            <p className="text-sm font-semibold text-red-600">{trackResult.error}</p>
                                            <p className="mt-1 text-xs text-gray-500">Ticket number format: TKT-YYYY-XXXXXX</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                                                <h3 className="line-clamp-2 flex-1 text-sm font-bold text-black sm:text-base">
                                                    {trackResult.subject}
                                                </h3>
                                                <span
                                                    className={`w-fit shrink-0 rounded-full px-2 py-1 text-xs font-bold ${trackResult.status === 'submitted' ? 'bg-blue-100 text-blue-700' : trackResult.status === 'review' ? 'bg-orange-100 text-orange-700' : trackResult.status === 'progress' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}
                                                >
                                                    {trackResult.status ? statusText[trackResult.status] : 'Unknown'}
                                                </span>
                                            </div>
                                            <div className="space-y-1 text-xs text-gray-700">
                                                <div>
                                                    <strong>Ticket Number:</strong> <span className="break-all">{trackResult.ticket_number}</span>
                                                </div>
                                                <div>
                                                    <strong>Category:</strong> {trackResult.category}
                                                </div>
                                                <div>
                                                    <strong>Priority:</strong> {trackResult.priority ? priorityText[trackResult.priority] : 'Unknown'}
                                                </div>
                                                <div>
                                                    <strong>Report Date:</strong> {trackResult.incident_date}
                                                </div>
                                                <div>
                                                    <strong>Status:</strong> {trackResult.status ? statusText[trackResult.status] : 'Unknown'}
                                                </div>
                                            </div>
                                            <div className="mt-2 rounded-lg bg-gray-50 p-2 text-xs text-gray-600">
                                                <strong>Latest Update:</strong> The relevant team is handling your report. Estimated resolution time:
                                                3-5 business days.
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
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="hover:shadow-3xl group fixed right-4 bottom-4 z-40 transform rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 p-3 text-white shadow-2xl transition-all duration-300 hover:scale-110 sm:right-6 sm:bottom-6 sm:p-4"
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
                            Kirim Masukan
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
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [currentNews, setCurrentNews] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [currentContent, setCurrentContent] = useState(0);

    // Menggunakan 4 berita terbaru dari newsData
    const newsItems = newsData.slice(0, 4).map((news) => ({
        date: news.date,
        title: news.title,
        excerpt: news.excerpt,
    }));

    const contentSets = [
        {
            title1: 'Introducing',
            title2: 'Kristalin Ekalestari',
            subtitle: 'Trusted gold mining company since 1989',
            titleColors: 'text-gray-900',
            title2Colors: 'bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent',
        },
        {
            title1: 'Trusted Partner',
            title2: 'Gold Exploration & Trading',
            subtitle: 'Since 1989, committed to sustainable gold mining in Papua.',
            titleColors: 'text-gray-900',
            title2Colors: 'text-yellow-600',
        },
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
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white">
            <Header sticky={true} transparent={false} />
            <div className="z-10 flex flex-1 flex-col pt-16 sm:pt-20">
                {/* Feedback Form Modal */}
                {showFeedbackForm && <InternalFeedbackModal onClose={() => setShowFeedbackForm(false)} />}

                {/* Floating Feedback Button */}
                <FloatingFeedbackButton onClick={() => setShowFeedbackForm(true)} />

                {/* Hero Section */}
                <section className="relative flex w-full flex-1 flex-col bg-white py-4 sm:py-6 lg:flex-row lg:py-8">
                    {/* Left Content */}
                    <div className="relative order-2 flex flex-1 flex-col justify-center px-4 sm:px-8 lg:order-1 lg:pr-4 lg:pl-20">
                        {/* Animated SVG Pattern */}
                        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-5" viewBox="0 0 600 400">
                            <defs>
                                <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <circle cx="20" cy="20" r="2" fill="#FFD700">
                                        <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
                                    </circle>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#dots)" />
                        </svg>

                        <div
                            className={`relative z-10 max-w-xl transition-all duration-1000 ${
                                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                            }`}
                        >
                            {/* Premium Staggered Animation with Fade + Scale */}
                            <div className="relative">
                                <div key={currentContent} className="animate-containerFade">
                                    <h1 className="mb-3 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl lg:text-4xl">
                                        <span
                                            className={`animate-staggeredFadeScale inline-block delay-0 ${contentSets[currentContent].titleColors}`}
                                        >
                                            {contentSets[currentContent].title1}
                                        </span>
                                        <br />
                                        <span
                                            className={`animate-staggeredFadeScale inline-block delay-200 ${contentSets[currentContent].title2Colors}`}
                                        >
                                            {contentSets[currentContent].title2}
                                        </span>
                                    </h1>
                                </div>
                            </div>

                            {/* Subtitle with Elegant Fade */}
                            <div className="relative">
                                <p
                                    key={`subtitle-${currentContent}`}
                                    className="animate-staggeredFadeScale mb-4 text-sm text-gray-700 delay-400 sm:text-base lg:text-lg"
                                >
                                    {contentSets[currentContent].subtitle}
                                </p>
                            </div>

                            {/* Button with Final Reveal */}
                            <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:gap-4">
                                <a
                                    href="/about#about-kristalin"
                                    className="animate-staggeredFadeScale transform rounded-lg bg-yellow-500 px-6 py-2 text-center text-sm font-bold text-gray-900 shadow-lg transition-all delay-600 duration-300 hover:scale-105 hover:bg-yellow-600 hover:shadow-xl sm:px-8 sm:py-3 sm:text-base lg:text-lg"
                                >
                                    Learn More
                                </a>
                                <button
                                    onClick={() => setShowFeedbackForm(true)}
                                    className="animate-staggeredFadeScale transform rounded-lg border border-gray-300 bg-white px-6 py-2 text-center text-sm font-bold text-gray-800 shadow-lg transition-all delay-600 duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-xl sm:px-8 sm:py-3 sm:text-base lg:text-lg"
                                >
                                    Kirim Masukan
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="order-1 flex flex-1 items-center justify-center p-4 sm:p-6 lg:order-2 lg:p-0">
                        <div
                            className={`relative w-full max-w-md transition-all delay-400 duration-1000 lg:max-w-none ${
                                isLoaded ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-10 scale-95 opacity-0'
                            }`}
                        >
                            <img
                                src="/menara165.jpg"
                                alt="Menara 165"
                                className="hover:shadow-3xl mx-auto h-[200px] w-full max-w-[420px] rounded-xl object-cover object-top shadow-2xl transition-all duration-500 hover:scale-105 sm:h-[250px] lg:h-[320px]"
                            />
                            {/* Overlay logo dengan animasi, hanya saat currentContent === 0 */}
                            <AnimatePresence>
                                {currentContent === 0 && (
                                    <motion.img
                                        key="logo"
                                        src="https://kristalin.co.id/wp-content/uploads/2019/10/Logo-Kristalin.png"
                                        alt="Kristalin Logo"
                                        initial={{ opacity: 0, scale: 0.7, y: 30, rotate: -8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.7, y: -30, rotate: 8 }}
                                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        className="pointer-events-none absolute inset-0 h-full w-full rounded-xl object-contain"
                                        style={{ background: 'rgba(255,255,255,0.7)' }}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* Grid Section with enhanced animations */}
                <section className="flex min-h-[320px] w-full flex-col items-stretch bg-black lg:flex-row">
                    {/* Portfolio */}
                    <div
                        className="group relative flex min-h-[220px] flex-1 cursor-pointer flex-col justify-end overflow-hidden border-b border-gray-800 px-6 py-6 sm:min-h-[260px] sm:px-10 sm:py-8 lg:min-h-[320px] lg:border-r lg:border-b-0 lg:px-14 lg:py-10"
                        onMouseEnter={() => setHoveredCard(0)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => (window.location.href = '/line-of-business')}
                    >
                        <img
                            src="https://web-assets.bcg.com/56/d2/d0e00f1a4355852a4bb364c4e513/valuecreationinmining-heroimage.jpg"
                            alt="Our Portfolio"
                            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                                hoveredCard === 0 ? 'scale-110 opacity-60' : 'scale-100 opacity-40'
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
                        <div className="absolute inset-0 hidden h-full w-full" style={{ zIndex: 1 }}>
                            <PlaceholderImg text="Portfolio Image" />
                        </div>
                        <div className="relative z-10">
                            <div
                                className={`mb-1 text-xs tracking-widest text-gray-300 uppercase transition-all duration-300 ${
                                    hoveredCard === 0 ? 'text-yellow-300' : ''
                                }`}
                            >
                                Business Line
                            </div>
                            <div
                                className={`mb-2 text-xl font-bold text-white transition-all duration-300 sm:text-2xl lg:text-3xl ${
                                    hoveredCard === 0 ? 'translate-x-2 transform' : ''
                                }`}
                            >
                                Our Portfolio
                            </div>
                            <div
                                className={`mb-2 h-1 rounded bg-yellow-500 transition-all duration-300 ${
                                    hoveredCard === 0 ? 'w-12 sm:w-16' : 'w-8 sm:w-10'
                                }`}
                            ></div>
                        </div>
                    </div>

                    {/* Business Activities */}
                    <Link
                        href="/business-activity"
                        className="group relative flex min-h-[220px] flex-1 cursor-pointer flex-col justify-end overflow-hidden border-b border-gray-800 px-6 py-6 sm:min-h-[260px] sm:px-10 sm:py-8 lg:min-h-[320px] lg:border-r lg:border-b-0 lg:px-14 lg:py-10"
                        onMouseEnter={() => setHoveredCard(1)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <img
                            src="https://i0.wp.com/startuptipsdaily.com/wp-content/uploads/2017/06/mining-business-ideas-and-opportunity.jpg?fit=3072%2C2048&ssl=1"
                            alt="Business Activities"
                            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                                hoveredCard === 1 ? 'scale-110 opacity-60' : 'scale-100 opacity-40'
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
                        <div className="absolute inset-0 hidden h-full w-full" style={{ zIndex: 1 }}>
                            <PlaceholderImg text="Governance Image" />
                        </div>
                        <div className="relative z-10">
                            <div
                                className={`mb-2 text-xl font-bold text-white transition-all duration-300 sm:text-2xl lg:text-3xl ${
                                    hoveredCard === 1 ? 'translate-x-2 transform' : ''
                                }`}
                            >
                                Business Activities
                            </div>
                            <span
                                className={`mt-2 text-base text-white underline transition-all duration-300 hover:text-yellow-400 sm:text-lg lg:text-xl ${
                                    hoveredCard === 1 ? 'text-yellow-400' : ''
                                }`}
                            >
                                Find out more →
                            </span>
                        </div>
                    </Link>

                    {/* News with proper responsive sizing */}
                    <Link
                        href="/news"
                        className="group relative flex min-h-[280px] flex-1 cursor-pointer flex-col justify-between overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 px-6 py-6 transition-all duration-700 sm:min-h-[300px] sm:px-8 sm:py-8 lg:min-h-[320px] lg:px-12"
                        onMouseEnter={() => setHoveredCard(2)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        {/* Background Image - Hidden by default, shown on hover */}
                        <div className="absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100">
                            <img src={newsData[currentNews].imageUrl} alt={newsData[currentNews].title} className="h-full w-full object-cover" />
                            {/* Dark overlay for text readability */}
                            <div className="absolute inset-0 bg-black/60 transition-all duration-700 group-hover:bg-black/70"></div>
                        </div>

                        {/* Clean background - Visible by default, hidden on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent transition-all duration-700 group-hover:opacity-0"></div>

                        {/* Top Section - Header */}
                        <div className="relative z-10">
                            <div className="mb-4 flex items-center justify-between sm:mb-6">
                                <div
                                    className={`text-xl font-bold transition-all duration-500 sm:text-2xl lg:text-3xl ${
                                        hoveredCard === 2 ? 'scale-110 transform text-white' : 'text-gray-900'
                                    }`}
                                >
                                    News
                                </div>
                                <div className="flex gap-1 sm:gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length);
                                        }}
                                        className="hover:bg-opacity-20 flex h-7 w-7 transform items-center justify-center rounded-full text-black transition-all duration-300 group-hover:text-white hover:scale-110 hover:bg-black sm:h-8 sm:w-8"
                                    >
                                        <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setCurrentNews((prev) => (prev + 1) % newsItems.length);
                                        }}
                                        className="hover:bg-opacity-20 flex h-7 w-7 transform items-center justify-center rounded-full text-black transition-all duration-300 group-hover:text-white hover:scale-110 hover:bg-black sm:h-8 sm:w-8"
                                    >
                                        <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Middle Section - Content with improved spacing and text handling */}
                        <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center">
                            <div key={currentNews} className="transform space-y-2 transition-all duration-500 sm:space-y-3 lg:space-y-4">
                                {/* Date */}
                                <div className="text-xs font-medium text-gray-800 opacity-80 transition-all duration-500 group-hover:text-gray-200 sm:text-sm">
                                    {newsItems[currentNews].date}
                                </div>

                                {/* Title with line clamp */}
                                <div className="line-clamp-2 text-sm leading-tight font-bold text-black transition-all duration-500 group-hover:text-white sm:line-clamp-3 sm:text-base lg:text-lg">
                                    {newsItems[currentNews].title}
                                </div>

                                {/* Description with line clamp */}
                                <div className="line-clamp-2 text-xs leading-relaxed text-gray-900 opacity-90 transition-all duration-500 group-hover:text-gray-200 sm:line-clamp-3 sm:text-sm lg:text-base">
                                    {newsItems[currentNews].excerpt}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section - View button with proper spacing */}
                        <div className="relative z-10 mt-3 border-t border-black/10 pt-3 transition-all duration-500 group-hover:border-white/20 sm:mt-4 sm:pt-4 lg:mt-6">
                            <div className="group inline-flex items-center text-sm font-semibold text-black transition-all duration-300 group-hover:text-white sm:text-base lg:text-lg">
                                <span className="relative z-10">View</span>
                                <div className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent transition-all duration-500 group-hover:via-white/30"></div>
                    </Link>
                </section>

                {/* Footer */}
                <footer className="bg-[#232323] px-4 py-3 text-left text-xs text-white sm:px-8 sm:py-4 sm:text-sm">
                    <div className="animate-pulse">© 2025 PT Kristalin Eka Lestari. All rights reserved.</div>
                </footer>
            </div>

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
        `,
                }}
            />
        </div>
    );
};

export default Welcome;
