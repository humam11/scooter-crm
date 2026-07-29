import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Layout from '../components/Layout';
import api from '../api/axios';
import { DashboardStats } from '../types';
import { useTranslation } from '../hooks/useTranslation';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get<DashboardStats>('/');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="text-center py-12">{t('loading')}</div>
            </Layout>
        );
    }

    if (!stats) {
        return (
            <Layout>
                <div className="text-center py-12">{t('error')}</div>
            </Layout>
        );
    }

    const statusData = [
        { name: t('available'), value: stats.scooter_status_stats.available, color: '#10B981' },
        { name: t('in_use'), value: stats.scooter_status_stats.in_use, color: '#3B82F6' },
        { name: t('maintenance'), value: stats.scooter_status_stats.maintenance, color: '#F59E0B' },
        { name: t('offline'), value: stats.scooter_status_stats.offline, color: '#EF4444' },
    ];

    return (
        <Layout>
            <div className="px-4 sm:px-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('dashboard')}</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">{t('totalScooters')}</h3>
                        <p className="text-3xl font-bold text-gray-900">{stats.total_scooters}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">{t('activeRentals')}</h3>
                        <p className="text-3xl font-bold text-blue-600">{stats.active_rentals}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">{t('averageBattery')}</h3>
                        <p className="text-3xl font-bold text-green-600">{stats.average_battery}%</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">{t('activePercentage')}</h3>
                        <p className="text-3xl font-bold text-purple-600">{stats.active_percentage}%</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('scooterStatusStats')}</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('statistics')}</h2>
                        <div className="space-y-4">
                            {statusData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className="w-4 h-4 rounded mr-3"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
