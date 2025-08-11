import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface FooterProps {
    text?: string;
    className?: string;
}

export default function Footer({ text, className = "" }: FooterProps) {
    const { t } = useTranslation();
    const translatedText = text ?? (t('pages.footer.copyright') as string);
    return (
        <footer className={`bg-gray-900 px-4 py-3 text-center text-xs text-white sm:px-8 sm:py-4 sm:text-sm ${className}`}>
            <div className="animate-pulse">{translatedText}</div>
        </footer>
    );
}