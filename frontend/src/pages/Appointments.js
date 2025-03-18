import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctorName: 'Dr.Rajesh Sharma',
    department: 'General Medicine',
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
        doctorName: 'Dr.Rajesh Sharma',
        department: 'General Medicine',
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

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 shadow-sm">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            {successMessage}
          </div>
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
              {/* Doctor Name Field */}
              <div className="mb-4">
                <select
                  name="doctorName"
                  value={newAppointment.doctorName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md"
                >
                  <option value="Dr.Rajesh Sharma">Dr. Rajesh Sharma</option>
                  <option value="Dr.Neha Verma">Dr. Neha Verma</option>
                  <option value="Dr.Manish Gupta">Dr. Manish Gupta</option>
                  <option value="Dr.Sanjay Patel">Dr. Sanjay Patel</option>
                  <option value="Dr.Anisha Tiwari">Dr. Anisha Tiwari</option>
                  <option value="Dr.Vinay Jain">Dr. Vinay Jain</option>
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
