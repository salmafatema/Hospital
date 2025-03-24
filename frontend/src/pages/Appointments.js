import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctorName: '',
    department: '',
    date: '',
    time: '',
    status: 'Pending',
  });
  const [isFormVisible, setFormVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/doctors');
      setDoctors(response.data);
      // Extract unique departments from doctors data
      const uniqueDepartments = [...new Set(response.data.map(doctor => doctor.department))];
      setDepartments(uniqueDepartments);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const deleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await axios.delete(`http://localhost:5000/appointments/${id}`);
        setSuccessMessage('Appointment deleted successfully! ❌');
        fetchAppointments();  // Refresh data
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Generate a random appointment ID
        const appointmentId = Math.floor(Math.random() * 10000);
        
        // Format the date to ISO string
        const formattedDate = new Date(newAppointment.date).toISOString().split('T')[0];
        
        const appointmentData = {
            appointmentId,
            patientName: newAppointment.patientName,
            doctorName: newAppointment.doctorName,
            department: newAppointment.department,
            date: formattedDate,
            time: newAppointment.time,
            status: newAppointment.status
        };

        console.log('Sending appointment data:', appointmentData); // Debug log

        const response = await axios.post('http://localhost:5000/appointments', appointmentData);
        
        if (response.status === 201) {
            setSuccessMessage('Appointment added successfully! ✅');
            fetchAppointments();
            setNewAppointment({
                patientName: '',
                doctorName: '',
                department: '',
                date: '',
                time: '',
                status: 'Pending',
            });
            setFormVisible(false);
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    } catch (error) {
        console.error('Error adding appointment:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response data:', error.response.data);
            const errorMessage = error.response.data.message || 'Error adding appointment';
            setSuccessMessage(`Error: ${errorMessage} ❌`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            setSuccessMessage('Error: No response from server ❌');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
            setSuccessMessage(`Error: ${error.message} ❌`);
        }
        setTimeout(() => setSuccessMessage(''), 5000);
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.department.toLowerCase().includes(searchQuery.toLowerCase())
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
          Add New Appointment
        </button>
      </div>

      {/* Search bar modification */}
      <div className="flex flex-col items-center gap-6 my-6">
        <div className="relative w-full max-w-4xl">
          <input
            type="text"
            placeholder="Search appointments..."
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

      {/* Modal with Background Blur */}
      {isFormVisible && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Appointment</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="patientName"
                  placeholder="Patient Name"
                  value={newAppointment.patientName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>
              {/* Doctor Name Field */}
              <div className="mb-4">
                <select
                  name="doctorName"
                  value={newAppointment.doctorName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md"
                >
                  <option value="">Select Doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
                  ))}
                </select>
              </div>
              {/* Department Field */}
              <div className="mb-4">
                <select
                  name="department"
                  value={newAppointment.department}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <input
                  type="date"
                  name="date"
                  value={newAppointment.date}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>

              {/* Status Field */}
              <div className="mb-4">
                <select
                  name="status"
                  value={newAppointment.status}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button type="submit" className="bg-black text-white p-3 rounded-md hover:bg-gray-600">
                  Add Appointment
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

      <div className="mt-8 w-full">
        <h2 className="text-xl font-semibold mb-4">Appointment List</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredAppointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4  text-gray-900">{appointment.patientName}</td>
                  <td className="px-6 py-4  text-gray-900">{appointment.doctorName}</td>
                  <td className="px-6 py-4  text-gray-900">{appointment.department}</td>
                  <td className="px-6 py-4  text-gray-900">{new Date(appointment.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4  text-gray-900">{appointment.time}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold
                      ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteAppointment(appointment._id)}
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

export default Appointments;