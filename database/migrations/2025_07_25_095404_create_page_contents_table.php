<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('page_name', 100); // e.g. welcome, about, vision-mission
            $table->string('section', 100); // e.g. hero, main_content, features
            $table->enum('content_type', ['text', 'rich_text', 'image', 'json'])->default('text');
            $table->string('content_key', 100); // e.g. title, description, background_image
            $table->longText('content_value')->nullable();
            $table->json('meta')->nullable(); // additional data (animation, styling, etc)
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            $table->index(['page_name', 'section']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_contents');
    }
};
