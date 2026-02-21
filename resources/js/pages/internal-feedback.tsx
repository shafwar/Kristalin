import { AnimatePresence, motion } from 'framer-motion';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export default function InternalFeedbackPage() {
    const { t } = useTranslation();
    const { props } = usePage<{ flash?: { success?: boolean; error?: string } }>();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: '',
        description: '',
        is_anonymous: false,
        confirm_accurate: false,
    });
    const [attachment, setAttachment] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [fileError, setFileError] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.category) newErrors.category = t('pages.internal_feedback.form.select_category');
        if (!formData.description.trim()) newErrors.description = t('pages.internal_feedback.form.placeholders.description');
        else if (formData.description.trim().length < 10) newErrors.description = 'At least 10 characters.';
        if (!formData.is_anonymous) {
            if (!formData.email?.trim()) newErrors.email = 'Email is required when not submitting anonymously.';
            else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email.';
        }
        if (!formData.confirm_accurate) newErrors.confirm_accurate = 'Please confirm.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = (file: File | null) => {
        setFileError('');
        if (file) {
            if (!ALLOWED_TYPES.includes(file.type)) {
                setFileError('PDF, JPG, PNG, DOC only. Max 10MB.');
                setFileName('');
                setAttachment(null);
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                setFileError('File size must be under 10MB.');
                setFileName('');
                setAttachment(null);
                return;
            }
            setFileName(file.name);
            setAttachment(file);
        } else {
            setFileName('');
            setAttachment(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        const payload = {
            ...formData,
            _token: (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content,
        };
        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('phone', formData.phone);
        form.append('category', formData.category);
        form.append('description', formData.description);
        form.append('is_anonymous', formData.is_anonymous ? '1' : '0');
        form.append('confirm_accurate', formData.confirm_accurate ? '1' : '0');
        if (attachment) form.append('attachment', attachment);

        router.post('/internal-feedback', form, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setLoading(false),
        });
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            category: '',
            description: '',
            is_anonymous: false,
            confirm_accurate: false,
        });
        setAttachment(null);
        setFileName('');
        setFileError('');
        setErrors({});
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleReset = () => resetForm();

    const success = props.flash?.success === true;
    const errorMessage = props.flash?.error;

    // Reset form otomatis setelah kirim berhasil
    useEffect(() => {
        if (success) resetForm();
    }, [success]);

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white">
            <Head title={t('pages.internal_feedback.page_title')} />
            <Header sticky={true} transparent={false} />
            <div className="z-10 flex flex-1 flex-col pt-20">
                <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="mb-2 h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-500" />
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {t('pages.internal_feedback.hero.title')}
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            {t('pages.internal_feedback.hero.subtitle')}
                        </p>
                        <p className="mt-1 text-base text-gray-500">
                            {t('pages.internal_feedback.hero.description')}
                        </p>
                    </motion.div>

                    {/* Success / Error messages */}
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-6 flex items-start gap-3 rounded-xl border-2 border-green-300 bg-green-50 px-5 py-4 shadow-sm ring-2 ring-green-200/60"
                            >
                                <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-green-600" aria-hidden />
                                <div>
                                    <p className="font-semibold text-green-800">
                                        {t('pages.internal_feedback.form.success_title')}
                                    </p>
                                    <p className="mt-0.5 text-green-800/90">
                                        {t('pages.internal_feedback.form.success_message')}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                        {errorMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-6 rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-800"
                            >
                                {errorMessage}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form card */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                        {t('pages.internal_feedback.form.full_name')}{' '}
                                        <span className="text-gray-400">{t('pages.internal_feedback.form.optional')}</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder={t('pages.internal_feedback.form.placeholders.name')}
                                        className="mt-1.5 border-gray-300 bg-white text-gray-900 focus:ring-amber-500"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData((p) => ({ ...p, name: e.target.value }));
                                            if (errors.name) setErrors((p) => ({ ...p, name: '' }));
                                        }}
                                        disabled={formData.is_anonymous}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        {t('pages.internal_feedback.form.email')}{' '}
                                        {formData.is_anonymous ? (
                                            <span className="text-gray-400">{t('pages.internal_feedback.form.optional')}</span>
                                        ) : (
                                            <span className="text-amber-600">*</span>
                                        )}
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder={t('pages.internal_feedback.form.placeholders.email')}
                                        className="mt-1.5 border-gray-300 bg-white text-gray-900 focus:ring-amber-500"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData((p) => ({ ...p, email: e.target.value }));
                                            if (errors.email) setErrors((p) => ({ ...p, email: '' }));
                                        }}
                                        disabled={formData.is_anonymous}
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-amber-700">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                    {t('pages.internal_feedback.form.phone')}{' '}
                                    <span className="text-gray-400">{t('pages.internal_feedback.form.optional')}</span>
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder={t('pages.internal_feedback.form.placeholders.phone')}
                                    className="mt-1.5 border-gray-300 bg-white text-gray-900 focus:ring-amber-500"
                                    value={formData.phone}
                                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                                    disabled={formData.is_anonymous}
                                />
                            </div>

                            <div>
                                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                                    {t('pages.internal_feedback.form.category')} <span className="text-amber-600">*</span>
                                </Label>
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    value={formData.category}
                                    onChange={(e) => {
                                        setFormData((p) => ({ ...p, category: e.target.value }));
                                        if (errors.category) setErrors((p) => ({ ...p, category: '' }));
                                    }}
                                >
                                    <option value="">{t('pages.internal_feedback.form.select_category')}</option>
                                    {(['general', 'process_improvement', 'workplace', 'policy', 'suggestion', 'other'] as const).map(
                                        (key) => (
                                            <option key={key} value={key}>
                                                {t(`pages.internal_feedback.form.categories.${key}`)}
                                            </option>
                                        )
                                    )}
                                </select>
                                {errors.category && <p className="mt-1 text-sm text-amber-700">{errors.category}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                                    {t('pages.internal_feedback.form.description')} <span className="text-amber-600">*</span>
                                </Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    rows={6}
                                    placeholder={t('pages.internal_feedback.form.placeholders.description')}
                                    className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    value={formData.description}
                                    onChange={(e) => {
                                        setFormData((p) => ({ ...p, description: e.target.value }));
                                        if (errors.description) setErrors((p) => ({ ...p, description: '' }));
                                    }}
                                />
                                {errors.description && <p className="mt-1 text-sm text-amber-700">{errors.description}</p>}
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-gray-700">
                                    {t('pages.internal_feedback.form.attachment')}{' '}
                                    <span className="text-gray-400">{t('pages.internal_feedback.form.optional')}</span>
                                </Label>
                                <div
                                    className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/50 px-4 py-3 transition-colors hover:border-amber-300 hover:bg-amber-50/50"
                                    onClick={() => fileInputRef.current?.click()}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                                    />
                                    {fileName ? (
                                        <span className="text-sm font-medium text-gray-700">{fileName}</span>
                                    ) : (
                                        <span className="text-sm text-gray-500">PDF, JPG, PNG, DOC (Max 10MB)</span>
                                    )}
                                </div>
                                {fileError && <p className="mt-1 text-sm text-amber-700">{fileError}</p>}
                            </div>

                            <div className="space-y-4 border-t border-gray-200 pt-6">
                                <label className="flex cursor-pointer items-start gap-3">
                                    <Checkbox
                                        checked={formData.confirm_accurate}
                                        onCheckedChange={(checked) =>
                                            setFormData((p) => ({ ...p, confirm_accurate: checked === true }))
                                        }
                                        className="mt-0.5"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {t('pages.internal_feedback.form.confirm_accurate')}
                                    </span>
                                </label>
                                {errors.confirm_accurate && (
                                    <p className="text-sm text-amber-700">{errors.confirm_accurate}</p>
                                )}

                                <label className="flex cursor-pointer items-start gap-3">
                                    <Checkbox
                                        checked={formData.is_anonymous}
                                        onCheckedChange={(checked) =>
                                            setFormData((p) => ({ ...p, is_anonymous: checked === true }))
                                        }
                                        className="mt-0.5"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {t('pages.internal_feedback.form.submit_anonymously')}
                                    </span>
                                </label>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleReset}
                                    disabled={loading}
                                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    {t('pages.internal_feedback.form.reset')}
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-amber-500 text-gray-900 hover:bg-amber-600"
                                >
                                    {loading ? t('pages.internal_feedback.form.submitting') : t('pages.internal_feedback.form.submit')}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
