import{r as p,j as e,t as w}from"./vendor-P49JfQR6.js";import{u as k}from"./useTranslation-afYoYWtc.js";import{i as s}from"./assets-ZAgbBrkL.js";import{A as h}from"./index-BW4ZeWlm.js";import{m as g}from"./proxy-DMv9ObBM.js";import"./ui-DW48STyt.js";const j=`
          @keyframes containerFade {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes staggeredFadeScale {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
              filter: blur(2px);
            }
            60% {
              opacity: 0.8;
              transform: translateY(5px) scale(0.98);
              filter: blur(1px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }

          @keyframes premiumFadeIn {
            0% {
              opacity: 0;
              transform: translateY(15px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes newsSlideIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
          }

          .animate-containerFade {
            animation: containerFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .animate-staggeredFadeScale {
            opacity: 0;
            animation: staggeredFadeScale 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .animate-premiumFadeIn {
            animation: premiumFadeIn 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* Delay Classes for Staggered Effect */
          .delay-0 {
            animation-delay: 0ms;
          }

          .delay-200 {
            animation-delay: 200ms;
          }

          .delay-400 {
            animation-delay: 400ms;
          }

          .delay-600 {
            animation-delay: 600ms;
          }

          .delay-800 {
            animation-delay: 800ms;
          }

          /* Hover Enhancement */
          .hover-enhance {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .hover-enhance:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }

          /* Custom scrollbar styling */
          .overflow-y-auto::-webkit-scrollbar {
            width: 8px;
          }

          .overflow-y-auto::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }

          /* Enhanced input focus states */
          input:focus, select:focus, textarea:focus {
            box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
          }

          /* File upload hover effects */
          .border-dashed:hover {
            border-color: #f59e0b;
            background-color: #fef3c7;
          }

          .welcome-below-fold button:hover {
            transform: translateY(-1px);
          }

          .welcome-below-fold button:active {
            transform: translateY(0);
          }

          /* Tab animation */
          .border-b-3 {
            border-bottom-width: 3px;
          }

          /* Modal backdrop */
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }

          /* Mobile responsive improvements */
          @media (max-width: 640px) {
            .line-clamp-2 {
              -webkit-line-clamp: 2;
            }

            .line-clamp-3 {
              -webkit-line-clamp: 2;
            }
          }

          /* Additional responsive utilities */
          @media (max-width: 1024px) {
            .lg\\\\:h-\\\\[400px\\\\] {
              height: auto;
              min-height: 400px;
            }

            .lg\\\\:h-\\\\[300px\\\\] {
              height: auto;
              min-height: 300px;
            }
          }

          @media (max-width: 768px) {
            .md\\\\:h-\\\\[350px\\\\] {
              height: auto;
              min-height: 350px;
            }

            .md\\\\:h-\\\\[250px\\\\] {
              height: auto;
              min-height: 250px;
            }
          }

          /* Responsive section heights */
          @media (max-width: 1023px) {
            .welcome-below-fold {
              height: auto !important;
            }

            .welcome-below-fold > div {
              min-height: 300px;
            }
          }

          /* Custom responsive button layout - Desktop left, mobile center */
          @media (max-width: 639px) {
            /* Mobile phones - buttons stacked vertically, centered */
            .button-container {
              flex-direction: column !important;
              align-items: center !important;
              justify-content: center !important;
            }
          }

          @media (min-width: 640px) and (max-width: 1023px) {
            /* Tablets (iPad, iPad Air, etc.) - buttons horizontal, centered */
            .button-container {
              flex-direction: row !important;
              align-items: center !important;
              justify-content: center !important;
              gap: 1rem !important;
            }
          }

          @media (min-width: 1024px) {
            /* Desktop - buttons horizontal, left-aligned */
            .button-container {
              flex-direction: row !important;
              align-items: center !important;
              justify-content: flex-start !important;
              gap: 1rem !important;
            }
          }

          /* Responsive button alignment */
          .button-container {
            align-items: center !important;
          }

          @media (min-width: 1024px) {
            .button-container {
              justify-content: flex-start !important;
            }
          }

          @media (max-width: 640px) {
            .welcome-below-fold > div {
              min-height: 250px;
            }

            .welcome-below-fold .text-2xl {
              font-size: 1.75rem;
            }

            .welcome-below-fold .text-3xl {
              font-size: 2rem;
            }

            .welcome-below-fold .text-4xl {
              font-size: 2.25rem;
            }
          }

          /* Scoped transitions (below-fold only; avoids main-thread cost on hero) */
          .welcome-below-fold * {
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          }

          /* Enhanced hover states for cards */
          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          .welcome-below-fold img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }

          /* Typography responsive scaling */
          @media (max-width: 480px) {
            h1 {
              line-height: 1.1;
            }

            h2, h3 {
              line-height: 1.2;
            }

            p {
              line-height: 1.5;
            }
          }

          /* Loading states */
          .loading {
            opacity: 0.7;
            pointer-events: none;
          }

          .welcome-below-fold *:focus {
            outline: 2px solid #fbbf24;
            outline-offset: 2px;
          }

          /* Print styles */
          @media print {
            .no-print {
              display: none !important;
            }

            * {
              color: black !important;
              background: white !important;
            }
          }

          /* High contrast mode support */
          @media (prefers-contrast: high) {
            .text-gray-600 {
              color: #000000 !important;
            }

            .text-gray-800 {
              color: #000000 !important;
            }

            .bg-yellow-400 {
              background-color: #000000 !important;
              color: #ffffff !important;
            }
          }

          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            .welcome-below-fold * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          /* Dark mode support (if needed in future) */
          @media (prefers-color-scheme: dark) {
            .dark-mode-ready {
              background-color: #1f2937;
              color: #f9fafb;
            }
          }

          /* Performance optimizations */
          .will-change-transform {
            will-change: transform;
          }

          .will-change-opacity {
            will-change: opacity;
          }

          /* GPU acceleration for smooth animations */
          .gpu-accelerated {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000;
          }

          /* Perspective utilities for 3D effects */
          .perspective-1000 {
            perspective: 1000px;
          }

          .perspective-500 {
            perspective: 500px;
          }

          /* Enhanced drop shadow for premium feel */
          .drop-shadow-premium {
            filter: drop-shadow(0 25px 50px rgba(251, 191, 36, 0.2));
          }

          /* Smooth blur transitions */
          .blur-transition {
            transition: filter 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          /* Shift floating feedback button when mobile menu is open */
          .floating-feedback-button { transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
          body.mobile-menu-open .floating-feedback-button { right: 21rem !important; }
          @media (min-width: 640px) { /* match drawer sm:w-96 */
            body.mobile-menu-open .floating-feedback-button { right: 25rem !important; }
          }

          /* Floating animation keyframes */
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          /* Instagram Link Responsive Styles */
          @media (max-width: 640px) {
            .instagram-link {
              padding: 0.75rem !important;
              gap: 0.5rem !important;
            }

            .instagram-link .icon-container {
              width: 2.5rem !important;
              height: 2.5rem !important;
            }

            .instagram-link .icon-container svg {
              width: 1.25rem !important;
              height: 1.25rem !important;
            }

            .instagram-link .text-content span:first-child {
              font-size: 0.75rem !important;
            }

            .instagram-link .text-content span:last-child {
              font-size: 0.625rem !important;
            }
          }

          @media (min-width: 641px) and (max-width: 1024px) {
            .instagram-link {
              padding: 1rem !important;
              gap: 0.75rem !important;
            }
          }

          /* Instagram Link Hover Effects */
          .instagram-link {
            position: relative;
            overflow: hidden;
          }

          .instagram-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }

          .instagram-link:hover::before {
            left: 100%;
          }

          /* Instagram Icon Pulse Animation */


          /* Particle animation keyframes */
          @keyframes particle-float {
            0% {
              transform: translateY(0px) scale(0);
              opacity: 0;
            }
            50% {
              transform: translateY(-20px) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-40px) scale(0);
              opacity: 0;
            }
          }

          .animate-particle {
            animation: particle-float 4s ease-in-out infinite;
          }

          /* Gradient text animation */
          @keyframes gradient-shift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animate-gradient-text {
            animation: gradient-shift 3s ease infinite;
          }

          /* Enhanced logo rotation */
          @keyframes logo-float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-5px) rotate(180deg);
            }
          }

          .animate-logo-float {
            animation: logo-float 8s ease-in-out infinite;
          }

          /* Premium glow animation */
          @keyframes premium-glow {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }

          .animate-premium-glow {
            animation: premium-glow 4s ease-in-out infinite;
          }

          /* Loading bar animation */
          @keyframes loading-pulse {
            0%, 100% {
              opacity: 0.7;
            }
            50% {
              opacity: 1;
            }
          }

          .animate-loading-pulse {
            animation: loading-pulse 2s ease-in-out infinite;
          }
        `;function S(){const{t:n}=k(),o=[{id:"feb26-1",date:"10 Feb 2026",title:n("pages.welcome.news.items.feb26-1.title"),excerpt:n("pages.welcome.news.items.feb26-1.excerpt"),image:s("/february-news-01.jpg"),url:"/news/feb26-1",priority:"high"},{id:"feb26-2",date:"4 Feb 2026",title:n("pages.welcome.news.items.feb26-2.title"),excerpt:n("pages.welcome.news.items.feb26-2.excerpt"),image:s("/News-february-2.jpg"),url:"/news/feb26-2",priority:"high"},{id:"feb26-3",date:"22 Feb 2026",title:n("pages.welcome.news.items.feb26-3.title"),excerpt:n("pages.welcome.news.items.feb26-3.excerpt"),image:s("/news-3-february.jpg"),url:"/news/feb26-3",priority:"high"},{id:"feb26-4",date:"24 Feb 2026",title:n("pages.welcome.news.items.feb26-4.title"),excerpt:n("pages.welcome.news.items.feb26-4.excerpt"),image:s("/news-4-february.jpg"),url:"/news/feb26-4",priority:"high"},{id:"mar26-1",date:"6 Mar 2026",title:n("pages.welcome.news.items.mar26-1.title"),excerpt:n("pages.welcome.news.items.mar26-1.excerpt"),image:s("/maret-news-1.jpeg"),url:"/news/mar26-1",priority:"high"},{id:"dec-3",date:"10 Dec 2025",title:n("pages.welcome.news.items.dec-3.title"),excerpt:n("pages.welcome.news.items.dec-3.excerpt"),image:s("metronews_desember.jpeg"),url:"/news/dec-3",priority:"high"},{id:"sept-1",date:"1 Sep 2025",title:n("pages.welcome.news.items.sept-1.title"),excerpt:n("pages.welcome.news.items.sept-1.excerpt"),image:s("sept1.jpg"),url:"/news/sept-1",priority:"high"},{id:"jul-1",date:"15 Jul 2025",title:n("pages.welcome.news.items.jul-1.title"),excerpt:n("pages.welcome.news.items.jul-1.excerpt"),image:s("sembako.jpg"),url:"/news/jul-1",priority:"medium"},{id:"aug-2",date:"19 Aug 2025",title:n("pages.welcome.news.items.aug-2.title"),excerpt:n("pages.welcome.news.items.aug-2.excerpt"),image:s("agus2.jpg"),url:"/news/aug-2",priority:"medium"},{id:"feb-4",date:"3 Feb 2025",title:n("pages.welcome.news.items.feb-4.title"),excerpt:n("pages.welcome.news.items.feb-4.excerpt"),image:s("buruharian2.webp"),url:"/news/feb-4",priority:"medium"}],r=[{id:1,image:s("directorshero.jpg"),category:n("pages.welcome.board.category"),title:n("pages.welcome.board.title"),link:"/board-of-directors"},{id:0,image:s("portofolio.jpg"),category:n("pages.welcome.portfolio.category"),title:n("pages.welcome.portfolio.title"),link:"/line-of-business"}],[a,f]=p.useState(null),[l,x]=p.useState(0),[c,u]=p.useState(0),[y,v]=p.useState(()=>typeof window<"u"?window.innerWidth<=768:!1);return p.useEffect(()=>{if(typeof window>"u")return;const t=()=>v(window.innerWidth<=768);return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]),p.useEffect(()=>{const t=setInterval(()=>{x(i=>(i+1)%r.length)},14e3);return()=>clearInterval(t)},[r.length]),p.useEffect(()=>{const t=setInterval(()=>{u(i=>(i+1)%o.length)},8e3);return()=>clearInterval(t)},[o.length]),e.jsxs(e.Fragment,{children:[e.jsxs("section",{className:"welcome-below-fold flex flex-1 flex-col bg-white lg:flex-row",children:[e.jsxs("div",{className:"relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-end overflow-hidden bg-black sm:aspect-[16/9] lg:aspect-auto lg:h-auto lg:w-1/2 lg:flex-1",children:[y?e.jsxs("div",{className:"absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8 lg:p-8",onClick:()=>window.location.href=r[l].link,children:[e.jsx("div",{className:"absolute inset-0 h-full w-full",children:e.jsx("img",{src:r[l].image,alt:r[l].title,className:"h-full w-full object-cover",style:{objectPosition:"center center",transform:"translate3d(0, 0, 0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onError:t=>{t.currentTarget.style.display="none"},loading:"eager",decoding:"async",fetchPriority:"low"})}),e.jsx("div",{className:"pointer-events-none absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent"}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("div",{className:"mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm",children:r[l].category}),e.jsx("h3",{className:"mb-4 text-xl font-bold sm:text-2xl lg:text-3xl",children:r[l].title})]})]}):e.jsx(h,{initial:!1,children:e.jsxs(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1.05,ease:[.16,1,.3,1]},className:"absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8 lg:p-8",style:{transform:"translate3d(0, 0, 0)",willChange:"opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onMouseEnter:()=>f(0),onMouseLeave:()=>f(null),onClick:()=>window.location.href=r[l].link,children:[e.jsx(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1.05,ease:[.16,1,.3,1]},className:"absolute inset-0 h-full w-full",style:{transform:"translate3d(0, 0, 0)",willChange:"opacity"},children:e.jsx("img",{src:r[l].image,alt:r[l].title,className:"h-full w-full object-cover",style:{objectPosition:"center center",transform:"translate3d(0, 0, 0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",imageRendering:"-webkit-optimize-contrast"},onError:t=>{t.currentTarget.style.display="none"},loading:"eager",decoding:"async",fetchPriority:"low"})}),e.jsx("div",{className:"pointer-events-none absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent"}),e.jsxs(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1,delay:.35,ease:[.16,1,.3,1]},className:"relative z-10",style:{transform:"translate3d(0, 0, 0)",willChange:"opacity"},children:[e.jsx("div",{className:"mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm",children:r[l].category}),e.jsx("h3",{className:`mb-4 text-xl font-bold transition-transform duration-300 sm:text-2xl lg:text-3xl ${a===0?"lg:translate-x-2":"translate-x-0"}`,children:r[l].title})]})]},l)}),e.jsx("div",{className:"absolute bottom-6 left-6 z-20 flex gap-2 sm:bottom-8 sm:left-8 lg:bottom-8 lg:left-8",children:r.map((t,i)=>e.jsx("button",{onClick:m=>{m.stopPropagation(),x(i)},className:`rounded-full transition-all duration-200 ${i===l?"h-2.5 w-8 bg-yellow-400":"h-2.5 w-2.5 bg-white/50 hover:bg-white/80"}`,"aria-label":`Go to slide ${i+1}`},t.id))})]}),e.jsxs(w,{href:"/business-activity",className:"relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-end overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white no-underline sm:aspect-[16/9] sm:p-8 lg:aspect-auto lg:h-auto lg:w-1/4 lg:flex-1 lg:p-8",onMouseEnter:()=>f(1),onMouseLeave:()=>f(null),children:[e.jsx("img",{src:s("businessactivity.jpg"),alt:n("pages.welcome.business_activities_alt"),className:`absolute top-0 left-0 h-full w-full object-cover transition-transform duration-300 will-change-auto lg:duration-500 ${a===1?"lg:scale-105":"scale-100"}`,style:{objectPosition:"center center",transform:"translateZ(0)",backfaceVisibility:"hidden"},onError:t=>{t.currentTarget.style.display="none"},loading:"eager"}),e.jsx("div",{className:"absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent"}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("h3",{className:`mb-4 text-lg leading-tight font-bold transition-transform duration-200 sm:text-xl lg:text-2xl ${a===1?"lg:translate-x-2":"translate-x-0"}`,children:n("pages.welcome.business_activities.title")}),e.jsx("span",{className:`text-sm font-medium underline transition-colors duration-200 ${a===1?"text-yellow-400":"text-white"}`,children:n("pages.welcome.business_activities.find_out_more")})]})]}),e.jsxs(w,{id:"news-update","data-news-section":"true",href:o[c].url,className:"relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-between overflow-hidden bg-yellow-400 p-6 no-underline sm:aspect-[16/9] sm:p-8 lg:aspect-auto lg:h-auto lg:w-1/4 lg:flex-1 lg:p-8",onMouseEnter:()=>f(2),onMouseLeave:()=>f(null),children:[e.jsxs("div",{className:`absolute top-0 right-0 bottom-0 left-0 overflow-hidden transition-all duration-400 ease-out lg:duration-600 ${a===2?"scale-100 opacity-100":"scale-105 opacity-0"}`,children:[e.jsx(h,{mode:"wait",children:e.jsx(g.div,{className:"h-full w-full",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.9,ease:[.16,1,.3,1]},style:{transform:"translateZ(0)"},children:e.jsx("img",{src:o[c].image,alt:o[c].title,className:"h-full w-full object-cover",style:{objectPosition:"center center",transform:"translateZ(0)",backfaceVisibility:"hidden"},onError:t=>{const i=t.currentTarget,m=parseInt(i.dataset.fallbackTried||"0",10);try{let d=new URL(i.src).pathname.replace(/^\//,"");d.startsWith("public/")&&(d=d.slice(7)),d.startsWith("images/")&&(d=d.slice(7));const b=d.replace(/^kristalin-assets\/public\//,"");m===0?(i.dataset.fallbackTried="1",i.src=`${window.location.origin}/images/${b}`):m===1?(i.dataset.fallbackTried="2",i.src=`${window.location.origin}/kristalin-assets/public/${b}`):i.style.display="none"}catch{i.style.display="none"}},loading:"eager"})},c)}),e.jsx("div",{className:"absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"})]}),e.jsx("div",{className:"relative z-10 mb-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:`text-xl font-bold transition-all duration-300 sm:text-2xl lg:text-3xl ${a===2?"text-white lg:scale-110":"scale-100 text-gray-800"}`,children:e.jsx("a",{href:"/news",onClick:t=>{t.stopPropagation()},className:`${a===2?"text-white hover:text-yellow-200":"text-gray-800 hover:text-yellow-700"} underline-offset-4 hover:underline`,children:n("pages.welcome.news.title_short")})}),e.jsxs("div",{className:"flex items-center gap-3",children:[o.length>1&&e.jsxs("div",{className:"flex gap-1",children:[e.jsx("button",{onClick:t=>{t.preventDefault(),t.stopPropagation(),u(i=>(i-1+o.length)%o.length)},className:`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 lg:hover:scale-110 ${a===2?"text-white hover:bg-white/20":"text-gray-700 hover:bg-gray-200"}`,children:e.jsx("svg",{className:"h-3 w-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})})}),e.jsx("button",{onClick:t=>{t.preventDefault(),t.stopPropagation(),u(i=>(i+1)%o.length)},className:`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 lg:hover:scale-110 ${a===2?"text-white hover:bg-white/20":"text-gray-700 hover:bg-gray-200"}`,children:e.jsx("svg",{className:"h-3 w-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})})]}),o[c].priority==="high"&&e.jsxs("div",{className:`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-all duration-300 ${a===2?"bg-white/20 text-white":"bg-red-100 text-red-700"}`,children:[e.jsx("div",{className:"h-1.5 w-1.5 rounded-full bg-current"}),e.jsx("span",{children:n("pages.welcome.news.highlight_badge")})]})]})]})}),e.jsx("div",{className:"relative z-10 flex flex-1 flex-col justify-center",children:e.jsx(h,{mode:"wait",children:e.jsx(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.4,ease:"easeInOut"},className:"mb-4",children:o.length>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[e.jsx("div",{className:`h-1 w-1 rounded-full transition-colors duration-300 ${a===2?"bg-white":"bg-gray-500"}`}),e.jsx("div",{className:`text-xs font-medium transition-colors duration-300 ${a===2?"text-gray-200":"text-gray-600"}`,children:o[c].date})]}),e.jsx("div",{className:`mb-3 line-clamp-2 text-sm leading-tight font-bold transition-colors duration-300 sm:text-base lg:text-lg ${a===2?"text-white":"text-gray-800"}`,children:o[c].title}),e.jsx("div",{className:`line-clamp-3 text-xs leading-relaxed transition-colors duration-300 sm:text-sm ${a===2?"text-gray-100":"text-gray-700"}`,children:o[c].excerpt})]}):e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"mb-2 text-4xl",children:"📰"}),e.jsx("p",{className:`text-sm font-medium transition-colors duration-300 ${a===2?"text-white":"text-gray-800"}`,children:n("pages.welcome.news.no_news_available")})]})},c)})}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("div",{className:`mb-3 flex items-center justify-between transition-colors duration-300 ${a===2?"border-white/20":"border-black/10"}`,children:e.jsxs("div",{className:`flex items-center text-sm font-semibold transition-all duration-300 sm:text-base ${a===2?"text-white":"text-gray-800"}`,children:[e.jsx("span",{children:n("pages.welcome.news.view_button")}),e.jsx("div",{className:`ml-2 transition-transform duration-300 ${a===2?"translate-x-1":"translate-x-0"}`,children:e.jsx("svg",{className:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 8l4 4m0 0l-4 4m4-4H3"})})})]})}),e.jsx("div",{className:"flex justify-center gap-1.5",children:o.map((t,i)=>e.jsx("button",{onClick:m=>{m.preventDefault(),m.stopPropagation(),u(i)},className:`transition-all duration-300 ${i===c?`h-1.5 w-6 rounded-full ${a===2?"bg-white":"bg-gray-800"}`:`h-1.5 w-1.5 rounded-full ${a===2?"bg-white/40 hover:bg-white/60":"bg-gray-400 hover:bg-gray-600"}`}`},i))})]})]})]}),e.jsx("style",{dangerouslySetInnerHTML:{__html:j}})]})}export{S as default};
