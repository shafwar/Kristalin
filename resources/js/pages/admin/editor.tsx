import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
// Ganti import route dari ziggy-js ke window.route global
// import route from 'ziggy-js';
import toast from 'react-hot-toast';
import ImageUpload from '../../components/ui/ImageUpload';
import RichTextEditor from '../../components/ui/RichTextEditor';

// TypeScript Interfaces
interface PageContent {
    id?: number;
    content_key: string;
    content_type: 'text' | 'rich_text' | 'image' | 'json';
    content_value: string | null;
    meta?: any;
    status?: string;
    created_at?: string;
    updated_at?: string;
}

interface PageSection {
    section: string;
    contents: PageContent[];
}

interface EditorProps {
    page: string;
    contents: Record<string, PageContent[]>;
    pageTitle?: string;
    errors?: Record<string, string>;
}

interface FormData {
    sections: PageSection[];
}

const Editor: React.FC = () => {
    // Gunakan unknown lalu cast ke EditorProps
    const { page, contents, pageTitle } = usePage().props as unknown as EditorProps;
    const [activeSection, setActiveSection] = useState<string>('');
    const [previewData, setPreviewData] = useState<FormData | null>(null);
    const [lastSaved, setLastSaved] = useState<string>('');

    // Gunakan any pada useForm agar tidak error constraint
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm<any>({
        sections: Object.entries(contents).map(([section, items]) => ({
            section,
            contents: items.map((item) => ({ ...item })),
        })),
    });

    // Auto-save indication
    useEffect(() => {
        if (recentlySuccessful) {
            const now = new Date().toLocaleTimeString();
            setLastSaved(now);
            toast.success(`Page saved at ${now}`);
        }
    }, [recentlySuccessful]);

    // Update preview data when form data changes
    useEffect(() => {
        setPreviewData(data);
    }, [data]);

    // Set first section as active by default
    useEffect(() => {
        if (data.sections.length > 0 && !activeSection) {
            setActiveSection(data.sections[0].section);
        }
    }, [data.sections, activeSection]);

    const handleInput = (sectionIdx: number, contentIdx: number, key: string, value: string | null) => {
        setData(
            'sections' as any,
            data.sections.map((sec: any, i: number) =>
                i === sectionIdx
                    ? {
                          ...sec,
                          contents: sec.contents.map((c: any, j: number) =>
                              j === contentIdx ? { ...c, [key]: value } : c
                          ),
                      }
                    : sec,
            ),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(window.route('admin.pages.update', { page }), {
            onSuccess: () => {
                toast.success('Page updated successfully!');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                toast.error('Failed to update page. Please check your inputs.');
            },
        });
    };

    const handleAutoSave = () => {
        if (!processing) {
            put(window.route('admin.pages.update', { page }), {
                preserveScroll: true,
                onSuccess: () => {
                    // Silent save, no toast
                },
                onError: () => {
                    toast.error('Auto-save failed');
                },
            });
        }
    };

    const renderContentField = (content: PageContent, sectionIdx: number, contentIdx: number) => {
        const fieldId = `${content.content_key}-${sectionIdx}-${contentIdx}`;
        const errorKey = `sections.${sectionIdx}.contents.${contentIdx}.content_value`;
        const hasError = (errors as any)?.[errorKey as string];

        switch (content.content_type) {
            case 'text':
                return (
                    <input
                        id={fieldId}
                        type="text"
                        className={`w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-900 dark:text-white ${
                            hasError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        value={content.content_value || ''}
                        onChange={(e) => handleInput(sectionIdx, contentIdx, 'content_value', e.target.value)}
                        placeholder={`Enter ${content.content_key.replace('_', ' ')}`}
                    />
                );

            case 'rich_text':
                return (
                    <div className={`rounded-lg ${hasError ? 'ring-2 ring-red-300' : ''}`}>
                        <RichTextEditor
                            value={content.content_value || ''}
                            onChange={(val: string) => handleInput(sectionIdx, contentIdx, 'content_value', val)}
                        />
                    </div>
                );

            case 'image':
                return (
                    <ImageUpload
                        value={content.content_value || ''}
                        onChange={(val: string | null) => handleInput(sectionIdx, contentIdx, 'content_value', val)}
                        page={page}
                        label={content.content_key.replace('_', ' ').toUpperCase()}
                        maxSize={5}
                    />
                );

            case 'json':
                return (
                    <textarea
                        id={fieldId}
                        className={`min-h-[120px] w-full rounded-lg border px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-900 dark:text-white ${
                            hasError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        value={content.content_value || ''}
                        onChange={(e) => handleInput(sectionIdx, contentIdx, 'content_value', e.target.value)}
                        placeholder="Enter valid JSON"
                    />
                );

            default:
                return (
                    <div className="text-gray-500 italic">
                        Unsupported content type: {content.content_type}
                    </div>
                );
        }
    };

    const renderPreview = () => {
        if (!previewData) return null;

        return (
            <div className="space-y-4">
                {previewData.sections.map((section: PageSection) => (
                    <div key={section.section} className="border-l-4 border-blue-200 pl-4">
                        <h3 className="font-semibold text-gray-800 capitalize mb-2">
                            {section.section.replace('_', ' ')}
                        </h3>
                        <div className="space-y-2">
                            {section.contents.map((content: PageContent) => (
                                <div key={content.content_key} className="text-sm">
                                    <span className="font-medium text-gray-600">
                                        {content.content_key.replace('_', ' ')}:
                                    </span>
                                    <div className="mt-1">
                                        {content.content_type === 'image' && content.content_value ? (
                                            <img
                                                src={content.content_value}
                                                alt="Preview"
                                                className="max-w-32 max-h-20 object-cover rounded"
                                            />
                                        ) : content.content_type === 'rich_text' ? (
                                            <div
                                                className="prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{
                                                    __html: content.content_value || ''
                                                }}
                                            />
                                        ) : (
                                            <span className="text-gray-700">
                                                {content.content_value || <em>Empty</em>}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="mx-auto max-w-7xl p-6">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-500">
                <Link
                    href={window.route('admin.dashboard')}
                    className="hover:text-gray-700 hover:underline"
                >
                    Dashboard
                </Link>
                <span>→</span>
                <Link
                    href={window.route('admin.pages.index')}
                    className="hover:text-gray-700 hover:underline"
                >
                    Page Management
                </Link>
                <span>→</span>
                <span className="font-semibold text-gray-700 capitalize">
                    {pageTitle || page.replace('-', ' ')}
                </span>
            </nav>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 capitalize">
                            Edit {pageTitle || page.replace('-', ' ')}
                        </h1>
                        {lastSaved && (
                            <p className="text-sm text-gray-500 mt-1">
                                Last saved: {lastSaved}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            type="button"
                            onClick={handleAutoSave}
                            disabled={processing}
                            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                        >
                            Quick Save
                        </button>
                        <Link
                            href={window.route('admin.pages.index')}
                            className="px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            Back to Pages
                        </Link>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    {/* Section Tabs */}
                    {data.sections.length > 1 && (
                        <div className="mb-6 border-b border-gray-200">
                            <nav className="flex space-x-6">
                                {data.sections.map((section: any) => (
                                    <button
                                        key={section.section}
                                        type="button"
                                        onClick={() => setActiveSection(section.section)}
                                        className={`border-b-2 py-2 px-1 text-sm font-medium capitalize ${
                                            activeSection === section.section
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        {section.section.replace('_', ' ')}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    )}

                    {/* Content Fields */}
                    <div className="space-y-6">
                        {data.sections.map((section: any, sectionIdx: number) => (
                            <div
                                key={section.section}
                                className={`${
                                    data.sections.length > 1 && activeSection !== section.section
                                        ? 'hidden'
                                        : 'block'
                                }`}
                            >
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800 capitalize">
                                        {section.section.replace('_', ' ')} Section
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Manage content for the {section.section.replace('_', ' ')} section
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {section.contents.map((content: any, contentIdx: number) => (
                                        <div
                                            key={content.id || content.content_key}
                                            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <label
                                                        htmlFor={`${content.content_key}-${sectionIdx}-${contentIdx}`}
                                                        className="block text-sm font-medium text-gray-900 capitalize"
                                                    >
                                                        {content.content_key.replace('_', ' ')}
                                                    </label>
                                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                        {content.content_type}
                                                    </span>
                                                </div>
                                                {content.content_type === 'image' && content.content_value && (
                                                    <img
                                                        src={content.content_value}
                                                        alt="Current"
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                )}
                                            </div>

                                            {renderContentField(content, sectionIdx, contentIdx)}

                                            {(errors as any)?.[`sections.${sectionIdx}.contents.${contentIdx}.content_value`] && (
                                                <div className="mt-2 flex items-center space-x-2 text-sm text-red-600">
                                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>
                                                        {(errors as any)[`sections.${sectionIdx}.contents.${contentIdx}.content_value`]}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center space-x-2 bg-blue-600 px-6 py-3 font-semibold text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                    <span>Save Changes</span>
                                </>
                            )}
                        </button>

                        {recentlySuccessful && (
                            <div className="flex items-center space-x-2 text-green-600">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-medium">Saved successfully!</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Live Preview Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="border-b border-gray-200 px-4 py-3">
                                <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
                                <p className="text-sm text-gray-500">Real-time preview of your changes</p>
                            </div>
                            <div className="p-4 max-h-96 overflow-y-auto">
                                {renderPreview()}
                            </div>
                        </div>

                        {/* JSON Data (Development Mode) */}
                        {process.env.NODE_ENV === 'development' && (
                            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <div className="border-b border-gray-200 px-4 py-2">
                                    <h3 className="text-sm font-medium text-gray-700">Debug Data</h3>
                                </div>
                                <div className="p-4">
                                    <pre className="text-xs text-gray-600 whitespace-pre-wrap max-h-32 overflow-y-auto">
                                        {JSON.stringify(data, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Editor;
