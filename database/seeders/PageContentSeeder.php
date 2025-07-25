<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PageContent;

class PageContentSeeder extends Seeder
{
    public function run()
    {
        // About page sample content
        PageContent::create([
            'page_name' => 'about',
            'section' => 'hero',
            'content_type' => 'image',
            'content_key' => 'hero_background',
            'content_value' => '', // akan diisi setelah upload
            'status' => 'active'
        ]);
        PageContent::create([
            'page_name' => 'about',
            'section' => 'hero',
            'content_type' => 'text',
            'content_key' => 'hero_title',
            'content_value' => 'About PT Kristalin Eka Lestari',
            'status' => 'active'
        ]);
        PageContent::create([
            'page_name' => 'about',
            'section' => 'main_content',
            'content_type' => 'rich_text',
            'content_key' => 'company_description',
            'content_value' => '<p>PT Kristalin Eka Lestari adalah perusahaan pertambangan emas...</p>',
            'status' => 'active'
        ]);
        // Welcome page content
        PageContent::create([
            'page_name' => 'welcome',
            'section' => 'hero',
            'content_type' => 'image',
            'content_key' => 'hero_image',
            'content_value' => '',
            'status' => 'active'
        ]);
        // Tambahkan sample data lain sesuai kebutuhan...
    }
}
