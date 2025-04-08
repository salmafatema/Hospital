import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Laboratory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({
    testName: '',
    patientName: '',
    testDate: '',
    status: 'Pending',
    results: null,
    referenceRanges: null
  });

  // Fetch 
  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/laboratory');
      setTests(response.data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/laboratory', newTest);
      setFormVisible(false);
      setNewTest({
        testName: '',
        patientName: '',
        testDate: '',
        status: 'Pending',
        results: null,
        referenceRanges: null
      });
      fetchTests();
    } catch (error) {
      console.error('Error adding test:', error);
    }
  };

  // Filter tests based on search query
  const filteredTests = tests.filter(test =>
    test.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewResults = (test) => {
    setSelectedTest(test);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4 md:ml-64 mt-16">
      {/* Add search bar and button in a column layout */}
      <div className="flex flex-col items-center gap-6 my-6">
        <button
          onClick={() => setFormVisible(true)}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Test
        </button>
        <div className="relative w-full max-w-4xl">
          <input
            type="text"
            placeholder="Search tests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Laboratory Tests</h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Test Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Test Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTests.map((test) => (
                <tr key={test._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.testName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(test.testDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${test.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        test.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {test.status === 'Completed' && (
                      <button
                        onClick={() => handleViewResults(test)}
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
      </div>

      {/* Add Test Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Laboratory Test</h2>
              <button
                onClick={() => setFormVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Test Name
                  </label>
                  <input
                    type="text"
                    name="testName"
                    value={newTest.testName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={newTest.patientName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Test Date
                  </label>
                  <input
                    type="date"
                    name="testDate"
                    value={newTest.testDate}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newTest.status}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {newTest.status === 'Completed' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Test Results (Optional)
                    </label>
                    <textarea
                      name="results"
                      value={newTest.results || ''}
                      onChange={handleInputChange}
                      placeholder="Enter test results in key:value format"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reference Ranges (Optional)
                    </label>
                    <textarea
                      name="referenceRanges"
                      value={newTest.referenceRanges || ''}
                      onChange={handleInputChange}
                      placeholder="Enter reference ranges in key:value format"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800"
                >
                  Add Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {showModal && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Test Results</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Patient: </p>
                <p>Date: </p>
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
                    {/* Results data will be populated here when connected to backend */}
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