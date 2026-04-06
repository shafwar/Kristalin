# Panduan Pembuatan News (Berita) – Kristalin

Dokumen ini berisi langkah baku untuk menambah atau mengubah berita di situs Kristalin. Ikuti urutan di bawah agar berita tampil konsisten di halaman News, News Detail, Welcome, dan CSR, termasuk gambar dan terjemahan (ID/EN/ZH).

---

## Ringkasan file yang disentuh

| File                                                                   | Peran                                                                         |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `resources/js/pages/news.tsx`                                          | Data berita (month, categories, newsItems), articleKeyMap, categoryMapping    |
| `resources/js/pages/NewsDetail.tsx`                                    | Halaman detail: case artikel + getTranslatedContent, helper konten terjemahan |
| `resources/js/pages/welcome.tsx`                                       | Preview berita di homepage (newsItems)                                        |
| `resources/js/pages/csr.tsx`                                           | Preview berita di halaman CSR (csrNews)                                       |
| `lang/id/messages.php`, `lang/en/messages.php`, `lang/zh/messages.php` | Terjemahan detail berita (`news_detail.*`)                                    |
| `lang/id/pages.php`, `lang/en/pages.php`, `lang/zh/pages.php`          | Terjemahan welcome.news.items, csr.news, news_archive.categories              |
| `public/kristalin-assets/public/`                                      | File gambar (harus ada di sini agar fallback statis jalan)                    |

Untuk aturan umum gambar (path, CDN, R2) lihat **IMAGE-IMPLEMENTATION-GUIDE.md** di root project.

---

## Step 1: Data berita di `news.tsx`

1. **Tentukan ID artikel** (unik, dipakai di URL): mis. `feb26-1`, `feb26-2`. URL jadi `/news/feb26-1`.

2. **Tambah atau pilih month + category**
    - Cari array `newsData` (export).
    - Jika bulan baru: tambah objek `{ month: 'FEBRUARI', monthId: 'februari-2026', categories: [...] }`.
    - Jika bulan sudah ada: tambah/ubah `categories` dan di dalamnya `newsItems`.

3. **Struktur satu artikel** (di dalam `newsItems`):

```ts
{
    id: 'feb26-1',
    title: 'Judul Bahasa Indonesia',
    date: '10 Feb 2026',
    url: '/news/feb26-1',
    excerpt: 'Ringkasan singkat satu paragraf...',
    fullContent: {
        title: 'Judul lengkap',
        date: '10 Februari 2026',
        author: 'Tim Redaksi',
        source: 'AKURAT.CO',
        sourceUrl: 'https://...',
        image: '/february-news-01.jpg',   // path dengan / di depan, nama file tanpa spasi
        content: '',                       // bisa kosong jika pakai terjemahan HTML di NewsDetail
    },
},
```

- **image:** selalu path dengan leading slash, nama file tanpa spasi (mis. `/february-news-01.jpg`). Jangan pakai `public/` atau `kristalin-assets/` di path.

4. **articleKeyMap (dua tempat di news.tsx)**  
   Cari `getTranslatedArticleTitle` dan `getTranslatedArticleExcerpt`; di masing-masing ada `articleKeyMap`. Tambah mapping ID → key terjemahan:

```ts
'feb26-1': 'feb26_meyah_vehicle',
'feb26-2': 'feb26_kisara_gold',
```

5. **categoryMapping (filter kategori)**  
   Cari `categoryMapping`. Tambah `id` kategori baru ke array yang sesuai (mis. `mobil-operasional-dewan-adat-meyah` di `community_development`). ID kategori = field `id` pada objek category di `newsData`.

---

## Step 2: NewsDetail – case artikel + konten terjemahan

1. **Tambah case di `getTranslatedContent`** (switch by `articleId`):

```ts
case 'feb26-1':
    return {
        title: t('news_detail.feb26_meyah_vehicle.title'),
        excerpt: t('news_detail.feb26_meyah_vehicle.excerpt'),
        categoryTitle: t('news_archive.categories.mobil-operasional-dewan-adat-meyah'),
        author: t('news_detail.feb26_meyah_vehicle.author'),
        source: t('news_detail.feb26_meyah_vehicle.source'),
        date: t('news_detail.feb26_meyah_vehicle.date'),
        content: getFeb26MeyahVehicleTranslatedContent(),
    };
```

2. **Helper konten HTML terjemahan**  
   Buat fungsi (mis. `getFeb26MeyahVehicleTranslatedContent()`) yang mengembalikan string HTML berisi `t('news_detail.feb26_meyah_vehicle.xxx')` untuk tiap bagian (opening, handover, commitment, dll.). Lihat contoh `getFeb26MeyahVehicleTranslatedContent` / `getFeb26KisaraGoldTranslatedContent` di file yang sama.

3. **Gambar di detail**  
   Sudah pakai `getArticleImageUrl(newsItem.fullContent.image)` dan fallback 3 tingkat (CDN → proxy → statis). Tidak perlu ubah selama di data pakai path seperti `/february-news-01.jpg`.

---

## Step 3: Terjemahan (ID / EN / ZH)

1. **messages.php (news_detail)**  
   Di `lang/id/messages.php`, `lang/en/messages.php`, `lang/zh/messages.php` tambah key untuk artikel baru, mis.:

```php
'feb26_meyah_vehicle' => [
    'title' => '...',
    'excerpt' => '...',
    'author' => '...',
    'source' => '...',
    'date' => '...',
    'opening_title' => '...',
    'opening_content' => '...',
    'handover_title' => '...',
    'handover_content' => '...',
    // ... semua key yang dipakai di NewsDetail helper
],
```

Ulangi struktur yang sama di EN dan ZH dengan terjemahan masing-masing.

2. **pages.php – welcome & CSR & archive**
    - **Welcome:** tambah `pages.welcome.news.items.feb26-1.title`, `pages.welcome.news.items.feb26-1.excerpt` (dan feb26-2 jika ada) di id/en/zh.
    - **CSR:** tambah `pages.csr.news.feb26_1.title`, `pages.csr.news.feb26_1.excerpt` (pakai underscore, bukan strip).
    - **Archive kategori:** tambah `news_archive.categories.<category-id>` untuk kategori baru (mis. `mobil-operasional-dewan-adat-meyah`, `ekspansi-kisara-capital-emas`) di id/en/zh.

---

## Step 4: Gambar – path, file, R2, fallback

1. **Path di code**
    - Di `news.tsx` (fullContent.image), welcome, csr: gunakan path dengan leading slash, nama file tanpa spasi, mis. `/february-news-01.jpg`, `/News-february-2.jpg`.
    - Jangan pakai `public/` atau `kristalin-assets/public/` di path.

2. **File fisik**
    - Simpan file di **`public/kristalin-assets/public/`** dengan nama yang sama (mis. `february-news-01.jpg`).
    - Nama file tanpa spasi agar URL CDN/fallback tidak bermasalah.

3. **Agar gambar tampil (urutan fallback)**
    - **CDN:** upload ke R2 dengan key `public/filename.jpg`. Contoh:
        ```bash
        ./scripts/push-images-to-r2.sh
        ```
        atau per file:
        ```bash
        php artisan r2:push-file "kristalin-assets/public/february-news-01.jpg"
        php artisan r2:push-file "kristalin-assets/public/News-february-2.jpg"
        ```
    - **Proxy:** jika R2 dikonfigurasi di production, route `/images/{path}` akan mencoba layani dari R2.
    - **Statis:** jika CDN/proxy gagal, gambar diambil dari `https://kristalin.co.id/kristalin-assets/public/filename.jpg`. Pastikan file ada di repo dan ikut deploy.

4. **Detail teknis gambar**  
   Lihat **IMAGE-IMPLEMENTATION-GUIDE.md** (path, imageUrl/getArticleImageUrl, VITE_ASSET_BASE_URL, R2).

---

## Step 5: Welcome & CSR preview

1. **welcome.tsx**  
   Di array `newsItems` tambah item dengan `id`, `date`, `title`, `excerpt`, `image`, `url`, `priority`. Untuk image gunakan `imageUrl('/february-news-01.jpg')` (path sama dengan di news.tsx).

2. **csr.tsx**  
   Di array `csrNews` tambah item dengan `id`, `title`, `excerpt`, `date`, `image` (path saja, mis. `'/february-news-01.jpg'`), `category`. Array ini di-map dengan `imageUrl(item.image)` jadi tidak perlu panggil imageUrl di sini untuk value image.

---

## Step 6: Deploy & cek

1. Build: `npm run build`
2. Commit & push (termasuk file gambar di `public/kristalin-assets/public/` jika baru).
3. Setelah deploy: hard refresh (Ctrl+Shift+R), cek `/news/<id>`, welcome, dan CSR.
4. Jika pakai R2: jalankan push gambar (script atau artisan) di environment yang punya kredensial R2.

---

## Checklist singkat (untuk Cursor/developer berikutnya)

- [ ] `news.tsx`: tambah month/category/newsItems, articleKeyMap (title + excerpt), categoryMapping
- [ ] `NewsDetail.tsx`: tambah case di getTranslatedContent + helper konten HTML terjemahan
- [ ] `lang/*/messages.php`: tambah key `news_detail.<article_key>` (id/en/zh)
- [ ] `lang/*/pages.php`: tambah welcome.news.items, csr.news, news_archive.categories (id/en/zh)
- [ ] Gambar: file di `public/kristalin-assets/public/<filename>`, path di code `/filename` (tanpa spasi)
- [ ] welcome.tsx: tambah item di newsItems dengan imageUrl(path)
- [ ] csr.tsx: tambah item di csrNews dengan image path
- [ ] Build + deploy; opsional: push gambar ke R2

---

**Referensi:** IMAGE-IMPLEMENTATION-GUIDE.md (path gambar, CDN, R2), docs/SAFETY-DEPLOYMENT.md (deploy aman).
