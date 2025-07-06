import React from 'react';

const aboutItems = [
  {
    title: 'Visi',
    desc: 'Menjadi perusahaan pertambangan dan perdagangan emas terkemuka yang berintegritas dan berkelanjutan di Indonesia.',
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
    ),
  },
  {
    title: 'Misi',
    desc: 'Mengelola sumber daya emas secara profesional, ramah lingkungan, dan memberikan nilai tambah bagi pemangku kepentingan.',
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" /></svg>
    ),
  },
  {
    title: 'Keunggulan',
    desc: 'Didukung tim ahli, teknologi modern, dan komitmen pada tata kelola yang baik.',
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
    ),
  },
];

export default function About() {
  return (
    <section className="bg-white py-16 px-4 md:px-0" id="about">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tentang Kristalin Eka Lestari</h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Kristalin Eka Lestari adalah perusahaan pertambangan dan perdagangan emas yang berkomitmen pada integritas, keberlanjutan, dan inovasi. Kami hadir untuk memberikan nilai tambah bagi Indonesia melalui pengelolaan sumber daya alam yang bertanggung jawab.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {aboutItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 