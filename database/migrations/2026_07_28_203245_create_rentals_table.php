<?php

use App\Enums\RentalStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rentals', function (Blueprint $table) {
            $table->string('id')->primary();

            $table->string('scooter_id');

            $table->string('user_name');
            $table->string('user_phone');

            $table->timestamp('start_time');
            $table->timestamp('end_time')->nullable();

            $table->enum('status', array_column(RentalStatus::cases(), 'value'));

            $table->timestamps();

            $table->foreign('scooter_id')
                ->references('id')
                ->on('scooters')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rentals');
    }
};
