# 📋 Panduan Implementasi Artikel Berita - PT Kristalin Ekalestari

## 🎯 Overview

Dokumentasi ini menjelaskan pola dan langkah-langkah implementasi artikel berita untuk website PT Kristalin Ekalestari, khususnya untuk kategori "Pembangunan Rumah Baru untuk Nelayan di Desa Nifasi" di bulan Maret 2025.

## 📊 Struktur Data yang Digunakan

### 1. **Struktur Utama (newsData)**

```typescript
interface NewsMonth {
    month: string; // 'MARET'
    monthId: string; // 'maret-2025'
    categories: NewsCategory[];
}

interface NewsCategory {
    id: string; // 'pembangunan-rumah-nelayan'
    title: string; // 'Pembangunan Rumah Baru untuk Nelayan di Desa Nifasi'
    newsItems: NewsItem[];
}

interface NewsItem {
    id: string; // 'mar-1', 'mar-2', 'mar-3'
    title: string; // Judul artikel
    date: string; // '22 Mar 2025'
    url: string; // '/news/mar-1'
    excerpt: string; // Ringkasan singkat
    fullContent: {
        title: string;
        date: string; // Format lengkap '22 Maret 2025'
        author: string; // 'Tim Redaksi'
        source: string; // 'Warta Ekonomi'
        sourceUrl: string; // URL sumber asli
        image: string; // '/pembangunan1.jpg'
        content: string; // HTML content lengkap
    };
}
```

## 🔄 Pola Implementasi yang Digunakan

### **Pola 1: Paraphrasing untuk Menghindari Copyright**

```typescript
// ❌ JANGAN: Copy-paste langsung dari sumber
'Nelayan laut Yustinus Monei lepas bahagia menerima kunci penyerahan rumah barunya';

// ✅ BENAR: Paraphrase dengan bahasa yang berbeda
'Nelayan laut Yustinus Monei merasakan kebahagiaan yang luar biasa saat menerima kunci rumah barunya';
```

### **Pola 2: Struktur HTML yang Konsisten**

```html
<div class="space-y-8">
    <!-- Opening Story -->
    <div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
        <h3 class="mb-3 text-lg font-bold text-blue-900">Judul Section</h3>
        <p class="text-base leading-relaxed text-blue-800">Konten pembuka...</p>
    </div>

    <!-- Main Content Sections -->
    <div class="space-y-6">
        <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Judul Section</h3>
        <!-- Content dengan styling yang konsisten -->
    </div>

    <!-- Conclusion -->
    <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-6">
        <h3 class="mb-3 text-lg font-bold text-gray-900">Kesimpulan</h3>
        <p class="text-base leading-relaxed text-gray-800">Konten penutup...</p>
    </div>
</div>
```

### **Pola 3: Styling Tailwind CSS yang Konsisten**

```css
/* Gradient Backgrounds */
bg-gradient-to-r from-blue-50 to-cyan-50    /* Opening story */
bg-gradient-to-r from-amber-50 to-yellow-50 /* Main content */
bg-gradient-to-r from-green-50 to-emerald-50 /* Specifications */
bg-gradient-to-r from-orange-50 to-red-50   /* Timeline */
bg-gradient-to-r from-purple-50 to-pink-50  /* Company messages */
bg-gradient-to-r from-indigo-50 to-purple-50 /* CSR programs */
bg-gradient-to-r from-teal-50 to-cyan-50    /* Impact */
bg-gradient-to-r from-gray-50 to-slate-50   /* Conclusion */

/* Card Layouts */
bg-white rounded-xl p-6 border border-gray-200 shadow-sm

/* Quote Blocks */
blockquote class="text-lg italic text-gray-700 border-l-4 border-amber-500 pl-4"
cite class="text-sm text-gray-600 mt-2 block"

/* Grid Layouts */
grid md:grid-cols-2 gap-6
grid md:grid-cols-3 gap-6
```

## 📝 Langkah-Langkah Implementasi

### **Step 1: Persiapan dan Analisis**

1. **Baca sumber artikel** dari URL yang diberikan
2. **Identifikasi informasi kunci:**
    - Nama tokoh utama (Yustinus Monei)
    - Lokasi (Desa Nifasi, Distrik Makimi, Kabupaten Nabire, Papua Tengah)
    - Tanggal kejadian (22 Maret 2025)
    - Nama perusahaan (PT Kristalin Ekalestari)
    - Program (CSR - Corporate Social Responsibility)
    - Spesifikasi rumah (Tipe 57, 2 kamar tidur, 1 kamar mandi)

### **Step 2: Paraphrasing Content**

```typescript
// Template untuk paraphrase
const paraphraseTemplate = {
    opening: 'Tokoh utama + lokasi + peristiwa + emosi',
    background: 'Latar belakang tokoh + profesi + kondisi sebelumnya',
    process: 'Proses seleksi + rekomendasi + kriteria',
    specifications: 'Detail teknis + standar + kualitas',
    quotes: 'Kutipan dari tokoh kunci + konteks',
    impact: 'Dampak positif + manfaat + berkelanjutan',
    conclusion: 'Komitmen perusahaan + harapan ke depan',
};
```

### **Step 3: Struktur Konten yang Wajib**

```typescript
const requiredSections = [
    'Opening Story', // Cerita pembuka yang menarik
    'Profil Penerima', // Detail tentang Yustinus Monei
    'Pesan dari Perusahaan', // Quote dari Anhar dan Maria Erari
    'Proses Seleksi', // Rekomendasi adat dan pendataan
    'Spesifikasi Rumah', // Detail teknis rumah
    'Program CSR', // Overview program berkelanjutan
    'Dampak Positif', // Manfaat bagi masyarakat
    'Kesimpulan', // Komitmen berkelanjutan
];
```

### **Step 4: Implementasi di File news.tsx**

```typescript
// 1. Cari lokasi kategori yang tepat
search_replace(
    file_path: "/Users/macbookpro2019/Herd/Kristalin/resources/js/pages/news.tsx",
    old_string: "newsItems: [],",
    new_string: "newsItems: [/* artikel baru */],"
);

// 2. Tambahkan artikel dengan struktur lengkap
{
    id: 'mar-X',
    title: 'Judul Artikel yang Menarik',
    date: 'XX Mar 2025',
    url: '/news/mar-X',
    excerpt: 'Ringkasan singkat yang menarik...',
    fullContent: {
        title: 'Judul Lengkap',
        date: 'XX Maret 2025',
        author: 'Tim Redaksi',
        source: 'Nama Sumber',
        sourceUrl: 'URL sumber asli',
        image: '/gambar.jpg',
        content: `HTML content lengkap`
    }
}
```

## 🎨 Template Styling yang Digunakan

### **1. Opening Story**

```html
<div class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
    <h3 class="mb-3 text-lg font-bold text-blue-900">Judul Section</h3>
    <p class="text-base leading-relaxed text-blue-800">Konten...</p>
</div>
```

### **2. Main Content Section**

```html
<div class="space-y-6">
    <h3 class="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">Judul Section</h3>
    <div class="from-[color]-50 to-[color]-50 border-[color]-200 rounded-xl border bg-gradient-to-r p-6">
        <!-- Content -->
    </div>
</div>
```

### **3. Quote Block**

```html
<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <blockquote class="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">"Kutipan dari tokoh..."</blockquote>
    <cite class="mt-2 block text-sm text-gray-600">- Nama Tokoh, Posisi</cite>
</div>
```

### **4. Grid Layout**

```html
<div class="mt-6 grid gap-6 md:grid-cols-3">
    <div class="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
        <div class="bg-[color]-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <svg class="text-[color]-600 h-8 w-8">...</svg>
        </div>
        <h4 class="mb-2 text-lg font-bold text-gray-900">Judul</h4>
        <p class="text-sm text-gray-600">Deskripsi</p>
    </div>
</div>
```

## 📋 Checklist Implementasi

### **Sebelum Implementasi:**

- [ ] Baca dan pahami sumber artikel
- [ ] Identifikasi informasi kunci
- [ ] Siapkan gambar yang sesuai
- [ ] Tentukan ID artikel yang unik

### **Selama Implementasi:**

- [ ] Paraphrase semua konten untuk menghindari copyright
- [ ] Gunakan struktur HTML yang konsisten
- [ ] Terapkan styling Tailwind CSS yang sesuai
- [ ] Sertakan semua section yang wajib
- [ ] Pastikan quote dan kutipan akurat
- [ ] Validasi format tanggal dan URL

### **Setelah Implementasi:**

- [ ] Test akses artikel melalui URL
- [ ] Periksa tampilan responsif
- [ ] Validasi konten tidak ada duplikasi
- [ ] Update todo list
- [ ] Dokumentasikan perubahan

## 🔧 Tools dan Commands yang Digunakan

### **1. File Operations**

```bash
# Read file untuk melihat struktur
read_file(target_file: "path/to/news.tsx")

# Search untuk mencari lokasi yang tepat
grep(pattern: "month: 'MARET'", path: "news.tsx")

# Edit file dengan search_replace
search_replace(file_path: "news.tsx", old_string: "...", new_string: "...")
```

### **2. Todo Management**

```typescript
// Create todo list
todo_write(merge: false, todos: [
    {id: 'task-1', content: 'Deskripsi tugas', status: 'in_progress'}
]);

// Update todo status
todo_write(merge: true, todos: [
    {id: 'task-1', status: 'completed'}
]);
```

## 📊 Contoh Implementasi Lengkap

### **Artikel yang Telah Dibuat:**

1. **mar-1:** "Nelayan Laut Yustinus Monei Terima Rumah Baru dari PT Kristalin Ekalestari"
    - Sumber: Warta Ekonomi
    - Gambar: `/pembangunan2.webp`
    - Fokus: Penyerahan kunci rumah

2. **mar-2:** "PT Kristalin Ekalestari Serahkan Kunci Rumah kepada Nelayan Desa Nifasi"
    - Sumber: VOI.id
    - Gambar: `/pembangunan1.jpg`
    - Fokus: Proses seleksi dan rekomendasi

3. **mar-3:** "Haru Nelayan Laut Desa Nifasi Dapat Rumah Baru dari PT Kristalin Ekalestari"
    - Sumber: Harian Daerah
    - Gambar: `/pembangunan3.jpg`
    - Fokus: Timeline pembangunan dan dampak positif

## ⚠️ Hal-Hal Penting yang Harus Diperhatikan

### **1. Copyright Avoidance**

- Selalu paraphrase konten dari sumber asli
- Gunakan bahasa yang berbeda namun tetap akurat
- Sertakan referensi sumber asli di sourceUrl
- Jangan copy-paste langsung

### **2. Konsistensi Styling**

- Gunakan gradient colors yang sudah ditentukan
- Terapkan spacing yang konsisten (space-y-8, space-y-6)
- Gunakan border dan shadow yang seragam
- Pastikan responsivitas di semua device

### **3. Struktur Data**

- ID artikel harus unik dan konsisten (mar-1, mar-2, mar-3)
- URL harus sesuai dengan ID (/news/mar-1)
- Tanggal harus dalam format yang konsisten
- Gambar harus ada di folder public

### **4. Konten Quality**

- Sertakan semua informasi penting dari sumber
- Buat konten yang engaging dan mudah dibaca
- Gunakan quote yang akurat dan relevan
- Pastikan flow cerita yang logis

## 🚀 Tips untuk Implementasi yang Optimal

1. **Baca sumber dengan teliti** sebelum mulai implementasi
2. **Buat outline** struktur artikel terlebih dahulu
3. **Gunakan template** yang sudah ada untuk konsistensi
4. **Test implementasi** secara bertahap
5. **Dokumentasikan** setiap perubahan yang dilakukan
6. **Validasi** hasil akhir sebelum menyelesaikan

## 📞 Support dan Troubleshooting

### **Common Issues:**

- **Timeout Error:** Gunakan edit yang lebih kecil atau pecah menjadi beberapa step
- **Duplicate Content:** Pastikan konten sudah diparaphrase dengan baik
- **Styling Issues:** Gunakan template yang sudah ada
- **Image Not Found:** Pastikan file gambar ada di folder public

### **Best Practices:**

- Selalu backup sebelum melakukan perubahan besar
- Test di development environment terlebih dahulu
- Gunakan version control untuk tracking changes
- Dokumentasikan setiap implementasi yang dilakukan

---

**Dokumentasi ini dibuat untuk memudahkan implementasi artikel berita yang konsisten dan berkualitas tinggi untuk website PT Kristalin Ekalestari.**

