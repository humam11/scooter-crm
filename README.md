# Система Управления Прокатом Самокатов

CRM-система для управления парком электросамокатов с русским интерфейсом.

## 🛠 Стек

- **Backend:** Laravel 11 + PHP 8.2
- **Frontend:** React 18 + TypeScript + Vite
- **Database:** SQLite / PostgreSQL
- **Auth:** Laravel Sanctum (Bearer Token)
- **UI:** TailwindCSS + Recharts

## 🚀 Быстрый Старт

```bash
# 1. Применить миграции и создать тестовые данные
php artisan migrate:fresh --seed

# 2. Запустить backend (Терминал 1)
php artisan serve

# 3. Запустить frontend (Терминал 2)
npm run dev

# 4. Открыть в браузере
# http://localhost:8000
```

## 👤 Вход в Систему

- **Email:** test@example.com
- **Пароль:** password123

## � Тестовые Данные

После `php artisan migrate:fresh --seed` создается:
- 1 пользователь
- 50 самокатов (разные модели, статусы, батареи)
- 40 аренд (30 завершенных + 10 активных)

## 💡 Дополнительные Команды

```bash
# Только самокаты
php artisan db:seed --class=ScooterSeeder

# Только аренды
php artisan db:seed --class=RentalSeeder

# Сборка frontend для production
npm run build
```
