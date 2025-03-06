import React, { useState } from 'react'

function Pharmacy() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample pharmacy data with expiry dates
  const tableData = [
    { 
      medicationName: "Amoxicillin",
      dosage: "500mg",
      quantity: 30,
      category: "Antibiotics",
      price: "$15.99",
      status: "In Stock",
      expiryDate: "2024-12-31"
    },
    { 
      medicationName: "Lisinopril",
      dosage: "10mg",
      quantity: 45,
      category: "Blood Pressure",
      price: "$12.50",
      status: "In Stock",
      expiryDate: "2024-08-15"
    },
    { 
      medicationName: "Metformin",
      dosage: "850mg",
      quantity: 60,
      category: "Diabetes",
      price: "$8.99",
      status: "Low Stock",
      expiryDate: "2024-05-20"
    },
  ];

  // Filter data based on search term
  const filteredData = tableData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Function to check if medication is expired
  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  // Function to check if medication is expiring soon (within 30 days)
  const isExpiringSoon = (expiryDate) => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return new Date(expiryDate) <= thirtyDaysFromNow && !isExpired(expiryDate);
  };

  // Function to get status color and text
  const getStatusStyle = (item) => {
    if (isExpired(item.expiryDate)) {
      return 'bg-red-100 text-red-800';
    } else if (isExpiringSoon(item.expiryDate)) {
      return 'bg-orange-100 text-orange-800';
    } else if (item.status === 'Low Stock') {
      return 'bg-yellow-100 text-yellow-800';
    }
    return 'bg-green-100 text-green-800';
  };

  // Function to get status text
  const getStatusText = (item) => {
    if (isExpired(item.expiryDate)) {
      return 'Expired';
    } else if (isExpiringSoon(item.expiryDate)) {
      return 'Expiring Soon';
    }
    return item.status;
  };

  return (
    <div className="ml-64 p-4 mt-16">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search medications..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Alert Summary */}
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-red-800 font-semibold">Expired Medications</h3>
          <p className="text-2xl font-bold text-red-800">
            {filteredData.filter(item => isExpired(item.expiryDate)).length}
          </p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg">
          <h3 className="text-orange-800 font-semibold">Expiring Soon</h3>
          <p className="text-2xl font-bold text-orange-800">
            {filteredData.filter(item => isExpiringSoon(item.expiryDate)).length}
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-yellow-800 font-semibold">Low Stock</h3>
          <p className="text-2xl font-bold text-yellow-800">
            {filteredData.filter(item => item.status === 'Low Stock').length}
          </p>
        </div>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-black">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Medication Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Dosage</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Expiry Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.medicationName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.dosage}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.expiryDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(item)}`}>
                  {getStatusText(item)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Pharmacy;