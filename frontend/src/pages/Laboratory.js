import React, { useState } from 'react'

function Laboratory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTest, setSelectedTest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Sample laboratory test data with results
  const tableData = [
    { 
      testName: "Complete Blood Count (CBC)", 
      patientName: "John Smith", 
      testDate: "2024-03-15", 
      status: "Completed",
      results: {
        wbc: "7.5 x10^9/L",
        rbc: "4.8 x10^12/L",
        hemoglobin: "14.2 g/dL",
        hematocrit: "42%",
        platelets: "250 x10^9/L"
      },
      referenceRanges: {
        wbc: "4.5-11.0 x10^9/L",
        rbc: "4.2-5.4 x10^12/L",
        hemoglobin: "13.5-17.5 g/dL",
        hematocrit: "38.8-50%",
        platelets: "150-450 x10^9/L"
      }
    },
    { 
      testName: "Basic Metabolic Panel", 
      patientName: "Sarah Johnson", 
      testDate: "2024-03-15", 
      status: "Pending",
      results: null,
      referenceRanges: null
    },
    { 
      testName: "Lipid Panel", 
      patientName: "Michael Brown", 
      testDate: "2024-03-14", 
      status: "In Progress",
      results: null,
      referenceRanges: null
    },
    { 
      testName: "Thyroid Function Test", 
      patientName: "Emily Davis", 
      testDate: "2024-03-14", 
      status: "Completed",
      results: {
        tsh: "2.5 mIU/L",
        t4: "1.2 ng/dL",
        t3: "0.8 ng/dL"
      },
      referenceRanges: {
        tsh: "0.4-4.0 mIU/L",
        t4: "0.8-1.8 ng/dL",
        t3: "0.6-1.2 ng/dL"
      }
    },
  ];

  // Filter data based on search term
  const filteredData = tableData.filter(item =>
    Object.values(item).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleViewResults = (test) => {
    setSelectedTest(test);
    setShowModal(true);
  };

  return (
    <div className="p-4 md:ml-64 mt-16">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tests, patients..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Test Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Patient Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Test Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.testName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.testDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.status === 'Completed' && (
                    <button
                      onClick={() => handleViewResults(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Results
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results Modal - Make it responsive */}
      {showModal && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedTest.testName} Results</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Patient: {selectedTest.patientName}</p>
                <p>Date: {selectedTest.testDate}</p>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Test Results</h3>
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Parameter</th>
                      <th className="px-4 py-2 text-left">Result</th>
                      <th className="px-4 py-2 text-left">Reference Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(selectedTest.results).map(([key, value]) => (
                      <tr key={key} className="border-t">
                        <td className="px-4 py-2 capitalize">{key}</td>
                        <td className="px-4 py-2">{value}</td>
                        <td className="px-4 py-2">{selectedTest.referenceRanges[key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Laboratory;