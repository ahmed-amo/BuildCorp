<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('slug')->unique();
            $table->integer('year');
            $table->string('city');
            $table->foreignId('service_id')->constrained('services')->onDelete('cascade');
            $table->string('image_small')->nullable();
            $table->string('image_large')->nullable();
            $table->timestamps();
        });
    }


    public function down(): void
    {
        //
    }
};
