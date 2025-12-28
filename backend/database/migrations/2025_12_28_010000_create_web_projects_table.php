<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('web_projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('type'); // website, app, seo, ecommerce, webapp
            $table->string('category');
            $table->string('icon')->nullable();
            $table->string('color')->default('from-primary-500 to-secondary-500');
            $table->string('image')->nullable();
            $table->string('mockup_image')->nullable();
            $table->text('description')->nullable();
            $table->string('client')->nullable();
            $table->string('industry')->nullable();
            $table->string('year')->nullable();
            $table->json('technologies')->nullable();
            $table->json('features')->nullable();
            $table->json('results')->nullable();
            $table->string('link')->nullable();
            $table->text('testimonial')->nullable();
            $table->text('challenge')->nullable();
            $table->text('solution')->nullable();
            $table->json('gallery')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('web_projects');
    }
};
