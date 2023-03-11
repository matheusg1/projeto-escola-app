import React from "react";
import AppNavbar from "./AppNavbar";
import AppRoutes from './routes';
import './global.css'

export default function App() {
    return (
        <>
            <AppNavbar />
            <AppRoutes />
        </>
    );
}