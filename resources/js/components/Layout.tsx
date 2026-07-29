import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../hooks/useTranslation';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link
                                to="/dashboard"
                                className="flex items-center px-4 text-gray-700 hover:text-blue-500 font-medium"
                            >
                                {t('dashboard')}
                            </Link>
                            <Link
                                to="/scooters"
                                className="flex items-center px-4 text-gray-700 hover:text-blue-500"
                            >
                                {t('scooters')}
                            </Link>
                            <Link
                                to="/rentals"
                                className="flex items-center px-4 text-gray-700 hover:text-blue-500"
                            >
                                {t('rentals')}
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm text-gray-700 hover:text-blue-500"
                            >
                                {t('logout')}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
