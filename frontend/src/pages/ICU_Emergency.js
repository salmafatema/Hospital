import React, { useState } from 'react'

function ICU_Emergency() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample ICU patient data
  const tableData = [
    { 
      patientId: "ICU-001",
      name: "John Doe",
      age: "65",
      diagnosis: "Acute Respiratory Failure",
      status: "Critical",
      bedNumber: "ICU-A1",
      admissionDate: "2024-03-20"
    },
    { 
      patientId: "ICU-002",
      name: "Jane Smith",
      age: "54",
      diagnosis: "Septic Shock",
      status: "Stable",
      bedNumber: "ICU-A2",
      admissionDate: "2024-03-19"
    },
    { 
      patientId: "ICU-003",
      name: "Robert Johnson",
      age: "72",
      diagnosis: "Multiple Trauma",
      status: "Critical",
      bedNumber: "ICU-A3",
      admissionDate: "2024-03-21"
    },
  ];

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

  // Filter data based on search term
  const filteredData = tableData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="ml-64 p-4 mt-16">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID, name, or diagnosis..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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

      {/* Patient Table */}
      <h2 className="text-xl font-bold mb-4">ICU Patients</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
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
        <tbody className="divide-y divide-gray-200">
          {filteredData.map((item, index) => (
            <tr key={index} className={`hover:bg-gray-50 ${item.status === 'Critical' ? 'bg-red-50' : ''}`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.patientId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.age}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.diagnosis}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                item.status === 'Critical' ? 'text-red-600' : 'text-green-600'
              }`}>{item.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.bedNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.admissionDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ICU_Emergency;