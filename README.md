# Clinicals App - Patient & Clinical Data Management

A modern React-based web application for managing patient information and clinical data. This application provides a user-friendly interface to perform CRUD operations on patients and their clinical records, integrated with a Spring Boot backend API.

## Overview

The Clinicals App is a comprehensive healthcare management frontend that enables:
- **Patient Management**: Create, view, update, and delete patient records
- **Clinical Data Tracking**: Record and manage clinical measurements (blood pressure, heart rate, temperature, etc.)
- **Advanced Search & Filtering**: Quickly find patients or clinical records
- **Pagination**: Efficiently browse through large datasets
- **Real-time Notifications**: Toast notifications for all operations (success/error)
- **Responsive Design**: Modern, clean UI that works on all devices

## Technology Stack

- **React 19.2.4**: Frontend framework
- **React Router DOM 7.13.0**: Client-side routing
- **Axios 1.13.4**: HTTP client for API calls
- **React Toastify 11.0.5**: Toast notifications
- **Create React App 5.0.1**: Build tooling and configuration

## Features

### Patient Management
- ✅ View all patients in a paginated table
- ✅ Search patients by name or age
- ✅ Add new patient records with validation
- ✅ Edit existing patient information
- ✅ Delete patient records with confirmation
- ✅ Form validation (required fields, age constraints)

### Clinical Data Management
- ✅ View all clinical data records in a paginated table
- ✅ Search clinical data by component name or value
- ✅ Add new clinical data with patient selection dropdown
- ✅ Edit existing clinical records
- ✅ Delete clinical data with confirmation
- ✅ Custom component names and values (flexible for any measurement type)
- ✅ Automatic timestamp recording

### User Experience
- ✅ Intuitive navigation menu
- ✅ Toast notifications for all CRUD operations
- ✅ Loading states for async operations
- ✅ Error handling with user-friendly messages
- ✅ Responsive table design
- ✅ Pagination controls (5 items per page)
- ✅ Confirmation dialogs for destructive actions

## Project Structure

```
clinicals-app/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Home/
│   │   │   ├── Home.js              # Landing page
│   │   │   └── Home.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.js            # Navigation menu
│   │   │   └── Navbar.css
│   │   ├── Patient/
│   │   │   ├── PatientList.js       # Patient listing with search & pagination
│   │   │   ├── PatientList.css
│   │   │   ├── PatientForm.js       # Add/Edit patient form
│   │   │   └── PatientForm.css
│   │   └── ClinicalData/
│   │       ├── ClinicalDataList.js  # Clinical data listing
│   │       ├── ClinicalDataList.css
│   │       ├── ClinicalDataForm.js  # Add/Edit clinical data form
│   │       └── ClinicalDataForm.css
│   ├── services/
│   │   └── api.js                   # Axios API service layer
│   ├── App.js                       # Main app with routing
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Prerequisites

- **Node.js**: Version 14 or higher
- **npm**: Version 6 or higher
- **Backend API**: Spring Boot Clinical API running on port 8080

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clinicals-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint** (if different from default)
   
   Edit `src/services/api.js` to update the backend URL:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/patientservices/api';
   ```

## Running the Application

### Development Mode

```bash
npm start
```

- Opens [http://localhost:3000](http://localhost:3000) in your browser
- Hot reloading enabled - changes reflect immediately
- Connects to backend API at `http://localhost:8080/patientservices/api`

### Production Build

```bash
npm run build
```

- Creates optimized production build in `build/` folder
- Minified and optimized for performance
- Ready for deployment

### Run Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

## Backend Integration

This application requires the Spring Boot Clinical API to be running. 

**Backend Repository**: `copilotForJava/clinicalsapi`

**Start the backend**:
```bash
cd ../copilotForJava/clinicalsapi
mvn spring-boot:run
```

The backend will run on `http://localhost:8080/patientservices`

### API Endpoints Used

**Patient Endpoints**:
- `GET /api/patients` - Get all patients
- `GET /api/patients/{id}` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/{id}` - Update patient
- `DELETE /api/patients/{id}` - Delete patient

**Clinical Data Endpoints**:
- `GET /api/clinicaldata` - Get all clinical data
- `GET /api/clinicaldata/{id}` - Get clinical data by ID
- `POST /api/clinicaldata/save` - Create clinical data with patient ID
- `PUT /api/clinicaldata/{id}` - Update clinical data
- `DELETE /api/clinicaldata/{id}` - Delete clinical data

## Usage Guide

### Managing Patients

1. **View Patients**: Click "Patients" in the navigation menu
2. **Search**: Use the search bar to filter by name or age
3. **Add Patient**: Click "Add New Patient" button
   - Fill in First Name, Last Name, and Age
   - Click "Create Patient"
4. **Edit Patient**: Click "Edit" button on any patient row
5. **Delete Patient**: Click "Delete" button and confirm

### Managing Clinical Data

1. **View Clinical Data**: Click "Clinical Data" in the navigation menu
2. **Search**: Use the search bar to filter by component name or value
3. **Add Clinical Data**: Click "Add New Clinical Data" button
   - Select a patient from the dropdown
   - Enter component name (e.g., "Blood Pressure", "Heart Rate")
   - Enter component value (e.g., "120/80", "72 bpm")
   - Click "Create Clinical Data"
4. **Edit Clinical Data**: Click "Edit" button on any record
5. **Delete Clinical Data**: Click "Delete" button and confirm

## Environment Variables

Create a `.env` file in the root directory for custom configuration:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/patientservices/api
```

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the backend has CORS configured properly in `CorsConfig.java` to allow `http://localhost:3000`.

### Connection Refused
Ensure the Spring Boot backend is running on port 8080 before starting the React app.

### Toast Notifications Not Appearing
Ensure `react-toastify` CSS is imported in `App.js`:
```javascript
import 'react-toastify/dist/ReactToastify.css';
```

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Dashboard with statistics and charts
- [ ] Export data to PDF/Excel
- [ ] Advanced filtering and sorting options
- [ ] Patient clinical history timeline
- [ ] File upload for clinical reports
- [ ] Dark mode theme

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is for educational and demonstration purposes.

## Author

Ankit T

## Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- UI inspired by modern healthcare applications
- Backend API: Spring Boot Clinical API

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
