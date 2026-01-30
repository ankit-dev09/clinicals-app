import React, { useState, useEffect } from 'react';
import { clinicalDataApi, patientApi } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import './ClinicalDataForm.css';

const ClinicalDataForm = () => {
  const [formData, setFormData] = useState({
    componentName: '',
    componentValue: '',
    patientId: '',
  });
  const [patients, setPatients] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    fetchPatients();
    if (isEditMode) {
      fetchClinicalData();
    }
  }, [id]);

  const fetchPatients = async () => {
    try {
      const response = await patientApi.getAll();
      setPatients(response.data);
    } catch (error) {
      toast.error('Failed to fetch patients: ' + (error.response?.data?.message || error.message));
    }
  };

  const fetchClinicalData = async () => {
    try {
      setLoading(true);
      const response = await clinicalDataApi.getById(id);
      setFormData({
        componentName: response.data.componentName,
        componentValue: response.data.componentValue,
        patientId: '', // Cannot retrieve patient ID from response due to @JsonIgnore
      });
    } catch (error) {
      toast.error('Failed to fetch clinical data: ' + (error.response?.data?.message || error.message));
      navigate('/clinical-data');
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.componentName.trim()) {
      newErrors.componentName = 'Component name is required';
    }

    if (!formData.componentValue.trim()) {
      newErrors.componentValue = 'Component value is required';
    }

    if (!isEditMode && !formData.patientId) {
      newErrors.patientId = 'Patient selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'patientId' ? (value ? parseInt(value) : '') : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the validation errors');
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        // For update, we only send componentName and componentValue
        const updateData = {
          componentName: formData.componentName,
          componentValue: formData.componentValue,
        };
        await clinicalDataApi.update(id, updateData);
        toast.success('Clinical data updated successfully!');
      } else {
        // For create, use the /save endpoint with patientId
        const createData = {
          componentName: formData.componentName,
          componentValue: formData.componentValue,
          patientId: formData.patientId,
        };
        await clinicalDataApi.saveByPatientId(createData);
        toast.success('Clinical data created successfully!');
      }
      navigate('/clinical-data');
    } catch (error) {
      toast.error(
        `Failed to ${isEditMode ? 'update' : 'create'} clinical data: ` +
        (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clinical-data-form-container">
      <h2>{isEditMode ? 'Edit Clinical Data' : 'Add New Clinical Data'}</h2>
      <form onSubmit={handleSubmit}>
        {!isEditMode && (
          <div className="form-group">
            <label htmlFor="patientId">Select Patient *</label>
            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className={errors.patientId ? 'error' : ''}
              disabled={loading}
            >
              <option value="">-- Select a patient --</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName} (Age: {patient.age})
                </option>
              ))}
            </select>
            {errors.patientId && <span className="error-message">{errors.patientId}</span>}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="componentName">Component Name *</label>
          <input
            type="text"
            id="componentName"
            name="componentName"
            placeholder="e.g., Blood Pressure, Heart Rate, Temperature"
            value={formData.componentName}
            onChange={handleChange}
            className={errors.componentName ? 'error' : ''}
            disabled={loading}
          />
          {errors.componentName && <span className="error-message">{errors.componentName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="componentValue">Component Value *</label>
          <input
            type="text"
            id="componentValue"
            name="componentValue"
            placeholder="e.g., 120/80, 72 bpm, 98.6°F"
            value={formData.componentValue}
            onChange={handleChange}
            className={errors.componentValue ? 'error' : ''}
            disabled={loading}
          />
          {errors.componentValue && <span className="error-message">{errors.componentValue}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : isEditMode ? 'Update Clinical Data' : 'Create Clinical Data'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/clinical-data')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClinicalDataForm;
