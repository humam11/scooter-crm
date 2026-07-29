import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../api/axios';
import { Scooter } from '../types';
import { useTranslation } from '../hooks/useTranslation';

const ScooterForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        id: '',
        model: '',
        status: 'available',
        battery_level: 100,
        latitude: '',
        longitude: '',
        last_updated: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit && id) {
            fetchScooter(id);
        }
    }, [id, isEdit]);

    const fetchScooter = async (scooterId: string) => {
        try {
            const response = await api.get<Scooter>(`/scooters/${scooterId}`);
            const scooter = response.data;
            setFormData({
                id: scooter.id,
                model: scooter.model,
                status: scooter.status,
                battery_level: scooter.battery_level,
                latitude: scooter.latitude,
                longitude: scooter.longitude,
                last_updated: scooter.last_updated || '',
            });
        } catch (error) {
            console.error('Error fetching scooter:', error);
            setError(t('somethingWentWrong'));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isEdit) {
                await api.put(`/scooters/${id}`, formData);
            } else {
                await api.post('/scooters', formData);
            }
            navigate('/scooters');
        } catch (err: any) {
            setError(err.response?.data?.message || t('somethingWentWrong'));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'battery_level' ? parseInt(value) : value,
        }));
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    {isEdit ? t('editScooter') : t('addScooter')}
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {t('scooterId')}
                        </label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            disabled={isEdit}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {t('model')}
                        </label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {t('status')}
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="available">{t('available')}</option>
                            <option value="in_use">{t('in_use')}</option>
                            <option value="maintenance">{t('maintenance')}</option>
                            <option value="offline">{t('offline')}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {t('batteryLevel')} (%)
                        </label>
                        <input
                            type="number"
                            name="battery_level"
                            value={formData.battery_level}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {t('latitude')}
                        </label>
                        <input
                            type="text"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {t('longitude')}
                        </label>
                        <input
                            type="text"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/scooters')}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? t('loading') : t('save')}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ScooterForm;
