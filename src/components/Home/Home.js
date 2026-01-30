import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Clinicals App</h1>
        <p className="subtitle">Manage patient information and clinical data efficiently</p>
        
        <div className="features">
          <div className="feature-card">
            <h3>Patient Management</h3>
            <p>Create, view, update, and delete patient records with ease</p>
            <Link to="/patients" className="feature-link">
              Go to Patients
            </Link>
          </div>
          
          <div className="feature-card">
            <h3>Clinical Data</h3>
            <p>Track and manage clinical measurements and observations</p>
            <Link to="/clinical-data" className="feature-link">
              Go to Clinical Data
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
