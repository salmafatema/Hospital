import React, { useState } from 'react'

function Appointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    department: '',
    date: '',
    time: '',
    type: '',
    status: 'Scheduled'
  });
  
  // Sample appointment data
  const tableData = [
    { 
      id: "APT-001",
      patientName: "John Smith",
      doctorName: "Dr. Sarah Johnson", 
      department: "Cardiology",
      date: "2024-03-25",
      time: "09:00 AM",
      type: "Follow-up",
      status: "Scheduled"
    },
    { 
      id: "APT-002",
      patientName: "Emma Davis",
      doctorName: "Dr. Michael Chen",
      department: "Neurology",
      date: "2024-03-25",
      time: "10:30 AM",
      type: "Consultation",
      status: "Completed"
    },
    { 
      id: "APT-003",
      patientName: "Robert Wilson",
      doctorName: "Dr. Emily Rodriguez",
      department: "Pediatrics",
      date: "2024-03-26",
      time: "02:00 PM",
      type: "Initial Visit",
      status: "Scheduled"
    },
  ];

  // Filter data based on search term
  const filteredData = tableData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the appointment
    console.log('Form submitted:', formData);
    setShowModal(false);
    setFormData({
      patientName: '',
      doctorName: '',
      department: '',
      date: '',
      time: '',
      type: '',
      status: 'Scheduled'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="ml-64 p-4 mt-16">
      {/* Search Bar and Add Button */}
      <div className="mb-4 flex justify-between items-center">
        <div className='w-1/2'>
          <input
            type="text"
            placeholder="Search appointments..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <button 
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Add Appointment
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Appointment ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Patient Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.doctorName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 w-[90vw] max-w-2xl rounded-xl shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Add New Appointment</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.patientName}
                    onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({...formData, doctorName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Initial Visit">Initial Visit</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Save Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
