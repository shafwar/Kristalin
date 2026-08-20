import{r as c,j as e,T as M,o as L,Q as T,t as k,aM as S,a2 as R}from"./vendor-lopY-sRR.js";import{u as D}from"./useLcpSafeMicroMotion-AENuiZpc.js";import{u as W}from"./useNetworkProfile-CgSiLPRm.js";import{u as $}from"./useTranslation-UZPBMeTI.js";import{i as b}from"./assets-ZAgbBrkL.js";import{H as B,F as G}from"./Header-Bwq_099-.js";import{P as A}from"./PapuaChildrenHeroPicture-9XQII6qq.js";import{g as N}from"./index-CMFigVup.js";import{W as Y}from"./WelcomeGridPicture-CtOyFe1z.js";import{A as _}from"./index-oLuyHQRb.js";import{m as z}from"./proxy-DOFWMtpg.js";import"./ui-DW48STyt.js";function H({children:t,enabled:o,className:d,rootMargin:a="280px"}){const[i,l]=c.useState(!o),n=c.useRef(null);return c.useEffect(()=>{if(!o){l(!0);return}const m=n.current;if(!m)return;const x=new IntersectionObserver(g=>{g.some(y=>y.isIntersecting)&&l(!0)},{rootMargin:a});return x.observe(m),()=>x.disconnect()},[o,a]),e.jsx("div",{ref:n,className:d,children:i?t:e.jsx("div",{className:"min-h-[min(72vh,520px)] w-full animate-pulse bg-gradient-to-b from-slate-100 to-slate-200/90 lg:min-h-[min(50vh,420px)]","aria-hidden":!0})})}const C="Asia/Jakarta";function O(t){return t==="id"?"id-ID":t==="zh"?"zh-CN":"en-GB"}function K(t){const[o,d]=c.useState(()=>new Date);c.useEffect(()=>{const n=()=>d(new Date);n();const m=window.setInterval(n,1e3);return()=>window.clearInterval(m)},[]);const a=O(t),i=new Intl.DateTimeFormat(a,{timeZone:C,weekday:"long",day:"2-digit",month:"long",year:"numeric"}).format(o),l=new Intl.DateTimeFormat("id-ID",{timeZone:C,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(o);return{date:i,time:`${l} WIB`,zone:C}}const U=6e4;async function F(t){const o=await fetch(t,{cache:"no-store",headers:{Accept:"application/json"}});if(!o.ok)throw new Error(`HTTP ${o.status}`);return{data:await o.json(),stale:o.headers.get("X-Kristalin-TV-Stale")==="1"}}function Z(t){var d,a;if(!(t!=null&&t.length))return null;let o=null;for(const i of t){const l=((a=(d=i.rows)==null?void 0:d["1"])==null?void 0:a.sell)??0;l>0&&(!o||l<o.sell)&&(o={brand:i.brand,sell:l})}return o}function E(t,o=0){return!Number.isFinite(t)||t<=0?"—":new Intl.NumberFormat("id-ID",{minimumFractionDigits:o,maximumFractionDigits:o}).format(t)}function V(t=!0){const[o,d]=c.useState(null),[a,i]=c.useState(null),[l,n]=c.useState(!0),[m,x]=c.useState(!1),[g,y]=c.useState(!1),h=c.useRef(!0),j=c.useCallback(async()=>{if(t)try{const[p,f]=await Promise.all([F("/api/kristalin-tv/gold"),F("/api/kristalin-tv/gold-prices")]);if(!h.current)return;d(p.data),i(f.data),y(p.stale||f.stale),x(!1)}catch{if(!h.current)return;x(!0)}finally{h.current&&n(!1)}},[t]);return c.useEffect(()=>{if(h.current=!0,!t){n(!1);return}j();const p=window.setInterval(()=>void j(),U);return()=>{h.current=!1,window.clearInterval(p)}},[t,j]),{market:o,brandPrices:a,loading:l,error:m,stale:g,refresh:j}}const J="https://livegold-kristalintv.com/";function Q({className:t,onMouseEnter:o,onMouseLeave:d,hovered:a}){const{t:i,locale:l}=$(),{market:n,brandPrices:m,loading:x,error:g,stale:y,refresh:h}=V(!0),{date:j,time:p,zone:f}=K(l),u=(n==null?void 0:n.gold_idr_per_gram)??0,s=Z(m==null?void 0:m.brands),r=u>0||s!==null,w=(n==null?void 0:n.source)==="gold.org",I=w?"https://goldprice.org/gold-price-indonesia.html":J;return e.jsxs("a",{href:I,target:"_blank",rel:"noopener noreferrer","aria-label":i("pages.welcome.gold_live.card_aria"),className:`gold-card-root group relative flex w-full cursor-pointer flex-col overflow-hidden no-underline lg:h-auto lg:w-1/4 lg:min-h-0 lg:flex-1 ${t??""}`,onMouseEnter:o,onMouseLeave:d,children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f35] to-[#07111f] transition-transform duration-500 ease-out group-hover:scale-[1.02] lg:origin-center"}),e.jsx("div",{className:"pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-55",style:{background:"radial-gradient(circle at 20% 0%, rgba(255,211,107,.22), transparent 45%), radial-gradient(circle at 100% 100%, rgba(78,161,255,.12), transparent 40%)"},"aria-hidden":!0}),e.jsx("div",{className:"pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent","aria-hidden":!0}),e.jsxs("div",{className:"gold-card-inner relative z-10 flex flex-col gap-3 p-4 sm:gap-4 sm:p-5 lg:h-full lg:min-h-0 lg:gap-0 lg:p-6",children:[e.jsxs("div",{className:"flex shrink-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3 lg:mb-3",children:[e.jsxs("div",{className:"flex min-w-0 items-center gap-2",children:[e.jsx("span",{className:`h-2 w-2 shrink-0 rounded-full ${g?"bg-red-400":r?"animate-pulse bg-emerald-400":"bg-amber-400/70"}`,"aria-hidden":!0}),e.jsx("span",{className:"text-[10px] font-bold tracking-[0.18em] text-amber-300/95 uppercase sm:text-[11px]",children:w?"GOLD.ORG · LIVE":i("pages.welcome.gold_live.kicker")}),y&&e.jsx("span",{className:"shrink-0 rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] font-medium text-white/70",children:i("pages.welcome.gold_live.stale")})]}),e.jsxs("div",{className:"shrink-0 leading-tight sm:text-right","aria-live":"polite",children:[e.jsx("p",{className:"text-[9px] font-semibold text-amber-100/90 capitalize sm:text-[10px]",children:j}),e.jsx("p",{className:"mt-0.5 font-mono text-sm font-bold tracking-wide text-white tabular-nums sm:text-base",children:p}),e.jsx("p",{className:"mt-0.5 text-[9px] text-slate-400",children:f})]})]}),e.jsxs("div",{className:"gold-card-body flex shrink-0 flex-col gap-3 lg:min-h-0 lg:flex-1 lg:gap-0",children:[e.jsx("div",{children:x&&!r?e.jsxs("div",{className:"space-y-2","aria-hidden":!0,children:[e.jsx("div",{className:"h-5 w-28 animate-pulse rounded-full bg-white/10"}),e.jsx("div",{className:"mt-2 h-8 w-4/5 animate-pulse rounded-lg bg-white/10"}),e.jsx("div",{className:"h-4 w-1/2 animate-pulse rounded bg-white/10"})]}):g&&!r?e.jsxs("div",{className:"mt-1",children:[e.jsx("span",{className:"inline-flex rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-slate-900 uppercase sm:text-[10px]",children:i("pages.welcome.gold_live.world_price")}),e.jsx("p",{className:"mt-2 text-sm text-slate-400",children:i("pages.welcome.gold_live.offline")}),e.jsx("button",{type:"button",onClick:v=>{v.preventDefault(),v.stopPropagation(),h()},className:"relative z-20 mt-2 cursor-pointer text-xs font-semibold text-amber-300 underline-offset-2 hover:underline",children:i("pages.welcome.gold_live.retry")})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"inline-flex rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-slate-900 uppercase sm:text-[10px]",children:i("pages.welcome.gold_live.world_price")}),e.jsxs("div",{className:"gold-card-price-row mt-2 flex min-w-0 max-w-full flex-wrap items-baseline gap-x-1.5 gap-y-0.5",children:[e.jsxs("p",{className:"gold-card-price-main min-w-0 font-bold text-amber-50 tabular-nums",children:[e.jsx("span",{className:"mr-1 text-[0.62em] font-semibold text-amber-200/90",children:"Rp"}),e.jsx("span",{children:E(u,2)})]}),e.jsx("span",{className:"gold-card-price-unit shrink-0 font-semibold text-amber-200/85 tabular-nums",children:i("pages.welcome.gold_live.per_gram_short")})]}),e.jsxs("div",{className:"mt-2 flex flex-wrap gap-1.5 sm:mt-3",children:[n!=null&&n.usd_idr?e.jsxs("span",{className:"rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] tabular-nums text-slate-200",children:["USD ",new Intl.NumberFormat("id-ID").format(Math.round(n.usd_idr))]}):null,n!=null&&n.sgd_idr?e.jsxs("span",{className:"rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] tabular-nums text-slate-200",children:["SGD ",new Intl.NumberFormat("id-ID").format(Math.round(n.sgd_idr))]}):null]})]})}),s&&e.jsx("div",{className:"shrink-0 rounded-xl border border-amber-400/25 bg-gradient-to-r from-amber-500/10 to-yellow-500/5 p-2.5 sm:p-3 lg:mt-4",children:e.jsxs("div",{className:"flex items-start justify-between gap-2",children:[e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"text-[10px] font-semibold tracking-wide text-amber-200/90 uppercase",children:i("pages.welcome.gold_live.best_sell")}),e.jsx("p",{className:"mt-0.5 truncate text-xs font-bold text-white",children:s.brand}),e.jsxs("p",{className:"gold-card-price-sub mt-0.5 min-w-0 max-w-full font-bold text-amber-300 tabular-nums",children:[e.jsx("span",{className:"mr-0.5 text-[0.72em] font-semibold text-amber-200/80",children:"Rp"}),e.jsx("span",{children:E(s.sell,0)})]})]}),e.jsx("span",{className:"shrink-0 rounded-full bg-amber-400/20 px-2 py-0.5 text-[9px] font-bold text-amber-200",children:"1g"})]})})]}),e.jsxs("div",{className:`shrink-0 border-t border-white/10 pt-2.5 sm:pt-3 lg:mt-auto lg:pt-3 ${a?"lg:translate-x-1":""} transition-transform duration-200`,children:[e.jsxs("p",{className:"flex items-center gap-1.5 text-xs font-bold text-white sm:text-sm",children:[e.jsx(M,{className:"h-3.5 w-3.5 shrink-0 text-amber-300","aria-hidden":!0}),w?"Gold.org":i("pages.welcome.gold_live.card_title")]}),e.jsxs("span",{className:"mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-300/90 underline underline-offset-2 sm:text-xs",children:[i("pages.welcome.gold_live.card_cta"),e.jsx(L,{className:"h-3 w-3 shrink-0 opacity-70","aria-hidden":!0})]})]})]})]})}function X({minDurationMs:t=2e3,fadeDurationMs:o=900,onDone:d}){const[a,i]=c.useState(()=>typeof window<"u"?!sessionStorage.getItem("splash_played"):!1),l=c.useRef(null),n=c.useRef(null),m=c.useRef(null);if(c.useEffect(()=>{if(!a){d==null||d();return}const g=N.context(()=>{N.set(n.current,{opacity:0,scale:.96,filter:"blur(8px)"}),N.set(m.current,{clipPath:"inset(0% 100% 0% 0%)"}),N.timeline({onComplete:()=>{N.to(l.current,{yPercent:-100,duration:o/1e3,ease:"power4.inOut",delay:.4,onComplete:()=>{typeof window<"u"&&sessionStorage.setItem("splash_played","true"),i(!1),d==null||d()}})}}).to(n.current,{opacity:.15,scale:1,filter:"blur(0px)",duration:1.2,ease:"power3.out"}).to(m.current,{clipPath:"inset(0% 0% 0% 0%)",duration:1.6,ease:"power3.inOut"},"-=0.4")},l);return()=>g.revert()},[o,d]),!a)return null;const x=b("Kristalin-New-Logo.webp");return e.jsx("div",{ref:l,className:"fixed inset-0 z-[99999] flex items-center justify-center bg-[#FCFCFC]",children:e.jsxs("div",{className:"relative flex items-center justify-center",style:{transform:"translateY(-5vh)"},children:[e.jsx("img",{ref:n,src:x,alt:"Kristalin Ekalestari",className:"w-auto h-auto max-w-[85vw] max-h-16 sm:max-h-none sm:h-24 md:h-28 object-contain grayscale opacity-20",style:{willChange:"transform, opacity, filter"}}),e.jsx("div",{ref:m,className:"absolute inset-0 z-10 flex items-center justify-center",style:{willChange:"clip-path"},children:e.jsx("img",{src:x,alt:"Kristalin Full Color",className:"w-auto h-auto max-w-[85vw] max-h-16 sm:max-h-none sm:h-24 md:h-28 object-contain drop-shadow-sm"})})]})})}const de=()=>{const{t}=$(),{deferWelcomeBelowFold:o}=W(),d=D(),[a,i]=c.useState(null),[l,n]=c.useState(0),[m,x]=c.useState(0),[g,y]=c.useState(0),[h,j]=c.useState(()=>typeof window<"u"?window.innerWidth<=768:!1),p=[{id:"feb26-1",date:"10 Feb 2026",title:t("pages.welcome.news.items.feb26-1.title"),excerpt:t("pages.welcome.news.items.feb26-1.excerpt"),image:b("/february-news-01.jpg"),url:"/news/feb26-1",priority:"high"},{id:"feb26-2",date:"4 Feb 2026",title:t("pages.welcome.news.items.feb26-2.title"),excerpt:t("pages.welcome.news.items.feb26-2.excerpt"),image:b("/News-february-2.jpg"),url:"/news/feb26-2",priority:"high"},{id:"feb26-3",date:"22 Feb 2026",title:t("pages.welcome.news.items.feb26-3.title"),excerpt:t("pages.welcome.news.items.feb26-3.excerpt"),image:b("/news-3-february.jpg"),url:"/news/feb26-3",priority:"high"},{id:"feb26-4",date:"24 Feb 2026",title:t("pages.welcome.news.items.feb26-4.title"),excerpt:t("pages.welcome.news.items.feb26-4.excerpt"),image:b("/news-4-february.jpg"),url:"/news/feb26-4",priority:"high"},{id:"mar26-1",date:"6 Mar 2026",title:t("pages.welcome.news.items.mar26-1.title"),excerpt:t("pages.welcome.news.items.mar26-1.excerpt"),image:b("/maret-news-1.jpeg"),url:"/news/mar26-1",priority:"high"},{id:"apr26-1",date:"11 Apr 2026",title:t("pages.welcome.news.items.apr26-1.title"),excerpt:t("pages.welcome.news.items.apr26-1.excerpt"),image:b("/kristalin-news-april-1.jpeg"),url:"/news/apr26-1",priority:"high"},{id:"dec-3",date:"10 Dec 2025",title:t("pages.welcome.news.items.dec-3.title"),excerpt:t("pages.welcome.news.items.dec-3.excerpt"),image:b("metronews_desember.jpeg"),url:"/news/dec-3",priority:"high"},{id:"sept-1",date:"1 Sep 2025",title:t("pages.welcome.news.items.sept-1.title"),excerpt:t("pages.welcome.news.items.sept-1.excerpt"),image:b("sept1.jpg"),url:"/news/sept-1",priority:"high"},{id:"jul-1",date:"15 Jul 2025",title:t("pages.welcome.news.items.jul-1.title"),excerpt:t("pages.welcome.news.items.jul-1.excerpt"),image:b("sembako.jpg"),url:"/news/jul-1",priority:"medium"},{id:"aug-2",date:"19 Aug 2025",title:t("pages.welcome.news.items.aug-2.title"),excerpt:t("pages.welcome.news.items.aug-2.excerpt"),image:b("agus2.jpg"),url:"/news/aug-2",priority:"medium"},{id:"feb-4",date:"3 Feb 2025",title:t("pages.welcome.news.items.feb-4.title"),excerpt:t("pages.welcome.news.items.feb-4.excerpt"),image:b("buruharian2.webp"),url:"/news/feb-4",priority:"medium"}],f=[{id:1,gridId:"directorshero",category:t("pages.welcome.board.category"),title:t("pages.welcome.board.title"),link:"/board-of-directors"},{id:0,gridId:"portofolio",category:t("pages.welcome.portfolio.category"),title:t("pages.welcome.portfolio.title"),link:"/line-of-business"}];c.useEffect(()=>{const s=setInterval(()=>{y(r=>(r+1)%f.length)},14e3);return()=>clearInterval(s)},[f.length]),c.useEffect(()=>{const s=setInterval(()=>{x(r=>(r+1)%p.length)},8e3);return()=>clearInterval(s)},[p.length]);const u=c.useMemo(()=>[{title1:t("pages.welcome.content_set_1.title1"),title2:t("pages.welcome.content_set_1.title2"),subtitle:t("pages.welcome.content_set_1.subtitle"),kicker:t("pages.welcome.content_set_1.kicker"),description:t("pages.welcome.content_set_1.description")},{title1:t("pages.welcome.content_set_2.title1"),title2:t("pages.welcome.content_set_2.title2"),subtitle:t("pages.welcome.content_set_2.subtitle"),kicker:t("pages.welcome.content_set_2.kicker"),description:t("pages.welcome.content_set_2.description")}],[t]);return c.useEffect(()=>{if(typeof window>"u")return;const s=()=>{j(window.innerWidth<=768)};return window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}},[]),c.useEffect(()=>{const s=setInterval(()=>{n(r=>(r+1)%u.length)},14e3);return()=>clearInterval(s)},[u.length]),e.jsxs(e.Fragment,{children:[e.jsxs(T,{title:"Sustainable Gold Mining & Mineral Refining",children:[e.jsx("meta",{name:"description",content:"PT Kristalin Ekalestari adalah perusahaan pertambangan emas dan pengolahan mineral terkemuka di Indonesia sejak 1989. Beroperasi dengan izin resmi IUP Operasi Produksi No. 561/2021/DESDM di Nabire, Papua Barat."}),e.jsx("meta",{property:"og:title",content:"PT Kristalin Ekalestari | Sustainable Gold Mining & Mineral Refining"}),e.jsx("meta",{property:"og:description",content:"PT Kristalin Ekalestari adalah perusahaan pertambangan emas dan pengolahan mineral terkemuka di Indonesia sejak 1989. Beroperasi dengan izin resmi IUP Operasi Produksi No. 561/2021/DESDM di Nabire, Papua Barat."})]}),e.jsx(X,{}),e.jsxs("div",{className:"welcome-page relative flex min-h-screen flex-col overflow-x-hidden bg-white",children:[e.jsx(B,{sticky:!0,transparent:!1}),e.jsx("div",{className:"flex flex-1 flex-col overflow-hidden pt-16 sm:pt-20",children:e.jsxs("div",{className:"flex flex-1 flex-col",children:[e.jsxs("section",{className:"flex h-auto flex-col lg:h-[48vh] lg:flex-row",children:[e.jsx("div",{className:"relative flex h-full w-full min-w-0 flex-col justify-center overflow-hidden bg-white p-6 sm:p-8 lg:w-1/2 lg:p-8 xl:p-12 2xl:p-16",children:e.jsxs("div",{className:`relative z-10 min-w-0 welcome-hero-micro ${d?"welcome-hero-micro--ready":""}`,children:[e.jsx("div",{className:"relative",children:h?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"welcome-hero-nudge welcome-hero-nudge--a",children:[e.jsx("p",{className:"mb-3 text-center text-[11px] font-semibold tracking-[0.2em] text-amber-600/90 uppercase sm:text-xs lg:mb-3 lg:text-left",children:u[l].kicker}),e.jsxs("h1",{className:"mb-4 text-center text-2xl leading-tight font-bold sm:mb-5 sm:text-center sm:text-3xl lg:mb-4 lg:text-left lg:text-3xl xl:text-4xl 2xl:text-5xl",children:[e.jsx("div",{className:"inline-block text-gray-800",children:u[l].title1}),e.jsx("br",{}),e.jsx("span",{className:"inline-block",style:{background:"linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:u[l].title2})]}),e.jsx("p",{className:"mb-3 text-center text-sm font-medium text-gray-700 sm:mb-4 sm:text-center sm:text-base lg:mb-3 lg:text-left lg:text-base xl:text-lg",children:u[l].subtitle}),e.jsx("p",{className:"mx-auto mb-5 max-w-md text-center text-sm leading-relaxed text-gray-500 sm:mb-6 lg:mx-0 lg:max-w-lg lg:text-left lg:text-[0.9375rem]",children:u[l].description})]})}):e.jsx(e.Fragment,{children:e.jsx(_,{mode:"wait",children:e.jsxs(z.div,{initial:{opacity:1,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},transition:{duration:.32,ease:[.25,.46,.45,.94]},children:[e.jsx("p",{className:"mb-3 text-center text-[11px] font-semibold tracking-[0.2em] text-amber-600/90 uppercase sm:text-xs lg:mb-3 lg:text-left",children:u[l].kicker}),e.jsxs("h1",{className:"mb-4 text-center text-2xl leading-tight font-bold sm:mb-5 sm:text-center sm:text-3xl lg:mb-4 lg:text-left lg:text-3xl xl:text-4xl 2xl:text-5xl",children:[e.jsx("div",{className:"inline-block text-gray-800",children:u[l].title1}),e.jsx("br",{}),e.jsx("span",{className:"inline-block",style:{background:"linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:u[l].title2})]}),e.jsx("p",{className:"mb-3 text-center text-sm font-medium text-gray-700 sm:mb-4 sm:text-center sm:text-base lg:mb-3 lg:text-left lg:text-base xl:text-lg",children:u[l].subtitle}),e.jsx("p",{className:"mx-auto mb-5 max-w-md text-center text-sm leading-relaxed text-gray-500 sm:mb-6 lg:mx-0 lg:max-w-lg lg:text-left lg:text-[0.9375rem]",children:u[l].description})]},l)})})}),e.jsx("div",{className:"mt-5 w-full min-w-0 sm:mt-6",children:e.jsxs("div",{className:"button-container flex w-full min-w-0 flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:justify-start",children:[e.jsx(k,{href:"/about#about-kristalin",prefetch:!1,className:"hero-cta-btn hero-cta-btn--primary inline-flex h-11 w-full min-w-0 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border-2 border-transparent bg-gradient-to-r from-yellow-400 to-amber-500 px-5 text-sm font-semibold text-gray-900 shadow-lg sm:h-12 sm:w-auto sm:min-w-[180px] sm:px-6 sm:text-base",children:t("pages.welcome.buttons.learn_more")}),e.jsx(k,{href:"/milestones",prefetch:!1,className:"hero-cta-btn hero-cta-btn--outline md:hidden inline-flex h-11 w-full min-w-0 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border-2 border-yellow-400 bg-white px-5 text-sm font-semibold text-gray-800 sm:h-12 sm:w-auto sm:min-w-[180px] sm:px-6 sm:text-base",children:t("pages.welcome.buttons.see_milestones")}),e.jsxs(k,{href:"/b2c",prefetch:!1,className:"hero-cta-btn hero-cta-btn--outline hidden md:inline-flex h-11 w-full min-w-0 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border-2 border-yellow-400 bg-white px-5 text-sm font-semibold text-gray-800 sm:h-12 sm:w-auto sm:min-w-[180px] sm:px-6 sm:text-base",children:[e.jsx(S,{className:"mr-2 h-4 w-4 sm:h-5 sm:w-5 text-amber-500",strokeWidth:2}),"B2C Gold Program"]}),e.jsxs("a",{href:"https://www.instagram.com/kristalin_ekalestari/",target:"_blank",rel:"noopener noreferrer","aria-label":t("common.follow_us"),className:"hero-cta-btn hero-cta-btn--ghost inline-flex h-11 w-full min-w-0 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 shadow-md sm:h-12 sm:w-auto sm:min-w-[180px] sm:px-5 sm:text-base",children:[e.jsx("svg",{className:"h-4 w-4 shrink-0 sm:h-5 sm:w-5",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":!0,children:e.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"})}),e.jsx("span",{className:"truncate",children:t("common.follow_us")})]})]})}),e.jsx("div",{className:"relative"})]})}),e.jsxs(k,{href:"/csr",className:`relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-end overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white no-underline sm:aspect-[16/9] sm:p-8 lg:aspect-auto lg:h-full lg:w-1/2 lg:p-12 ${d?"welcome-csr-hover-ready":""}`,onMouseEnter:()=>i(4),onMouseLeave:()=>i(null),children:[e.jsx(A,{pictureClassName:"absolute inset-0 block h-full w-full",className:`welcome-lcp-hero h-full w-full object-cover transform will-change-auto lg:origin-center ${a===4?"lg:scale-105":"scale-100"}`,style:{objectPosition:"center center",backfaceVisibility:"hidden"},alt:"CSR Impact in Papua",loading:"eager",fetchPriority:"high",onError:s=>{s.currentTarget.style.display="none"}}),e.jsx("div",{className:"absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent"}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("div",{className:"mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm",children:t("pages.welcome.csr.category")}),e.jsx("h3",{className:`mb-4 text-2xl leading-tight font-bold transition-transform duration-200 sm:text-3xl lg:text-4xl ${a===4?"lg:translate-x-2":"translate-x-0"}`,children:t("pages.welcome.csr.title")}),e.jsx("span",{className:`text-base font-medium underline transition-colors duration-200 ${a===4?"text-yellow-400":"text-white"}`,children:t("pages.welcome.buttons.discover_more")})]})]})]}),e.jsx(H,{enabled:o,className:"flex min-h-0 flex-1 flex-col",children:e.jsxs("section",{className:"flex flex-1 flex-col bg-white",children:[e.jsx("div",{className:"flex w-full md:hidden shrink-0 justify-center border-b border-stone-100/90 bg-gradient-to-b from-stone-50/60 to-white px-4 py-4 sm:px-6 sm:py-5 lg:py-7",children:e.jsxs(k,{href:"/b2c",className:"group relative flex w-full max-w-4xl flex-col gap-4 overflow-hidden rounded-2xl border border-stone-200/75 bg-gradient-to-br from-white via-white to-amber-50/[0.35] px-5 py-5 no-underline shadow-[0_1px_0_rgba(15,23,42,0.04),0_14px_44px_-18px_rgba(15,23,42,0.13)] ring-1 ring-stone-900/[0.03] transition-all duration-300 max-sm:from-white max-sm:via-white max-sm:to-white max-sm:border-stone-200/65 max-sm:shadow-sm max-sm:hover:border-stone-300/80 max-sm:hover:shadow-md hover:border-amber-200/70 hover:shadow-[0_1px_0_rgba(15,23,42,0.04),0_20px_50px_-18px_rgba(15,23,42,0.16)] sm:gap-5 sm:px-7 sm:py-6 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8 md:py-6","aria-labelledby":"welcome-b2c-teaser-heading",children:[e.jsx("span",{className:"pointer-events-none absolute top-0 right-0 left-0 hidden h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-400 sm:block","aria-hidden":!0}),e.jsx("span",{className:"pointer-events-none absolute top-0 bottom-0 left-0 hidden w-[3px] bg-gradient-to-b from-amber-400 via-amber-500 to-yellow-500/90 opacity-95 sm:block","aria-hidden":!0}),e.jsxs("div",{className:"flex min-w-0 flex-1 items-start gap-4 max-sm:pl-0 pl-2.5 md:items-center md:gap-5 md:pl-1",children:[e.jsx("div",{className:"flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-stone-900 shadow-md ring-1 ring-amber-200/50 max-sm:ring-0 sm:h-14 sm:w-14","aria-hidden":!0,children:e.jsx(S,{className:"h-6 w-6 sm:h-7 sm:w-7",strokeWidth:2})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.22em] text-amber-800 uppercase sm:text-xs",children:t("pages.welcome.b2c_teaser.badge")}),e.jsx("h2",{id:"welcome-b2c-teaser-heading",className:"mt-1 text-base font-semibold leading-snug tracking-tight text-stone-900 sm:text-lg md:text-xl",children:t("pages.welcome.b2c_teaser.title")}),e.jsx("p",{className:"mt-1.5 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-[0.9375rem]",children:t("pages.welcome.b2c_teaser.body")})]})]}),e.jsx("div",{className:"flex w-full shrink-0 justify-stretch md:w-auto md:justify-end",children:e.jsxs("span",{className:"inline-flex w-full items-center justify-center gap-2 rounded-full border border-stone-200/90 bg-white/90 px-6 py-2.5 text-sm font-semibold text-stone-800 shadow-sm transition-all duration-200 max-sm:group-hover:border-stone-300 max-sm:group-hover:bg-stone-50 max-sm:group-hover:shadow-sm group-hover:border-amber-300/90 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-yellow-400 group-hover:text-stone-900 group-hover:shadow md:w-auto md:px-7 md:py-3",children:[e.jsx("span",{children:t("pages.welcome.b2c_teaser.cta")}),e.jsx(R,{className:"h-4 w-4 shrink-0 text-stone-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-stone-900","aria-hidden":!0})]})})]})}),e.jsxs("div",{className:"flex min-h-0 flex-1 flex-col lg:flex-row",children:[e.jsxs("div",{className:"relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-end overflow-hidden bg-black sm:aspect-[16/9] lg:aspect-auto lg:h-auto lg:w-1/2 lg:flex-1",children:[e.jsxs("div",{className:"absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8 lg:p-8",onClick:()=>window.location.href=f[g].link,onMouseEnter:()=>!h&&i(0),onMouseLeave:()=>!h&&i(null),role:"presentation",children:[e.jsx("div",{className:"absolute inset-0 z-0 min-h-0 min-w-0",children:f.map((s,r)=>e.jsx("div",{className:`absolute inset-0 min-h-0 min-w-0 transition-opacity duration-500 ease-out motion-reduce:transition-none ${r===g?"z-[2] opacity-100":"pointer-events-none z-[1] opacity-0"}`,"aria-hidden":r!==g,children:e.jsx(Y,{imageId:s.gridId,alt:s.title,pictureClassName:"absolute inset-0 block h-full w-full min-h-0",className:"h-full min-h-0 w-full object-cover",sizes:"(max-width: 1023px) 100vw, 50vw",bundleOptions:{lcpHero:!0},style:{objectPosition:"center center",transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},loading:"eager",fetchPriority:r===0?"high":"low",decoding:"async"})},s.gridId))}),e.jsx("div",{className:"pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/90 via-black/40 to-transparent"}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("div",{className:"mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm",children:f[g].category}),e.jsx("h3",{className:`mb-4 text-xl font-bold transition-transform duration-300 sm:text-2xl lg:text-3xl ${!h&&a===0?"lg:translate-x-2":"translate-x-0"}`,children:f[g].title})]})]}),e.jsx("div",{className:"absolute bottom-6 left-6 z-20 flex gap-2 sm:bottom-8 sm:left-8 lg:bottom-8 lg:left-8",children:f.map((s,r)=>e.jsx("button",{onClick:w=>{w.stopPropagation(),y(r)},className:`rounded-full transition-all duration-200 ${r===g?"h-2.5 w-8 bg-yellow-400":"h-2.5 w-2.5 bg-white/50 hover:bg-white/80"}`,"aria-label":`Go to slide ${r+1}`},s.id))})]}),e.jsx(Q,{onMouseEnter:()=>i(1),onMouseLeave:()=>i(null),hovered:a===1}),e.jsxs(k,{id:"news-update","data-news-section":"true",href:p[m].url,className:"relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-between overflow-hidden bg-yellow-400 p-6 no-underline sm:aspect-[16/9] sm:p-8 lg:aspect-auto lg:h-auto lg:w-1/4 lg:flex-1 lg:p-8",onMouseEnter:()=>i(2),onMouseLeave:()=>i(null),children:[e.jsxs("div",{className:`absolute top-0 right-0 bottom-0 left-0 overflow-hidden transition-all duration-400 ease-out lg:duration-600 ${a===2?"scale-100 opacity-100":"scale-105 opacity-0"}`,children:[e.jsx(_,{mode:"wait",children:e.jsx(z.div,{className:"h-full w-full",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.9,ease:[.16,1,.3,1]},style:{transform:"translateZ(0)"},children:e.jsx("img",{src:p[m].image,alt:p[m].title,className:"h-full w-full object-cover",style:{objectPosition:"center center",transform:"translateZ(0)",backfaceVisibility:"hidden"},onError:s=>{const r=s.currentTarget,w=parseInt(r.dataset.fallbackTried||"0",10);try{let v=new URL(r.src).pathname.replace(/^\//,"");v.startsWith("public/")&&(v=v.slice(7)),v.startsWith("images/")&&(v=v.slice(7));const P=v.replace(/^kristalin-assets\/public\//,"");w===0?(r.dataset.fallbackTried="1",r.src=`${window.location.origin}/images/${P}`):w===1?(r.dataset.fallbackTried="2",r.src=`${window.location.origin}/kristalin-assets/public/${P}`):r.style.display="none"}catch{r.style.display="none"}},loading:"lazy",decoding:"async",fetchPriority:"low"})},m)}),e.jsx("div",{className:"absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"})]}),e.jsx("div",{className:"relative z-10 mb-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:`text-xl font-bold transition-all duration-300 sm:text-2xl lg:text-3xl ${a===2?"text-white lg:scale-110":"scale-100 text-gray-800"}`,children:e.jsx("a",{href:"/news",onClick:s=>{s.stopPropagation()},className:`${a===2?"text-white hover:text-yellow-200":"text-gray-800 hover:text-yellow-700"} underline-offset-4 hover:underline`,children:t("pages.welcome.news.title_short")})}),e.jsxs("div",{className:"flex items-center gap-3",children:[p.length>1&&e.jsxs("div",{className:"flex gap-1",children:[e.jsx("button",{onClick:s=>{s.preventDefault(),s.stopPropagation(),x(r=>(r-1+p.length)%p.length)},className:`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 lg:hover:scale-110 ${a===2?"text-white hover:bg-white/20":"text-gray-700 hover:bg-gray-200"}`,children:e.jsx("svg",{className:"h-3 w-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})})}),e.jsx("button",{onClick:s=>{s.preventDefault(),s.stopPropagation(),x(r=>(r+1)%p.length)},className:`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 lg:hover:scale-110 ${a===2?"text-white hover:bg-white/20":"text-gray-700 hover:bg-gray-200"}`,children:e.jsx("svg",{className:"h-3 w-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})})]}),p[m].priority==="high"&&e.jsxs("div",{className:`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-all duration-300 ${a===2?"bg-white/20 text-white":"bg-red-100 text-red-700"}`,children:[e.jsx("div",{className:"h-1.5 w-1.5 rounded-full bg-current"}),e.jsx("span",{children:t("pages.welcome.news.highlight_badge")})]})]})]})}),e.jsx("div",{className:"relative z-10 flex flex-1 flex-col justify-center",children:e.jsx(_,{mode:"wait",children:e.jsx(z.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.4,ease:"easeInOut"},className:"mb-4",children:p.length>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[e.jsx("div",{className:`h-1 w-1 rounded-full transition-colors duration-300 ${a===2?"bg-white":"bg-gray-500"}`}),e.jsx("div",{className:`text-xs font-medium transition-colors duration-300 ${a===2?"text-gray-200":"text-gray-600"}`,children:p[m].date})]}),e.jsx("div",{className:`mb-3 line-clamp-2 text-sm leading-tight font-bold transition-colors duration-300 sm:text-base lg:text-lg ${a===2?"text-white":"text-gray-800"}`,children:p[m].title}),e.jsx("div",{className:`line-clamp-3 text-xs leading-relaxed transition-colors duration-300 sm:text-sm ${a===2?"text-gray-100":"text-gray-700"}`,children:p[m].excerpt})]}):e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"mb-2 text-4xl",children:"📰"}),e.jsx("p",{className:`text-sm font-medium transition-colors duration-300 ${a===2?"text-white":"text-gray-800"}`,children:t("pages.welcome.news.no_news_available")})]})},m)})}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("div",{className:`mb-3 flex items-center justify-between transition-colors duration-300 ${a===2?"border-white/20":"border-black/10"}`,children:e.jsxs("div",{className:`flex items-center text-sm font-semibold transition-all duration-300 sm:text-base ${a===2?"text-white":"text-gray-800"}`,children:[e.jsx("span",{children:t("pages.welcome.news.view_button")}),e.jsx("div",{className:`ml-2 transition-transform duration-300 ${a===2?"translate-x-1":"translate-x-0"}`,children:e.jsx("svg",{className:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 8l4 4m0 0l-4 4m4-4H3"})})})]})}),e.jsx("div",{className:"flex justify-center gap-1.5",children:p.map((s,r)=>e.jsx("button",{onClick:w=>{w.preventDefault(),w.stopPropagation(),x(r)},className:`transition-all duration-300 ${r===m?`h-1.5 w-6 rounded-full ${a===2?"bg-white":"bg-gray-800"}`:`h-1.5 w-1.5 rounded-full ${a===2?"bg-white/40 hover:bg-white/60":"bg-gray-400 hover:bg-gray-600"}`}`},r))})]})]})]})]})})]})}),e.jsx(G,{minimal:!0}),e.jsx("style",{dangerouslySetInnerHTML:{__html:`
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

          /* Hero CTA — GPU-friendly hover (no transition-all / gradient morph) */
          .hero-cta-btn {
            transition:
              transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateZ(0);
          }

          @media (prefers-reduced-motion: no-preference) {
            .hero-cta-btn:hover {
              transform: translate3d(0, -2px, 0);
            }

            .hero-cta-btn:active {
              transform: translate3d(0, 0, 0);
            }
          }

          .hero-cta-btn--primary:hover {
            box-shadow: 0 12px 28px -8px rgba(245, 158, 11, 0.45);
          }

          .hero-cta-btn--outline:hover {
            background-color: #fde047;
            border-color: #f59e0b;
            color: #111827;
            box-shadow: 0 10px 24px -10px rgba(245, 158, 11, 0.35);
          }

          .hero-cta-btn--ghost:hover {
            border-color: #fbbf24;
            background-color: #fffbeb;
            color: #b45309;
            box-shadow: 0 10px 24px -12px rgba(15, 23, 42, 0.18);
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
            .lg\\:h-\\[400px\\] {
              height: auto;
              min-height: 400px;
            }

            .lg\\:h-\\[300px\\] {
              height: auto;
              min-height: 300px;
            }
          }

          @media (max-width: 768px) {
            .md\\:h-\\[350px\\] {
              height: auto;
              min-height: 350px;
            }

            .md\\:h-\\[250px\\] {
              height: auto;
              min-height: 250px;
            }
          }

          /* Responsive section heights */
          @media (max-width: 1023px) {
            section {
              height: auto !important;
            }

            section > div {
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
            section > div {
              min-height: 250px;
            }

            .text-2xl {
              font-size: 1.75rem;
            }

            .text-3xl {
              font-size: 2rem;
            }

            .text-4xl {
              font-size: 2.25rem;
            }
          }

          /* Transitions: omit transform on universal selector — hero CTAs manage their own */
          .welcome-page :where(input, select, textarea, label) {
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, backdrop-filter;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          }

          /* LCP-safe hero motion: text block only (buttons excluded from transform nudge) */
          @media (prefers-reduced-motion: no-preference) {
            .welcome-hero-micro .welcome-hero-nudge--a {
              transform: translate3d(0, 14px, 0);
              opacity: 1;
              transition: transform 0.52s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .welcome-hero-micro--ready .welcome-hero-nudge--a {
              transform: translate3d(0, 0, 0);
            }
          }

          .welcome-lcp-hero {
            transition: none;
            transform: translateZ(0);
          }

          @media (prefers-reduced-motion: no-preference) {
            .welcome-csr-hover-ready .welcome-lcp-hero {
              transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
          }

          /* Enhanced hover states for cards */
          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          /* Hero/LCP images: smooth scaling; crisp-edges avoided for photos */
          .welcome-page img:not(.welcome-lcp-hero) {
            image-rendering: -webkit-optimize-contrast;
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

          /* Focus states for accessibility */
          *:focus {
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
            * {
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
        `}})]})]})};export{de as default};
