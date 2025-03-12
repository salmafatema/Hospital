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
  });
  const [isFormVisible, setFormVisible] = useState(false);

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
      await axios.post('http://localhost:5000/appointments', newAppointment);
      fetchAppointments();
      setNewAppointment({
        patientName: '',
        doctorName: '',
        department: '',
        date: '',
        time: '',
      });
      setFormVisible(false);
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Appointments Management</h1>

      <button
        onClick={() => setFormVisible(!isFormVisible)}
        className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 mb-6 w-full"
      >
        {isFormVisible ? 'Close Form' : 'Add New Appointment'}
      </button>

      {isFormVisible && (
        <div className="bg-gray-100 p-6 rounded-md shadow-md mb-8 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Add New Appointment</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              value={newAppointment.patientName}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="doctorName"
              placeholder="Doctor Name"
              value={newAppointment.doctorName}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={newAppointment.department}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-md"
            />
            <input
              type="date"
              name="date"
              value={newAppointment.date}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-md"
            />
            <input
              type="time"
              name="time"
              value={newAppointment.time}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 w-full"
            >
              Add Appointment
            </button>
          </form>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Appointment List</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Patient Name</th>
                <th className="px-4 py-2">Doctor</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{appointment.patientName}</td>
                  <td className="px-4 py-2">{appointment.doctorName}</td>
                  <td className="px-4 py-2">{appointment.department}</td>
                  <td className="px-4 py-2">{new Date(appointment.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{appointment.time}</td>
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
