import * as React from "react";
import { useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

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

// --- CounterAnimation & Icon (from business-activity.tsx) ---
type CounterAnimationProps = {
  target: number;
  duration?: number;
  suffix?: string;
};
const CounterAnimation = ({ target, duration = 2500, suffix = "+" }: CounterAnimationProps) => {
  const [count, setCount] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  React.useEffect(() => {
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
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      onViewportEnter={() => setHasStarted(true)}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative"
    >
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-2 animate-shimmer">
        {Math.floor(count)}{suffix}
      </div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={hasStarted ? { backgroundPosition: ["-200% 0", "200% 0"] } : {}}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

type IconProps = { type: string; className?: string };
const icons: Record<string, React.ReactElement> = {
  trophy: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  location: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="17.657" cy="16.657" r="4" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  mining: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.341A8 8 0 116.343 2.257M22 22l-5-5" />
    </svg>
  ),
  analytics: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17v-6m4 6V7m4 10v-3" />
    </svg>
  ),
};
const Icon = ({ type, className = "w-8 h-8" }: IconProps) => {
  const icon = icons[type] || icons.trophy;
  if (React.isValidElement(icon) && icon.type === "svg") {
    return React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className });
  }
  return icon;
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    inquiry: '',
    attachment: null as File | null,
  });
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.inquiry.trim()) newErrors.inquiry = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setFileError('');
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"];
      if (!allowedTypes.includes(file.type)) {
        setFileError('File type not allowed.');
        setFileName('');
        setFormData(prev => ({ ...prev, attachment: null }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setFileError('File size must be less than 10MB.');
        setFileName('');
        setFormData(prev => ({ ...prev, attachment: null }));
        return;
      }
      setFileName(file.name);
      setFormData(prev => ({ ...prev, attachment: file }));
    } else {
      setFileName('');
      setFormData(prev => ({ ...prev, attachment: null }));
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setAlert(null);
    setTimeout(() => {
      setAlert({
        type: 'success',
        message: '✨ Your message has been sent successfully! We\'ll get back to you within 24 hours.'
      });
      setLoading(false);
      setFormData({ name: '', email: '', phone: '', subject: '', inquiry: '', attachment: null });
      setFileName('');
      setFileError('');
      setErrors({});
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', subject: '', inquiry: '', attachment: null });
    setFileName('');
    setFileError('');
    setErrors({});
    setAlert(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col bg-white relative overflow-x-hidden">
      <Header sticky={true} transparent={false} />
      <div className="flex-1 flex flex-col z-10 pt-20">  
        <div className="flex flex-col lg:flex-row flex-1 min-h-screen relative w-full max-w-none">
          {/* Form Section - Expands to fill available space */}
          <div className="w-full lg:flex-1 bg-white flex flex-col justify-start px-6 md:px-12 py-2 md:py-4 relative z-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-black/90 font-medium mb-1 mt-0 text-left"
            >
              Find out more information about Kristalin Eka Lestari
            </motion.p>
            
            {/* Form takes full available width */}
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
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
          <div className="w-full h-64 lg:w-[500px] lg:min-w-[500px] lg:h-auto relative bg-black overflow-hidden flex-shrink-0 z-10">
            <img
              src="/menara165-sore.webp"
              alt="Menara 165"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

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
              whileHover={{ scale: 1.05 }}
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
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-2xl font-normal text-white mb-4">Phone</h4>
              <span className="text-gray-300 text-lg">{contact.phone}</span>
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
              whileHover={{ scale: 1.05 }}
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
    </div>
  );
}