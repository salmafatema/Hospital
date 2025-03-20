import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    speciality: '',
    qualification: '',
    experience: '',
    availability: 'Available',
    department: 'General Medicine',
    contact: '',
    assignments: '',
    photo: null,
  });
  const [isFormVisible, setFormVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const deleteDoctor = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await axios.delete(`http://localhost:5000/doctors/${id}`);
        setSuccessMessage('Doctor deleted successfully! ❌');
        fetchDoctors();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewDoctor((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(newDoctor).forEach(key => {
        formData.append(key, newDoctor[key]);
      });

      await axios.post('http://localhost:5000/doctors', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Doctor added successfully! ✅');
      fetchDoctors();
      setNewDoctor({
        name: '',
        speciality: '',
        qualification: '',
        experience: '',
        availability: 'Available',
        department: 'General Medicine',
        contact: '',
        assignments: '',
        photo: null,
      });
      setFormVisible(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.qualification.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:ml-64 mt-16">
      <div className="flex justify-center my-6">
        <button
          onClick={() => setFormVisible(true)}
          className="bg-black text-white px-4 py-2 flex items-center gap-2 rounded-md hover:bg-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Doctor
        </button>
      </div>

      {/* Search bar */}
      <div className="flex flex-col items-center gap-6 my-6">
        <div className="relative w-full max-w-4xl">
          <input
            type="text"
            placeholder="Search doctors..."
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

      {/* Modal Form */}
      {isFormVisible && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Doctor Name"
                    value={newDoctor.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="speciality"
                    placeholder="Speciality"
                    value={newDoctor.speciality}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="qualification"
                    placeholder="Qualification"
                    value={newDoctor.qualification}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="experience"
                    placeholder="Years of Experience"
                    value={newDoctor.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <select
                    name="availability"
                    value={newDoctor.availability}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded-md"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>

                <div className="mb-4">
                  <select
                    name="department"
                    value={newDoctor.department}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded-md"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="General Medicine">General Medicine</option>
                  </select>
                </div>

                <div className="mb-4">
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Contact Number"
                    value={newDoctor.contact}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="assignments"
                    placeholder="Current Assignments"
                    value={newDoctor.assignments}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md"
                  />
                </div>

                <div className="mb-4 col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button type="submit" className="bg-black text-white p-3 rounded-md hover:bg-gray-600">
                  Add Doctor
                </button>
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="bg-white border border-gray-300 text-black p-3 rounded-md hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Doctors Table */}
      <div className="mt-8 w-full">
        <h2 className="text-xl font-semibold mb-4">Doctors List</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Photo</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Speciality</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Qualification</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Experience</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Assignments</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Availability</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <img
                      src={doctor.photo ? `http://localhost:5000${doctor.photo}` : '/default-avatar.png'}
                      alt={doctor.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-900">{doctor.name}</td>
                  <td className="px-6 py-4 text-gray-900">{doctor.speciality}</td>
                  <td className="px-6 py-4 text-gray-900">{doctor.qualification}</td>
                  <td className="px-6 py-4 text-gray-900">{doctor.experience} years</td>
                  <td className="px-6 py-4 text-gray-900">{doctor.department}</td>
                  <td className="px-6 py-4 text-gray-900">{doctor.contact}</td>
                  <td className="px-6 py-4 text-gray-900">{doctor.assignments}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold
                      ${doctor.availability === 'Available' ? 'bg-green-100 text-green-800' :
                        doctor.availability === 'Unavailable' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'}`}>
                      {doctor.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteDoctor(doctor._id)}
                      className="bg-black text-white px-4 py-2 rounded-md hover:text-black hover:bg-white hover:border hover:border-black transition"
                      >
                      Delete
                    </button>
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

export default Doctors;
