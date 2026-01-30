import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import PatientList from './components/Patient/PatientList';
import PatientForm from './components/Patient/PatientForm';
import ClinicalDataList from './components/ClinicalData/ClinicalDataList';
import ClinicalDataForm from './components/ClinicalData/ClinicalDataForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/new" element={<PatientForm />} />
            <Route path="/patients/edit/:id" element={<PatientForm />} />
            <Route path="/clinical-data" element={<ClinicalDataList />} />
            <Route path="/clinical-data/new" element={<ClinicalDataForm />} />
            <Route path="/clinical-data/edit/:id" element={<ClinicalDataForm />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
