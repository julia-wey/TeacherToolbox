import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Home from "./pages/Home.js";

const routes = [
    {
        path: '/',
        element: <Home /> 
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    }
]

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
