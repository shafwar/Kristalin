<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('feedback_reports', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('department')->nullable();
            $table->string('priority');
            $table->string('subject');
            $table->text('description');
            $table->date('incident_date')->nullable();
            $table->string('file')->nullable();
            $table->string('ticket_number')->unique();
            $table->string('status')->default('submitted');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('feedback_reports');
    }
}; 