import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Access from './components/Access';
import Dashboard from './components/Dashboard';
import Stories from './components/Stories';
import Community from './components/Community';
import Wallets from './components/Wallets';
import Config from './components/Config';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            {/* Only show Navbar if user is authenticated */}
            {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />} 
            
            <Routes>
                {/* Only the Access component is available before logging in */}
                <Route 
                    path="/" 
                    element={<Access setIsAuthenticated={setIsAuthenticated} />} 
                />

                {/* Protected Routes */}
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/stories" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Stories />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/community" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Community />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/wallets" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Wallets />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/config" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Config />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;
