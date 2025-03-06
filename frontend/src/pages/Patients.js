import React, { useState } from 'react'

function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    admissionDate: '',
    admissionTime: '',
    wardRoomNo: '',
    admissionType: ''
  });
  
  // Sample patient data - replace with actual API call
  const tableData = [
    { 
      id: "P001", 
      fullName: "John Smith", 
      phoneNumber: "+1 234-567-8900",
      dateOfBirth: "1978-05-15",
      gender: "Male", 
      bloodGroup: "A+",
      address: "123 Main St, City",
      emergencyContactName: "Jane Smith",
      emergencyContactPhone: "+1 234-567-8901",
      admissionDate: "2024-03-20",
      admissionTime: "14:30",
      wardRoomNo: "W101",
      admissionType: "IPD"
    },
    { id: "P002", name: "Sarah Johnson", age: "32", gender: "Female", condition: "Diabetes" },
    { id: "P003", name: "Michael Brown", age: "58", gender: "Male", condition: "Arthritis" },
  ];

  // Filter data based on search term
  const filteredData = tableData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the patient
    console.log('Form submitted:', formData);
    setShowModal(false);
    setFormData({
      fullName: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      address: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      admissionDate: '',
      admissionTime: '',
      wardRoomNo: '',
      admissionType: ''
    });
  };

  return (
    <div className="ml-64 p-4 mt-16">
      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <div className='w-1/2'>
          <input
            type="text"
            placeholder="Search patients..."
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
            Add Patients
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Patient ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">DOB</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Admission Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Ward/Room</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.dateOfBirth}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.bloodGroup}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.admissionType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.wardRoomNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 w-[90vw] rounded-xl shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Add New Patient</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                    required
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admission Type</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.admissionType}
                    onChange={(e) => setFormData({...formData, admissionType: e.target.value})}
                    required
                  >
                    <option value="">Select admission type</option>
                    <option value="OPD">OPD</option>
                    <option value="IPD">IPD</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                  rows="2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.emergencyContactName}
                    onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admission Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.admissionDate}
                    onChange={(e) => setFormData({...formData, admissionDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admission Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.admissionTime}
                    onChange={(e) => setFormData({...formData, admissionTime: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ward/Room No.</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    value={formData.wardRoomNo}
                    onChange={(e) => setFormData({...formData, wardRoomNo: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patients;