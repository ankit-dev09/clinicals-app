import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Clinicals App
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/patients" className="navbar-link">
              Patients
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/clinical-data" className="navbar-link">
              Clinical Data
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
