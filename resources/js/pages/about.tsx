import React, { useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  // Ref untuk panel kanan agar auto scroll ke top saat navigasi
  const rightPanelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (rightPanelRef.current) rightPanelRef.current.scrollTop = 0;
  }, []);

  // Scroll otomatis ke anchor di panel kanan
  useEffect(() => {
    if (!rightPanelRef.current) return;
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const target = rightPanelRef.current.querySelector(`#${id}`);
      if (target && target instanceof HTMLElement) {
        rightPanelRef.current.scrollTo({
          top: target.offsetTop - 24, // sedikit offset agar tidak terlalu mepet
          behavior: 'smooth',
        });
      }
    }
  }, [typeof window !== 'undefined' && window.location.hash]);

  // Ukuran header dan footer (px) - sesuaikan jika tinggi header/footer berubah
  const HEADER_HEIGHT = 80; // px
  const FOOTER_HEIGHT = 40; // px

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      {/* Konten utama split kiri-kanan, tinggi = viewport - header - footer */}
      <div
        className="flex w-full"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}
      >
        {/* Left Side - Fixed Image with overlay text */}
        <div className="w-1/2 relative bg-black h-full flex-shrink-0">
          <img 
            src="https://agincourtresources.com/wp-content/uploads/2020/11/Peran-Pertambangan-Emas-Terhadap-Ekonomi-1.jpg"
            alt="Papua Forest"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute bottom-16 left-16">
            <h1 className="text-white text-5xl font-light leading-tight">
              About Kristalin<br />
              <span className="font-normal">Eka Lestari</span>
            </h1>
          </div>
        </div>
        {/* Right Side - Scrollable White Panel (matching website theme) */}
        <div className="w-1/2 bg-white relative h-full flex-shrink-0">
          {/* Yellow accent stripe */}
          <div className="absolute top-0 right-0 w-2 h-full bg-yellow-500 z-10"></div>
          {/* Scrollable Content */}
          <div
            ref={rightPanelRef}
            className="h-full overflow-y-auto"
            style={{ maxHeight: '100%', padding: '4rem' }}
          >
            <div className="text-gray-800">
              {/* Section: Company Overview (isi utama baru) */}
              <div id="company-overview" className="mb-8">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                About Kristalin Eka Lestari

                </h2>
                <div className="w-16 h-1 bg-yellow-500"></div>
                <div className="space-y-8 text-lg leading-relaxed mt-8">
                  <p className="text-gray-700">
                    Established as <span className="font-semibold text-gray-900">PT Kristalin Eka Lestari</span> on 1989, 
                    PT Kristalin Eka Lestari remains a privately owned company headquartered in Jakarta. 
                    The founder, chairman and largest shareholder actively operating in the 
                    <span className="text-yellow-600 font-semibold"> mining industry</span>, specifically in 
                    <span className="text-yellow-600 font-semibold"> exploration and gold mining</span> operational 
                    production sector located in Nabire, Papua.
                  </p>
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
                  {/* Additional Content for Scrolling */}
                  <div className="mt-12 space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Operations</h3>
                      <div className="w-12 h-0.5 bg-yellow-500 mb-4"></div>
                      <p className="text-gray-700">
                        Located in the resource-rich region of Nabire, Papua, our mining operations 
                        focus on sustainable alluvial gold extraction. We employ modern mining 
                        techniques that minimize environmental impact while maximizing operational 
                        efficiency and safety standards.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">International Partnerships</h3>
                      <div className="w-12 h-0.5 bg-yellow-500 mb-4"></div>
                      <p className="text-gray-700">
                        Our strategic alliances with Chinese and Korean investors bring cutting-edge 
                        technology and expertise to our operations. These partnerships enable us to 
                        access world-class mining equipment, advanced processing techniques, and 
                        international best practices in the mining industry.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">Commitment to Excellence</h3>
                      <div className="w-12 h-0.5 bg-yellow-500 mb-4"></div>
                      <p className="text-gray-700">
                        Since our establishment in 1989, we have maintained our commitment to 
                        operational excellence, environmental responsibility, and community 
                        development. Our approach combines traditional mining knowledge with 
                        modern technology to create sustainable value for all stakeholders.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">Environmental Stewardship</h3>
                      <div className="w-12 h-0.5 bg-yellow-500 mb-4"></div>
                      <p className="text-gray-700">
                        We recognize the importance of environmental protection in our operations. 
                        Our mining practices are designed to minimize ecological impact while 
                        contributing to local economic development. We actively engage with local 
                        communities to ensure our operations benefit the people of Papua.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">Future Vision</h3>
                      <div className="w-12 h-0.5 bg-yellow-500 mb-4"></div>
                      <p className="text-gray-700">
                        Looking ahead, PT Kristalin Eka Lestari continues to explore new 
                        opportunities for growth and expansion. We remain committed to innovation, 
                        sustainability, and creating lasting value for our stakeholders while 
                        maintaining our position as a leading mining company in Indonesia.
                      </p>
                    </div>
                  </div>
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