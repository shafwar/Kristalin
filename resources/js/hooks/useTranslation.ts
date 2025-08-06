import { usePage } from '@inertiajs/react';

interface PageProps {
    locale: string;
    translations: {
        messages: any;
        pages: any;
    };
}

export function useTranslation() {
    const { props } = usePage<PageProps>();
    const { locale, translations } = props;

    // Helper function to get translation
    const t = (key: string, replace?: Record<string, string>) => {
        const keys = key.split('.');
        let value = translations.messages;
        
        // Check if it's a page translation
        if (keys[0] === 'pages') {
            value = translations.pages;
            keys.shift(); // Remove 'pages' from the key array
        }
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        let result = value || key;
        
        // Handle string replacements
        if (replace && typeof result === 'string') {
            Object.keys(replace).forEach(replaceKey => {
                result = result.replace(new RegExp(`:${replaceKey}`, 'g'), replace[replaceKey]);
            });
        }
        
        return result;
    };

    // Helper function to switch language
    const switchLanguage = (newLocale: string) => {
        window.location.href = `/language/${newLocale}`;
    };

    // Get current language display code
    const getCurrentLanguageCode = () => {
        switch (locale) {
            case 'id': return 'ID';
            case 'en': return 'EN';
            case 'zh': return 'ZH';
            default: return 'EN';
        }
    };

    // Get available languages
    const getAvailableLanguages = () => [
        { code: 'id', label: 'ID', name: t('languages.id') },
        { code: 'en', label: 'EN', name: t('languages.en') },
        { code: 'zh', label: 'ZH', name: t('languages.zh') },
    ];

    return {
        t,
        locale,
        switchLanguage,
        getCurrentLanguageCode,
        getAvailableLanguages,
        translations: translations.messages,
    };
}