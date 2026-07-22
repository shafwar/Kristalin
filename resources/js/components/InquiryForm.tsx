import { useTranslation } from '@/hooks/useTranslation';
import axios from 'axios';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

type InquiryFormProps = {
    type: 'B2C' | 'Investor';
    title?: string;
    subtitle?: string;
    hideHeader?: boolean;
    variant?: 'light' | 'dark';
};

export default function InquiryForm({ type, title, subtitle, hideHeader, variant = 'light' }: InquiryFormProps) {
    const { t } = useTranslation();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('submitting');

        const fd = new FormData(e.currentTarget);
        
        // Remove interest from FormData as it's not expected by controller, but we use it for subject/message
        const interest = fd.get('interest') as string;
        const phone = fd.get('phone') as string;
        const originalMessage = fd.get('message') as string;
        
        // Build new form data specifically for the controller
        const form = new FormData();
        form.append('name', fd.get('name') as string);
        form.append('email', fd.get('email') as string);
        form.append('subject', `[${type} Inquiry] ${interest}`);
        form.append('message', `Nomor WA/Telepon: ${phone}\nKetertarikan: ${interest}\n\nPesan Tambahan:\n${originalMessage}`);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            
            const res = await fetch('/contact-message', {
                method: 'POST',
                body: form,
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                },
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                e.currentTarget.reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    }

    return (
        <div className={`mx-auto w-full max-w-3xl rounded-3xl border p-6 shadow-lg sm:p-8 transition-colors ${
            variant === 'dark' ? 'border-stone-800 bg-stone-900/60 backdrop-blur-md' : 'border-gray-200 bg-white'
        }`}>
            {!hideHeader && (
                <div className="mb-8 text-center">
                    <h3 className={`text-2xl font-bold tracking-tight ${variant === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title || `Tanya Program ${type}`}</h3>
                    <p className={`mt-2 ${variant === 'dark' ? 'text-stone-400' : 'text-gray-600'}`}>{subtitle || 'Isi form di bawah ini dan tim kami akan segera menghubungi Anda.'}</p>
                </div>
            )}

            {status === 'success' ? (
                <div className="rounded-xl bg-green-50 p-6 text-center text-green-800">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h4 className="font-semibold text-green-900">{t('pages.inquiry_form.success_title') || 'Pesan Berhasil Terkirim!'}</h4>
                    <p className="mt-1 text-sm">{t('pages.inquiry_form.success_desc') || 'Terima kasih atas ketertarikan Anda. Tim kami akan merespons melalui Email atau WhatsApp.'}</p>
                    <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="mt-4 text-sm font-medium text-green-700 hover:text-green-800 underline"
                    >
                        {t('pages.inquiry_form.success_retry') || 'Kirim pesan lain'}
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="name" className={`text-sm font-medium ${variant === 'dark' ? 'text-stone-300' : 'text-gray-700'}`}>{t('pages.inquiry_form.name_label') || 'Nama Lengkap'} <span className="text-amber-600">*</span></Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className={`mt-1.5 focus:ring-amber-500 transition-colors ${variant === 'dark' ? 'border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-500 focus:border-amber-500' : 'border-gray-300 bg-white text-gray-900'}`}
                                placeholder={t('pages.inquiry_form.name_placeholder') || 'Nama Anda'}
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone" className={`text-sm font-medium ${variant === 'dark' ? 'text-stone-300' : 'text-gray-700'}`}>{t('pages.inquiry_form.phone_label') || 'Nomor WhatsApp'} <span className="text-amber-600">*</span></Label>
                            <Input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                className={`mt-1.5 focus:ring-amber-500 transition-colors ${variant === 'dark' ? 'border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-500 focus:border-amber-500' : 'border-gray-300 bg-white text-gray-900'}`}
                                placeholder={t('pages.inquiry_form.phone_placeholder') || '081234567890'}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="email" className={`text-sm font-medium ${variant === 'dark' ? 'text-stone-300' : 'text-gray-700'}`}>{t('pages.inquiry_form.email_label') || 'Email Utama'} <span className="text-amber-600">*</span></Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className={`mt-1.5 focus:ring-amber-500 transition-colors ${variant === 'dark' ? 'border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-500 focus:border-amber-500' : 'border-gray-300 bg-white text-gray-900'}`}
                            placeholder={t('pages.inquiry_form.email_placeholder') || 'nama@email.com'}
                        />
                    </div>

                    <div>
                        <Label htmlFor="interest" className={`text-sm font-medium ${variant === 'dark' ? 'text-stone-300' : 'text-gray-700'}`}>{t('pages.inquiry_form.interest_label') || 'Tujuan / Ketertarikan'} <span className="text-amber-600">*</span></Label>
                        <select
                            id="interest"
                            name="interest"
                            required
                            className={`mt-1.5 w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${variant === 'dark' ? 'border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-500' : 'border-gray-300 bg-white text-gray-900'}`}
                        >
                            <option value="">{t('pages.inquiry_form.interest_placeholder') || 'Pilih salah satu...'}</option>
                            {type === 'B2C' ? (
                                <>
                                    <option value="Program Emas 6 Bulan">{t('pages.inquiry_form.opt_b2c_6m') || 'Program Beli Emas 6 Bulan'}</option>
                                    <option value="Program Emas 12 Bulan">{t('pages.inquiry_form.opt_b2c_12m') || 'Program Beli Emas 12 Bulan'}</option>
                                    <option value="Program Emas 24 Bulan">{t('pages.inquiry_form.opt_b2c_24m') || 'Program Beli Emas 24 Bulan'}</option>
                                    <option value="Pertanyaan Umum Program">{t('pages.inquiry_form.opt_b2c_general') || 'Pertanyaan Umum B2C'}</option>
                                </>
                            ) : (
                                <>
                                    <option value="Partnership & Kerjasama">{t('pages.inquiry_form.opt_inv_partnership') || 'Partnership & Kerjasama'}</option>
                                    <option value="Institutional Investor">{t('pages.inquiry_form.opt_inv_investor') || 'Institutional Investor'}</option>
                                    <option value="Permintaan Alat Berat (Excavator)">{t('pages.inquiry_form.opt_inv_excavator') || 'Permintaan Alat Berat (Excavator)'}</option>
                                    <option value="Permintaan Data / Dokumen Ekstra">{t('pages.inquiry_form.opt_inv_data') || 'Permintaan Data / Dokumen Ekstra'}</option>
                                    <option value="Lainnya">{t('pages.inquiry_form.opt_inv_other') || 'Lainnya'}</option>
                                </>
                            )}
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="message" className={`text-sm font-medium ${variant === 'dark' ? 'text-stone-300' : 'text-gray-700'}`}>{t('pages.inquiry_form.message_label') || 'Pesan'} <span className={variant === 'dark' ? 'text-stone-500' : 'text-gray-400'}>{t('pages.inquiry_form.message_optional') || '(Opsional)'}</span></Label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className={`mt-1.5 w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${variant === 'dark' ? 'border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-500' : 'border-gray-300 bg-white text-gray-900'}`}
                            placeholder={t('pages.inquiry_form.message_placeholder') || 'Tuliskan pertanyaan atau kebutuhan detail Anda di sini...'}
                        ></textarea>
                    </div>

                    {status === 'error' && (
                        <p className="text-sm text-red-600">{t('pages.inquiry_form.error_msg') || 'Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp.'}</p>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="inline-flex w-full sm:w-auto sm:px-8 items-center justify-center gap-2 rounded-md bg-amber-500 px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-amber-600 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === 'submitting' ? (t('pages.inquiry_form.submitting') || 'Mengirim...') : (t('pages.inquiry_form.submit_btn') || 'Kirim Pesan')}
                            {!status && <Send className="h-4 w-4" />}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
