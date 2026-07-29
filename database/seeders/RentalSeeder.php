<?php

namespace Database\Seeders;

use App\Models\Rental;
use App\Models\Scooter;
use App\Models\User;
use App\Enums\RentalStatus;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RentalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Получить первого пользователя
        $user = User::first();
        
        if (!$user) {
            $this->command->error('Сначала создайте пользователя! Запустите: php artisan db:seed --class=ScooterSeeder');
            return;
        }

        // Удалить существующие аренды пользователя
        Rental::whereHas('scooter', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->delete();

        // Получить самокаты пользователя
        $scooters = Scooter::where('user_id', $user->id)->get();

        if ($scooters->isEmpty()) {
            $this->command->error('У пользователя нет самокатов! Запустите: php artisan db:seed --class=ScooterSeeder');
            return;
        }

        // Русские имена
        $firstNames = [
            'Александр', 'Дмитрий', 'Максим', 'Иван', 'Артём',
            'Михаил', 'Даниил', 'Егор', 'Андрей', 'Никита',
            'Анна', 'Мария', 'Екатерина', 'Алина', 'Дарья',
            'Полина', 'Ольга', 'Юлия', 'Татьяна', 'Елена'
        ];

        $lastNames = [
            'Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев',
            'Петров', 'Соколов', 'Михайлов', 'Новиков', 'Фёдоров',
            'Морозов', 'Волков', 'Алексеев', 'Лебедев', 'Семёнов'
        ];

        $rentalCounter = 1;

        // Создать 30 завершенных аренд (исторические данные)
        for ($i = 0; $i < 30; $i++) {
            $scooter = $scooters->random();
            
            // Случайная дата за последние 30 дней
            $startTime = Carbon::now()->subDays(rand(1, 30))->subHours(rand(0, 23))->subMinutes(rand(0, 59));
            
            // Длительность аренды от 15 минут до 4 часов
            $durationMinutes = rand(15, 240);
            $endTime = (clone $startTime)->addMinutes($durationMinutes);

            Rental::create([
                'id' => sprintf('RENT%03d', $rentalCounter++),
                'scooter_id' => $scooter->id,
                'user_name' => $firstNames[array_rand($firstNames)] . ' ' . $lastNames[array_rand($lastNames)],
                'user_phone' => '+7 ' . rand(900, 999) . ' ' . rand(100, 999) . '-' . rand(10, 99) . '-' . rand(10, 99),
                'start_time' => $startTime,
                'end_time' => $endTime,
                'status' => RentalStatus::COMPLETED->value,
            ]);
        }

        // Создать 10 активных аренд (текущие)
        $availableScooters = $scooters->shuffle()->take(10);
        
        foreach ($availableScooters as $scooter) {
            // Начало аренды от 10 минут до 3 часов назад
            $startTime = Carbon::now()->subMinutes(rand(10, 180));

            Rental::create([
                'id' => sprintf('RENT%03d', $rentalCounter++),
                'scooter_id' => $scooter->id,
                'user_name' => $firstNames[array_rand($firstNames)] . ' ' . $lastNames[array_rand($lastNames)],
                'user_phone' => '+7 ' . rand(900, 999) . ' ' . rand(100, 999) . '-' . rand(10, 99) . '-' . rand(10, 99),
                'start_time' => $startTime,
                'end_time' => null,
                'status' => RentalStatus::ACTIVE->value,
            ]);

            // Обновить статус самоката на "в использовании"
            $scooter->update(['status' => 'in_use']);
        }

        $this->command->info('✅ Создано 30 завершенных аренд');
        $this->command->info('✅ Создано 10 активных аренд');
        $this->command->info('✅ Обновлены статусы самокатов');
    }
}
