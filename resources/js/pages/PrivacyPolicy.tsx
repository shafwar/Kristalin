import { Head } from '@inertiajs/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';

export default function PrivacyPolicy() {
    const { t } = useTranslation();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white">
            <Head title={`${t('pages.privacy_policy.page_title')} - PT Kristalin Ekalestari`} />
            <Header sticky={true} transparent={false} />
            
            <div className="z-10 flex flex-1 flex-col pt-24 sm:pt-32 pb-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-4xl">
                    <h1 className="text-4xl font-light text-stone-900 mb-8">{t('pages.privacy_policy.page_title')}</h1>
                    
                    <div className="prose prose-stone max-w-none text-stone-700 space-y-6">
                        <p>
                            {t('pages.privacy_policy.last_updated').replace(':date', currentDate)}
                        </p>
                        
                        <h2 className="text-2xl font-medium text-stone-900 mt-10 mb-4">{t('pages.privacy_policy.sections.1.title')}</h2>
                        <p>{t('pages.privacy_policy.sections.1.content')}</p>
                        
                        <h2 className="text-2xl font-medium text-stone-900 mt-10 mb-4">{t('pages.privacy_policy.sections.2.title')}</h2>
                        <p>{t('pages.privacy_policy.sections.2.content')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t('pages.privacy_policy.sections.2.list.0')}</li>
                            <li>{t('pages.privacy_policy.sections.2.list.1')}</li>
                            <li>{t('pages.privacy_policy.sections.2.list.2')}</li>
                            <li>{t('pages.privacy_policy.sections.2.list.3')}</li>
                        </ul>

                        <h2 className="text-2xl font-medium text-stone-900 mt-10 mb-4">{t('pages.privacy_policy.sections.3.title')}</h2>
                        <p>{t('pages.privacy_policy.sections.3.content')}</p>

                        <h2 className="text-2xl font-medium text-stone-900 mt-10 mb-4">{t('pages.privacy_policy.sections.4.title')}</h2>
                        <p>{t('pages.privacy_policy.sections.4.content')}</p>

                        <h2 className="text-2xl font-medium text-stone-900 mt-10 mb-4">{t('pages.privacy_policy.sections.5.title')}</h2>
                        <p>
                            {t('pages.privacy_policy.sections.5.content')} <a href="mailto:info@kristalin.co.id" className="text-amber-600 hover:underline">info@kristalin.co.id</a>
                        </p>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}
