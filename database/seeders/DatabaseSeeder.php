<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Создать тестового пользователя
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['password' => bcrypt('password123')]
        );

        // Запустить сидеры по порядку
        $this->call([
            ScooterSeeder::class,
            RentalSeeder::class,
        ]);
    }
}
