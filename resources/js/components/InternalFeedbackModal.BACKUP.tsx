/**
 * BACKUP FILE - Internal Feedback System Components
 *
 * File ini berisi:
 * - InternalFeedbackModal component
 * - FloatingFeedbackButton component
 *
 * Untuk menggunakan kembali:
 * 1. Copy component yang dibutuhkan
 * 2. Import di welcome.tsx atau page lain
 * 3. Add state: const [showFeedbackForm, setShowFeedbackForm] = useState(false);
 * 4. Add modal: {showFeedbackForm && <InternalFeedbackModal onClose={() => setShowFeedbackForm(false)} />}
 * 5. Add button: <FloatingFeedbackButton onClick={() => setShowFeedbackForm(true)} />
 *
 * Last backup: 2025-11-11
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useTranslation } from '@/hooks/useTranslation';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

export const InternalFeedbackModal = ({ onClose }: { onClose: () => void }) => {
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
                {/* Header */}
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
                                {/* Form fields... (Complete component dari welcome.tsx original) */}
                                {/* ... rest of the form ... */}
                            </form>
                        </div>
                    )}

                    {/* Track Status Tab */}
                    {activeTab === 'track' && <div className="space-y-6">{/* ... track content ... */}</div>}
                </div>
            </div>
        </div>
    );
};

export const FloatingFeedbackButton = ({ onClick }: { onClick: () => void }) => {
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
