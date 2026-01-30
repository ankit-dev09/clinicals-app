import React, { useState, useEffect } from 'react';
import { clinicalDataApi } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './ClinicalDataList.css';

const ClinicalDataList = () => {
  const [clinicalData, setClinicalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClinicalData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, clinicalData]);

  const fetchClinicalData = async () => {
    try {
      setLoading(true);
      const response = await clinicalDataApi.getAll();
      setClinicalData(response.data);
      setFilteredData(response.data);
      toast.success('Clinical data loaded successfully!');
    } catch (error) {
      toast.error('Failed to fetch clinical data: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    const filtered = clinicalData.filter((data) =>
      data.componentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.componentValue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.id.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this clinical data record?')) {
      try {
        await clinicalDataApi.delete(id);
        toast.success('Clinical data deleted successfully!');
        fetchClinicalData();
      } catch (error) {
        toast.error('Failed to delete clinical data: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return <div className="loading">Loading clinical data...</div>;
  }

  return (
    <div className="clinical-data-list-container">
      <div className="header">
        <h2>Clinical Data Management</h2>
        <button className="btn btn-primary" onClick={() => navigate('/clinical-data/new')}>
          Add New Clinical Data
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by component name or value..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Component Name</th>
              <th>Component Value</th>
              <th>Measured Date & Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.componentName}</td>
                  <td>{data.componentValue}</td>
                  <td>{formatDate(data.measuredDateTime)}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => navigate(`/clinical-data/edit/${data.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No clinical data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-pagination"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`btn btn-pagination ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-pagination"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ClinicalDataList;
