<?php

namespace Database\Seeders;

use App\Models\Scooter;
use App\Models\User;
use App\Enums\ScooterStatus;
use Illuminate\Database\Seeder;

class ScooterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Получить первого пользователя или создать тестового
        $user = User::first();
        
        if (!$user) {
            $user = User::create([
                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
            ]);
        }

        // Удалить существующие самокаты пользователя перед созданием новых
        Scooter::where('user_id', $user->id)->delete();

        // Модели самокатов
        $models = [
            'Xiaomi Mi Electric Scooter Pro 2',
            'Ninebot Max G30',
            'Segway Ninebot ES2',
            'Kugoo S3 Pro',
            'Xiaomi M365',
            'Ninebot ES4',
            'Kugoo M4 Pro',
            'Xiaomi Pro 2',
            'Razor E300',
            'Segway Air T15',
        ];

        // Координаты в Москве (разные районы)
        $locations = [
            ['lat' => 55.7558, 'lon' => 37.6173], // Красная площадь
            ['lat' => 55.7522, 'lon' => 37.6156], // Центр
            ['lat' => 55.7612, 'lon' => 37.6098], // Арбат
            ['lat' => 55.7480, 'lon' => 37.6201], // Китай-город
            ['lat' => 55.7520, 'lon' => 37.5890], // Новый Арбат
            ['lat' => 55.7470, 'lon' => 37.6000], // Пречистенка
            ['lat' => 55.7590, 'lon' => 37.6250], // Чистые пруды
            ['lat' => 55.7540, 'lon' => 37.6300], // Таганка
            ['lat' => 55.7600, 'lon' => 37.6400], // Басманный
            ['lat' => 55.7450, 'lon' => 37.6100], // Якиманка
        ];

        $statuses = ScooterStatus::cases();

        // Создать 50 самокатов
        for ($i = 1; $i <= 50; $i++) {
            $status = $statuses[array_rand($statuses)];
            $location = $locations[array_rand($locations)];
            
            // Добавить случайное смещение к координатам
            $lat = $location['lat'] + (rand(-100, 100) / 10000);
            $lon = $location['lon'] + (rand(-100, 100) / 10000);
            
            // Генерация уровня батареи в зависимости от статуса
            if ($status === ScooterStatus::OFFLINE) {
                $batteryLevel = rand(0, 20); // Низкий заряд для offline
            } elseif ($status === ScooterStatus::MAINTENANCE) {
                $batteryLevel = rand(0, 50); // Низкий-средний для maintenance
            } elseif ($status === ScooterStatus::IN_USE) {
                $batteryLevel = rand(30, 100); // Средний-высокий для in_use
            } else {
                $batteryLevel = rand(50, 100); // Высокий для available
            }

            Scooter::create([
                'id' => sprintf('SC%03d', $i),
                'user_id' => $user->id,
                'model' => $models[array_rand($models)],
                'status' => $status->value,
                'battery_level' => $batteryLevel,
                'latitude' => number_format($lat, 8, '.', ''),
                'longitude' => number_format($lon, 8, '.', ''),
                'last_updated' => now()->subMinutes(rand(0, 1440)), // За последние 24 часа
            ]);
        }
    }
}
