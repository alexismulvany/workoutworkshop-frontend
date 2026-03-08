import React from "react";
import {Link, useLocation} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand navbar-dark navbar-gradient shadow-lg">
            <div className="container-fluid px-4">
                {/* Logo */}
                <Link to="/" className="navbar-brand fw-bold fs-3">Workout Workshop</Link>

                {/* Navbar center links */}
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mx-auto gap-2">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link px-4 py-2 rounded-pill fw-semibold ${location.pathname === '/' ? 'active' : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/workoutbuilder" className={`nav-link px-4 py-2 rounded-pill fw-semibold ${location.pathname === '/Customer' ? 'active' : ''}`}>
                                Workout Builder
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/coach" className={`nav-link px-4 py-2 rounded-pill fw-semibold ${location.pathname === '/Films' ? 'active' : ''}`}>
                                Coach
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin" className={`nav-link px-4 py-2 rounded-pill fw-semibold ${location.pathname === '/Films' ? 'active' : ''}`}>
                                Admin
                            </Link>
                        </li>
                    </ul>
                </div>
                <div style={{ width: "100px" }} className="d-none d-lg-block"></div>
            </div>
        </nav>
    );
};

export default Navbar