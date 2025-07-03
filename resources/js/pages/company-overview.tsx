import React, { useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CompanyOverview() {
  const rightPanelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (rightPanelRef.current) rightPanelRef.current.scrollTop = 0;
  }, []);

  const HEADER_HEIGHT = 80; // px
  const FOOTER_HEIGHT = 40; // px

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div
        className="flex w-full"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}
      >
        {/* Left Side - Fixed Image with overlay text */}
        <div className="w-1/2 relative bg-black h-full flex-shrink-0">
          <img 
            src="https://m-mtoday.com/wp-content/uploads/sites/12/2023/10/benefits-of-gold-mining-image.jpeg"
            alt="Papua Forest"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute bottom-16 left-16">
            <h1 className="text-white text-5xl font-light leading-tight">
              Company<br />
              <span className="font-normal">Overview</span>
            </h1>
          </div>
        </div>
        {/* Right Side - Scrollable White Panel */}
        <div className="w-1/2 bg-white relative h-full flex-shrink-0">
          <div className="absolute top-0 right-0 w-2 h-full bg-yellow-500 z-10"></div>
          <div
            ref={rightPanelRef}
            className="h-full overflow-y-auto"
            style={{ maxHeight: '100%', padding: '4rem' }}
          >
            <div className="text-gray-800">
              <div className="mb-8">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Company Overview
                </h2>
                <div className="w-16 h-1 bg-yellow-500"></div>
                <div className="space-y-8 text-lg leading-relaxed mt-8">
                  <div className="mb-8">
                    <span className="font-bold text-gray-900 block mb-2">Company Goals.</span>
                    <p className="text-gray-700">
                      The company was established to operate business activities in the mining and processing sector.
                    </p>
                  </div>
                  <div className="mb-8">
                    <span className="font-bold text-gray-900 block mb-2">Natural Resources.</span>
                    <p className="text-gray-700">
                      PT Kristalin Eka Lestari is a mining company focused on the exploration and exploitation of Indonesia's rich natural resources, particularly in Nabire, Papua.
                    </p>
                    <p className="text-gray-700 mt-2">
                      Through this vision, PT Kristalin Eka Lestari aims to collaborate with both local and foreign investors to optimize the mining sector. Our noble purpose is to improve both the local and national economies through responsible and innovative mining practices.
                    </p>
                  </div>
                  <p className="text-gray-700">
                    The company operates hand in hand with <strong className="text-gray-900">local partners</strong> as well as 
                    <strong className="text-gray-900"> foreign investors</strong>, namely <strong className="text-gray-900">China and Korea</strong> in exploring 
                    potential mining sites. These partnerships range from providers of world-renowned heavy equipment 
                    products and services brands to advanced mining technology, integrated 
                    solutions from upstream to downstream operations.
                  </p>
                  <p className="text-gray-700">
                    PT Kristalin Eka Lestari is committed to continuous innovation in order 
                    to refine its internal business processes within as well as between its 
                    operational sites as part of its effort to give customers optimal 
                    satisfaction. This commitment has positioned PT Kristalin Eka Lestari 
                    and its stakeholders at the forefront for opportunities in achieving 
                    shared goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 