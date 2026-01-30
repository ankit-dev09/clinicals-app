import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/patientservices/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Patient API calls
export const patientApi = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  create: (patient) => api.post('/patients', patient),
  update: (id, patient) => api.put(`/patients/${id}`, patient),
  delete: (id) => api.delete(`/patients/${id}`),
};

// Clinical Data API calls
export const clinicalDataApi = {
  getAll: () => api.get('/clinicaldata'),
  getById: (id) => api.get(`/clinicaldata/${id}`),
  create: (clinicalData) => api.post('/clinicaldata', clinicalData),
  update: (id, clinicalData) => api.put(`/clinicaldata/${id}`, clinicalData),
  delete: (id) => api.delete(`/clinicaldata/${id}`),
  saveByPatientId: (clinicalDataDTO) => api.post('/clinicaldata/save', clinicalDataDTO),
};

export default api;
