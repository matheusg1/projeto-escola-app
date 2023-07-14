import React from "react";
import AppNavbar from "./AppNavbar";
import AppRoutes from './routes';
import './global.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function App() {
    return (
        <>
            <AppNavbar />
            <AppRoutes />
        </>
    );
}