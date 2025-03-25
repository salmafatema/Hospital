import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Medications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [medications, setMedications] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    quantity: '',
    category: '',
    price: '',
    expiryDate: '',
  });

  // Fetch medications from the backend
  const fetchMedications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/medications');
      setMedications(response.data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedication((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/medications', newMedication);
      setMedications((prev) => [...prev, response.data]);
      setNewMedication({
        name: '',
        dosage: '',
        quantity: '',
        category: '',
        price: '',
        expiryDate: '',
      });
      setFormVisible(false);
    } catch (error) {
      console.error('Error saving medication:', error);
    }
  };

  // Filter medications based on search query
  const filteredMedications = medications.filter((medication) =>
    medication.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:ml-64 mt-16">
      {/* Add search bar and button in a column layout */}
      <div className="flex flex-col items-center gap-6 my-6">
        <button
          onClick={() => setFormVisible(true)}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out flex items-center gap-2 shadow-md"
        >
          Add New Medication
        </button>
        <div className="relative w-full max-w-4xl">
          <input
            type="text"
            placeholder="Search medications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-800">Medication Records</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Medication Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Dosage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Expiry Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMedications.map((medication) => (
              <tr key={medication._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">{medication.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medication.dosage}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medication.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medication.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">${medication.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(medication.expiryDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add Medication Form */}
      {isFormVisible && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-md mx-auto shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Medication</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Medication Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter medication name"
                  value={newMedication.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Dosage</label>
                <input
                  type="text"
                  name="dosage"
                  placeholder="Enter dosage"
                  value={newMedication.dosage}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  value={newMedication.quantity}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="Enter category"
                  value={newMedication.category}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={newMedication.price}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={newMedication.expiryDate}
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
                  Save Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medications;
