import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Scooters from './pages/Scooters';
import ScooterForm from './pages/ScooterForm';
import Rentals from './pages/Rentals';
import RentalForm from './pages/RentalForm';
import '../css/app.css';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route
                        path="/scooters"
                        element={
                            <ProtectedRoute>
                                <Scooters />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route
                        path="/scooters/create"
                        element={
                            <ProtectedRoute>
                                <ScooterForm />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route
                        path="/scooters/:id/edit"
                        element={
                            <ProtectedRoute>
                                <ScooterForm />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route
                        path="/rentals"
                        element={
                            <ProtectedRoute>
                                <Rentals />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route
                        path="/rentals/create"
                        element={
                            <ProtectedRoute>
                                <RentalForm />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route
                        path="/rentals/:id/edit"
                        element={
                            <ProtectedRoute>
                                <RentalForm />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;


// Mount React app
const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
