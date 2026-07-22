import React from 'react';
import { Head } from '@inertiajs/react';
import { Printer, ArrowLeft, Target, Award, HeartHandshake, ShieldCheck, Gem, Building2, TrendingUp, HandHeart, History, Leaf, Users, GraduationCap, Smartphone, Pickaxe, Factory, Store, MapPin, Mail, Phone, ChevronRight, Eye } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { imageUrl } from '@/lib/assets';

export default function CompanyProfileReport() {
    const { t } = useTranslation();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-stone-100 py-8 print:bg-white print:py-0">
            <Head title={t('pages.company_profile.page_title') || 'Company Profile | PT Kristalin Ekalestari'} />

            {/* Floating Action Buttons (Hidden when printing) */}
            <div className="fixed bottom-6 left-6 right-6 md:bottom-auto md:left-auto md:top-8 md:right-8 z-50 flex justify-between md:justify-end gap-4 print:hidden">
                <a 
                    href="/investor" 
                    className="flex h-14 w-14 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full bg-white text-stone-600 shadow-xl transition-all hover:bg-stone-50 hover:text-stone-900"
                    title="Back to Investors"
                >
                    <ArrowLeft className="h-6 w-6 md:h-5 md:w-5" />
                </a>
                <button 
                    onClick={handlePrint}
                    className="flex h-14 md:h-12 flex-grow md:flex-grow-0 items-center justify-center gap-2 rounded-full bg-amber-500 px-6 font-semibold text-white shadow-xl transition-all hover:bg-amber-600"
                >
                    <Printer className="h-6 w-6 md:h-5 md:w-5" />
                    <span className="text-sm md:text-base">{t('pages.company_profile.print_btn') || 'Print / Save as PDF'}</span>
                </button>
            </div>

            {/* A4 Report Container - Will flow naturally onto multiple pages when printed */}
            <div className="mx-auto w-full max-w-[210mm] bg-white shadow-2xl print:shadow-none text-stone-800 print:w-[210mm] print:max-w-none overflow-hidden">
                
                {/* ----------------- PAGE 1: COVER ----------------- */}
                <div className="relative flex min-h-[100svh] md:h-[297mm] print:h-[297mm] flex-col overflow-hidden bg-stone-950 text-white print:h-[297mm]">
                    <div className="absolute inset-0 opacity-40">
                        {/* Using the user's specific requested background image */}
                        <img 
                            src={imageUrl('KristalinCompanyProfileBackground.webp')} 
                            alt="Kristalin Company Profile Background" 
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
                    </div>
                    
                    <div className="relative z-10 p-8 md:p-16 print:p-16 flex h-full flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <img src={imageUrl('Kristalin-New-Logo.webp')} alt="Logo" className="h-16 w-auto brightness-0 invert" />
                            <p className="mt-4 text-lg font-bold tracking-[0.2em] text-amber-500 uppercase">
                                {t('pages.company_profile.report_year') || '2026 Edition'}
                            </p>
                        </div>
                        
                        <div>
                            <h1 className="mb-6 text-4xl sm:text-5xl font-black uppercase tracking-tight md:text-7xl">
                                {t('pages.company_profile.report_title') || 'COMPANY PROFILE REPORT'}
                            </h1>
                            <div className="h-1.5 w-32 bg-amber-500 mb-8" />
                            
                            {/* TAGLINE AS REQUESTED */}
                            <p className="text-2xl font-light italic text-stone-200 border-l-4 border-amber-500 pl-6 py-2 max-w-2xl">
                                "{t('pages.company_profile.tagline') || 'Responsibility is not what we claim, but what we consistently do.'}"
                            </p>
                        </div>
                    </div>
                </div>

                {/* ----------------- PAGE 2: EXECUTIVE SUMMARY & CORE VALUES ----------------- */}
                <div className="flex flex-col p-8 md:p-16 print:p-16 min-h-[100svh] md:min-h-[297mm] print:h-[297mm] print:break-before-page">
                    
                    {/* Executive Summary */}
                    <div className="mb-12">
                        <div className="inline-block mb-6">
                            <h2 className="text-3xl md:text-4xl print:text-4xl font-bold text-stone-900 border-b-4 border-amber-500 pb-3">
                                {t('pages.company_profile.exec_summary') || 'Executive Summary'}
                            </h2>
                        </div>
                        <p className="text-base md:text-lg print:text-lg leading-relaxed text-stone-700">
                            {t('pages.company_profile.exec_summary_text') || 'PT Kristalin Ekalestari is a premier integrated gold mining and refining company based in Indonesia. Operating since 1989, we manage the entire value chain from exploration in Papua to our state-of-the-art refinery in Jakarta. We are committed to sustainable operations and community development.'}
                        </p>
                    </div>

                    {/* Core Values */}
                    <div className="flex-grow">
                        <div className="inline-block mb-8">
                            <h2 className="text-3xl md:text-4xl print:text-4xl font-bold text-stone-900 border-b-4 border-amber-500 pb-3">
                                {t('pages.company_profile.core_values') || 'Core Values'}
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-8">
                            <div className="rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-stone-100 border-l-4 border-l-amber-500 flex flex-col h-full">
                                <ShieldCheck className="h-8 w-8 text-amber-500 mb-6" strokeWidth={1.5} />
                                <h3 className="text-2xl font-bold text-stone-900 mb-4">{t('pages.company_profile.cv_integrity') || 'Integrity'}</h3>
                                <p className="text-stone-600 leading-relaxed flex-grow">{t('pages.company_profile.cv_integrity_text') || 'Upholding the highest standards of ethics and transparency in all our operations.'}</p>
                            </div>
                            
                            <div className="rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-stone-100 border-l-4 border-l-amber-500 flex flex-col h-full">
                                <HeartHandshake className="h-8 w-8 text-amber-500 mb-6" strokeWidth={1.5} />
                                <h3 className="text-2xl font-bold text-stone-900 mb-4">{t('pages.company_profile.cv_sustainability') || 'Sustainability'}</h3>
                                <p className="text-stone-600 leading-relaxed flex-grow">{t('pages.company_profile.cv_sustainability_text') || 'Commitment to environmental stewardship and long-term community development.'}</p>
                            </div>
                            
                            <div className="rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-stone-100 border-l-4 border-l-amber-500 flex flex-col h-full">
                                <Award className="h-8 w-8 text-amber-500 mb-6" strokeWidth={1.5} />
                                <h3 className="text-2xl font-bold text-stone-900 mb-4">{t('pages.company_profile.cv_excellence') || 'Excellence'}</h3>
                                <p className="text-stone-600 leading-relaxed flex-grow">{t('pages.company_profile.cv_excellence_text') || 'Delivering world-class quality in gold refining and product certification.'}</p>
                            </div>
                            
                            <div className="rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-stone-100 border-l-4 border-l-amber-500 flex flex-col h-full">
                                <TrendingUp className="h-8 w-8 text-amber-500 mb-6" strokeWidth={1.5} />
                                <h3 className="text-2xl font-bold text-stone-900 mb-4">{t('pages.company_profile.cv_innovation') || 'Innovation'}</h3>
                                <p className="text-stone-600 leading-relaxed flex-grow">{t('pages.company_profile.cv_innovation_text') || 'Continuously adopting cutting-edge technologies to optimize the mining value chain.'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between items-end">
                        <p className="text-sm font-medium text-stone-400">
                            {t('pages.company_profile.footer_note') || 'Generated automatically from Kristalin Ekalestari Digital Platform.'}
                        </p>
                        <p className="text-lg font-bold text-stone-400">01</p>
                    </div>
                </div>

                {/* ----------------- PAGE 2: CHAIRMAN'S MESSAGE ----------------- */}
                <div className="flex flex-col p-8 md:p-16 print:p-16 min-h-[100svh] md:min-h-[297mm] print:h-[297mm] print:break-before-page relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-bl-full pointer-events-none" />
                    
                    <div className="inline-block mb-12">
                        <h2 className="text-3xl md:text-4xl print:text-4xl font-bold text-stone-900 border-b-4 border-amber-500 pb-3">
                            {t('pages.company_profile.chairman_title') || 'Message from the Chairman'}
                        </h2>
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-center max-w-4xl mx-auto">
                        <div className="relative bg-stone-50 p-6 md:p-12 print:p-12 rounded-3xl border border-stone-200 shadow-sm">
                            <div className="absolute -top-6 -left-6 text-amber-500 opacity-20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.714 4.195-7.79 7.983-8.83l.004 2.06c-1.636 1.111-3.693 2.923-3.693 4.957v1.204h3.689V21h-8.017zm-14.017 0v-7.391c0-5.714 4.194-7.79 7.983-8.83l.004 2.06c-1.635 1.111-3.693 2.923-3.693 4.957v1.204h3.689V21H0z"/></svg>
                            </div>
                            
                            <p className="text-lg md:text-xl print:text-xl leading-loose text-stone-700 italic relative z-10 font-medium">
                                "{t('pages.company_profile.chairman_msg') || 'Welcome to PT Kristalin Ekalestari. Since our inception, we have been driven by a singular vision: to redefine the gold mining industry in Indonesia through unwavering commitment to sustainability, innovation, and community empowerment. Our journey is not just about extracting precious metals; it is about creating lasting value for our stakeholders, preserving the environment for future generations, and uplifting the communities in Papua and beyond. As we embark on our digital transformation, we remain dedicated to transparency and excellence. Thank you for your continued trust and partnership.'}"
                            </p>
                            
                            <div className="mt-12 flex items-center justify-end border-t border-stone-200 pt-8">
                                <div className="text-right">
                                    <h3 className="text-2xl font-bold text-stone-900">{t('pages.company_profile.chairman_name') || 'Arif Budi Setiawan'}</h3>
                                    <p className="text-amber-600 font-semibold uppercase tracking-widest text-sm mt-1">{t('pages.company_profile.chairman_position') || 'Chairman'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between items-end">
                        <p className="text-sm font-medium text-stone-400">
                            {t('pages.company_profile.footer_note') || 'Generated automatically from Kristalin Ekalestari Digital Platform.'}
                        </p>
                        <p className="text-lg font-bold text-stone-400">02</p>
                    </div>
                </div>

                {/* ----------------- PAGE 3: VISION, MISSION & HIGHLIGHTS ----------------- */}
                <div className="flex flex-col p-8 md:p-16 print:p-16 min-h-[100svh] md:min-h-[297mm] print:h-[297mm] print:break-before-page">
                    
                    {/* Vision & Mission */}
                    <div className="mb-12 flex flex-col md:flex-row print:flex-row gap-8">
                        <div className="w-full md:w-1/2 print:w-1/2 bg-stone-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 opacity-10">
                                <Eye className="h-32 w-32" />
                            </div>
                            <Eye className="h-10 w-10 text-amber-500 mb-6" />
                            <h2 className="text-2xl md:text-3xl print:text-3xl font-bold mb-4">{t('pages.company_profile.vision_title') || 'Our Vision'}</h2>
                            <p className="text-stone-300 leading-relaxed text-lg relative z-10">
                                {t('pages.company_profile.vision_text') || 'To become the leading and most trusted integrated gold mining company in Southeast Asia, pioneering sustainable operations and driving socio-economic growth for local communities.'}
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 print:w-1/2 bg-amber-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 opacity-10 text-black">
                                <Target className="h-32 w-32" />
                            </div>
                            <Target className="h-10 w-10 text-stone-900 mb-6" />
                            <h2 className="text-2xl md:text-3xl print:text-3xl font-bold text-stone-900 mb-4">{t('pages.company_profile.mission_title') || 'Our Mission'}</h2>
                            <p className="text-stone-900 font-medium leading-relaxed text-lg relative z-10">
                                {t('pages.company_profile.mission_text') || 'To operate responsibly across the entire gold value chain—from upstream exploration to downstream trading—by utilizing state-of-the-art technology, adhering to the highest environmental and safety standards, and fostering long-term partnerships.'}
                            </p>
                        </div>
                    </div>

                    {/* Operational Excellence */}
                    <div className="flex-grow flex flex-col justify-center">
                        <div className="inline-block mb-8">
                            <h2 className="text-3xl md:text-4xl print:text-4xl font-bold text-stone-900 border-b-4 border-amber-500 pb-3">
                                {t('pages.company_profile.op_excellence') || 'Operational Excellence'}
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-6">
                            <div className="flex items-center gap-6 p-6 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-white hover:shadow-lg transition-all">
                                <div className="h-16 w-16 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                                    <History className="h-8 w-8 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-1">{t('pages.company_profile.op_experience') || 'Decades of Experience'}</h3>
                                    <p className="text-stone-600 leading-relaxed">{t('pages.company_profile.op_experience_text') || 'Operating seamlessly since 1989 with a proven track record.'}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6 p-6 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-white hover:shadow-lg transition-all">
                                <div className="h-16 w-16 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                                    <Gem className="h-8 w-8 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-1">{t('pages.company_profile.op_purity') || '99.99% Purity'}</h3>
                                    <p className="text-stone-600 leading-relaxed">{t('pages.company_profile.op_purity_text') || 'Certified high-quality precious metals meeting international standards.'}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6 p-6 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-white hover:shadow-lg transition-all">
                                <div className="h-16 w-16 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                                    <Leaf className="h-8 w-8 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-1">{t('pages.company_profile.op_sustainability') || 'Eco-Friendly'}</h3>
                                    <p className="text-stone-600 leading-relaxed">{t('pages.company_profile.op_sustainability_text') || 'Implementing ISO-certified green mining technologies.'}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6 p-6 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-white hover:shadow-lg transition-all">
                                <div className="h-16 w-16 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                                    <Users className="h-8 w-8 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-1">{t('pages.company_profile.op_community') || 'Local Empowerment'}</h3>
                                    <p className="text-stone-600 leading-relaxed">{t('pages.company_profile.op_community_text') || 'Creating thousands of jobs and supporting local Papuan businesses.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between items-end">
                        <p className="text-sm font-medium text-stone-400">
                            {t('pages.company_profile.footer_note') || 'Generated automatically from Kristalin Ekalestari Digital Platform.'}
                        </p>
                        <p className="text-lg font-bold text-stone-400">03</p>
                    </div>
                </div>

                {/* ----------------- PAGE 5: COMPANY MILESTONES ----------------- */}
                <div className="flex flex-col p-8 md:p-16 print:p-16 min-h-[100svh] md:min-h-[297mm] print:h-[297mm] print:break-before-page">
                    <div className="flex-grow flex flex-col">
                        <div className="inline-block mb-10">
                            <h2 className="text-3xl md:text-4xl print:text-4xl font-bold text-stone-900 border-b-4 border-amber-500 pb-3">
                                {t('pages.company_profile.milestones') || 'Company Milestones'}
                            </h2>
                        </div>
                        
                        <div className="flex-grow flex flex-col justify-center">
                            <div className="relative border-l-2 border-stone-200 ml-8 space-y-16 pb-8">
                                <div className="relative pl-14">
                                    <div className="absolute -left-[29px] md:-left-[33px] print:-left-[33px] top-1 h-16 w-16 rounded-full bg-amber-50 border-4 border-white shadow-sm flex items-center justify-center">
                                        <History className="h-7 w-7 text-amber-500" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl print:text-4xl font-bold text-amber-500 mb-3">{t('pages.company_profile.ms_1989') || '1989'}</h3>
                                    <h4 className="text-2xl font-bold text-stone-900 mb-3">{t('pages.company_profile.ms_1989_title') || 'Foundation'}</h4>
                                    <p className="text-stone-600 text-base md:text-lg print:text-lg leading-relaxed">{t('pages.company_profile.ms_1989_text') || 'Established in Papua with a focus on sustainable gold exploration and community engagement.'}</p>
                                </div>

                                <div className="relative pl-14">
                                    <div className="absolute -left-[29px] md:-left-[33px] print:-left-[33px] top-1 h-16 w-16 rounded-full bg-amber-50 border-4 border-white shadow-sm flex items-center justify-center">
                                        <Factory className="h-7 w-7 text-amber-500" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl print:text-4xl font-bold text-amber-500 mb-3">{t('pages.company_profile.ms_2005') || '2005'}</h3>
                                    <h4 className="text-2xl font-bold text-stone-900 mb-3">{t('pages.company_profile.ms_2005_title') || 'First Refinery'}</h4>
                                    <p className="text-stone-600 text-base md:text-lg print:text-lg leading-relaxed">{t('pages.company_profile.ms_2005_text') || 'Opened our first state-of-the-art refining facility in Jakarta, enabling end-to-end processing.'}</p>
                                </div>

                                <div className="relative pl-14">
                                    <div className="absolute -left-[29px] md:-left-[33px] print:-left-[33px] top-1 h-16 w-16 rounded-full bg-amber-50 border-4 border-white shadow-sm flex items-center justify-center">
                                        <Award className="h-7 w-7 text-amber-500" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl print:text-4xl font-bold text-amber-500 mb-3">{t('pages.company_profile.ms_2015') || '2015'}</h3>
                                    <h4 className="text-2xl font-bold text-stone-900 mb-3">{t('pages.company_profile.ms_2015_title') || 'LBMA Certification'}</h4>
                                    <p className="text-stone-600 text-base md:text-lg print:text-lg leading-relaxed">{t('pages.company_profile.ms_2015_text') || 'Achieved international LBMA standard for our 99.99% gold bars, recognizing our world-class quality.'}</p>
                                </div>

                                <div className="relative pl-14">
                                    <div className="absolute -left-[29px] md:-left-[33px] print:-left-[33px] top-1 h-16 w-16 rounded-full bg-amber-50 border-4 border-white shadow-sm flex items-center justify-center">
                                        <Smartphone className="h-7 w-7 text-amber-500" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl print:text-4xl font-bold text-amber-500 mb-3">{t('pages.company_profile.ms_2026') || '2026'}</h3>
                                    <h4 className="text-2xl font-bold text-stone-900 mb-3">{t('pages.company_profile.ms_2026_title') || 'Digital Transformation'}</h4>
                                    <p className="text-stone-600 text-base md:text-lg print:text-lg leading-relaxed">{t('pages.company_profile.ms_2026_text') || 'Launched B2C digital platform connecting physical gold directly to investors.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between items-end">
                        <p className="text-sm font-medium text-stone-400">
                            {t('pages.company_profile.footer_note') || 'Generated automatically from Kristalin Ekalestari Digital Platform.'}
                        </p>
                        <p className="text-lg font-bold text-stone-400">04</p>
                    </div>
                </div>

                {/* ----------------- PAGE 6: LINE OF BUSINESS ----------------- */}
                <div className="flex flex-col p-8 md:p-16 print:p-16 min-h-[100svh] md:min-h-[297mm] print:h-[297mm] print:break-before-page">
                    <div className="flex-grow flex flex-col">
                        <div className="inline-block mb-10">
                            <h2 className="text-3xl md:text-4xl print:text-4xl font-bold text-stone-900 border-b-4 border-amber-500 pb-3">
                                {t('pages.company_profile.line_of_business') || 'Line of Business'}
                            </h2>
                        </div>
                        
                        <div className="flex-grow flex flex-col justify-between gap-6">
                            
                            <div className="rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 border-l-4 border-l-amber-500 flex flex-col md:flex-row print:flex-row gap-6 md:gap-8 items-start md:items-center print:items-center flex-grow">
                                <div className="flex-shrink-0 h-16 w-16 md:h-20 md:w-20 print:h-20 print:w-20 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
                                    <Pickaxe className="h-10 w-10 text-amber-600" strokeWidth={1.5} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-stone-900 mb-3">{t('pages.company_profile.lob_upstream') || 'Exploration & Upstream'}</h3>
                                    <p className="text-stone-600 text-base md:text-lg print:text-lg leading-relaxed mb-4">{t('pages.company_profile.lob_upstream_text') || 'Focusing on discovering high-quality primary and secondary gold reserves with strict operational standards in Nabire, Central Papua. We employ advanced geological mapping and responsible extraction methods.'}</p>
                                    <p className="text-stone-500 text-sm leading-loose" dangerouslySetInnerHTML={{ __html: t('pages.company_profile.lob_upstream_extra') || '• 15,000+ Hectares of exploration area<br>• Advanced geophysical surveying<br>• Zero-harm safety protocols' }}></p>
                                </div>
                            </div>
                            
                            <div className="rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 border-l-4 border-l-amber-500 flex flex-col md:flex-row print:flex-row gap-6 md:gap-8 items-start md:items-center print:items-center flex-grow">
                                <div className="flex-shrink-0 h-16 w-16 md:h-20 md:w-20 print:h-20 print:w-20 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
                                    <Factory className="h-10 w-10 text-amber-600" strokeWidth={1.5} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-stone-900 mb-3">{t('pages.company_profile.lob_midstream') || 'Processing & Refining'}</h3>
                                    <p className="text-stone-600 text-base md:text-lg print:text-lg leading-relaxed mb-4">{t('pages.company_profile.lob_midstream_text') || 'Our advanced Smelter & Refinery infrastructure processes gold ore into certified precious metal bars, achieving 99.99% purity. We adhere strictly to international LBMA standards.'}</p>
                                    <p className="text-stone-500 text-sm leading-loose" dangerouslySetInnerHTML={{ __html: t('pages.company_profile.lob_midstream_extra') || '• 2.5+ Tons annual capacity<br>• Advanced smelting technology<br>• 100% Traceable sourcing' }}></p>
                                </div>
                            </div>
                            
                            <div className="rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 border-l-4 border-l-amber-500 flex flex-col md:flex-row print:flex-row gap-6 md:gap-8 items-start md:items-center print:items-center flex-grow">
                                <div className="flex-shrink-0 h-16 w-16 md:h-20 md:w-20 print:h-20 print:w-20 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
                                    <Store className="h-10 w-10 text-amber-600" strokeWidth={1.5} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-stone-900 mb-3">{t('pages.company_profile.lob_downstream') || 'Downstream Trading'}</h3>
                                    <p className="text-stone-600 text-base md:text-lg print:text-lg leading-relaxed mb-4">{t('pages.company_profile.lob_downstream_text') || 'Connecting physical gold directly to the consumer market (B2C) through our digital platforms and strategic partnerships, offering investment-grade gold directly to the public.'}</p>
                                    <p className="text-stone-500 text-sm leading-loose" dangerouslySetInnerHTML={{ __html: t('pages.company_profile.lob_downstream_extra') || '• Direct B2C digital access<br>• Real-time pricing integration<br>• Insured nationwide delivery' }}></p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between items-end">
                        <p className="text-sm font-medium text-stone-400">
                            {t('pages.company_profile.footer_note') || 'Generated automatically from Kristalin Ekalestari Digital Platform.'}
                        </p>
                        <p className="text-lg font-bold text-stone-400">05</p>
                    </div>
                </div>

                {/* ----------------- PAGE 7: CORPORATE SOCIAL RESPONSIBILITY ----------------- */}
                <div className="flex flex-col p-8 md:p-16 print:p-16 min-h-[100svh] md:min-h-[297mm] print:h-[297mm] print:break-before-page">
                    <div className="flex-grow flex flex-col">
                        <div className="inline-block mb-10">
                            <h2 className="text-3xl md:text-4xl print:text-4xl font-bold text-stone-900 border-b-4 border-amber-500 pb-3">
                                {t('pages.company_profile.csr') || 'Corporate Social Responsibility'}
                            </h2>
                        </div>
                        
                        <p className="text-lg md:text-xl print:text-xl leading-relaxed text-stone-700 mb-10">
                            {t('pages.company_profile.csr_text') || 'We believe that our success is deeply intertwined with the prosperity of the communities where we operate. Through our monthly CSR programs, we provide essential food supplies, build community infrastructure, and fund educational and health initiatives in Nabire.'}
                        </p>
                        
                        <div className="flex-grow flex flex-col justify-between gap-6">
                            <div className="rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 border-l-4 border-l-emerald-500 flex flex-col md:flex-row print:flex-row gap-6 md:gap-8 items-start md:items-center print:items-center flex-grow">
                                <div className="flex-shrink-0 h-16 w-16 md:h-20 md:w-20 print:h-20 print:w-20 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                    <Leaf className="h-10 w-10 text-emerald-600" strokeWidth={1.5} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-stone-900 mb-3">{t('pages.company_profile.csr_env') || 'Environmental Stewardship'}</h3>
                                    <p className="text-stone-600 text-base md:text-lg print:text-lg leading-relaxed mb-4">{t('pages.company_profile.csr_env_text') || 'Implementing ISO 14001 standards, land reclamation, and renewable energy in mining operations to minimize our carbon footprint.'}</p>
                                    <p className="text-stone-500 text-sm leading-loose" dangerouslySetInnerHTML={{ __html: t('pages.company_profile.csr_env_extra') || '• 100,000+ trees planted for land reclamation<br>• 30% reduction in carbon emissions<br>• Comprehensive water recycling system' }}></p>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 border-l-4 border-l-blue-500 flex flex-col md:flex-row print:flex-row gap-6 md:gap-8 items-start md:items-center print:items-center flex-grow">
                                <div className="flex-shrink-0 h-16 w-16 md:h-20 md:w-20 print:h-20 print:w-20 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                                    <Users className="h-10 w-10 text-blue-600" strokeWidth={1.5} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-stone-900 mb-3">{t('pages.company_profile.csr_com') || 'Community Empowerment'}</h3>
                                    <p className="text-stone-600 text-base md:text-lg print:text-lg leading-relaxed mb-4">{t('pages.company_profile.csr_com_text') || 'Building schools, hospitals, and infrastructure for the communities in Nabire, Central Papua, ensuring mutual prosperity.'}</p>
                                    <p className="text-stone-500 text-sm leading-loose" dangerouslySetInnerHTML={{ __html: t('pages.company_profile.csr_com_extra') || '• Built 15+ community centers<br>• Empowering 50+ local MSMEs<br>• Regular cultural preservation events' }}></p>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 border-l-4 border-l-rose-500 flex flex-col md:flex-row print:flex-row gap-6 md:gap-8 items-start md:items-center print:items-center flex-grow">
                                <div className="flex-shrink-0 h-16 w-16 md:h-20 md:w-20 print:h-20 print:w-20 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100">
                                    <GraduationCap className="h-10 w-10 text-rose-600" strokeWidth={1.5} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-stone-900 mb-3">{t('pages.company_profile.csr_edu') || 'Education & Health'}</h3>
                                    <p className="text-stone-600 text-base md:text-lg print:text-lg leading-relaxed mb-4">{t('pages.company_profile.csr_edu_text') || 'Providing scholarships and funding local health clinics to improve the quality of life for future generations.'}</p>
                                    <p className="text-stone-500 text-sm leading-loose" dangerouslySetInnerHTML={{ __html: t('pages.company_profile.csr_edu_extra') || '• 500+ Annual student scholarships<br>• Constructed 3 modern health clinics<br>• Monthly free health check-ups' }}></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between items-end">
                        <p className="text-sm font-medium text-stone-400">
                            {t('pages.company_profile.footer_note') || 'Generated automatically from Kristalin Ekalestari Digital Platform.'}
                        </p>
                        <p className="text-lg font-bold text-stone-400">06</p>
                    </div>
                </div>

                {/* ----------------- PAGE 8: BACK COVER (CONTACT US) ----------------- */}
                <div 
                    className="flex flex-col min-h-[100svh] md:min-h-[297mm] print:h-[297mm] print:break-before-page relative overflow-hidden"
                    style={{
                        backgroundImage: `url('${imageUrl('public/KristalinCompanyProfileBackground.webp')}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Dark Overlay exactly like Cover Page */}
                    <div className="absolute inset-0 bg-stone-950/85"></div>
                    
                    {/* Ambient Glows */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/3"></div>
                    
                    <div className="flex-grow flex flex-col items-center justify-center relative z-10 text-center p-8 md:p-16 print:p-16">
                        
                        {/* Logo section matching the screenshot */}
                        <div className="mb-20 flex flex-col items-center">
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-5xl font-medium text-stone-300 tracking-wide font-sans">
                                    Kristalin Ekalestari
                                </h1>
                            </div>
                            <p className="text-xl text-stone-500 tracking-widest uppercase font-medium ml-16">
                                Integrated Gold Industries
                            </p>
                        </div>
                        
                        {/* Contact Us Title */}
                        <h2 className="text-3xl md:text-4xl print:text-4xl font-bold text-amber-500 mb-16 tracking-wider uppercase">
                            CONTACT US
                        </h2>
                        
                        {/* Contact Details List */}
                        <div className="space-y-8 text-left inline-block">
                            <div className="flex items-center gap-6">
                                <MapPin className="h-7 w-7 text-amber-500 flex-shrink-0" strokeWidth={2} />
                                <span className="text-xl text-stone-200 font-medium">Jakarta Head Office, Indonesia</span>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <Mail className="h-7 w-7 text-amber-500 flex-shrink-0" strokeWidth={2} />
                                <span className="text-xl text-stone-200 font-medium">info@kristalin.co.id</span>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <Phone className="h-7 w-7 text-amber-500 flex-shrink-0" strokeWidth={2} />
                                <span className="text-xl text-stone-200 font-medium">+62 21 22978900</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* Print Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page { margin: 0; size: A4; }
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
                }
            `}} />
        </div>
    );
}
