import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../api/axios';
import { Rental, Scooter } from '../types';
import { useTranslation } from '../hooks/useTranslation';

const RentalForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isEdit = Boolean(id);

    const [scooters, setScooters] = useState<Scooter[]>([]);
    const [formData, setFormData] = useState({
        id: '',
        scooter_id: '',
        user_name: '',
        user_phone: '',
        start_time: new Date().toISOString().slice(0, 16),
        end_time: '',
        status: 'active',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchScooters();
        if (isEdit && id) {
            fetchRental(id);
        }
    }, [id, isEdit]);

    const fetchScooters = async () => {
        try {
            const response = await api.get<Scooter[]>('/scooters');
            setScooters(response.data);
        } catch (error) {
            console.error('Error fetching scooters:', error);
        }
    };

    const fetchRental = async (rentalId: string) => {
        try {
            const response = await api.get<Rental>(`/rentals/${rentalId}`);
            const rental = response.data;
            setFormData({
                id: rental.id,
                scooter_id: rental.scooter_id,
                user_name: rental.user_name,
                user_phone: rental.user_phone,
                start_time: new Date(rental.start_time).toISOString().slice(0, 16),
                end_time: rental.end_time ? new Date(rental.end_time).toISOString().slice(0, 16) : '',
                status: rental.status,
            });
        } catch (error) {
            console.error('Error fetching rental:', error);
            setError(t('somethingWentWrong'));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const payload = {
                ...formData,
                end_time: formData.end_time || null,
            };

            if (isEdit) {
                await api.put(`/rentals/${id}`, payload);
            } else {
                await api.post('/rentals', payload);
            }
            navigate('/rentals');
        } catch (err: any) {
            setError(err.response?.data?.message || t('somethingWentWrong'));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    {isEdit ? t('editRental') : t('addRental')}
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {t('rentalId')}
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
                            {t('scooterId')}
                        </label>
                        <select
                            name="scooter_id"
                            value={formData.scooter_id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Выберите самокат</option>
                            {scooters.map(scooter => (
                                <option key={scooter.id} value={scooter.id}>
                                    {scooter.id} - {scooter.model} ({t(scooter.status)})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {t('userName')}
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {t('userPhone')}
                        </label>
                        <input
                            type="text"
                            name="user_phone"
                            value={formData.user_phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {t('startTime')}
                        </label>
                        <input
                            type="datetime-local"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {t('endTime')}
                        </label>
                        <input
                            type="datetime-local"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            <option value="active">{t('active')}</option>
                            <option value="completed">{t('completed')}</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/rentals')}
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

export default RentalForm;
