import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Emergency() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    patientId: '',
    name: '',
    age: '',
    diagnosis: '',
    status: 'Stable',
    bedNumber: '',
    admissionDate: new Date().toISOString().split('T')[0]
  });

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/emergency');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/emergency', newPatient);
      setShowForm(false);
      fetchPatients();
      setNewPatient({
        patientId: '',
        name: '',
        age: '',
        diagnosis: '',
        status: 'Stable',
        bedNumber: '',
        admissionDate: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    Object.values(patient).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sample bed data
  const bedData = [
    { bedNumber: "ICU-A1", status: "Occupied", patientName: "John Doe", lastCleaned: "2024-03-20 14:30" },
    { bedNumber: "ICU-A2", status: "Occupied", patientName: "Jane Smith", lastCleaned: "2024-03-20 15:45" },
    { bedNumber: "ICU-A3", status: "Occupied", patientName: "Robert Johnson", lastCleaned: "2024-03-21 09:15" },
    { bedNumber: "ICU-A4", status: "Available", patientName: "-", lastCleaned: "2024-03-21 10:30" },
    { bedNumber: "ICU-A5", status: "Maintenance", patientName: "-", lastCleaned: "2024-03-21 11:00" },
  ];

  // Sample ambulance data
  const ambulanceData = [
    { id: "AMB-001", status: "Available", location: "Hospital", driver: "Mike Wilson", contact: "555-0123" },
    { id: "AMB-002", status: "On Call", location: "Downtown", driver: "Sarah Chen", contact: "555-0124" },
    { id: "AMB-003", status: "Maintenance", location: "Service Center", driver: "-", contact: "-" },
  ];

  return (
    <div className="container mx-auto p-4 md:ml-64 mt-16">
      {/* Search Bar */}
      <div className="flex flex-col items-center gap-6 my-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Patient
        </button>
        <div className="relative w-full max-w-4xl">
          <input
            type="text"
            placeholder="Search by ID, name, or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total ICU Beds</h3>
          <p className="text-3xl font-bold text-blue-600">{bedData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Available Beds</h3>
          <p className="text-3xl font-bold text-green-600">
            {bedData.filter(bed => bed.status === "Available").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Ambulances</h3>
          <p className="text-3xl font-bold text-purple-600">
            {ambulanceData.filter(amb => amb.status === "Available" || amb.status === "On Call").length}
          </p>
        </div>
      </div>

      {/* Beds Status */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">ICU Beds Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bedData.map((bed, index) => (
            <div key={index} className={`p-4 rounded-lg shadow ${
              bed.status === "Available" ? "bg-green-50 border border-green-200" :
              bed.status === "Occupied" ? "bg-red-50 border border-red-200" :
              "bg-yellow-50 border border-yellow-200"
            }`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{bed.bedNumber}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  bed.status === "Available" ? "bg-green-100 text-green-800" :
                  bed.status === "Occupied" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {bed.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">Patient: {bed.patientName}</p>
              <p className="text-sm text-gray-600">Last Cleaned: {bed.lastCleaned}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ambulance Status */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Ambulance Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ambulanceData.map((amb, index) => (
            <div key={index} className={`p-4 rounded-lg shadow ${
              amb.status === "Available" ? "bg-green-50 border border-green-200" :
              amb.status === "On Call" ? "bg-blue-50 border border-blue-200" :
              "bg-yellow-50 border border-yellow-200"
            }`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{amb.id}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  amb.status === "Available" ? "bg-green-100 text-green-800" :
                  amb.status === "On Call" ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {amb.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">Driver: {amb.driver}</p>
              <p className="text-sm text-gray-600">Location: {amb.location}</p>
              <p className="text-sm text-gray-600">Contact: {amb.contact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Patient Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Emergency Patient</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient ID
                  </label>
                  <input
                    type="text"
                    name="patientId"
                    value={newPatient.patientId}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newPatient.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={newPatient.age}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnosis
                  </label>
                  <input
                    type="text"
                    name="diagnosis"
                    value={newPatient.diagnosis}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newPatient.status}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Stable">Stable</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bed Number
                  </label>
                  <input
                    type="text"
                    name="bedNumber"
                    value={newPatient.bedNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Patient Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">ICU Patients</h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Diagnosis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Bed Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Admission Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient._id} className={`hover:bg-gray-50 ${
                  patient.status === 'Critical' ? 'bg-red-50' : ''
                }`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.patientId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.diagnosis}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    patient.status === 'Critical' ? 'text-red-600' : 'text-green-600'
                  }`}>{patient.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.bedNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(patient.admissionDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Emergency;