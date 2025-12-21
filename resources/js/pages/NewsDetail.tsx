import { Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink, Home, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';

// Import news data from the main news page
import { NewsCategory, newsData, NewsItem } from './news';

interface NewsDetailProps {
    id: string;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ id }) => {
    const { t, locale } = useTranslation();
    const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
    const [category, setCategory] = useState<NewsCategory | null>(null);
    const [loading, setLoading] = useState(true);

    // Helper function to get translated content for specific articles
    const getTranslatedContent = (articleId: string) => {
        switch (articleId) {
            case 'mar-1':
                return {
                    title: t('news_detail.yustinus_monei_fisherman.title'),
                    excerpt: t('news_detail.yustinus_monei_fisherman.excerpt'),
                    categoryTitle: t('news_detail.yustinus_monei_fisherman.category_title'),
                    author: t('news_detail.yustinus_monei_fisherman.author'),
                    source: t('news_detail.yustinus_monei_fisherman.source'),
                    date: t('news_detail.yustinus_monei_fisherman.date'),
                    content: getYustinusMoneiTranslatedContent(),
                };
            case 'mar-2':
                return {
                    title: t('news_detail.mar2_fisherman_house.title'),
                    excerpt: t('news_detail.mar2_fisherman_house.excerpt'),
                    categoryTitle: t('news_detail.mar2_fisherman_house.category_title'),
                    author: t('news_detail.mar2_fisherman_house.author'),
                    source: t('news_detail.mar2_fisherman_house.source'),
                    date: t('news_detail.mar2_fisherman_house.date'),
                    content: getMar2TranslatedContent(),
                };
            case 'mar-3':
                return {
                    title: t('news_detail.mar3_fisherman_happiness.title'),
                    excerpt: t('news_detail.mar3_fisherman_happiness.excerpt'),
                    categoryTitle: t('news_detail.mar3_fisherman_happiness.category_title'),
                    author: t('news_detail.mar3_fisherman_happiness.author'),
                    source: t('news_detail.mar3_fisherman_happiness.source'),
                    date: t('news_detail.mar3_fisherman_happiness.date'),
                    content: getMar3TranslatedContent(),
                };
            case 'mar-4':
                return {
                    title: t('news_detail.mar4_fisherman_care.title'),
                    excerpt: t('news_detail.mar4_fisherman_care.excerpt'),
                    categoryTitle: t('news_detail.mar4_fisherman_care.category_title'),
                    author: t('news_detail.mar4_fisherman_care.author'),
                    source: t('news_detail.mar4_fisherman_care.source'),
                    date: t('news_detail.mar4_fisherman_care.date'),
                    content: getMar4TranslatedContent(),
                };
            case 'mar-5':
                return {
                    title: t('news_detail.mar5_fisherman_touching_moment.title'),
                    excerpt: t('news_detail.mar5_fisherman_touching_moment.excerpt'),
                    categoryTitle: t('news_detail.mar5_fisherman_touching_moment.category_title'),
                    author: t('news_detail.mar5_fisherman_touching_moment.author'),
                    source: t('news_detail.mar5_fisherman_touching_moment.source'),
                    date: t('news_detail.mar5_fisherman_touching_moment.date'),
                    content: getMar5TranslatedContent(),
                };
            case 'mar-6':
                return {
                    title: t('news_detail.mar6_fisherman_final_home.title'),
                    excerpt: t('news_detail.mar6_fisherman_final_home.excerpt'),
                    categoryTitle: t('news_detail.mar6_fisherman_final_home.category_title'),
                    author: t('news_detail.mar6_fisherman_final_home.author'),
                    source: t('news_detail.mar6_fisherman_final_home.source'),
                    date: t('news_detail.mar6_fisherman_final_home.date'),
                    content: getMar6TranslatedContent(),
                };
            case 'jun-1':
                return {
                    title: t('news_detail.jun1_education_funding.title'),
                    excerpt: t('news_detail.jun1_education_funding.excerpt'),
                    categoryTitle: t('news_detail.jun1_education_funding.category_title'),
                    author: t('news_detail.jun1_education_funding.author'),
                    source: t('news_detail.jun1_education_funding.source'),
                    date: t('news_detail.jun1_education_funding.date'),
                    content: getJun1TranslatedContent(),
                };
            case 'jun-2':
                return {
                    title: t('news_detail.jun2_csr_education_funding.title'),
                    excerpt: t('news_detail.jun2_csr_education_funding.excerpt'),
                    categoryTitle: t('news_detail.jun2_csr_education_funding.category_title'),
                    author: t('news_detail.jun2_csr_education_funding.author'),
                    source: t('news_detail.jun2_csr_education_funding.source'),
                    date: t('news_detail.jun2_csr_education_funding.date'),
                    content: getJun2TranslatedContent(),
                };
            case 'jun-3':
                return {
                    title: t('news_detail.jun3_house_handover.title'),
                    excerpt: t('news_detail.jun3_house_handover.excerpt'),
                    categoryTitle: t('news_detail.jun3_house_handover.category_title'),
                    author: t('news_detail.jun3_house_handover.author'),
                    source: t('news_detail.jun3_house_handover.source'),
                    date: t('news_detail.jun3_house_handover.date'),
                    content: getJun3TranslatedContent(),
                };
            case 'jun-4':
                return {
                    title: t('news_detail.jun4_commitment_real_benefits.title'),
                    excerpt: t('news_detail.jun4_commitment_real_benefits.excerpt'),
                    categoryTitle: t('news_detail.jun4_commitment_real_benefits.category_title'),
                    author: t('news_detail.jun4_commitment_real_benefits.author'),
                    source: t('news_detail.jun4_commitment_real_benefits.source'),
                    date: t('news_detail.jun4_commitment_real_benefits.date'),
                    content: getJun4TranslatedContent(),
                };
            case 'jul-1':
                return {
                    title: t('news_detail.jul1_sembako_distribution.title'),
                    excerpt: t('news_detail.jul1_sembako_distribution.excerpt'),
                    categoryTitle: t('news_detail.jul1_sembako_distribution.category_title'),
                    author: t('news_detail.jul1_sembako_distribution.author'),
                    source: t('news_detail.jul1_sembako_distribution.source'),
                    date: t('news_detail.jul1_sembako_distribution.date'),
                    content: getJul1TranslatedContent(),
                };
            case 'jul-2':
                return {
                    title: t('news_detail.jul2_company_contribution.title'),
                    excerpt: t('news_detail.jul2_company_contribution.excerpt'),
                    categoryTitle: t('news_detail.jul2_company_contribution.category_title'),
                    author: t('news_detail.jul2_company_contribution.author'),
                    source: t('news_detail.jul2_company_contribution.source'),
                    date: t('news_detail.jul2_company_contribution.date'),
                    content: getJul2TranslatedContent(),
                };
            case 'jul-4':
                return {
                    title: t('news_detail.jul4_land_rights_assistance.title'),
                    excerpt: t('news_detail.jul4_land_rights_assistance.excerpt'),
                    categoryTitle: t('news_detail.jul4_land_rights_assistance.category_title'),
                    author: t('news_detail.jul4_land_rights_assistance.author'),
                    source: t('news_detail.jul4_land_rights_assistance.source'),
                    date: t('news_detail.jul4_land_rights_assistance.date'),
                    content: getJul4TranslatedContent(),
                };
            case 'aug-1':
                return {
                    title: t('news_detail.aug1_independence_day_gift.title'),
                    excerpt: t('news_detail.aug1_independence_day_gift.excerpt'),
                    categoryTitle: t('news_detail.aug1_independence_day_gift.category_title'),
                    author: t('news_detail.aug1_independence_day_gift.author'),
                    source: t('news_detail.aug1_independence_day_gift.source'),
                    date: t('news_detail.aug1_independence_day_gift.date'),
                    content: getAug1TranslatedContent(),
                };
            case 'aug-2':
                return {
                    title: t('news_detail.aug2_historic_moment_house.title'),
                    excerpt: t('news_detail.aug2_historic_moment_house.excerpt'),
                    categoryTitle: t('news_detail.aug2_historic_moment_house.category_title'),
                    author: t('news_detail.aug2_historic_moment_house.author'),
                    source: t('news_detail.aug2_historic_moment_house.source'),
                    date: t('news_detail.aug2_historic_moment_house.date'),
                    content: getAug2TranslatedContent(),
                };
            case 'aug-4':
                return {
                    title: t('news_detail.aug4_sharing_happiness_sembako.title'),
                    excerpt: t('news_detail.aug4_sharing_happiness_sembako.excerpt'),
                    categoryTitle: t('news_detail.aug4_sharing_happiness_sembako.category_title'),
                    author: t('news_detail.aug4_sharing_happiness_sembako.author'),
                    source: t('news_detail.aug4_sharing_happiness_sembako.source'),
                    date: t('news_detail.aug4_sharing_happiness_sembako.date'),
                    content: getAug4TranslatedContent(),
                };
            case 'aug-5':
                return {
                    title: t('news_detail.aug5_consistent_sembako_distribution.title'),
                    excerpt: t('news_detail.aug5_consistent_sembako_distribution.excerpt'),
                    categoryTitle: t('news_detail.aug5_consistent_sembako_distribution.category_title'),
                    author: t('news_detail.aug5_consistent_sembako_distribution.author'),
                    source: t('news_detail.aug5_consistent_sembako_distribution.source'),
                    date: t('news_detail.aug5_consistent_sembako_distribution.date'),
                    content: getAug5TranslatedContent(),
                };
            case 'aug-6':
                return {
                    title: t('news_detail.aug6_sustainable_commitment_sembako.title'),
                    excerpt: t('news_detail.aug6_sustainable_commitment_sembako.excerpt'),
                    categoryTitle: t('news_detail.aug6_sustainable_commitment_sembako.category_title'),
                    author: t('news_detail.aug6_sustainable_commitment_sembako.author'),
                    source: t('news_detail.aug6_sustainable_commitment_sembako.source'),
                    date: t('news_detail.aug6_sustainable_commitment_sembako.date'),
                    content: getAug6TranslatedContent(),
                };
            case 'aug-7':
                return {
                    title: t('news_detail.aug7_real_concern_elderly_worship_priority.title'),
                    excerpt: t('news_detail.aug7_real_concern_elderly_worship_priority.excerpt'),
                    categoryTitle: t('news_detail.aug7_real_concern_elderly_worship_priority.category_title'),
                    author: t('news_detail.aug7_real_concern_elderly_worship_priority.author'),
                    source: t('news_detail.aug7_real_concern_elderly_worship_priority.source'),
                    date: t('news_detail.aug7_real_concern_elderly_worship_priority.date'),
                    content: getAug7TranslatedContent(),
                };
            case 'sept-1':
                return {
                    title: t('news_detail.sept1_torindo_acquisition_heavy_equipment.title'),
                    excerpt: t('news_detail.sept1_torindo_acquisition_heavy_equipment.excerpt'),
                    categoryTitle: t('news_detail.sept1_torindo_acquisition_heavy_equipment.category_title'),
                    author: t('news_detail.sept1_torindo_acquisition_heavy_equipment.author'),
                    source: t('news_detail.sept1_torindo_acquisition_heavy_equipment.source'),
                    date: t('news_detail.sept1_torindo_acquisition_heavy_equipment.date'),
                    content: getSept1TranslatedContent(),
                };
            case 'aug-3':
                return {
                    title: t('news_detail.aug3_independence_day_traditional_games.title'),
                    excerpt: t('news_detail.aug3_independence_day_traditional_games.excerpt'),
                    categoryTitle: t('news_detail.aug3_independence_day_traditional_games.category_title'),
                    author: t('news_detail.aug3_independence_day_traditional_games.author'),
                    source: t('news_detail.aug3_independence_day_traditional_games.source'),
                    date: t('news_detail.aug3_independence_day_traditional_games.date'),
                    content: getAug3TranslatedContent(),
                };
            case 'aug-8':
                return {
                    title: t('news_detail.aug8_sustainable_solidarity_elderly_widows.title'),
                    excerpt: t('news_detail.aug8_sustainable_solidarity_elderly_widows.excerpt'),
                    categoryTitle: t('news_detail.aug8_sustainable_solidarity_elderly_widows.category_title'),
                    author: t('news_detail.aug8_sustainable_solidarity_elderly_widows.author'),
                    source: t('news_detail.aug8_sustainable_solidarity_elderly_widows.source'),
                    date: t('news_detail.aug8_sustainable_solidarity_elderly_widows.date'),
                    content: getAug8TranslatedContent(),
                };
            case 'jul-3':
                return {
                    title: t('news_detail.jul3_sembako_elderly_priority.title'),
                    excerpt: t('news_detail.jul3_sembako_elderly_priority.excerpt'),
                    categoryTitle: t('news_detail.jul3_sembako_elderly_priority.category_title'),
                    author: t('news_detail.jul3_sembako_elderly_priority.author'),
                    source: t('news_detail.jul3_sembako_elderly_priority.source'),
                    date: t('news_detail.jul3_sembako_elderly_priority.date'),
                    content: getJul3TranslatedContent(),
                };
            case 'sept-3':
                return {
                    title: t('news_detail.torindo_acquisition_sept3.title'),
                    excerpt: t('news_detail.torindo_acquisition_sept3.excerpt'),
                    categoryTitle: t('news_detail.torindo_acquisition_sept3.category_title'),
                    author: t('news_detail.torindo_acquisition_sept3.author'),
                    source: t('news_detail.torindo_acquisition_sept3.source'),
                    date: t('news_detail.torindo_acquisition_sept3.date'),
                    content: getTorindoSept3TranslatedContent(),
                };
            case 'feb-7':
                return {
                    title: t('news_detail.feb_sembako_distribution.title'),
                    excerpt: t('news_detail.feb_sembako_distribution.excerpt'),
                    categoryTitle: t('news_detail.feb_sembako_distribution.category_title'),
                    author: t('news_detail.feb_sembako_distribution.author'),
                    source: t('news_detail.feb_sembako_distribution.source'),
                    date: t('news_detail.feb_sembako_distribution.date'),
                    content: getFebSembakoDistributionTranslatedContent(),
                };
            case 'feb-8':
                return {
                    title: t('news_detail.feb_sembako_distribution_2.title'),
                    excerpt: t('news_detail.feb_sembako_distribution_2.excerpt'),
                    categoryTitle: t('news_detail.feb_sembako_distribution_2.category_title'),
                    author: t('news_detail.feb_sembako_distribution_2.author'),
                    source: t('news_detail.feb_sembako_distribution_2.source'),
                    date: t('news_detail.feb_sembako_distribution_2.date'),
                    content: getFebSembakoDistribution2TranslatedContent(),
                };
            case 'feb-9':
                return {
                    title: t('news_detail.feb_sembako_distribution_3.title'),
                    excerpt: t('news_detail.feb_sembako_distribution_3.excerpt'),
                    categoryTitle: t('news_detail.feb_sembako_distribution_3.category_title'),
                    author: t('news_detail.feb_sembako_distribution_3.author'),
                    source: t('news_detail.feb_sembako_distribution_3.source'),
                    date: t('news_detail.feb_sembako_distribution_3.date'),
                    content: getFebSembakoDistribution3TranslatedContent(),
                };
            case 'feb-4':
                return {
                    title: t('news_detail.feb_house_construction_1.title'),
                    excerpt: t('news_detail.feb_house_construction_1.excerpt'),
                    categoryTitle: t('news_detail.feb_house_construction_1.category_title'),
                    author: t('news_detail.feb_house_construction_1.author'),
                    source: t('news_detail.feb_house_construction_1.source'),
                    date: t('news_detail.feb_house_construction_1.date'),
                    content: getFebHouseConstruction1TranslatedContent(),
                };
            case 'oct-1':
                return {
                    title: t('news_detail.oct1_dubai_investment_blockchain.title'),
                    excerpt: t('news_detail.oct1_dubai_investment_blockchain.excerpt'),
                    categoryTitle: t('news_detail.oct1_dubai_investment_blockchain.category_title'),
                    author: t('news_detail.oct1_dubai_investment_blockchain.author'),
                    source: t('news_detail.oct1_dubai_investment_blockchain.source'),
                    date: t('news_detail.oct1_dubai_investment_blockchain.date'),
                    content: getOct1DubaiInvestmentTranslatedContent(),
                };
            case 'dec-1':
                return {
                    title: t('news_detail.dec_abs_rice_mill_1.title'),
                    excerpt: t('news_detail.dec_abs_rice_mill_1.excerpt'),
                    categoryTitle: t('news_archive.categories.food_security'),
                    author: t('news_detail.dec_abs_rice_mill_1.author'),
                    source: t('news_detail.dec_abs_rice_mill_1.source'),
                    date: t('news_detail.dec_abs_rice_mill_1.date'),
                    content: getDecRiceMill1TranslatedContent(),
                };
            case 'dec-2':
                return {
                    title: t('news_detail.dec_abs_rice_mill_2.title'),
                    excerpt: t('news_detail.dec_abs_rice_mill_2.excerpt'),
                    categoryTitle: t('news_archive.categories.food_security'),
                    author: t('news_detail.dec_abs_rice_mill_2.author'),
                    source: t('news_detail.dec_abs_rice_mill_2.source'),
                    date: t('news_detail.dec_abs_rice_mill_2.date'),
                    content: getDecRiceMill2TranslatedContent(),
                };
            case 'dec-3':
                return {
                    title: t('news_detail.dec_abs_rice_mill_3.title'),
                    excerpt: t('news_detail.dec_abs_rice_mill_3.excerpt'),
                    categoryTitle: t('news_archive.categories.food_security'),
                    author: t('news_detail.dec_abs_rice_mill_3.author'),
                    source: t('news_detail.dec_abs_rice_mill_3.source'),
                    date: t('news_detail.dec_abs_rice_mill_3.date'),
                    content: getDecRiceMill3TranslatedContent(),
                };
            default:
                return null;
        }
    };

    // Function to get translated HTML content for Torindo article
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getTorindoTranslatedContent = () => {
        return `
            <div class="space-y-8">
                <!-- Strategic Acquisition Announcement -->
                <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 class="mb-3 text-lg font-bold text-blue-900 flex items-center gap-2">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        ${t('news_detail.torindo_acquisition.strategic_expansion')}
                    </h3>
                    <p class="text-blue-800 leading-relaxed text-base">
                        ${t('news_detail.torindo_acquisition.strategic_expansion_content')}
                    </p>
                </div>

                <!-- Company Profile & Specialization -->
                <div class="space-y-6">
                    <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">${t('news_detail.torindo_acquisition.company_profile')}</h3>
                    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                        <p class="text-gray-800 leading-relaxed text-base mb-6">
                            ${t('news_detail.torindo_acquisition.company_profile_content')}
                        </p>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg class="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                    </svg>
                                    ${t('news_detail.torindo_acquisition.global_partnerships')}
                                </h4>
                                <ul class="space-y-3 text-gray-700">
                                    <li class="flex items-center gap-3">
                                        <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                        <span class="text-base">${t('news_detail.torindo_acquisition.tata_motors')}</span>
                                    </li>
                                    <li class="flex items-center gap-3">
                                        <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                        <span class="text-base">${t('news_detail.torindo_acquisition.fassi_cranes')}</span>
                                    </li>
                                    <li class="flex items-center gap-3">
                                        <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                        <span class="text-base">${t('news_detail.torindo_acquisition.marrel_hooklift')}</span>
                                    </li>
                                    <li class="flex items-center gap-3">
                                        <div class="h-2 w-2 bg-amber-500 rounded-full"></div>
                                        <span class="text-base">${t('news_detail.torindo_acquisition.sdlg_machinery')}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                    ${t('news_detail.torindo_acquisition.integrated_services')}
                                </h4>
                                <ul class="space-y-3 text-gray-700">
                                    <li class="flex items-center gap-3">
                                        <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                        <span class="text-base">${t('news_detail.torindo_acquisition.heavy_equipment_sales')}</span>
                                    </li>
                                    <li class="flex items-center gap-3">
                                        <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                        <span class="text-base">${t('news_detail.torindo_acquisition.after_sales_service')}</span>
                                    </li>
                                    <li class="flex items-center gap-3">
                                        <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                        <span class="text-base">${t('news_detail.torindo_acquisition.logistics_distribution')}</span>
                                    </li>
                                    <li class="flex items-center gap-3">
                                        <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                        <span class="text-base">${t('news_detail.torindo_acquisition.hr_consulting_training')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Strategic Vision Statement -->
                <div class="space-y-6">
                    <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">${t('news_detail.torindo_acquisition.strategic_vision')}</h3>
                    <blockquote class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-6 rounded-r-xl shadow-sm">
                        <p class="text-gray-800 italic text-lg leading-relaxed mb-4">
                            ${t('news_detail.torindo_acquisition.strategic_vision_quote')}
                        </p>
                        <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            ${t('news_detail.torindo_acquisition.strategic_vision_author')}
                        </cite>
                    </blockquote>
                </div>

                <!-- Ownership Structure Details -->
                <div class="space-y-6">
                    <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">${t('news_detail.torindo_acquisition.ownership_structure')}</h3>
                    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                        <p class="text-gray-800 leading-relaxed text-base mb-6">
                            ${t('news_detail.torindo_acquisition.ownership_structure_content')}
                        </p>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                                    <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h4 class="text-2xl font-bold text-blue-600 mb-2">51%</h4>
                                <p class="text-gray-700 font-semibold">${t('news_detail.torindo_acquisition.armada_bumi_investama')}</p>
                                <p class="text-sm text-gray-600">${t('news_detail.torindo_acquisition.kristalin_group')}</p>
                            </div>
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 mx-auto mb-4">
                                    <svg class="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h4 class="text-2xl font-bold text-orange-600 mb-2">49%</h4>
                                <p class="text-gray-700 font-semibold">${t('news_detail.torindo_acquisition.existing_management')}</p>
                                <p class="text-sm text-gray-600">${t('news_detail.torindo_acquisition.existing_ownership')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Market Expansion Strategy -->
                <div class="space-y-6">
                    <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">${t('news_detail.torindo_acquisition.market_expansion')}</h3>
                    <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                        <p class="text-gray-800 leading-relaxed text-base mb-6">
                            ${t('news_detail.torindo_acquisition.market_expansion_content')}
                        </p>
                        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h4 class="text-lg font-bold text-gray-900 mb-4">${t('news_detail.torindo_acquisition.regional_development_focus')}</h4>
                            <div class="space-y-4">
                                <div class="flex items-center gap-3">
                                    <div class="h-3 w-3 bg-orange-500 rounded-full"></div>
                                    <span class="text-gray-700 text-base">${t('news_detail.torindo_acquisition.papua_expansion')}</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="h-3 w-3 bg-red-500 rounded-full"></div>
                                    <span class="text-gray-700 text-base">${t('news_detail.torindo_acquisition.maluku_development')}</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="h-3 w-3 bg-amber-500 rounded-full"></div>
                                    <span class="text-gray-700 text-base">${t('news_detail.torindo_acquisition.sulawesi_partnership')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Market Outlook and Future Prospects -->
                <div class="space-y-6">
                    <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">${t('news_detail.torindo_acquisition.market_outlook')}</h3>
                    <blockquote class="bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-500 p-6 rounded-r-xl shadow-sm">
                        <p class="text-gray-800 italic text-lg leading-relaxed mb-4">
                            ${t('news_detail.torindo_acquisition.market_outlook_quote')}
                        </p>
                        <cite class="text-sm text-gray-600 font-medium flex items-center gap-2">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            ${t('news_detail.torindo_acquisition.market_outlook_author')}
                        </cite>
                    </blockquote>
                </div>

                <!-- Integration Benefits -->
                <div class="space-y-6">
                    <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">${t('news_detail.torindo_acquisition.integration_benefits')}</h3>
                    <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                        <p class="text-gray-800 leading-relaxed text-base mb-6">
                            ${t('news_detail.torindo_acquisition.integration_benefits_content')}
                        </p>
                        <div class="grid md:grid-cols-3 gap-6">
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto mb-4">
                                    <svg class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 class="text-lg font-bold text-gray-900 mb-2">${t('news_detail.torindo_acquisition.synergy_creation')}</h4>
                                <p class="text-sm text-gray-600">${t('news_detail.torindo_acquisition.synergy_creation_desc')}</p>
                            </div>
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                                    <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                    </svg>
                                </div>
                                <h4 class="text-lg font-bold text-gray-900 mb-2">${t('news_detail.torindo_acquisition.market_expansion_benefit')}</h4>
                                <p class="text-sm text-gray-600">${t('news_detail.torindo_acquisition.market_expansion_benefit_desc')}</p>
                            </div>
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                                    <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h4 class="text-lg font-bold text-gray-900 mb-2">${t('news_detail.torindo_acquisition.operational_efficiency')}</h4>
                                <p class="text-sm text-gray-600">${t('news_detail.torindo_acquisition.operational_efficiency_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };
    // Function to get translated content for Jun-3 article
    const getJun3TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Kebahagiaan Keluarga Manuaron di Desa Nifasi */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">{t('news_detail.jun3_house_handover.content.family_happiness_title')}</h3>
                    <p className="text-base leading-relaxed text-blue-800">{t('news_detail.jun3_house_handover.content.family_happiness_content')}</p>
                </div>

                {/* Spesifikasi Rumah yang Diterima */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun3_house_handover.content.house_specifications_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun3_house_handover.content.house_specifications_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jun3_house_handover.content.house_details_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jun3_house_handover.content.house_details_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jun3_house_handover.content.location_recipient_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jun3_house_handover.content.location_recipient_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ucapan Syukur dari Penerima */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun3_house_handover.content.gratitude_expression_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jun3_house_handover.content.yuliana_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">{t('news_detail.jun3_house_handover.content.yuliana_citation')}</cite>
                        </div>
                        <p className="mt-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun3_house_handover.content.gratitude_content')}
                        </p>
                    </div>
                </div>

                {/* Komitmen Berkelanjutan Perusahaan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun3_house_handover.content.company_commitment_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun3_house_handover.content.company_commitment_content')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jun3_house_handover.content.maria_commitment_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jun3_house_handover.content.maria_commitment_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Transformasi Desa Nifasi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun3_house_handover.content.village_transformation_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun3_house_handover.content.village_transformation_content')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jun3_house_handover.content.maria_transformation_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jun3_house_handover.content.maria_transformation_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Program CSR Komprehensif */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun3_house_handover.content.comprehensive_csr_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun3_house_handover.content.comprehensive_csr_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jun3_house_handover.content.development_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jun3_house_handover.content.development_program_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jun3_house_handover.content.other_assistance_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jun3_house_handover.content.other_assistance_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kontribusi Ekonomi dan Wisata */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun3_house_handover.content.economic_tourism_contribution_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun3_house_handover.content.economic_tourism_contribution_content')}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun3_house_handover.content.legal_commitment_content')}
                        </p>
                    </div>
                </div>

                {/* Harapan dan Dampak Positif */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.jun3_house_handover.content.hopes_positive_impact_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.jun3_house_handover.content.hopes_positive_impact_content')}
                    </p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Jun-4 article
    const getJun4TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Komitmen Berkelanjutan untuk Masyarakat Desa Nifasi */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.jun4_commitment_real_benefits.content.sustainable_commitment_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.jun4_commitment_real_benefits.content.sustainable_commitment_content')}
                    </p>
                </div>

                {/* Program CSR Komprehensif */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun4_commitment_real_benefits.content.comprehensive_csr_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun4_commitment_real_benefits.content.comprehensive_csr_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jun4_commitment_real_benefits.content.development_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jun4_commitment_real_benefits.content.development_program_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jun4_commitment_real_benefits.content.other_assistance_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jun4_commitment_real_benefits.content.other_assistance_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transformasi Desa Nifasi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun4_commitment_real_benefits.content.village_transformation_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun4_commitment_real_benefits.content.village_transformation_content')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jun4_commitment_real_benefits.content.maria_transformation_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jun4_commitment_real_benefits.content.maria_transformation_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Dampak Ekonomi dan Wisata */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun4_commitment_real_benefits.content.economic_tourism_impact_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun4_commitment_real_benefits.content.economic_tourism_impact_content')}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun4_commitment_real_benefits.content.legal_commitment_content')}
                        </p>
                    </div>
                </div>

                {/* Program Berkelanjutan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun4_commitment_real_benefits.content.sustainable_program_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun4_commitment_real_benefits.content.sustainable_program_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jun4_commitment_real_benefits.content.program_achievement_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jun4_commitment_real_benefits.content.program_achievement_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jun4_commitment_real_benefits.content.positive_impact_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jun4_commitment_real_benefits.content.positive_impact_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komitmen Legal dan Berizin */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun4_commitment_real_benefits.content.legal_licensed_commitment_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun4_commitment_real_benefits.content.legal_licensed_commitment_content')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jun4_commitment_real_benefits.content.maria_legal_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jun4_commitment_real_benefits.content.maria_legal_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Dampak Jangka Panjang */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun4_commitment_real_benefits.content.long_term_impact_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun4_commitment_real_benefits.content.long_term_impact_content')}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun4_commitment_real_benefits.content.sustainable_support_content')}
                        </p>
                    </div>
                </div>

                {/* Harapan dan Visi Ke Depan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.jun4_commitment_real_benefits.content.hopes_future_vision_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.jun4_commitment_real_benefits.content.hopes_future_vision_content')}
                    </p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Sept-1 article
    const getSept1TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Langkah Strategis Ekspansi Bisnis */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-blue-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                        {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.strategic_business_expansion_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.strategic_business_expansion_description')}
                    </p>
                </div>

                {/* Profil Perusahaan dan Spesialisasi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.company_profile_specialization_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.company_profile_specialization_description')}
                        </p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                                        />
                                    </svg>
                                    {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.global_partnerships_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.global_partnerships_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                        />
                                    </svg>
                                    {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.integrated_services_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.integrated_services_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visi Strategis Pasca Akuisisi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.strategic_vision_title')}
                    </h3>
                    <blockquote className="rounded-r-xl border-l-4 border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 shadow-sm">
                        <p className="mb-4 text-lg leading-relaxed text-gray-800 italic">
                            {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.strategic_vision_quote')}
                        </p>
                        <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.strategic_vision_citation')}
                        </cite>
                    </blockquote>
                </div>

                {/* Struktur Kepemilikan Pasca Akuisisi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.ownership_structure_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.ownership_structure_description')}
                        </p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                    <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-2xl font-bold text-blue-600">51%</h4>
                                <p className="font-semibold text-gray-700">
                                    {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.armada_bumi_investama_title')}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.armada_bumi_investama_subtitle')}
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                                    <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-2xl font-bold text-orange-600">49%</h4>
                                <p className="font-semibold text-gray-700">
                                    {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.existing_management_title')}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.existing_management_subtitle')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Strategi Ekspansi Pasar Indonesia Timur */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.market_expansion_strategy_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.market_expansion_strategy_description')}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h4 className="mb-4 text-lg font-bold text-gray-900">
                                {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.regional_development_focus_title')}
                            </h4>
                            <div className="space-y-4">
                                {(
                                    t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.regional_development_items', {
                                        returnObjects: true,
                                    }) as string[]
                                ).map((item: string, index: number) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                                        <span className="text-base text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outlook Pasar dan Prospek Masa Depan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.market_outlook_future_prospects_title')}
                    </h3>
                    <blockquote className="rounded-r-xl border-l-4 border-teal-500 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 shadow-sm">
                        <p className="mb-4 text-lg leading-relaxed text-gray-800 italic">
                            {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.market_outlook_quote')}
                        </p>
                        <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.market_outlook_citation')}
                        </cite>
                    </blockquote>
                </div>

                {/* Manfaat Integrasi Strategis */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.integration_benefits_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.integration_benefits_description')}
                        </p>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                                    <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.operational_efficiency_title')}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.operational_efficiency_description')}
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                                    <svg className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.network_expansion_title')}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.network_expansion_description')}
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                                    <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.service_quality_title')}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.service_quality_description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komitmen Jangka Panjang dan Visi Masa Depan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.conclusion_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.sept1_torindo_acquisition_heavy_equipment.content.conclusion_description')}
                    </p>
                </div>
            </div>
        );
    };
    // Function to get translated content for Aug-3 article
    const getAug3TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Keceriaan Memperingati Kemerdekaan Indonesia */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.aug3_independence_day_traditional_games.content.independence_celebration_joy_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.aug3_independence_day_traditional_games.content.independence_celebration_joy_description')}
                    </p>
                </div>

                {/* Partisipasi Perusahaan dalam Perayaan Kemerdekaan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug3_independence_day_traditional_games.content.company_participation_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug3_independence_day_traditional_games.content.company_participation_description')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.aug3_independence_day_traditional_games.content.dikky_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                - {t('news_detail.aug3_independence_day_traditional_games.content.dikky_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Beragam Lomba Tradisional yang Meriah */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug3_independence_day_traditional_games.content.diverse_traditional_games_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug3_independence_day_traditional_games.content.diverse_traditional_games_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug3_independence_day_traditional_games.content.sports_competition_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug3_independence_day_traditional_games.content.sports_competition_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {t('news_detail.aug3_independence_day_traditional_games.content.children_family_games_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug3_independence_day_traditional_games.content.children_family_games_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Jadwal Pelaksanaan Lomba Kemerdekaan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug3_independence_day_traditional_games.content.competition_schedule_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug3_independence_day_traditional_games.content.competition_schedule_description')}
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200">
                                    <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="mb-2 text-lg font-bold text-gray-900">
                                        {t('news_detail.aug3_independence_day_traditional_games.content.main_period_title')}
                                    </h4>
                                    <p className="mb-3 text-gray-600">
                                        {t('news_detail.aug3_independence_day_traditional_games.content.main_period_description')}
                                    </p>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        {(
                                            t('news_detail.aug3_independence_day_traditional_games.content.main_period_schedule', {
                                                returnObjects: true,
                                            }) as string[]
                                        ).map((item: string, index: number) => (
                                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                <span>
                                                    <strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200">
                                    <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="mb-2 text-lg font-bold text-gray-900">
                                        {t('news_detail.aug3_independence_day_traditional_games.content.peak_day_title')}
                                    </h4>
                                    <p className="mb-3 text-gray-600">
                                        {t('news_detail.aug3_independence_day_traditional_games.content.peak_day_description')}
                                    </p>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        {(
                                            t('news_detail.aug3_independence_day_traditional_games.content.peak_day_schedule', {
                                                returnObjects: true,
                                            }) as string[]
                                        ).map((item: string, index: number) => (
                                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sistem Penghargaan yang Adil dan Transparan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug3_independence_day_traditional_games.content.fair_transparent_awards_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug3_independence_day_traditional_games.content.fair_transparent_awards_description')}
                        </p>
                        <div className="space-y-6">
                            {/* Soccer Awards */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    {t('news_detail.aug3_independence_day_traditional_games.content.soccer_category_title')}
                                </h4>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 text-center">
                                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-white">
                                            1
                                        </div>
                                        <h5 className="text-lg font-bold text-gray-900">Juara I</h5>
                                        <p className="text-2xl font-bold text-yellow-600">Rp 4.000.000</p>
                                        <p className="mt-1 text-sm text-gray-600">Plus trofi dan medali emas</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50 p-4 text-center">
                                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 text-lg font-bold text-white">
                                            2
                                        </div>
                                        <h5 className="text-lg font-bold text-gray-900">Juara II</h5>
                                        <p className="text-2xl font-bold text-gray-600">Rp 3.500.000</p>
                                        <p className="mt-1 text-sm text-gray-600">Plus trofi dan medali perak</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-red-50 p-4 text-center">
                                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                                            3
                                        </div>
                                        <h5 className="text-lg font-bold text-gray-900">Juara III</h5>
                                        <p className="text-2xl font-bold text-orange-600">Rp 2.500.000</p>
                                        <p className="mt-1 text-sm text-gray-600">Plus trofi dan medali perunggu</p>
                                    </div>
                                </div>
                            </div>

                            {/* Volleyball Awards */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                    {t('news_detail.aug3_independence_day_traditional_games.content.volleyball_category_title')}
                                </h4>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 text-center">
                                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-white">
                                            1
                                        </div>
                                        <h5 className="text-lg font-bold text-gray-900">Juara I</h5>
                                        <p className="text-2xl font-bold text-yellow-600">Rp 3.000.000</p>
                                        <p className="mt-1 text-sm text-gray-600">Plus trofi dan medali emas</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50 p-4 text-center">
                                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 text-lg font-bold text-white">
                                            2
                                        </div>
                                        <h5 className="text-lg font-bold text-gray-900">Juara II</h5>
                                        <p className="text-2xl font-bold text-gray-600">Rp 2.000.000</p>
                                        <p className="mt-1 text-sm text-gray-600">Plus trofi dan medali perak</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-red-50 p-4 text-center">
                                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                                            3
                                        </div>
                                        <h5 className="text-lg font-bold text-gray-900">Juara III</h5>
                                        <p className="text-2xl font-bold text-orange-600">Rp 1.000.000</p>
                                        <p className="mt-1 text-sm text-gray-600">Plus trofi dan medali perunggu</p>
                                    </div>
                                </div>
                            </div>

                            {/* Special Recognition */}
                            <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                                <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                        />
                                    </svg>
                                    {t('news_detail.aug3_independence_day_traditional_games.content.special_recognition_title')}
                                </h4>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {(
                                        t('news_detail.aug3_independence_day_traditional_games.content.special_recognition_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <div key={index} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                                            <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                                            <span className="text-gray-700">
                                                <strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dampak Sosial dan Warisan Budaya */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug3_independence_day_traditional_games.content.social_impact_cultural_legacy_title')}
                    </h3>
                    <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug3_independence_day_traditional_games.content.social_impact_cultural_legacy_description')}
                        </p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    {t('news_detail.aug3_independence_day_traditional_games.content.positive_social_impact_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug3_independence_day_traditional_games.content.positive_social_impact_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    {t('news_detail.aug3_independence_day_traditional_games.content.legacy_for_future_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug3_independence_day_traditional_games.content.legacy_for_future_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Semangat Persatuan dalam Kebhinekaan Papua Barat */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('news_detail.aug3_independence_day_traditional_games.content.conclusion_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.aug3_independence_day_traditional_games.content.conclusion_description')}
                    </p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Aug-8 article
    const getAug8TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Solidaritas yang Menyejukkan Hati */}
                <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-emerald-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        {t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.heartwarming_solidarity_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-emerald-800">
                        {t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.heartwarming_solidarity_description')}
                    </p>
                </div>

                {/* Filosofi CSR yang Berdampak */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.impactful_csr_philosophy_title')}
                    </h3>
                    <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.impactful_csr_philosophy_description')}
                        </p>
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="mb-3 border-l-4 border-blue-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.maria_quote')}
                            </blockquote>
                            <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                {t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.maria_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Kemitraan Strategis dengan Masyarakat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.strategic_community_partnership_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.strategic_community_partnership_description')}
                        </p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.validation_methods_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {(
                                        t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.validation_methods_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-teal-500"></div>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.recipient_criteria_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {(
                                        t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.recipient_criteria_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Keberlanjutan Program CSR yang Berdampak */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.conclusion_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.aug8_sustainable_solidarity_elderly_widows.content.conclusion_description')}
                    </p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Aug-7 article
    const getAug7TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Mewujudkan Kesejahteraan Berkelanjutan */}
                <div className="rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-violet-50 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-purple-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        {t('news_detail.aug7_real_concern_elderly_worship_priority.content.realizing_sustainable_welfare_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-purple-800">
                        {t('news_detail.aug7_real_concern_elderly_worship_priority.content.realizing_sustainable_welfare_description')}
                    </p>
                </div>

                {/* Fokus Khusus Bulan Agustus 2025 */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug7_real_concern_elderly_worship_priority.content.august_2025_special_focus_title')}
                    </h3>
                    <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug7_real_concern_elderly_worship_priority.content.august_2025_special_focus_description')}
                        </p>
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="mb-3 border-l-4 border-blue-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.aug7_real_concern_elderly_worship_priority.content.maria_quote')}
                            </blockquote>
                            <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                {t('news_detail.aug7_real_concern_elderly_worship_priority.content.maria_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Metodologi Distribusi Berbasis Data */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug7_real_concern_elderly_worship_priority.content.data_based_distribution_methodology_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug7_real_concern_elderly_worship_priority.content.data_based_distribution_methodology_description')}
                        </p>
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="mb-3 border-l-4 border-indigo-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.aug7_real_concern_elderly_worship_priority.content.maria_data_quote')}
                            </blockquote>
                            <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                {t('news_detail.aug7_real_concern_elderly_worship_priority.content.maria_data_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Program CSR Terintegrasi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug7_real_concern_elderly_worship_priority.content.integrated_csr_programs_title')}
                    </h3>
                    <div className="rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug7_real_concern_elderly_worship_priority.content.integrated_csr_programs_description')}
                        </p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug7_real_concern_elderly_worship_priority.content.infrastructure_programs_title')}
                                </h4>
                                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug7_real_concern_elderly_worship_priority.content.infrastructure_programs_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug7_real_concern_elderly_worship_priority.content.empowerment_programs_title')}
                                </h4>
                                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug7_real_concern_elderly_worship_priority.content.empowerment_programs_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komitmen Berkelanjutan untuk Kesejahteraan Masyarakat */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.aug7_real_concern_elderly_worship_priority.content.conclusion_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.aug7_real_concern_elderly_worship_priority.content.conclusion_description')}
                    </p>
                </div>
            </div>
        );
    };
    // Function to get translated content for Aug-6 article
    const getAug6TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Rutinitas CSR yang Terpuji dan Berkelanjutan */}
                <div className="rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-teal-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m5.414-5.414a2 2 0 11-2.828 2.828L10 9"
                            />
                        </svg>
                        {t('news_detail.aug6_sustainable_commitment_sembako.content.praiseworthy_sustainable_routine_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-teal-800">
                        {t('news_detail.aug6_sustainable_commitment_sembako.content.praiseworthy_sustainable_routine_description')}
                    </p>
                </div>

                {/* Bukti Nyata Komitmen Perusahaan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug6_sustainable_commitment_sembako.content.real_company_commitment_title')}
                    </h3>
                    <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug6_sustainable_commitment_sembako.content.real_company_commitment_description')}
                        </p>
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="mb-3 border-l-4 border-blue-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.aug6_sustainable_commitment_sembako.content.maria_quote')}
                            </blockquote>
                            <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                {t('news_detail.aug6_sustainable_commitment_sembako.content.maria_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Dukungan Khusus untuk Tempat Ibadah */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug6_sustainable_commitment_sembako.content.special_religious_institutions_support_title')}
                    </h3>
                    <div className="rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug6_sustainable_commitment_sembako.content.special_religious_institutions_support_description')}
                        </p>
                        <div className="grid gap-6 md:grid-cols-3">
                            {(
                                t('news_detail.aug6_sustainable_commitment_sembako.content.religious_institutions', {
                                    returnObjects: true,
                                }) as Array<{
                                    name: string;
                                    location: string;
                                    description: string;
                                }>
                            ).map((institution: { name: string; location: string; description: string }, index: number) => (
                                <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-2 text-lg font-bold text-gray-900">{institution.name}</h4>
                                    <p className="text-sm text-gray-600">{institution.location}</p>
                                    <p className="mt-2 text-xs text-gray-500">{institution.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pola Distribusi Janda Lansia Prioritas */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug6_sustainable_commitment_sembako.content.elderly_widows_priority_distribution_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug6_sustainable_commitment_sembako.content.elderly_widows_priority_distribution_description')}
                        </p>
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="mb-3 border-l-4 border-indigo-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.aug6_sustainable_commitment_sembako.content.maria_commitment_quote')}
                            </blockquote>
                            <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                {t('news_detail.aug6_sustainable_commitment_sembako.content.maria_commitment_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Program CSR Komprehensif Berkelanjutan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug6_sustainable_commitment_sembako.content.comprehensive_sustainable_csr_programs_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug6_sustainable_commitment_sembako.content.comprehensive_sustainable_csr_programs_description')}
                        </p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug6_sustainable_commitment_sembako.content.infrastructure_programs_title')}
                                </h4>
                                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug6_sustainable_commitment_sembako.content.infrastructure_programs_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug6_sustainable_commitment_sembako.content.empowerment_programs_title')}
                                </h4>
                                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug6_sustainable_commitment_sembako.content.empowerment_programs_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dedikasi Berkelanjutan untuk Masyarakat Papua Tengah */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.aug6_sustainable_commitment_sembako.content.conclusion_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.aug6_sustainable_commitment_sembako.content.conclusion_description')}
                    </p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Aug-5 article
    const getAug5TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Bukti Nyata Kepedulian Berkelanjutan */}
                <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-emerald-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('news_detail.aug5_consistent_sembako_distribution.content.real_care_proof_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-emerald-800">
                        {t('news_detail.aug5_consistent_sembako_distribution.content.real_care_proof_description')}
                    </p>
                </div>

                {/* Konsistensi Program CSR yang Terpuji */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug5_consistent_sembako_distribution.content.consistent_csr_program_title')}
                    </h3>
                    <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                        <div className="mb-6">
                            <p className="mb-4 text-base leading-relaxed text-gray-800">
                                {t('news_detail.aug5_consistent_sembako_distribution.content.consistent_csr_program_description')}
                            </p>
                        </div>
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="mb-3 border-l-4 border-blue-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.aug5_consistent_sembako_distribution.content.maria_quote')}
                            </blockquote>
                            <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                {t('news_detail.aug5_consistent_sembako_distribution.content.maria_citation')}
                            </cite>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    {t('news_detail.aug5_consistent_sembako_distribution.content.program_frequency_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug5_consistent_sembako_distribution.content.program_frequency_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    {t('news_detail.aug5_consistent_sembako_distribution.content.target_recipients_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug5_consistent_sembako_distribution.content.target_recipients_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Perhatian Khusus untuk Tempat Ibadah */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug5_consistent_sembako_distribution.content.religious_institution_focus_title')}
                    </h3>
                    <div className="rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug5_consistent_sembako_distribution.content.religious_institution_focus_description')}
                        </p>
                        <div className="grid gap-6 md:grid-cols-3">
                            {(
                                t('news_detail.aug5_consistent_sembako_distribution.content.religious_locations', { returnObjects: true }) as Array<{
                                    name: string;
                                    location: string;
                                    description: string;
                                }>
                            ).map((location: { name: string; location: string; description: string }, index: number) => (
                                <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-2 text-lg font-bold text-gray-900">{location.name}</h4>
                                    <p className="text-sm text-gray-600">{location.location}</p>
                                    <p className="mt-2 text-xs text-gray-500">{location.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pola Distribusi yang Terorganisir */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug5_consistent_sembako_distribution.content.organized_distribution_pattern_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug5_consistent_sembako_distribution.content.organized_distribution_pattern_description')}
                        </p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {t('news_detail.aug5_consistent_sembako_distribution.content.main_distribution_areas_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug5_consistent_sembako_distribution.content.main_distribution_areas_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-teal-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3a4 4 0 01-8 0V3a4 4 0 018 0v4zM9 7a4 4 0 104 0v10a4 4 0 01-4 0V7z"
                                        />
                                    </svg>
                                    {t('news_detail.aug5_consistent_sembako_distribution.content.additional_locations_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug5_consistent_sembako_distribution.content.additional_locations_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dampak CSR yang Lebih Luas */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug5_consistent_sembako_distribution.content.broader_csr_impact_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug5_consistent_sembako_distribution.content.broader_csr_impact_description')}
                        </p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug5_consistent_sembako_distribution.content.social_impact_title')}
                                </h4>
                                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug5_consistent_sembako_distribution.content.social_impact_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug5_consistent_sembako_distribution.content.economic_impact_title')}
                                </h4>
                                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug5_consistent_sembako_distribution.content.economic_impact_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komitmen Berkelanjutan untuk Papua Tengah */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.aug5_consistent_sembako_distribution.content.conclusion_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.aug5_consistent_sembako_distribution.content.conclusion_description')}
                    </p>
                </div>
            </div>
        );
    };
    // Function to get translated content for Aug-4 article
    const getAug4TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Kepedulian Nyata untuk Masyarakat Nabire */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-blue-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        {t('news_detail.aug4_sharing_happiness_sembako.content.real_care_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.aug4_sharing_happiness_sembako.content.real_care_description')}
                    </p>
                </div>

                {/* Fokus Khusus untuk Kelompok Rentan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug4_sharing_happiness_sembako.content.focus_vulnerable_groups_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <div className="mb-6">
                            <p className="mb-4 text-base leading-relaxed text-gray-800">
                                {t('news_detail.aug4_sharing_happiness_sembako.content.focus_vulnerable_groups_description')}
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    {t('news_detail.aug4_sharing_happiness_sembako.content.elderly_widows_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug4_sharing_happiness_sembako.content.elderly_widows_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    {t('news_detail.aug4_sharing_happiness_sembako.content.places_of_worship_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug4_sharing_happiness_sembako.content.places_of_worship_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mekanisme Distribusi yang Terorganisir */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug4_sharing_happiness_sembako.content.organized_distribution_title')}
                    </h3>
                    <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug4_sharing_happiness_sembako.content.organized_distribution_description')}
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-200">
                                    <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="mb-2 text-lg font-bold text-gray-900">
                                        {t('news_detail.aug4_sharing_happiness_sembako.content.verification_selection_title')}
                                    </h4>
                                    <p className="mb-3 text-gray-600">
                                        {t('news_detail.aug4_sharing_happiness_sembako.content.verification_selection_description')}
                                    </p>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        {(
                                            t('news_detail.aug4_sharing_happiness_sembako.content.verification_items', {
                                                returnObjects: true,
                                            }) as string[]
                                        ).map((item: string, index: number) => (
                                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-200">
                                    <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="mb-2 text-lg font-bold text-gray-900">
                                        {t('news_detail.aug4_sharing_happiness_sembako.content.distribution_execution_title')}
                                    </h4>
                                    <p className="mb-3 text-gray-600">
                                        {t('news_detail.aug4_sharing_happiness_sembako.content.distribution_execution_description')}
                                    </p>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        {(
                                            t('news_detail.aug4_sharing_happiness_sembako.content.execution_items', {
                                                returnObjects: true,
                                            }) as string[]
                                        ).map((item: string, index: number) => (
                                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komposisi Lengkap Paket Sembako */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug4_sharing_happiness_sembako.content.package_contents_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug4_sharing_happiness_sembako.content.package_contents_description')}
                        </p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                    {t('news_detail.aug4_sharing_happiness_sembako.content.basic_food_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug4_sharing_happiness_sembako.content.basic_food_items', { returnObjects: true }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                    {t('news_detail.aug4_sharing_happiness_sembako.content.daily_needs_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug4_sharing_happiness_sembako.content.daily_needs_items', { returnObjects: true }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Jangkauan Wilayah Distribusi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug4_sharing_happiness_sembako.content.distribution_coverage_title')}
                    </h3>
                    <div className="rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug4_sharing_happiness_sembako.content.distribution_coverage_description')}
                        </p>
                        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {(
                                t('news_detail.aug4_sharing_happiness_sembako.content.coverage_areas', { returnObjects: true }) as Array<{
                                    name: string;
                                    description: string;
                                }>
                            ).map((area: { name: string; description: string }, index: number) => (
                                <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                                        <svg className="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-900">{area.name}</h4>
                                    <p className="mt-1 text-xs text-gray-600">{area.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Komitmen Berkelanjutan Perusahaan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug4_sharing_happiness_sembako.content.sustainable_commitment_title')}
                    </h3>
                    <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                        <p className="mb-6 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug4_sharing_happiness_sembako.content.sustainable_commitment_description')}
                        </p>
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="mb-3 border-l-4 border-emerald-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.aug4_sharing_happiness_sembako.content.maria_quote')}
                            </blockquote>
                            <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                {t('news_detail.aug4_sharing_happiness_sembako.content.maria_citation')}
                            </cite>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {t('news_detail.aug4_sharing_happiness_sembako.content.integrated_csr_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug4_sharing_happiness_sembako.content.integrated_csr_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    {t('news_detail.aug4_sharing_happiness_sembako.content.sustainable_impact_title')}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    {(
                                        t('news_detail.aug4_sharing_happiness_sembako.content.sustainable_impact_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wujud Nyata Kepedulian Korporat yang Berkelanjutan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        {t('news_detail.aug4_sharing_happiness_sembako.content.conclusion_title')}
                    </h3>
                    <p className="mb-4 text-base leading-relaxed text-gray-800">
                        {t('news_detail.aug4_sharing_happiness_sembako.content.conclusion_description_1')}
                    </p>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.aug4_sharing_happiness_sembako.content.conclusion_description_2')}
                    </p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Aug-2 article
    const getAug2TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Rumah Baru, Semangat Baru di Desa Nifasi */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.aug2_historic_moment_house.content.new_house_spirit_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.aug2_historic_moment_house.content.new_house_spirit_description')}
                    </p>
                </div>

                {/* Proses dan Rekomendasi Adat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug2_historic_moment_house.content.process_recommendation_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug2_historic_moment_house.content.process_recommendation_description')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.aug2_historic_moment_house.content.pr_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.aug2_historic_moment_house.content.pr_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Spesifikasi Hunian */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug2_historic_moment_house.content.housing_specifications_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug2_historic_moment_house.content.housing_specifications_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug2_historic_moment_house.content.technical_details_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug2_historic_moment_house.content.technical_details_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug2_historic_moment_house.content.construction_location_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug2_historic_moment_house.content.construction_location_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komitmen CSR yang Konsisten */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug2_historic_moment_house.content.consistent_csr_commitment_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug2_historic_moment_house.content.consistent_csr_commitment_description')}
                        </p>
                    </div>
                </div>

                {/* Penutup */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">{t('news_detail.aug2_historic_moment_house.content.conclusion_title')}</h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.aug2_historic_moment_house.content.conclusion_description')}
                    </p>
                </div>
            </div>
        );
    };
    // Function to get translated content for Aug-1 article
    const getAug1TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Kado Kemerdekaan untuk Masyarakat Desa Nifasi */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.aug1_independence_day_gift.content.independence_gift_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.aug1_independence_day_gift.content.independence_gift_description')}
                    </p>
                </div>

                {/* Pembangunan Rumah untuk Lomon Monei */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug1_independence_day_gift.content.house_construction_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug1_independence_day_gift.content.house_construction_description')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.aug1_independence_day_gift.content.maria_quote_1')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.aug1_independence_day_gift.content.maria_citation_1')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Kebahagiaan Pasangan Suami Istri */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug1_independence_day_gift.content.couple_happiness_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug1_independence_day_gift.content.couple_happiness_description_1')}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug1_independence_day_gift.content.couple_happiness_description_2')}
                        </p>
                    </div>
                </div>

                {/* Spesifikasi Rumah yang Dibangun */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug1_independence_day_gift.content.house_specifications_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug1_independence_day_gift.content.house_specifications_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug1_independence_day_gift.content.house_specs_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(t('news_detail.aug1_independence_day_gift.content.house_specs_items', { returnObjects: true }) as string[]).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug1_independence_day_gift.content.construction_location_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug1_independence_day_gift.content.construction_location_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komitmen Perusahaan untuk Masyarakat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug1_independence_day_gift.content.company_commitment_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug1_independence_day_gift.content.company_commitment_description')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-orange-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.aug1_independence_day_gift.content.maria_quote_2')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.aug1_independence_day_gift.content.maria_citation_2')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Program CSR Komprehensif */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug1_independence_day_gift.content.comprehensive_csr_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug1_independence_day_gift.content.comprehensive_csr_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug1_independence_day_gift.content.infrastructure_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug1_independence_day_gift.content.infrastructure_program_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug1_independence_day_gift.content.social_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug1_independence_day_gift.content.social_program_items', { returnObjects: true }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dampak Positif untuk Desa Nifasi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug1_independence_day_gift.content.positive_impact_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug1_independence_day_gift.content.positive_impact_description_1')}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug1_independence_day_gift.content.positive_impact_description_2')}
                        </p>
                    </div>
                </div>

                {/* Konsistensi Program CSR */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.aug1_independence_day_gift.content.csr_consistency_title')}
                    </h3>
                    <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.aug1_independence_day_gift.content.csr_consistency_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug1_independence_day_gift.content.physical_development_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug1_independence_day_gift.content.physical_development_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.aug1_independence_day_gift.content.economic_empowerment_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.aug1_independence_day_gift.content.economic_empowerment_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Harapan dan Dampak Berkelanjutan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.aug1_independence_day_gift.content.sustainable_impact_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.aug1_independence_day_gift.content.sustainable_impact_description')}
                    </p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Jul-4 article
    const getJul4TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Komitmen Perusahaan terhadap Pemilik Hak Garap */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.jul4_land_rights_assistance.content.company_commitment_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.jul4_land_rights_assistance.content.company_commitment_description')}
                    </p>
                </div>

                {/* Penyerahan Simbolis di Jakarta */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul4_land_rights_assistance.content.symbolic_handover_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul4_land_rights_assistance.content.symbolic_handover_description')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jul4_land_rights_assistance.content.andito_quote_1')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jul4_land_rights_assistance.content.andito_citation_1')}
                            </cite>
                        </div>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul4_land_rights_assistance.content.handover_details_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul4_land_rights_assistance.content.handover_details_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul4_land_rights_assistance.content.assistance_purpose_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul4_land_rights_assistance.content.assistance_purpose_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Program CSR Komprehensif */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul4_land_rights_assistance.content.comprehensive_csr_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul4_land_rights_assistance.content.comprehensive_csr_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul4_land_rights_assistance.content.infrastructure_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul4_land_rights_assistance.content.infrastructure_program_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul4_land_rights_assistance.content.social_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul4_land_rights_assistance.content.social_program_items', { returnObjects: true }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ekspansi Perusahaan ke Papua Barat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul4_land_rights_assistance.content.expansion_west_papua_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul4_land_rights_assistance.content.expansion_west_papua_description')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-indigo-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jul4_land_rights_assistance.content.andito_quote_2')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jul4_land_rights_assistance.content.andito_citation_2')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Apresiasi dari Penerima Bantuan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul4_land_rights_assistance.content.recipient_appreciation_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul4_land_rights_assistance.content.recipient_appreciation_description')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-orange-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jul4_land_rights_assistance.content.hans_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jul4_land_rights_assistance.content.hans_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Distribusi Bantuan ke Desa Lagari */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul4_land_rights_assistance.content.distribution_lagari_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul4_land_rights_assistance.content.distribution_lagari_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul4_land_rights_assistance.content.distribution_location_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul4_land_rights_assistance.content.distribution_location_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul4_land_rights_assistance.content.distribution_process_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul4_land_rights_assistance.content.distribution_process_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komitmen Lingkungan dan Masyarakat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul4_land_rights_assistance.content.environment_community_commitment_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul4_land_rights_assistance.content.environment_community_commitment_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul4_land_rights_assistance.content.environment_commitment_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul4_land_rights_assistance.content.environment_commitment_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul4_land_rights_assistance.content.community_commitment_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul4_land_rights_assistance.content.community_commitment_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dampak Positif bagi Masyarakat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul4_land_rights_assistance.content.positive_impact_title')}
                    </h3>
                    <div className="rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul4_land_rights_assistance.content.positive_impact_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul4_land_rights_assistance.content.direct_benefits_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul4_land_rights_assistance.content.direct_benefits_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul4_land_rights_assistance.content.long_term_benefits_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul4_land_rights_assistance.content.long_term_benefits_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Harapan dan Komitmen Masa Depan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.jul4_land_rights_assistance.content.future_commitment_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.jul4_land_rights_assistance.content.future_commitment_description')}
                    </p>
                </div>
            </div>
        );
    };
    // Function to get translated content for Jul-2 article
    const getJul2TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Bukti Komitmen Perusahaan untuk Masyarakat */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.jul2_company_contribution.content.company_commitment_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.jul2_company_contribution.content.company_commitment_description')}
                    </p>
                </div>

                {/* Distribusi Bantuan untuk 506 Kepala Keluarga */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul2_company_contribution.content.distribution_506_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul2_company_contribution.content.distribution_506_description')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jul2_company_contribution.content.maria_quote_1')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jul2_company_contribution.content.maria_citation_1')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Prioritas untuk Janda Lansia */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul2_company_contribution.content.elderly_priority_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul2_company_contribution.content.elderly_priority_description_1')}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul2_company_contribution.content.elderly_priority_description_2')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-indigo-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jul2_company_contribution.content.maria_quote_2')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jul2_company_contribution.content.maria_citation_2')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Konsistensi Program CSR */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul2_company_contribution.content.csr_consistency_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul2_company_contribution.content.csr_consistency_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul2_company_contribution.content.program_characteristics_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul2_company_contribution.content.program_characteristics_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul2_company_contribution.content.distribution_locations_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul2_company_contribution.content.distribution_locations_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Jangkauan Distribusi Luas */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul2_company_contribution.content.wide_distribution_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul2_company_contribution.content.wide_distribution_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul2_company_contribution.content.villages_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(t('news_detail.jul2_company_contribution.content.villages_items', { returnObjects: true }) as string[]).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul2_company_contribution.content.tribes_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(t('news_detail.jul2_company_contribution.content.tribes_items', { returnObjects: true }) as string[]).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komposisi Paket Sembako Lengkap */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul2_company_contribution.content.package_composition_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul2_company_contribution.content.package_composition_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul2_company_contribution.content.basic_food_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(t('news_detail.jul2_company_contribution.content.basic_food_items', { returnObjects: true }) as string[]).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul2_company_contribution.content.additional_needs_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul2_company_contribution.content.additional_needs_items', { returnObjects: true }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Program CSR Komprehensif */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul2_company_contribution.content.comprehensive_csr_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul2_company_contribution.content.comprehensive_csr_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul2_company_contribution.content.education_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul2_company_contribution.content.education_program_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul2_company_contribution.content.infrastructure_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {(
                                        t('news_detail.jul2_company_contribution.content.infrastructure_program_items', {
                                            returnObjects: true,
                                        }) as string[]
                                    ).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Apresiasi dari Masyarakat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul2_company_contribution.content.community_appreciation_title')}
                    </h3>
                    <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul2_company_contribution.content.community_appreciation_description')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-emerald-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jul2_company_contribution.content.mamai_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jul2_company_contribution.content.mamai_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Dampak Positif dan Komitmen Berkelanjutan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.jul2_company_contribution.content.positive_impact_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.jul2_company_contribution.content.positive_impact_description')}
                    </p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Jul-1 article
    const getJul1TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Program CSR Konsisten untuk Masyarakat Desa Nifasi */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.jul1_sembako_distribution.content.consistent_csr_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.jul1_sembako_distribution.content.consistent_csr_content')}
                    </p>
                </div>

                {/* Distribusi 506 Paket Sembako */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul1_sembako_distribution.content.distribution_506_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul1_sembako_distribution.content.distribution_506_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul1_sembako_distribution.content.distribution_detail_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul1_sembako_distribution.content.distribution_detail_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul1_sembako_distribution.content.package_composition_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul1_sembako_distribution.content.package_composition_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komposisi Lengkap Paket Sembako */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul1_sembako_distribution.content.complete_package_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul1_sembako_distribution.content.complete_package_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul1_sembako_distribution.content.basic_food_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul1_sembako_distribution.content.basic_food_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul1_sembako_distribution.content.additional_needs_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul1_sembako_distribution.content.additional_needs_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Prioritas untuk Janda Lansia */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul1_sembako_distribution.content.priority_elderly_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul1_sembako_distribution.content.priority_elderly_content')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jul1_sembako_distribution.content.maria_elderly_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jul1_sembako_distribution.content.maria_elderly_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Jangkauan Distribusi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul1_sembako_distribution.content.distribution_coverage_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul1_sembako_distribution.content.distribution_coverage_content')}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul1_sembako_distribution.content.coverage_areas_content')}
                        </p>
                    </div>
                </div>

                {/* Program CSR Komprehensif */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul1_sembako_distribution.content.comprehensive_csr_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul1_sembako_distribution.content.comprehensive_csr_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul1_sembako_distribution.content.education_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul1_sembako_distribution.content.education_program_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul1_sembako_distribution.content.infrastructure_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul1_sembako_distribution.content.infrastructure_program_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Konsistensi Program */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul1_sembako_distribution.content.program_consistency_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul1_sembako_distribution.content.program_consistency_content')}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul1_sembako_distribution.content.company_commitment_content')}
                        </p>
                    </div>
                </div>

                {/* Dampak Positif dan Harapan Ke Depan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.jul1_sembako_distribution.content.positive_impact_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.jul1_sembako_distribution.content.positive_impact_content')}
                    </p>
                </div>
            </div>
        );
    };
    // Function to get translated content for Jul-3 article
    const getJul3TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Program CSR Konsisten untuk Kesejahteraan Masyarakat */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.jul3_sembako_elderly_priority.content.consistent_csr_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.jul3_sembako_elderly_priority.content.consistent_csr_content')}
                    </p>
                </div>

                {/* Distribusi Rutin Setiap Bulan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul3_sembako_elderly_priority.content.monthly_distribution_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul3_sembako_elderly_priority.content.monthly_distribution_content')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jul3_sembako_elderly_priority.content.maria_monthly_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jul3_sembako_elderly_priority.content.maria_monthly_citation')}
                            </cite>
                        </div>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.routine_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.routine_program_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.program_consistency_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.program_consistency_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Prioritas untuk Janda Lansia */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul3_sembako_elderly_priority.content.elderly_priority_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul3_sembako_elderly_priority.content.elderly_priority_content')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jul3_sembako_elderly_priority.content.maria_elderly_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jul3_sembako_elderly_priority.content.maria_elderly_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Distribusi di Tempat Ibadah dan Kantor Publik */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul3_sembako_elderly_priority.content.worship_public_distribution_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul3_sembako_elderly_priority.content.worship_public_distribution_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.worship_places_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.worship_places_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.public_offices_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.public_offices_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Apresiasi dari Masyarakat Suku Mamai */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul3_sembako_elderly_priority.content.mamai_appreciation_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul3_sembako_elderly_priority.content.mamai_appreciation_content')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jul3_sembako_elderly_priority.content.mamai_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jul3_sembako_elderly_priority.content.mamai_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Komposisi Paket Sembako yang Konsisten */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul3_sembako_elderly_priority.content.consistent_package_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul3_sembako_elderly_priority.content.consistent_package_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.basic_food_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.basic_food_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.additional_needs_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.additional_needs_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Program CSR Komprehensif */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul3_sembako_elderly_priority.content.comprehensive_csr_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul3_sembako_elderly_priority.content.comprehensive_csr_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.education_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.education_program_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.infrastructure_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.infrastructure_program_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Jangkauan Distribusi yang Luas */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jul3_sembako_elderly_priority.content.wide_distribution_title')}
                    </h3>
                    <div className="rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jul3_sembako_elderly_priority.content.wide_distribution_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.distribution_locations_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.distribution_locations_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.additional_areas_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jul3_sembako_elderly_priority.content.additional_areas_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dampak Berkelanjutan dan Komitmen Masa Depan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.jul3_sembako_elderly_priority.content.sustainable_impact_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.jul3_sembako_elderly_priority.content.sustainable_impact_content')}
                    </p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Jun-2 article
    const getJun2TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Program CSR Pendidikan untuk Masyarakat Desa Nifasi */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.jun2_csr_education_funding.content.csr_education_program_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.jun2_csr_education_funding.content.csr_education_program_content')}
                    </p>
                </div>

                {/* Detail Program Bantuan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun2_csr_education_funding.content.program_details_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun2_csr_education_funding.content.program_details_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jun2_csr_education_funding.content.value_coverage_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jun2_csr_education_funding.content.value_coverage_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jun2_csr_education_funding.content.distribution_mechanism_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jun2_csr_education_funding.content.distribution_mechanism_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aspirasi Masyarakat dan Pemuka Adat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun2_csr_education_funding.content.community_aspiration_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jun2_csr_education_funding.content.andrian_aspiration_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jun2_csr_education_funding.content.andrian_aspiration_citation')}
                            </cite>
                        </div>
                        <p className="mt-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun2_csr_education_funding.content.golden_indonesia_content')}
                        </p>
                    </div>
                </div>

                {/* Daftar Penerima Bantuan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun2_csr_education_funding.content.beneficiaries_list_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun2_csr_education_funding.content.beneficiaries_list_content')}
                        </p>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-4 shadow-sm">
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.jun2_csr_education_funding.content.beneficiaries_group1', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>• {item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-4 shadow-sm">
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.jun2_csr_education_funding.content.beneficiaries_group2', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>• {item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komitmen Berkelanjutan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun2_csr_education_funding.content.sustainable_commitment_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun2_csr_education_funding.content.sustainable_commitment_content')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jun2_csr_education_funding.content.andrian_commitment_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jun2_csr_education_funding.content.andrian_commitment_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Kerja Sama dengan Perguruan Tinggi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun2_csr_education_funding.content.university_cooperation_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun2_csr_education_funding.content.university_cooperation_content')}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun2_csr_education_funding.content.human_resource_content')}
                        </p>
                    </div>
                </div>

                {/* Dampak Positif dan Harapan Ke Depan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.jun2_csr_education_funding.content.positive_impact_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.jun2_csr_education_funding.content.positive_impact_content')}
                    </p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Jun-1 article
    const getJun1TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Fasilitas Dana Pendidikan untuk Pelajar SMAN 6 Nabire */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.jun1_education_funding.content.education_facility_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.jun1_education_funding.content.education_facility_content')}
                    </p>
                </div>

                {/* Rincian Program */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun1_education_funding.content.program_details_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun1_education_funding.content.program_details_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jun1_education_funding.content.coverage_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jun1_education_funding.content.coverage_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.jun1_education_funding.content.value_mechanism_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    {t('news_detail.jun1_education_funding.content.value_mechanism_items', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Proses Penyerahan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun1_education_funding.content.handover_process_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun1_education_funding.content.handover_process_content')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.jun1_education_funding.content.andrian_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.jun1_education_funding.content.andrian_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Penerima Manfaat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.jun1_education_funding.content.beneficiaries_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.jun1_education_funding.content.beneficiaries_content')}
                        </p>
                    </div>
                </div>

                {/* Komitmen Berkelanjutan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.jun1_education_funding.content.sustainable_commitment_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.jun1_education_funding.content.sustainable_commitment_content')}
                    </p>
                </div>
            </div>
        );
    };
    // Function to get translated content for Mar-6 article
    const getMar6TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Kebahagiaan Besar Nelayan Mendapatkan Rumah Layak */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.mar6_fisherman_final_home.content.fisherman_happiness_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.mar6_fisherman_final_home.content.fisherman_happiness_content')}
                    </p>
                </div>

                {/* Rasa Syukur yang Mendalam */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar6_fisherman_final_home.content.deep_gratitude_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar6_fisherman_final_home.content.deep_gratitude_content')}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.mar6_fisherman_final_home.content.yustinus_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.mar6_fisherman_final_home.content.yustinus_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Proses Pendataan dan Rekomendasi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar6_fisherman_final_home.content.data_collection_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar6_fisherman_final_home.content.data_collection_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar6_fisherman_final_home.content.data_collection_process_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar6_fisherman_final_home.content.data_collection_process', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar6_fisherman_final_home.content.selection_criteria_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar6_fisherman_final_home.content.selection_criteria', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Spesifikasi Rumah yang Dibangun */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar6_fisherman_final_home.content.house_specs_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar6_fisherman_final_home.content.house_specs_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            {t('news_detail.mar6_fisherman_final_home.content.spec_items', { returnObjects: true }).map(
                                (item: any, index: number) => (
                                    <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                                            <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                ></path>
                                            </svg>
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                {/* Komitmen Perusahaan yang Legal dan Berizin */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar6_fisherman_final_home.content.legal_commitment_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar6_fisherman_final_home.content.legal_commitment_content')}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-purple-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.mar6_fisherman_final_home.content.maria_legal_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.mar6_fisherman_final_home.content.maria_legal_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Program CSR yang Komprehensif */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar6_fisherman_final_home.content.comprehensive_csr_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar6_fisherman_final_home.content.comprehensive_csr_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar6_fisherman_final_home.content.development_program_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar6_fisherman_final_home.content.development_program', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar6_fisherman_final_home.content.assistance_program_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar6_fisherman_final_home.content.assistance_program', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dampak Positif bagi Masyarakat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar6_fisherman_final_home.content.positive_impact_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar6_fisherman_final_home.content.positive_impact_content')}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-indigo-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.mar6_fisherman_final_home.content.maria_impact_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.mar6_fisherman_final_home.content.maria_impact_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Komitmen Berkelanjutan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.mar6_fisherman_final_home.content.sustainable_commitment_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.mar6_fisherman_final_home.content.sustainable_commitment_content')}
                    </p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Mar-5 article
    const getMar5TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Momen Mengharukan Nelayan Menerima Rumah Baru */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.mar5_fisherman_touching_moment.content.touching_moment_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.mar5_fisherman_touching_moment.content.touching_moment_content')}
                    </p>
                </div>

                {/* Kebahagiaan yang Tak Terduga */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar5_fisherman_touching_moment.content.unexpected_happiness_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar5_fisherman_touching_moment.content.unexpected_happiness_content')}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.mar5_fisherman_touching_moment.content.maria_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.mar5_fisherman_touching_moment.content.maria_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Proses Pendataan dan Rekomendasi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar5_fisherman_touching_moment.content.data_collection_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar5_fisherman_touching_moment.content.data_collection_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar5_fisherman_touching_moment.content.selection_process_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar5_fisherman_touching_moment.content.selection_process', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar5_fisherman_touching_moment.content.recipient_criteria_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar5_fisherman_touching_moment.content.recipient_criteria', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Spesifikasi Rumah Tipe 57 */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar5_fisherman_touching_moment.content.house_specs_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar5_fisherman_touching_moment.content.house_specs_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            {t('news_detail.mar5_fisherman_touching_moment.content.spec_items', { returnObjects: true }).map(
                                (item: any, index: number) => (
                                    <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                                            <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                ></path>
                                            </svg>
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                {/* Program CSR yang Berkelanjutan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar5_fisherman_touching_moment.content.sustainable_csr_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar5_fisherman_touching_moment.content.sustainable_csr_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar5_fisherman_touching_moment.content.development_program_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar5_fisherman_touching_moment.content.development_program', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar5_fisherman_touching_moment.content.empowerment_program_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar5_fisherman_touching_moment.content.empowerment_program', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dampak Positif bagi Masyarakat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar5_fisherman_touching_moment.content.positive_impact_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar5_fisherman_touching_moment.content.positive_impact_content')}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-teal-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.mar5_fisherman_touching_moment.content.maria_impact_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.mar5_fisherman_touching_moment.content.maria_impact_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Komitmen Perusahaan yang Konsisten */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar5_fisherman_touching_moment.content.consistent_commitment_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar5_fisherman_touching_moment.content.consistent_commitment_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar5_fisherman_touching_moment.content.company_contribution_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar5_fisherman_touching_moment.content.company_contribution', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar5_fisherman_touching_moment.content.community_support_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar5_fisherman_touching_moment.content.community_support', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Harapan untuk Masa Depan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.mar5_fisherman_touching_moment.content.future_hope_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.mar5_fisherman_touching_moment.content.future_hope_content')}
                    </p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Mar-4 article
    const getMar4TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Kepedulian Perusahaan terhadap Nelayan Papua */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">{t('news_detail.mar4_fisherman_care.content.company_care_title')}</h3>
                    <p className="text-base leading-relaxed text-blue-800">{t('news_detail.mar4_fisherman_care.content.company_care_content')}</p>
                </div>

                {/* Proses Rekomendasi dan Seleksi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar4_fisherman_care.content.selection_process_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar4_fisherman_care.content.selection_process_content')}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.mar4_fisherman_care.content.maria_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">{t('news_detail.mar4_fisherman_care.content.maria_citation')}</cite>
                        </div>
                    </div>
                </div>

                {/* Profil Penerima Bantuan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar4_fisherman_care.content.recipient_profile_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar4_fisherman_care.content.recipient_profile_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar4_fisherman_care.content.fisherman_profile_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar4_fisherman_care.content.fisherman_profile', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar4_fisherman_care.content.previous_condition_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar4_fisherman_care.content.previous_condition', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Spesifikasi Rumah yang Dibangun */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar4_fisherman_care.content.house_specs_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar4_fisherman_care.content.house_specs_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            {t('news_detail.mar4_fisherman_care.content.spec_items', { returnObjects: true }).map((item: any, index: number) => (
                                <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                                        <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                            ></path>
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h4 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h4>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Program CSR yang Komprehensif */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar4_fisherman_care.content.comprehensive_csr_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar4_fisherman_care.content.comprehensive_csr_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar4_fisherman_care.content.development_program_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar4_fisherman_care.content.development_program', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar4_fisherman_care.content.assistance_program_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar4_fisherman_care.content.assistance_program', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dampak Positif bagi Masyarakat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar4_fisherman_care.content.positive_impact_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar4_fisherman_care.content.positive_impact_content')}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-teal-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.mar4_fisherman_care.content.maria_impact_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.mar4_fisherman_care.content.maria_impact_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Komitmen Berkelanjutan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">{t('news_detail.mar4_fisherman_care.content.commitment_title')}</h3>
                    <p className="text-base leading-relaxed text-gray-800">{t('news_detail.mar4_fisherman_care.content.commitment_content')}</p>
                </div>
            </div>
        );
    };
    // Function to get translated content for Mar-3 article
    const getMar3TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Kebahagiaan Nelayan Menerima Rumah Baru */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">
                        {t('news_detail.mar3_fisherman_happiness.content.fisherman_happiness_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.mar3_fisherman_happiness.content.fisherman_happiness_content')}
                    </p>
                </div>

                {/* Proses Rekomendasi dan Seleksi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar3_fisherman_happiness.content.selection_process_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar3_fisherman_happiness.content.selection_process_content')}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.mar3_fisherman_happiness.content.maria_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.mar3_fisherman_happiness.content.maria_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Spesifikasi Rumah yang Dibangun */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar3_fisherman_happiness.content.house_specs_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar3_fisherman_happiness.content.house_specs_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            {t('news_detail.mar3_fisherman_happiness.content.spec_items', { returnObjects: true }).map((item: any, index: number) => (
                                <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                    <h4 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h4>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Timeline Pembangunan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar3_fisherman_happiness.content.timeline_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar3_fisherman_happiness.content.timeline_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar3_fisherman_happiness.content.construction_phase_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar3_fisherman_happiness.content.construction_phase', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar3_fisherman_happiness.content.project_location_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar3_fisherman_happiness.content.project_location', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komitmen Perusahaan terhadap Masyarakat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar3_fisherman_happiness.content.company_commitment_title')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar3_fisherman_happiness.content.company_commitment_content')}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-purple-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.mar3_fisherman_happiness.content.maria_commitment_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.mar3_fisherman_happiness.content.maria_commitment_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Konsistensi Program CSR */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar3_fisherman_happiness.content.csr_consistency_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar3_fisherman_happiness.content.csr_consistency_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar3_fisherman_happiness.content.development_program_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar3_fisherman_happiness.content.development_program', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar3_fisherman_happiness.content.support_program_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar3_fisherman_happiness.content.support_program', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dampak Positif bagi Masyarakat */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar3_fisherman_happiness.content.positive_impact_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar3_fisherman_happiness.content.positive_impact_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            {t('news_detail.mar3_fisherman_happiness.content.impact_items', { returnObjects: true }).map(
                                (item: any, index: number) => (
                                    <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                                            <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                {/* Komitmen Berkelanjutan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">{t('news_detail.mar3_fisherman_happiness.content.commitment_title')}</h3>
                    <p className="text-base leading-relaxed text-gray-800">{t('news_detail.mar3_fisherman_happiness.content.commitment_content')}</p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Mar-2 article
    const getMar2TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Opening Story */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">{t('news_detail.mar2_fisherman_house.content.handover_title')}</h3>
                    <p className="text-base leading-relaxed text-blue-800">{t('news_detail.mar2_fisherman_house.content.handover_content')}</p>
                </div>

                {/* Kebahagiaan Keluarga */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar2_fisherman_house.content.family_happiness_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar2_fisherman_house.content.family_happiness_content')}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.mar2_fisherman_house.content.yustinus_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.mar2_fisherman_house.content.yustinus_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Profil Nelayan Penerima */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar2_fisherman_house.content.fisherman_profile_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar2_fisherman_house.content.fisherman_profile_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar2_fisherman_house.content.personal_info_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar2_fisherman_house.content.personal_info', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar2_fisherman_house.content.house_address_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar2_fisherman_house.content.house_address', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pesan dari Perusahaan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar2_fisherman_house.content.company_message_title')}
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                            <h4 className="mb-3 text-lg font-bold text-blue-900">{t('news_detail.mar2_fisherman_house.content.ktt_title')}</h4>
                            <p className="mb-4 text-base leading-relaxed text-blue-800">
                                {t('news_detail.mar2_fisherman_house.content.anhar_description')}
                            </p>
                            <blockquote className="border-l-4 border-blue-500 pl-4 text-sm text-blue-700 italic">
                                {t('news_detail.mar2_fisherman_house.content.anhar_quote')}
                            </blockquote>
                        </div>
                        <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                            <h4 className="mb-3 text-lg font-bold text-purple-900">{t('news_detail.mar2_fisherman_house.content.pr_title')}</h4>
                            <p className="mb-4 text-base leading-relaxed text-purple-800">
                                {t('news_detail.mar2_fisherman_house.content.maria_description')}
                            </p>
                            <blockquote className="border-l-4 border-purple-500 pl-4 text-sm text-purple-700 italic">
                                {t('news_detail.mar2_fisherman_house.content.maria_quote')}
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Proses Seleksi dan Rekomendasi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar2_fisherman_house.content.selection_process_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar2_fisherman_house.content.selection_process_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            {t('news_detail.mar2_fisherman_house.content.process_steps', { returnObjects: true }).map((item: any, index: number) => (
                                <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                    <h4 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h4>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Spesifikasi Rumah yang Dibangun */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar2_fisherman_house.content.house_specs_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar2_fisherman_house.content.house_specs_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            {t('news_detail.mar2_fisherman_house.content.spec_items', { returnObjects: true }).map((item: any, index: number) => (
                                <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                    <h4 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h4>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Program CSR yang Berkelanjutan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.mar2_fisherman_house.content.csr_program_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.mar2_fisherman_house.content.csr_program_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar2_fisherman_house.content.development_program_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar2_fisherman_house.content.development_program', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.mar2_fisherman_house.content.support_program_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.mar2_fisherman_house.content.support_program', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komitmen Berkelanjutan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">{t('news_detail.mar2_fisherman_house.content.commitment_title')}</h3>
                    <p className="text-base leading-relaxed text-gray-800">{t('news_detail.mar2_fisherman_house.content.commitment_content')}</p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Yustinus Monei article
    const getYustinusMoneiTranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Opening Story */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">{t('news_detail.yustinus_monei_fisherman.content.handover_title')}</h3>
                    <p className="text-base leading-relaxed text-blue-800">{t('news_detail.yustinus_monei_fisherman.content.handover_content')}</p>
                </div>

                {/* Kebahagiaan Keluarga Nelayan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.yustinus_monei_fisherman.content.family_happiness_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.yustinus_monei_fisherman.content.family_happiness_content')}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.yustinus_monei_fisherman.content.yustinus_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.yustinus_monei_fisherman.content.yustinus_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Profil Penerima Bantuan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.yustinus_monei_fisherman.content.recipient_profile_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.yustinus_monei_fisherman.content.recipient_profile_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.yustinus_monei_fisherman.content.profile_details_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.yustinus_monei_fisherman.content.profile_details', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.yustinus_monei_fisherman.content.location_details_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    {t('news_detail.yustinus_monei_fisherman.content.location_details', { returnObjects: true }).map(
                                        (item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pesan dari Perusahaan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.yustinus_monei_fisherman.content.company_message_title')}
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                            <h4 className="mb-3 text-lg font-bold text-blue-900">{t('news_detail.yustinus_monei_fisherman.content.ktt_title')}</h4>
                            <p className="mb-4 text-base leading-relaxed text-blue-800">
                                {t('news_detail.yustinus_monei_fisherman.content.anhar_description')}
                            </p>
                            <blockquote className="border-l-4 border-blue-500 pl-4 text-sm text-blue-700 italic">
                                {t('news_detail.yustinus_monei_fisherman.content.anhar_quote')}
                            </blockquote>
                        </div>
                        <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                            <h4 className="mb-3 text-lg font-bold text-purple-900">{t('news_detail.yustinus_monei_fisherman.content.pr_title')}</h4>
                            <p className="mb-4 text-base leading-relaxed text-purple-800">
                                {t('news_detail.yustinus_monei_fisherman.content.maria_description')}
                            </p>
                            <blockquote className="border-l-4 border-purple-500 pl-4 text-sm text-purple-700 italic">
                                {t('news_detail.yustinus_monei_fisherman.content.maria_quote')}
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Spesifikasi Rumah */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.yustinus_monei_fisherman.content.house_specs_title')}
                    </h3>
                    <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.yustinus_monei_fisherman.content.house_specs_content')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            {t('news_detail.yustinus_monei_fisherman.content.spec_items', { returnObjects: true }).map((item: any, index: number) => (
                                <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                    <h4 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h4>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Komitmen Berkelanjutan */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">{t('news_detail.yustinus_monei_fisherman.content.commitment_title')}</h3>
                    <p className="text-base leading-relaxed text-gray-800">{t('news_detail.yustinus_monei_fisherman.content.commitment_content')}</p>
                </div>
            </div>
        );
    };
    // Function to get translated HTML content for Torindo Sept-3 article
    const getTorindoSept3TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Strategic Opening */}
                <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
                    <p className="mb-4 text-base leading-relaxed text-gray-800">
                        {t('news_detail.torindo_acquisition_sept3.content.strategic_opening')}
                    </p>
                </div>

                {/* Company Excellence */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-emerald-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.torindo_acquisition_sept3.content.portfolio_advantages')}
                    </h3>
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.torindo_acquisition_sept3.content.global_partnerships')}
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                        <span className="text-sm text-gray-700">
                                            {t('news_detail.torindo_acquisition_sept3.content.tata_motors_india')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-teal-500"></div>
                                        <span className="text-sm text-gray-700">
                                            {t('news_detail.torindo_acquisition_sept3.content.fassi_cranes_italy')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                                        <span className="text-sm text-gray-700">
                                            {t('news_detail.torindo_acquisition_sept3.content.marrel_hooklift_france')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm text-gray-700">
                                            {t('news_detail.torindo_acquisition_sept3.content.sdlg_machinery_china')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.torindo_acquisition_sept3.content.integrated_services')}
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        <span className="text-sm text-gray-700">
                                            {t('news_detail.torindo_acquisition_sept3.content.heavy_equipment_distribution')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                                        <span className="text-sm text-gray-700">
                                            {t('news_detail.torindo_acquisition_sept3.content.after_sales_service')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                        <span className="text-sm text-gray-700">
                                            {t('news_detail.torindo_acquisition_sept3.content.hr_consulting')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                                        <span className="text-sm text-gray-700">
                                            {t('news_detail.torindo_acquisition_sept3.content.training_certification')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leadership Vision */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-emerald-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.torindo_acquisition_sept3.content.strategic_leadership_vision')}
                    </h3>
                    <blockquote className="rounded-r-xl border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
                        <p className="mb-3 text-base leading-relaxed text-gray-800 italic">
                            {t('news_detail.torindo_acquisition_sept3.content.leadership_vision_quote')}
                        </p>
                        <cite className="text-sm font-medium text-gray-600">
                            — {t('news_detail.torindo_acquisition_sept3.content.leadership_vision_author')}
                        </cite>
                    </blockquote>
                </div>

                {/* Ownership Structure */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-emerald-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.torindo_acquisition_sept3.content.ownership_structure')}
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                            <h4 className="mb-2 text-2xl font-bold text-emerald-600">51%</h4>
                            <p className="font-semibold text-gray-700">{t('news_detail.torindo_acquisition_sept3.content.armada_bumi_investama')}</p>
                            <p className="text-sm text-gray-600">{t('news_detail.torindo_acquisition_sept3.content.controlling_strategic')}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                            <h4 className="mb-2 text-2xl font-bold text-blue-600">49%</h4>
                            <p className="font-semibold text-gray-700">{t('news_detail.torindo_acquisition_sept3.content.torindo_management')}</p>
                            <p className="text-sm text-gray-600">{t('news_detail.torindo_acquisition_sept3.content.operational_continuity')}</p>
                        </div>
                    </div>
                </div>

                {/* Market Analysis */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-emerald-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.torindo_acquisition_sept3.content.market_analysis_positioning')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.torindo_acquisition_sept3.content.market_analysis_content')}
                        </p>
                        <blockquote className="rounded-r-lg border-l-4 border-orange-500 bg-white p-4">
                            <p className="text-sm text-gray-800 italic">{t('news_detail.torindo_acquisition_sept3.content.market_analysis_quote')}</p>
                        </blockquote>
                    </div>
                </div>

                {/* Strategic Integration */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-emerald-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.torindo_acquisition_sept3.content.integration_value_creation')}
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h4 className="mb-1 text-base font-bold text-gray-900">
                                {t('news_detail.torindo_acquisition_sept3.content.operational_synergy')}
                            </h4>
                            <p className="text-xs text-gray-600">{t('news_detail.torindo_acquisition_sept3.content.operational_synergy_desc')}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945"
                                    />
                                </svg>
                            </div>
                            <h4 className="mb-1 text-base font-bold text-gray-900">
                                {t('news_detail.torindo_acquisition_sept3.content.market_domination')}
                            </h4>
                            <p className="text-xs text-gray-600">{t('news_detail.torindo_acquisition_sept3.content.market_domination_desc')}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                                <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944"
                                    />
                                </svg>
                            </div>
                            <h4 className="mb-1 text-base font-bold text-gray-900">
                                {t('news_detail.torindo_acquisition_sept3.content.service_excellence')}
                            </h4>
                            <p className="text-xs text-gray-600">{t('news_detail.torindo_acquisition_sept3.content.service_excellence_desc')}</p>
                        </div>
                    </div>
                </div>

                {/* Future Outlook */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        {t('news_detail.torindo_acquisition_sept3.content.future_strategic_targets')}
                    </h3>
                    <p className="mb-4 text-base leading-relaxed text-gray-800">
                        {t('news_detail.torindo_acquisition_sept3.content.future_targets_content')}
                    </p>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <h4 className="mb-2 text-base font-bold text-gray-900">
                            {t('news_detail.torindo_acquisition_sept3.content.key_strategic_achievements')}
                        </h4>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                <span className="text-sm text-gray-700">
                                    {t('news_detail.torindo_acquisition_sept3.content.china_heavy_equipment_dominance')}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                <span className="text-sm text-gray-700">
                                    {t('news_detail.torindo_acquisition_sept3.content.comprehensive_after_sales')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Function to get translated content for Feb Sembako Distribution article (feb-7)
    const getFebSembakoDistributionTranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Opening Story */}
                <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-green-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                        </svg>
                        {t('news_detail.feb_sembako_distribution.content.opening_story_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-green-800">
                        {t('news_detail.feb_sembako_distribution.content.opening_story_content')}
                    </p>
                </div>

                {/* Program Details */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_sembako_distribution.content.program_details_title')}
                    </h3>

                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            <strong>Maria Erari</strong>, {t('news_detail.feb_sembako_distribution.content.maria_erari_quote')}
                        </p>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution.content.target_recipients_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution.content.general_community')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution.content.places_of_worship')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution.content.public_service_offices')}</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution.content.distribution_area_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution.content.nifasi_village')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution.content.dani_tribe_orluk')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution.content.kp_mamai_mal')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Package Composition */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_sembako_distribution.content.package_composition_title')}
                    </h3>

                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            <strong>Antonia Erari</strong>, {t('news_detail.feb_sembako_distribution.content.antonia_erari_quote')}
                        </p>

                        <div className="mt-6">
                            <h4 className="mb-3 text-lg font-bold text-gray-900">
                                {t('news_detail.feb_sembako_distribution.content.support_title')}
                            </h4>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3">
                                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-700">{t('news_detail.feb_sembako_distribution.content.rice')}</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3">
                                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-700">{t('news_detail.feb_sembako_distribution.content.eggs')}</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3">
                                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-700">{t('news_detail.feb_sembako_distribution.content.instant_noodles')}</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3">
                                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-700">{t('news_detail.feb_sembako_distribution.content.cooking_oil')}</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3">
                                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-700">{t('news_detail.feb_sembako_distribution.content.flour')}</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3">
                                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-700">{t('news_detail.feb_sembako_distribution.content.laundry_soap')}</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3">
                                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-700">{t('news_detail.feb_sembako_distribution.content.coffee')}</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3">
                                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-700">{t('news_detail.feb_sembako_distribution.content.tea')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Positive Impact */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_sembako_distribution.content.positive_impact_title')}
                    </h3>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                            <div className="mb-3 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution.content.community_welfare')}
                                </h4>
                            </div>
                        </div>
                        <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                            <div className="mb-3 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution.content.social_support')}
                                </h4>
                            </div>
                        </div>
                        <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                            <div className="mb-3 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution.content.economic_relief')}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other CSR Programs */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_sembako_distribution.content.other_csr_programs_title')}
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="mb-2 flex items-center gap-2">
                                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">
                                    {t('news_detail.feb_sembako_distribution.content.housing_development')}
                                </span>
                            </div>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="mb-2 flex items-center gap-2">
                                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">
                                    {t('news_detail.feb_sembako_distribution.content.education_support')}
                                </span>
                            </div>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="mb-2 flex items-center gap-2">
                                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">
                                    {t('news_detail.feb_sembako_distribution.content.healthcare_facilities')}
                                </span>
                            </div>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="mb-2 flex items-center gap-2">
                                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">
                                    {t('news_detail.feb_sembako_distribution.content.infrastructure_development')}
                                </span>
                            </div>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="mb-2 flex items-center gap-2">
                                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">
                                    {t('news_detail.feb_sembako_distribution.content.social_programs')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    // Function to get translated content for Feb Sembako Distribution 2 article (feb-8)
    const getFebSembakoDistribution2TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Opening Story */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-blue-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                        </svg>
                        {t('news_detail.feb_sembako_distribution_2.content.opening_story_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.feb_sembako_distribution_2.content.opening_story_content')}
                    </p>
                </div>

                {/* Program Overview */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_sembako_distribution_2.content.program_overview_title')}
                    </h3>

                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            <strong>Maria Erari</strong>, {t('news_detail.feb_sembako_distribution_2.content.maria_erari_quote')}
                        </p>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution_2.content.target_distribution_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.general_community')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.places_of_worship')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.public_service_offices')}</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution_2.content.distribution_area_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.nifasi_village')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.dani_tribe_orluk')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.kp_mamai_makimi')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.samabusa_waharia_villages')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Program Consistency */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_sembako_distribution_2.content.program_consistency_title')}
                    </h3>

                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.feb_sembako_distribution_2.content.consistency_description')}
                        </p>

                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution_2.content.consistent')}
                                </h4>
                                <p className="text-sm text-gray-600">{t('news_detail.feb_sembako_distribution_2.content.consistent_desc')}</p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                    <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution_2.content.integrated')}
                                </h4>
                                <p className="text-sm text-gray-600">{t('news_detail.feb_sembako_distribution_2.content.integrated_desc')}</p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                                    <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution_2.content.sustainable')}
                                </h4>
                                <p className="text-sm text-gray-600">{t('news_detail.feb_sembako_distribution_2.content.sustainable_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact and Benefits */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_sembako_distribution_2.content.positive_impact_title')}
                    </h3>

                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.feb_sembako_distribution_2.content.impact_description')}
                        </p>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution_2.content.economic_benefits_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                            />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.ease_economic_burden')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                            />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.meet_daily_needs')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.increase_purchasing_power')}</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution_2.content.social_benefits_title')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.strengthen_company_community_relationship')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.improve_social_welfare')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>{t('news_detail.feb_sembako_distribution_2.content.encourage_sustainable_development')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Future Commitment */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_sembako_distribution_2.content.sustainable_commitment_title')}
                    </h3>

                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.feb_sembako_distribution_2.content.commitment_description')}
                        </p>

                        <div className="mt-4 flex items-center gap-3">
                            <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="font-medium text-amber-800">
                                {t('news_detail.feb_sembako_distribution_2.content.consistent_sustainable_csr')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Function to get translated content for Feb Sembako Distribution 3 article (feb-9)
    const getFebSembakoDistribution3TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Opening Story */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-blue-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                        </svg>
                        {t('news_detail.feb_sembako_distribution_3.content.opening_story_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">{t('news_detail.feb_sembako_distribution_3.content.opening_story')}</p>
                </div>

                {/* Program Significance */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_sembako_distribution_3.content.program_significance')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.feb_sembako_distribution_3.content.significance_description')}
                        </p>
                    </div>
                </div>

                {/* Logistics Coordination */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_sembako_distribution_3.content.logistics_coordination')}
                    </h3>
                    <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.feb_sembako_distribution_3.content.coordination_description')}
                        </p>
                    </div>
                </div>

                {/* Community Engagement */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_sembako_distribution_3.content.community_engagement')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.feb_sembako_distribution_3.content.engagement_description')}
                        </p>
                    </div>
                </div>

                {/* Measurable Impact */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_sembako_distribution_3.content.measurable_impact')}
                    </h3>
                    <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <h4 className="mb-3 text-lg font-bold text-gray-900">{t('news_detail.feb_sembako_distribution_3.content.impact_metrics')}</h4>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution_3.content.families_helped_title')}
                                </h4>
                                <p className="text-sm text-gray-600">{t('news_detail.feb_sembako_distribution_3.content.families_helped')}</p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                    <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution_3.content.packages_distributed_title')}
                                </h4>
                                <p className="text-sm text-gray-600">{t('news_detail.feb_sembako_distribution_3.content.packages_distributed')}</p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                                    <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_sembako_distribution_3.content.area_coverage_title')}
                                </h4>
                                <p className="text-sm text-gray-600">{t('news_detail.feb_sembako_distribution_3.content.area_coverage')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Long-term Vision */}
                <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        {t('news_detail.feb_sembako_distribution_3.content.long_term_vision')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">{t('news_detail.feb_sembako_distribution_3.content.vision_text')}</p>
                </div>
            </div>
        );
    };

    // Function to get translated content for Feb House Construction 1 article (jun-4)
    const getFebHouseConstruction1TranslatedContent = () => {
        return (
            <div className="prose prose-lg max-w-none space-y-8">
                {/* Opening Story */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-blue-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                        </svg>
                        {t('news_detail.feb_house_construction_1.content.opening_story_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-800">
                        {t('news_detail.feb_house_construction_1.content.opening_story_content')}
                    </p>
                </div>

                {/* Program CSR Komprehensif */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_house_construction_1.content.comprehensive_csr_title')}
                    </h3>
                    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.feb_house_construction_1.content.comprehensive_csr_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_house_construction_1.content.development_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    <li>{t('news_detail.feb_house_construction_1.content.house_construction')}</li>
                                    <li>{t('news_detail.feb_house_construction_1.content.house_renovation')}</li>
                                    <li>{t('news_detail.feb_house_construction_1.content.church_construction')}</li>
                                    <li>{t('news_detail.feb_house_construction_1.content.education_support')}</li>
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_house_construction_1.content.other_assistance_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    <li>{t('news_detail.feb_house_construction_1.content.basic_food_assistance')}</li>
                                    <li>{t('news_detail.feb_house_construction_1.content.community_vehicles')}</li>
                                    <li>{t('news_detail.feb_house_construction_1.content.church_vehicles')}</li>
                                    <li>{t('news_detail.feb_house_construction_1.content.local_economic_development')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transformasi Desa Nifasi */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_house_construction_1.content.village_transformation_title')}
                    </h3>
                    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.feb_house_construction_1.content.village_transformation_description')}
                        </p>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                                {t('news_detail.feb_house_construction_1.content.maria_erari_quote')}
                            </blockquote>
                            <cite className="mt-2 block text-sm text-gray-600">
                                {t('news_detail.feb_house_construction_1.content.maria_erari_citation')}
                            </cite>
                        </div>
                    </div>
                </div>

                {/* Dampak Ekonomi dan Wisata */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_house_construction_1.content.economic_tourism_impact_title')}
                    </h3>
                    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.feb_house_construction_1.content.economic_tourism_impact_description')}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-gray-800">
                            {t('news_detail.feb_house_construction_1.content.company_commitment')}
                        </p>
                    </div>
                </div>

                {/* Program Berkelanjutan */}
                <div className="space-y-6">
                    <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                        {t('news_detail.feb_house_construction_1.content.sustainable_program_title')}
                    </h3>
                    <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                        <p className="text-base leading-relaxed text-gray-800">
                            {t('news_detail.feb_house_construction_1.content.sustainable_program_description')}
                        </p>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_house_construction_1.content.achievement_program_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    <li>{t('news_detail.feb_house_construction_1.content.house_27_built')}</li>
                                    <li>{t('news_detail.feb_house_construction_1.content.hundreds_food_packages')}</li>
                                    <li>{t('news_detail.feb_house_construction_1.content.uninhabitable_renovation')}</li>
                                    <li>{t('news_detail.feb_house_construction_1.content.church_infrastructure')}</li>
                                </ul>
                            </div>
                            <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                                <h4 className="mb-2 text-lg font-bold text-gray-900">
                                    {t('news_detail.feb_house_construction_1.content.positive_impact_title')}
                                </h4>
                                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                    <li>{t('news_detail.feb_house_construction_1.content.improve_community_welfare')}</li>
                                    <li>{t('news_detail.feb_house_construction_1.content.drive_local_economy')}</li>
                                    <li>{t('news_detail.feb_house_construction_1.content.support_tourism_development')}</li>
                                    <li>{t('news_detail.feb_house_construction_1.content.improve_resident_quality')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Komitmen Masa Depan */}
                <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('news_detail.feb_house_construction_1.content.future_commitment_title')}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news_detail.feb_house_construction_1.content.future_commitment_description')}
                    </p>
                </div>
            </div>
        );
    };

    const getOct1DubaiInvestmentTranslatedContent = () => {
        const currentLang = locale.toLowerCase();

        if (currentLang === 'en') {
            return (
                <div className="space-y-8">
                    {/* Opening Story */}
                    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-emerald-900">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M12 3v12m0 0l-3-3m3 3l3-3"
                                />
                            </svg>
                            International Investment Breakthrough at TEI 2025
                        </h3>
                        <p className="text-base leading-relaxed text-emerald-800">
                            At the prestigious <strong>Trade Expo Indonesia (TEI) 2025</strong> event held at ICE BSD City, Tangerang,{' '}
                            <strong>Kristalin Group</strong> successfully attracted the attention of international investors by securing an investment
                            commitment worth <strong>USD 55 million</strong> or equivalent to <strong>Rp 912 billion</strong> (exchange rate Rp 16,582
                            per USD). This monumental achievement marks a new chapter in the development of Indonesia's sustainable and
                            technology-based gold mining industry.
                        </p>
                    </div>

                    {/* Investment Details */}
                    <div className="space-y-6">
                        <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Details of Investment Commitment</h3>
                        <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                            <p className="mb-6 text-base leading-relaxed text-gray-800">
                                This strategic investment commitment is realized through the signing of two{' '}
                                <strong>Memoranda of Understanding (MoU)</strong> with leading companies from Dubai, United Arab Emirates. This
                                investment is specifically allocated for the development of a <strong>3,500-hectare</strong> gold mining concession
                                located in Nabire, Central Papua.
                            </p>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">SMART IoT LLC</h4>
                                            <p className="text-sm text-gray-600">Dubai, UAE</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700">Investment Value:</span>
                                            <span className="text-2xl font-bold text-blue-600">$35M</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700">IDR Equivalent:</span>
                                            <span className="text-lg font-semibold text-gray-900">Rp 580 Billion</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3">
                                            <p className="text-sm text-gray-600">Focus: IoT Integration & Smart Mining Technology</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">Lobo Investment LLC</h4>
                                            <p className="text-sm text-gray-600">Dubai, UAE</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700">Investment Value:</span>
                                            <span className="text-2xl font-bold text-purple-600">$20M</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700">IDR Equivalent:</span>
                                            <span className="text-lg font-semibold text-gray-900">Rp 332 Billion</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3">
                                            <p className="text-sm text-gray-600">Focus: Strategic Investment & Capital Structuring</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Leadership Vision */}
                    <div className="space-y-6">
                        <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Leadership Vision and Business Strategy</h3>
                        <blockquote className="rounded-r-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
                            <p className="mb-4 text-lg leading-relaxed text-gray-800 italic">
                                "We are not just building a mining project, but building a foundation of trust and a technology-based investment
                                ecosystem that connects Indonesia with the United Arab Emirates. This is a strategic step towards a transparent and
                                sustainable mining future."
                            </p>
                            <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Andito Prasetyowan, President Director of PT Kristalin Eka Lestari
                            </cite>
                        </blockquote>
                    </div>

                    {/* Blockchain Technology Innovation */}
                    <div className="space-y-6">
                        <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                            Blockchain Technology & Sharia Compliance
                        </h3>
                        <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                            <p className="mb-6 text-base leading-relaxed text-gray-800">
                                What distinguishes this ambitious project from conventional investments is the application of{' '}
                                <strong>blockchain technology</strong> that fully complies with <strong>Sharia principles</strong>. Kristalin Group
                                will implement an innovative system that integrates digital technology with Islamic financial rules.
                            </p>
                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-200">
                                        <svg className="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-2 text-center text-base font-bold text-gray-900">Real World Asset Tokenization (RWA)</h4>
                                    <p className="text-center text-sm leading-relaxed text-gray-600">
                                        Digital gold ownership through blockchain tokens that can be traded transparently
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200">
                                        <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-2 text-center text-base font-bold text-gray-900">Smart Contract</h4>
                                    <p className="text-center text-sm leading-relaxed text-gray-600">
                                        Automatic and transparent profit-sharing system that guarantees fairness for all stakeholders
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200">
                                        <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-2 text-center text-base font-bold text-gray-900">Blockchain Tracking</h4>
                                    <p className="text-center text-sm leading-relaxed text-gray-600">
                                        Real-time recording for production, ownership, to end-to-end gold distribution
                                    </p>
                                </div>
                            </div>
                        </div>

                        <blockquote className="rounded-r-xl border-l-4 border-teal-500 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 shadow-sm">
                            <p className="mb-4 text-lg leading-relaxed text-gray-800 italic">
                                "Dubai is the ideal global financial hub for cross-border blockchain-based investments with full compliance to Sharia
                                principles. This business model ensures transparency, security, and adherence to Islamic financial rules."
                            </p>
                            <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Ronald Rigen Tambunan, CEO Kristalin Digital Dubai
                            </cite>
                        </blockquote>
                    </div>

                    {/* Project Development Phases */}
                    <div className="space-y-6">
                        <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Project Development Phases</h3>
                        <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
                            <p className="mb-6 text-base leading-relaxed text-gray-800">
                                The development of the gold mine in Nabire, Central Papua, will be carried out in a phased and structured manner to
                                ensure operational sustainability and positive impact on the local community.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                                        <span className="text-lg font-bold text-amber-600">1</span>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-base font-bold text-gray-900">Exploration Phase</h4>
                                        <p className="text-sm text-gray-600">
                                            Mapping and geological analysis to determine potential gold reserves in the concession area
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                        <span className="text-lg font-bold text-blue-600">2</span>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-base font-bold text-gray-900">Infrastructure Development</h4>
                                        <p className="text-sm text-gray-600">
                                            Construction of mining facilities, processing plants, and operational support infrastructure
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                        <span className="text-lg font-bold text-green-600">3</span>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-base font-bold text-gray-900">Production Phase</h4>
                                        <p className="text-sm text-gray-600">
                                            Gold mining operations with international standards and environmentally friendly practices
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                                        <span className="text-lg font-bold text-purple-600">4</span>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-base font-bold text-gray-900">Asset Tokenization</h4>
                                        <p className="text-sm text-gray-600">
                                            Implementation of blockchain system for digital gold ownership and transaction transparency
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                        <span className="text-lg font-bold text-indigo-600">5</span>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-base font-bold text-gray-900">Export & Distribution</h4>
                                        <p className="text-sm text-gray-600">
                                            Marketing and distribution of gold to global markets with blockchain tracking system
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Economic & Social Impact */}
                    <div className="space-y-6">
                        <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Economic and Social Impact</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Community Empowerment
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm">Job creation for local communities in Central Papua</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm">Training programs and technical skills development</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm">Improving economic capacity of communities around operational areas</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm">Development of social infrastructure and public facilities</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                    Sustainable Governance
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        <span className="text-sm">Operational transparency through blockchain technology</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        <span className="text-sm">Full compliance with international environmental standards</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        <span className="text-sm">Responsible and sustainable mining practices</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        <span className="text-sm">Becoming a global example of transparent mining governance</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Strategic Significance */}
                    <div className="space-y-6">
                        <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Strategic Significance for Indonesia</h3>
                        <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                            <p className="mb-6 text-base leading-relaxed text-gray-800">
                                This investment has profound strategic significance for the development of Indonesia's mining sector, particularly in
                                the context of digital transformation and integration with the global financial ecosystem.
                            </p>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                                        <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M12 3v12m0 0l-3-3m3 3l3-3"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-1 text-sm font-bold text-gray-900">Investment Attractiveness</h4>
                                    <p className="text-xs text-gray-600">Increasing international investor confidence</p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-1 text-sm font-bold text-gray-900">Technology Innovation</h4>
                                    <p className="text-xs text-gray-600">Pioneer of blockchain in the mining sector</p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                                        <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M12 3v12m0 0l-3-3m3 3l3-3m6 6V11a2 2 0 00-2-2h-1M4 11h5"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-1 text-sm font-bold text-gray-900">Global Partnership</h4>
                                    <p className="text-xs text-gray-600">Strengthening Indonesia-UAE relations</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Future Vision & Commitment */}
                    <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
                            <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                            Long-Term Commitment and Future Vision
                        </h3>
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            This USD 55 million investment agreement is not merely a financial transaction, but a long-term commitment to building a
                            sustainable, transparent gold mining ecosystem that delivers real positive impact to the people of Central Papua. By
                            integrating blockchain technology and Sharia principles, Kristalin Group is determined to make Indonesia a global example
                            of responsible gold mining governance.
                        </p>
                        <p className="text-base leading-relaxed text-gray-800">
                            This project is expected to be a catalyst for regional economic development, local community empowerment, and
                            strengthening Indonesia's position on the world gold mining industry map. Through strategic collaboration with Dubai
                            investors and implementation of cutting-edge technology, Kristalin Group is ready to lead Indonesia's mining industry into
                            a more transparent, efficient, and sustainable digital era.
                        </p>
                    </div>
                </div>
            );
        }

        if (currentLang === 'zh') {
            return (
                <div className="space-y-8">
                    {/* Opening Story - Chinese */}
                    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-emerald-900">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M12 3v12m0 0l-3-3m3 3l3-3"
                                />
                            </svg>
                            2025年印尼贸易博览会（TEI）国际投资突破
                        </h3>
                        <p className="text-base leading-relaxed text-emerald-800">
                            在丹格朗ICE BSD城举行的2025年<strong>印尼贸易博览会（TEI）</strong>盛会上，<strong>Kristalin集团</strong>
                            成功吸引了国际投资者的关注，获得了价值<strong>5500万美元</strong>或等值<strong>9120亿印尼盾</strong>
                            （汇率1美元兑16582印尼盾）的投资承诺。这一里程碑式的成就标志着印度尼西亚可持续和技术驱动型黄金采矿业发展的新篇章。
                        </p>
                    </div>

                    {/* Investment Details - Chinese */}
                    <div className="space-y-6">
                        <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">投资承诺详情</h3>
                        <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                            <p className="mb-6 text-base leading-relaxed text-gray-800">
                                这项战略投资承诺是通过与来自阿拉伯联合酋长国迪拜的领先公司签署两份<strong>谅解备忘录（MoU）</strong>
                                实现的。这项投资专门用于开发位于中巴布亚纳比雷的<strong>3500公顷</strong>金矿特许权。
                            </p>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">SMART IoT LLC</h4>
                                            <p className="text-sm text-gray-600">迪拜，阿联酋</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700">投资价值：</span>
                                            <span className="text-2xl font-bold text-blue-600">$35M</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700">印尼盾等值：</span>
                                            <span className="text-lg font-semibold text-gray-900">5800亿印尼盾</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3">
                                            <p className="text-sm text-gray-600">专注：物联网集成和智能采矿技术</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">Lobo Investment LLC</h4>
                                            <p className="text-sm text-gray-600">迪拜，阿联酋</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700">投资价值：</span>
                                            <span className="text-2xl font-bold text-purple-600">$20M</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700">印尼盾等值：</span>
                                            <span className="text-lg font-semibold text-gray-900">3320亿印尼盾</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3">
                                            <p className="text-sm text-gray-600">专注：战略投资和资本结构</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Leadership Vision - Chinese */}
                    <div className="space-y-6">
                        <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">领导愿景和商业战略</h3>
                        <blockquote className="rounded-r-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
                            <p className="mb-4 text-lg leading-relaxed text-gray-800 italic">
                                "我们不仅仅是在建设一个采矿项目，而是在建立信任基础和基于技术的投资生态系统，连接印度尼西亚和阿拉伯联合酋长国。这是迈向透明和可持续采矿未来的战略性一步。"
                            </p>
                            <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Andito Prasetyowan，PT Kristalin Eka Lestari总裁兼董事
                            </cite>
                        </blockquote>
                    </div>

                    {/* Blockchain Technology Innovation - Chinese */}
                    <div className="space-y-6">
                        <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">区块链技术和伊斯兰教法合规</h3>
                        <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                            <p className="mb-6 text-base leading-relaxed text-gray-800">
                                这个雄心勃勃的项目与传统投资的区别在于应用了完全符合<strong>伊斯兰教法原则</strong>的<strong>区块链技术</strong>
                                。Kristalin集团将实施一个创新系统，将数字技术与伊斯兰金融规则相结合。
                            </p>
                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-200">
                                        <svg className="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-2 text-center text-base font-bold text-gray-900">真实世界资产代币化（RWA）</h4>
                                    <p className="text-center text-sm leading-relaxed text-gray-600">通过可透明交易的区块链代币实现数字黄金所有权</p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200">
                                        <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-2 text-center text-base font-bold text-gray-900">智能合约</h4>
                                    <p className="text-center text-sm leading-relaxed text-gray-600">
                                        自动化和透明的利润分配系统，确保所有利益相关者的公平性
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200">
                                        <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-2 text-center text-base font-bold text-gray-900">区块链追踪</h4>
                                    <p className="text-center text-sm leading-relaxed text-gray-600">从生产、所有权到黄金分配的端到端实时记录</p>
                                </div>
                            </div>
                        </div>

                        <blockquote className="rounded-r-xl border-l-4 border-teal-500 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 shadow-sm">
                            <p className="mb-4 text-lg leading-relaxed text-gray-800 italic">
                                "迪拜是理想的全球金融中心，可以进行完全符合伊斯兰教法原则的跨境区块链投资。这种商业模式确保了透明度、安全性和对伊斯兰金融规则的遵守。"
                            </p>
                            <cite className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Ronald Rigen Tambunan，Kristalin Digital Dubai首席执行官
                            </cite>
                        </blockquote>
                    </div>

                    {/* Project Development Phases - Chinese */}
                    <div className="space-y-6">
                        <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">项目开发阶段</h3>
                        <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
                            <p className="mb-6 text-base leading-relaxed text-gray-800">
                                中巴布亚纳比雷金矿的开发将分阶段、有组织地进行，以确保运营的可持续性和对当地社区的积极影响。
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                                        <span className="text-lg font-bold text-amber-600">1</span>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-base font-bold text-gray-900">勘探阶段</h4>
                                        <p className="text-sm text-gray-600">绘制地图和地质分析，以确定特许权区域内潜在的黄金储量</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                        <span className="text-lg font-bold text-blue-600">2</span>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-base font-bold text-gray-900">基础设施建设</h4>
                                        <p className="text-sm text-gray-600">建设采矿设施、加工厂和运营支持基础设施</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                        <span className="text-lg font-bold text-green-600">3</span>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-base font-bold text-gray-900">生产阶段</h4>
                                        <p className="text-sm text-gray-600">按照国际标准和环保实践进行黄金开采作业</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                                        <span className="text-lg font-bold text-purple-600">4</span>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-base font-bold text-gray-900">资产代币化</h4>
                                        <p className="text-sm text-gray-600">实施区块链系统以实现数字黄金所有权和交易透明度</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                        <span className="text-lg font-bold text-indigo-600">5</span>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-base font-bold text-gray-900">出口和分销</h4>
                                        <p className="text-sm text-gray-600">通过区块链跟踪系统向全球市场营销和分销黄金</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Economic & Social Impact - Chinese */}
                    <div className="space-y-6">
                        <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">经济和社会影响</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    社区赋权
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm">为中巴布亚当地社区创造就业机会</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm">培训计划和技术技能发展</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm">提高运营区域周边社区的经济能力</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span className="text-sm">社会基础设施和公共设施的建设</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                    可持续治理
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        <span className="text-sm">通过区块链技术实现运营透明度</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        <span className="text-sm">完全符合国际环境标准</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        <span className="text-sm">负责任和可持续的采矿实践</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        <span className="text-sm">成为透明采矿治理的全球典范</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Strategic Significance - Chinese */}
                    <div className="space-y-6">
                        <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">对印度尼西亚的战略意义</h3>
                        <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
                            <p className="mb-6 text-base leading-relaxed text-gray-800">
                                这项投资对印度尼西亚采矿业的发展具有深远的战略意义，特别是在数字化转型和与全球金融生态系统融合的背景下。
                            </p>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                                        <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M12 3v12m0 0l-3-3m3 3l3-3"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-1 text-sm font-bold text-gray-900">投资吸引力</h4>
                                    <p className="text-xs text-gray-600">增强国际投资者信心</p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-1 text-sm font-bold text-gray-900">技术创新</h4>
                                    <p className="text-xs text-gray-600">采矿业区块链先驱</p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                                        <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M12 3v12m0 0l-3-3m3 3l3-3m6 6V11a2 2 0 00-2-2h-1M4 11h5"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="mb-1 text-sm font-bold text-gray-900">全球合作伙伴关系</h4>
                                    <p className="text-xs text-gray-600">加强印尼-阿联酋关系</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Future Vision & Commitment - Chinese */}
                    <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
                            <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                            长期承诺和未来愿景
                        </h3>
                        <p className="mb-4 text-base leading-relaxed text-gray-800">
                            这项5500万美元的投资协议不仅仅是一项金融交易，而是对建设可持续、透明的黄金开采生态系统的长期承诺，为中巴布亚人民带来真正的积极影响。通过整合区块链技术和伊斯兰教法原则，Kristalin集团决心使印度尼西亚成为负责任黄金开采治理的全球典范。
                        </p>
                        <p className="text-base leading-relaxed text-gray-800">
                            该项目预计将成为区域经济发展、当地社区赋权和加强印度尼西亚在世界黄金开采行业地位的催化剂。通过与迪拜投资者的战略合作和尖端技术的实施，Kristalin集团已准备好带领印度尼西亚采矿业进入更透明、高效和可持续的数字时代。
                        </p>
                    </div>
                </div>
            );
        }

        // Default: Indonesian (original content)
        return null; // Will use the HTML content from fullContent in news.tsx
    };

    // December - Rice Mill Article 1
    const getDecRiceMill1TranslatedContent = () => {
        return `
            <div class="space-y-8">
                <!-- Opening Story -->
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <h3 class="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        ${t('news_detail.dec_abs_rice_mill_1.opening_title')}
                    </h3>
                    <p class="text-green-800 leading-relaxed text-base">
                        ${t('news_detail.dec_abs_rice_mill_1.opening_content')}
                    </p>
                </div>

                <!-- Production Capacity -->
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_1.production_title')}</h3>
                    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                            ${t('news_detail.dec_abs_rice_mill_1.production_content')}
                        </p>
                        <div class="grid md:grid-cols-2 gap-6 mt-6">
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h4 class="text-lg font-bold text-gray-900 mb-3">${t('news_detail.dec_abs_rice_mill_1.current_capacity')}</h4>
                                <ul class="list-disc space-y-2 pl-5 text-gray-700">
                                    ${(Array.isArray(t('news_detail.dec_abs_rice_mill_1.current_capacity_items', { returnObjects: true }))
                                        ? t('news_detail.dec_abs_rice_mill_1.current_capacity_items', { returnObjects: true })
                                        : ['30 hectares of existing rice fields', 'Semi-machining technology', 'Daily production: up to 10 tons']
                                    )
                                        .map((item: string) => `<li>${item}</li>`)
                                        .join('')}
                                </ul>
                            </div>
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h4 class="text-lg font-bold text-gray-900 mb-3">${t('news_detail.dec_abs_rice_mill_1.expansion_plan')}</h4>
                                <ul class="list-disc space-y-2 pl-5 text-gray-700">
                                    ${(Array.isArray(t('news_detail.dec_abs_rice_mill_1.expansion_plan_items', { returnObjects: true }))
                                        ? t('news_detail.dec_abs_rice_mill_1.expansion_plan_items', { returnObjects: true })
                                        : ['Target: 130 hectares by 2026', 'Enhanced food security', 'Improved farmer welfare']
                                    )
                                        .map((item: string) => `<li>${item}</li>`)
                                        .join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Location and Quality -->
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_1.location_title')}</h3>
                    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                            ${t('news_detail.dec_abs_rice_mill_1.location_content')}
                        </p>
                    </div>
                </div>

                <!-- Technology and Process -->
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_1.technology_title')}</h3>
                    <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                            ${t('news_detail.dec_abs_rice_mill_1.technology_content')}
                        </p>
                    </div>
                </div>

                <!-- Collaboration -->
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_1.collaboration_title')}</h3>
                    <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                            ${t('news_detail.dec_abs_rice_mill_1.collaboration_content')}
                        </p>
                    </div>
                </div>
            </div>
        `;
    };

    // December - Rice Mill Article 2
    const getDecRiceMill2TranslatedContent = () => {
        return `
            <div class="space-y-8">
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <h3 class="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        ${t('news_detail.dec_abs_rice_mill_2.opening_title')}
                    </h3>
                    <p class="text-green-800 leading-relaxed text-base">
                        ${t('news_detail.dec_abs_rice_mill_2.opening_content')}
                    </p>
                </div>
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_2.facility_title')}</h3>
                    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                            ${t('news_detail.dec_abs_rice_mill_2.facility_content')}
                        </p>
                        <div class="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <blockquote class="border-l-4 border-amber-500 pl-4 text-lg italic text-gray-700">
                                ${t('news_detail.dec_abs_rice_mill_2.facility_quote')}
                            </blockquote>
                            <cite class="mt-2 block text-sm text-gray-600">${t('news_detail.dec_abs_rice_mill_2.facility_quote_author')}</cite>
                        </div>
                    </div>
                </div>
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_2.expansion_title')}</h3>
                    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                            ${t('news_detail.dec_abs_rice_mill_2.expansion_content')}
                        </p>
                        <div class="grid md:grid-cols-2 gap-6 mt-6">
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h4 class="text-lg font-bold text-gray-900 mb-3">${t('news_detail.dec_abs_rice_mill_2.current_status')}</h4>
                                <ul class="list-disc space-y-2 pl-5 text-gray-700">
                                    ${(Array.isArray(t('news_detail.dec_abs_rice_mill_2.current_status_items', { returnObjects: true }))
                                        ? t('news_detail.dec_abs_rice_mill_2.current_status_items', { returnObjects: true })
                                        : ['30 hectares operational', 'Daily production: 10 tons', 'Semi-machining technology']
                                    )
                                        .map((item: string) => `<li>${item}</li>`)
                                        .join('')}
                                </ul>
                            </div>
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h4 class="text-lg font-bold text-gray-900 mb-3">${t('news_detail.dec_abs_rice_mill_2.target_2026')}</h4>
                                <ul class="list-disc space-y-2 pl-5 text-gray-700">
                                    ${(Array.isArray(t('news_detail.dec_abs_rice_mill_2.target_2026_items', { returnObjects: true }))
                                        ? t('news_detail.dec_abs_rice_mill_2.target_2026_items', { returnObjects: true })
                                        : ['130 hectares total', 'Enhanced food security', 'Increased farmer participation']
                                    )
                                        .map((item: string) => `<li>${item}</li>`)
                                        .join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_2.participation_title')}</h3>
                    <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                            ${t('news_detail.dec_abs_rice_mill_2.participation_content')}
                        </p>
                    </div>
                </div>
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_2.partnership_title')}</h3>
                    <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                            ${t('news_detail.dec_abs_rice_mill_2.partnership_content')}
                        </p>
                    </div>
                </div>
            </div>
        `;
    };

    // December - Rice Mill Article 3
    const getDecRiceMill3TranslatedContent = () => {
        return `
            <div class="space-y-8">
                <!-- Opening Story -->
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <h3 class="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        ${t('news_detail.dec_abs_rice_mill_3.opening_title')}
                    </h3>
                    <p class="text-green-800 leading-relaxed text-base">
                        ${t('news_detail.dec_abs_rice_mill_3.opening_content')}
                    </p>
                </div>

                <!-- Impact on Farmers -->
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_3.prosperity_title')}</h3>
                    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                            ${t('news_detail.dec_abs_rice_mill_3.prosperity_content')}
                        </p>
                        <div class="grid md:grid-cols-3 gap-6 mt-6">
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                <div class="text-3xl font-bold text-amber-600 mb-2">10 ${t('news_detail.dec_abs_rice_mill_3.daily_production')}</div>
                                <div class="text-sm text-gray-600">Ton</div>
                            </div>
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                <div class="text-3xl font-bold text-green-600 mb-2">30 Ha</div>
                                <div class="text-sm text-gray-600">${t('news_detail.dec_abs_rice_mill_3.current_fields')}</div>
                            </div>
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                <div class="text-3xl font-bold text-blue-600 mb-2">130 Ha</div>
                                <div class="text-sm text-gray-600">${t('news_detail.dec_abs_rice_mill_3.expansion_target')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Agricultural Development -->
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_3.development_title')}</h3>
                    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                            ${t('news_detail.dec_abs_rice_mill_3.development_content')}
                        </p>
                        <div class="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h4 class="text-lg font-bold text-gray-900 mb-3">${t('news_detail.dec_abs_rice_mill_3.why_boyolali')}</h4>
                            <ul class="list-disc space-y-2 pl-5 text-gray-700">
                                ${(Array.isArray(t('news_detail.dec_abs_rice_mill_3.why_boyolali_items', { returnObjects: true }))
                                    ? t('news_detail.dec_abs_rice_mill_3.why_boyolali_items', { returnObjects: true })
                                    : [
                                          'Known as a premium rice barn region',
                                          'High-quality rice production',
                                          'Strategic location for agricultural development',
                                          'Strong farmer community and cooperatives',
                                      ]
                                )
                                    .map((item: string) => `<li>${item}</li>`)
                                    .join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Community Welfare -->
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_3.welfare_title')}</h3>
                    <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                            ${t('news_detail.dec_abs_rice_mill_3.welfare_content')}
                        </p>
                    </div>
                </div>

                <!-- Market Access -->
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_3.market_title')}</h3>
                    <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                        <p class="text-base leading-relaxed text-gray-800 mb-4">
                            ${t('news_detail.dec_abs_rice_mill_3.market_content')}
                        </p>
                    </div>
                </div>

                <!-- Gallery Section - Metro News Images -->
                <div class="space-y-6">
                    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">${t('news_detail.dec_abs_rice_mill_3.gallery_title')}</h3>
                    <div class="grid gap-6 md:grid-cols-2">
                        <div class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl">
                            <div class="relative h-64 overflow-hidden bg-gray-100">
                                <img
                                    src="/images/metronews_desember.jpeg"
                                    alt="Rice Milling Facility in Boyolali - Metro TV News"
                                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                            </div>
                            <div class="p-4">
                                <p class="text-xs font-medium text-gray-600">Foto: Metro TV News</p>
                            </div>
                        </div>
                        <div class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl">
                            <div class="relative h-64 overflow-hidden bg-gray-100">
                                <img
                                    src="/images/metronews_desember2.jpeg"
                                    alt="Rice Milling Facility Operations - Metro TV News"
                                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                            </div>
                            <div class="p-4">
                                <p class="text-xs font-medium text-gray-600">Foto: Metro TV News</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    useEffect(() => {
        // Find the news item by ID
        const findNewsItem = () => {
            for (const monthData of newsData) {
                for (const categoryData of monthData.categories) {
                    const foundItem = categoryData.newsItems.find((item) => item.id === id);
                    if (foundItem) {
                        setNewsItem(foundItem);
                        setCategory(categoryData);
                        setLoading(false);
                        return;
                    }
                }
            }
            setLoading(false);
        };

        findNewsItem();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-amber-500"></div>
                    <p className="text-gray-600">{t('news_detail.loading')}</p>
                </div>
            </div>
        );
    }
    if (!newsItem) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
                <Header />
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <div className="mb-4 text-6xl">📰</div>
                        <h1 className="mb-2 text-2xl font-bold text-gray-900">{t('news_detail.article_not_found')}</h1>
                        <p className="mb-6 text-gray-600">{t('news_detail.article_not_available')}</p>
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-white transition-colors hover:bg-amber-600"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            {t('news_detail.back_to_news')}
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
            <Header sticky={true} />

            {/* Enhanced Breadcrumb Navigation */}
            <div className="border-b border-gray-200/60 bg-white/80 shadow-sm backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="group flex items-center gap-2 text-gray-500 transition-colors duration-200 hover:text-amber-600">
                            <Home className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5">{t('news_detail.home')}</span>
                        </Link>
                        <span className="text-gray-300">/</span>
                        <Link href="/news" className="group text-gray-500 transition-colors duration-200 hover:text-amber-600">
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5">{t('news_detail.news')}</span>
                        </Link>
                        <span className="text-gray-300">/</span>
                        <span className="max-w-xs truncate font-medium text-gray-900 sm:max-w-none">
                            {getTranslatedContent(id)?.title || newsItem.title}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Enhanced Article Header */}
            <div className="relative overflow-hidden bg-transparent">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                ></div>
                <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-center"
                    >
                        {/* Optimized Category Badge */}
                        {category && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-2 text-xs font-semibold text-amber-800 shadow-md ring-1 ring-amber-200/50"
                            >
                                <span className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-amber-500 to-yellow-500"></span>
                                {getTranslatedContent(id)?.categoryTitle || category.title}
                            </motion.div>
                        )}

                        {/* Optimized Article Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-6 text-2xl leading-tight font-bold text-gray-900 sm:text-3xl lg:text-4xl"
                        >
                            <span className="bg-gradient-to-r from-gray-900 via-amber-800 to-yellow-700 bg-clip-text text-transparent">
                                {getTranslatedContent(id)?.title || newsItem.fullContent?.title || newsItem.title}
                            </span>
                        </motion.h1>

                        {/* Optimized Article Meta */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600"
                        >
                            <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm">
                                <Calendar className="h-4 w-4 text-amber-600" />
                                <span className="font-medium">{getTranslatedContent(id)?.date || newsItem.fullContent?.date || newsItem.date}</span>
                            </div>
                            {(getTranslatedContent(id)?.author || newsItem.fullContent?.author) && (
                                <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm">
                                    <User className="h-4 w-4 text-amber-600" />
                                    <span className="font-medium">
                                        {t('news_detail.by')}: {getTranslatedContent(id)?.author || newsItem.fullContent.author}
                                    </span>
                                </div>
                            )}
                            {(getTranslatedContent(id)?.source || newsItem.fullContent?.source) && (
                                <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm">
                                    <ExternalLink className="h-4 w-4 text-amber-600" />
                                    <span className="font-medium">
                                        {t('news_detail.source')}: {getTranslatedContent(id)?.source || newsItem.fullContent.source}
                                    </span>
                                </div>
                            )}
                        </motion.div>

                        {/* Optimized Back Button */}
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                            <button
                                onClick={() => {
                                    // Use router.visit to navigate to news page (scroll to top)
                                    router.visit('/news', {
                                        preserveScroll: false,
                                        preserveState: false,
                                        replace: true,
                                        onSuccess: () => {
                                            // Scroll to top of news page
                                            setTimeout(() => {
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: 'smooth',
                                                });
                                            }, 100);
                                        },
                                    });
                                }}
                                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
                            >
                                <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                                <span>{t('news_detail.back_to_news_list')}</span>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Optimized Article Content */}
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {newsItem.fullContent ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200/50"
                    >
                        {/* Enhanced Article Image */}
                        {newsItem.fullContent.image && (
                            <div className="group relative overflow-hidden bg-gray-100">
                                <img
                                    src={newsItem.fullContent.image}
                                    alt={getTranslatedContent(id)?.title || newsItem.fullContent.title}
                                    className="h-64 w-full object-contain object-center transition-transform duration-500 group-hover:scale-105 sm:h-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                                <div className="absolute right-3 bottom-3 left-3">
                                    <div className="flex items-center gap-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
                                        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></div>
                                        <span>Foto: {getTranslatedContent(id)?.source || newsItem.fullContent.source}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Enhanced Article Meta Bar */}
                        <div className="border-b border-gray-200/60 bg-gradient-to-r from-amber-50/60 to-yellow-50/60 px-6 py-4 backdrop-blur-sm">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                                    <span className="font-medium">{t('news_detail.verified_article')}</span>
                                </div>
                                {newsItem.fullContent.sourceUrl && (
                                    <a
                                        href={newsItem.fullContent.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-12" />
                                        <span>
                                            {t('news_detail.read_at')} {getTranslatedContent(id)?.source || newsItem.fullContent.source}
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Enhanced Article Content */}
                        <div className="px-6 py-8 sm:px-8 sm:py-10">
                            {getTranslatedContent(id)?.content ? (
                                <div
                                    className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight prose-headings:mb-4 prose-headings:mt-6 prose-p:text-gray-800 prose-p:leading-relaxed prose-p:text-base prose-p:mb-4 prose-strong:text-gray-900 prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-amber-50 prose-blockquote:to-yellow-50 prose-blockquote:text-gray-800 prose-blockquote:font-medium prose-blockquote:rounded-r-lg prose-blockquote:p-4 prose-blockquote:my-6 prose-ul:text-gray-800 prose-li:text-gray-800 prose-li:leading-relaxed prose-li:mb-1 prose-a:text-amber-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-img:ring-1 prose-img:ring-gray-200/50 max-w-none"
                                    dangerouslySetInnerHTML={{ __html: getTranslatedContent(id)?.content || '' }}
                                />
                            ) : newsItem.fullContent?.content ? (
                                <div
                                    className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight prose-headings:mb-4 prose-headings:mt-6 prose-p:text-gray-800 prose-p:leading-relaxed prose-p:text-base prose-p:mb-4 prose-strong:text-gray-900 prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-amber-50 prose-blockquote:to-yellow-50 prose-blockquote:text-gray-800 prose-blockquote:font-medium prose-blockquote:rounded-r-lg prose-blockquote:p-4 prose-blockquote:my-6 prose-ul:text-gray-800 prose-li:text-gray-800 prose-li:leading-relaxed prose-li:mb-1 prose-a:text-amber-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-img:ring-1 prose-img:ring-gray-200/50 max-w-none"
                                    dangerouslySetInnerHTML={{ __html: newsItem.fullContent.content }}
                                />
                            ) : null}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-2xl bg-white p-8 text-center shadow-lg"
                    >
                        <div className="mb-6 text-6xl">📰</div>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">{getTranslatedContent(id)?.title || newsItem.title}</h2>
                        <p className="mb-6 text-lg text-gray-600">{getTranslatedContent(id)?.excerpt || newsItem.excerpt}</p>
                        <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{getTranslatedContent(id)?.date || newsItem.date}</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Enhanced Related Articles */}
            {category && category.newsItems.length > 1 && (
                <div className="bg-transparent">
                    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                            <div className="mb-8 text-center">
                                <h3 className="mb-3 text-2xl font-bold text-gray-900">{t('news_detail.related_articles')}</h3>
                                <div className="mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500"></div>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                {category.newsItems
                                    .filter((item) => item.id !== newsItem.id)
                                    .slice(0, 2)
                                    .map((relatedItem, index) => (
                                        <motion.div
                                            key={relatedItem.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                        >
                                            <Link
                                                href={'/news/' + relatedItem.id}
                                                className="group block rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 transition-transform duration-200 group-hover:scale-110">
                                                            <svg
                                                                className="h-5 w-5 text-amber-600"
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
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-amber-700">
                                                            {getTranslatedContent(relatedItem.id)?.title || relatedItem.title}
                                                        </h4>
                                                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                                            {getTranslatedContent(relatedItem.id)?.excerpt || relatedItem.excerpt}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <Calendar className="h-4 w-4 text-amber-500" />
                                                            <span className="font-medium">
                                                                {getTranslatedContent(relatedItem.id)?.date || relatedItem.date}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-all duration-200 group-hover:scale-110 group-hover:bg-amber-100">
                                                            <svg
                                                                className="h-4 w-4 text-gray-400 transition-colors duration-200 group-hover:text-amber-600"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default NewsDetail;
