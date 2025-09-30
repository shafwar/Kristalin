import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useTranslation } from '../hooks/useTranslation';

const contact = {
    phone: '(021) 22978900',
    email: 'info@kristalin.co.id',
    location: 'ESQ Leadership Centre - 165 Tower',
    address: 'Menara 165 Lantai 21 A~C, Jl. TB Simatupang No.Kav 1, RT.3/RW.3, Cilandak Tim., Ps. Minggu, Kota Jakarta Selatan, DKI Jakarta 12560',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

// --- CounterAnimation & Icon (from business-activity.tsx) ---
// Removed unused components to fix ESLint errors

export default function ContactPage() {
    const { t } = useTranslation();
    const [scrollY, setScrollY] = useState(0);
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

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = t('pages.contact.form.validation.name_required');
        if (!formData.email.trim()) newErrors.email = t('pages.contact.form.validation.email_required');
        else if (!emailRegex.test(formData.email)) newErrors.email = t('pages.contact.form.validation.email_valid');
        if (!formData.subject) newErrors.subject = t('pages.contact.form.validation.subject_required');
        if (!formData.inquiry.trim()) newErrors.inquiry = t('pages.contact.form.validation.inquiry_required');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (file: File | null) => {
        setFileError('');
        if (file) {
            const allowedTypes = [
                'application/pdf',
                'image/jpeg',
                'image/png',
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            ];
            if (!allowedTypes.includes(file.type)) {
                setFileError(t('pages.contact.form.validation.file_type_error'));
                setFileName('');
                setFormData((prev) => ({ ...prev, attachment: null }));
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                setFileError(t('pages.contact.form.validation.file_size_error'));
                setFileName('');
                setFormData((prev) => ({ ...prev, attachment: null }));
                return;
            }
            setFileName(file.name);
            setFormData((prev) => ({ ...prev, attachment: file }));
        } else {
            setFileName('');
            setFormData((prev) => ({ ...prev, attachment: null }));
        }
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
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

        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('subject', formData.subject);
        form.append('message', formData.inquiry);
        if (formData.attachment) form.append('file', formData.attachment);

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        fetch('/contact-message', {
            method: 'POST',
            body: form,
            headers: {
                'X-CSRF-TOKEN': csrfToken || '',
            },
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.ok && data.success) {
                    setAlert({ type: 'success', message: t('pages.contact.form.messages.success') });
                    setFormData({ name: '', email: '', phone: '', subject: '', inquiry: '', attachment: null });
                    setFileName('');
                    setFileError('');
                    setErrors({});
                    if (fileInputRef.current) fileInputRef.current.value = '';
                } else {
                    setAlert({ type: 'error', message: data.error || t('pages.contact.form.messages.error') });
                }
                setLoading(false);
            })
            .catch(() => {
                setAlert({ type: 'error', message: t('pages.contact.form.messages.error') });
                setLoading(false);
            });
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
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white">
            <Header sticky={true} transparent={false} />
            <div className="z-10 flex flex-1 flex-col pt-20">
                <div className="relative flex min-h-screen w-full max-w-none flex-1 flex-col lg:flex-row">
                    {/* Form Section - Expands to fill available space */}
                    <div className="relative z-20 flex w-full flex-col justify-start bg-white px-6 py-2 md:px-12 md:py-4 lg:flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            className="mb-2 text-left"
                        >
                            <div className="mb-2 h-1 w-20 bg-gradient-to-r from-amber-400 to-yellow-500" />
                            <h1 className="mb-1 text-4xl font-bold md:text-5xl">
                                <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                                    {t('pages.contact.hero.title_line1')}
                                </span>{' '}
                                <span className="text-gray-800">{t('pages.contact.hero.title_line2')}</span>
                            </h1>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                            className="mt-0 mb-1 text-left font-medium text-black/90"
                        >
                            {t('pages.contact.hero.description')}
                        </motion.p>

                        {/* Form takes full available width */}
                        <motion.form
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            className="z-10 mb-4 w-full max-w-none rounded-2xl bg-white p-3 shadow-2xl md:p-5"
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
                                        className={`mb-4 w-full max-w-full rounded-lg px-3 py-2 text-center text-sm font-semibold shadow transition-all duration-300 ${
                                            alert.type === 'success'
                                                ? 'border border-green-300 bg-green-100 text-green-700'
                                                : 'border border-red-300 bg-red-100 text-red-700'
                                        }`}
                                        style={{ wordWrap: 'break-word', boxSizing: 'border-box' }}
                                        role="alert"
                                    >
                                        {alert.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="w-full">
                                    <Label htmlFor="name" className="text-base font-semibold text-gray-900">
                                        {t('pages.contact.form.labels.full_name')} {t('pages.contact.form.labels.required')}
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder={t('pages.contact.form.placeholders.name')}
                                        className={`mt-2 w-full bg-white text-gray-900 placeholder:text-gray-500 ${errors.name ? 'border-red-400' : ''}`}
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        aria-invalid={!!errors.name}
                                        aria-describedby="name-error"
                                        style={{ boxSizing: 'border-box' }}
                                    />
                                    {errors.name && (
                                        <div id="name-error" className="mt-1 text-xs text-red-500">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="email" className="text-base font-semibold text-gray-900">
                                        {t('pages.contact.form.labels.email')} {t('pages.contact.form.labels.required')}
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder={t('pages.contact.form.placeholders.email')}
                                        className={`mt-2 w-full bg-white text-gray-900 placeholder:text-gray-500 ${errors.email ? 'border-red-400' : ''}`}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        aria-invalid={!!errors.email}
                                        aria-describedby="email-error"
                                        style={{ boxSizing: 'border-box' }}
                                    />
                                    {errors.email && (
                                        <div id="email-error" className="mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-3 w-full">
                                <Label htmlFor="phone" className="text-base font-semibold text-gray-900">
                                    {t('pages.contact.form.labels.phone')}
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder={t('pages.contact.form.placeholders.phone')}
                                    className="mt-2 w-full bg-white text-gray-900 placeholder:text-gray-500"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    style={{ boxSizing: 'border-box' }}
                                />
                            </div>
                            <div className="mt-3 w-full">
                                <Label htmlFor="subject" className="text-base font-semibold text-gray-900">
                                    {t('pages.contact.form.labels.subject')} {t('pages.contact.form.labels.required')}
                                </Label>
                                <select
                                    id="subject"
                                    name="subject"
                                    required
                                    className={`mt-2 w-full rounded-md border bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-300 ${errors.subject ? 'border-red-400' : 'border-gray-300'}`}
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    aria-invalid={!!errors.subject}
                                    aria-describedby="subject-error"
                                    style={{ boxSizing: 'border-box' }}
                                >
                                    <option value="">{t('pages.contact.form.subject_options.select')}</option>
                                    <option value="General">{t('pages.contact.form.subject_options.general')}</option>
                                    <option value="Partnership">{t('pages.contact.form.subject_options.partnership')}</option>
                                    <option value="CSR">{t('pages.contact.form.subject_options.csr')}</option>
                                    <option value="Career">{t('pages.contact.form.subject_options.career')}</option>
                                </select>
                                {errors.subject && (
                                    <div id="subject-error" className="mt-1 text-xs text-red-500">
                                        {errors.subject}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 w-full">
                                <Label htmlFor="attachment" className="text-base font-semibold text-gray-900">
                                    {t('pages.contact.form.labels.attachment')}
                                </Label>
                                <div
                                    className={`mt-2 flex w-full max-w-full cursor-pointer items-center gap-3 rounded-md border-2 p-4 transition-all duration-200 hover:border-amber-300 hover:bg-gray-50 ${dragActive ? 'border-amber-400 bg-amber-50' : 'border-dashed border-gray-300'}`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={t('pages.contact.form.file_upload.upload_label')}
                                    style={{ boxSizing: 'border-box' }}
                                >
                                    <input
                                        ref={fileInputRef}
                                        id="attachment"
                                        name="attachment"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png,.ppt,.pptx"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                                    />
                                    {/* Upload Icon */}
                                    <div className="flex-shrink-0">
                                        {fileName ? (
                                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        {fileName ? (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-green-600">{fileName}</span>
                                                <button
                                                    type="button"
                                                    className="ml-2 text-xs text-red-500 hover:text-red-700 hover:underline"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleFileChange(null);
                                                    }}
                                                    aria-label={t('pages.contact.form.file_upload.remove')}
                                                >
                                                    {t('pages.contact.form.file_upload.remove')}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <div className="text-sm font-medium text-gray-600">{t('pages.contact.form.file_upload.drag_text')}</div>
                                                <div className="mt-1 text-xs text-gray-500">{t('pages.contact.form.file_upload.file_types')}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {fileError && <div className="mt-1 text-xs text-red-500">{fileError}</div>}
                            </div>
                            <div className="mt-3">
                                <Label htmlFor="inquiry" className="text-base font-semibold text-gray-900">
                                    {t('pages.contact.form.labels.inquiry')} {t('pages.contact.form.labels.required')}
                                </Label>
                                <textarea
                                    id="inquiry"
                                    name="inquiry"
                                    required
                                    placeholder={t('pages.contact.form.placeholders.inquiry')}
                                    rows={4}
                                    className={`mt-2 w-full rounded-md border bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-300 ${errors.inquiry ? 'border-red-400' : 'border-gray-300'}`}
                                    value={formData.inquiry}
                                    onChange={handleInputChange}
                                    aria-invalid={!!errors.inquiry}
                                    aria-describedby="inquiry-error"
                                />
                                {errors.inquiry && (
                                    <div id="inquiry-error" className="mt-1 text-xs text-red-500">
                                        {errors.inquiry}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 flex items-center">
                                <input type="checkbox" id="captcha" required className="mr-2" />
                                <label htmlFor="captcha" className="text-sm font-medium text-gray-900">
                                    {t('pages.contact.form.labels.captcha')}
                                </label>
                            </div>
                            <div className="mt-4 flex flex-col justify-end gap-4 md:flex-row">
                                <Button
                                    type="submit"
                                    className="h-12 w-full rounded-md bg-yellow-400 px-10 text-base font-bold text-black shadow transition-all duration-200 hover:bg-yellow-500 md:w-auto"
                                    disabled={loading}
                                >
                                    {loading ? <span className="animate-pulse">{t('pages.contact.form.buttons.submitting')}</span> : t('pages.contact.form.buttons.submit')}
                                </Button>
                                <Button
                                    type="button"
                                    className="h-12 w-full rounded-md bg-gray-200 px-10 text-base font-bold text-black shadow transition-all duration-200 hover:bg-gray-300 md:w-auto"
                                    onClick={handleReset}
                                    disabled={loading}
                                >
                                    {t('pages.contact.form.buttons.reset')}
                                </Button>
                            </div>
                        </motion.form>
                    </div>

                    {/* Image Section - Fixed width at right edge with Parallax */}
                    <div className="relative z-10 h-64 w-full flex-shrink-0 overflow-hidden bg-black lg:h-auto lg:w-[500px] lg:min-w-[500px]">
                        <div
                            className="absolute inset-0 h-full w-full"
                            style={{ transform: `translateY(${scrollY * 0.5}px)`, willChange: 'transform' }}
                        >
                            <img src="/menara165-sore.webp" alt={t('pages.contact.image_alt')} className="h-full w-full object-cover object-center" />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info Section */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="bg-black py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <motion.div variants={fadeInUp} transition={{ duration: 0.4, ease: 'easeInOut' }} className="mb-16 text-center">
                        <h2 className="mb-4 text-sm font-semibold tracking-[0.25em] text-gray-400">{t('pages.contact.contact_info.header')}</h2>
                        <div className="mx-auto mb-12 h-0.5 w-20 bg-yellow-600"></div>
                        <h3 className="text-4xl font-normal text-white md:text-5xl lg:text-6xl">{t('pages.contact.contact_info.title')}</h3>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                        {/* Phone */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4, ease: 'easeInOut' }}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                    rotate: 0,
                                    transition: {
                                        duration: 0.7,
                                        ease: 'easeInOut',
                                        rotate: { duration: 0.7 },
                                    },
                                }}
                                viewport={{ once: true }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 360,
                                    transition: { duration: 0.4 },
                                }}
                                className="mb-4 flex justify-center"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 shadow-lg">
                                    <svg className="h-8 w-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                                    </svg>
                                </div>
                            </motion.div>
                            <h4 className="mb-4 text-2xl font-normal text-white">{t('pages.contact.contact_info.phone')}</h4>
                            <span className="text-lg text-gray-300">{contact.phone}</span>
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4, ease: 'easeInOut' }}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                    rotate: 0,
                                    transition: {
                                        duration: 0.7,
                                        ease: 'easeInOut',
                                        rotate: { duration: 0.7 },
                                    },
                                }}
                                viewport={{ once: true }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 360,
                                    transition: { duration: 0.4 },
                                }}
                                className="mb-4 flex justify-center"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 shadow-lg">
                                    <svg className="h-8 w-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                                    </svg>
                                </div>
                            </motion.div>
                            <h4 className="mb-4 text-2xl font-normal text-white">{t('pages.contact.contact_info.email')}</h4>
                            <a href={`mailto:${contact.email}`} className="text-lg text-yellow-500 transition-colors hover:text-yellow-400">
                                {contact.email}
                            </a>
                        </motion.div>

                        {/* Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4, ease: 'easeInOut' }}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                    rotate: 0,
                                    transition: {
                                        duration: 0.7,
                                        ease: 'easeInOut',
                                        rotate: { duration: 0.7 },
                                    },
                                }}
                                viewport={{ once: true }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 360,
                                    transition: { duration: 0.4 },
                                }}
                                className="mb-4 flex justify-center"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 shadow-lg">
                                    <svg className="h-8 w-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                                    </svg>
                                </div>
                            </motion.div>
                            <h4 className="mb-4 text-2xl font-normal text-white">{t('pages.contact.contact_info.address')}</h4>
                            <div className="text-gray-300">
                                <div className="mb-2 font-semibold text-yellow-500">{contact.location}</div>
                                <div className="text-sm leading-relaxed">{contact.address}</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <Footer />
        </div>
    );
}
