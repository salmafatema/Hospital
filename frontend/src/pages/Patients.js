import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPatient, setNewPatient] = useState({
    fullName: '',
    age: '',
    gender: '',
    phoneNumber: '',
    admissionType: 'Emergency',
    bloodGroup: 'A+',
    time: '',
    date: '',
  });
  const [isFormVisible, setFormVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetchPatients();    
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(Array.isArray(response.data) ? response.data : response.data.patients || []);
    
    } catch (error) {
      console.error('Error fetching patients:', error);
      setPatients([]);

    }
  };

  // delete function
  const deletePatient = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await axios.delete(`http://localhost:5000/api/patients/${id}`);
        setSuccessMessage('Patient deleted successfully! ✅');
        fetchPatients(); 
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  // filter patients
  const filteredPatients = patients.filter((patient) =>
    patient.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phoneNumber.includes(searchQuery) ||
    patient.admissionType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (patient) => {
    console.log(patient._id);
    
    setEditingPatient(patient);
    setNewPatient({
      fullName: patient.fullName,
      age: patient.age,
      gender: patient.gender,
      phoneNumber: patient.phoneNumber,
      admissionType: patient.admissionType,
      bloodGroup: patient.bloodGroup,
      time: patient.time,
      date: patient.date.split('T')[0],
    });
    setFormVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPatient) {
        console.log('Updating patient with ID:', editingPatient._id);
        console.log('Update data:', newPatient);
        const response = await axios.put(`http://localhost:5000/api/patients/${editingPatient._id}`, newPatient);
        console.log('Update response:', response.data);
        setSuccessMessage('Patient updated successfully! ✅');
      } else {
        await axios.post('http://localhost:5000/api/patients', newPatient);
        setSuccessMessage('Patient added successfully! ✅');
      }
      

      fetchPatients();
      setNewPatient({
        fullName: '',
        age: '',
        gender: '',
        phoneNumber: '',
        admissionType: 'Emergency',
        bloodGroup: 'A+',
        time: '',
        date: '',
      });
      setFormVisible(false);
      setEditingPatient(null);

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving patient:', error.response?.data || error.message);
      setSuccessMessage(error.response?.data?.error || 'Error saving patient');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };


  return (
    <div className="container mx-auto p-4 md:ml-64 mt-16">
      {/*search bar and button */}
      <div className="flex flex-col items-center gap-6 my-6">
        <button
          onClick={() => setFormVisible(true)}
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
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 shadow-sm">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {successMessage}
          </div>
        </div>
      )}

      {/* Modal for Add Patient Form */}
      {isFormVisible && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-2xl mx-auto shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              {editingPatient ? 'Edit Patient' : 'Add New Patient'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={newPatient.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  value={newPatient.age}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={newPatient.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="Other">Other</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={newPatient.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Admission Type</label>
                <select
                  name="admissionType"
                  value={newPatient.admissionType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="Emergency">Emergency</option>
                  <option value="OPD">OPD</option>
                  <option value="Surgery">Surgery</option>
                  <option value="IPD">IPD</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={newPatient.bloodGroup}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={newPatient.time}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newPatient.date}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="col-span-full flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition"
                >
                  {editingPatient ? 'Update Patient' : 'Save Patient'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Patient Records</h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Admission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Blood</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Action</th>

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">{patient.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${patient.admissionType === 'Emergency' ? 'bg-red-100 text-red-800' :
                        patient.admissionType === 'Surgery' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}`}>
                      {patient.admissionType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.bloodGroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(patient.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(patient)}
                        className="bg-white text-black px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePatient(patient._id)}
                        className="bg-black text-white px-4 py-2 rounded-md hover:text-black hover:bg-white hover:border hover:border-black transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;