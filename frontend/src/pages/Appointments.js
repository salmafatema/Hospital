import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
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
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(newAppointment);
      
      await axios.post('http://localhost:5000/appointments', newAppointment);
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
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 md:ml-64 mt-16">
      <h1 className="text-3xl font-bold text-center mt-20">Appointments List</h1>

      <div className="flex justify-center my-6">
        <button
          onClick={() => setFormVisible(true)}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Add New Appointment
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-500 text-white text-center p-3 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      {/* Modal with Background Blur */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
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
              <div className="mb-4">
                <input
                  type="text"
                  name="doctorName"
                  placeholder="Doctor Name"
                  value={newAppointment.doctorName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={newAppointment.department}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md"
                />
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
                <th className="px-6 py-4 text-left ">Patient Name</th>
                <th className="px-6 py-4 text-left ">Doctor</th>
                <th className="px-6 py-4 text-left ">Department</th>
                <th className="px-6 py-4 text-left ">Date</th>
                <th className="px-6 py-4 text-left ">Time</th>
                <th className="px-6 py-4 text-left ">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {appointments.map((appointment) => (
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
