import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Patients() {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({
        name: '',
        age: '',
        gender: '',
        phone: '',
        address: '',
        medicalHistory: ''
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/patients');
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error.message);
            // Add error handling UI feedback here
        }
    };

    const handleInputChange = (e) => {
        setNewPatient({
            ...newPatient,
            [e.target.name]: e.target.value
        });
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!newPatient.name || !newPatient.age || !newPatient.gender || !newPatient.phone || !newPatient.address) {
        alert("Please fill in all required fields.");
        return;
    }

        try {
            const response = await axios.post('http://localhost:5000/api/patients', newPatient);
            setPatients([...patients, response.data]);
            alert("Patient added successfully!");
            setNewPatient({
                name: '',
                age: '',
                gender: '',
                phone: '',
                address: '',
                medicalHistory: ''
            });
            setShowModal(false);
        } catch (error) {
            console.error('Error adding patient:', error.message);
            alert("Failed to add patient. Please try again.");
            // Add error handling UI feedback here
        }
    };

    return (
        <div className="ml-64 p-4 mt-16">
            {/* Search Bar and Add Button */}
            <div className="mb-4 flex justify-between items-center">
                <div className="w-1/2">
                    <input
                        type="text"
                        placeholder="Search patients..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <div>
                    <button 
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                        Add Patient
                    </button>
                </div>
            </div>

            {/* Patients List */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Age</th>
                                <th className="py-2 px-4 border-b">Gender</th>
                                <th className="py-2 px-4 border-b">Phone</th>
                                <th className="py-2 px-4 border-b">Address</th>
                                <th className="py-2 px-4 border-b">Medical History</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map(patient => (
                                <tr key={patient._id}>
                                    <td className="py-2 px-4 border-b">{patient.name}</td>
                                    <td className="py-2 px-4 border-b">{patient.age}</td>
                                    <td className="py-2 px-4 border-b">{patient.gender}</td>
                                    <td className="py-2 px-4 border-b">{patient.phone}</td>
                                    <td className="py-2 px-4 border-b">{patient.address}</td>
                                    <td className="py-2 px-4 border-b">{patient.medicalHistory}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Patient Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-8 w-[90vw] max-w-2xl rounded-xl shadow-2xl">
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
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4" >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newPatient.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={newPatient.age}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <input
                                    type="text"
                                    name="gender"
                                    value={newPatient.gender}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={newPatient.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={newPatient.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
                                <textarea
                                    name="medicalHistory"
                                    value={newPatient.medicalHistory}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="col-span-2 flex justify-end gap-4 mt-2">
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
                                    Save Patient
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Patients;
