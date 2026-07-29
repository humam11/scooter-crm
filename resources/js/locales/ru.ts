export const ru = {
    // Common
    email: 'Электронная почта',
    password: 'Пароль',
    passwordConfirmation: 'Подтверждение пароля',
    login: 'Вход',
    register: 'Регистрация',
    logout: 'Выход',
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Редактировать',
    create: 'Создать',
    back: 'Назад',
    loading: 'Загрузка...',
    
    // Auth
    loginTitle: 'Войти в систему',
    registerTitle: 'Регистрация',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    dontHaveAccount: 'Нет аккаунта?',
    loginHere: 'Войти',
    registerHere: 'Зарегистрироваться',
    
    // Dashboard
    dashboard: 'Панель управления',
    statistics: 'Статистика',
    scooterStatusStats: 'Статус самокатов',
    averageBattery: 'Средний заряд батареи',
    activeRentals: 'Активные аренды',
    totalScooters: 'Всего самокатов',
    activePercentage: 'Процент активных',
    
    // Scooters
    scooters: 'Самокаты',
    scooter: 'Самокат',
    addScooter: 'Добавить самокат',
    editScooter: 'Редактировать самокат',
    scooterId: 'ID самоката',
    model: 'Модель',
    status: 'Статус',
    batteryLevel: 'Уровень батареи',
    latitude: 'Широта',
    longitude: 'Долгота',
    lastUpdated: 'Последнее обновление',
    
    // Scooter statuses
    available: 'Доступен',
    in_use: 'В использовании',
    maintenance: 'На обслуживании',
    offline: 'Не в сети',
    
    // Rentals
    rentals: 'Аренды',
    rental: 'Аренда',
    addRental: 'Добавить аренду',
    editRental: 'Редактировать аренду',
    rentalId: 'ID аренды',
    userName: 'Имя клиента',
    userPhone: 'Телефон клиента',
    startTime: 'Время начала',
    endTime: 'Время окончания',
    completeRental: 'Завершить аренду',
    
    // Rental statuses
    active: 'Активна',
    completed: 'Завершена',
    
    // Messages
    loginSuccess: 'Успешный вход',
    registerSuccess: 'Регистрация успешна',
    logoutSuccess: 'Выход выполнен',
    scooterCreated: 'Самокат создан',
    scooterUpdated: 'Самокат обновлен',
    scooterDeleted: 'Самокат удален',
    rentalCreated: 'Аренда создана',
    rentalUpdated: 'Аренда обновлена',
    rentalDeleted: 'Аренда удалена',
    
    // Errors
    error: 'Ошибка',
    invalidCredentials: 'Неверные учетные данные',
    fillAllFields: 'Заполните все поля',
    passwordsMustMatch: 'Пароли должны совпадать',
    somethingWentWrong: 'Что-то пошло не так',
    
    // Validation
    required: 'Обязательное поле',
    invalidEmail: 'Неверный email',
    minLength: 'Минимальная длина',
    maxLength: 'Максимальная длина',
    
    // Confirmation
    confirmDelete: 'Вы уверены, что хотите удалить?',
    yes: 'Да',
    no: 'Нет',
};

export type TranslationKey = keyof typeof ru;
