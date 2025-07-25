import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { Link } from "@inertiajs/react";
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
  }
];

const PlaceholderImg = ({ text }: { text: string }) => (
  <svg width="100%" height="100%" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="600" height="400" fill="#e5e7eb" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fill="#6b7280">{text}</text>
  </svg>
);

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
  const [trackResult, setTrackResult] = useState<null | any>(null);
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
  function generateTicketNumber() {
    const prefix = 'TKT-2025-';
    const number = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
    return prefix + number;
  }
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

    // Ambil CSRF token dari meta tag
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
    setFileNames(fileList.map(f => f.name).join(', '));
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden relative animate-containerFade" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-gray-400 hover:text-yellow-500 bg-gray-100 hover:bg-yellow-100 rounded-full w-10 h-10 flex items-center justify-center z-10 transition-all duration-200">
          <span className="text-2xl">×</span>
        </button>
        <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 p-6 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center drop-shadow">Internal Feedback System</h1>
          <p className="text-yellow-100 text-center mt-1">Secure Channel for Employee Feedback and Complaints</p>
        </div>
        <div className="bg-gray-50 border-b border-gray-200 px-6">
          <nav className="flex space-x-4 justify-center">
            <button onClick={() => { setActiveTab('report'); setShowTicket(false); }} className={`py-3 px-6 text-base font-semibold rounded-t-lg transition-all duration-200 focus:outline-none ${activeTab === 'report' ? 'text-yellow-600 border-b-4 border-yellow-500 bg-white shadow' : 'text-gray-500 hover:text-yellow-700'}`}>Submit Report</button>
            <button onClick={() => setActiveTab('track')} className={`py-3 px-6 text-base font-semibold rounded-t-lg transition-all duration-200 focus:outline-none ${activeTab === 'track' ? 'text-yellow-600 border-b-4 border-yellow-500 bg-white shadow' : 'text-gray-500 hover:text-yellow-700'}`}>Track Status</button>
          </nav>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-180px)]">
          {activeTab === 'report' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg text-blue-800 text-sm">
                <strong>Anonymous Report:</strong> Your identity is fully protected. The system does not store any data that can trace back to individual users.
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">Report Category <span className="text-red-500">*</span></label>
                  <select id="category" required value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300">
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
                  <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-1">Related Department (Optional)</label>
                  <select id="department" value={department} onChange={e => setDepartment(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Priority Level <span className="text-red-500">*</span></label>
                  <div className="flex gap-3 flex-wrap">
                    {['low', 'medium', 'high', 'urgent'].map(level => (
                      <label key={level} className={`flex-1 min-w-[100px] cursor-pointer border-2 rounded-lg px-2 py-2 text-center font-medium transition-all duration-200 select-none ${priority === level ? (level === 'low' ? 'border-green-500 bg-green-50 text-green-700' : level === 'medium' ? 'border-yellow-400 bg-yellow-50 text-yellow-700' : level === 'high' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-red-500 bg-red-50 text-red-700') : 'border-gray-200 text-gray-500 hover:border-yellow-400'}`}>
                        <input type="radio" id={level} name="priority" value={level} checked={priority === level} onChange={e => setPriority(e.target.value)} className="hidden" />
                        {level === 'low' ? '📗 Low' : level === 'medium' ? '📙 Medium' : level === 'high' ? '📕 High' : '🚨 Urgent'}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">Report Title <span className="text-red-500">*</span></label>
                  <input type="text" id="subject" required value={subject} onChange={e => setSubject(e.target.value)} placeholder="Brief summary of the issue..." className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Detailed Description <span className="text-red-500">*</span></label>
                  <textarea id="description" required value={description} onChange={e => setDescription(e.target.value)} placeholder="Please describe the issue in detail, including chronology of events, impact experienced, and suggested solutions if any..." className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 resize-none" rows={5} />
                </div>
                <div>
                  <label htmlFor="incident-date" className="block text-sm font-semibold text-gray-700 mb-1">Incident Date (Optional)</label>
                  <input type="date" id="incident-date" value={incidentDate} onChange={e => setIncidentDate(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Supporting Evidence (Optional)</label>
                  <div className="mt-1 flex flex-col items-center justify-center px-6 pt-6 pb-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-yellow-400 transition-colors duration-300 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <input type="file" ref={fileInputRef} multiple accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                    <div className="text-gray-500 text-sm">
                      {files.length === 0 ? (
                        <><span role="img" aria-label="clip">📎</span> Click to upload files<br /><span className="text-xs">Format: JPG, PNG, PDF, DOC (Max 10MB)</span></>
                      ) : (
                        <><span role="img" aria-label="check">✅</span> {files.length} file(s) selected:<br /><span className="text-xs">{fileNames}</span></>
                      )}
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 mt-2">🚀 Submit Report</button>
              </form>
              {showTicket && (
                <div ref={ticketRef} className="bg-gradient-to-r from-green-400 to-teal-400 text-white p-6 rounded-xl text-center mt-6 animate-premiumFadeIn">
                  <h3 className="text-xl font-bold mb-2">✅ Report Successfully Submitted!</h3>
                  <p>Your Ticket Number:</p>
                  <div className="text-2xl font-bold my-2 tracking-widest">{ticketNumber}</div>
                  <p className="text-sm">Save this number to track your report status</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'track' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Track Report Status</h2>
              <p className="text-gray-600 mb-4">Enter your ticket number to view your report status</p>
              <div className="flex gap-3 items-end">
                <input type="text" value={trackInput} onChange={e => setTrackInput(e.target.value)} placeholder="Example: TKT-2025-001234" className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300" onKeyDown={e => { if (e.key === 'Enter') handleTrack(); }} />
                <button type="button" className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-600 transition-all duration-300" onClick={handleTrack}>Track</button>
              </div>
              {trackResult && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mt-4 shadow animate-premiumFadeIn">
                  {trackResult.error ? (
                    <>
                      <p className="text-red-600 font-semibold">{trackResult.error}</p>
                      <p className="mt-2 text-xs text-gray-500">Ticket number format: TKT-YYYY-XXXXXX</p>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-lg text-black">{trackResult.subject}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${trackResult.status === 'submitted' ? 'bg-blue-100 text-blue-700' : trackResult.status === 'review' ? 'bg-orange-100 text-orange-700' : trackResult.status === 'progress' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>{statusText[trackResult.status]}</span>
                      </div>
                      <div className="text-sm text-gray-700 space-y-1">
                        <div><strong>Ticket Number:</strong> {trackResult.ticket_number}</div>
                        <div><strong>Category:</strong> {trackResult.category}</div>
                        <div><strong>Priority:</strong> {priorityText[trackResult.priority]}</div>
                        <div><strong>Report Date:</strong> {trackResult.incident_date}</div>
                        <div><strong>Status:</strong> {statusText[trackResult.status]}</div>
                      </div>
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                        <strong>Latest Update:</strong> The relevant team is handling your report. Estimated resolution time: 3-5 business days.
                      </div>
                    </>
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
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-yellow-500 to-amber-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group"
    >
      <div className="flex items-center space-x-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h6a2 2 0 002-2V8M9 12h6" />
        </svg>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              Kirim Masukan
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Pulse Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full animate-ping opacity-20"></div>
    </motion.button>
  );
};

// Inline styles for the modal system
const tabBtnStyle: React.CSSProperties = { background: 'none', border: 'none', color: '#667eea', padding: '12px 25px', borderRadius: 25, cursor: 'pointer', fontSize: 16, fontWeight: 500, transition: 'all 0.3s', margin: '0 5px' };
const tabBtnActiveStyle: React.CSSProperties = { background: 'rgba(102,126,234,0.1)', transform: 'translateY(-2px)', boxShadow: '0 5px 15px rgba(102,126,234,0.1)' };
const tabContentStyle: React.CSSProperties = { background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.05)', animation: 'fadeIn 0.5s', marginBottom: 16 };
const formGroupStyle: React.CSSProperties = { marginBottom: 18 };
const inputStyle: React.CSSProperties = { width: '100%', padding: 12, border: '2px solid #e1e5e9', borderRadius: 10, fontSize: 16, background: '#f8f9fa', marginBottom: 0 };
const priorityBadgeStyle: React.CSSProperties = { display: 'block', padding: 12, border: '2px solid #e1e5e9', borderRadius: 10, textAlign: 'center', cursor: 'pointer', fontWeight: 500, marginBottom: 0, transition: 'all 0.3s' };
const priorityBadgeColors: Record<string, React.CSSProperties> = {
  low: { borderColor: '#28a745', color: '#28a745' },
  medium: { borderColor: '#ffc107', color: '#ffc107' },
  high: { borderColor: '#fd7e14', color: '#fd7e14' },
  urgent: { borderColor: '#dc3545', color: '#dc3545' },
};
const priorityBadgeCheckedStyle: React.CSSProperties = { background: 'currentColor', color: 'white', transform: 'translateY(-2px)', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' };
const fileUploadStyle: React.CSSProperties = { border: '2px dashed #e1e5e9', borderRadius: 10, padding: 20, textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer', marginBottom: 0 };
const submitBtnStyle: React.CSSProperties = { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '14px 32px', borderRadius: 50, fontSize: 18, fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', width: '100%', marginTop: 16 };
const ticketDisplayStyle: React.CSSProperties = { background: 'linear-gradient(135deg, #28a745, #20c997)', color: 'white', padding: 24, borderRadius: 15, textAlign: 'center', marginTop: 20 };
const anonymousNoticeStyle: React.CSSProperties = { background: 'rgba(40, 167, 69, 0.1)', border: '1px solid rgba(40, 167, 69, 0.3)', borderRadius: 10, padding: 16, marginBottom: 18, color: '#155724' };
const trackBtnStyle: React.CSSProperties = { background: '#667eea', color: 'white', border: 'none', padding: '12px 24px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s' };
const statusCardStyle: React.CSSProperties = { background: 'white', border: '1px solid #e1e5e9', borderRadius: 15, padding: 18, margin: '20px 0', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' };
const statusBadgeStyle: React.CSSProperties = { padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600 };
const statusBadgeColors: Record<string, React.CSSProperties> = {
  submitted: { background: '#e3f2fd', color: '#1976d2' },
  review: { background: '#fff3e0', color: '#f57c00' },
  progress: { background: '#f3e5f5', color: '#7b1fa2' },
  resolved: { background: '#e8f5e8', color: '#388e3c' },
};
const statCardStyle: React.CSSProperties = { background: 'white', padding: 18, borderRadius: 15, textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' };
const thStyle: React.CSSProperties = { background: '#f8f9fa', fontWeight: 600, color: '#555', padding: 12, textAlign: 'left' };
const tdStyle: React.CSSProperties = { padding: 12, textAlign: 'left', borderBottom: '1px solid #e1e5e9' };

const Welcome = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [currentNews, setCurrentNews] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentContent, setCurrentContent] = useState(0);

  // Menggunakan 4 berita terbaru dari newsData
  const newsItems = newsData.slice(0, 4).map(news => ({
    date: news.date,
    title: news.title,
    excerpt: news.excerpt
  }));

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
      <Header />

      {/* Feedback Form Modal */}
      {showFeedbackForm && <InternalFeedbackModal onClose={() => setShowFeedbackForm(false)} />}

      {/* Floating Feedback Button */}
      <FloatingFeedbackButton onClick={() => setShowFeedbackForm(true)} />

      {/* Hero Section */}
      <section className="flex-1 w-full flex flex-col md:flex-row bg-white relative py-6 md:py-8">
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
            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href="/about#about-kristalin"
                className="bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-600 hover:shadow-xl hover:scale-105 transition-all duration-300 text-base md:text-lg inline-block transform animate-staggeredFadeScale delay-600"
              >
                Learn More
              </a>
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="bg-white text-gray-800 border border-gray-300 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300 text-base md:text-lg inline-block transform animate-staggeredFadeScale delay-600"
              >
                Kirim Masukan
              </button>
            </div>
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
                  className="absolute inset-0 w-full h-full object-contain rounded-xl pointer-events-none"
                  style={{ background: "rgba(255,255,255,0.7)" }}
                />
              )}
            </AnimatePresence>
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
              <div className="text-base md:text-lg font-bold text-black group-hover:text-white leading-tight line-clamp-3 transition-all duration-500">
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

      {/* Footer */}
      <footer className="bg-[#232323] text-white text-left py-4 text-xs px-8">
        <div className="animate-pulse">
          © 2025 PT Kristalin Eka Lestari. All rights reserved.
        </div>
      </footer>

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
        `
      }} />
    </div>
  );
}

export default Welcome;