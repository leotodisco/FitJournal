import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const token = getCookie('authToken');

    if (!token) {
        console.log("No valid token");
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;