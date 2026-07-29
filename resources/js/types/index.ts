export interface User {
    id: number;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Scooter {
    id: string;
    user_id: number;
    model: string;
    status: 'available' | 'in_use' | 'maintenance' | 'offline';
    battery_level: number;
    latitude: string;
    longitude: string;
    last_updated: string | null;
    created_at: string;
    updated_at: string;
    rentals?: Rental[];
}

export interface Rental {
    id: string;
    scooter_id: string;
    user_name: string;
    user_phone: string;
    start_time: string;
    end_time: string | null;
    status: 'active' | 'completed';
    created_at: string;
    updated_at: string;
    scooter?: Scooter;
}

export interface DashboardStats {
    scooter_status_stats: {
        available: number;
        in_use: number;
        maintenance: number;
        offline: number;
    };
    average_battery: number;
    active_rentals: number;
    total_scooters: number;
    active_percentage: number;
}

export interface AuthResponse {
    user: User;
    token: string;
}
