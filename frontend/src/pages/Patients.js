import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
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

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    console.log('Fetching patients...');

    try {
      const response = await axios.get('http://localhost:5000/patients');
      console.log('Response from backend:', response.data);


      if (Array.isArray(response.data)) {
        setPatients(response.data);
      } else if (Array.isArray(response.data.patients)) {
        setPatients(response.data.patients);
      } else {
        setPatients([]);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      setPatients([]);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Patient data to be added:', newPatient);

    try {
      const response = await axios.post('http://localhost:5000/patients', newPatient);
      console.log('Patient added:', response.data);

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
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };


  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mt-20">Hospital Management - Patient Records</h1>

      <div className="flex justify-center my-6">
  <button
    onClick={() => setFormVisible(!isFormVisible)}
    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600"
  >
    {isFormVisible ? 'Close Form' : 'Add New Patient'}
  </button>
</div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Add New Patient</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={newPatient.fullName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={newPatient.age}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <select
                type="text"
                name="gender"
                placeholder="Gender"
                value={newPatient.gender}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-md"
              >
                <option value="Other">Other</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={newPatient.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <select
                name="admissionType"
                value={newPatient.admissionType}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-md"
              >
                <option value="Emergency">Emergency</option>
                <option value="OPD">OPD</option>
                <option value="Surgery">Surgery</option>
                <option value="IPD">IPD</option>
              </select>
            </div>
            <div className="mb-4">
              <select
                name="bloodGroup"
                value={newPatient.bloodGroup}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-md"
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
            <div className="mb-4">
              <input
                type="time"
                name="time"
                value={newPatient.time}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="date"
                name="date"
                value={newPatient.date}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <button type="submit" className="bg-black text-white p-3 rounded-md hover:bg-gray-600">
              Add Patient
            </button>
          </form>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Patient List</h2>
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Admission Type</th>
              <th className="px-4 py-2 text-left">Blood Group</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} className="border-b">
                <td className="px-4 py-2">{patient.fullName}</td>
                <td className="px-4 py-2">{patient.age}</td>
                <td className="px-4 py-2">{patient.gender}</td>
                <td className="px-4 py-2">{patient.phoneNumber}</td>
                <td className="px-4 py-2">{patient.admissionType}</td>
                <td className="px-4 py-2">{patient.bloodGroup}</td>
                <td className="px-4 py-2">{patient.time}</td>
                <td className="px-4 py-2">{new Date(patient.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;