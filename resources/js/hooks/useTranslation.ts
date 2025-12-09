import { usePage } from '@inertiajs/react';

interface PageProps {
    locale: string;
    translations: {
        messages: any;
        pages: any;
    };
    [key: string]: any;
}

export function useTranslation() {
    const { props } = usePage<PageProps>();
    const { locale, translations } = props;
    const pageTranslations = translations.pages ?? translations.messages ?? {};

    // Helper function to get translation
    type TranslationOptions = { returnObjects?: boolean; replace?: Record<string, string> };
    const t = (key: string, options?: Record<string, string> | TranslationOptions) => {
        const keys = key.split('.');
        let value = translations.messages;

        // Check if it's a page translation; fall back to messages if pages not provided
        if (keys[0] === 'pages') {
            value = pageTranslations;
            keys.shift(); // Remove 'pages' from the key array
        }

        for (const k of keys) {
            value = value?.[k];
        }

        let result = value || key;

        // Handle string replacements
        const replaceMap: Record<string, string> | undefined =
            options && 'returnObjects' in (options as TranslationOptions)
                ? (options as TranslationOptions).replace
                : (options as Record<string, string> | undefined);
        if (replaceMap && typeof result === 'string') {
            Object.keys(replaceMap).forEach((replaceKey) => {
                result = result.replace(new RegExp(`:${replaceKey}`, 'g'), replaceMap[replaceKey]);
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
            case 'id':
                return 'ID';
            case 'en':
                return 'EN';
            case 'zh':
                return 'ZH';
            default:
                return 'EN';
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
