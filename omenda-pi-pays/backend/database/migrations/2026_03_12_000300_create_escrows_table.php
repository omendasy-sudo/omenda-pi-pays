<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('escrows', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->decimal('amount', 10, 4);
            $table->string('status')->default('holding');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('escrows');
    }
};
