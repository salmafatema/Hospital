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
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mt-20">Appointments Management</h1>

      <div className="flex justify-center my-6">
        <button
          onClick={() => setFormVisible(!isFormVisible)}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          {isFormVisible ? 'Close Form' : 'Add New Appointment'}
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
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
            <button type="submit" className="bg-black text-white p-3 rounded-md hover:bg-gray-600 w-full">
              Add Appointment
            </button>
          </form>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Appointment List</h2>
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Patient Name</th>
              <th className="px-4 py-2 text-left">Doctor</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id} className="border-b">
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
  );
};

export default Appointments;
