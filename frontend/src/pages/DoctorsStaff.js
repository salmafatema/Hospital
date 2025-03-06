import React, { useState } from 'react'

function DoctorsStaff() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample medical staff data with availability and assignments
  const tableData = [
    { 
      name: "Dr. Sarah Johnson", 
      specialty: "Cardiology", 
      department: "Heart Center", 
      contact: "555-0123",
      availability: "Mon-Fri, 9AM-5PM",
      assignments: "Ward 3, ICU"
    },
    { 
      name: "Dr. Michael Chen", 
      specialty: "Neurology", 
      department: "Neuroscience", 
      contact: "555-0124",
      availability: "Mon-Thu, 8AM-6PM",
      assignments: "Ward 5, Emergency"
    },
    { 
      name: "Dr. Emily Rodriguez", 
      specialty: "Pediatrics", 
      department: "Children's Care", 
      contact: "555-0125",
      availability: "Mon-Sat, 10AM-7PM",
      assignments: "Ward 2, Pediatrics"
    },
    { 
      name: "RN Jessica Thompson", 
      specialty: "Critical Care", 
      department: "ICU", 
      contact: "555-0126",
      availability: "Shift 1 (6AM-2PM)",
      assignments: "ICU, Emergency"
    },
  ];

  // Filter data based on search term
  const filteredData = tableData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="ml-64 p-4 mt-16">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search staff..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-black">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Specialty</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Department</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Availability</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Assignments</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.specialty}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.department}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {item.availability}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {item.assignments}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DoctorsStaff;