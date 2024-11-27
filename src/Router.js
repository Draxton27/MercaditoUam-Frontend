import React from "react";
import Cookies from 'js-cookie';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter } from "react-router-dom";
import MarketPlace from "./pages/MarketPlace";
import ProfilePage from "./pages/ProfilePage";

import CreateProductPage from "./pages/CreateProductPage";
import ProductDetails from "./components/ProductDetails";
// Function to get the access token (JWT) from cookies
const getAccessToken = () => {
    return Cookies.get('jwt');
}

// Function to check if the user is authenticated by verifying the presence of the access token
const isAuthenticated = () => {
    return !!getAccessToken();  // Returns true if token exists, otherwise false
}

// Create the router configuration using createBrowserRouter
const router = createBrowserRouter(
    [
        {
            path: '/', // Root path
            element: <Login />, // Render the Login component
            index: true // Set as the index route
        },
        {
            path: '/auth/register', // Path for user registration
            element: <Register />, // Render the Register component
        },
        {
            path: '/auth/login', // Path for user login
            element: <Login /> // Render the Login component
        },
        {
            path: '/marketplace', // Path for user login
            element: <MarketPlace /> // Render the Login component
        },
        {
            path: "/marketplace/create",
            element: <CreateProductPage />,
        },
        {
            path: "/marketplace/details", // Product details page
            element: <ProductDetails /> // Render the ProductDetails component
        },
        {
            path: '*', // Wildcard path for any undefined routes
            element: <Login /> // Render the Login component for undefined routes (can be changed to NoPage or another 404 page)
        },
        {
            path: '/profile',
            element: <ProfilePage />
        }
    ]
);

export default router;