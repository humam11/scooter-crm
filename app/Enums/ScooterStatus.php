<?php

namespace App\Enums;

enum ScooterStatus: string
{
    case AVAILABLE = 'available';
    case IN_USE = 'in_use';
    case MAINTENANCE = 'maintenance';
    case OFFLINE = 'offline';
}
