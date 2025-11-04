import { Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { Calendar, ChevronDown, Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';

// Helper function to get translated month name
const getTranslatedMonth = (monthId: string, t: any) => {
    const monthMap: { [key: string]: string } = {
        'februari-2025': 'februari',
        'maret-2025': 'maret',
        'juni-2025': 'juni',
        'juli-2025': 'juli',
        'agustus-2025': 'agustus',
        'september-2025': 'september',
        'oktober-2025': 'oktober',
    };
    return t(`news_archive.months.${monthMap[monthId]}`);
};

// Helper function to get translated category title
const getTranslatedCategoryTitle = (categoryId: string, t: any) => {
    return t(`news_archive.categories.${categoryId}`);
};

// Helper function to get translated category for hero section
const getTranslatedHeroCategory = (categoryKey: string, t: any) => {
    return t(`pages.news.categories.${categoryKey}`);
};

// Helper function to get all translated categories for hero section
const getTranslatedHeroCategories = (t: any) => {
    return [
        { key: 'house_construction', label: t('pages.news.categories.house_construction') },
        { key: 'food_distribution', label: t('pages.news.categories.food_distribution') },
        { key: 'education_support', label: t('pages.news.categories.education_support') },
    ];
};

// Helper function to get translated article title
const getTranslatedArticleTitle = (articleId: string, t: any) => {
    // Mapping between article IDs and translation keys
    const articleKeyMap: { [key: string]: string } = {
        'feb-4': 'feb_house_construction_1',
        'feb-7': 'feb_sembako_distribution',
        'feb-8': 'feb_sembako_distribution_2',
        'feb-9': 'feb_sembako_distribution_3',
        'mar-1': 'mar_fisherman_house_1',
        'mar-2': 'mar_fisherman_house_2',
        'mar-3': 'mar_fisherman_house_3',
        'mar-4': 'mar_fisherman_house_4',
        'mar-5': 'mar_fisherman_house_5',
        'mar-6': 'mar_fisherman_house_6',
        'jun-1': 'jun_education_funding_1',
        'jun-2': 'jun_education_funding_2',
        'jun-3': 'jun_education_funding_3',
        'jun-4': 'jun_education_funding_4',
        'jul-1': 'jul_sembako_distribution_1',
        'jul-2': 'jul_sembako_distribution_2',
        'jul-3': 'jul_sembako_distribution_3',
        'jul-4': 'jul_sembako_distribution_4',
        'aug-1': 'aug_house_construction_1',
        'aug-2': 'aug_house_construction_2',
        'aug-3': 'aug_independence_day_games',
        'aug-4': 'aug_sembako_distribution_1',
        'aug-5': 'aug_sembako_distribution_2',
        'aug-6': 'aug_sembako_distribution_3',
        'aug-7': 'aug_sembako_distribution_4',
        'aug-8': 'aug_sembako_distribution_5',
        'sept-1': 'sept1_torindo_acquisition_heavy_equipment',
        'sept-3': 'torindo_sept3_acquisition_article',
    };

    const translationKey = articleKeyMap[articleId];
    if (translationKey) {
        const newsKey = `news.${translationKey}.title`;
        const translatedTitle = t(newsKey);

        // If translation exists and is not the same as the key, return it
        if (translatedTitle && translatedTitle !== newsKey) {
            return translatedTitle;
        }
    }

    // Fallback to original title (this will be handled by the article data)
    return null;
};

// Helper function to get translated article excerpt
const getTranslatedArticleExcerpt = (articleId: string, t: any) => {
    // Mapping between article IDs and translation keys
    const articleKeyMap: { [key: string]: string } = {
        'feb-4': 'feb_house_construction_1',
        'feb-7': 'feb_sembako_distribution',
        'feb-8': 'feb_sembako_distribution_2',
        'feb-9': 'feb_sembako_distribution_3',
        'mar-1': 'mar_fisherman_house_1',
        'mar-2': 'mar_fisherman_house_2',
        'mar-3': 'mar_fisherman_house_3',
        'mar-4': 'mar_fisherman_house_4',
        'mar-5': 'mar_fisherman_house_5',
        'mar-6': 'mar_fisherman_house_6',
        'jun-1': 'jun_education_funding_1',
        'jun-2': 'jun_education_funding_2',
        'jun-3': 'jun_education_funding_3',
        'jun-4': 'jun_education_funding_4',
        'jul-1': 'jul_sembako_distribution_1',
        'jul-2': 'jul_sembako_distribution_2',
        'jul-3': 'jul_sembako_distribution_3',
        'jul-4': 'jul_sembako_distribution_4',
        'aug-1': 'aug_house_construction_1',
        'aug-2': 'aug_house_construction_2',
        'aug-3': 'aug_independence_day_games',
        'aug-4': 'aug_sembako_distribution_1',
        'aug-5': 'aug_sembako_distribution_2',
        'aug-6': 'aug_sembako_distribution_3',
        'aug-7': 'aug_sembako_distribution_4',
        'aug-8': 'aug_sembako_distribution_5',
        'sept-1': 'sept1_torindo_acquisition_heavy_equipment',
        'sept-3': 'torindo_sept3_acquisition_article',
        'oct-1': 'oct_dubai_investment_blockchain',
    };

    const translationKey = articleKeyMap[articleId];
    if (translationKey) {
        const newsKey = `news.${translationKey}.excerpt`;
        const translatedExcerpt = t(newsKey);

        // If translation exists and is not the same as the key, return it
        if (translatedExcerpt && translatedExcerpt !== newsKey) {
            return translatedExcerpt;
        }
    }

    // Fallback to original excerpt (this will be handled by the article data)
    return null;
};

// Removed unused NewsItem interface

// Removed unused interface: SearchResultItem

// News structure organized by months and categories
export interface NewsItem {
    id: string;
    title: string;
    date: string;
    url: string;
    excerpt: string;
    fullContent: {
        title: string;
        date: string;
        author: string;
        source: string;
        sourceUrl: string;
        image: string;
        content: string;
    };
}

export interface NewsCategory {
    id: string;
    title: string;
    newsItems: NewsItem[];
}

export interface NewsMonth {
    month: string;
    monthId: string;
    categories: NewsCategory[];
}

export const newsData: NewsMonth[] = [
    {
        month: 'FEBRUARI',
        monthId: 'februari-2025',
        categories: [
            /* Removed category 'pembangunan-rumah-buruh-lepas' from February as requested */
            /* Category previously contained feb-3, feb-4, feb-5 articles */
            /*
                    {
                        id: 'feb-3',
                        title: getTranslatedArticle('feb-3')?.title || 'Buruh Harian Lepas Desa Nifasi dapat Rumah dari CSR Kristalin Ekalestari',
                        date: '3 Feb 2025',
                        url: '/news/feb-3',
                        excerpt: getTranslatedArticle('feb-3')?.excerpt || 'Yundiles Wonda dari Suku Dani menerima rumah layak huni dari program CSR PT Kristalin Ekalestari di Desa Nifasi, Nabire.',
                        fullContent: {
                            title: getTranslatedArticle('feb-3')?.full_content?.title || 'Buruh Harian Lepas Desa Nifasi dapat Rumah dari CSR Kristalin Ekalestari',
                            date: getTranslatedArticle('feb-3')?.full_content?.date || '3 Februari 2025',
                            author: getTranslatedArticle('feb-3')?.full_content?.author || 'Redaksi JPNN.com',
                            source: getTranslatedArticle('feb-3')?.full_content?.source || 'JPNN.com',
                            sourceUrl: 'https://www.jpnn.com/news/buruh-harian-lepas-desa-nifasi-dapat-rumah-dari-csr-kristalin-ekalestari',
                            image: '/buruharian1.jpg',
                            content: `
                                <div class="space-y-8">
                                    <!-- Opening Story -->
                                    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                        <h3 class="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Kebahagiaan di Desa Nifasi
                                        </h3>
                                        <p class="text-blue-800 leading-relaxed text-base">
                                            Kebahagiaan terpancar dari wajah <strong>Yundiles Wonda</strong> dari Suku Dani bersama keluarganya. Sebagai pemilik tanah garapan yang diberikan oleh adat Nifasi, ia kini merasakan kebahagiaan yang luar biasa setelah menerima rumah layak huni dari program CSR PT Kristalin Ekalestari.
                                        </p>
                                    </div>

                                    <!-- The Recipient's Story -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Sosok di Balik Kisah</h3>
                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <div class="flex items-start gap-4">
                                                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white font-bold text-lg">
                                                    YM
                                                </div>
                                                <div>
                                                    <h4 class="text-xl font-bold text-gray-900 mb-2">Yustinus Monei</h4>
                                                    <p class="text-gray-700 leading-relaxed text-base">
                                                        Seorang <strong>buruh harian lepas</strong> yang setiap hari berjuang memenuhi kebutuhan hidupnya di Desa Nifasi. Kehidupan yang penuh tantangan ekonomi tak menyurutkan semangatnya, hingga akhirnya harapan datang melalui program CSR yang mengubah nasibnya.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- The Program Details -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Program yang Mengubah Hidup</h3>

                                        <blockquote class="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 p-6 rounded-r-xl shadow-sm">
                                            <p class="text-gray-800 italic text-lg leading-relaxed mb-4">
                                                "Kehadiran kami, dengan membangun Desa Nifasi tentu memperhatikan nasib masyarakatnya untuk mensejahterakan baik yang belum memiliki rumah dan tidak layak huni kami lakukan perbaiki."
                                            </p>
                                            <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Maria Erari, Humas PT Kristalin Ekalestari
                                            </cite>
                                        </blockquote>

                                        <div class="grid md:grid-cols-2 gap-6">
                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <svg class="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    Rumah Impian
                                                </h4>
                                                <ul class="space-y-3 text-gray-700">
                                                    <li class="flex items-center gap-3">
                                                        <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                                        <span class="text-base"><strong>Type 57</strong> - Hunian nyaman seluas 57 meter persegi</span>
                                                    </li>
                                                    <li class="flex items-center gap-3">
                                                        <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                                        <span class="text-base"><strong>Konstruksi Penuh</strong> - Bangunan solid tanpa teras</span>
                                                    </li>
                                                    <li class="flex items-center gap-3">
                                                        <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                                        <span class="text-base"><strong>2 Kamar Tidur</strong> - Ruang pribadi yang nyaman</span>
                                                    </li>
                                                    <li class="flex items-center gap-3">
                                                        <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                                        <span class="text-base"><strong>Kamar Mandi</strong> - Fasilitas sanitasi lengkap</span>
                                                    </li>
                                                    <li class="flex items-center gap-3">
                                                        <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                                        <span class="text-base"><strong>Standar Layak Huni</strong> - Aman dan nyaman untuk keluarga</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Jalan Menuju Impian
                                                </h4>
                                                <div class="space-y-4">
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-3 w-3 bg-green-500 rounded-full"></div>
                                                        <span class="text-gray-700 text-base"><strong>Durasi:</strong> Sekitar 1 bulan pengerjaan</span>
                                                    </div>
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-3 w-3 bg-blue-500 rounded-full"></div>
                                                        <span class="text-gray-700 text-base"><strong>Penyerahan:</strong> Kunci rumah langsung</span>
                                                    </div>
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-3 w-3 bg-amber-500 rounded-full"></div>
                                                        <span class="text-gray-700 text-base"><strong>Proses:</strong> Mengikuti standar yang sama</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- The Promise -->
                                    <blockquote class="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-xl shadow-sm">
                                        <p class="text-gray-800 italic text-lg leading-relaxed mb-4">
                                            "Estimasi sekira satu bulanan dan akan diserahkan kunci langsung seperti sebelum-sebelum warga yang mendapatkan rumah dari kami. Semoga bermanfaat untuk yang menerima."
                                        </p>
                                        <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Maria Erari, Humas PT Kristalin Ekalestari
                                        </cite>
                                    </blockquote>

                                    <!-- The Bigger Picture -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Komitmen yang Berkelanjutan</h3>

                                        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                            <h4 class="text-lg font-bold text-blue-900 mb-3">Membangun Harapan Bersama</h4>
                                            <p class="text-blue-800 leading-relaxed mb-4 text-base">
                                                Kisah Yundiles Wonda bukanlah yang pertama. <strong>Andrian Lubis</strong>, Senior Manager & Finance Division PT Kristalin Ekalestari, menjelaskan bahwa pihaknya telah melakukan pembangunan rumah sebanyak <strong>29 rumah</strong>. "Total 27 rumah yang dibangun. Ini merupakan bagian komitmen kami kepada masyarakat lewat CSR perusahaan," ungkap Andrian.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-4">
                                                <div class="bg-white rounded-lg p-4 border border-blue-100">
                                                    <h5 class="font-semibold text-gray-900 mb-2">Fokus Utama</h5>
                                                    <ul class="text-sm text-gray-700 space-y-1">
                                                        <li>• Keluarga tanpa tempat tinggal</li>
                                                        <li>• Renovasi rumah tidak layak</li>
                                                        <li>• Peningkatan taraf hidup masyarakat</li>
                                                    </ul>
                                                </div>
                                                <div class="bg-white rounded-lg p-4 border border-blue-100">
                                                    <h5 class="font-semibold text-gray-900 mb-2">Dampak Nyata</h5>
                                                    <ul class="text-sm text-gray-700 space-y-1">
                                                        <li>• Puluhan keluarga mendapat rumah</li>
                                                        <li>• Kesejahteraan masyarakat meningkat</li>
                                                        <li>• Pembangunan daerah semakin maju</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Impact Visualization -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Dampak yang Terlihat</h3>

                                        <div class="grid md:grid-cols-3 gap-6">
                                            <div class="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200 text-center">
                                                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white font-bold text-lg mx-auto mb-4">
                                                    29
                                                </div>
                                                <h4 class="text-lg font-bold text-gray-900 mb-2">Rumah Dibangun</h4>
                                                <p class="text-gray-700 text-sm">Total rumah yang telah dibangun PT Kristalin</p>
                                            </div>

                                            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 text-center">
                                                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white font-bold text-lg mx-auto mb-4">
                                                    ✓
                                                </div>
                                                <h4 class="text-lg font-bold text-gray-900 mb-2">Kualitas Hidup</h4>
                                                <p class="text-gray-700 text-sm">Masyarakat Desa Nifasi hidup lebih sejahtera</p>
                                            </div>

                                            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 text-center">
                                                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg mx-auto mb-4">
                                                    🏗️
                                                </div>
                                                <h4 class="text-lg font-bold text-gray-900 mb-2">Pembangunan Daerah</h4>
                                                <p class="text-gray-700 text-sm">Kontribusi nyata untuk kemajuan Papua Tengah</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- CSR Program Scope -->
                                    <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                        <h4 class="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Program CSR yang Komprehensif
                                        </h4>
                                        <p class="text-purple-800 leading-relaxed text-base mb-4">
                                            Program CSR PT Kristalin Ekalestari tidak hanya fokus pada pembangunan rumah. Perusahaan juga melakukan berbagai program pemberdayaan masyarakat yang meliputi:
                                        </p>
                                        <div class="grid md:grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <div class="flex items-center gap-2">
                                                    <div class="h-2 w-2 rounded-full bg-purple-500"></div>
                                                    <span class="text-purple-800 font-medium">Pembangunan gereja</span>
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <div class="h-2 w-2 rounded-full bg-purple-500"></div>
                                                    <span class="text-purple-800 font-medium">Program pendidikan</span>
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <div class="h-2 w-2 rounded-full bg-purple-500"></div>
                                                    <span class="text-purple-800 font-medium">Bantuan sembako</span>
                                                </div>
                                            </div>
                                            <div class="space-y-2">
                                                <div class="flex items-center gap-2">
                                                    <div class="h-2 w-2 rounded-full bg-purple-500"></div>
                                                    <span class="text-purple-800 font-medium">Kendaraan operasional masyarakat</span>
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <div class="h-2 w-2 rounded-full bg-purple-500"></div>
                                                    <span class="text-purple-800 font-medium">Kendaraan operasional gereja</span>
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <div class="h-2 w-2 rounded-full bg-purple-500"></div>
                                                    <span class="text-purple-800 font-medium">Renovasi rumah tidak layak huni</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Source Attribution -->
                                    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                        <h4 class="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                            Sumber Informasi
                                        </h4>
                                        <p class="text-amber-800 leading-relaxed text-base">
                                            Kisah inspiratif ini dilaporkan oleh <strong>JPNN.com</strong> dalam artikel berjudul
                                            <em>"Buruh Harian Lepas Desa Nifasi dapat Rumah dari CSR Kristalin Ekalestari"</em>
                                            yang terbit pada 3 Februari 2025.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'aug-2',
                        title: 'Rumah Layak untuk Lomon Monei: Kado Kemerdekaan dari Program CSR PT Kristalin Ekalestari',
                        date: '19 Aug 2025',
                        url: '/news/aug-2',
                        excerpt:
                            'Sebagai rangkaian peringatan HUT RI ke-80, PT Kristalin Ekalestari membangun rumah layak huni untuk Lomon Monei di Desa Nifasi, Makimi, Nabire melalui program CSR yang berkelanjutan.',
                        fullContent: {
                            title: 'Kado Kemerdekaan: PT Kristalin Ekalestari Bangun Rumah Layak untuk Lomon Monei di Desa Nifasi',
                            date: '19 Agustus 2025',
                            author: 'Tim Redaksi',
                            source: 'iNews Jayapura',
                            sourceUrl:
                                'https://jayapura.inews.id/read/629368/kado-hut-ri-ke-80-buruh-harian-lepas-desa-nifasi-dapat-rumah',
                            image: '/agus2.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Rumah Baru, Semangat Baru di Desa Nifasi</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Menyambut peringatan <strong>HUT RI ke-80</strong>, <strong>PT Kristalin Ekalestari</strong> merealisasikan bantuan rumah layak huni bagi <strong>Lomon Monei</strong> dan keluarga di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Bantuan ini menjadi wujud komitmen perusahaan menghadirkan hunian yang lebih aman dan nyaman bagi masyarakat yang membutuhkan.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Proses dan Rekomendasi Adat</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Tim perusahaan terlebih dahulu melakukan pendataan dan menerima rekomendasi <em>hak ulayat</em> dari pemangku adat setempat. Berdasarkan hasil tersebut, Lomon Monei ditetapkan sebagai penerima bantuan karena kondisi hunian sebelumnya dinilai kurang layak.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Kami memprioritaskan warga yang benar-benar membutuhkan dan telah mendapat rekomendasi adat. Bantuan rumah kali ini kami wujudkan untuk Pak Lomon Monei."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Spesifikasi Hunian</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Rumah yang dibangun merupakan <strong>tipe 57</strong> dengan konstruksi tembok semi permanen. Di dalamnya terdapat <strong>dua kamar tidur</strong> dan <strong>satu kamar mandi</strong>, dirancang untuk memenuhi kebutuhan keluarga kecil secara layak dan sehat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Detail Teknis</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Luas bangunan tipe 57</li>
                                                        <li>Konstruksi tembok semi permanen</li>
                                                        <li>2 kamar tidur</li>
                                                        <li>1 kamar mandi</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Lokasi Pembangunan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Kampung Kalibiru</li>
                                                        <li>Desa Biha</li>
                                                        <li>Distrik Makimi</li>
                                                        <li>Kabupaten Nabire, Papua Tengah</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komitmen CSR yang Konsisten</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Program CSR PT Kristalin Ekalestari tidak hanya fokus pada pembangunan rumah, tetapi juga mendorong peningkatan kualitas hidup dan perputaran ekonomi lokal. Perusahaan terus berupaya memberikan manfaat nyata bagi masyarakat sekitar area operasional.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Penutup</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Bantuan rumah untuk Lomon Monei menjadi simbol kepedulian dan kolaborasi antara perusahaan, adat, dan masyarakat. Diharapkan inisiatif ini memperkuat kemandirian keluarga penerima sekaligus membawa dampak positif bagi Desa Nifasi secara berkelanjutan.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'feb-4',
                        title: 'PT Kristalin Bangun Rumah Layak Huni untuk Buruh di Desa Nifasi',
                        date: '3 Feb 2025',
                        url: '/news/feb-4',
                        excerpt:
                            'PT Kristalin Ekalestari kembali membangun rumah layak huni untuk warga Desa Nifasi, Kecamatan Makimi, Kabupaten Nabire, Papua Tengah melalui program CSR.',
                        fullContent: {
                            title: 'PT Kristalin Bangun Rumah Layak Huni untuk Buruh di Desa Nifasi',
                            date: '3 Februari 2025',
                            author: 'Wahyu SK',
                            source: 'Akurat.co',
                            sourceUrl: 'https://www.akurat.co/daerah/1305602480/pt-kristalin-bangun-rumah-layak-huni-untuk-buruh-di-desa-nifasi',
                            image: '/buruharian2.webp',
                            content: `
                                <div class="space-y-8">
                                    <!-- Opening Story -->
                                    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                        <h3 class="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Program CSR di Desa Nifasi
                                        </h3>
                                        <p class="text-blue-800 leading-relaxed text-base">
                                            <strong>PT Kristalin Ekalestari</strong> kembali membangun rumah layak huni untuk warga Desa Nifasi, Kecamatan Makimi, Kabupaten Nabire, Papua Tengah. Program Corporate Social Responsibility (CSR) ini bertujuan membantu masyarakat yang belum memiliki rumah serta melakukan renovasi total rumah yang tidak layak huni.
                                        </p>
                                    </div>

                                    <!-- Program Details -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Detail Program CSR</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <svg class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                Spesifikasi Rumah
                                            </h4>
                                            <div class="grid md:grid-cols-2 gap-6">
                                                <div class="space-y-3">
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-2 w-2 rounded-full bg-amber-500"></div>
                                                        <span class="text-gray-700 font-medium">Type 57 dengan 2 kamar tidur</span>
                                                    </div>
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-2 w-2 rounded-full bg-amber-500"></div>
                                                        <span class="text-gray-700 font-medium">Luas bangunan 57 meter persegi</span>
                                                    </div>
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-2 w-2 rounded-full bg-amber-500"></div>
                                                        <span class="text-gray-700 font-medium">1 kamar mandi lengkap</span>
                                                    </div>
                                                </div>
                                                <div class="space-y-3">
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-2 w-2 rounded-full bg-amber-500"></div>
                                                        <span class="text-gray-700 font-medium">Material berkualitas tinggi</span>
                                                    </div>
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-2 w-2 rounded-full bg-amber-500"></div>
                                                        <span class="text-gray-700 font-medium">Fasilitas lengkap dan modern</span>
                                                    </div>
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-2 w-2 rounded-full bg-amber-500"></div>
                                                        <span class="text-gray-700 font-medium">Estimasi selesai 1 bulan</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <blockquote class="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-xl shadow-sm">
                                            <p class="text-gray-800 italic text-lg leading-relaxed mb-4">
                                                "Ini merupakan bagian dari komitmen kami untuk meningkatkan kesejahteraan masyarakat melalui program CSR."
                                            </p>
                                            <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Andrian Lubis, Senior Manager Finance Division PT Kristalin Ekalestari
                                            </cite>
                                        </blockquote>
                                    </div>

                                    <!-- Implementation Process -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Progress Program</h3>

                                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                            <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Total Unit yang Dibangun
                                            </h4>
                                            <div class="grid md:grid-cols-2 gap-6">
                                                <div class="space-y-3">
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-2 w-2 rounded-full bg-green-500"></div>
                                                        <span class="text-gray-700 font-medium">Total 29 unit rumah telah dibangun</span>
                                                    </div>
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-2 w-2 rounded-full bg-green-500"></div>
                                                        <span class="text-gray-700 font-medium">27 unit sebelumnya telah diserahkan</span>
                                                    </div>
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-2 w-2 rounded-full bg-green-500"></div>
                                                        <span class="text-gray-700 font-medium">2 unit sedang dalam proses konstruksi</span>
                                                    </div>
                                                </div>
                                                <div class="space-y-3">
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-2 w-2 rounded-full bg-green-500"></div>
                                                        <span class="text-gray-700 font-medium">Konstruksi berdasarkan data tim</span>
                                                    </div>
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-2 w-2 rounded-full bg-green-500"></div>
                                                        <span class="text-gray-700 font-medium">Kunci langsung diserahkan ke penerima</span>
                                                    </div>
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-2 w-2 rounded-full bg-green-500"></div>
                                                        <span class="text-gray-700 font-medium">Program berkelanjutan untuk masyarakat</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Impact & Benefits -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Dampak Positif Program</h3>

                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                            <div class="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                        <svg class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                        Dampak Sosial
                                                    </h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <div class="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                                                            <span>Meningkatkan kesejahteraan buruh harian lepas</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <div class="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                                                            <span>Memberikan kepastian tempat tinggal yang layak</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <div class="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                                                            <span>Meningkatkan kualitas hidup keluarga</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                        <svg class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                        </svg>
                                                        Dampak Ekonomi
                                                    </h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <div class="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                                                            <span>Mengurangi beban ekonomi keluarga</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <div class="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                                                            <span>Meningkatkan produktivitas kerja</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <div class="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                                                            <span>Mendorong pertumbuhan ekonomi lokal</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Future Commitment -->
                                    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
                                        <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <svg class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Testimoni Penerima Manfaat
                                        </h3>
                                        <blockquote class="bg-white rounded-xl p-6 border border-amber-200 shadow-sm">
                                            <p class="text-gray-800 italic text-lg leading-relaxed mb-4">
                                                "Terima kasih banyak kepada PT Kristalin Ekalestari yang telah membangun rumah untuk kami."
                                            </p>
                                            <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Yundiles Wonda, Suku Dani - Penerima Manfaat Program CSR
                                            </cite>
                                        </blockquote>
                                        <p class="text-gray-800 leading-relaxed text-base mt-4">
                                            Program pembangunan rumah layak huni ini memberikan dampak positif yang nyata bagi masyarakat Desa Nifasi, khususnya bagi mereka yang sebelumnya belum memiliki tempat tinggal yang layak. <strong>PT Kristalin Ekalestari</strong> berkomitmen untuk terus mengembangkan program CSR yang memberikan manfaat berkelanjutan bagi masyarakat sekitar area operasional di Papua Tengah.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'aug-2',
                        title: 'Rumah Layak untuk Lomon Monei: Kado Kemerdekaan dari Program CSR PT Kristalin Ekalestari',
                        date: '19 Aug 2025',
                        url: '/news/aug-2',
                        excerpt:
                            'Sebagai rangkaian peringatan HUT RI ke-80, PT Kristalin Ekalestari membangun rumah layak huni untuk Lomon Monei di Desa Nifasi, Makimi, Nabire melalui program CSR yang berkelanjutan.',
                        fullContent: {
                            title: 'Kado Kemerdekaan: PT Kristalin Ekalestari Bangun Rumah Layak untuk Lomon Monei di Desa Nifasi',
                            date: '19 Agustus 2025',
                            author: 'Tim Redaksi',
                            source: 'iNews Jayapura',
                            sourceUrl:
                                'https://jayapura.inews.id/read/629368/kado-hut-ri-ke-80-buruh-harian-lepas-desa-nifasi-dapat-rumah',
                            image: '/agus2.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Rumah Baru, Semangat Baru di Desa Nifasi</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Menyambut peringatan <strong>HUT RI ke-80</strong>, <strong>PT Kristalin Ekalestari</strong> merealisasikan bantuan rumah layak huni bagi <strong>Lomon Monei</strong> dan keluarga di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Bantuan ini menjadi wujud komitmen perusahaan menghadirkan hunian yang lebih aman dan nyaman bagi masyarakat yang membutuhkan.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Proses dan Rekomendasi Adat</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Tim perusahaan terlebih dahulu melakukan pendataan dan menerima rekomendasi <em>hak ulayat</em> dari pemangku adat setempat. Berdasarkan hasil tersebut, Lomon Monei ditetapkan sebagai penerima bantuan karena kondisi hunian sebelumnya dinilai kurang layak.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Kami memprioritaskan warga yang benar-benar membutuhkan dan telah mendapat rekomendasi adat. Bantuan rumah kali ini kami wujudkan untuk Pak Lomon Monei."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Spesifikasi Hunian</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Rumah yang dibangun merupakan <strong>tipe 57</strong> dengan konstruksi tembok semi permanen. Di dalamnya terdapat <strong>dua kamar tidur</strong> dan <strong>satu kamar mandi</strong>, dirancang untuk memenuhi kebutuhan keluarga kecil secara layak dan sehat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Detail Teknis</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Luas bangunan tipe 57</li>
                                                        <li>Konstruksi tembok semi permanen</li>
                                                        <li>2 kamar tidur</li>
                                                        <li>1 kamar mandi</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Lokasi Pembangunan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Kampung Kalibiru</li>
                                                        <li>Desa Biha</li>
                                                        <li>Distrik Makimi</li>
                                                        <li>Kabupaten Nabire, Papua Tengah</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komitmen CSR yang Konsisten</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Program CSR PT Kristalin Ekalestari tidak hanya fokus pada pembangunan rumah, tetapi juga mendorong peningkatan kualitas hidup dan perputaran ekonomi lokal. Perusahaan terus berupaya memberikan manfaat nyata bagi masyarakat sekitar area operasional.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Penutup</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Bantuan rumah untuk Lomon Monei menjadi simbol kepedulian dan kolaborasi antara perusahaan, adat, dan masyarakat. Diharapkan inisiatif ini memperkuat kemandirian keluarga penerima sekaligus membawa dampak positif bagi Desa Nifasi secara berkelanjutan.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'aug-2',
                        title: 'Rumah Layak untuk Lomon Monei: Kado Kemerdekaan dari Program CSR PT Kristalin Ekalestari',
                        date: '19 Aug 2025',
                        url: '/news/aug-2',
                        excerpt:
                            'Sebagai rangkaian peringatan HUT RI ke-80, PT Kristalin Ekalestari membangun rumah layak huni untuk Lomon Monei di Desa Nifasi, Makimi, Nabire melalui program CSR yang berkelanjutan.',
                        fullContent: {
                            title: 'Kado Kemerdekaan: PT Kristalin Ekalestari Bangun Rumah Layak untuk Lomon Monei di Desa Nifasi',
                            date: '19 Agustus 2025',
                            author: 'Tim Redaksi',
                            source: 'iNews Jayapura',
                            sourceUrl:
                                'https://jayapura.inews.id/read/629368/kado-hut-ri-ke-80-buruh-harian-lepas-desa-nifasi-dapat-rumah',
                            image: '/agus2.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Rumah Baru, Semangat Baru di Desa Nifasi</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Menyambut peringatan <strong>HUT RI ke-80</strong>, <strong>PT Kristalin Ekalestari</strong> merealisasikan bantuan rumah layak huni bagi <strong>Lomon Monei</strong> dan keluarga di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Bantuan ini menjadi wujud komitmen perusahaan menghadirkan hunian yang lebih aman dan nyaman bagi masyarakat yang membutuhkan.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Proses dan Rekomendasi Adat</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Tim perusahaan terlebih dahulu melakukan pendataan dan menerima rekomendasi <em>hak ulayat</em> dari pemangku adat setempat. Berdasarkan hasil tersebut, Lomon Monei ditetapkan sebagai penerima bantuan karena kondisi hunian sebelumnya dinilai kurang layak.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Kami memprioritaskan warga yang benar-benar membutuhkan dan telah mendapat rekomendasi adat. Bantuan rumah kali ini kami wujudkan untuk Pak Lomon Monei."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Spesifikasi Hunian</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Rumah yang dibangun merupakan <strong>tipe 57</strong> dengan konstruksi tembok semi permanen. Di dalamnya terdapat <strong>dua kamar tidur</strong> dan <strong>satu kamar mandi</strong>, dirancang untuk memenuhi kebutuhan keluarga kecil secara layak dan sehat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Detail Teknis</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Luas bangunan tipe 57</li>
                                                        <li>Konstruksi tembok semi permanen</li>
                                                        <li>2 kamar tidur</li>
                                                        <li>1 kamar mandi</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Lokasi Pembangunan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Kampung Kalibiru</li>
                                                        <li>Desa Biha</li>
                                                        <li>Distrik Makimi</li>
                                                        <li>Kabupaten Nabire, Papua Tengah</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komitmen CSR yang Konsisten</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Program CSR PT Kristalin Ekalestari tidak hanya fokus pada pembangunan rumah, tetapi juga mendorong peningkatan kualitas hidup dan perputaran ekonomi lokal. Perusahaan terus berupaya memberikan manfaat nyata bagi masyarakat sekitar area operasional.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Penutup</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Bantuan rumah untuk Lomon Monei menjadi simbol kepedulian dan kolaborasi antara perusahaan, adat, dan masyarakat. Diharapkan inisiatif ini memperkuat kemandirian keluarga penerima sekaligus membawa dampak positif bagi Desa Nifasi secara berkelanjutan.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'aug-2',
                        title: 'Rumah Layak untuk Lomon Monei: Kado Kemerdekaan dari Program CSR PT Kristalin Ekalestari',
                        date: '19 Aug 2025',
                        url: '/news/aug-2',
                        excerpt:
                            'Sebagai rangkaian peringatan HUT RI ke-80, PT Kristalin Ekalestari membangun rumah layak huni untuk Lomon Monei di Desa Nifasi, Makimi, Nabire melalui program CSR yang berkelanjutan.',
                        fullContent: {
                            title: 'Kado Kemerdekaan: PT Kristalin Ekalestari Bangun Rumah Layak untuk Lomon Monei di Desa Nifasi',
                            date: '19 Agustus 2025',
                            author: 'Tim Redaksi',
                            source: 'iNews Jayapura',
                            sourceUrl:
                                'https://jayapura.inews.id/read/629368/kado-hut-ri-ke-80-buruh-harian-lepas-desa-nifasi-dapat-rumah',
                            image: '/agus2.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Rumah Baru, Semangat Baru di Desa Nifasi</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Menyambut peringatan <strong>HUT RI ke-80</strong>, <strong>PT Kristalin Ekalestari</strong> merealisasikan bantuan rumah layak huni bagi <strong>Lomon Monei</strong> dan keluarga di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Bantuan ini menjadi wujud komitmen perusahaan menghadirkan hunian yang lebih aman dan nyaman bagi masyarakat yang membutuhkan.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Proses dan Rekomendasi Adat</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Tim perusahaan terlebih dahulu melakukan pendataan dan menerima rekomendasi <em>hak ulayat</em> dari pemangku adat setempat. Berdasarkan hasil tersebut, Lomon Monei ditetapkan sebagai penerima bantuan karena kondisi hunian sebelumnya dinilai kurang layak.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Kami memprioritaskan warga yang benar-benar membutuhkan dan telah mendapat rekomendasi adat. Bantuan rumah kali ini kami wujudkan untuk Pak Lomon Monei."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Spesifikasi Hunian</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Rumah yang dibangun merupakan <strong>tipe 57</strong> dengan konstruksi tembok semi permanen. Di dalamnya terdapat <strong>dua kamar tidur</strong> dan <strong>satu kamar mandi</strong>, dirancang untuk memenuhi kebutuhan keluarga kecil secara layak dan sehat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Detail Teknis</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Luas bangunan tipe 57</li>
                                                        <li>Konstruksi tembok semi permanen</li>
                                                        <li>2 kamar tidur</li>
                                                        <li>1 kamar mandi</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Lokasi Pembangunan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Kampung Kalibiru</li>
                                                        <li>Desa Biha</li>
                                                        <li>Distrik Makimi</li>
                                                        <li>Kabupaten Nabire, Papua Tengah</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komitmen CSR yang Konsisten</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Program CSR PT Kristalin Ekalestari tidak hanya fokus pada pembangunan rumah, tetapi juga mendorong peningkatan kualitas hidup dan perputaran ekonomi lokal. Perusahaan terus berupaya memberikan manfaat nyata bagi masyarakat sekitar area operasional.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Penutup</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Bantuan rumah untuk Lomon Monei menjadi simbol kepedulian dan kolaborasi antara perusahaan, adat, dan masyarakat. Diharapkan inisiatif ini memperkuat kemandirian keluarga penerima sekaligus membawa dampak positif bagi Desa Nifasi secara berkelanjutan.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'aug-2',
                        title:
                            'Rumah Layak untuk Lomon Monei: Kado Kemerdekaan dari Program CSR PT Kristalin Ekalestari',
                        date: '19 Aug 2025',
                        url: '/news/aug-2',
                        excerpt:
                            'Sebagai rangkaian peringatan HUT RI ke-80, PT Kristalin Ekalestari membangun rumah layak huni untuk Lomon Monei di Desa Nifasi, Makimi, Nabire melalui program CSR yang berkelanjutan.',
                        fullContent: {
                            title:
                                'Kado Kemerdekaan: PT Kristalin Ekalestari Bangun Rumah Layak untuk Lomon Monei di Desa Nifasi',
                            date: '19 Agustus 2025',
                            author: 'Tim Redaksi',
                            source: 'iNews Jayapura',
                            sourceUrl:
                                'https://jayapura.inews.id/read/629368/kado-hut-ri-ke-80-buruh-harian-lepas-desa-nifasi-dapat-rumah',
                            image: '/agus2.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Rumah Baru, Semangat Baru di Desa Nifasi</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Menyambut peringatan <strong>HUT RI ke-80</strong>, <strong>PT Kristalin Ekalestari</strong> merealisasikan bantuan rumah layak huni bagi <strong>Lomon Monei</strong> dan keluarga di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Bantuan ini menjadi wujud komitmen perusahaan menghadirkan hunian yang lebih aman dan nyaman bagi masyarakat yang membutuhkan.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Proses dan Rekomendasi Adat</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Tim perusahaan terlebih dahulu melakukan pendataan dan menerima rekomendasi <em>hak ulayat</em> dari pemangku adat setempat. Berdasarkan hasil tersebut, Lomon Monei ditetapkan sebagai penerima bantuan karena kondisi hunian sebelumnya dinilai kurang layak.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Kami memprioritaskan warga yang benar-benar membutuhkan dan telah mendapat rekomendasi adat. Bantuan rumah kali ini kami wujudkan untuk Pak Lomon Monei."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Spesifikasi Hunian</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Rumah yang dibangun merupakan <strong>tipe 57</strong> dengan konstruksi tembok semi permanen. Di dalamnya terdapat <strong>dua kamar tidur</strong> dan <strong>satu kamar mandi</strong>, dirancang untuk memenuhi kebutuhan keluarga kecil secara layak dan sehat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Detail Teknis</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Luas bangunan tipe 57</li>
                                                        <li>Konstruksi tembok semi permanen</li>
                                                        <li>2 kamar tidur</li>
                                                        <li>1 kamar mandi</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Lokasi Pembangunan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Kampung Kalibiru</li>
                                                        <li>Desa Biha</li>
                                                        <li>Distrik Makimi</li>
                                                        <li>Kabupaten Nabire, Papua Tengah</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komitmen CSR yang Konsisten</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Program CSR PT Kristalin Ekalestari tidak hanya fokus pada pembangunan rumah, tetapi juga mendorong peningkatan kualitas hidup dan perputaran ekonomi lokal. Perusahaan terus berupaya memberikan manfaat nyata bagi masyarakat sekitar area operasional.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Penutup</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Bantuan rumah untuk Lomon Monei menjadi simbol kepedulian dan kolaborasi antara perusahaan, adat, dan masyarakat. Diharapkan inisiatif ini memperkuat kemandirian keluarga penerima sekaligus membawa dampak positif bagi Desa Nifasi secara berkelanjutan.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
            */
            {
                id: 'penyaluran-sembako-feb',
                title: 'Penyaluran 506 Paket Sembako ke Warga Desa Nifasi',
                newsItems: [
                    {
                        id: 'feb-7',
                        title: 'Awal Tahun 2025, PT Kristalin Ekalestari Salurkan 506 Paket Sembako untuk Warga Nifasi',
                        date: '4 Feb 2025',
                        url: '/news/feb-7',
                        excerpt:
                            'PT Kristalin Ekalestari memulai tahun 2025 dengan program CSR berkelanjutan, menyalurkan 506 paket sembako kepada masyarakat Desa Nifasi dan sekitarnya.',
                        fullContent: {
                            title: 'Awal Tahun 2025, PT Kristalin Ekalestari Salurkan 506 Paket Sembako untuk Warga Nifasi',
                            date: '4 Februari 2025',
                            author: 'FP Fajarpos.com',
                            source: 'Fajarpos.com',
                            sourceUrl:
                                'https://www.fajarpos.com/04/02/2025/awal-tahun-2025-pt-kristalin-ekalestari-salurkan-506-paket-sembako-untuk-warga-nifasi/',
                            image: '/506paket1.jpg',
                            content: `
                                <div class="space-y-8">
                                    <!-- Opening Story -->
                                    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                                        <h3 class="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            Program CSR Berkelanjutan di Awal Tahun
                                        </h3>
                                        <p class="text-green-800 leading-relaxed text-base">
                                            Memasuki tahun 2025, PT Kristalin Ekalestari menunjukkan komitmennya dalam menjalankan tanggung jawab sosial perusahaan dengan menyalurkan 506 paket sembako kepada masyarakat Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Program ini menjadi bagian dari inisiatif Corporate Social Responsibility (CSR) yang konsisten dijalankan perusahaan.
                                        </p>
                                    </div>

                                    <!-- Program Details -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Distribusi Sembako Bulanan yang Konsisten</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                <strong>Maria Erari</strong>, Public Relations PT Kristalin Ekalestari, menjelaskan bahwa program penyaluran 506 paket sembako pada Januari 2025 ini merupakan kelanjutan dari komitmen perusahaan dalam membantu masyarakat sekitar area operasional. Program ini telah berjalan secara konsisten setiap bulannya sebagai bentuk tanggung jawab sosial perusahaan.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Target Penerima</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            <span>Masyarakat umum</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            <span>Tempat ibadah (gereja, masjid)</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            <span>Kantor pelayanan publik</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Wilayah Distribusi</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Desa Nifasi</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Suku Dani, Kp. Orluk</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Kp. Mamai, Kp. Makimi</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Desa Samabusa, Desa Waharia</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Package Contents -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Komposisi Paket Sembako</h3>

                                        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                <strong>Antonia Erari</strong>, Kepala Seksi Implementasi Lapangan Public Relations, menjelaskan bahwa paket sembako yang didistribusikan secara rutin setiap bulan ini memiliki komposisi yang lengkap dan bermanfaat bagi kebutuhan sehari-hari masyarakat.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Bahan Pokok</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Beras</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Telur</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Mie instan</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Minyak goreng</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Bahan Pendukung</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Tepung terigu</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Sabun cuci</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Kopi</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Teh</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Impact and Benefits -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Dampak Positif Program CSR</h3>

                                        <div class="grid md:grid-cols-3 gap-6">
                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                                                    <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                </div>
                                                <h4 class="text-lg font-bold text-gray-900 mb-2">Konsistensi</h4>
                                                <p class="text-gray-600 text-sm">Program berjalan secara rutin setiap bulan untuk memastikan kebutuhan masyarakat terpenuhi</p>
                                            </div>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                                                    <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                                <h4 class="text-lg font-bold text-gray-900 mb-2">Jangkauan Luas</h4>
                                                <p class="text-gray-600 text-sm">Mencakup berbagai wilayah dan institusi untuk memastikan distribusi yang merata</p>
                                            </div>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto mb-4">
                                                    <svg class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <h4 class="text-lg font-bold text-gray-900 mb-2">Komprehensif</h4>
                                                <p class="text-gray-600 text-sm">Paket sembako lengkap dengan berbagai kebutuhan pokok dan pendukung</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Additional Programs -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Program CSR Lainnya</h3>

                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Selain program penyaluran sembako, PT Kristalin Ekalestari juga menjalankan berbagai program CSR lainnya sebagai bagian dari tanggung jawab sosial perusahaan terhadap lingkungan dan masyarakat.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Pembangunan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                            </svg>
                                                            <span>Renovasi sekolah</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            <span>Renovasi gereja</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                                                            </svg>
                                                            <span>Renovasi rumah warga</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Sosial</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            <span>Aktivitas kemasyarakatan</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                            </svg>
                                                            <span>Program lingkungan</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                            </svg>
                                                            <span>Pengembangan masyarakat</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Future Commitment -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Komitmen Berkelanjutan</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Program penyaluran sembako ini menjadi bukti nyata komitmen PT Kristalin Ekalestari dalam menjalankan tanggung jawab sosial perusahaan secara berkelanjutan. Perusahaan berkomitmen untuk terus mengembangkan program-program CSR yang memberikan manfaat positif bagi masyarakat di sekitar area operasional di Papua Tengah.
                                            </p>

                                            <div class="flex items-center gap-3 mt-4">
                                                <svg class="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span class="text-amber-800 font-medium">Program CSR yang konsisten dan berkelanjutan</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'feb-8',
                        title: '506 Paket Sembako Disalurkan PT Kristalin Ekalestari untuk Warga Nifasi',
                        date: '3 Feb 2025',
                        url: '/news/feb-8',
                        excerpt:
                            'PT Kristalin Ekalestari menyalurkan 506 paket sembako sebagai bagian dari program CSR berkelanjutan kepada masyarakat Desa Nifasi dan wilayah sekitarnya di Nabire.',
                        fullContent: {
                            title: '506 Paket Sembako Disalurkan PT Kristalin Ekalestari untuk Warga Nifasi',
                            date: '3 Februari 2025',
                            author: 'Dani M Dahwilani',
                            source: 'iNews.id',
                            sourceUrl:
                                'https://jayapura.inews.id/read/552327/506-paket-sembako-disalurkan-pt-kristalin-ekalestari-untuk-warga-nifasi',
                            image: '/506paket2.jpeg',
                            content: `
                                <div class="space-y-8">
                                    <!-- Opening Story -->
                                    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                                        <h3 class="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            Komitmen CSR di Awal Tahun 2025
                                        </h3>
                                        <p class="text-blue-800 leading-relaxed text-base">
                                            Memulai tahun 2025 dengan semangat baru, PT Kristalin Ekalestari kembali menunjukkan komitmennya dalam menjalankan tanggung jawab sosial perusahaan. Sebanyak 506 paket sembako telah disalurkan kepada masyarakat Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah sebagai bagian dari program Corporate Social Responsibility (CSR) yang berkelanjutan.
                                        </p>
                                    </div>

                                    <!-- Program Overview -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Distribusi Sembako Bulanan yang Konsisten</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, menjelaskan bahwa penyaluran 506 paket sembako pada bulan Januari 2025 ini merupakan kelanjutan dari komitmen perusahaan dalam membantu masyarakat sekitar area operasional. Program bantuan sembako ini telah menjadi rutinitas bulanan yang konsisten dijalankan sebagai bentuk tanggung jawab sosial perusahaan.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Target Distribusi</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            <span>Masyarakat umum</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            <span>Tempat ibadah (gereja, masjid)</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            <span>Kantor pelayanan publik</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Wilayah Penyaluran</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Desa Nifasi</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Suku Dani, Kp. Orluk</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Kp. Mamai, Kp. Makimi</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Desa Samabusa, Desa Waharia</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Program Consistency -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Konsistensi Program CSR</h3>

                                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Maria Erari menekankan bahwa program bantuan sembako yang disalurkan setiap bulannya oleh PT Kristalin Ekalestari merupakan bagian integral dari program Corporate Social Responsibility (CSR) perusahaan. Konsistensi program CSR ini menunjukkan komitmen perusahaan untuk terus membantu masyarakat sekitar lingkungan area pekerjaan dengan menyalurkan sembako secara berkala.
                                            </p>

                                            <div class="grid md:grid-cols-3 gap-6 mt-6">
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                                                        <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Konsisten</h4>
                                                    <p class="text-gray-600 text-sm">Program berjalan setiap bulan tanpa terputus</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                                                        <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Terintegrasi</h4>
                                                    <p class="text-gray-600 text-sm">Menjadi bagian dari program CSR yang menyeluruh</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto mb-4">
                                                        <svg class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Berkesinambungan</h4>
                                                    <p class="text-gray-600 text-sm">Mendukung kesejahteraan masyarakat jangka panjang</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Impact and Benefits -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Dampak Positif bagi Masyarakat</h3>

                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Program penyaluran sembako ini memberikan dampak positif yang signifikan bagi masyarakat di wilayah operasional PT Kristalin Ekalestari. Bantuan yang diberikan secara konsisten setiap bulan membantu meringankan beban ekonomi keluarga dan meningkatkan kesejahteraan masyarakat.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Manfaat Ekonomi</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                            </svg>
                                                            <span>Meringankan beban ekonomi keluarga</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Memenuhi kebutuhan pokok harian</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span>Meningkatkan daya beli masyarakat</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Manfaat Sosial</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            <span>Memperkuat hubungan perusahaan-masyarakat</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                            </svg>
                                                            <span>Meningkatkan kesejahteraan sosial</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                            </svg>
                                                            <span>Mendorong pembangunan berkelanjutan</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Future Commitment -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Komitmen Berkelanjutan</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Program penyaluran 506 paket sembako ini menjadi bukti nyata komitmen PT Kristalin Ekalestari dalam menjalankan tanggung jawab sosial perusahaan secara berkelanjutan. Perusahaan berkomitmen untuk terus mengembangkan program-program CSR yang memberikan manfaat positif bagi masyarakat di sekitar area operasional di Papua Tengah.
                                            </p>

                                            <div class="flex items-center gap-3 mt-4">
                                                <svg class="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span class="text-amber-800 font-medium">Program CSR yang konsisten dan berkelanjutan</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'feb-9',
                        title: 'Awal Tahun 2025, Kristalin Ekalestari Salurkan 506 Paket Sembako untuk Warga Nabire, Papua Tengah',
                        date: '3 Feb 2025',
                        url: '/news/feb-9',
                        excerpt:
                            'PT Kristalin Ekalestari memulai tahun 2025 dengan menyalurkan 506 paket sembako kepada warga Nabire, Papua Tengah sebagai bagian dari program CSR yang berkelanjutan.',
                        fullContent: {
                            title: 'Awal Tahun 2025, Kristalin Ekalestari Salurkan 506 Paket Sembako untuk Warga Nabire, Papua Tengah',
                            date: '3 Februari 2025',
                            author: 'Dwi Rizki',
                            source: 'Wartakota Tribunnews',
                            sourceUrl:
                                'https://wartakota.tribunnews.com/2025/02/03/awal-tahun-2025-kristalin-ekalestari-salurkan-506-paket-sembako-untuk-warga-nabire-papua-tengah',
                            image: '/506paket3.jpg',
                            content: `
                                <div class="space-y-8">
                                    <!-- Opening Story -->
                                    <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                                        <h3 class="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                            </svg>
                                            Inisiatif CSR di Awal Tahun Baru
                                        </h3>
                                        <p class="text-orange-800 leading-relaxed text-base">
                                            Memasuki awal tahun 2025, PT Kristalin Ekalestari kembali menunjukkan komitmennya dalam menjalankan tanggung jawab sosial perusahaan. Sebanyak 506 paket sembako telah disalurkan kepada warga Nabire, Papua Tengah sebagai bagian dari program Corporate Social Responsibility (CSR) yang berkelanjutan dan terintegrasi.
                                        </p>
                                    </div>

                                    <!-- Program Details -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Program CSR Bulanan yang Konsisten</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, menjelaskan bahwa program bantuan sembako ini merupakan salah satu kegiatan dalam program Corporate Social Responsibility (CSR) yang dilaksanakan setiap bulan oleh perusahaan. Program ini menjadi bagian integral dari komitmen perusahaan dalam membantu masyarakat sekitar area operasional.
                                            </p>

                                            <div class="bg-white rounded-lg p-4 border-l-4 border-amber-500">
                                                <blockquote class="text-gray-700 italic">
                                                    "Kami berkomitmen untuk terus menjalankan program CSR ini sebagai bentuk tanggung jawab perusahaan terhadap masyarakat sekitar, khususnya di area lokasi pekerjaan kami," ujar Maria.
                                                </blockquote>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Distribution Areas -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Wilayah Distribusi Sembako</h3>

                                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Bantuan sembako tersebut disalurkan di berbagai lokasi strategis, mencakup wilayah-wilayah yang membutuhkan di sekitar area operasional PT Kristalin Ekalestari. Distribusi dilakukan secara merata untuk memastikan semua masyarakat yang membutuhkan dapat menerima bantuan.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Lokasi Distribusi</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Desa Nifasi</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Suku Dani</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Kampung Orluk</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Kampung Mamai</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Wilayah Tambahan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Kampung Makimi</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Desa Samabusa</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Desa Waharia</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>Wilayah Nabire lainnya</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Package Contents -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Komposisi Paket Sembako</h3>

                                        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                <strong>Antonia Erari</strong>, Humas Bagian Pelaksana Lapangan, menjelaskan bahwa pembagian sembako dilakukan secara rutin setiap bulannya dengan komoditas yang sama dan berkualitas. Setiap paket sembako dirancang untuk memenuhi kebutuhan pokok keluarga selama satu bulan.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Bahan Pokok Utama</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Beras berkualitas</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Telur segar</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Mie instan</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Minyak goreng</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Bahan Pendukung</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Tepung terigu</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Sabun cuci</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Kopi</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            <span>Teh</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Additional Programs -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Program CSR Lainnya</h3>

                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Selain bantuan sembako, PT Kristalin Ekalestari juga telah merealisasikan berbagai program lain sebagai bentuk tanggung jawab sosial perusahaan terhadap lingkungan dan masyarakat. Program-program ini dirancang untuk memberikan dampak positif yang berkelanjutan bagi kesejahteraan masyarakat.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Pembangunan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            <span>Renovasi sekolah</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            <span>Renovasi gereja</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                                                            </svg>
                                                            <span>Renovasi rumah warga</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Sosial</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            <span>Aktivitas kemasyarakatan</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                            </svg>
                                                            <span>Program lingkungan</span>
                                                        </li>
                                                        <li class="flex items-center gap-2">
                                                            <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                            </svg>
                                                            <span>Pengembangan masyarakat</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Impact and Benefits -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Dampak Positif Program CSR</h3>

                                        <div class="grid md:grid-cols-3 gap-6">
                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 mx-auto mb-4">
                                                    <svg class="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                </div>
                                                <h4 class="text-lg font-bold text-gray-900 mb-2">Kesejahteraan</h4>
                                                <p class="text-gray-600 text-sm">Meningkatkan kesejahteraan masyarakat melalui bantuan sembako berkualitas</p>
                                            </div>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                                                    <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                                <h4 class="text-lg font-bold text-gray-900 mb-2">Komunitas</h4>
                                                <p class="text-gray-600 text-sm">Memperkuat ikatan sosial dan gotong royong dalam masyarakat</p>
                                            </div>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                                                    <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </div>
                                                <h4 class="text-lg font-bold text-gray-900 mb-2">Pembangunan</h4>
                                                <p class="text-gray-600 text-sm">Mendorong pembangunan infrastruktur dan kesejahteraan berkelanjutan</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Future Commitment -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Komitmen Berkelanjutan</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Program penyaluran 506 paket sembako di awal tahun 2025 ini menjadi bukti nyata komitmen PT Kristalin Ekalestari dalam menjalankan tanggung jawab sosial perusahaan secara berkelanjutan. Perusahaan berkomitmen untuk terus mengembangkan program-program CSR yang memberikan manfaat positif bagi masyarakat di sekitar area operasional di Papua Tengah.
                                            </p>

                                            <div class="flex items-center gap-3 mt-4">
                                                <svg class="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span class="text-amber-800 font-medium">Program CSR yang konsisten dan berkelanjutan</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
            {
                id: 'pembangunan-rumah-nifasi-feb',
                title: 'Pembangunan Rumah Baru di Desa Nifasi',
                newsItems: [
                    {
                        id: 'feb-4',
                        title: 'Komitmen PT Kristalin Ekalestari Berikan Manfaat Nyata bagi Warga Desa Nifasi',
                        date: '24 Feb 2025',
                        url: '/news/feb-4',
                        excerpt:
                            'PT Kristalin Ekalestari menunjukkan komitmen berkelanjutan dalam memberikan manfaat nyata bagi masyarakat Desa Nifasi melalui program CSR yang komprehensif.',
                        fullContent: {
                            title: 'Komitmen PT Kristalin Ekalestari Berikan Manfaat Nyata bagi Warga Desa Nifasi',
                            date: '24 Februari 2025',
                            author: 'Tim Redaksi',
                            source: 'JPNN.com',
                            sourceUrl: 'https://www.jpnn.com/news/komitmen-pt-kristalin-ekalestari-berikan-manfaat-warga-desa-nifasi',
                            image: '/pembangunandesanifasi2.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Komitmen Berkelanjutan untuk Masyarakat Desa Nifasi</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            <strong>PT Kristalin Ekalestari</strong> terus menunjukkan komitmennya dalam memberikan manfaat nyata bagi warga Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Sebagai perusahaan yang legal dan berizin di wilayah Nabire, perusahaan berkomitmen untuk terus berkontribusi dan konsisten memberikan kontribusi terbaik untuk masyarakat sekitar.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program CSR Komprehensif</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Melalui program Corporate Social Responsibility (CSR), PT Kristalin Ekalestari membantu warga yang belum memiliki rumah dan melakukan renovasi total rumah yang tidak layak huni. Program ini mencakup berbagai aspek pembangunan masyarakat yang berkelanjutan.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Pembangunan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Pembangunan rumah untuk warga yang belum memiliki</li>
                                                        <li>Renovasi total rumah tidak layak huni</li>
                                                        <li>Pembangunan gereja untuk masyarakat</li>
                                                        <li>Dukungan program pendidikan</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Bantuan Lainnya</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Bantuan sembako untuk masyarakat</li>
                                                        <li>Kendaraan operasional masyarakat</li>
                                                        <li>Kendaraan operasional gereja</li>
                                                        <li>Pengembangan ekonomi lokal</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Transformasi Desa Nifasi</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, mengilustrasikan Desa Nifasi sebagai seorang wanita yang berubah menjadi cantik dan terawat. "Kami ibaratkan desa ini sebelumnya biasa-biasa saja, kini menjadi berubah seperti wanita cantik yang terawat dan memberikan manfaat banyak kepada masyarakat dengan kehadiran kami PT Kristalin Ekalestari," katanya.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Bisa melihat pembangunan desa ini luar biasa selain itu kami juga menggerakan roda ekonomi untuk lokasi wisata Sungai Musairo."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Dampak Ekonomi dan Wisata</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Selain program pembangunan rumah dan infrastruktur, PT Kristalin Ekalestari juga berkontribusi dalam menggerakkan roda ekonomi lokal, khususnya untuk lokasi wisata Sungai Musairo. Hal ini menunjukkan komitmen perusahaan untuk memberikan dampak positif yang berkelanjutan bagi masyarakat sekitar.
                                            </p>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                Perusahaan berkomitmen untuk terus berkontribusi dan konsisten sebagai perusahaan yang legal dan berizin di wilayah Nabire, Papua Tengah, dengan selalu berupaya memberikan kontribusi terbaik untuk masyarakat sekitar.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program Berkelanjutan</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                PT Kristalin Ekalestari telah membangun rumah ke-27 untuk warga Desa Nifasi, menunjukkan komitmen berkelanjutan dalam program pembangunan perumahan. Selain itu, perusahaan juga menyalurkan ratusan paket sembako untuk memenuhi kebutuhan dasar masyarakat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Pencapaian Program</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Rumah ke-27 telah dibangun untuk warga</li>
                                                        <li>Ratusan paket sembako disalurkan</li>
                                                        <li>Renovasi rumah tidak layak huni</li>
                                                        <li>Pembangunan infrastruktur gereja</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Dampak Positif</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Meningkatkan kesejahteraan masyarakat</li>
                                                        <li>Menggerakkan roda ekonomi lokal</li>
                                                        <li>Mendukung pengembangan wisata</li>
                                                        <li>Meningkatkan kualitas hidup warga</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
        ],
    },
    {
        month: 'MARET',
        monthId: 'maret-2025',
        categories: [
            {
                id: 'pembangunan-rumah-nelayan',
                title: 'Pembangunan Rumah Baru untuk Nelayan di Desa Nifasi',
                newsItems: [
                    {
                        id: 'mar-1',
                        title: 'Nelayan Laut Yustinus Monei Terima Rumah Baru dari PT Kristalin Ekalestari',
                        date: '22 Mar 2025',
                        url: '/news/mar-1',
                        excerpt:
                            'Nelayan laut Yustinus Monei menerima kunci rumah baru dari PT Kristalin Ekalestari melalui program CSR di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.',
                        fullContent: {
                            title: 'Nelayan Laut Yustinus Monei Terima Rumah Baru dari PT Kristalin Ekalestari',
                            date: '22 Maret 2025',
                            author: 'Tim Redaksi',
                            source: 'Warta Ekonomi',
                            sourceUrl: 'https://wartaekonomi.co.id/read561859/kristalin-ekalestari-serahkan-kunci-rumah-nelayan-laut-desa-nifasi',
                            image: '/pembangunan2.webp',
                            content: `
                                <div class="space-y-8">
                                    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                                        <h3 class="text-lg font-bold text-blue-900 mb-3">Penyerahan Kunci Rumah untuk Nelayan</h3>
                                        <p class="text-blue-800 leading-relaxed text-base">
                                            Nelayan laut Yustinus Monei merasakan kebahagiaan yang luar biasa saat menerima kunci rumah barunya untuk ditempati bersama keluarga di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Sebagai ayah dari satu anak, Yustinus tidak pernah menyangka akan mendapatkan rumah dari PT Kristalin Ekalestari melalui program Corporate Social Responsibility (CSR) perusahaan.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Kebahagiaan Keluarga Nelayan</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Wajah bahagia Yustinus Monei bersama istri dan anaknya terlihat jelas saat mereka dapat menempati rumah tembok berwarna hijau yang baru. Sebelumnya, keluarga ini belum memiliki rumah huni yang layak dan telah direkomendasikan oleh ketua adat setempat untuk menerima bantuan dari program CSR PT Kristalin Ekalestari.
                                            </p>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <blockquote class="text-lg italic text-gray-700 border-l-4 border-amber-500 pl-4">
                                                    "Nama saya Yustinus Monei, saya terima kasih kepada Kristalin Ekalestari sudah bikin saya rumah terima kasih sekali begitu yang saya sampaikan."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 mt-2 block">- Yustinus Monei, Nelayan Laut Desa Nifasi</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Profil Penerima Bantuan</h3>

                                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Pria yang sehari-hari bekerja sebagai nelayan laut ini tidak pernah membayangkan akan memiliki rumah yang layak untuk ditempati bersama istri dan anaknya di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Profesi sebagai nelayan laut yang dijalani Yustinus membutuhkan dedikasi tinggi dalam menghadapi tantangan alam dan kondisi cuaca yang tidak menentu.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Profil Penerima</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Nama: Yustinus Monei</li>
                                                        <li>Profesi: Nelayan Laut</li>
                                                        <li>Status: Ayah dari 1 anak</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Lokasi Rumah</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Desa Nifasi, Distrik Makimi</li>
                                                        <li>Kabupaten Nabire, Papua Tengah</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Pesan dari Perusahaan</h3>

                                        <div class="grid md:grid-cols-2 gap-6">
                                            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                                <h4 class="text-lg font-bold text-blue-900 mb-3">Kepala Teknik Tambang (KTT)</h4>
                                                <p class="text-blue-800 leading-relaxed text-base mb-4">
                                                    <strong>Anhar</strong>, Kepala Teknik Tambang PT Kristalin Ekalestari, menyampaikan harapan yang tulus saat menyerahkan kunci rumah kepada Yustinus.
                                                </p>
                                                <blockquote class="text-sm italic text-blue-700 border-l-4 border-blue-500 pl-4">
                                                    "Semoga rumah baru ini bisa bermanfaat bagi dan menjadi tempat teduh semoga mohon doanya agar Kristalin Ekalestari bisa menjadi lebih baik lagi."
                                                </blockquote>
                                            </div>

                                            <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                                <h4 class="text-lg font-bold text-purple-900 mb-3">Humas PT Kristalin Ekalestari</h4>
                                                <p class="text-purple-800 leading-relaxed text-base mb-4">
                                                    <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, mengungkapkan rasa terima kasih kepada CV Musairo sebagai kontraktor lokal dari Papua.
                                                </p>
                                                <blockquote class="text-sm italic text-purple-700 border-l-4 border-purple-500 pl-4">
                                                    "Yang sudah memberikan kepercayaan penuh kepada CV Mosairo sehingga bisa membangun satu unit rumah untuk masyarakat."
                                                </blockquote>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Spesifikasi Rumah</h3>

                                        <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                PT Kristalin Ekalestari telah membangun puluhan rumah tipe 57 dengan spesifikasi bangunan rumah tapak full yang memiliki dua kamar tidur dan satu kamar mandi. Rumah yang diserahkan kepada nelayan Yustinus Monei mengikuti standar yang sama dengan rumah-rumah lainnya yang telah dibangun dalam program CSR ini.
                                            </p>

                                            <div class="grid md:grid-cols-3 gap-6 mt-6">
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Tipe 57</h4>
                                                    <p class="text-gray-600 text-sm">Rumah Tapak Full</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">2 Kamar Tidur</h4>
                                                    <p class="text-gray-600 text-sm">1 Kamar Mandi</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Warna Hijau</h4>
                                                    <p class="text-gray-600 text-sm">Tembok Eksterior</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                                        <h3 class="text-lg font-bold text-gray-900 mb-3">Komitmen Berkelanjutan</h3>
                                        <p class="text-gray-800 leading-relaxed text-base">
                                            Penyerahan rumah kepada nelayan Yustinus Monei merupakan bukti nyata komitmen PT Kristalin Ekalestari dalam menjalankan program Corporate Social Responsibility yang berkelanjutan. Melalui kerjasama dengan kontraktor lokal CV Musairo, perusahaan tidak hanya memberikan bantuan rumah, tetapi juga mendukung pengembangan ekonomi lokal dan pemberdayaan putra daerah Papua.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'mar-2',
                        title: 'PT Kristalin Ekalestari Serahkan Kunci Rumah kepada Nelayan Desa Nifasi',
                        date: '22 Mar 2025',
                        url: '/news/mar-2',
                        excerpt:
                            'PT Kristalin Ekalestari menyerahkan kunci rumah kepada nelayan laut di Desa Nifasi sebagai bagian dari program CSR berkelanjutan untuk membantu warga yang belum memiliki rumah layak huni.',
                        fullContent: {
                            title: 'PT Kristalin Ekalestari Serahkan Kunci Rumah kepada Nelayan Desa Nifasi',
                            date: '22 Maret 2025',
                            author: 'Tim Redaksi',
                            source: 'VOI.id',
                            sourceUrl: 'https://voi.id/berita/470800/nelayan-laut-ini-terima-rumah-baru-rekomendasi-adat-desa-nifasi',
                            image: '/pembangunan1.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                                        <h3 class="text-lg font-bold text-blue-900 mb-3">Penyerahan Rumah untuk Nelayan</h3>
                                        <p class="text-blue-800 leading-relaxed text-base">
                                            Nelayan laut di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, Yustinus Monei merasa sangat bahagia menerima kunci penyerahan rumah barunya untuk dihuni bersama keluarga. Sebagai ayah dari satu anak, Yustinus tidak pernah menyangka akan mendapatkan rumah dari PT Kristalin Ekalestari dalam program Corporate Social Responsibility (CSR) perusahaan.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Kebahagiaan Keluarga</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Raut wajah bahagia Yustinus Monei bersama sang istri dan anak terlihat jelas saat mereka dapat menempati rumah tembok berwarna hijau yang baru. Sebelumnya, keluarga ini belum memiliki rumah huni yang layak dan telah direkomendasikan oleh Ketua Adat setempat untuk menerima bantuan dari program CSR PT Kristalin Ekalestari.
                                            </p>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <blockquote class="text-lg italic text-gray-700 border-l-4 border-amber-500 pl-4">
                                                    "Nama saya Yustinus Monei, saya terima kasih kepada PT Kristalin Ekalestari sudah bikin saya rumah terima kasih sekali begitu yang saya sampaikan."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 mt-2 block">- Yustinus Monei, Nelayan Laut Desa Nifasi</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Profil Nelayan Penerima</h3>

                                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Pria yang berprofesi sehari-hari sebagai nelayan laut ini tidak menyangka akan menghuni sebuah rumah yang layak bersama istri dan anaknya di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Profesi sebagai nelayan laut membutuhkan ketangguhan dan dedikasi tinggi dalam menghadapi tantangan alam dan kondisi cuaca yang tidak menentu.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Informasi Pribadi</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Nama: Yustinus Monei</li>
                                                        <li>Profesi: Nelayan Laut</li>
                                                        <li>Status: Ayah dari 1 anak</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Alamat Rumah</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Desa Nifasi, Distrik Makimi</li>
                                                        <li>Kabupaten Nabire, Papua Tengah</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Pesan dari Perusahaan</h3>

                                        <div class="grid md:grid-cols-2 gap-6">
                                            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                                <h4 class="text-lg font-bold text-blue-900 mb-3">Kepala Teknik Tambang (KTT)</h4>
                                                <p class="text-blue-800 leading-relaxed text-base mb-4">
                                                    <strong>Anhar</strong>, Kepala Teknik Tambang PT Kristalin Ekalestari, menyampaikan harapan yang tulus saat menyerahkan kunci rumah kepada Yustinus. Ia berharap rumah yang diberikan dapat memberikan manfaat yang besar bagi keluarga nelayan tersebut.
                                                </p>
                                                <blockquote class="text-sm italic text-blue-700 border-l-4 border-blue-500 pl-4">
                                                    "Semoga rumah baru ini bisa bermanfaat bagi dan menjadi tempat teduh semoga mohon doanya agar PT Kristalin Ekalestari bisa menjadi lebih baik lagi."
                                                </blockquote>
                                            </div>

                                            <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                                <h4 class="text-lg font-bold text-purple-900 mb-3">Humas PT Kristalin Ekalestari</h4>
                                                <p class="text-purple-800 leading-relaxed text-base mb-4">
                                                    <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, mengungkapkan rasa terima kasih kepada PT Kristalin Ekalestari dan CV Musairo selaku kontraktor yang berasal dari Papua.
                                                </p>
                                                <blockquote class="text-sm italic text-purple-700 border-l-4 border-purple-500 pl-4">
                                                    "Yang sudah memberikan kepercayaan penuh kepada CV Mosairo sehingga bisa membangun satu unit rumah untuk masyarakat. Inilah kerjasama yang baik terhadap pihak perusahaan bagaimana kami adalah bagian daripada usaha putra daerah atau Putri daerah yang ada di sini memberikan kepercayaan untuk masyarakat."
                                                </blockquote>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Proses Seleksi dan Rekomendasi</h3>

                                        <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Menurut Maria Erari, pihaknya telah melakukan pendataan bersama Ketua Adat untuk merekomendasikan warga yang belum mendapatkan rumah di Desa Nifasi. Proses seleksi ini dilakukan dengan transparan dan melibatkan tokoh adat setempat untuk memastikan bantuan diberikan kepada yang benar-benar membutuhkan.
                                            </p>

                                            <div class="grid md:grid-cols-3 gap-6 mt-6">
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Pendataan</h4>
                                                    <p class="text-gray-600 text-sm">Survei warga yang belum memiliki rumah</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Rekomendasi Adat</h4>
                                                    <p class="text-gray-600 text-sm">Melibatkan ketua adat dalam seleksi</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Penyerahan</h4>
                                                    <p class="text-gray-600 text-sm">Rumah siap huni diserahkan</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Spesifikasi Rumah yang Dibangun</h3>

                                        <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                PT Kristalin Ekalestari telah membangun puluhan rumah tipe 57 dengan spesifikasi bangunan rumah tapak full yang memiliki dua kamar tidur dan satu kamar mandi. Rumah yang diserahkan kepada nelayan Yustinus Monei mengikuti standar yang sama dengan rumah-rumah lainnya yang telah dibangun dalam program CSR ini.
                                            </p>

                                            <div class="grid md:grid-cols-3 gap-6 mt-6">
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Tipe 57</h4>
                                                    <p class="text-gray-600 text-sm">Rumah Tapak Full</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">2 Kamar Tidur</h4>
                                                    <p class="text-gray-600 text-sm">1 Kamar Mandi</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Warna Hijau</h4>
                                                    <p class="text-gray-600 text-sm">Tembok Eksterior</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Program CSR yang Berkelanjutan</h3>

                                        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Konsistensi PT Kristalin Ekalestari sebagai bukti perusahaan yang legal dan berizin di wilayah Nabire, Papua Tengah, terus berupaya memberikan kontribusi yang terbaik. Sebelumnya, PT Kristalin Ekalestari telah menyerahkan puluhan rumah yang sudah rampung dibangun di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Pembangunan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Pembangunan rumah baru</li>
                                                        <li>Renovasi rumah tidak layak</li>
                                                        <li>Pembangunan gereja</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Pendukung</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Program pendidikan</li>
                                                        <li>Bantuan sembako</li>
                                                        <li>Kendaraan operasional</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                                        <h3 class="text-lg font-bold text-gray-900 mb-3">Komitmen Berkelanjutan</h3>
                                        <p class="text-gray-800 leading-relaxed text-base">
                                            Penyerahan rumah kepada nelayan Yustinus Monei merupakan bukti nyata komitmen PT Kristalin Ekalestari dalam menjalankan program Corporate Social Responsibility yang berkelanjutan. Melalui program CSR, perusahaan membantu warga yang belum punya rumah dan melakukan renovasi total terhadap rumah yang tidak layak huni. Program ini diharapkan dapat memberikan dampak positif yang berkelanjutan bagi masyarakat Desa Nifasi dan sekitarnya.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'mar-3',
                        title: 'Haru Nelayan Laut Desa Nifasi Dapat Rumah Baru dari PT Kristalin Ekalestari',
                        date: '20 Mar 2025',
                        url: '/news/mar-3',
                        excerpt:
                            'Nelayan laut di Desa Nifasi merasa haru dan bahagia menerima rumah baru dari PT Kristalin Ekalestari melalui program CSR yang telah direkomendasikan oleh ketua adat setempat.',
                        fullContent: {
                            title: 'Haru Nelayan Laut Desa Nifasi Dapat Rumah Baru dari PT Kristalin Ekalestari',
                            date: '20 Maret 2025',
                            author: 'Moh Jumri',
                            source: 'Harian Daerah',
                            sourceUrl: 'https://hariandaerah.com/haru-nelayan-laut-desa-nifasi-dapat-rumah-baru/',
                            image: '/pembangunan3.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                                        <h3 class="text-lg font-bold text-blue-900 mb-3">Kebahagiaan Nelayan Menerima Rumah Baru</h3>
                                        <p class="text-blue-800 leading-relaxed text-base">
                                            Nelayan laut di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, tidak pernah menyangka akan dapat menghuni sebuah rumah yang layak bersama istri dan anaknya. Yustinus Monei merasa sangat bahagia mendapatkan rumah yang layak dalam program Corporate Social Responsibility (CSR) dari PT Kristalin Ekalestari. Pasalnya, dirinya memang belum mendapatkan rumah selama menjadi nelayan laut.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Proses Rekomendasi dan Seleksi</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Humas PT Kristalin Ekalestari Maria Erari menjelaskan bahwa pihaknya telah melakukan pendataan bersama Ketua Adat untuk merekomendasikan warga yang belum mendapatkan rumah di Desa Nifasi. Proses seleksi ini dilakukan dengan melibatkan tokoh adat setempat untuk memastikan bantuan diberikan kepada yang benar-benar membutuhkan.
                                            </p>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <blockquote class="text-lg italic text-gray-700 border-l-4 border-amber-500 pl-4">
                                                    "Dari hasil rekomendasi adat dan pendataan PT Kristalin Ekalestari bapak Yustinus Monei layak kami serahkan satu rumah yang sudah dibangun untuk dihuni."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 mt-2 block">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Spesifikasi Rumah yang Dibangun</h3>

                                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                PT Kristalin Ekalestari telah membangun puluhan rumah tipe 57 dengan spesifikasi bangunan rumah tapak full yang memiliki dua kamar tidur dan satu kamar mandi. Rumah yang diserahkan kepada nelayan Yustinus Monei mengikuti standar yang sama dengan rumah-rumah lainnya yang telah dibangun dalam program CSR ini.
                                            </p>

                                            <div class="grid md:grid-cols-3 gap-6 mt-6">
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Tipe 57</h4>
                                                    <p class="text-gray-600 text-sm">Rumah Tapak Full</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">2 Kamar Tidur</h4>
                                                    <p class="text-gray-600 text-sm">1 Kamar Mandi</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Standar Layak</h4>
                                                    <p class="text-gray-600 text-sm">Hunian Nyaman</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Timeline Pembangunan</h3>

                                        <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Sebelumnya, pengerjaan pembangunan pondasi dan rumah layak untuk masyarakat telah dimulai pada awal tahun Januari 2025. Proses pembangunan ini dilakukan secara bertahap dengan melibatkan kontraktor lokal untuk memastikan kualitas dan standar yang sesuai dengan kebutuhan masyarakat setempat.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Fase Pembangunan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Januari 2025: Pembangunan pondasi</li>
                                                        <li>Februari 2025: Konstruksi bangunan</li>
                                                        <li>Maret 2025: Penyelesaian dan penyerahan</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Lokasi Proyek</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Desa Nifasi</li>
                                                        <li>Distrik Makimi</li>
                                                        <li>Kabupaten Nabire, Papua Tengah</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Komitmen Perusahaan terhadap Masyarakat</h3>

                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Menurut Maria Erari, pihaknya menegaskan bahwa sejak adanya perusahaan tersebut, mereka memperhatikan kesejahteraan masyarakat. PT Kristalin Ekalestari berkomitmen untuk memberikan dampak positif yang nyata bagi masyarakat di sekitar wilayah operasionalnya.
                                            </p>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <blockquote class="text-lg italic text-gray-700 border-l-4 border-purple-500 pl-4">
                                                    "Kami membuktikan kehadiran kami disini betul-betul berdampak positif yang nyata untuk masyarakat."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 mt-2 block">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Konsistensi Program CSR</h3>

                                        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Konsistensi PT Kristalin Ekalestari sebagai bukti perusahaan yang legal dan berizin di wilayah Nabire, Papua Tengah, terus berupaya memberikan kontribusi yang terbaik. Sebelumnya, PT Kristalin Ekalestari telah menyerahkan puluhan rumah yang sudah rampung dibangun di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Pembangunan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Pembangunan rumah baru</li>
                                                        <li>Renovasi rumah tidak layak</li>
                                                        <li>Pembangunan gereja</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Pendukung</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Program pendidikan</li>
                                                        <li>Bantuan sembako</li>
                                                        <li>Kendaraan operasional</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Dampak Positif bagi Masyarakat</h3>

                                        <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Melalui program Corporate Social Responsibility (CSR), PT Kristalin Ekalestari membantu warga yang belum punya rumah dan melakukan renovasi total terhadap rumah yang tidak layak. Program ini memberikan dampak positif yang berkelanjutan bagi masyarakat Desa Nifasi dan sekitarnya.
                                            </p>

                                            <div class="grid md:grid-cols-3 gap-6 mt-6">
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 mx-auto mb-4">
                                                        <svg class="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Rumah Layak</h4>
                                                    <p class="text-gray-600 text-sm">Meningkatkan kualitas hidup</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                                                        <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Kesejahteraan</h4>
                                                    <p class="text-gray-600 text-sm">Meningkatkan taraf hidup</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                                                        <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Berkesinambungan</h4>
                                                    <p class="text-gray-600 text-sm">Program jangka panjang</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                                        <h3 class="text-lg font-bold text-gray-900 mb-3">Komitmen Berkelanjutan</h3>
                                        <p class="text-gray-800 leading-relaxed text-base">
                                            Penyerahan rumah kepada nelayan Yustinus Monei merupakan bukti nyata komitmen PT Kristalin Ekalestari dalam menjalankan program Corporate Social Responsibility yang berkelanjutan. Melalui program CSR yang komprehensif, perusahaan tidak hanya memberikan bantuan rumah, tetapi juga mendukung pembangunan gereja, pendidikan, bantuan sembako, dan kendaraan operasional masyarakat. Program ini diharapkan dapat memberikan dampak positif yang berkelanjutan bagi masyarakat Desa Nifasi dan sekitarnya.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'mar-4',
                        title: 'Peduli Nelayan, Warga Desa Nifasi Papua Dapat Rumah Baru dari PT Kristalin Ekalestari',
                        date: '19 Mar 2025',
                        url: '/news/mar-4',
                        excerpt:
                            'Program CSR PT Kristalin Ekalestari memberikan rumah baru kepada nelayan di Desa Nifasi, Papua Tengah, sebagai bentuk kepedulian terhadap masyarakat setempat yang belum memiliki tempat tinggal layak.',
                        fullContent: {
                            title: 'Peduli Nelayan, Warga Desa Nifasi Papua Dapat Rumah Baru dari PT Kristalin Ekalestari',
                            date: '19 Maret 2025',
                            author: 'Ari Sandita Murti',
                            source: 'SindoNews',
                            sourceUrl:
                                'https://daerah.sindonews.com/read/1545101/174/peduli-nelayan-warga-desa-nifasi-papua-dapat-rumah-baru-1742400230',
                            image: '/pembangunan4.webp',
                            content: `
                                <div class="space-y-8">
                                    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                                        <h3 class="text-lg font-bold text-blue-900 mb-3">Kepedulian Perusahaan terhadap Nelayan Papua</h3>
                                        <p class="text-blue-800 leading-relaxed text-base">
                                            Nelayan di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, mendapatkan rumah baru sebagai bentuk kepedulian PT Kristalin Ekalestari terhadap masyarakat setempat. Program Corporate Social Responsibility (CSR) ini memberikan dampak positif yang nyata bagi warga yang sebelumnya belum memiliki tempat tinggal yang layak.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Proses Rekomendasi dan Seleksi</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Berdasarkan hasil rekomendasi adat dan pendataan yang dilakukan secara menyeluruh, Yustinus Monei dinilai layak untuk menerima satu rumah yang telah dibangun untuk dihuni. Proses seleksi ini dilakukan dengan mempertimbangkan kondisi ekonomi dan kebutuhan mendesak keluarga nelayan tersebut.
                                            </p>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <blockquote class="text-lg italic text-gray-700 border-l-4 border-amber-500 pl-4">
                                                    "Dari hasil rekomendasi adat dan pendataan, Bapak Yustinus Monei layak kami serahkan satu rumah yang sudah dibangun untuk dihuni."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 mt-2 block">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Profil Penerima Bantuan</h3>

                                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Yustinus Monei merupakan seorang nelayan laut yang tinggal di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah bersama istri dan anaknya. Sebagai nelayan yang sehari-hari menghadapi tantangan di laut, dia tidak pernah menyangka akan mendapatkan rumah yang layak untuk ditempati keluarganya.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Profil Nelayan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Nama: Yustinus Monei</li>
                                                        <li>Profesi: Nelayan Laut</li>
                                                        <li>Status: Berkeluarga dengan anak</li>
                                                        <li>Lokasi: Desa Nifasi, Papua Tengah</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Kondisi Sebelumnya</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Belum memiliki rumah layak huni</li>
                                                        <li>Direkomendasikan oleh ketua adat</li>
                                                        <li>Memiliki kebutuhan mendesak</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Spesifikasi Rumah yang Dibangun</h3>

                                        <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Pembangunan rumah Yustinus Monei merupakan bagian dari Program Corporate Social Responsibility (CSR) yang bertujuan membantu warga yang belum memiliki rumah atau melakukan renovasi total terhadap rumah yang tidak layak huni. Program ini telah membangun puluhan rumah tipe 57 dengan spesifikasi yang memadai.
                                            </p>

                                            <div class="grid md:grid-cols-3 gap-6 mt-6">
                                                <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                                                    <div class="bg-orange-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                                        <svg class="text-orange-600 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                                                        </svg>
                                                    </div>
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Tipe 57</h4>
                                                    <p class="text-sm text-gray-600">Luas bangunan 57 meter persegi</p>
                                                </div>
                                                <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                                                    <div class="bg-orange-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                                        <svg class="text-orange-600 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                                                        </svg>
                                                    </div>
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">2 Kamar Tidur</h4>
                                                    <p class="text-sm text-gray-600">Kamar tidur utama dan kamar anak</p>
                                                </div>
                                                <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                                                    <div class="bg-orange-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                                        <svg class="text-orange-600 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                    </div>
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">1 Kamar Mandi</h4>
                                                    <p class="text-sm text-gray-600">Kamar mandi dengan fasilitas lengkap</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Program CSR yang Komprehensif</h3>

                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Program CSR PT Kristalin Ekalestari tidak hanya terbatas pada pembangunan rumah, tetapi juga mencakup berbagai aspek pembangunan masyarakat yang berkelanjutan. Perusahaan berkomitmen memberikan dampak positif yang nyata bagi masyarakat sekitar area operasional.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Pembangunan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Pembangunan rumah layak huni</li>
                                                        <li>Renovasi rumah tidak layak</li>
                                                        <li>Pembangunan gereja</li>
                                                        <li>Pembangunan fasilitas pendidikan</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Bantuan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Distribusi sembako</li>
                                                        <li>Bantuan kendaraan operasional</li>
                                                        <li>Program pendidikan</li>
                                                        <li>Pemberdayaan masyarakat</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Dampak Positif bagi Masyarakat</h3>

                                        <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Kehadiran PT Kristalin Ekalestari di Desa Nifasi telah memberikan dampak positif yang nyata bagi masyarakat setempat. Program CSR yang dijalankan tidak hanya memberikan bantuan langsung, tetapi juga mendorong pemberdayaan dan pengembangan ekonomi lokal.
                                            </p>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <blockquote class="text-lg italic text-gray-700 border-l-4 border-teal-500 pl-4">
                                                    "Kami membuktikan kehadiran kami di sini betul-betul berdampak positif yang nyata untuk masyarakat."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 mt-2 block">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                                        <h3 class="text-lg font-bold text-gray-900 mb-3">Komitmen Berkelanjutan</h3>
                                        <p class="text-gray-800 leading-relaxed text-base">
                                            Penyerahan rumah kepada nelayan Yustinus Monei merupakan bukti nyata komitmen PT Kristalin Ekalestari dalam menjalankan program Corporate Social Responsibility yang berkelanjutan. Melalui program CSR yang komprehensif, perusahaan tidak hanya memberikan bantuan rumah, tetapi juga mendukung pembangunan gereja, pendidikan, bantuan sembako, dan kendaraan operasional masyarakat. Program ini diharapkan dapat memberikan dampak positif yang berkelanjutan bagi masyarakat Desa Nifasi dan sekitarnya di Papua Tengah.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'mar-5',
                        title: 'Haru Nelayan Laut Desa Nifasi Dapat Rumah Baru dari PT Kristalin Ekalestari',
                        date: '19 Mar 2025',
                        url: '/news/mar-5',
                        excerpt:
                            'Momen mengharukan ketika nelayan laut di Desa Nifasi, Nabire, menerima rumah baru melalui program CSR PT Kristalin Ekalestari yang telah direkomendasikan oleh ketua adat setempat.',
                        fullContent: {
                            title: 'Haru Nelayan Laut Desa Nifasi Dapat Rumah Baru dari PT Kristalin Ekalestari',
                            date: '19 Maret 2025',
                            author: 'SM Said',
                            source: 'iNews Jayapura',
                            sourceUrl:
                                'https://jayapura.inews.id/read/571890/haru-nelayan-laut-desa-nifasi-dapat-rumah-baru?utm_medium=sosmed&utm_source=whatsapp',
                            image: '/pembangunan5.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                                        <h3 class="text-lg font-bold text-blue-900 mb-3">Momen Mengharukan Nelayan Menerima Rumah Baru</h3>
                                        <p class="text-blue-800 leading-relaxed text-base">
                                            Sebuah momen yang sangat mengharukan terjadi ketika nelayan laut di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, menerima rumah baru melalui program Corporate Social Responsibility (CSR) dari PT Kristalin Ekalestari. Yustinus Monei tidak pernah menyangka akan dapat menghuni sebuah rumah yang layak bersama istri dan anaknya di desa tersebut.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Kebahagiaan yang Tak Terduga</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Yustinus Monei merasakan kebahagiaan yang luar biasa saat mendapatkan rumah yang layak dalam program CSR dari PT Kristalin Ekalestari. Sebagai nelayan laut yang telah lama bekerja di laut, dirinya memang belum pernah memiliki rumah yang layak untuk ditempati keluarganya. Momen ini menjadi titik balik kehidupan yang sangat berarti bagi keluarga nelayan tersebut.
                                            </p>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <blockquote class="text-lg italic text-gray-700 border-l-4 border-amber-500 pl-4">
                                                    "Yustinus Monei layak kami serahkan satu rumah yang sudah dibangun untuk dihuni."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 mt-2 block">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Proses Pendataan dan Rekomendasi</h3>

                                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Humas PT Kristalin Ekalestari Maria Erari menjelaskan bahwa pihaknya telah melakukan pendataan bersama dengan Ketua Adat untuk merekomendasikan warga yang belum mendapatkan rumah di Desa Nifasi. Proses ini dilakukan dengan hati-hati dan mempertimbangkan kondisi ekonomi serta kebutuhan mendesak setiap keluarga.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Proses Seleksi</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Pendataan bersama Ketua Adat</li>
                                                        <li>Evaluasi kondisi ekonomi keluarga</li>
                                                        <li>Penilaian kebutuhan mendesak</li>
                                                        <li>Rekomendasi berdasarkan kriteria</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Kriteria Penerima</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Warga yang belum memiliki rumah</li>
                                                        <li>Kondisi ekonomi yang membutuhkan</li>
                                                        <li>Rekomendasi dari ketua adat</li>
                                                        <li>Kesediaan untuk merawat rumah</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Spesifikasi Rumah Tipe 57</h3>

                                        <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                PT Kristalin Ekalestari telah membangun puluhan rumah tipe 57 dengan spesifikasi bangunan rumah tapak full yang memiliki dua kamar tidur dan satu kamar mandi. Rumah-rumah ini dibangun dengan standar kualitas yang baik dan dirancang untuk memberikan kenyamanan bagi keluarga yang akan menempatinya.
                                            </p>

                                            <div class="grid md:grid-cols-3 gap-6 mt-6">
                                                <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                                                    <div class="bg-orange-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                                        <svg class="text-orange-600 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                                        </svg>
                                                    </div>
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Rumah Tapak Full</h4>
                                                    <p class="text-sm text-gray-600">Bangunan permanen dengan pondasi kuat</p>
                                                </div>
                                                <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                                                    <div class="bg-orange-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                                        <svg class="text-orange-600 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                                                        </svg>
                                                    </div>
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">2 Kamar Tidur</h4>
                                                    <p class="text-sm text-gray-600">Kamar tidur utama dan kamar anak</p>
                                                </div>
                                                <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                                                    <div class="bg-orange-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                                        <svg class="text-orange-600 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                    </div>
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">1 Kamar Mandi</h4>
                                                    <p class="text-sm text-gray-600">Kamar mandi dengan fasilitas lengkap</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Program CSR yang Berkelanjutan</h3>

                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Program Corporate Social Responsibility PT Kristalin Ekalestari tidak hanya terbatas pada pembangunan rumah, tetapi juga mencakup berbagai aspek pembangunan masyarakat. Perusahaan berkomitmen memberikan dampak positif yang nyata dan berkelanjutan bagi masyarakat sekitar area operasional di Papua Tengah.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Pembangunan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Pembangunan rumah layak huni</li>
                                                        <li>Renovasi rumah tidak layak</li>
                                                        <li>Pembangunan fasilitas umum</li>
                                                        <li>Infrastruktur desa</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Pemberdayaan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Pendidikan dan pelatihan</li>
                                                        <li>Bantuan ekonomi produktif</li>
                                                        <li>Kesehatan masyarakat</li>
                                                        <li>Pembangunan sosial</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Dampak Positif bagi Masyarakat</h3>

                                        <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Kehadiran PT Kristalin Ekalestari di Desa Nifasi telah memberikan dampak positif yang nyata bagi masyarakat setempat. Program CSR yang dijalankan tidak hanya memberikan bantuan langsung, tetapi juga mendorong pemberdayaan dan pengembangan ekonomi lokal yang berkelanjutan.
                                            </p>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <blockquote class="text-lg italic text-gray-700 border-l-4 border-teal-500 pl-4">
                                                    "Kami membuktikan kehadiran kami di sini betul-betul berdampak positif yang nyata untuk masyarakat."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 mt-2 block">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Komitmen Perusahaan yang Konsisten</h3>

                                        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                PT Kristalin Ekalestari telah menunjukkan komitmen yang konsisten sebagai perusahaan yang legal dan berlisensi di Nabire, Papua Tengah. Perusahaan terus memberikan kontribusi berkelanjutan melalui program CSR yang komprehensif, tidak hanya dalam pembangunan rumah, tetapi juga dalam berbagai aspek pembangunan masyarakat.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Kontribusi Perusahaan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Pembangunan rumah layak huni</li>
                                                        <li>Pembangunan gereja</li>
                                                        <li>Program pendidikan</li>
                                                        <li>Bantuan sembako</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Dukungan Masyarakat</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Kendaraan operasional</li>
                                                        <li>Fasilitas umum</li>
                                                        <li>Pemberdayaan ekonomi</li>
                                                        <li>Pengembangan sosial</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                                        <h3 class="text-lg font-bold text-gray-900 mb-3">Harapan untuk Masa Depan</h3>
                                        <p class="text-gray-800 leading-relaxed text-base">
                                            Penyerahan rumah kepada nelayan Yustinus Monei merupakan bukti nyata komitmen PT Kristalin Ekalestari dalam menjalankan program Corporate Social Responsibility yang berkelanjutan. Melalui program CSR yang komprehensif, perusahaan tidak hanya memberikan bantuan rumah, tetapi juga mendukung pembangunan gereja, pendidikan, bantuan sembako, dan kendaraan operasional masyarakat. Program ini diharapkan dapat memberikan dampak positif yang berkelanjutan bagi masyarakat Desa Nifasi dan sekitarnya di Papua Tengah, menciptakan kehidupan yang lebih baik dan sejahtera.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'mar-6',
                        title: 'CSR PT Kristalin Ekalestari, Nelayan Desa Nifasi Akhirnya Miliki Rumah Layak',
                        date: '19 Mar 2025',
                        url: '/news/mar-6',
                        excerpt:
                            'Yustinus Monei, nelayan di Desa Nifasi, akhirnya dapat menempati rumah layak bersama keluarganya melalui program CSR PT Kristalin Ekalestari yang berkomitmen membantu masyarakat mendapatkan tempat tinggal yang lebih baik.',
                        fullContent: {
                            title: 'CSR PT Kristalin Ekalestari, Nelayan Desa Nifasi Akhirnya Miliki Rumah Layak',
                            date: '19 Maret 2025',
                            author: 'Rizki',
                            source: 'Viva.co.id',
                            sourceUrl:
                                'https://banten.viva.co.id/berita/5886-csr-pt-kristalin-ekalestari-nelayan-desa-nifasi-akhirnya-miliki-rumah-layak',
                            image: '/pembangunan6.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                                        <h3 class="text-lg font-bold text-blue-900 mb-3">Kebahagiaan Besar Nelayan Mendapatkan Rumah Layak</h3>
                                        <p class="text-blue-800 leading-relaxed text-base">
                                            Yustinus Monei, seorang nelayan di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, akhirnya dapat menempati rumah layak bersama keluarganya. Rumah ini diberikan melalui program Corporate Social Responsibility (CSR) PT Kristalin Ekalestari, yang berkomitmen membantu masyarakat setempat mendapatkan tempat tinggal yang lebih baik. Momen ini menjadi kebahagiaan besar bagi Yustinus, yang selama ini belum memiliki rumah sendiri.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Rasa Syukur yang Mendalam</h3>

                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Yustinus Monei mengungkapkan rasa syukur yang mendalam atas rumah yang diterimanya. Sebagai nelayan yang telah lama bekerja di laut, mendapatkan rumah layak adalah impian yang akhirnya terwujud melalui program CSR PT Kristalin Ekalestari.
                                            </p>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <blockquote class="text-lg italic text-gray-700 border-l-4 border-amber-500 pl-4">
                                                    "Saya sangat bersyukur dan tidak menyangka bisa mendapatkan rumah ini. Sekarang, saya dan keluarga bisa tinggal di tempat yang lebih nyaman."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 mt-2 block">- Yustinus Monei, Nelayan Desa Nifasi</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Proses Pendataan dan Rekomendasi</h3>

                                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Humas PT Kristalin Ekalestari, Maria Erari, menjelaskan bahwa program CSR ini berawal dari pendataan bersama Ketua Adat Desa Nifasi, yang merekomendasikan warga yang belum memiliki rumah. Proses ini dilakukan dengan teliti untuk memastikan bantuan diberikan kepada yang benar-benar membutuhkan.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Proses Pendataan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Kerjasama dengan Ketua Adat</li>
                                                        <li>Identifikasi warga yang membutuhkan</li>
                                                        <li>Evaluasi kondisi ekonomi</li>
                                                        <li>Verifikasi kelayakan penerima</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Kriteria Seleksi</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Warga yang belum memiliki rumah</li>
                                                        <li>Kondisi ekonomi yang membutuhkan</li>
                                                        <li>Rekomendasi dari ketua adat</li>
                                                        <li>Kesediaan merawat rumah</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Spesifikasi Rumah yang Dibangun</h3>

                                        <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                PT Kristalin Ekalestari telah membangun puluhan rumah tipe 57 dengan dua kamar tidur dan satu kamar mandi. Pembangunan rumah ini dimulai sejak Januari 2025, dengan fokus pada warga yang benar-benar membutuhkan tempat tinggal yang layak.
                                            </p>

                                            <div class="grid md:grid-cols-3 gap-6 mt-6">
                                                <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                                                    <div class="bg-orange-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                                        <svg class="text-orange-600 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                                        </svg>
                                                    </div>
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Tipe 57</h4>
                                                    <p class="text-sm text-gray-600">Luas bangunan 57 meter persegi</p>
                                                </div>
                                                <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                                                    <div class="bg-orange-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                                        <svg class="text-orange-600 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                                                        </svg>
                                                    </div>
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">2 Kamar Tidur</h4>
                                                    <p class="text-sm text-gray-600">Kamar tidur utama dan kamar anak</p>
                                                </div>
                                                <div class="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                                                    <div class="bg-orange-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                                        <svg class="text-orange-600 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                    </div>
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">1 Kamar Mandi</h4>
                                                    <p class="text-sm text-gray-600">Kamar mandi dengan fasilitas lengkap</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Komitmen Perusahaan yang Legal dan Berizin</h3>

                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                PT Kristalin Ekalestari menegaskan bahwa kehadiran mereka di Nabire, Papua Tengah, tidak hanya berfokus pada bisnis, tetapi juga berdampak positif bagi masyarakat. Perusahaan ingin membuktikan bahwa mereka adalah perusahaan yang legal, berizin, dan memiliki kepedulian sosial yang nyata.
                                            </p>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <blockquote class="text-lg italic text-gray-700 border-l-4 border-purple-500 pl-4">
                                                    "Kami ingin membuktikan bahwa perusahaan ini legal, berizin, dan memiliki kepedulian sosial yang nyata. Kesejahteraan masyarakat adalah prioritas kami."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 mt-2 block">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Program CSR yang Komprehensif</h3>

                                        <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Sebelumnya, perusahaan ini juga telah menyerahkan puluhan rumah layak huni di Desa Nifasi dan melakukan renovasi total rumah tidak layak. Selain membangun rumah bagi warga, PT Kristalin Ekalestari juga aktif dalam berbagai program sosial yang komprehensif.
                                            </p>

                                            <div class="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Pembangunan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Pembangunan rumah layak huni</li>
                                                        <li>Renovasi rumah tidak layak</li>
                                                        <li>Pembangunan gereja</li>
                                                        <li>Infrastruktur desa</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Program Bantuan</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>Bantuan pendidikan</li>
                                                        <li>Distribusi sembako</li>
                                                        <li>Kendaraan operasional</li>
                                                        <li>Pemberdayaan masyarakat</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Dampak Positif bagi Masyarakat</h3>

                                        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Dengan adanya program CSR ini, diharapkan lebih banyak warga yang mendapatkan bantuan serupa, sehingga kualitas hidup mereka semakin meningkat. PT Kristalin Ekalestari tidak hanya hadir sebagai perusahaan, tetapi juga sebagai bagian dari komunitas yang ingin melihat perubahan positif bagi masyarakat.
                                            </p>

                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <blockquote class="text-lg italic text-gray-700 border-l-4 border-indigo-500 pl-4">
                                                    "Kami tidak hanya hadir sebagai perusahaan, tetapi juga sebagai bagian dari komunitas yang ingin melihat perubahan positif bagi masyarakat."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 mt-2 block">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                                        <h3 class="text-lg font-bold text-gray-900 mb-3">Komitmen Berkelanjutan</h3>
                                        <p class="text-gray-800 leading-relaxed text-base">
                                            Penyerahan rumah kepada nelayan Yustinus Monei merupakan bukti nyata komitmen PT Kristalin Ekalestari dalam menjalankan program Corporate Social Responsibility yang berkelanjutan. Melalui program CSR yang komprehensif, perusahaan tidak hanya memberikan bantuan rumah, tetapi juga mendukung pembangunan gereja, pendidikan, bantuan sembako, dan kendaraan operasional masyarakat. Program ini diharapkan dapat memberikan dampak positif yang berkelanjutan bagi masyarakat Desa Nifasi dan sekitarnya di Papua Tengah, menciptakan kehidupan yang lebih baik dan sejahtera.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
        ],
    },
    {
        month: 'JUNI',
        monthId: 'juni-2025',
        categories: [
            {
                id: 'pendanaan-pendidikan',
                title: 'Pendanaan Pendidikan',
                newsItems: [
                    {
                        id: 'jun-1',
                        title: 'Dana Pendidikan Pelajar SMA Desa Nifasi Dijamin Hingga Lulus',
                        date: '26 Jun 2025',
                        url: '/news/jun-1',
                        excerpt:
                            'PT Kristalin Ekalestari menanggung fasilitas dana pendidikan bagi delapan pelajar SMAN 6 Nabire asal Desa Nifasi hingga menyelesaikan studi.',
                        fullContent: {
                            title: 'Dana Pendidikan Pelajar SMA Desa Nifasi Dijamin Hingga Lulus',
                            date: '26 Juni 2025',
                            author: 'Deny Irwanto',
                            source: 'MetroTV News',
                            sourceUrl:
                                'https://www.metrotvnews.com/read/koGCdw0A-dana-pendidikan-sejumlah-pelajar-sma-di-desa-nifasi-nabire-terjamin-hingga-lulus',
                            image: '/pendanaan1.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Fasilitas Dana Pendidikan untuk Pelajar SMAN 6 Nabire</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Delapan pelajar SMAN 6 Nabire yang berasal dari Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, memperoleh dukungan dana pendidikan dari <strong>PT Kristalin Ekalestari</strong>. Bantuan ini memastikan para siswa dapat fokus belajar hingga lulus tanpa terkendala biaya.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Rincian Program</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Pembiayaan pendidikan diberikan melalui program <em>Corporate Social Responsibility</em> (CSR) perusahaan. Total pendanaan yang difasilitasi mencapai <strong>Rp18.240.000</strong>, dialokasikan untuk kebutuhan biaya sekolah para siswa hingga tuntas pendidikan menengah atas.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Cakupan Bantuan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Fasilitasi biaya pendidikan kelas X sampai XII</li>
                                                        <li>Koordinasi dengan pihak sekolah untuk penyaluran</li>
                                                        <li>Pendampingan administratif hingga selesai</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Nilai dan Mekanisme</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Total nilai bantuan: Rp18.240.000</li>
                                                        <li>Disalurkan ke sekolah dan diterima orang tua/wali</li>
                                                        <li>Seleksi berdasarkan rekomendasi adat dan kebutuhan</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Proses Penyerahan</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Penyerahan bantuan dilakukan melalui pihak <strong>SMAN 6 Nabire</strong> untuk kemudian disalurkan kepada orang tua atau wali murid. Langkah ini memastikan dana digunakan tepat sasaran dan memudahkan proses administrasi sekolah.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Bantuan pendidikan ini merupakan aspirasi masyarakat dan pemuka adat Desa Nifasi. Kami fasilitasi biaya sejak kelas X sampai XII agar siswa dapat menyelesaikan studi dengan baik."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Andrian Lubis, Senior Manager & Finance Division PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Penerima Manfaat</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Program ini menyasar delapan pelajar warga Desa Nifasi yang terdata dan direkomendasikan. Di antaranya: Juan Pharez Misiro, Putri Helen Erari, Ari Jon Otto Manuaron, Gerson Yunus Manuaron, Melan Solince Rumawi, Peter Monei, Sani Nestapia Yonas, dan Tiimotius Welem Manuaron.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Komitmen Berkelanjutan</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Dukungan terhadap pendidikan di Nabire telah berjalan dalam berbagai bentuk, termasuk kerja sama dengan perguruan tinggi serta bantuan mahasiswa. PT Kristalin Ekalestari berkomitmen melanjutkan program CSR yang berdampak nyata bagi peningkatan kualitas pendidikan di Papua Tengah.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'jun-2',
                        title: 'PT Kristalin Ekalestari Biayai Pendidikan 8 Pelajar SMAN 6 Nabire Melalui Program CSR',
                        date: '26 Jun 2025',
                        url: '/news/jun-2',
                        excerpt:
                            'Program CSR PT Kristalin Ekalestari memberikan bantuan dana pendidikan senilai Rp18.240.000 kepada delapan pelajar SMAN 6 Nabire asal Desa Nifasi.',
                        fullContent: {
                            title: 'PT Kristalin Ekalestari Biayai Pendidikan 8 Pelajar SMAN 6 Nabire Melalui Program CSR',
                            date: '26 Juni 2025',
                            author: 'Tim Redaksi',
                            source: 'Warta Ekonomi',
                            sourceUrl:
                                'https://wartaekonomi.co.id/read572556/kristalin-ekalestari-biayai-pendidikan-8-pelajar-sman-6-nabire-lewat-program-csr',
                            image: '/pendanaan2.webp',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Program CSR Pendidikan untuk Masyarakat Desa Nifasi</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            <strong>PT Kristalin Ekalestari</strong> melalui program Corporate Social Responsibility (CSR) kembali menunjukkan komitmennya dalam mendukung pendidikan masyarakat sekitar perusahaan. Kali ini, bantuan dana pendidikan disalurkan kepada delapan pelajar SMAN 6 Nabire yang berasal dari Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Detail Program Bantuan</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                <strong>Andrian Lubis A.Md</strong>, Senior Manager & Finance Division PT Kristalin Ekalestari, mengungkapkan bahwa total bantuan dana pendidikan yang diberikan mencapai <strong>Rp18.240.000</strong>. Bantuan ini mencakup pembiayaan pendidikan untuk delapan siswa dari kelas X hingga kelas XII, memastikan mereka dapat menyelesaikan pendidikan menengah atas tanpa terkendala biaya.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Nilai dan Cakupan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Total bantuan: Rp18.240.000</li>
                                                        <li>Mencakup biaya kelas X sampai XII</li>
                                                        <li>Delapan pelajar SMAN 6 Nabire</li>
                                                        <li>Asal Desa Nifasi, Distrik Makimi</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Mekanisme Penyaluran</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Disalurkan melalui SMAN 6 Nabire</li>
                                                        <li>Diteruskan kepada orang tua/wali murid</li>
                                                        <li>Berdasarkan rekomendasi pemuka adat</li>
                                                        <li>Seleksi berdasarkan kebutuhan</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Aspirasi Masyarakat dan Pemuka Adat</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Program ini merupakan aspirasi dari pemuka adat dan warga Desa Nifasi. Nama-nama siswa dikirimkan kepada kami dan kemudian kami fasilitasi pembiayaan dana pendidikan hingga mereka lulus."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Andrian Lubis A.Md, Senior Manager & Finance Division PT Kristalin Ekalestari</cite>
                                            </div>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                Program bantuan pendidikan ini sejalan dengan program pemerintah dalam mewujudkan <strong>Indonesia Emas 2045</strong>. Perusahaan berkomitmen mendukung pendidikan berkualitas dan memastikan akses pendidikan yang layak, terutama di wilayah-wilayah terpencil seperti Desa Nifasi.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Daftar Penerima Bantuan</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="mb-4 text-base leading-relaxed text-gray-800">
                                                Berikut adalah daftar delapan pelajar yang menerima bantuan dana pendidikan dari PT Kristalin Ekalestari:
                                            </p>
                                            <div class="grid gap-4 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-4 shadow-sm">
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>• Juan Pharez Misiro</li>
                                                        <li>• Putri Helen Erari</li>
                                                        <li>• Ari Jon Otto Manuaron</li>
                                                        <li>• Gerson Yunus Manuaron</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-4 shadow-sm">
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li>• Melan Solince Rumawi</li>
                                                        <li>• Peter Monei</li>
                                                        <li>• Sani Nestapia Yonas</li>
                                                        <li>• Tiimotius Welem Manuaron</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komitmen Berkelanjutan</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Ini bukan kali pertama PT Kristalin Ekalestari memberikan bantuan pendidikan bagi warga Desa Nifasi. Sebelumnya, bantuan serupa juga telah disalurkan kepada siswa tingkat SMP, menunjukkan komitmen berkelanjutan perusahaan dalam mendukung pendidikan di wilayah operasionalnya.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Pendidikan di negeri ini memang telah digratiskan, namun kami ingin membantu memastikan bahwa akses terhadap pendidikan yang layak tetap bisa diraih, terutama di wilayah-wilayah terpencil."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Andrian Lubis A.Md, Senior Manager & Finance Division PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Kerja Sama dengan Perguruan Tinggi</h3>
                                        <div class="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Selain program pendidikan menengah, PT Kristalin Ekalestari juga menjalin kerja sama dengan <strong>Universitas Satya Wiyata Mandala (Uswim) Nabire</strong>. Program ini bertujuan untuk mendukung pendidikan tinggi melalui pemberian beasiswa bagi mahasiswa yang putus kuliah dan pengembangan kapasitas dosen.
                                            </p>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                Langkah ini memperkuat komitmen perusahaan terhadap pengembangan sumber daya manusia dan mencetak individu berintelektual dari Papua Tengah, mendukung visi pembangunan berkelanjutan di wilayah tersebut.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Dampak Positif dan Harapan Ke Depan</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Program CSR pendidikan PT Kristalin Ekalestari diharapkan dapat memberikan dampak positif yang berkelanjutan bagi masyarakat Desa Nifasi. Dengan dukungan pendidikan yang memadai, generasi muda di wilayah tersebut dapat mengembangkan potensi mereka dan berkontribusi pada pembangunan daerah. Perusahaan berkomitmen untuk terus mendukung program-program pendidikan yang berdampak nyata bagi masyarakat sekitar.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
            {
                id: 'pembangunan-rumah-juni',
                title: 'Pembangunan Rumah Baru di Desa Nifasi',
                newsItems: [
                    {
                        id: 'jun-3',
                        title: 'PT Kristalin Ekalestari Serahkan Rumah Baru kepada Ibu Rumah Tangga di Desa Nifasi',
                        date: '24 Jun 2025',
                        url: '/news/jun-3',
                        excerpt:
                            'Yuliana Manuaron menerima rumah layak huni dari PT Kristalin Ekalestari melalui program CSR, memberikan harapan baru bagi keluarga di Desa Nifasi.',
                        fullContent: {
                            title: 'PT Kristalin Ekalestari Serahkan Rumah Baru kepada Ibu Rumah Tangga di Desa Nifasi',
                            date: '24 Juni 2025',
                            author: 'Tim Redaksi',
                            source: 'TerasMedia',
                            sourceUrl:
                                'https://terasmedia.co/hukum-dan-kriminal/30710/pt-kristalin-ekalestari-serahkan-rumah-baru-ibu-rumah-tangga-di-desa-nifasi/',
                            image: '/pembangunandesanifasi1.webp',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Kebahagiaan Keluarga Manuaron di Desa Nifasi</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Pasangan suami istri di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, merasakan kebahagiaan yang luar biasa setelah menerima bantuan rumah layak huni dari <strong>PT Kristalin Ekalestari</strong>. <strong>Yuliana Manuaron</strong>, seorang ibu rumah tangga, bersama suaminya yang bekerja sebagai buruh lepas, kini dapat menempati rumah baru dengan bangunan berwarna hijau yang nyaman dan layak.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Spesifikasi Rumah yang Diterima</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                PT Kristalin Ekalestari telah menyerahkan rumah tipe 57 dengan spesifikasi bangunan tembok semi permanen yang memiliki dua kamar tidur dan satu kamar mandi. Rumah ini dibangun dengan standar kualitas yang baik, memberikan kenyamanan dan keamanan bagi keluarga penerima manfaat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Detail Rumah</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Tipe 57 dengan bangunan tembok semi permanen</li>
                                                        <li>Dua kamar tidur yang nyaman</li>
                                                        <li>Satu kamar mandi lengkap</li>
                                                        <li>Cat berwarna hijau yang menarik</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Lokasi dan Penerima</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Desa Nifasi, Distrik Makimi</li>
                                                        <li>Kabupaten Nabire, Papua Tengah</li>
                                                        <li>Penerima: Yuliana Manuaron</li>
                                                        <li>Suami bekerja sebagai buruh lepas</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Ucapan Syukur dari Penerima</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Terima kasih banyak perusahaan PT Kristalin Ekalestari. Puji Tuhan, saya bisa dapat rumah dari Kristalin. Terima kasih."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Yuliana Manuaron, Penerima Bantuan Rumah</cite>
                                            </div>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                Yuliana mengungkapkan rasa syukurnya karena sebelumnya keluarga mereka memang belum memiliki rumah sendiri. Bantuan ini memberikan harapan baru dan kenyamanan hidup yang lebih baik bagi keluarga Manuaron di Desa Nifasi.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komitmen Berkelanjutan Perusahaan</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, menjelaskan bahwa ini sudah kesekian kalinya pihaknya menyerahkan rumah untuk masyarakat yang belum memiliki rumah. Proses seleksi dilakukan dengan pendataan yang detail dan berdasarkan rekomendasi dari Ketua Adat setempat.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Ini bukti komitmen kami sebagai perusahaan yang bergerak di Tambang, memberikan manfaat banyak kepada masyarakat terutama warga yang belum mendapatkan rumah lewat program CSR."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Transformasi Desa Nifasi</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Maria Erari mengilustrasikan Desa Nifasi sebagai seorang wanita yang berubah menjadi cantik dan terawat. "Kami ibaratkan Desa ini sebelumnya biasa-biasa saja, kini menjadi berubah seperti wanita cantik yang terawat dan memberikan manfaat banyak kepada masyarakat dengan kehadiran kami PT Kristalin Ekalestari," katanya.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Dalam situasi apapun kami akan memberikan yang terbaik untuk warga. Bisa melihat pembangunan Desa ini luar biasa selain itu kami juga menggerakan roda ekonomi untuk lokasi wisata Sungai Musairo."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program CSR Komprehensif</h3>
                                        <div class="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Melalui program Corporate Social Responsibility (CSR), PT Kristalin Ekalestari tidak hanya membantu warga yang belum memiliki rumah, tetapi juga melakukan renovasi total rumah yang tidak layak huni. Program ini mencakup berbagai aspek pembangunan masyarakat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Pembangunan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Pembangunan rumah untuk warga yang belum memiliki</li>
                                                        <li>Renovasi total rumah tidak layak huni</li>
                                                        <li>Pembangunan gereja untuk masyarakat</li>
                                                        <li>Dukungan program pendidikan</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Bantuan Lainnya</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Bantuan sembako untuk masyarakat</li>
                                                        <li>Kendaraan operasional masyarakat</li>
                                                        <li>Kendaraan operasional gereja</li>
                                                        <li>Pengembangan ekonomi lokal</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Kontribusi Ekonomi dan Wisata</h3>
                                        <div class="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Selain program pembangunan rumah, PT Kristalin Ekalestari juga berkontribusi dalam menggerakkan roda ekonomi lokal, khususnya untuk lokasi wisata Sungai Musairo. Hal ini menunjukkan komitmen perusahaan untuk memberikan dampak positif yang berkelanjutan bagi masyarakat sekitar.
                                            </p>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                Perusahaan berkomitmen untuk terus berkontribusi dan konsisten sebagai perusahaan yang legal dan berizin di wilayah Nabire, Papua Tengah, dengan selalu berupaya memberikan kontribusi terbaik untuk masyarakat sekitar.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Harapan dan Dampak Positif</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Penyerahan rumah kepada Yuliana Manuaron dan keluarganya merupakan bukti nyata komitmen PT Kristalin Ekalestari dalam meningkatkan kesejahteraan masyarakat Desa Nifasi. Program CSR yang komprehensif ini diharapkan dapat memberikan dampak positif yang berkelanjutan, tidak hanya dalam hal perumahan, tetapi juga dalam aspek ekonomi, sosial, dan pembangunan infrastruktur desa. Perusahaan berkomitmen untuk terus mendukung pembangunan yang berkelanjutan dan memberikan manfaat nyata bagi masyarakat sekitar.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'jun-4',
                        title: 'Komitmen PT Kristalin Ekalestari Berikan Manfaat Nyata bagi Warga Desa Nifasi',
                        date: '24 Jun 2025',
                        url: '/news/jun-4',
                        excerpt:
                            'PT Kristalin Ekalestari menunjukkan komitmen berkelanjutan dalam memberikan manfaat nyata bagi masyarakat Desa Nifasi melalui program CSR yang komprehensif.',
                        fullContent: {
                            title: 'Komitmen PT Kristalin Ekalestari Berikan Manfaat Nyata bagi Warga Desa Nifasi',
                            date: '24 Juni 2025',
                            author: 'Tim Redaksi',
                            source: 'JPNN.com',
                            sourceUrl: 'https://www.jpnn.com/news/komitmen-pt-kristalin-ekalestari-berikan-manfaat-warga-desa-nifasi',
                            image: '/pembangunandesanifasi2.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Komitmen Berkelanjutan untuk Masyarakat Desa Nifasi</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            <strong>PT Kristalin Ekalestari</strong> terus menunjukkan komitmennya dalam memberikan manfaat nyata bagi warga Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Sebagai perusahaan yang legal dan berizin di wilayah Nabire, perusahaan berkomitmen untuk terus berkontribusi dan konsisten memberikan kontribusi terbaik untuk masyarakat sekitar.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program CSR Komprehensif</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Melalui program Corporate Social Responsibility (CSR), PT Kristalin Ekalestari membantu warga yang belum memiliki rumah dan melakukan renovasi total rumah yang tidak layak huni. Program ini mencakup berbagai aspek pembangunan masyarakat yang berkelanjutan.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Pembangunan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Pembangunan rumah untuk warga yang belum memiliki</li>
                                                        <li>Renovasi total rumah tidak layak huni</li>
                                                        <li>Pembangunan gereja untuk masyarakat</li>
                                                        <li>Dukungan program pendidikan</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Bantuan Lainnya</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Bantuan sembako untuk masyarakat</li>
                                                        <li>Kendaraan operasional masyarakat</li>
                                                        <li>Kendaraan operasional gereja</li>
                                                        <li>Pengembangan ekonomi lokal</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Transformasi Desa Nifasi</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, mengilustrasikan Desa Nifasi sebagai seorang wanita yang berubah menjadi cantik dan terawat. "Kami ibaratkan desa ini sebelumnya biasa-biasa saja, kini menjadi berubah seperti wanita cantik yang terawat dan memberikan manfaat banyak kepada masyarakat dengan kehadiran kami PT Kristalin Ekalestari," katanya.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Bisa melihat pembangunan desa ini luar biasa selain itu kami juga menggerakan roda ekonomi untuk lokasi wisata Sungai Musairo."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Dampak Ekonomi dan Wisata</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Selain program pembangunan rumah dan infrastruktur, PT Kristalin Ekalestari juga berkontribusi dalam menggerakkan roda ekonomi lokal, khususnya untuk lokasi wisata Sungai Musairo. Hal ini menunjukkan komitmen perusahaan untuk memberikan dampak positif yang berkelanjutan bagi masyarakat sekitar.
                                            </p>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                Perusahaan berkomitmen untuk terus berkontribusi dan konsisten sebagai perusahaan yang legal dan berizin di wilayah Nabire, Papua Tengah, dengan selalu berupaya memberikan kontribusi terbaik untuk masyarakat sekitar.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program Berkelanjutan</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                PT Kristalin Ekalestari telah membangun rumah ke-27 untuk warga Desa Nifasi, menunjukkan komitmen berkelanjutan dalam program pembangunan perumahan. Selain itu, perusahaan juga menyalurkan ratusan paket sembako untuk memenuhi kebutuhan dasar masyarakat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Pencapaian Program</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Rumah ke-27 telah dibangun untuk warga</li>
                                                        <li>Ratusan paket sembako disalurkan</li>
                                                        <li>Renovasi rumah tidak layak huni</li>
                                                        <li>Pembangunan infrastruktur gereja</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Dampak Positif</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Meningkatkan kesejahteraan masyarakat</li>
                                                        <li>Menggerakkan roda ekonomi lokal</li>
                                                        <li>Mendukung pengembangan wisata</li>
                                                        <li>Meningkatkan kualitas hidup warga</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komitmen Legal dan Berizin</h3>
                                        <div class="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Sebagai perusahaan yang legal dan berizin di wilayah Nabire, Papua Tengah, PT Kristalin Ekalestari berkomitmen untuk terus memberikan kontribusi terbaik bagi masyarakat sekitar. Dalam situasi apapun, perusahaan akan berkontribusi dan konsisten dalam menjalankan program CSR yang berdampak nyata.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Dalam situasi apapun perusahaannya akan berkontribusi dan konsisten sebagai perusahaan yang legal dan berizin di wilayah Nabire, Papua Tengah, akan terus berupaya memberikan kontribusi yang terbaik untuk masyarakat sekitar."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Dampak Jangka Panjang</h3>
                                        <div class="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Program CSR PT Kristalin Ekalestari di Desa Nifasi tidak hanya memberikan manfaat langsung, tetapi juga menciptakan dampak jangka panjang yang berkelanjutan. Pembangunan infrastruktur, peningkatan kualitas hidup, dan pengembangan ekonomi lokal akan terus memberikan manfaat bagi generasi mendatang.
                                            </p>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                Perusahaan berkomitmen untuk terus mendukung pembangunan yang berkelanjutan dan memberikan manfaat nyata bagi masyarakat sekitar, menciptakan sinergi positif antara perusahaan dan masyarakat.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Harapan dan Visi Ke Depan</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Komitmen PT Kristalin Ekalestari dalam memberikan manfaat nyata bagi warga Desa Nifasi merupakan wujud tanggung jawab sosial perusahaan yang berkelanjutan. Melalui program CSR yang komprehensif, perusahaan berharap dapat terus berkontribusi dalam meningkatkan kesejahteraan masyarakat, mengembangkan infrastruktur desa, dan menciptakan dampak positif yang berkelanjutan bagi generasi mendatang di wilayah Nabire, Papua Tengah.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
        ],
    },
    {
        month: 'JULI',
        monthId: 'juli-2025',
        categories: [
            {
                id: 'csr-pembagian-sembako-juli',
                title: 'CSR Pembagian 506 Paket Sembako di Desa Nifasi',
                newsItems: [
                    {
                        id: 'jul-1',
                        title: 'Ratusan Warga Desa Nifasi Terima Bantuan Paket Sembako dari PT Kristalin Ekalestari',
                        date: '08 Jul 2025',
                        url: '/news/jul-1',
                        excerpt:
                            'PT Kristalin Ekalestari menyalurkan 506 paket sembako kepada 506 Kepala Keluarga di Desa Nifasi melalui program CSR yang konsisten setiap bulan.',
                        fullContent: {
                            title: 'Ratusan Warga Desa Nifasi Terima Bantuan Paket Sembako dari PT Kristalin Ekalestari',
                            date: '08 Juli 2025',
                            author: 'Tim Redaksi',
                            source: 'SindoNews',
                            sourceUrl:
                                'https://daerah.sindonews.com/read/1590209/174/ratusan-warga-kampung-mamai-papua-terima-bantuan-paket-sembako-1751972838/5',
                            image: '/pembagian1.webp',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Program CSR Konsisten untuk Masyarakat Desa Nifasi</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Warga Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, menerima bantuan paket sembako dari <strong>PT Kristalin Ekalestari</strong> melalui program Corporate Social Responsibility (CSR) yang konsisten. Bantuan ini sebagian besar diberikan kepada janda lanjut usia (lansia) sebagai bentuk kepedulian perusahaan terhadap masyarakat yang membutuhkan.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Distribusi 506 Paket Sembako</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, menjelaskan bahwa bantuan bulan Juli 2025 ini merupakan program CSR yang rutin dilaksanakan setiap bulan tanpa pengurangan jumlah. "Bantuan bulan Juli 2025 ini program CSR, kami rutin setiap bulannya dan tidak ada yang berkurang serta menambah sebanyak 506 paket sembako untuk 506 KK," ujarnya pada Selasa (8/7/2025).
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Detail Distribusi</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Total paket sembako: 506 paket</li>
                                                        <li>Target penerima: 506 Kepala Keluarga</li>
                                                        <li>Lokasi: Desa Nifasi dan sekitarnya</li>
                                                        <li>Frekuensi: Rutin setiap bulan</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Komposisi Paket</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Beras sebagai makanan pokok</li>
                                                        <li>Telur sebagai protein hewani</li>
                                                        <li>Mie instan untuk kebutuhan praktis</li>
                                                        <li>Minyak goreng untuk memasak</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komposisi Lengkap Paket Sembako</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Maria menambahkan bahwa perusahaannya selalu konsisten menyalurkan bantuan melalui Program CSR tersebut ke masyarakat sekitar lingkungan area pekerjaan. Paket sembako yang disalurkan meliputi beras, telur, mie instan, minyak goreng, tepung terigu, sabun cuci, kopi dan teh.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Bahan Makanan Pokok</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Beras - makanan pokok utama</li>
                                                        <li>Telur - sumber protein hewani</li>
                                                        <li>Mie instan - makanan praktis</li>
                                                        <li>Minyak goreng - untuk memasak</li>
                                                        <li>Tepung terigu - bahan baku kue</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Kebutuhan Tambahan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Sabun cuci - kebutuhan kebersihan</li>
                                                        <li>Kopi - minuman sehari-hari</li>
                                                        <li>Teh - minuman alternatif</li>
                                                        <li>Paket lengkap untuk kebutuhan dasar</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Prioritas untuk Janda Lansia</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Dari 506 paket sembako yang disalurkan, hampir 50 persen diberikan kepada kalangan janda lansia. Bantuan ini diantarkan langsung berdasarkan data yang sudah ditentukan dan rekomendasi dari kepala suku dan adat setempat.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Dari 506 yang disalurkan hampir sekira 50 persen yang menerima dari kalangan janda lansia, yang kami antarkan langsung dari data yang sudah ditentukan dan rekomendasi kepala suku dan adat."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Jangkauan Distribusi</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Bantuan 506 paket sembako ini diberikan untuk 506 Kepala Keluarga (KK) warga di Desa Nifasi dan sekitarnya sebagai tanggung jawab sosial perusahaan. Bantuan ratusan paket sembako tersebut selalu disalurkan setiap bulannya kepada masyarakat, baik di tempat-tempat peribadatan warga maupun kantor pelayanan publik.
                                            </p>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                Bantuan disebarkan ke berbagai lokasi termasuk Desa Nifasi, Suku Dani, Kampung Mamai, Kampung Orluk, Kampung Makimi, Desa Samabusa, dan Desa Waharia.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program CSR Komprehensif</h3>
                                        <div class="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Selain program pembagian sembako, PT Kristalin Ekalestari juga telah merealisasikan program lainnya sebagai bentuk tanggung jawab sosial perusahaan terhadap lingkungan dan masyarakat. Program ini mencakup berbagai aspek pembangunan masyarakat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Pendidikan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Renovasi sekolah-sekolah</li>
                                                        <li>Dukungan program pendidikan</li>
                                                        <li>Bantuan sarana belajar</li>
                                                        <li>Peningkatan kualitas pendidikan</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Infrastruktur</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Pembangunan gereja</li>
                                                        <li>Bedah rumah warga</li>
                                                        <li>Kegiatan masyarakat</li>
                                                        <li>Pembangunan fasilitas umum</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Konsistensi Program</h3>
                                        <div class="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Program CSR PT Kristalin Ekalestari di Desa Nifasi menunjukkan konsistensi yang tinggi dalam memberikan bantuan kepada masyarakat. Setiap bulan, perusahaan menyalurkan bantuan sembako tanpa pengurangan jumlah, bahkan menambah jumlah paket sesuai kebutuhan masyarakat.
                                            </p>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                Hal ini menunjukkan komitmen perusahaan untuk terus memberikan manfaat nyata bagi masyarakat sekitar area operasional perusahaan, khususnya di wilayah Papua Tengah.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Dampak Positif dan Harapan Ke Depan</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Program pembagian 506 paket sembako di Desa Nifasi merupakan wujud nyata komitmen PT Kristalin Ekalestari dalam memberikan manfaat langsung kepada masyarakat. Dengan prioritas khusus untuk janda lansia dan koordinasi yang baik dengan kepala suku dan adat, program ini diharapkan dapat terus memberikan dampak positif yang berkelanjutan bagi kesejahteraan masyarakat Desa Nifasi dan sekitarnya.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'jul-3',
                        title: 'PT Kristalin Ekalestari Salurkan 506 Paket Sembako, 50 Persen Diterima Janda Lansia',
                        date: '08 Jul 2025',
                        url: '/news/jul-3',
                        excerpt:
                            'PT Kristalin Ekalestari menyalurkan 506 paket sembako untuk 506 Kepala Keluarga di Desa Nifasi, dengan 50 persen diantaranya diberikan kepada janda lanjut usia sebagai prioritas utama.',
                        fullContent: {
                            title: 'PT Kristalin Ekalestari Salurkan 506 Paket Sembako, 50 Persen Diterima Janda Lansia',
                            date: '08 Juli 2025',
                            author: 'Tim Redaksi',
                            source: 'IPOL.id',
                            sourceUrl:
                                'https://ipol.id/2025/07/pt-kristalin-ekalestari-salurkan-506-paket-sembako-50-persen-diantaranya-diterima-janda-lansia/',
                            image: '/pembagian3.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Program CSR Konsisten untuk Kesejahteraan Masyarakat</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Dalam rangka Corporate Social Responsibility (CSR), <strong>PT Kristalin Ekalestari</strong> menyerahkan bantuan 506 paket sembako bulan Juli 2025 untuk 506 Kepala Keluarga (KK) warga di Desa Nifasi dan sekitarnya. Program ini menunjukkan komitmen perusahaan dalam memberikan kontribusi nyata bagi kesejahteraan masyarakat sekitar area operasional.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Distribusi Rutin Setiap Bulan</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, menerangkan bahwa pihaknya menyerahkan bantuan 506 paket sembako bulan Juli 2025 untuk 506 Kepala Keluarga (KK) warga di Desa Nifasi dan sekitarnya sebagai tanggung jawab sosial perusahaan. Program ini dilaksanakan secara rutin setiap bulan tanpa pengurangan jumlah.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Untuk bantuan bulan Juli 2025 ini, kami rutin ya setiap bulannya dan tidak ada yang berkurang dan menambah sebanyak 506 paket sembako untuk 506 KK."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Rutin</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Distribusi bulanan yang konsisten</li>
                                                        <li>506 paket untuk 506 Kepala Keluarga</li>
                                                        <li>Lokasi: Desa Nifasi dan sekitarnya</li>
                                                        <li>Tanggung jawab sosial perusahaan</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Konsistensi Program</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Tidak ada pengurangan jumlah</li>
                                                        <li>Kualitas bantuan terjaga</li>
                                                        <li>Distribusi tepat waktu</li>
                                                        <li>Komitmen berkelanjutan</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Prioritas untuk Janda Lansia</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Dari 506 paket sembako yang disalurkan, hampir 50 persen diantaranya para janda Lanjut Usia (Lansia). Bantuan ini diantarkan langsung berdasarkan data yang sudah ditentukan dan rekomendasi dari kepala suku dan adat setempat, menunjukkan perhatian khusus perusahaan terhadap kelompok yang paling membutuhkan.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Dari 506 yang disalurkan hampir sekira 50 persen yang menerima dari kalangan Janda Lansia (Lanjut Usia-red) kami antarkan langsung dari data yang sudah ditentukan dan rekomendasi kepala suku dan adat."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Distribusi di Tempat Ibadah dan Kantor Publik</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Maria menambahkan bahwa bantuan ratusan paket sembako dari PT Kristalin Ekalestari hampir sama di bulan-bulan sebelumnya, yakni 506 paket sembako diberikan kepada masyarakat di tempat ibadah seperti gereja, masjid, dan kantor pelayanan publik. Pendekatan ini memastikan distribusi yang terorganisir dan dapat diakses oleh semua lapisan masyarakat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Tempat Ibadah</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Gereja - tempat ibadah Kristen</li>
                                                        <li>Masjid - tempat ibadah Islam</li>
                                                        <li>Akses mudah untuk masyarakat</li>
                                                        <li>Distribusi yang terorganisir</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Kantor Pelayanan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Kantor pelayanan publik</li>
                                                        <li>Pusat administrasi desa</li>
                                                        <li>Koordinasi dengan pemerintah</li>
                                                        <li>Transparansi distribusi</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Apresiasi dari Masyarakat Suku Mamai</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Salah satu warga Suku Mamai yang menerima bantuan sembako mengungkapkan rasa terima kasihnya kepada PT Kristalin Ekalestari. "Terima kasih kepada PT Kristalin Ekalestari sudah memberikan bantuan sembako setiap bulannya, anak-anak sudah menerima," kata warga tersebut, menunjukkan dampak positif program CSR terhadap kehidupan masyarakat.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Terima kasih kepada PT Kristalin Ekalestari sudah memberikan bantuan sembako setiap bulannya, anak-anak sudah menerima."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Warga Suku Mamai, Penerima Bantuan</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komposisi Paket Sembako yang Konsisten</h3>
                                        <div class="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Sembako yang dibagikan tetap sama rutin setiap bulannya, terdiri dari beras, telur, mie instan, minyak goreng, tepung terigu, sabun cuci, kopi dan teh. Konsistensi komposisi paket ini memastikan bahwa masyarakat menerima bantuan yang lengkap dan sesuai dengan kebutuhan dasar sehari-hari.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Bahan Makanan Pokok</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Beras - makanan pokok utama</li>
                                                        <li>Telur - sumber protein hewani</li>
                                                        <li>Mie instan - makanan praktis</li>
                                                        <li>Minyak goreng - untuk memasak</li>
                                                        <li>Tepung terigu - bahan baku kue</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Kebutuhan Tambahan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Sabun cuci - kebutuhan kebersihan</li>
                                                        <li>Kopi - minuman sehari-hari</li>
                                                        <li>Teh - minuman alternatif</li>
                                                        <li>Paket lengkap dan konsisten</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program CSR Komprehensif</h3>
                                        <div class="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Program-program lain PT Kristalin Ekalestari yang sudah direalisasikan merupakan tanggung jawab sosial perusahaan terhadap lingkungan dan masyarakat. Program ini mencakup berbagai aspek pembangunan, antara lain pendidikan, renovasi sekolahan, gereja, bedah rumah warga, dan kegiatan masyarakat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Pendidikan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Renovasi sekolah-sekolah</li>
                                                        <li>Dukungan program pendidikan</li>
                                                        <li>Bantuan sarana belajar</li>
                                                        <li>Peningkatan kualitas pendidikan</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Infrastruktur</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Pembangunan gereja</li>
                                                        <li>Bedah rumah warga</li>
                                                        <li>Kegiatan masyarakat</li>
                                                        <li>Pembangunan fasilitas umum</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Jangkauan Distribusi yang Luas</h3>
                                        <div class="rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Bantuan sembako tersebut disebar di berbagai lokasi strategis, mencakup Desa Nifasi, Suku Dani, Kampung Mamai, Kampung Orluk, Kampung Makimi, Desa Samabusa, dan Desa Waharia. Distribusi yang menyeluruh ini memastikan bahwa manfaat program CSR dapat dirasakan oleh masyarakat di berbagai wilayah sekitar area operasional perusahaan.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Lokasi Distribusi</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Desa Nifasi - lokasi utama</li>
                                                        <li>Suku Dani - komunitas adat</li>
                                                        <li>Kampung Mamai - wilayah terpencil</li>
                                                        <li>Kampung Orluk - area perbatasan</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Wilayah Tambahan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Kampung Makimi - desa tetangga</li>
                                                        <li>Desa Samabusa - komunitas lokal</li>
                                                        <li>Desa Waharia - area terluar</li>
                                                        <li>Jangkauan menyeluruh</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Dampak Berkelanjutan dan Komitmen Masa Depan</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Program pembagian 506 paket sembako oleh PT Kristalin Ekalestari di Desa Nifasi dan sekitarnya telah membuktikan komitmen perusahaan dalam memberikan kontribusi nyata bagi kesejahteraan masyarakat. Dengan prioritas khusus untuk janda lansia dan koordinasi yang baik dengan kepala suku dan adat, program ini diharapkan dapat terus memberikan dampak positif yang berkelanjutan. Konsistensi dalam distribusi dan kualitas bantuan menunjukkan dedikasi perusahaan untuk membangun hubungan yang harmonis dengan masyarakat sekitar area operasional di Papua Tengah.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'jul-2',
                        title: 'Kehadiran PT Kristalin Ekalestari Bukti Kontribusi Nyata untuk Warga Desa Nifasi',
                        date: '08 Jul 2025',
                        url: '/news/jul-2',
                        excerpt:
                            'PT Kristalin Ekalestari membuktikan komitmennya melalui program CSR yang konsisten, memberikan bantuan sembako rutin setiap bulan kepada masyarakat Desa Nifasi.',
                        fullContent: {
                            title: 'Kehadiran PT Kristalin Ekalestari Bukti Kontribusi Nyata untuk Warga Desa Nifasi',
                            date: '08 Juli 2025',
                            author: 'Tim Redaksi',
                            source: 'HarianTerbit',
                            sourceUrl:
                                'https://www.harianterbit.com/megapolitan/27415500844/kehadiran-pt-kristalin-ekalestari-bukti-kontribusi-warga-desa-nifasi',
                            image: '/pembagian2.webp',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Bukti Komitmen Perusahaan untuk Masyarakat</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Kehadiran <strong>PT Kristalin Ekalestari</strong> di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, telah membuktikan kontribusi nyata perusahaan terhadap kesejahteraan masyarakat. Sebanyak 506 paket sembako diserahkan kepada warga Desa Nifasi dalam rangka Corporate Social Responsibility (CSR) yang konsisten dan berkelanjutan.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Distribusi Bantuan untuk 506 Kepala Keluarga</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, menerangkan bahwa pihaknya menyerahkan bantuan 506 paket sembako bulan Juli 2025 untuk 506 Kepala Keluarga (KK) warga di Desa Nifasi dan sekitarnya sebagai tanggung jawab sosial perusahaan.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Untuk bantuan bulan Juli 2025 ini, kami rutin ya setiap bulannya dan tidak ada yang berkurang dan menambah sebanyak 506 paket sembako untuk 506 KK."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Prioritas untuk Janda Lansia</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Dari sekira 50 persen penerima bantuan adalah para janda Lanjut Usia (Lansia). Hal ini menunjukkan kepedulian khusus perusahaan terhadap kelompok masyarakat yang paling membutuhkan bantuan.
                                            </p>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                Maria menambahkan bahwa bantuan ratusan paket sembako dari PT Kristalin Ekalestari hampir sama di bulan-bulan sebelumnya yakni 506 paket sembako diberikan ke masyarakat, tempat ibadah seperti gereja, masjid dan kantor pelayanan publik.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-indigo-500 pl-4 text-lg italic text-gray-700">"Dari 506 yang disalurkan hampir sekira 50 persen yang menerima dari kalangan Janda Lansia (Lanjut Usia-red) kami antarkan langsung dari data yang sudah ditentukan dan rekomendasi kepala suku dan adat."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Konsistensi Program CSR</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Menurut Maria, program bantuan sembako yang disalurkan setiap bulannya oleh PT Kristalin Ekalestari dalam program Corporate Social Responsibility (CSR). Maria menilai konsistensi program CSR perusahaannya untuk masyarakat sekitar lingkungan area pekerjaan dengan menyalurkan sembako.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Karakteristik Program</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Distribusi rutin setiap bulan</li>
                                                        <li>Jumlah konsisten 506 paket</li>
                                                        <li>Tidak ada pengurangan jumlah</li>
                                                        <li>Target 506 Kepala Keluarga</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Lokasi Distribusi</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Tempat ibadah (gereja, masjid)</li>
                                                        <li>Kantor pelayanan publik</li>
                                                        <li>Lokasi strategis masyarakat</li>
                                                        <li>Area sekitar tempat kerja</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Jangkauan Distribusi Luas</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Bantuan sembako tersebut disebar di lokasi Desa Nifasi, Suku Dani, Kampung Mamai, Kampung Orluk, Kampung Mamai, Kampung Makimi, Desa Samabusa dan Desa Waharia. Hal ini menunjukkan jangkauan program yang luas dan komprehensif.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Desa dan Kampung</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Desa Nifasi</li>
                                                        <li>Desa Samabusa</li>
                                                        <li>Desa Waharia</li>
                                                        <li>Kampung Mamai</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Suku dan Kampung Lain</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Suku Dani</li>
                                                        <li>Kampung Orluk</li>
                                                        <li>Kampung Makimi</li>
                                                        <li>Wilayah sekitarnya</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komposisi Paket Sembako Lengkap</h3>
                                        <div class="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Sembako yang dibagikan tetap sama rutin setiap bulannya yakni beras, telur, mie instan, minyak goreng, tepung terigu, sabun cuci, kopi dan teh. Komposisi ini dirancang untuk memenuhi kebutuhan dasar keluarga.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Bahan Makanan Pokok</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Beras - makanan pokok utama</li>
                                                        <li>Telur - sumber protein hewani</li>
                                                        <li>Mie instan - makanan praktis</li>
                                                        <li>Minyak goreng - untuk memasak</li>
                                                        <li>Tepung terigu - bahan baku</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Kebutuhan Tambahan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Sabun cuci - kebersihan</li>
                                                        <li>Kopi - minuman sehari-hari</li>
                                                        <li>Teh - minuman alternatif</li>
                                                        <li>Paket lengkap kebutuhan dasar</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program CSR Komprehensif</h3>
                                        <div class="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Program-program lain PT Kristalin Ekalestari yang sudah direalisasikan merupakan tanggung jawab sosial perusahaan terhadap lingkungan dan masyarakat antara lain, pendidikan, renovasi sekolahan, gereja, bedah rumah warga dan kegiatan masyarakat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Pendidikan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Renovasi sekolah-sekolah</li>
                                                        <li>Dukungan program pendidikan</li>
                                                        <li>Bantuan sarana belajar</li>
                                                        <li>Peningkatan kualitas pendidikan</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Infrastruktur</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Pembangunan gereja</li>
                                                        <li>Bedah rumah warga</li>
                                                        <li>Kegiatan masyarakat</li>
                                                        <li>Pembangunan fasilitas umum</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Apresiasi dari Masyarakat</h3>
                                        <div class="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Salah satu warga Suku Mamai yang menerima bantuan sembako mengungkapkan rasa terima kasihnya kepada PT Kristalin Ekalestari atas bantuan yang diberikan setiap bulannya.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-emerald-500 pl-4 text-lg italic text-gray-700">"Terima kasih kepada PT Kristalin Ekalestari sudah memberikan bantuan sembako setiap bulannya, anak-anak sudah menerima."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Warga Suku Mamai, Desa Nifasi</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Dampak Positif dan Komitmen Berkelanjutan</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Kehadiran PT Kristalin Ekalestari di Desa Nifasi telah membuktikan kontribusi nyata perusahaan dalam meningkatkan kesejahteraan masyarakat. Dengan program CSR yang konsisten dan komprehensif, perusahaan menunjukkan komitmennya untuk terus memberikan manfaat positif bagi masyarakat sekitar area operasional, khususnya di wilayah Papua Tengah. Program ini diharapkan dapat terus berlanjut dan memberikan dampak yang lebih besar bagi pembangunan masyarakat Desa Nifasi dan sekitarnya.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
            {
                id: 'pemberitahuan-bantuan-dana-hak-garap',
                title: 'Pemberitahuan Bantuan Dana Hak Garap',
                newsItems: [
                    {
                        id: 'jul-4',
                        title: 'PT Kristalin Ekalestari Serahkan Bantuan Dana Hak Garap Rp 50 Juta kepada Warga Distrik Makimi Papua',
                        date: '08 Jul 2025',
                        url: '/news/jul-4',
                        excerpt:
                            'PT Kristalin Ekalestari menyerahkan bantuan dana hak garap sebesar Rp 50 juta kepada warga Desa Lagari, Distrik Makimi, Papua Tengah, sebagai bentuk komitmen perusahaan terhadap pemilik hak garap.',
                        fullContent: {
                            title: 'PT Kristalin Ekalestari Serahkan Bantuan Dana Hak Garap Rp 50 Juta kepada Warga Distrik Makimi Papua',
                            date: '08 Juli 2025',
                            author: 'Tim Redaksi',
                            source: 'WartaKota',
                            sourceUrl:
                                'https://wartakota.tribunnews.com/2025/07/08/boyong-ke-jakarta-pt-kristalin-ekalestari-serahkan-bantuan-kepada-warga-distrik-makimi-papua',
                            image: '/pemberitahuan1.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Komitmen Perusahaan terhadap Pemilik Hak Garap</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            <strong>PT Kristalin Ekalestari</strong> menyerahkan bantuan kepada warga Desa Lagari, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Penyerahan bantuan dana hak garap sebesar Rp 50 juta ini merupakan bentuk komitmen perusahaan dalam memberikan rasa adil kepada pemilik hak garap yang berhak menerima bantuan.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Penyerahan Simbolis di Jakarta</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Penyerahan bantuan dilakukan secara simbolis di Menara 165, Pasar Minggu, Jakarta Selatan pada Senin (7/7/2025). <strong>Teguh Arif</strong>, Head of Internal Process PT Kristalin Ekalestari, menyerahkan bantuan kepada <strong>Hans Ingeruhi</strong> yang mewakili warga Desa Lagari, Distrik Makimi, Kabupaten Nabire, Papua Tengah.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Kami melakukan penyerahan secara simbolis kemarin sebesar Rp 50 juta kepada selaku pemilik garapan Bapak Hans Ingeruhi. Ini bagian rutin perusahaan terhadap pemilik hak garap untuk memberikan rasa adil kepada yang berhak."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Andito Prasetyowan, Direktur Utama PT Kristalin Ekalestari</cite>
                                            </div>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Detail Penyerahan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Jumlah bantuan: Rp 50 juta</li>
                                                        <li>Penerima: Hans Ingeruhi</li>
                                                        <li>Lokasi: Menara 165, Jakarta Selatan</li>
                                                        <li>Tanggal: Senin, 7 Juli 2025</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Tujuan Bantuan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Mendukung operasional perusahaan</li>
                                                        <li>Memberikan rasa adil</li>
                                                        <li>Bagian rutin perusahaan</li>
                                                        <li>Untuk pemilik hak garap</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program CSR Komprehensif</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Bersamaan dengan penyerahan bantuan dana hak garap, PT Kristalin melalui program Corporate Social Responsibility (CSR) membantu warga yang belum punya rumah dan renovasi total rumah tidak layak, renovasi pembangunan gereja, pendidikan, bantuan sembako, dan kendaraan operasional masyarakat.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Infrastruktur</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Renovasi rumah tidak layak huni</li>
                                                        <li>Pembangunan rumah baru</li>
                                                        <li>Renovasi pembangunan gereja</li>
                                                        <li>Pembangunan fasilitas umum</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Sosial</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Program pendidikan</li>
                                                        <li>Bantuan sembako</li>
                                                        <li>Kendaraan operasional masyarakat</li>
                                                        <li>Dukungan kegiatan masyarakat</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Ekspansi Perusahaan ke Papua Barat</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Perusahaan juga menambahkan bahwa pihaknya melakukan pengembangan area dan akan melakukan ekspansi ke beberapa lokasi, seperti di Papua Barat. Perusahaan berkomitmen untuk memperhatikan lingkungan dan masyarakat sekitar dalam setiap operasionalnya.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Bahwa perusahaan kami akan ekspansi ke beberapa lokasi, seperti di Papua Barat. Serta akan memperhatikan lingkungan dan masyarakat sekitar."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Andito Prasetyowan, Direktur Utama PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Apresiasi dari Penerima Bantuan</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Hans Ingeruhi menyampaikan terima kasihnya kepada PT Kristalin Ekalestari yang sudah memberikan bantuan kepada pemilik Hak Garap. Ia berharap perusahaan dapat terus maju dan berkembang dalam memberikan manfaat kepada masyarakat.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Terima kasih kepada semoga perusahaan ini semakin maju dan berkembang."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Hans Ingeruhi, Penerima Bantuan Dana Hak Garap</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Distribusi Bantuan ke Desa Lagari</h3>
                                        <div class="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Bantuan dana hak garap sebesar Rp 50 juta yang diterima Hans Ingeruhi secara simbolis di Jakarta akan disalurkan kepada warga di Desa Lagari, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Distribusi ini dilakukan untuk memastikan bahwa manfaat bantuan dapat dirasakan langsung oleh masyarakat yang berhak.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Lokasi Distribusi</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Desa Lagari - lokasi utama</li>
                                                        <li>Distrik Makimi - wilayah administrasi</li>
                                                        <li>Kabupaten Nabire - kabupaten</li>
                                                        <li>Papua Tengah - provinsi</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Proses Distribusi</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Penyerahan simbolis di Jakarta</li>
                                                        <li>Distribusi ke masyarakat setempat</li>
                                                        <li>Koordinasi dengan perwakilan</li>
                                                        <li>Transparansi penggunaan dana</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komitmen Lingkungan dan Masyarakat</h3>
                                        <div class="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                PT Kristalin Ekalestari menunjukkan komitmen yang kuat dalam memperhatikan lingkungan dan masyarakat sekitar area operasional. Hal ini tercermin dari berbagai program CSR yang telah dilaksanakan, termasuk bantuan dana hak garap, pembangunan infrastruktur, dan program sosial lainnya.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Komitmen Lingkungan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Perhatian terhadap lingkungan</li>
                                                        <li>Operasional yang berkelanjutan</li>
                                                        <li>Pembangunan ramah lingkungan</li>
                                                        <li>Konservasi sumber daya alam</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Komitmen Masyarakat</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Pemberdayaan masyarakat lokal</li>
                                                        <li>Program CSR berkelanjutan</li>
                                                        <li>Dukungan pembangunan desa</li>
                                                        <li>Peningkatan kesejahteraan</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Dampak Positif bagi Masyarakat</h3>
                                        <div class="rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Penyerahan bantuan dana hak garap sebesar Rp 50 juta kepada warga Desa Lagari, Distrik Makimi, Papua Tengah, diharapkan dapat memberikan dampak positif yang signifikan bagi kesejahteraan masyarakat. Bantuan ini tidak hanya memberikan manfaat langsung, tetapi juga menunjukkan komitmen perusahaan dalam membangun hubungan yang harmonis dengan masyarakat sekitar area operasional.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Manfaat Langsung</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Peningkatan kesejahteraan ekonomi</li>
                                                        <li>Dukungan operasional masyarakat</li>
                                                        <li>Pembangunan infrastruktur desa</li>
                                                        <li>Peningkatan kualitas hidup</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Manfaat Jangka Panjang</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Hubungan harmonis perusahaan-masyarakat</li>
                                                        <li>Pembangunan berkelanjutan</li>
                                                        <li>Pemberdayaan masyarakat lokal</li>
                                                        <li>Kesejahteraan berkelanjutan</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Harapan dan Komitmen Masa Depan</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Penyerahan bantuan dana hak garap sebesar Rp 50 juta oleh PT Kristalin Ekalestari kepada warga Desa Lagari, Distrik Makimi, Papua Tengah, merupakan wujud nyata komitmen perusahaan dalam memberikan rasa adil kepada pemilik hak garap. Dengan rencana ekspansi ke Papua Barat dan komitmen untuk memperhatikan lingkungan dan masyarakat sekitar, perusahaan diharapkan dapat terus memberikan kontribusi positif bagi pembangunan dan kesejahteraan masyarakat di wilayah operasionalnya.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
        ],
    },
    {
        month: 'AGUSTUS',
        monthId: 'agustus-2025',
        categories: [
            {
                id: 'csr-pembangunan-rumah-lomon-monei',
                title: 'CSR Pembangunan Rumah Warga Lomon Monei',
                newsItems: [
                    {
                        id: 'aug-1',
                        title: 'Kado HUT RI ke-80, Buruh Harian Lepas Desa Nifasi Dapat Rumah dari PT Kristalin Ekalestari',
                        date: '19 Aug 2025',
                        url: '/news/aug-1',
                        excerpt:
                            'PT Kristalin Ekalestari memberikan rumah layak huni kepada Lomon Monei sebagai kado kemerdekaan HUT RI ke-80 melalui program CSR yang konsisten.',
                        fullContent: {
                            title: 'Kado HUT RI ke-80, Buruh Harian Lepas Desa Nifasi Dapat Rumah dari PT Kristalin Ekalestari',
                            date: '19 Agustus 2025',
                            author: 'Tim Redaksi',
                            source: 'Viva.co.id',
                            sourceUrl:
                                'https://banten.viva.co.id/berita/7320-kado-hut-ri-ke-80-buruh-harian-lepas-desa-nifasi-dapat-rumah-dari-pt-kristalin-ekalestari?page=2',
                            image: '/agus1.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Kado Kemerdekaan untuk Masyarakat Desa Nifasi</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Seorang buruh harian lepas di Desa Nifasi tidak menyangka akan segera mendapatkan sebuah rumah layak huni di saat momentum hari Kemerdekaan HUT RI ke-80. Bantuan ini diberikan melalui program Corporate Social Responsibility (CSR) <strong>PT Kristalin Ekalestari</strong> sebagai bentuk kontribusi nyata perusahaan terhadap kesejahteraan masyarakat.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Pembangunan Rumah untuk Lomon Monei</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, menuturkan bahwa pihaknya telah membangun rumah dalam program CSR untuk <strong>Lomon Monei</strong>. Setelah melakukan pendataan dan rekomendasi hak ulayat adat, perusahaan memberikan rumah kepada warga yang belum mendapatkan rumah.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Setelah kami lakukan pendataan dan rekomendasi hak ulayat adat, kali ini kami memberikan rumah kepada warga yang belum mendapatkan rumah kepada Lomon Monei."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Kebahagiaan Pasangan Suami Istri</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Pasangan suami istri ini bahagia setelah mendapatkan bantuan berupa satu rumah layak di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. <strong>Lomon Monei</strong> didampingi sang istri tersenyum bahagia melihat pekerja sedang membangun rumah untuknya yang dikerjakan sejak tiga minggu lalu di Kampung Kalibiru, Desa Biha, Distrik Makimi, Kabupaten Nabire, Papua Tengah.
                                            </p>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                Sebelumnya, yang bersangkutan tinggal di tempat kurang layak di Kalibiru, sehingga perusahaan memberikan satu rumah untuk Pak Lomon Monei sebagai solusi permasalahan hunian.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Spesifikasi Rumah yang Dibangun</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                PT Kristalin Ekalestari sudah menyerahkan rumah tipe 57 dengan spesifikasi bangunan rumah tembok semi permanen yang memiliki dua kamar tidur dan satu kamar mandi. Rumah ini dibangun dengan standar yang layak huni untuk memenuhi kebutuhan dasar keluarga.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Spesifikasi Rumah</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Tipe 57 meter persegi</li>
                                                        <li>Konstruksi tembok semi permanen</li>
                                                        <li>Dua kamar tidur</li>
                                                        <li>Satu kamar mandi</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Lokasi Pembangunan</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Kampung Kalibiru</li>
                                                        <li>Desa Biha</li>
                                                        <li>Distrik Makimi</li>
                                                        <li>Kabupaten Nabire, Papua Tengah</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komitmen Perusahaan untuk Masyarakat</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Maria Erari menjelaskan bahwa ini merupakan bukti komitmen perusahaan sebagai entitas yang legal dan berizin di wilayah Nabire, Papua Tengah. Perusahaan akan terus berupaya memberikan kontribusi terbaik untuk masyarakat sekitar.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-orange-500 pl-4 text-lg italic text-gray-700">"Bukti komitmen kami sebagai perusahaan, jika kami tetap beroperasi kami juga memberikan manfaat banyak kepada masyarakat terutama warga yang belum mendapatkan rumah lewat program CSR dan manfaat lainnya."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program CSR Komprehensif</h3>
                                        <div class="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Melalui program Corporate Social Responsibility (CSR), PT Kristalin Ekalestari membantu warga yang belum punya rumah dan melakukan renovasi total rumah tidak layak. Perusahaan juga membangun gereja, memberikan dukungan pendidikan, bantuan sembako, kendaraan operasional masyarakat dan gereja.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Infrastruktur</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Pembangunan rumah layak huni</li>
                                                        <li>Renovasi rumah tidak layak</li>
                                                        <li>Pembangunan gereja</li>
                                                        <li>Kendaraan operasional masyarakat</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Program Sosial</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Dukungan pendidikan</li>
                                                        <li>Bantuan sembako</li>
                                                        <li>Program kemasyarakatan</li>
                                                        <li>Pemberdayaan ekonomi</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Dampak Positif untuk Desa Nifasi</h3>
                                        <div class="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Maria menambahkan bahwa dalam situasi apapun perusahaannya akan berkontribusi dan konsisten sebagai perusahaan yang legal dan berizin di wilayah Nabire, Papua Tengah. Perusahaan akan terus berupaya memberikan kontribusi terbaik untuk masyarakat sekitar.
                                            </p>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                "Dalam situasi apapun kami akan memberikan yang terbaik untuk warga. Bisa melihat pembangunan Desa ini luar biasa selain itu kami juga menggerakan roda ekonomi untuk lokasi wisata Sungai Musairo," tutur Maria.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Konsistensi Program CSR</h3>
                                        <div class="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Program CSR PT Kristalin Ekalestari menunjukkan konsistensi dalam memberikan manfaat nyata kepada masyarakat. Perusahaan tidak hanya fokus pada pembangunan fisik, tetapi juga menggerakan roda ekonomi lokal melalui pengembangan wisata Sungai Musairo.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Pembangunan Fisik</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Rumah layak huni</li>
                                                        <li>Infrastruktur desa</li>
                                                        <li>Fasilitas umum</li>
                                                        <li>Pembangunan gereja</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Pemberdayaan Ekonomi</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Pengembangan wisata</li>
                                                        <li>Lokasi Sungai Musairo</li>
                                                        <li>Pemberdayaan masyarakat</li>
                                                        <li>Pertumbuhan ekonomi lokal</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Harapan dan Dampak Berkelanjutan</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Pemberian rumah kepada Lomon Monei sebagai kado HUT RI ke-80 merupakan wujud nyata komitmen PT Kristalin Ekalestari dalam memberikan kontribusi positif bagi masyarakat Desa Nifasi. Program ini diharapkan dapat memberikan dampak berkelanjutan tidak hanya untuk keluarga penerima, tetapi juga untuk pembangunan desa secara keseluruhan. Dengan konsistensi program CSR yang berkelanjutan, perusahaan menunjukkan dedikasinya untuk terus memberikan manfaat nyata bagi masyarakat sekitar area operasional di Papua Tengah.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'aug-2',
                        title: 'Momen Bersejarah: Buruh Harian Lepas Desa Nifasi Terima Rumah Layak dari PT Kristalin Ekalestari',
                        date: '19 Aug 2025',
                        url: '/news/aug-2',
                        excerpt:
                            'Lomon Monei menerima kunci rumah layak huni dari PT Kristalin Ekalestari sebagai bentuk kepedulian perusahaan terhadap masyarakat Papua Tengah melalui program CSR berkelanjutan.',
                        fullContent: {
                            title: 'Momen Bersejarah: Buruh Harian Lepas Desa Nifasi Terima Rumah Layak dari PT Kristalin Ekalestari',
                            date: '19 Agustus 2025',
                            author: 'Tim Redaksi',
                            source: 'iNews Jayapura',
                            sourceUrl: 'https://jayapura.inews.id/read/629368/kado-hut-ri-ke-80-buruh-harian-lepas-desa-nifasi-dapat-rumah',
                            image: '/agus2.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Kado Istimewa HUT RI ke-80</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Di tengah perayaan kemerdekaan Indonesia ke-80, seorang buruh harian lepas bernama <strong>Lomon Monei</strong> dari Desa Nifasi merasakan kebahagiaan yang luar biasa. Pria sederhana ini tidak pernah menyangka akan menerima kado kemerdekaan berupa rumah layak huni dari <strong>PT Kristalin Ekalestari</strong> melalui program Corporate Social Responsibility (CSR) yang konsisten dan berkelanjutan.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Profil Penerima Bantuan</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                <strong>Lomon Monei</strong>, seorang buruh harian lepas yang tinggal di Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, selama ini hidup dalam kondisi yang sederhana. Sebagai pekerja harian, ia mengandalkan upah seadanya untuk menghidupi keluarga. Kehadiran rumah baru ini memberikan harapan besar untuk masa depan yang lebih baik bagi keluarganya.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Data Penerima</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Nama: Lomon Monei</li>
                                                        <li>Profesi: Buruh Harian Lepas</li>
                                                        <li>Asal: Desa Nifasi</li>
                                                        <li>Wilayah: Distrik Makimi, Nabire</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Kondisi Sebelumnya</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Tinggal di tempat kurang layak</li>
                                                        <li>Penghasilan tidak tetap</li>
                                                        <li>Membutuhkan rumah permanen</li>
                                                        <li>Hidup sederhana dengan keluarga</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Pesan dari Perusahaan</h3>
                                        <div class="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, menyampaikan bahwa pemberian rumah ini merupakan komitmen perusahaan untuk terus berkontribusi kepada masyarakat. Perusahaan telah melakukan proses pendataan dan rekomendasi berdasarkan hak ulayat adat sebelum memberikan bantuan ini.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Setelah kami lakukan pendataan dan rekomendasi hak ulayat adat, kali ini kami memberikan rumah kepada warga yang belum mendapatkan rumah kepada Lomon Monei. Sebelumnya yang bersangkutan tinggal di tempat kurang layak di Kalibiru, maka dari itu kami berikan satu rumah untuk Pak Lomon Monei."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari, Selasa (19/8/2025)</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Proses Seleksi dan Rekomendasi</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                PT Kristalin Ekalestari melakukan proses seleksi yang transparan dan objektif. Perusahaan bekerja sama dengan tokoh adat dan pemerintah setempat untuk mengidentifikasi warga yang paling membutuhkan bantuan rumah. Lomon Monei terpilih karena kondisi tempat tinggalnya yang kurang layak dan statusnya sebagai buruh harian lepas yang membutuhkan stabilitas hunian.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-3">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200">
                                                        <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Pendataan</h4>
                                                    <p class="text-sm text-gray-600">Inventarisasi warga yang membutuhkan</p>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200">
                                                        <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Rekomendasi Adat</h4>
                                                    <p class="text-sm text-gray-600">Koordinasi dengan tokoh adat setempat</p>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-200">
                                                        <svg class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Penetapan</h4>
                                                    <p class="text-sm text-gray-600">Penentuan penerima bantuan rumah</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Spesifikasi Rumah yang Diserahkan</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                PT Kristalin Ekalestari telah menyerahkan rumah dengan spesifikasi standar yang layak huni. Rumah tipe 57 ini dibangun dengan konstruksi tembok semi permanen dan dilengkapi dengan fasilitas dasar yang memadai untuk kebutuhan keluarga.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Detail Konstruksi</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Tipe 57 meter persegi</li>
                                                        <li>Konstruksi tembok semi permanen</li>
                                                        <li>Atap berkualitas standar</li>
                                                        <li>Fondasi yang kuat dan tahan lama</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Fasilitas Rumah</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Dua kamar tidur</li>
                                                        <li>Satu kamar mandi</li>
                                                        <li>Ruang tamu dan keluarga</li>
                                                        <li>Dapur dan area servis</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Timeline Pembangunan dan Serah Terima</h3>
                                        <div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Proses pembangunan rumah untuk Lomon Monei dilakukan dengan perencanaan yang matang dan eksekusi yang tepat waktu. Tim konstruksi bekerja dengan profesional untuk memastikan kualitas bangunan sesuai standar dan dapat diselesaikan tepat pada momentum HUT RI ke-80.
                                            </p>
                                            <div class="mt-6 space-y-4">
                                                <div class="flex items-center rounded-lg bg-white p-4 shadow-sm">
                                                    <div class="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                        <span class="text-sm font-bold text-blue-600">1</span>
                                                    </div>
                                                    <div>
                                                        <h4 class="font-bold text-gray-900">Juli 2025</h4>
                                                        <p class="text-sm text-gray-600">Proses seleksi dan penetapan lokasi pembangunan</p>
                                                    </div>
                                                </div>
                                                <div class="flex items-center rounded-lg bg-white p-4 shadow-sm">
                                                    <div class="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                                        <span class="text-sm font-bold text-green-600">2</span>
                                                    </div>
                                                    <div>
                                                        <h4 class="font-bold text-gray-900">Awal Agustus 2025</h4>
                                                        <p class="text-sm text-gray-600">Dimulainya proses konstruksi dan pembangunan</p>
                                                    </div>
                                                </div>
                                                <div class="flex items-center rounded-lg bg-white p-4 shadow-sm">
                                                    <div class="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                                                        <span class="text-sm font-bold text-amber-600">3</span>
                                                    </div>
                                                    <div>
                                                        <h4 class="font-bold text-gray-900">19 Agustus 2025</h4>
                                                        <p class="text-sm text-gray-600">Serah terima kunci rumah kepada Lomon Monei</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program CSR Berkelanjutan</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Maria Erari menjelaskan bahwa program pemberian rumah ini merupakan bagian dari komitmen berkelanjutan perusahaan. PT Kristalin Ekalestari tidak hanya memberikan manfaat satu kali, tetapi berkomitmen untuk terus berkontribusi dalam berbagai program kemasyarakatan yang bermanfaat.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-indigo-500 pl-4 text-lg italic text-gray-700">"Ini bukti komitmen kami sebagai perusahaan. Jika kami tetap beroperasi kami juga memberikan manfaat banyak kepada masyarakat terutama warga yang belum mendapatkan rumah lewat program CSR dan manfaat lainnya."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Maria Erari, Humas PT Kristalin Ekalestari</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Dampak Positif bagi Masyarakat</h3>
                                        <div class="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Pemberian rumah kepada Lomon Monei tidak hanya memberikan dampak langsung bagi keluarganya, tetapi juga menjadi inspirasi bagi program-program CSR lainnya di Papua Tengah. Maria menambahkan bahwa perusahaan akan terus konsisten dalam memberikan kontribusi terbaik untuk masyarakat sekitar area operasional.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Dampak Langsung</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Perbaikan kualitas hidup keluarga</li>
                                                        <li>Stabilitas tempat tinggal</li>
                                                        <li>Peningkatan kesehatan dan kebersihan</li>
                                                        <li>Rasa aman dan nyaman</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Dampak Tidak Langsung</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li>Motivasi untuk warga lain</li>
                                                        <li>Peningkatan hubungan perusahaan-masyarakat</li>
                                                        <li>Pemberdayaan ekonomi lokal</li>
                                                        <li>Model program CSR berkelanjutan</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Pengembangan Wilayah Sekitar</h3>
                                        <div class="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Selain pembangunan rumah, PT Kristalin Ekalestari juga aktif dalam pengembangan wilayah sekitar. Maria menyebutkan bahwa perusahaan juga berperan dalam menggerakkan roda ekonomi untuk lokasi wisata Sungai Musairo, yang memberikan manfaat ekonomi tambahan bagi masyarakat setempat.
                                            </p>
                                            <p class="mt-4 text-base leading-relaxed text-gray-800">
                                                "Dalam situasi apapun kami akan memberikan yang terbaik untuk warga. Bisa melihat pembangunan Desa ini luar biasa selain itu kami juga menggerakan roda ekonomi untuk lokasi wisata Sungai Musairo," tambah Maria.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Komitmen Berkelanjutan untuk Papua Tengah</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Serah terima rumah kepada Lomon Monei pada hari kemerdekaan Indonesia ke-80 menjadi simbol komitmen nyata PT Kristalin Ekalestari dalam pembangunan masyarakat Papua Tengah. Program CSR yang konsisten ini diharapkan dapat memberikan dampak berkelanjutan tidak hanya untuk keluarga penerima, tetapi juga untuk kemajuan Desa Nifasi secara keseluruhan. Dengan dedikasi yang tinggi terhadap kesejahteraan masyarakat, perusahaan menunjukkan bahwa keberhasilan bisnis harus sejalan dengan kontribusi positif bagi lingkungan sekitar, menciptakan harmoni antara kemajuan ekonomi dan kesejahteraan sosial masyarakat.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
            {
                id: 'csr-hut-ri-80-cidata-barat-papua',
                title: 'CSR HUT RI ke-80, PT Cidata Barat Papua bersama Warga Kuri Wamesa',
                newsItems: [
                    {
                        id: 'aug-3',
                        title: 'Semarak HUT RI ke-80: Warga Desa Nanimori Antusias Ikuti Lomba Tradisional Bersama PT Cidata Barat Papua',
                        date: '19 Aug 2025',
                        url: '/news/aug-3',
                        excerpt:
                            'Perayaan kemerdekaan Indonesia ke-80 di Desa Nanimori, Distrik Kuri Wamesa berlangsung meriah dengan berbagai lomba tradisional yang diselenggarakan bersama PT Cidata Barat Papua.',
                        fullContent: {
                            title: 'Semarak HUT RI ke-80: Warga Desa Nanimori Antusias Ikuti Lomba Tradisional Bersama PT Cidata Barat Papua',
                            date: '19 Agustus 2025',
                            author: 'Tim Redaksi',
                            source: 'Metro TV News',
                            sourceUrl: 'https://www.metrotvnews.com/read/NgxCD23Z-potret-keceriaan-warga-desa-nanimori-memeriahkan-hari-kemerdekaan',
                            image: '/agus3.jpg',
                            content: `
                                <div class="space-y-8">
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900">Keceriaan Memperingati Kemerdekaan Indonesia</h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Ratusan warga di <strong>Desa Nanimori, Distrik Kuri Wamesa, Kabupaten Teluk Wondama, Papua Barat</strong> turut memeriahkan peringatan <strong>HUT ke-80 Kemerdekaan Republik Indonesia</strong> dengan penuh antusiasme. Perayaan yang dipenuhi keceriaan ini terwujud berkat kolaborasi yang harmonis antara masyarakat setempat dan <strong>PT Cidata Barat Papua</strong> dalam menggelar berbagai lomba tradisional yang sarat makna dan nilai kebersamaan.
                                        </p>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Partisipasi Perusahaan dalam Perayaan Kemerdekaan</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                <strong>Dikky Agung Pamungkas</strong>, Direktur Utama PT Cidata Barat Papua, menyatakan komitmen perusahaan untuk berpartisipasi aktif dalam perayaan kemerdekaan bersama masyarakat. Perusahaan menganggap penting untuk turut serta dalam momen bersejarah ini sebagai wujud rasa nasionalisme dan kepedulian terhadap komunitas lokal di Distrik Kuri Wamesa.
                                            </p>
                                            <div class="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">"Kami berpartisipasi menyelenggarakan bersama masyarakat karena sudah belasan tahun tidak ada yang menyelenggarakan kegiatan lomba seperti Sepak Bola, Voli antar kampung, lomba panjat pinang dan Tarik tambang di Kampung Nanimori."</blockquote>
                                                <cite class="mt-2 block text-sm text-gray-600">- Dikky Agung Pamungkas, Direktur Utama PT Cidata Barat Papua</cite>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Beragam Lomba Tradisional yang Meriah</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800">
                                                Perayaan HUT RI ke-80 di Desa Nanimori dimeriahkan dengan berbagai jenis lomba tradisional yang telah lama dinanti-nantikan oleh masyarakat setempat. Dikky menjelaskan bahwa pihaknya turut menggelar lomba untuk anak-anak seperti lomba balap karung, lomba kelereng dan berbagai permainan tradisional lainnya untuk merayakan hari kemerdekaan di tanah Indonesia Timur.
                                            </p>
                                            <div class="mt-6 grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-2 text-lg font-bold text-gray-900">Lomba Olahraga Antar Kampung</h4>
                                                    <ul class="list-disc space-y-1 pl-5 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Bola Voli</strong> - Kompetisi tim beregu antar kampung</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Panjat Pinang</strong> - Lomba ikonik tradisional Indonesia</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Tarik Tambang</strong> - Uji kekuatan dan kekompakan tim</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Permainan Anak-Anak dan Keluarga
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-pink-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Balap Karung</strong> - Lomba menghibur untuk segala usia</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-pink-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Lomba Kelereng</strong> - Permainan ketangkasan tradisional</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-pink-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Permainan Edukatif</strong> - Aktivitas pembelajaran yang menyenangkan</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-pink-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Lomba Kreatif</strong> - Menggali potensi seni dan budaya anak</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Schedule and Timeline -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Jadwal Pelaksanaan Lomba Kemerdekaan</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Pelaksanaan rangkaian lomba kemerdekaan diorganisir dengan jadwal yang terstruktur untuk memberikan kesempatan optimal bagi setiap peserta dari berbagai kampung. Dikky menyampaikan bahwa sistem penjadwalan dirancang agar semua kategori lomba dapat berjalan lancar tanpa bertabrakan, menciptakan atmosfer kompetisi yang sehat dan menyenangkan.
                                            </p>
                                            <div class="space-y-4">
                                                <div class="flex items-start rounded-lg bg-white p-5 shadow-sm border border-gray-200">
                                                    <div class="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200">
                                                        <svg class="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <div class="flex-1">
                                                        <h4 class="font-bold text-gray-900 text-lg mb-2">13-17 Agustus 2025</h4>
                                                        <p class="text-gray-600 mb-3">Periode utama penyelenggaraan lomba olahraga kompetitif</p>
                                                        <div class="grid gap-2 md:grid-cols-2">
                                                            <div class="flex items-center gap-2 text-sm text-gray-700">
                                                                <div class="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                                                                <span><strong>Pagi:</strong> Pertandingan Bola Voli</span>
                                                            </div>
                                                            <div class="flex items-center gap-2 text-sm text-gray-700">
                                                                <div class="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                                                                <span><strong>Sore:</strong> Pertandingan Sepak Bola</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex items-start rounded-lg bg-white p-5 shadow-sm border border-gray-200">
                                                    <div class="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200">
                                                        <svg class="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <div class="flex-1">
                                                        <h4 class="font-bold text-gray-900 text-lg mb-2">18 Agustus 2025</h4>
                                                        <p class="text-gray-600 mb-3">Hari puncak lomba tradisional dan permainan rakyat</p>
                                                        <div class="grid gap-2 md:grid-cols-2">
                                                            <div class="flex items-center gap-2 text-sm text-gray-700">
                                                                <div class="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                                                                <span>Lomba Panjat Pinang</span>
                                                            </div>
                                                            <div class="flex items-center gap-2 text-sm text-gray-700">
                                                                <div class="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                                                                <span>Tarik Tambang & Permainan Lainnya</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Awards and Recognition -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Sistem Penghargaan yang Adil dan Transparan</h3>
                                        <div class="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                PT Cidata Barat Papua menunjukkan komitmen tinggi dalam memberikan apresiasi kepada seluruh peserta dengan menyediakan sistem penghargaan yang komprehensif. Hadiah yang diberikan tidak hanya berupa uang tunai, tetapi juga pengakuan atas semangat sportivitas dan partisipasi aktif dalam melestarikan tradisi kemerdekaan.
                                            </p>
                                            <div class="space-y-6">
                                                <!-- Soccer Awards -->
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                        Kategori Sepak Bola Antar Kampung
                                                    </h4>
                                                    <div class="grid gap-4 md:grid-cols-3">
                                                        <div class="rounded-lg border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 text-center">
                                                            <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-white font-bold text-lg">
                                                                1
                                                            </div>
                                                            <h5 class="text-lg font-bold text-gray-900">Juara I</h5>
                                                            <p class="text-2xl font-bold text-yellow-600">Rp 4.000.000</p>
                                                            <p class="text-sm text-gray-600 mt-1">Plus trofi dan medali emas</p>
                                                        </div>
                                                        <div class="rounded-lg border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50 p-4 text-center">
                                                            <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 text-white font-bold text-lg">
                                                                2
                                                            </div>
                                                            <h5 class="text-lg font-bold text-gray-900">Juara II</h5>
                                                            <p class="text-2xl font-bold text-gray-600">Rp 3.500.000</p>
                                                            <p class="text-sm text-gray-600 mt-1">Plus trofi dan medali perak</p>
                                                        </div>
                                                        <div class="rounded-lg border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-red-50 p-4 text-center">
                                                            <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg">
                                                                3
                                                            </div>
                                                            <h5 class="text-lg font-bold text-gray-900">Juara III</h5>
                                                            <p class="text-2xl font-bold text-orange-600">Rp 2.500.000</p>
                                                            <p class="text-sm text-gray-600 mt-1">Plus trofi dan medali perunggu</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Volleyball Awards -->
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                        </svg>
                                                        Kategori Bola Voli Antar Kampung
                                                    </h4>
                                                    <div class="grid gap-4 md:grid-cols-3">
                                                        <div class="rounded-lg border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 text-center">
                                                            <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-white font-bold text-lg">
                                                                1
                                                            </div>
                                                            <h5 class="text-lg font-bold text-gray-900">Juara I</h5>
                                                            <p class="text-2xl font-bold text-yellow-600">Rp 3.000.000</p>
                                                            <p class="text-sm text-gray-600 mt-1">Plus trofi dan medali emas</p>
                                                        </div>
                                                        <div class="rounded-lg border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50 p-4 text-center">
                                                            <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 text-white font-bold text-lg">
                                                                2
                                                            </div>
                                                            <h5 class="text-lg font-bold text-gray-900">Juara II</h5>
                                                            <p class="text-2xl font-bold text-gray-600">Rp 2.000.000</p>
                                                            <p class="text-sm text-gray-600 mt-1">Plus trofi dan medali perak</p>
                                                        </div>
                                                        <div class="rounded-lg border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-red-50 p-4 text-center">
                                                            <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg">
                                                                3
                                                            </div>
                                                            <h5 class="text-lg font-bold text-gray-900">Juara III</h5>
                                                            <p class="text-2xl font-bold text-orange-600">Rp 1.000.000</p>
                                                            <p class="text-sm text-gray-600 mt-1">Plus trofi dan medali perunggu</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Special Recognition -->
                                                <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                                    <h4 class="mb-3 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                        </svg>
                                                        Penghargaan Khusus dan Apresiasi
                                                    </h4>
                                                    <div class="grid gap-4 md:grid-cols-2">
                                                        <div class="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                                                            <div class="h-3 w-3 bg-indigo-500 rounded-full"></div>
                                                            <span class="text-gray-700"><strong>Lomba Panjat Pinang:</strong> Hadiah uang tunai dan sertifikat</span>
                                                        </div>
                                                        <div class="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                                                            <div class="h-3 w-3 bg-indigo-500 rounded-full"></div>
                                                            <span class="text-gray-700"><strong>Tarik Tambang:</strong> Hadiah untuk semua peserta</span>
                                                        </div>
                                                        <div class="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                                                            <div class="h-3 w-3 bg-purple-500 rounded-full"></div>
                                                            <span class="text-gray-700"><strong>Lomba Anak-anak:</strong> Hadiah edukatif dan mainan</span>
                                                        </div>
                                                        <div class="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                                                            <div class="h-3 w-3 bg-purple-500 rounded-full"></div>
                                                            <span class="text-gray-700"><strong>Partisipasi Terbaik:</strong> Sertifikat penghargaan</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Community Impact and Legacy -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Dampak Sosial dan Warisan Budaya</h3>
                                        <div class="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Keberhasilan penyelenggaraan lomba kemerdekaan ini memberikan dampak positif yang jauh melampaui sekadar hiburan sesaat. Melalui kolaborasi dengan PT Cidata Barat Papua, masyarakat Desa Nanimori dan sekitarnya merasakan kembali semangat kebersamaan yang telah lama hilang, menciptakan momen bersejarah yang akan dikenang untuk generasi mendatang.
                                            </p>
                                            <div class="grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        Dampak Sosial Positif
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-base">Mempererat hubungan antar kampung</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-base">Meningkatkan semangat sportivitas</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-base">Menghidupkan kembali tradisi lokal</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-base">Memperkuat identitas budaya Papua</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                        Warisan untuk Masa Depan
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base">Model kemitraan perusahaan-masyarakat</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base">Inspirasi untuk kegiatan tahunan</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base">Dokumentasi sejarah lomba daerah</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base">Pembangunan kapasitas komunitas</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Conclusion -->
                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Semangat Persatuan dalam Kebhinekaan Papua Barat
                                        </h3>
                                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                                            Perayaan HUT RI ke-80 di Desa Nanimori menjadi bukti nyata bahwa semangat kemerdekaan dan persatuan dapat diwujudkan melalui kolaborasi yang tulus antara dunia usaha dan masyarakat lokal. PT Cidata Barat Papua telah menunjukkan komitmen luar biasa dalam tidak sekadar beroperasi secara komersial, tetapi juga berkontribusi aktif dalam pelestarian nilai-nilai budaya dan penguatan ikatan sosial di Papua Barat.
                                        </p>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Kegiatan ini diharapkan menjadi katalisator untuk inisiatif serupa di masa mendatang, menciptakan tradisi berkelanjutan yang memperkuat harmoni antara perusahaan dan masyarakat dalam membangun Papua Barat yang lebih maju, sejahtera, dan tetap mempertahankan kearifan lokalnya. Semangat gotong royong yang terjalin dalam lomba kemerdekaan ini menjadi fondasi kokoh untuk pembangunan yang inklusif dan berkelanjutan di tanah Papua.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
            {
                id: 'csr-penyaluran-bantuan-sembako-agustus',
                title: 'CSR Penyaluran Bantuan Sembako Bulan Agustus 2025',
                newsItems: [
                    {
                        id: 'aug-4',
                        title: 'Berbagi Kebahagiaan: 506 Paket Sembako untuk Janda Lansia dan Tempat Ibadah di Nabire',
                        date: '20 Aug 2025',
                        url: '/news/aug-4',
                        excerpt:
                            'PT Kristalin Ekalestari menyalurkan 506 paket sembako kepada janda lansia dan tempat ibadah di wilayah Nabire sebagai wujud komitmen CSR berkelanjutan bulan Agustus 2025.',
                        fullContent: {
                            title: 'Berbagi Kebahagiaan: 506 Paket Sembako untuk Janda Lansia dan Tempat Ibadah di Nabire',
                            date: '20 Agustus 2025',
                            author: 'Tim Redaksi',
                            source: 'Jawa Pos',
                            sourceUrl:
                                'https://www.jawapos.com/berita-sekitar-anda/016510236/bagikan-506-paket-sembako-untuk-janda-lansia-dan-tempat-ibadah-di-nabire',
                            image: '/agus4.webp',
                            content: `
                                <div class="space-y-8">
                                    <!-- Opening Story -->
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            Kepedulian Nyata untuk Masyarakat Nabire
                                        </h3>
                                        <p class="text-base leading-relaxed text-blue-800">
                                            Dalam rangka melanjutkan komitmen tanggung jawab sosial perusahaan, <strong>PT Kristalin Ekalestari</strong> kembali menunjukkan kepeduliannya dengan menyalurkan <strong>506 paket sembako</strong> kepada masyarakat di wilayah Nabire, Papua Tengah. Program CSR bulan Agustus 2025 ini secara khusus memprioritaskan janda lanjut usia dan tempat-tempat ibadah sebagai penerima bantuan, menunjukkan sensitivitas perusahaan terhadap kelompok masyarakat yang paling membutuhkan dukungan.
                                        </p>
                                    </div>

                                    <!-- Target Beneficiaries -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Fokus Khusus untuk Kelompok Rentan</h3>
                                        <div class="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                                            <div class="mb-6">
                                                <p class="text-base leading-relaxed text-gray-800 mb-4">
                                                    Program distribusi sembako bulan Agustus ini dirancang dengan pendekatan yang lebih terarah, dimana <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, menekankan pentingnya memberikan prioritas kepada segmen masyarakat yang paling memerlukan bantuan. Pendekatan ini mencerminkan pemahaman mendalam perusahaan terhadap kondisi sosial ekonomi masyarakat setempat.
                                                </p>
                                            </div>
                                            <div class="grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        Janda Lanjut Usia
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-rose-500 rounded-full"></div>
                                                            <span class="text-base">Prioritas utama dalam distribusi bantuan</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-rose-500 rounded-full"></div>
                                                            <span class="text-base">Kelompok paling rentan secara ekonomi</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-rose-500 rounded-full"></div>
                                                            <span class="text-base">Memerlukan dukungan khusus dari masyarakat</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-rose-500 rounded-full"></div>
                                                            <span class="text-base">Penerima bantuan dengan verifikasi adat</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                        Tempat Ibadah
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-purple-500 rounded-full"></div>
                                                            <span class="text-base">Masjid dan gereja lokal</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-purple-500 rounded-full"></div>
                                                            <span class="text-base">Pusat kegiatan masyarakat</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-purple-500 rounded-full"></div>
                                                            <span class="text-base">Dukungan untuk operasional ibadah</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-purple-500 rounded-full"></div>
                                                            <span class="text-base">Memperkuat harmonisasi antar umat</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Distribution Details -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Mekanisme Distribusi yang Terorganisir</h3>
                                        <div class="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Proses distribusi 506 paket sembako dilaksanakan dengan sistem yang terstruktur dan melibatkan berbagai pihak untuk memastikan ketepatan sasaran. Tim CSR PT Kristalin Ekalestari bekerja sama dengan aparatur desa, tokoh adat, dan tokoh agama setempat untuk mengidentifikasi penerima yang benar-benar membutuhkan bantuan.
                                            </p>
                                            <div class="space-y-4">
                                                <div class="flex items-start rounded-lg bg-white p-5 shadow-sm border border-gray-200">
                                                    <div class="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-200">
                                                        <svg class="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <div class="flex-1">
                                                        <h4 class="font-bold text-gray-900 text-lg mb-2">Tahap Verifikasi dan Seleksi</h4>
                                                        <p class="text-gray-600 mb-3">Proses identifikasi penerima bantuan melalui koordinasi multi-stakeholder</p>
                                                        <div class="grid gap-2 md:grid-cols-2">
                                                            <div class="flex items-center gap-2 text-sm text-gray-700">
                                                                <div class="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                                                                <span>Data dari aparatur desa</span>
                                                            </div>
                                                            <div class="flex items-center gap-2 text-sm text-gray-700">
                                                                <div class="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                                                                <span>Rekomendasi tokoh adat</span>
                                                            </div>
                                                            <div class="flex items-center gap-2 text-sm text-gray-700">
                                                                <div class="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                                                                <span>Koordinasi tokoh agama</span>
                                                            </div>
                                                            <div class="flex items-center gap-2 text-sm text-gray-700">
                                                                <div class="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                                                                <span>Survei lapangan Tim CSR</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex items-start rounded-lg bg-white p-5 shadow-sm border border-gray-200">
                                                    <div class="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-200">
                                                        <svg class="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                    </div>
                                                    <div class="flex-1">
                                                        <h4 class="font-bold text-gray-900 text-lg mb-2">Pelaksanaan Distribusi</h4>
                                                        <p class="text-gray-600 mb-3">Pengantaran langsung ke rumah penerima dan tempat ibadah</p>
                                                        <div class="grid gap-2 md:grid-cols-2">
                                                            <div class="flex items-center gap-2 text-sm text-gray-700">
                                                                <div class="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                                                                <span>Door-to-door delivery</span>
                                                            </div>
                                                            <div class="flex items-center gap-2 text-sm text-gray-700">
                                                                <div class="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                                                                <span>Bantuan di tempat ibadah</span>
                                                            </div>
                                                            <div class="flex items-center gap-2 text-sm text-gray-700">
                                                                <div class="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                                                                <span>Dokumentasi penyerahan</span>
                                                            </div>
                                                            <div class="flex items-center gap-2 text-sm text-gray-700">
                                                                <div class="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                                                                <span>Feedback collection</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Package Contents -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komposisi Lengkap Paket Sembako</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Setiap paket sembako dirancang untuk memenuhi kebutuhan pokok selama satu bulan, dengan komposisi yang telah disesuaikan berdasarkan pola konsumsi masyarakat Papua Tengah. Maria Erari menjelaskan bahwa pemilihan item dalam paket didasarkan pada riset kebutuhan nutrisi dan preferensi kuliner lokal.
                                            </p>
                                            <div class="grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                        </svg>
                                                        Bahan Makanan Pokok
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-orange-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Beras Premium</strong> - 10 kg per paket</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-orange-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Telur Ayam</strong> - 1 kg sumber protein hewani</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-orange-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Mie Instan</strong> - 1 dus berbagai rasa</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-orange-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Minyak Goreng</strong> - 2 liter kemasan jerigen</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                        </svg>
                                                        Kebutuhan Sehari-hari
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Tepung Terigu</strong> - 1 kg untuk kebutuhan masak</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Sabun Cuci</strong> - 800 gram deterjen</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Kopi</strong> - 200 gram kopi bubuk lokal</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Teh</strong> - 200 gram teh celup dan tubruk</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Coverage Areas -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Jangkauan Wilayah Distribusi</h3>
                                        <div class="rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Program distribusi sembako bulan Agustus ini mencakup berbagai wilayah strategis di sekitar Nabire, dengan fokus pada daerah-daerah yang memiliki konsentrasi tinggi janda lansia dan tempat ibadah aktif. Pemilihan lokasi didasarkan pada assessment kebutuhan yang dilakukan secara berkala oleh tim CSR perusahaan.
                                            </p>
                                            <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                                                <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                                    <div class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                                                        <svg class="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-sm font-bold text-gray-900">Desa Nifasi</h4>
                                                    <p class="text-xs text-gray-600 mt-1">Pusat distribusi utama</p>
                                                </div>
                                                <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                                    <div class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                                                        <svg class="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-sm font-bold text-gray-900">Kampung Mamai</h4>
                                                    <p class="text-xs text-gray-600 mt-1">Wilayah adat tradisional</p>
                                                </div>
                                                <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                                    <div class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                                                        <svg class="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-sm font-bold text-gray-900">Kampung Orluk</h4>
                                                    <p class="text-xs text-gray-600 mt-1">Pemukiman pesisir</p>
                                                </div>
                                                <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                                    <div class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                                                        <svg class="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-sm font-bold text-gray-900">Kampung Makimi</h4>
                                                    <p class="text-xs text-gray-600 mt-1">Kawasan pertanian</p>
                                                </div>
                                                <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                                    <div class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                                                        <svg class="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-sm font-bold text-gray-900">Desa Samabusa</h4>
                                                    <p class="text-xs text-gray-600 mt-1">Komunitas multietnik</p>
                                                </div>
                                                <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                                    <div class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                                                        <svg class="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-sm font-bold text-gray-900">Desa Waharia</h4>
                                                    <p class="text-xs text-gray-600 mt-1">Wilayah terpencil</p>
                                                </div>
                                                <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                                    <div class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                        <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-sm font-bold text-gray-900">Kantor Polsek</h4>
                                                    <p class="text-xs text-gray-600 mt-1">Instansi keamanan</p>
                                                </div>
                                                <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                                    <div class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                                        <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-sm font-bold text-gray-900">Koramil</h4>
                                                    <p class="text-xs text-gray-600 mt-1">Satuan militer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Company Commitment -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Komitmen Berkelanjutan Perusahaan</h3>
                                        <div class="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Maria Erari menegaskan bahwa program distribusi sembako merupakan manifestasi konkret dari komitmen jangka panjang PT Kristalin Ekalestari dalam menjalankan tanggung jawab sosial perusahaan. Perusahaan tidak hanya fokus pada aspek komersial operasionalnya, tetapi juga memiliki visi untuk memberikan kontribusi nyata bagi kesejahteraan masyarakat sekitar.
                                            </p>
                                            <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-6">
                                                <blockquote class="border-l-4 border-emerald-500 pl-4 text-lg italic text-gray-700 mb-3">
                                                    "Ini bukti komitmen kami sebagai perusahaan. Jika kami tetap beroperasi kami juga memberikan manfaat banyak kepada masyarakat terutama warga yang belum mendapatkan rumah lewat program CSR dan manfaat lainnya."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Maria Erari, Humas PT Kristalin Ekalestari
                                                </cite>
                                            </div>
                                            <div class="grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Program CSR Terintegrasi
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-emerald-500 rounded-full"></div>
                                                            <span class="text-base">Distribusi sembako bulanan</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-emerald-500 rounded-full"></div>
                                                            <span class="text-base">Program pembangunan rumah</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-emerald-500 rounded-full"></div>
                                                            <span class="text-base">Bantuan untuk tempat ibadah</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-emerald-500 rounded-full"></div>
                                                            <span class="text-base">Pengembangan infrastruktur</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                        Dampak Positif Berkelanjutan
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base">Meningkatkan ketahanan pangan</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base">Mengurangi beban ekonomi keluarga</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base">Memperkuat solidaritas sosial</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base">Menciptakan harmoni perusahaan-masyarakat</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Conclusion -->
                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            Wujud Nyata Kepedulian Korporat yang Berkelanjutan
                                        </h3>
                                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                                            Program distribusi 506 paket sembako untuk janda lansia dan tempat ibadah di Nabire pada bulan Agustus 2025 ini menjadi bukti konkret bahwa PT Kristalin Ekalestari tidak hanya berkomitmen pada pencapaian target bisnis, tetapi juga pada pembangunan sosial yang inklusif dan berkelanjutan. Dengan pendekatan yang sensitif terhadap kebutuhan kelompok rentan dan lembaga keagamaan, perusahaan telah menunjukkan pemahaman mendalam tentang tanggung jawab sosial korporat yang sesungguhnya.
                                        </p>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Kegiatan ini diharapkan dapat menjadi inspirasi bagi perusahaan lain untuk mengimplementasikan program CSR yang tidak hanya bersifat charity, tetapi juga berorientasi pada pemberdayaan dan pembangunan kapasitas masyarakat. Melalui konsistensi dan komitmen jangka panjang seperti yang ditunjukkan PT Kristalin Ekalestari, sektor swasta dapat berperan aktif dalam menciptakan kesejahteraan bersama dan memperkuat fondasi sosial ekonomi masyarakat Papua Tengah.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'aug-5',
                        title: 'Konsistensi Tanpa Henti: PT Kristalin Ekalestari Distribusikan Ratusan Sembako Setiap Bulan di Papua Tengah',
                        date: '21 Aug 2025',
                        url: '/news/aug-5',
                        excerpt:
                            'PT Kristalin Ekalestari membuktikan komitmen CSR berkelanjutan dengan mendistribusikan ratusan paket sembako setiap bulan kepada masyarakat Papua Tengah, khususnya janda lansia dan tempat ibadah.',
                        fullContent: {
                            title: 'Konsistensi Tanpa Henti: PT Kristalin Ekalestari Distribusikan Ratusan Sembako Setiap Bulan di Papua Tengah',
                            date: '21 Agustus 2025',
                            author: 'Tim Redaksi',
                            source: 'Harian Terbit',
                            sourceUrl:
                                'https://www.harianterbit.com/humaniora/27415831709/buktikan-kepedulian-pt-kristalin-ekalestari-bagikan-ratusan-sembako-tiap-bulan-di-papua-tengah',
                            image: '/agus5.webp',
                            content: `
                                <div class="space-y-8">
                                    <!-- Opening Story -->
                                    <div class="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-emerald-900 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Bukti Nyata Kepedulian Berkelanjutan
                                        </h3>
                                        <p class="text-base leading-relaxed text-emerald-800">
                                            <strong>PT Kristalin Ekalestari</strong> membuktikan konsistensi luar biasa dalam menjalankan program Corporate Social Responsibility (CSR) dengan terus menyalurkan <strong>ratusan paket sembako setiap bulannya</strong> kepada masyarakat Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Program ini tidak hanya mencakup distribusi untuk masyarakat umum, tetapi juga memberikan perhatian khusus kepada tempat-tempat ibadah seperti gereja dan masjid di wilayah tersebut.
                                        </p>
                                    </div>

                                    <!-- Program Consistency -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Konsistensi Program CSR yang Terpuji</h3>
                                        <div class="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                                            <div class="mb-6">
                                                <p class="text-base leading-relaxed text-gray-800 mb-4">
                                                    <strong>Maria Erari</strong>, Humas PT Kristalin Ekalestari, menegaskan bahwa distribusi bantuan sembako bukan sekadar program sesaat, melainkan bagian integral dari tanggung jawab sosial perusahaan yang dijalankan secara konsisten. Komitmen ini menunjukkan kesadaran perusahaan akan pentingnya memberikan kontribusi nyata bagi kesejahteraan masyarakat sekitar area operasional.
                                                </p>
                                            </div>
                                            <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-6">
                                                <blockquote class="border-l-4 border-blue-500 pl-4 text-lg italic text-gray-700 mb-3">
                                                    "Untuk bulan Agustus kali ini tetap sama dari sebelum-sebelumnya ya, kami memberikan selain masyarakat kurang mampu, janda lansia kali ini menyasar ke tempat-tempat ibadah baik itu masjid."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Maria Erari, Humas PT Kristalin Ekalestari
                                                </cite>
                                            </div>
                                            <div class="grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        Frekuensi Program
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base">Distribusi bulanan berkelanjutan</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base">Konsistensi selama bertahun-tahun</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base">Ratusan paket setiap periode</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-base">Program terencana dan terintegrasi</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        Target Penerima
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-purple-500 rounded-full"></div>
                                                            <span class="text-base">Masyarakat kurang mampu</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-purple-500 rounded-full"></div>
                                                            <span class="text-base">Janda lanjut usia (lansia)</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-purple-500 rounded-full"></div>
                                                            <span class="text-base">Tempat ibadah (masjid & gereja)</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-purple-500 rounded-full"></div>
                                                            <span class="text-base">Kantor pelayanan publik</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Religious Institution Focus -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Perhatian Khusus untuk Tempat Ibadah</h3>
                                        <div class="rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Salah satu keunikan program CSR PT Kristalin Ekalestari adalah perhatian khusus yang diberikan kepada tempat-tempat ibadah. Maria menjelaskan bahwa pada bulan Agustus ini, distribusi tidak hanya ditujukan untuk masyarakat kurang mampu dan janda lansia, tetapi juga menyasar tempat ibadah seperti Masjid Al-Muhajirin Sp 1 Biha, Hambah Tuhan dari Gereja GKI Sp 1 Biha, dan seorang janda di Kampung Mosairo.
                                            </p>
                                            <div class="grid gap-6 md:grid-cols-3">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                                                    <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                                        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Masjid Al-Muhajirin</h4>
                                                    <p class="text-sm text-gray-600">Sp 1 Biha</p>
                                                    <p class="text-xs text-gray-500 mt-2">Mendukung kegiatan keagamaan</p>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                                                    <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                                        <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1M21 3H3l2.25 4.5L12 9.75l6.75-2.25L21 3z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Gereja GKI</h4>
                                                    <p class="text-sm text-gray-600">Sp 1 Biha</p>
                                                    <p class="text-xs text-gray-500 mt-2">Hambah Tuhan dari Gereja</p>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                                                    <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                                        <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Kampung Mosairo</h4>
                                                    <p class="text-sm text-gray-600">Janda Lansia</p>
                                                    <p class="text-xs text-gray-500 mt-2">Dukungan individual</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Distribution Pattern -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Pola Distribusi yang Terorganisir</h3>
                                        <div class="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Program distribusi PT Kristalin Ekalestari dirancang dengan pola yang terorganisir dan sistematis untuk memastikan pemerataan bantuan. Maria menjelaskan bahwa pembagian sembako ini meliputi berbagai lokasi strategis di Papua Tengah, mencakup Desa Nifasi, Suku Dani, Kampung Mamai, Kampung Orluk, Kampung Makimi, Desa Samabusa, dan Desa Waharia.
                                            </p>
                                            <div class="grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        Wilayah Distribusi Utama
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-teal-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Desa Nifasi</strong> - Pusat distribusi utama</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-teal-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Suku Dani</strong> - Komunitas adat setempat</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-teal-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Kampung Mamai</strong> - Area pemukiman</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-teal-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Kampung Orluk</strong> - Wilayah terpencil</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        <svg class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3a4 4 0 01-8 0V3a4 4 0 018 0v4zM9 7a4 4 0 104 0v10a4 4 0 01-4 0V7z" />
                                                        </svg>
                                                        Lokasi Tambahan
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-orange-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Kampung Makimi</strong> - Distrik setempat</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-orange-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Desa Samabusa</strong> - Komunitas nelayan</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-orange-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Desa Waharia</strong> - Kawasan pertanian</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-orange-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Kantor Publik</strong> - Instansi pemerintah</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Broader CSR Impact -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Dampak CSR yang Lebih Luas</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Program distribusi sembako PT Kristalin Ekalestari bukan hanya sekadar pemberian bantuan material, melainkan bagian dari strategi CSR komprehensif yang memberikan dampak sosial dan ekonomi yang lebih luas bagi masyarakat Papua Tengah. Konsistensi program ini telah membangun kepercayaan dan hubungan yang harmonis antara perusahaan dengan masyarakat setempat.
                                            </p>
                                            <div class="grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900">Dampak Sosial</h4>
                                                    <ul class="list-disc space-y-2 pl-5 text-gray-700">
                                                        <li>Peningkatan kesejahteraan masyarakat kurang mampu</li>
                                                        <li>Dukungan untuk janda lansia yang rentan</li>
                                                        <li>Penguatan kegiatan keagamaan di tempat ibadah</li>
                                                        <li>Pemberdayaan komunitas lokal</li>
                                                        <li>Peningkatan rasa persatuan antar warga</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900">Dampak Ekonomi</h4>
                                                    <ul class="list-disc space-y-2 pl-5 text-gray-700">
                                                        <li>Pengurangan beban pengeluaran keluarga</li>
                                                        <li>Stimulus ekonomi lokal melalui distribusi</li>
                                                        <li>Pemberdayaan ekonomi masyarakat</li>
                                                        <li>Peningkatan daya beli masyarakat</li>
                                                        <li>Kontribusi terhadap stabilitas ekonomi daerah</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Conclusion -->
                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Komitmen Berkelanjutan untuk Papua Tengah</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Konsistensi PT Kristalin Ekalestari dalam mendistribusikan ratusan paket sembako setiap bulan telah membuktikan komitmen nyata perusahaan terhadap kesejahteraan masyarakat Papua Tengah. Program CSR yang berfokus pada masyarakat kurang mampu, janda lansia, dan tempat ibadah ini menunjukkan bahwa perusahaan tidak hanya berfokus pada keuntungan bisnis, tetapi juga pada dampak positif bagi lingkungan sosial. Dengan pola distribusi yang terorganisir dan target penerima yang tepat sasaran, program ini diharapkan dapat terus memberikan manfaat berkelanjutan bagi masyarakat di sekitar area operasional perusahaan di Papua Tengah, menciptakan harmoni antara kemajuan ekonomi dan kesejahteraan sosial masyarakat.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'aug-6',
                        title: 'Komitmen Berkelanjutan: PT Kristalin Ekalestari Rutin Salurkan 506 Paket Sembako di Desa Nifasi',
                        date: '31 Aug 2025',
                        url: '/news/aug-6',
                        excerpt:
                            'PT Kristalin Ekalestari menunjukkan konsistensi program CSR dengan rutinitas bulanan menyalurkan 506 paket sembako kepada masyarakat Desa Nifasi, termasuk tempat ibadah dan janda lansia.',
                        fullContent: {
                            title: 'Komitmen Berkelanjutan: PT Kristalin Ekalestari Rutin Salurkan 506 Paket Sembako di Desa Nifasi',
                            date: '31 Agustus 2025',
                            author: 'Tim Redaksi',
                            source: 'Jarrak Pos',
                            sourceUrl: 'https://www.jarrakpos.com/pt-kristalin-ekalestari-rutin-salurkan-506-paket-sembako-di-desa-nifasi-nabire/',
                            image: '/agus6.jpg',
                            content: `
                                <div class="space-y-8">
                                    <!-- Opening Story -->
                                    <div class="rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-teal-900 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.414-5.414a2 2 0 11-2.828 2.828L10 9" />
                                            </svg>
                                            Rutinitas CSR yang Terpuji dan Berkelanjutan
                                        </h3>
                                        <p class="text-base leading-relaxed text-teal-800">
                                            <strong>PT Kristalin Ekalestari</strong> kembali membuktikan komitmen tanggung jawab sosial perusahaan dengan melanjutkan tradisi distribusi bulanan <strong>506 paket sembako</strong> kepada masyarakat Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah. Program Corporate Social Responsibility (CSR) ini kali ini memberikan perhatian khusus kepada tempat-tempat ibadah, baik Gereja maupun Masjid, sebagai bagian dari upaya holistik untuk mendukung kehidupan spiritual dan material masyarakat setempat.
                                        </p>
                                    </div>

                                    <!-- Corporate Social Responsibility Focus -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Bukti Nyata Komitmen Perusahaan</h3>
                                        <div class="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Dalam rangka program tanggung jawab sosial atau yang dikenal sebagai Corporate Social Responsibility (CSR), <strong>PT Kristalin Ekalestari</strong> memberikan bukti nyata dan komitmen kehadiran perusahaan dalam mendukung kesejahteraan masyarakat. Program ini bukan sekadar kegiatan charity sesaat, melainkan investasi jangka panjang untuk pembangunan sosial berkelanjutan di Papua Tengah.
                                            </p>
                                            <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-6">
                                                <blockquote class="border-l-4 border-blue-500 pl-4 text-lg italic text-gray-700 mb-3">
                                                    "Untuk bulan Agustus kali ini tetap sama dari sebelum-sebelumnya ya, kami memberikan selain masyarakat kurang mampu, janda lansia kali ini menyasar ke tempat-tempat ibadah baik itu masjid."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Maria Erari, Humas PT Kristalin Ekalestari
                                                </cite>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Religious Institutions Support -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Dukungan Khusus untuk Tempat Ibadah</h3>
                                        <div class="rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Maria menerangkan bahwa dari 506 paket bantuan sembako, tiga diantaranya disalurkan khusus ke tempat ibadah yakni di Masjid Al-Muhajirin Sp 1 Biha, Hambah Tuhan dari Gereja GKI Sp 1 Biha, dan seorang janda Mm Jemison di Kampung Mosairo. Program ini menunjukkan apresiasi perusahaan terhadap peran penting institusi keagamaan dalam pembangunan karakter dan spiritual masyarakat Papua Tengah.
                                            </p>
                                            <div class="grid gap-6 md:grid-cols-3">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                                                    <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                                        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Masjid Al-Muhajirin</h4>
                                                    <p class="text-sm text-gray-600">Sp 1 Biha</p>
                                                    <p class="text-xs text-gray-500 mt-2">Mendukung kegiatan ibadah umat Muslim</p>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                                                    <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                                        <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1M21 3H3l2.25 4.5L12 9.75l6.75-2.25L21 3z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Gereja GKI</h4>
                                                    <p class="text-sm text-gray-600">Sp 1 Biha</p>
                                                    <p class="text-xs text-gray-500 mt-2">Hambah Tuhan dari Gereja</p>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                                                    <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                                        <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Kampung Mosairo</h4>
                                                    <p class="text-sm text-gray-600">Janda Mm Jemison</p>
                                                    <p class="text-xs text-gray-500 mt-2">Bantuan individual untuk janda</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Distribution Pattern & Coverage -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Pola Distribusi Janda Lansia Prioritas</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Maria menjelaskan bahwa dari 506 paket yang disalurkan, hampir sekitar 50 persen yang menerima dari kalangan Janda Lansia diantarkan langsung berdasarkan data yang sudah ditentukan dan rekomendasi kepala suku dan adat. Strategi distribusi ini memastikan bantuan tepat sasaran dan dapat dipertanggungjawabkan kepada masyarakat.
                                            </p>
                                            <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-6">
                                                <blockquote class="border-l-4 border-indigo-500 pl-4 text-lg italic text-gray-700 mb-3">
                                                    "Ini bukti komitmen kami sebagai perusahaan, Jika kami tetap beroperasi kami juga memberikan manfaat banyak kepada masyarakat terutama warga yang belum mendapatkan rumah lewat program CSR dan manfaat lainnya."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Maria Erari, Humas PT Kristalin Ekalestari
                                                </cite>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Comprehensive CSR Programs -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program CSR Komprehensif Berkelanjutan</h3>
                                        <div class="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Selain program bantuan sembako, PT Kristalin Ekalestari yang sudah direalisasikan merupakan tanggung jawab sosial perusahaan terhadap lingkungan dan masyarakat antara lain pendidikan, renovasi sekolahan, gereja, bedah rumah warga dan kegiatan masyarakat. Program terintegrasi ini menunjukkan komitmen menyeluruh perusahaan dalam pembangunan komunitas.
                                            </p>
                                            <div class="grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900">Program Infrastruktur</h4>
                                                    <ul class="list-disc space-y-2 pl-5 text-gray-700">
                                                        <li>Bedah rumah untuk warga kurang mampu</li>
                                                        <li>Renovasi sekolahan dan fasilitas pendidikan</li>
                                                        <li>Renovasi gereja dan tempat ibadah</li>
                                                        <li>Pembangunan infrastruktur masyarakat</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900">Program Pemberdayaan</h4>
                                                    <ul class="list-disc space-y-2 pl-5 text-gray-700">
                                                        <li>Dukungan pendidikan untuk anak-anak</li>
                                                        <li>Kegiatan masyarakat dan budaya</li>
                                                        <li>Pemberdayaan ekonomi lokal</li>
                                                        <li>Pelatihan keterampilan masyarakat</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Conclusion -->
                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Dedikasi Berkelanjutan untuk Masyarakat Papua Tengah</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Program rutin distribusi 506 paket sembako oleh PT Kristalin Ekalestari menunjukkan komitmen yang konsisten dan berkelanjutan terhadap kesejahteraan masyarakat Papua Tengah. Dengan prioritas khusus pada janda lansia yang mencapai 50% dari total penerima, dukungan untuk tempat ibadah, dan sistem validasi melalui kepala suku dan adat, program ini telah menjadi model CSR yang efektif dan terukur. Kombinasi dengan program-program lain seperti renovasi sekolah, gereja, bedah rumah, dan kegiatan pemberdayaan masyarakat menciptakan ekosistem pembangunan yang holistik dan berkelanjutan, memperkuat hubungan harmonis antara perusahaan dan masyarakat di sekitar area operasional di Papua Tengah.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'aug-7',
                        title: 'Kepedulian Nyata: PT Kristalin Ekalestari Prioritaskan Lansia dan Tempat Ibadah dalam Program Sembako',
                        date: '31 Aug 2025',
                        url: '/news/aug-7',
                        excerpt:
                            'PT Kristalin Ekalestari menunjukkan kepedulian khusus dengan memprioritaskan lansia dan tempat ibadah dalam distribusi 506 paket sembako di Papua Tengah, memperkuat komitmen CSR berkelanjutan.',
                        fullContent: {
                            title: 'Kepedulian Nyata: PT Kristalin Ekalestari Prioritaskan Lansia dan Tempat Ibadah dalam Program Sembako',
                            date: '31 Agustus 2025',
                            author: 'Tim Redaksi',
                            source: 'Warta Kota',
                            sourceUrl:
                                'https://wartakota.tribunnews.com/news/865880/kristalin-ekalestari-salurkan-ratusan-paket-sembako-kepada-lansia-dan-tempat-ibadah',
                            image: '/agus7.jpg',
                            content: `
                                <div class="space-y-8">
                                    <!-- Opening Story -->
                                    <div class="rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-violet-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-purple-900 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            Mewujudkan Kesejahteraan Berkelanjutan
                                        </h3>
                                        <p class="text-base leading-relaxed text-purple-800">
                                            <strong>PT Kristalin Ekalestari</strong> terus menunjukkan komitmennya terhadap kesejahteraan masyarakat melalui program tanggung jawab sosial perusahaan (Corporate Social Responsibility/CSR) yang berkelanjutan. Setiap bulan, perusahaan menyalurkan sebanyak <strong>506 paket sembako</strong> kepada warga di sejumlah kampung di wilayah Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah, dengan memberikan perhatian khusus kepada kelompok rentan seperti lansia dan tempat-tempat ibadah.
                                        </p>
                                    </div>

                                    <!-- Program Focus August 2025 -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Fokus Khusus Bulan Agustus 2025</h3>
                                        <div class="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Pada bulan Agustus 2025 ini, penyaluran bantuan sembako diperluas dengan menyasar tempat-tempat ibadah seperti gereja dan masjid, selain tetap menjangkau kelompok rentan seperti janda lanjut usia dan keluarga kurang mampu. Program ini merupakan manifestasi nyata komitmen perusahaan dalam memberikan manfaat langsung kepada masyarakat sekitar area operasional.
                                            </p>
                                            <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-6">
                                                <blockquote class="border-l-4 border-blue-500 pl-4 text-lg italic text-gray-700 mb-3">
                                                    "Untuk bulan ini, kami tetap menyalurkan total 506 paket sembako. Selain kepada warga, kami juga menyasar tempat ibadah seperti Masjid Al-Muhajirin SP 1 Biha, serta pendeta di GKI SP 1 Biha."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Maria Erari, Humas PT Kristalin Ekalestari
                                                </cite>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Distribution Methodology -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Metodologi Distribusi Berbasis Data</h3>
                                        <div class="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Bantuan disalurkan berdasarkan data dan rekomendasi dari tokoh adat dan kepala suku setempat, guna memastikan tepat sasaran. Dari total paket yang disalurkan, hampir 50 persen diberikan kepada janda lansia, yang diposisikan sebagai kelompok prioritas dalam program CSR perusahaan.
                                            </p>
                                            <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-6">
                                                <blockquote class="border-l-4 border-indigo-500 pl-4 text-lg italic text-gray-700 mb-3">
                                                    "Dari total paket yang disalurkan, hampir 50 persen diberikan kepada janda lansia. Kami distribusikan langsung berdasarkan data yang telah kami verifikasi bersama pemangku adat."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Maria Erari, Humas PT Kristalin Ekalestari
                                                </cite>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Integrated CSR Programs -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Program CSR Terintegrasi</h3>
                                        <div class="rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Selain program rutin sembako, PT Kristalin Ekalestari juga telah melaksanakan sejumlah program CSR lainnya, seperti bantuan pendidikan, renovasi sekolah dan rumah ibadah, bedah rumah warga, serta dukungan terhadap kegiatan sosial masyarakat. Program terintegrasi ini mencerminkan komitmen perusahaan untuk memberikan dampak holistik bagi pembangunan komunitas lokal.
                                            </p>
                                            <div class="grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900">Program Infrastruktur</h4>
                                                    <ul class="list-disc space-y-2 pl-5 text-gray-700">
                                                        <li>Renovasi sekolah dan fasilitas pendidikan</li>
                                                        <li>Pembangunan dan renovasi rumah ibadah</li>
                                                        <li>Bedah rumah untuk keluarga kurang mampu</li>
                                                        <li>Pembangunan fasilitas umum</li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900">Program Pemberdayaan</h4>
                                                    <ul class="list-disc space-y-2 pl-5 text-gray-700">
                                                        <li>Bantuan pendidikan untuk siswa</li>
                                                        <li>Kegiatan sosial dan budaya masyarakat</li>
                                                        <li>Pemberdayaan ekonomi lokal</li>
                                                        <li>Pelatihan keterampilan praktis</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Conclusion -->
                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Komitmen Berkelanjutan untuk Kesejahteraan Masyarakat</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Program distribusi 506 paket sembako dengan fokus khusus pada lansia dan tempat ibadah menunjukkan pendekatan CSR yang holistik dan berperspektif jangka panjang. PT Kristalin Ekalestari tidak hanya memberikan bantuan material, tetapi juga menunjukkan penghargaan terhadap nilai-nilai spiritual dan kepedulian kepada kelompok rentan dalam masyarakat. Dengan sistem distribusi yang terstruktur, melibatkan tokoh adat dan pemangku kepentingan lokal, program ini menjadi model CSR yang berkelanjutan dan berdampak nyata bagi peningkatan kesejahteraan masyarakat Papua Tengah. Konsistensi program ini, dikombinasikan dengan inisiatif CSR lainnya, menciptakan ekosistem pembangunan yang terintegrasi dan berkelanjutan di wilayah operasional perusahaan.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'aug-8',
                        title: 'Solidaritas Berkelanjutan: PT Kristalin Ekalestari Wujudkan Kepedulian Melalui 506 Paket Sembako untuk Janda Lansia',
                        date: '1 Sep 2025',
                        url: '/news/aug-8',
                        excerpt:
                            'PT Kristalin Ekalestari melanjutkan komitmen CSR dengan menyalurkan 506 paket sembako kepada janda lansia dan tempat ibadah di Nabire, menunjukkan solidaritas berkelanjutan untuk kesejahteraan masyarakat Papua Tengah.',
                        fullContent: {
                            title: 'Solidaritas Berkelanjutan: PT Kristalin Ekalestari Wujudkan Kepedulian Melalui 506 Paket Sembako untuk Janda Lansia',
                            date: '1 September 2025',
                            author: 'Tim Redaksi',
                            source: 'Harian Daerah',
                            sourceUrl:
                                'https://hariandaerah.com/csr-pt-kristalin-ekalestari-506-paket-sembako-untuk-janda-lansia-dan-tempat-ibadah-di-nabire/',
                            image: '/agus8.jpg',
                            content: `
                                <div class="space-y-8">
                                    <!-- Opening Story -->
                                    <div class="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-emerald-900 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            Solidaritas yang Menyejukkan Hati
                                        </h3>
                                        <p class="text-base leading-relaxed text-emerald-800">
                                            Komitmen <strong>PT Kristalin Ekalestari</strong> dalam menjalankan program Corporate Social Responsibility (CSR) terus berlanjut dengan semangat solidaritas yang menghangatkan. Pada periode ini, perusahaan kembali menyalurkan <strong>506 paket sembako</strong> kepada masyarakat di wilayah Distrik Makimi, Kabupaten Nabire, Papua Tengah, dengan fokus utama pada janda lanjut usia dan dukungan untuk tempat-tempat ibadah yang menjadi pusat kehidupan spiritual masyarakat setempat.
                                        </p>
                                    </div>

                                    <!-- CSR Philosophy -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Filosofi CSR yang Berdampak</h3>
                                        <div class="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Program distribusi sembako PT Kristalin Ekalestari bukan sekadar penyaluran bantuan material, melainkan wujud implementasi filosofi perusahaan yang menempatkan kesejahteraan masyarakat sebagai prioritas utama. Setiap paket yang disalurkan membawa misi menciptakan dampak positif berkelanjutan bagi komunitas lokal di Papua Tengah.
                                            </p>
                                            <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-6">
                                                <blockquote class="border-l-4 border-blue-500 pl-4 text-lg italic text-gray-700 mb-3">
                                                    "Program CSR kami dirancang untuk memberikan manfaat langsung kepada masyarakat yang membutuhkan, khususnya kelompok rentan seperti janda lansia yang memerlukan perhatian khusus dalam kehidupan sehari-hari."
                                                </blockquote>
                                                <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Maria Erari, Humas PT Kristalin Ekalestari
                                                </cite>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Community Partnership -->
                                    <div class="space-y-6">
                                        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Kemitraan Strategis dengan Masyarakat</h3>
                                        <div class="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                                            <p class="text-base leading-relaxed text-gray-800 mb-6">
                                                Keberhasilan program distribusi 506 paket sembako tidak terlepas dari kemitraan strategis yang dibangun PT Kristalin Ekalestari dengan tokoh adat dan pemimpin masyarakat setempat. Pendekatan kolaboratif ini memastikan bahwa bantuan disalurkan dengan tepat sasaran dan sesuai dengan kebutuhan nyata masyarakat.
                                            </p>
                                            <div class="grid gap-6 md:grid-cols-2">
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900">Metode Validasi</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-teal-500 rounded-full"></div>
                                                            <span class="text-sm">Verifikasi data oleh tokoh adat</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-teal-500 rounded-full"></div>
                                                            <span class="text-sm">Rekomendasi kepala suku</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-teal-500 rounded-full"></div>
                                                            <span class="text-sm">Survey kondisi penerima</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                                    <h4 class="mb-4 text-lg font-bold text-gray-900">Kriteria Penerima</h4>
                                                    <ul class="space-y-2 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-purple-500 rounded-full"></div>
                                                            <span class="text-sm">Janda lanjut usia prioritas</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-purple-500 rounded-full"></div>
                                                            <span class="text-sm">Keluarga kurang mampu</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-purple-500 rounded-full"></div>
                                                            <span class="text-sm">Tempat ibadah aktif</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Conclusion -->
                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Keberlanjutan Program CSR yang Berdampak</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Distribusi 506 paket sembako untuk janda lansia dan tempat ibadah di Nabire menunjukkan kontinuitas program CSR PT Kristalin Ekalestari yang telah menjadi bagian integral dari kontribusi perusahaan terhadap masyarakat Papua Tengah. Dengan pendekatan yang holistik dan berkelanjutan, program ini tidak hanya memenuhi kebutuhan pangan sesaat, tetapi juga memperkuat ikatan sosial dan spiritual dalam komunitas, menciptakan fondasi yang kokoh untuk pembangunan masyarakat yang sejahtera dan harmonis.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
        ],
    },
    {
        month: 'SEPTEMBER',
        monthId: 'september-2025',
        categories: [
            {
                id: 'kristalin-ekalestari-group-akuisisi-saham-50-persen-pt-torindo-jaya-persada',
                title: 'Kristalin Ekalestari Group Akuisisi Saham 50 Persen PT Torindo Jaya Persada',
                newsItems: [
                    {
                        id: 'sept-1',
                        title: 'Kristalin Ekalestari Group Mengakuisisi 51% Saham PT Torindo Jaya Persada untuk Ekspansi Industri Alat Berat',
                        date: '1 Sep 2025',
                        url: '/news/sept-1',
                        excerpt:
                            'Kristalin Ekalestari Group resmi mengakuisisi 51% kepemilikan saham PT Torindo Jaya Persada dalam strategi ekspansi bisnis alat berat sektor pertambangan di wilayah Indonesia Timur.',
                        fullContent: {
                            title: 'Kristalin Ekalestari Group Mengakuisisi 51% Saham PT Torindo Jaya Persada untuk Ekspansi Industri Alat Berat',
                            date: '1 September 2025',
                            author: 'Tim Redaksi Kristalin',
                            source: 'JPNN.com',
                            sourceUrl: 'https://m.jpnn.com/news/pt-torindo-jaya-persada-fokus-ekspansi-alat-berat-di-sektor-pertambangan',
                            image: '/sept1.jpg',
                            content: `
                                <div class="space-y-8">
                                    <!-- Strategic Acquisition Announcement -->
                                    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-blue-900 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                            Langkah Strategis Ekspansi Bisnis
                                        </h3>
                                        <p class="text-blue-800 leading-relaxed text-base">
                                            <strong>Kristalin Ekalestari Group</strong> mengumumkan keberhasilan akuisisi strategis terhadap <strong>51% kepemilikan saham PT Torindo Jaya Persada</strong> melalui anak perusahaannya, PT Armada Bumi Investama. Langkah ini menandai era baru ekspansi industri alat berat di sektor pertambangan, khususnya di kawasan Indonesia Timur yang kaya akan potensi mineral.
                                        </p>
                                    </div>

                                    <!-- Company Profile & Specialization -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Profil Perusahaan dan Spesialisasi</h3>
                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-6">
                                                PT Torindo Jaya Persada telah membangun reputasi solid sebagai distributor resmi peralatan konstruksi dan pertambangan berkelas dunia. Perusahaan ini menjalin kemitraan strategis dengan berbagai merek terkemuka di industri global, menjadikannya pemain kunci dalam ekosistem alat berat Indonesia.
                                            </p>
                                            <div class="grid md:grid-cols-2 gap-6">
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                        <svg class="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                                        </svg>
                                                        Kemitraan Global
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                                            <span class="text-base"><strong>TATA Motors</strong> - India (Kendaraan Komersial)</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                                            <span class="text-base"><strong>FASSI Cranes</strong> - Italia (Crane Hidrolik)</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                                            <span class="text-base"><strong>Marrel Hooklift</strong> - Prancis (Sistem Hooklift)</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                                            <span class="text-base"><strong>SDLG Machinery</strong> - Tiongkok (Alat Berat)</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                    <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                        <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                        </svg>
                                                        Layanan Terintegrasi
                                                    </h4>
                                                    <ul class="space-y-3 text-gray-700">
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-base">Penjualan Alat Berat</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-base">Layanan Purna Jual</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-base">Logistik dan Distribusi</span>
                                                        </li>
                                                        <li class="flex items-center gap-3">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-base">Konsultasi HR dan Pelatihan</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Strategic Vision Statement -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Visi Strategis Pasca Akuisisi</h3>
                                        <blockquote class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-6 rounded-r-xl shadow-sm">
                                            <p class="text-gray-800 italic text-lg leading-relaxed mb-4">
                                                "Bergabungnya PT Torindo Jaya Persada ke dalam Kristalin Ekalestari Group akan memperkuat posisi kami dalam mengembangkan industri alat berat di sektor pertambangan emas, terutama di kawasan Indonesia Timur yang memiliki potensi luar biasa."
                                            </p>
                                            <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Presiden Direktur PT Torindo Jaya Persada, Nia Kurniasih
                                            </cite>
                                        </blockquote>
                                    </div>

                                    <!-- Ownership Structure Details -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Struktur Kepemilikan Pasca Akuisisi</h3>
                                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-6">
                                                Transaksi akuisisi ini mengubah komposisi kepemilikan PT Torindo Jaya Persada secara signifikan. Presiden Direktur Nia Kurniasih mengonfirmasi bahwa kepemilikan saham yang sebelumnya 100% kini menjadi 49%, sementara PT Armada Bumi Investama sebagai representasi Kristalin Ekalestari Group mengambil alih mayoritas dengan 51% kepemilikan.
                                            </p>
                                            <div class="grid md:grid-cols-2 gap-6">
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                                                        <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-2xl font-bold text-blue-600 mb-2">51%</h4>
                                                    <p class="text-gray-700 font-semibold">PT Armada Bumi Investama</p>
                                                    <p class="text-sm text-gray-600">(Kristalin Ekalestari Group)</p>
                                                </div>
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 mx-auto mb-4">
                                                        <svg class="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-2xl font-bold text-orange-600 mb-2">49%</h4>
                                                    <p class="text-gray-700 font-semibold">Manajemen Lama</p>
                                                    <p class="text-sm text-gray-600">(Kepemilikan Eksisting)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Market Expansion Strategy -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Strategi Ekspansi Pasar Indonesia Timur</h3>
                                        <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-6">
                                                Akuisisi ini bukan sekadar perubahan kepemilikan, namun bagian dari strategi komprehensif untuk memperkuat penetrasi pasar di wilayah Indonesia Timur. Kristalin Ekalestari Group melihat potensi besar dalam sektor pertambangan yang terus berkembang, khususnya di wilayah Papua dan sekitarnya.
                                            </p>
                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                <h4 class="text-lg font-bold text-gray-900 mb-4">Fokus Pengembangan Regional</h4>
                                                <div class="space-y-4">
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-3 w-3 bg-orange-500 rounded-full"></div>
                                                        <span class="text-gray-700 text-base"><strong>Papua dan Papua Barat:</strong> Ekspansi jaringan distribusi alat berat pertambangan</span>
                                                    </div>
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-3 w-3 bg-red-500 rounded-full"></div>
                                                        <span class="text-gray-700 text-base"><strong>Maluku dan Maluku Utara:</strong> Pengembangan layanan purna jual dan logistik</span>
                                                    </div>
                                                    <div class="flex items-center gap-3">
                                                        <div class="h-3 w-3 bg-amber-500 rounded-full"></div>
                                                        <span class="text-gray-700 text-base"><strong>Sulawesi Tenggara:</strong> Penguatan kemitraan dengan perusahaan tambang lokal</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Market Outlook and Future Prospects -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Outlook Pasar dan Prospek Masa Depan</h3>
                                        <blockquote class="bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-500 p-6 rounded-r-xl shadow-sm">
                                            <p class="text-gray-800 italic text-lg leading-relaxed mb-4">
                                                "Kondisi pasar tambang batu bara mengalami fluktuasi, namun potensi sektor lain seperti tambang emas masih sangat stabil dan menjanjikan. Kami optimis dapat memperluas jaringan penjualan pada berbagai segmen industri di luar Kristalin Ekalestari Group untuk wilayah Indonesia Timur."
                                            </p>
                                            <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Analisis Tim Strategis PT Torindo Jaya Persada
                                            </cite>
                                        </blockquote>
                                    </div>

                                    <!-- Integration Benefits -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Manfaat Integrasi Strategis</h3>
                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-6">
                                                Integrasi PT Torindo Jaya Persada ke dalam ekosistem Kristalin Ekalestari Group diharapkan menciptakan sinergi positif yang menguntungkan semua pihak. Kombinasi keahlian teknis, jaringan distribusi, dan akses ke pasar yang lebih luas akan memperkuat posisi kompetitif di industri alat berat Indonesia.
                                            </p>
                                            <div class="grid md:grid-cols-3 gap-6">
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto mb-4">
                                                        <svg class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Efisiensi Operasional</h4>
                                                    <p class="text-gray-600 text-sm">Optimalisasi rantai pasok dan distribusi alat berat</p>
                                                </div>
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 mx-auto mb-4">
                                                        <svg class="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Ekspansi Jaringan</h4>
                                                    <p class="text-gray-600 text-sm">Jangkauan pasar yang lebih luas di Indonesia Timur</p>
                                                </div>
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mx-auto mb-4">
                                                        <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-2">Kualitas Layanan</h4>
                                                    <p class="text-gray-600 text-sm">Peningkatan standar pelayanan dan dukungan teknis</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Future Commitment -->
                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Komitmen Jangka Panjang dan Visi Masa Depan</h3>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Akuisisi strategis PT Torindo Jaya Persada oleh Kristalin Ekalestari Group menandai babak baru dalam industri alat berat Indonesia, khususnya untuk sektor pertambangan di wilayah Indonesia Timur. Dengan menggabungkan keahlian teknis, jaringan distribusi yang kuat, dan visi ekspansi yang ambisius, kemitraan ini diharapkan akan memberikan kontribusi signifikan terhadap pertumbuhan ekonomi regional dan pengembangan infrastruktur pertambangan yang berkelanjutan. Langkah ini juga memperkuat posisi Kristalin Ekalestari Group sebagai pemain utama dalam ekosistem pertambangan dan industri alat berat di Indonesia.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                    {
                        id: 'sept-3',
                        title: 'Kristalin Ekalestari Group Mengakuisisi 51% Saham PT Torindo Jaya Persada untuk Ekspansi Industri Alat Berat',
                        date: '3 Sep 2025',
                        url: '/news/sept-3',
                        excerpt:
                            'Langkah konsolidasi strategis Kristalin Ekalestari Group melalui akuisisi mayoritas PT Torindo Jaya Persada membentuk ekosistem bisnis terintegrasi untuk memperkuat posisi dominan dalam industri alat berat kawasan Indonesia Timur.',
                        fullContent: {
                            title: 'Kristalin Ekalestari Group Mengakuisisi 51% Saham PT Torindo Jaya Persada untuk Ekspansi Industri Alat Berat',
                            date: '3 September 2025',
                            author: 'Tim Redaksi Kristalin',
                            source: 'Poskota.co.id',
                            sourceUrl:
                                'https://www.poskota.co.id/2025/08/30/merger-strategis-pt-torindo-jaya-persada-fokus-ekspansi-alat-berat-di-sektor-pertambangan',
                            image: '/sept3.webp',
                            content: `
                                <div class="prose prose-lg max-w-none space-y-8">
                                    <!-- Strategic Opening -->
                                    <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                                        <p class="text-gray-800 leading-relaxed text-base mb-4">
                                            Industri alat berat Indonesia memasuki era konsolidasi strategis dengan terealisasinya akuisisi mayoritas PT Torindo Jaya Persada oleh Kristalin Ekalestari Group. Melalui PT Armada Bumi Investama, langkah ini menciptakan ekosistem bisnis terintegrasi untuk mengoptimalkan penetrasi pasar alat berat di kawasan Indonesia Timur.
                                        </p>
                                    </div>

                                    <!-- Company Excellence -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-emerald-500 pb-2">Portfolio Keunggulan PT Torindo Jaya Persada</h3>
                                        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                            <div class="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Kemitraan Global</h4>
                                                    <div class="space-y-2">
                                                        <div class="flex items-center gap-2">
                                                            <div class="h-2 w-2 bg-emerald-500 rounded-full"></div>
                                                            <span class="text-gray-700 text-sm">TATA Motors (India)</span>
                                                        </div>
                                                        <div class="flex items-center gap-2">
                                                            <div class="h-2 w-2 bg-teal-500 rounded-full"></div>
                                                            <span class="text-gray-700 text-sm">FASSI Cranes (Italia)</span>
                                                        </div>
                                                        <div class="flex items-center gap-2">
                                                            <div class="h-2 w-2 bg-cyan-500 rounded-full"></div>
                                                            <span class="text-gray-700 text-sm">Marrel Hooklift (Prancis)</span>
                                                        </div>
                                                        <div class="flex items-center gap-2">
                                                            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span class="text-gray-700 text-sm">SDLG Machinery (China)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 class="text-lg font-bold text-gray-900 mb-3">Layanan Terintegrasi</h4>
                                                    <div class="space-y-2">
                                                        <div class="flex items-center gap-2">
                                                            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                            <span class="text-gray-700 text-sm">Distribusi alat berat</span>
                                                        </div>
                                                        <div class="flex items-center gap-2">
                                                            <div class="h-2 w-2 bg-indigo-500 rounded-full"></div>
                                                            <span class="text-gray-700 text-sm">Layanan purna jual</span>
                                                        </div>
                                                        <div class="flex items-center gap-2">
                                                            <div class="h-2 w-2 bg-purple-500 rounded-full"></div>
                                                            <span class="text-gray-700 text-sm">HR Consulting</span>
                                                        </div>
                                                        <div class="flex items-center gap-2">
                                                            <div class="h-2 w-2 bg-pink-500 rounded-full"></div>
                                                            <span class="text-gray-700 text-sm">Pelatihan & sertifikasi</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Leadership Vision -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-emerald-500 pb-2">Visi Kepemimpinan Strategis</h3>
                                        <blockquote class="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                                            <p class="text-gray-800 italic text-base leading-relaxed mb-3">
                                                "Dengan bergabungnya PT Torindo Jaya Persada sebagai bagian Kristalin Ekalestari Group, kami memantapkan posisi untuk mengembangkan bisnis alat berat sektor pertambangan emas di Indonesia Timur dan memperluas jaringan penjualan lintas sektor industri."
                                            </p>
                                            <cite class="text-sm text-gray-600 font-medium">— Nia Kurniasih, Presiden Direktur PT Torindo Jaya Persada</cite>
                                        </blockquote>
                                    </div>

                                    <!-- Ownership Structure -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-emerald-500 pb-2">Struktur Kepemilikan Baru</h3>
                                        <div class="grid md:grid-cols-2 gap-6">
                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                <h4 class="text-2xl font-bold text-emerald-600 mb-2">51%</h4>
                                                <p class="text-gray-700 font-semibold">PT Armada Bumi Investama</p>
                                                <p class="text-sm text-gray-600">(Kontroling Strategic)</p>
                                            </div>
                                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                                <h4 class="text-2xl font-bold text-blue-600 mb-2">49%</h4>
                                                <p class="text-gray-700 font-semibold">Manajemen Torindo</p>
                                                <p class="text-sm text-gray-600">(Kontinuitas Operasional)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Market Analysis -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-emerald-500 pb-2">Analisis Pasar dan Positioning</h3>
                                        <div class="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-4">
                                                Kondisi pasar menunjukkan volatilitas tinggi pada sektor batu bara, namun sektor pertambangan emas menampilkan stabilitas dan prospek menjanjikan. Hal ini menjadi landasan strategis konsolidasi yang difokuskan pada alat berat untuk pertambangan emas di Indonesia Timur.
                                            </p>
                                            <blockquote class="bg-white border-l-4 border-orange-500 p-4 rounded-r-lg">
                                                <p class="text-gray-800 italic text-sm">
                                                    "Pasar tambang batu bara sangat fluktuatif, namun potensi tambang emas masih stabil dan menjanjikan. Dengan ekosistem kuat dan kemitraan global strategis, kami optimis memperkuat pertumbuhan bisnis alat berat."
                                                </p>
                                            </blockquote>
                                        </div>
                                    </div>

                                    <!-- Strategic Integration -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-emerald-500 pb-2">Integrasi dan Value Creation</h3>
                                        <div class="grid md:grid-cols-3 gap-4">
                                            <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
                                                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mx-auto mb-3">
                                                    <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </div>
                                                <h4 class="text-base font-bold text-gray-900 mb-1">Sinergi Operasional</h4>
                                                <p class="text-gray-600 text-xs">Integrasi supply chain</p>
                                            </div>
                                            <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
                                                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 mx-auto mb-3">
                                                    <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945" />
                                                    </svg>
                                                </div>
                                                <h4 class="text-base font-bold text-gray-900 mb-1">Dominasi Pasar</h4>
                                                <p class="text-gray-600 text-xs">Penetrasi regional</p>
                                            </div>
                                            <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
                                                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mx-auto mb-3">
                                                    <svg class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944" />
                                                    </svg>
                                                </div>
                                                <h4 class="text-base font-bold text-gray-900 mb-1">Service Excellence</h4>
                                                <p class="text-gray-600 text-xs">Comprehensive solution</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Future Outlook -->
                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900">Target Strategis Masa Depan</h3>
                                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                                            Merger ini menargetkan positioning lebih kuat sebagai pemain utama bisnis alat berat China di kawasan Indonesia Timur. Dengan menggabungkan teknologi internasional, expertise pertambangan emas, dan network luas, entitas hasil konsolidasi diproyeksikan mengoptimalkan market share dan menciptakan competitive advantage berkelanjutan.
                                        </p>
                                        <div class="bg-white rounded-lg p-4 border border-gray-200">
                                            <h4 class="text-base font-bold text-gray-900 mb-2">Key Strategic Achievements</h4>
                                            <div class="grid md:grid-cols-2 gap-3">
                                                <div class="flex items-center gap-2">
                                                    <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                                    <span class="text-gray-700 text-sm">Dominasi pasar alat berat China</span>
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <div class="h-2 w-2 bg-orange-500 rounded-full"></div>
                                                    <span class="text-gray-700 text-sm">Comprehensive after-sales network</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
        ],
    },
    {
        month: 'OKTOBER',
        monthId: 'oktober-2025',
        categories: [
            {
                id: 'investasi-dubai-blockchain-emas',
                title: 'Investasi Dubai - Teknologi Blockchain untuk Tambang Emas',
                newsItems: [
                    {
                        id: 'oct-1',
                        title: 'Kristalin Group Raih Komitmen Investasi USD 55 Juta dari Dubai untuk Proyek Tambang Emas Berbasis Blockchain',
                        date: '20 Oct 2025',
                        url: '/news/oct-1',
                        excerpt:
                            'Kristalin Group mengamankan komitmen investasi senilai USD 55 juta dari dua perusahaan Dubai dalam Trade Expo Indonesia 2025 untuk pengembangan tambang emas seluas 3.500 hektar di Nabire dengan teknologi blockchain dan prinsip Syariah.',
                        fullContent: {
                            title: 'Kristalin Group Raih Komitmen Investasi USD 55 Juta dari Dubai untuk Proyek Tambang Emas Berbasis Blockchain',
                            date: '20 Oktober 2025',
                            author: 'Tim Redaksi Kristalin',
                            source: 'Liputan6.com',
                            sourceUrl: 'https://www.liputan6.com/bisnis/read/6189920/kristalin-kantongi-investasi-usd-55-juta-dari-dubai-di-tei-2025',
                            image: '/investmentkristalin.jpg',
                            content: `
                                <div class="space-y-8">
                                    <!-- Opening Story -->
                                    <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                                        <h3 class="text-lg font-bold text-emerald-900 mb-3 flex items-center gap-2">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M12 3v12m0 0l-3-3m3 3l3-3" />
                                            </svg>
                                            Terobosan Investasi Internasional di TEI 2025
                                        </h3>
                                        <p class="text-emerald-800 leading-relaxed text-base">
                                            Dalam ajang bergengsi <strong>Trade Expo Indonesia (TEI) 2025</strong> yang berlangsung di ICE BSD City, Tangerang, <strong>Kristalin Group</strong> berhasil menarik perhatian investor internasional dengan mengamankan komitmen investasi senilai <strong>USD 55 juta</strong> atau setara <strong>Rp 912 miliar</strong> (kurs Rp 16.582 per USD). Pencapaian monumental ini menandai babak baru dalam pengembangan industri pertambangan emas Indonesia yang berkelanjutan dan berbasis teknologi.
                                        </p>
                                    </div>

                                    <!-- Investment Details -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Rincian Komitmen Investasi</h3>
                                        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-6">
                                                Komitmen investasi strategis ini diwujudkan melalui penandatanganan dua <strong>Memorandum of Understanding (MoU)</strong> dengan perusahaan terkemuka asal Dubai, Uni Emirat Arab. Investasi ini secara khusus dialokasikan untuk pengembangan konsesi tambang emas seluas <strong>3.500 hektar</strong> yang berlokasi di Nabire, Papua Tengah.
                                            </p>
                                            <div class="grid md:grid-cols-2 gap-6">
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                    <div class="flex items-center gap-3 mb-4">
                                                        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                                            <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h4 class="text-lg font-bold text-gray-900">SMART IoT LLC</h4>
                                                            <p class="text-sm text-gray-600">Dubai, UAE</p>
                                                        </div>
                                                    </div>
                                                    <div class="space-y-3">
                                                        <div class="flex justify-between items-center">
                                                            <span class="text-gray-700 font-medium">Nilai Investasi:</span>
                                                            <span class="text-2xl font-bold text-blue-600">$35M</span>
                                                        </div>
                                                        <div class="flex justify-between items-center">
                                                            <span class="text-gray-700 font-medium">Ekuivalen IDR:</span>
                                                            <span class="text-lg font-semibold text-gray-900">Rp 580 Miliar</span>
                                                        </div>
                                                        <div class="pt-3 border-t border-gray-200">
                                                            <p class="text-sm text-gray-600">Fokus: IoT Integration & Smart Mining Technology</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                    <div class="flex items-center gap-3 mb-4">
                                                        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                                            <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h4 class="text-lg font-bold text-gray-900">Lobo Investment LLC</h4>
                                                            <p class="text-sm text-gray-600">Dubai, UAE</p>
                                                        </div>
                                                    </div>
                                                    <div class="space-y-3">
                                                        <div class="flex justify-between items-center">
                                                            <span class="text-gray-700 font-medium">Nilai Investasi:</span>
                                                            <span class="text-2xl font-bold text-purple-600">$20M</span>
                                                        </div>
                                                        <div class="flex justify-between items-center">
                                                            <span class="text-gray-700 font-medium">Ekuivalen IDR:</span>
                                                            <span class="text-lg font-semibold text-gray-900">Rp 332 Miliar</span>
                                                        </div>
                                                        <div class="pt-3 border-t border-gray-200">
                                                            <p class="text-sm text-gray-600">Fokus: Strategic Investment & Capital Structuring</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Leadership Vision -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Visi Kepemimpinan dan Strategi Bisnis</h3>
                                        <blockquote class="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-xl shadow-sm">
                                            <p class="text-gray-800 italic text-lg leading-relaxed mb-4">
                                                "Kami tidak sekadar membangun proyek tambang, melainkan membangun fondasi kepercayaan dan ekosistem investasi berbasis teknologi yang menghubungkan Indonesia dengan Uni Emirat Arab. Ini adalah langkah strategis menuju masa depan pertambangan yang transparan dan berkelanjutan."
                                            </p>
                                            <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Andito Prasetyowan, Presiden Direktur PT Kristalin Eka Lestari
                                            </cite>
                                        </blockquote>
                                    </div>

                                    <!-- Blockchain Technology Innovation -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Teknologi Blockchain & Kepatuhan Syariah</h3>
                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-6">
                                                Yang membedakan proyek ambisius ini dari investasi konvensional adalah penerapan <strong>teknologi blockchain</strong> yang sepenuhnya mematuhi <strong>prinsip Syariah</strong>. Kristalin Group akan mengimplementasikan sistem inovatif yang mengintegrasikan teknologi digital dengan kaidah keuangan Islam.
                                            </p>
                                            <div class="grid md:grid-cols-3 gap-6">
                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                    <div class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-200 mx-auto mb-4">
                                                        <svg class="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-base font-bold text-gray-900 mb-2 text-center">Tokenisasi Aset Riil (RWA)</h4>
                                                    <p class="text-sm text-gray-600 text-center leading-relaxed">Kepemilikan emas secara digital melalui token blockchain yang dapat diperdagangkan secara transparan</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                    <div class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 mx-auto mb-4">
                                                        <svg class="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-base font-bold text-gray-900 mb-2 text-center">Smart Contract</h4>
                                                    <p class="text-sm text-gray-600 text-center leading-relaxed">Sistem pembagian hasil otomatis dan transparan yang menjamin keadilan bagi semua stakeholder</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                                    <div class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200 mx-auto mb-4">
                                                        <svg class="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-base font-bold text-gray-900 mb-2 text-center">Blockchain Tracking</h4>
                                                    <p class="text-sm text-gray-600 text-center leading-relaxed">Pencatatan real-time untuk produksi, kepemilikan, hingga distribusi emas secara end-to-end</p>
                                                </div>
                                            </div>
                                        </div>

                                        <blockquote class="bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-500 p-6 rounded-r-xl shadow-sm">
                                            <p class="text-gray-800 italic text-lg leading-relaxed mb-4">
                                                "Dubai merupakan pusat keuangan global yang ideal untuk investasi lintas negara berbasis blockchain dengan kepatuhan penuh terhadap prinsip Syariah. Model bisnis ini memastikan transparansi, keamanan, dan kepatuhan terhadap kaidah keuangan Islam."
                                            </p>
                                            <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Ronald Rigen Tambunan, CEO Kristalin Digital Dubai
                                            </cite>
                                        </blockquote>
                                    </div>

                                    <!-- Project Development Phases -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Tahapan Pengembangan Proyek</h3>
                                        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-6">
                                                Pengembangan tambang emas di Nabire, Papua Tengah, akan dilaksanakan secara bertahap dan terstruktur untuk memastikan keberlanjutan operasional dan dampak positif bagi masyarakat lokal.
                                            </p>
                                            <div class="space-y-4">
                                                <div class="flex items-start gap-4 bg-white rounded-lg p-4 border border-gray-200">
                                                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
                                                        <span class="text-lg font-bold text-amber-600">1</span>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-base font-bold text-gray-900 mb-1">Fase Eksplorasi</h4>
                                                        <p class="text-sm text-gray-600">Pemetaan dan analisis geologis untuk menentukan potensi cadangan emas di wilayah konsesi</p>
                                                    </div>
                                                </div>

                                                <div class="flex items-start gap-4 bg-white rounded-lg p-4 border border-gray-200">
                                                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                                                        <span class="text-lg font-bold text-blue-600">2</span>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-base font-bold text-gray-900 mb-1">Pembangunan Infrastruktur</h4>
                                                        <p class="text-sm text-gray-600">Konstruksi fasilitas penambangan, pengolahan, dan infrastruktur pendukung operasional</p>
                                                    </div>
                                                </div>

                                                <div class="flex items-start gap-4 bg-white rounded-lg p-4 border border-gray-200">
                                                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                                                        <span class="text-lg font-bold text-green-600">3</span>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-base font-bold text-gray-900 mb-1">Fase Produksi</h4>
                                                        <p class="text-sm text-gray-600">Operasional penambangan emas dengan standar internasional dan ramah lingkungan</p>
                                                    </div>
                                                </div>

                                                <div class="flex items-start gap-4 bg-white rounded-lg p-4 border border-gray-200">
                                                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 flex-shrink-0">
                                                        <span class="text-lg font-bold text-purple-600">4</span>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-base font-bold text-gray-900 mb-1">Tokenisasi Aset</h4>
                                                        <p class="text-sm text-gray-600">Implementasi sistem blockchain untuk digitalisasi kepemilikan emas dan transparansi transaksi</p>
                                                    </div>
                                                </div>

                                                <div class="flex items-start gap-4 bg-white rounded-lg p-4 border border-gray-200">
                                                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 flex-shrink-0">
                                                        <span class="text-lg font-bold text-indigo-600">5</span>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-base font-bold text-gray-900 mb-1">Ekspor & Distribusi</h4>
                                                        <p class="text-sm text-gray-600">Pemasaran dan distribusi emas ke pasar global dengan sistem tracking blockchain</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Economic & Social Impact -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Dampak Ekonomi dan Sosial</h3>
                                        <div class="grid md:grid-cols-2 gap-6">
                                            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    Pemberdayaan Masyarakat
                                                </h4>
                                                <ul class="space-y-3 text-gray-700">
                                                    <li class="flex items-center gap-2">
                                                        <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                        <span class="text-sm">Penciptaan lapangan kerja untuk masyarakat lokal Papua Tengah</span>
                                                    </li>
                                                    <li class="flex items-center gap-2">
                                                        <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                        <span class="text-sm">Program pelatihan dan pengembangan keterampilan teknis</span>
                                                    </li>
                                                    <li class="flex items-center gap-2">
                                                        <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                        <span class="text-sm">Peningkatan kapasitas ekonomi masyarakat sekitar area operasional</span>
                                                    </li>
                                                    <li class="flex items-center gap-2">
                                                        <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                                        <span class="text-sm">Pembangunan infrastruktur sosial dan fasilitas umum</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                    Tata Kelola Berkelanjutan
                                                </h4>
                                                <ul class="space-y-3 text-gray-700">
                                                    <li class="flex items-center gap-2">
                                                        <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                        <span class="text-sm">Transparansi operasional melalui teknologi blockchain</span>
                                                    </li>
                                                    <li class="flex items-center gap-2">
                                                        <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                        <span class="text-sm">Kepatuhan penuh terhadap standar lingkungan internasional</span>
                                                    </li>
                                                    <li class="flex items-center gap-2">
                                                        <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                        <span class="text-sm">Praktik pertambangan yang bertanggung jawab dan berkelanjutan</span>
                                                    </li>
                                                    <li class="flex items-center gap-2">
                                                        <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                        <span class="text-sm">Menjadi contoh global tata kelola tambang yang transparan</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Strategic Significance -->
                                    <div class="space-y-6">
                                        <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">Signifikansi Strategis untuk Indonesia</h3>
                                        <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                                            <p class="text-gray-800 leading-relaxed text-base mb-6">
                                                Investasi ini memiliki makna strategis yang mendalam bagi pengembangan sektor pertambangan Indonesia, khususnya dalam konteks transformasi digital dan integrasi dengan ekosistem keuangan global.
                                            </p>
                                            <div class="grid md:grid-cols-3 gap-4">
                                                <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 mx-auto mb-3">
                                                        <svg class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M12 3v12m0 0l-3-3m3 3l3-3" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-sm font-bold text-gray-900 mb-1">Daya Tarik Investasi</h4>
                                                    <p class="text-xs text-gray-600">Meningkatkan kepercayaan investor internasional</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mx-auto mb-3">
                                                        <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-sm font-bold text-gray-900 mb-1">Inovasi Teknologi</h4>
                                                    <p class="text-xs text-gray-600">Pionir blockchain di sektor pertambangan</p>
                                                </div>

                                                <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
                                                    <div class="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 mx-auto mb-3">
                                                        <svg class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M12 3v12m0 0l-3-3m3 3l3-3m6 6V11a2 2 0 00-2-2h-1M4 11h5" />
                                                        </svg>
                                                    </div>
                                                    <h4 class="text-sm font-bold text-gray-900 mb-1">Kemitraan Global</h4>
                                                    <p class="text-xs text-gray-600">Hubungan Indonesia-UAE semakin kuat</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Future Vision & Commitment -->
                                    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                                        <h3 class="mb-3 text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <svg class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            Komitmen Jangka Panjang dan Visi Masa Depan
                                        </h3>
                                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                                            Kesepakatan investasi USD 55 juta ini bukan sekadar transaksi finansial, melainkan komitmen jangka panjang untuk membangun ekosistem pertambangan emas yang berkelanjutan, transparan, dan memberikan dampak positif nyata bagi masyarakat Papua Tengah. Dengan mengintegrasikan teknologi blockchain dan prinsip Syariah, Kristalin Group bertekad menjadikan Indonesia sebagai contoh global dalam tata kelola tambang emas yang bertanggung jawab.
                                        </p>
                                        <p class="text-base leading-relaxed text-gray-800">
                                            Proyek ini diharapkan menjadi katalisator bagi pengembangan ekonomi regional, pemberdayaan masyarakat lokal, dan penguatan posisi Indonesia dalam peta industri pertambangan emas dunia. Melalui kolaborasi strategis dengan investor Dubai dan penerapan teknologi terdepan, Kristalin Group siap membawa industri pertambangan Indonesia memasuki era digital yang lebih transparan, efisien, dan berkelanjutan.
                                        </p>
                                    </div>
                                </div>
                            `,
                        },
                    },
                ],
            },
        ],
    },
];

// Enhanced animations with professional timing
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Professional counter animation component
interface CounterAnimationProps {
    end: number;
    duration?: number;
    delay?: number;
    suffix?: string;
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({ end, duration = 2000, delay = 0, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(true);
            let startTime: number;
            // const startCount = 0; // Removed unused variable

            const animate = (currentTime: number) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);

                setCount(Math.floor(progress * end));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setIsAnimating(false);
                }
            };

            requestAnimationFrame(animate);
        }, delay);

        return () => clearTimeout(timer);
    }, [end, duration, delay]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            transition={{
                duration: 0.8,
                delay: delay / 1000,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mb-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
        >
            <motion.span
                animate={{
                    scale: isAnimating ? [1, 1.05, 1] : 1,
                }}
                transition={{
                    duration: 0.5,
                    repeat: isAnimating ? Infinity : 0,
                    repeatType: 'reverse',
                }}
            >
                {count.toLocaleString()}
                {suffix}
            </motion.span>
        </motion.div>
    );
};

const KristalinNewsPage: React.FC = () => {
    const { t } = useTranslation();

    // Function to get translated article content
    const getTranslatedArticle = (articleId: string) => {
        const articleTranslation = t(`pages.news.articles.${articleId}`);
        if (typeof articleTranslation === 'object' && articleTranslation !== null) {
            return articleTranslation;
        }
        return null;
    };

    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const [scrollY, setScrollY] = useState(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>(t('pages.news.categories.all'));
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Categories for filter buttons with translations
    const categories = [
        t('pages.news.categories.all'),
        t('pages.news.categories.csr_initiative'),
        t('pages.news.categories.community_development'),
        t('pages.news.categories.house_construction'),
        t('pages.news.categories.food_distribution'),
        t('pages.news.categories.education_support'),
    ];

    // Debug: Log translation values to console
    console.log('Translation debug:', {
        house_construction: t('pages.news.categories.house_construction'),
        food_distribution: t('pages.news.categories.food_distribution'),
        education_support: t('pages.news.categories.education_support'),
    });

    // Category mapping for filtering - using translated values
    const categoryMapping: { [key: string]: string[] } = {
        [t('pages.news.categories.all')]: [],
        [t('pages.news.categories.csr_initiative')]: [
            'kristalin-ekalestari-group-akuisisi-saham-50-persen-pt-torindo-jaya-persada',
            'investasi-dubai-blockchain-emas',
        ],
        [t('pages.news.categories.community_development')]: ['csr-hut-ri-80-cidata-barat-papua', 'pemberitahuan-bantuan-dana-hak-garap'],
        [t('pages.news.categories.house_construction')]: [
            'pembangunan-rumah-nifasi-feb',
            'pembangunan-rumah-nelayan',
            'pembangunan-rumah-juni',
            'csr-pembangunan-rumah-lomon-monei',
        ],
        [t('pages.news.categories.food_distribution')]: [
            'penyaluran-sembako-feb',
            'csr-pembagian-sembako-juli',
            'csr-penyaluran-bantuan-sembako-agustus',
        ],
        [t('pages.news.categories.education_support')]: ['pendanaan-pendidikan'],
    };

    // Filter news data based on selected category
    const getFilteredNewsData = () => {
        if (selectedCategory === t('pages.news.categories.all')) {
            return newsData;
        }

        const categoryIds = categoryMapping[selectedCategory] || [];
        if (categoryIds.length === 0) {
            return newsData;
        }

        return newsData
            .map((month) => ({
                ...month,
                categories: month.categories.filter((category) => categoryIds.includes(category.id)),
            }))
            .filter((month) => month.categories.length > 0);
    };

    const filteredNewsData = getFilteredNewsData();

    // Handle category selection with smooth scroll
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);

        // Smooth scroll to news content after a short delay
        setTimeout(() => {
            const newsSection = document.getElementById('news-archive');
            if (newsSection) {
                newsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 100);
    };

    // Toggle category expansion
    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    // Parallax effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle anchor navigation to News Archive section
    useEffect(() => {
        const handleAnchorNavigation = () => {
            const hash = window.location.hash;
            if (hash === '#news-archive') {
                // Wait for element to be available and scroll to News Archive section
                const waitForElement = () => {
                    const element = document.getElementById('news-archive');
                    if (element) {
                        // Calculate precise position with header offset
                        const headerHeight = 80; // Header height
                        const elementRect = element.getBoundingClientRect();
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        const elementPosition = elementRect.top + scrollTop - headerHeight;

                        // Smooth scroll to the News Archive section
                        window.scrollTo({
                            top: Math.max(0, elementPosition),
                            behavior: 'smooth',
                        });

                        // Add visual highlight to the News Archive section
                        element.classList.add('ring-2', 'ring-amber-500', 'ring-opacity-50', 'transition-all', 'duration-300');
                        setTimeout(() => {
                            element.classList.remove('ring-2', 'ring-amber-500', 'ring-opacity-50');
                        }, 3000);
                    } else {
                        // Element not found yet, wait and try again
                        setTimeout(waitForElement, 50);
                    }
                };

                // Start waiting for element
                setTimeout(waitForElement, 200);
            }
        };

        // Handle initial load
        handleAnchorNavigation();

        // Handle hash changes (for browser back/forward)
        const handleHashChange = () => {
            handleAnchorNavigation();
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // Removed unused functions and variables for the new structure

    // Calculate statistics based on filtered data
    const totalArticles = filteredNewsData.reduce(
        (total, month) => total + month.categories.reduce((catTotal, category) => catTotal + category.newsItems.length, 0),
        0,
    );
    const totalCategories = filteredNewsData.reduce((total, month) => total + month.categories.length, 0);
    const totalMonths = newsData.length;

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white">
            <Header sticky={true} transparent={true} />

            {/* Hero Section - ULTRA FLEXIBLE RESPONSIVE */}
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`,
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=1080&fit=crop"
                        alt="Mining operations and news background"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
                </div>

                <motion.div
                    className="relative z-20 mx-auto w-full max-w-5xl px-4 py-16 text-center sm:py-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <motion.div
                        className="transform transition-all duration-1000 ease-out"
                        style={{
                            transform: `translateY(${scrollY * 0.2}px)`,
                            opacity: Math.max(0, 1 - scrollY / 600),
                        }}
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                        {/* 100% SAME AS CSR & BUSINESS ACTIVITY - RESPONSIVE HEADING */}
                        <motion.h1
                            className="mb-6 text-3xl leading-tight font-bold sm:mb-8 sm:text-4xl md:text-5xl lg:text-7xl"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                        >
                            <motion.span
                                className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                            >
                                {t('pages.news.hero.title_line1')}
                            </motion.span>
                            <br />
                            <motion.span
                                className="text-white"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
                            >
                                {t('pages.news.hero.title_line2')}
                            </motion.span>
                        </motion.h1>

                        {/* 100% SAME AS CSR - RESPONSIVE DESCRIPTION */}
                        <motion.p
                            className="mx-auto mb-8 max-w-4xl px-2 text-base leading-relaxed font-light text-white/95 sm:mb-12 sm:text-lg md:text-xl lg:text-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                        >
                            {t('pages.news.hero.description')}
                        </motion.p>

                        {/* 100% SAME AS CSR - RESPONSIVE SEARCH BAR */}
                        <motion.div
                            className="mx-auto mb-8 max-w-2xl"
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
                        >
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!searchQuery.trim()) return;
                                    setIsSearching(true);
                                    setTimeout(() => {
                                        setIsSearching(false);
                                        // Scroll to news content
                                        const newsSection = document.querySelector('.news-content-section');
                                        if (newsSection) {
                                            newsSection.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }, 800);
                                }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30"></div>
                                <div className="relative flex w-full items-center gap-2 rounded-2xl border-2 border-amber-400/30 bg-black/30 px-3 py-2 shadow-lg backdrop-blur-md transition-all duration-300 focus-within:ring-2 focus-within:ring-amber-400 sm:gap-3 sm:px-6 sm:py-4">
                                    <Search
                                        className={`h-5 w-5 transition-all duration-300 sm:h-6 sm:w-6 ${
                                            isSearching ? 'animate-spin text-amber-500' : 'text-amber-400'
                                        }`}
                                    />
                                    <input
                                        ref={searchInputRef}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t('pages.news.hero.search_placeholder')}
                                        className="flex-1 border-none bg-transparent text-sm text-white placeholder-gray-300 outline-none sm:text-base lg:text-lg"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery('')}
                                            className="text-gray-300 transition-colors duration-200 hover:text-white"
                                        >
                                            ×
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-3 py-2 text-sm font-semibold text-black shadow-md transition-all duration-200 hover:from-amber-400 hover:to-yellow-500 hover:shadow-lg active:scale-95 sm:px-6 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
                                    >
                                        <span className="absolute inset-0 -translate-x-full -skew-x-12 transform bg-white/20 transition-transform duration-700 group-hover:translate-x-full"></span>
                                        <Search className="inline h-4 w-4 sm:h-5 sm:w-5 lg:hidden" />
                                        <span className="relative hidden lg:inline">{t('pages.news.hero.search_button')}</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>

                        {/* 100% SAME AS CSR - RESPONSIVE CATEGORY FILTERS */}
                        <motion.div
                            className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.6 }}
                        >
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category}
                                    onClick={() => handleCategorySelect(category)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.6 + index * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 sm:px-6 sm:py-3 sm:text-sm ${
                                        selectedCategory === category
                                            ? 'bg-gradient-to-r from-amber-400 to-yellow-500 font-bold text-black shadow-lg'
                                            : 'border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-amber-400'
                                    }`}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* 100% SAME AS CSR - RESPONSIVE SCROLL INDICATOR */}
                <motion.div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 transform sm:bottom-6 lg:bottom-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8, ease: 'easeOut' }}
                >
                    <div className="flex h-8 w-5 justify-center rounded-full border-2 border-white/60 sm:h-10 sm:w-6">
                        <div className="mt-1 h-2 w-1 animate-bounce rounded-full bg-white sm:mt-2 sm:h-3"></div>
                    </div>
                </motion.div>
            </section>

            {/* Statistics Section - Mobile Optimized */}
            <section className="bg-gray-50 py-8 sm:py-12">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-6 text-center sm:mb-8"
                    >
                        <h2 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl md:text-3xl">
                            {t('pages.news.stats.title_line1')} <span className="text-amber-500">{t('pages.news.stats.title_line2')}</span>
                        </h2>
                        <p className="mx-auto max-w-2xl px-4 text-sm text-gray-600 sm:text-base">{t('pages.news.stats.description')}</p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="rounded-lg bg-white p-4 text-center shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
                        >
                            <div className="mb-2 text-2xl font-bold text-amber-500 sm:mb-3 sm:text-3xl">
                                <CounterAnimation end={totalArticles} delay={200} />
                            </div>
                            <h3 className="mb-1 text-sm font-semibold text-gray-900 sm:mb-2 sm:text-base">
                                {t('pages.news.stats.total_articles.label')}
                            </h3>
                            <p className="text-xs text-gray-600 sm:text-sm">{t('pages.news.stats.total_articles.description')}</p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="rounded-lg bg-white p-4 text-center shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
                        >
                            <div className="mb-2 text-2xl font-bold text-amber-500 sm:mb-3 sm:text-3xl">
                                <CounterAnimation end={totalCategories} delay={400} />
                            </div>
                            <h3 className="mb-1 text-sm font-semibold text-gray-900 sm:mb-2 sm:text-base">
                                {t('pages.news.stats.categories.label')}
                            </h3>
                            <p className="text-xs text-gray-600 sm:text-sm">{t('pages.news.stats.categories.description')}</p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="rounded-lg bg-white p-4 text-center shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
                        >
                            <div className="mb-2 text-2xl font-bold text-amber-500 sm:mb-3 sm:text-3xl">
                                <CounterAnimation end={totalMonths} delay={600} />
                            </div>
                            <h3 className="mb-1 text-sm font-semibold text-gray-900 sm:mb-2 sm:text-base">Active Months</h3>
                            <p className="text-xs text-gray-600 sm:text-sm">Months with active news coverage</p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="rounded-lg bg-white p-4 text-center shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
                        >
                            <div className="mb-2 text-2xl font-bold text-amber-500 sm:mb-3 sm:text-3xl">
                                <CounterAnimation end={2025} delay={800} />
                            </div>
                            <h3 className="mb-1 text-sm font-semibold text-gray-900 sm:mb-2 sm:text-base">Current Year</h3>
                            <p className="text-xs text-gray-600 sm:text-sm">2025 news and announcements</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Highlight News Section - Mobile Optimized */}
            <section className="bg-gradient-to-br from-slate-50 via-white to-amber-50/30 py-8 sm:py-12 lg:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Premium Header - Mobile Optimized */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 text-center sm:mb-12"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-block"
                        >
                            <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
                                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                                    {t('pages.news.highlights.title').split(' ')[0]}
                                </span>
                                <span className="text-slate-900"> {t('pages.news.highlights.title').split(' ')[1]}</span>
                            </h2>
                            <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 sm:w-20"></div>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mx-auto mt-3 max-w-2xl px-4 text-sm leading-relaxed font-medium text-slate-600 sm:mt-4 sm:text-base lg:text-lg"
                        >
                            {t('pages.news.highlights.subtitle')}
                        </motion.p>
                    </motion.div>

                    {/* Centered Single Card Layout - Mobile Optimized */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl">
                            {/* Featured Story - Mobile Optimized */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.4, ease: 'easeOut' },
                                }}
                                className="group"
                            >
                                <div className="relative h-[500px] overflow-hidden rounded-xl border border-amber-200/40 bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/25 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-amber-300/60 hover:shadow-2xl sm:h-[550px] sm:rounded-2xl lg:h-[600px]">
                                    {/* Top Accent Bar */}
                                    <div className="absolute top-0 left-0 h-2 w-full rounded-t-3xl bg-gradient-to-r from-amber-500 to-yellow-500" />

                                    {/* Background Image with Enhanced Overlay */}
                                    <div className="absolute inset-0 opacity-5 transition-opacity duration-500 group-hover:opacity-10">
                                        <img src="/sept3.webp" alt="Kristalin Ekalestari Group Acquisition" className="h-full w-full object-cover" />
                                    </div>

                                    {/* Enhanced Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-100/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    {/* Premium Decorative Elements */}
                                    <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-3xl bg-gradient-to-bl from-amber-100/25 to-transparent" />
                                    <div className="absolute bottom-0 left-0 h-20 w-20 rounded-tr-3xl bg-gradient-to-tr from-yellow-100/25 to-transparent" />
                                    <div className="absolute top-16 right-12 h-12 w-12 rounded-full bg-gradient-to-r from-amber-200/20 to-yellow-200/20" />

                                    {/* Floating accent indicators */}
                                    <motion.div
                                        className="absolute top-6 left-6 h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.7, 1, 0.7],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                    <motion.div
                                        className="absolute right-6 bottom-6 h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500"
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: 0.5,
                                        }}
                                    />

                                    <div className="relative flex h-full flex-col justify-between p-6 pt-8 sm:p-8 sm:pt-10">
                                        <div>
                                            {/* Enhanced Premium Badge */}
                                            <motion.div className="mb-4 sm:mb-5" whileHover={{ scale: 1.05, y: -2 }} transition={{ duration: 0.3 }}>
                                                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-4 py-2 text-sm font-bold text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-base">
                                                    <motion.span
                                                        className="mr-2 text-base sm:mr-2.5 sm:text-lg"
                                                        animate={{
                                                            scale: [1, 1.2, 1],
                                                            rotate: [0, 10, -10, 0],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: 'easeInOut',
                                                        }}
                                                    >
                                                        ⭐
                                                    </motion.span>
                                                    {getTranslatedArticle('sept-3')?.full_content?.badge || 'STRATEGIC ACQUISITION'}
                                                </span>
                                            </motion.div>

                                            {/* Enhanced Premium Title */}
                                            <motion.h3
                                                className="mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-xl leading-tight font-bold text-transparent transition-all duration-400 group-hover:from-amber-800 group-hover:to-orange-700 sm:mb-4 sm:text-2xl lg:text-3xl"
                                                whileHover={{ x: 4, scale: 1.02 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {getTranslatedArticle('sept-3')?.title ||
                                                    'Kristalin Ekalestari Group Mengakuisisi 51% Saham PT Torindo Jaya Persada untuk Ekspansi Industri Alat Berat'}
                                            </motion.h3>

                                            {/* Enhanced Premium Description */}
                                            <motion.p
                                                className="mb-4 text-base leading-relaxed text-gray-600 transition-colors duration-400 group-hover:text-gray-700 sm:mb-5 sm:text-lg"
                                                whileHover={{ x: 4 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {getTranslatedArticle('sept-3')?.excerpt ||
                                                    'Konsolidasi strategis mayoritas 51% saham PT Torindo Jaya Persada melalui PT Armada Bumi Investama, memperkuat ekosistem bisnis alat berat pertambangan emas di kawasan Indonesia Timur dengan teknologi China modern dan jaringan distribusi terintegrasi.'}
                                            </motion.p>
                                        </div>

                                        <div className="space-y-3 sm:space-y-4">
                                            {/* Meta - Mobile Optimized */}
                                            <motion.div
                                                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
                                                whileHover={{ x: 4 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-5 w-5 text-amber-500 sm:h-6 sm:w-6" />
                                                    <span className="text-sm font-semibold text-gray-600 sm:text-base">3 September 2025</span>
                                                </div>
                                                <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-100 px-3 py-1.5 text-sm font-bold text-amber-800 sm:px-4 sm:py-2">
                                                    Strategic Acquisition
                                                </span>
                                            </motion.div>

                                            {/* Enhanced Premium CTA */}
                                            <Link href="/news/sept-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.05, y: -3 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="group/btn inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-6 py-3 text-base font-bold text-white shadow-xl ring-1 ring-white/20 backdrop-blur-sm transition-all duration-300 hover:from-amber-600 hover:to-yellow-600 hover:shadow-2xl sm:px-8 sm:py-4 sm:text-lg"
                                                >
                                                    {t('pages.news.list.read_full_article')}
                                                    <motion.span
                                                        className="text-lg transition-transform duration-300 group-hover/btn:translate-x-1 sm:text-xl"
                                                        whileHover={{ x: 2 }}
                                                    >
                                                        →
                                                    </motion.span>
                                                </motion.button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* News Archive Section - Mobile Optimized */}
            <section id="news-archive" className="scroll-mt-20 bg-white py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Clean News Archive Header - Mobile Optimized */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 text-center sm:mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-block"
                        >
                            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:mb-6 sm:text-4xl md:text-5xl">
                                {t('pages.news.archive.title')}
                            </h2>
                            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 sm:w-24"></div>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mx-auto mt-4 max-w-2xl px-4 text-base leading-relaxed font-medium text-slate-600 sm:mt-6 sm:text-lg"
                        >
                            {t('pages.news.archive.description')}
                        </motion.p>
                    </motion.div>

                    {/* Modern Timeline Container - Optimized and Proportional */}
                    <div className="relative mx-auto max-w-5xl">
                        {/* Elegant Timeline Line - Proportional */}
                        <div className="absolute top-0 bottom-0 left-6 w-0.5 rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-transparent shadow-lg sm:left-12 sm:w-1"></div>

                        {/* Timeline Content - Optimized and Proportional */}
                        <motion.div
                            className="space-y-6 sm:space-y-8 lg:space-y-12"
                            key={selectedCategory} // This will trigger re-render when category changes
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            {filteredNewsData.map((monthData, monthIndex) => {
                                const totalNews = monthData.categories.reduce((total, category) => total + category.newsItems.length, 0);
                                const totalCategories = monthData.categories.length;

                                return (
                                    <motion.div
                                        key={monthData.monthId}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: monthIndex * 0.15 }}
                                        className="relative"
                                    >
                                        {/* Optimized Timeline Marker */}
                                        <div className="absolute top-6 left-0 z-20 sm:top-8">
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                whileInView={{ scale: 1, rotate: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: monthIndex * 0.1 + 0.3 }}
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                className="group cursor-pointer"
                                            >
                                                <div className="relative">
                                                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 shadow-lg ring-2 ring-white ring-offset-2 ring-offset-slate-50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-amber-200 sm:h-8 sm:w-8 sm:ring-4 sm:ring-offset-4"></div>
                                                    <motion.div
                                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                                                        animate={{
                                                            scale: [1, 1.2, 1],
                                                            opacity: [0.3, 0, 0.3],
                                                        }}
                                                        transition={{
                                                            duration: 2.5,
                                                            repeat: Infinity,
                                                            ease: 'easeInOut',
                                                        }}
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Optimized Month Section */}
                                        <div className="ml-16 sm:ml-24">
                                            {/* Proportional Month Header */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                                className="mb-4 sm:mb-6"
                                            >
                                                <div className="rounded-xl border border-slate-200/50 bg-white/90 p-3 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-4">
                                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                                                {getTranslatedMonth(monthData.monthId, t)}
                                                            </h3>
                                                            <p className="text-sm font-medium text-slate-600 sm:text-base">
                                                                {totalNews} {t('pages.news.archive.articles_count')} {totalCategories}{' '}
                                                                {t('pages.news.archive.categories_count')}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 sm:gap-3">
                                                            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm sm:px-4 sm:py-2 sm:text-sm">
                                                                {totalNews} {t('pages.news.stats.total_articles.label')}
                                                            </span>
                                                            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md sm:px-4 sm:py-2 sm:text-sm">
                                                                {t('pages.news.archive.active_status')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Modern News Categories Grid - Mobile Optimized with Better Spacing */}
                                            <div
                                                className={`grid gap-4 sm:gap-6 ${
                                                    monthData.categories.length === 1 ? 'mx-auto max-w-3xl grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
                                                }`}
                                            >
                                                {monthData.categories.map((category, categoryIndex) => {
                                                    const isExpanded = expandedCategories.has(category.id);

                                                    return (
                                                        <motion.div
                                                            key={category.id}
                                                            id={category.id}
                                                            initial={{ opacity: 0, y: 30 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{
                                                                duration: 0.6,
                                                                delay: 0.6 + categoryIndex * 0.1,
                                                            }}
                                                            className="group scroll-mt-20"
                                                        >
                                                            {/* Enhanced News Category Card with Better Spacing */}
                                                            <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white/90 shadow-lg ring-1 ring-gray-200/30 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/10">
                                                                {/* Enhanced Category Header with Improved Spacing */}
                                                                <button
                                                                    onClick={() => toggleCategory(category.id)}
                                                                    className="w-full px-4 py-4 text-left transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:outline-none focus:ring-inset sm:px-5 sm:py-5"
                                                                >
                                                                    <div className="flex items-start gap-3 sm:gap-4">
                                                                        {/* Enhanced Badge with Better Proportions */}
                                                                        <div className="flex-shrink-0">
                                                                            <div className="relative">
                                                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 shadow-md ring-1 ring-amber-100/50 sm:h-12 sm:w-12">
                                                                                    <span className="text-sm font-bold text-white sm:text-base">
                                                                                        {category.newsItems.length}
                                                                                    </span>
                                                                                </div>
                                                                                <motion.div
                                                                                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500"
                                                                                    animate={{
                                                                                        scale: [1, 1.1, 1],
                                                                                        opacity: [0.3, 0, 0.3],
                                                                                    }}
                                                                                    transition={{
                                                                                        duration: 2.5,
                                                                                        repeat: Infinity,
                                                                                        ease: 'easeInOut',
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        {/* Enhanced Content with Better Spacing */}
                                                                        <div className="min-w-0 flex-1">
                                                                            <h4 className="mb-2 text-base leading-tight font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-700 sm:text-lg">
                                                                                {getTranslatedCategoryTitle(category.id, t)}
                                                                            </h4>
                                                                            <p className="mb-3 text-sm leading-relaxed font-medium text-gray-600 sm:text-base">
                                                                                {category.newsItems.length}{' '}
                                                                                {t('news_archive.ui_elements.articles_available')}
                                                                            </p>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 px-3 py-1 text-xs font-semibold text-amber-700 shadow-sm ring-1 ring-amber-200/50 sm:text-sm">
                                                                                    <div className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                                                                                    {category.newsItems.length}{' '}
                                                                                    {t('news_archive.ui_elements.articles')}
                                                                                </span>
                                                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm sm:text-sm">
                                                                                    <div className="mr-1.5 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                                                                                    {t('news_archive.ui_elements.category')}
                                                                                </span>
                                                                            </div>
                                                                        </div>

                                                                        {/* Enhanced Expand Button with Better Size */}
                                                                        <motion.div
                                                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                                                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                                                                            className="ml-2 flex-shrink-0 rounded-xl bg-gray-100 p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-100 group-hover:shadow-lg sm:p-3"
                                                                        >
                                                                            <ChevronDown className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-amber-600" />
                                                                        </motion.div>
                                                                    </div>
                                                                </button>

                                                                {/* Enhanced Expandable News Items with Better Spacing */}
                                                                <motion.div
                                                                    initial={false}
                                                                    animate={{
                                                                        height: isExpanded ? 'auto' : 0,
                                                                        opacity: isExpanded ? 1 : 0,
                                                                    }}
                                                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="border-t border-gray-200/60 bg-gradient-to-br from-gray-50/80 to-amber-50/30 px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-5">
                                                                        <div
                                                                            className={`${
                                                                                category.newsItems.length > 3
                                                                                    ? 'grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2'
                                                                                    : 'space-y-3 sm:space-y-4'
                                                                            }`}
                                                                        >
                                                                            {category.newsItems.map((newsItem, newsIndex) => (
                                                                                <motion.div
                                                                                    key={newsItem.id}
                                                                                    initial={{ opacity: 0, y: 10 }}
                                                                                    animate={{
                                                                                        opacity: isExpanded ? 1 : 0,
                                                                                        y: isExpanded ? 0 : 10,
                                                                                    }}
                                                                                    transition={{
                                                                                        duration: 0.3,
                                                                                        delay: isExpanded ? newsIndex * 0.08 : 0,
                                                                                    }}
                                                                                    className="group/item block w-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md hover:shadow-amber-500/10 sm:p-4"
                                                                                >
                                                                                    <Link
                                                                                        href={`/news/${newsItem.id}`}
                                                                                        className="block w-full text-left"
                                                                                    >
                                                                                        {/* Clean Card Layout with Optimized Spacing */}
                                                                                        <div className="flex h-full flex-col space-y-3">
                                                                                            {/* Top Section - Date and Status */}
                                                                                            <div className="flex items-center justify-between">
                                                                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                                                                    <Calendar className="h-4 w-4 text-amber-500" />
                                                                                                    <span className="font-medium">
                                                                                                        {newsItem.date}
                                                                                                    </span>
                                                                                                </div>
                                                                                                {newsItem.fullContent && (
                                                                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                                                                                                        <div className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                                                                                        {t('news_archive.ui_elements.complete')}
                                                                                                    </span>
                                                                                                )}
                                                                                            </div>

                                                                                            {/* Main Content */}
                                                                                            <div className="flex flex-1 flex-col">
                                                                                                {/* Title - Proportional */}
                                                                                                <h5 className="mb-2 text-base leading-tight font-bold text-gray-900 transition-colors duration-300 group-hover/item:text-amber-700 sm:text-lg">
                                                                                                    {getTranslatedArticleTitle(newsItem.id, t) ||
                                                                                                        newsItem.title}
                                                                                                </h5>

                                                                                                {/* Excerpt */}
                                                                                                <p className="mb-3 flex-1 text-sm leading-relaxed text-gray-600">
                                                                                                    {getTranslatedArticleExcerpt(newsItem.id, t) ||
                                                                                                        newsItem.excerpt}
                                                                                                </p>

                                                                                                {/* Bottom Section - Read More */}
                                                                                                <div className="mt-auto flex items-center justify-between">
                                                                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                                                                        <svg
                                                                                                            className="h-3 w-3"
                                                                                                            fill="none"
                                                                                                            viewBox="0 0 24 24"
                                                                                                            stroke="currentColor"
                                                                                                        >
                                                                                                            <path
                                                                                                                strokeLinecap="round"
                                                                                                                strokeLinejoin="round"
                                                                                                                strokeWidth={2}
                                                                                                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                                                                                            />
                                                                                                        </svg>
                                                                                                        <span>
                                                                                                            {t('news_archive.ui_elements.read_more')}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 transition-all duration-300 group-hover/item:scale-110 group-hover/item:bg-amber-200">
                                                                                                        <svg
                                                                                                            className="h-4 w-4 text-amber-600 transition-all duration-300 group-hover/item:translate-x-0.5"
                                                                                                            fill="none"
                                                                                                            viewBox="0 0 24 24"
                                                                                                            stroke="currentColor"
                                                                                                        >
                                                                                                            <path
                                                                                                                strokeLinecap="round"
                                                                                                                strokeLinejoin="round"
                                                                                                                strokeWidth={2}
                                                                                                                d="M9 5l7 7-7 7"
                                                                                                            />
                                                                                                        </svg>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Link>
                                                                                </motion.div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default KristalinNewsPage;
