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
    Schema::create('complaints', function (Blueprint $table) {
        $table->id();
        $table->string('tracking_number')->unique();
        $table->foreignId('invoice_line_item_id')->constrained()->onDelete('cascade');
        $table->foreignId('dealer_id')->constrained('users')->onDelete('cascade');
        $table->decimal('complain_qty_kg', 10, 2);
        $table->integer('complain_no_of_reels_sheets')->nullable();
        $table->boolean('visit_required')->default(false);
        $table->json('type_of_complaint');
        $table->text('description')->nullable();
        $table->string('status')->default('submitted');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
