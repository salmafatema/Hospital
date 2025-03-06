import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaDownload } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample hospital data - replace with actual API call
  const tableData = [
    {
      patientId: "P001",
      patientName: "John Smith",
      age: "45",
      diagnosis: "Type 2 Diabetes",
      doctor: "Dr. Sarah Johnson",
      department: "Endocrinology",
      admissionDate: "2024-03-15",
      status: "Admitted"
    },
    {
      patientId: "P002",
      patientName: "Emma Davis",
      age: "32",
      diagnosis: "Pneumonia",
      doctor: "Dr. Michael Chen",
      department: "Pulmonology",
      admissionDate: "2024-03-14",
      status: "Discharged"
    },
    {
      patientId: "P003",
      patientName: "Robert Wilson",
      age: "58",
      diagnosis: "Hypertension",
      doctor: "Dr. Lisa Anderson",
      department: "Cardiology",
      admissionDate: "2024-03-16",
      status: "Admitted"
    }
  ];

  // Filter data based on search term
  const filteredData = tableData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key].toString().toLowerCase();
    const bValue = b[sortConfig.key].toString().toLowerCase();
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) return <FaSort className="inline ml-2" />;
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="inline ml-2" /> : 
      <FaSortDown className="inline ml-2" />;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'admitted':
        return 'bg-green-100 text-green-800';
      case 'discharged':
        return 'bg-gray-100 text-gray-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // Download functionality
  const handleDownload = () => {
    const csvContent = [
      Object.keys(tableData[0]).join(','),
      ...tableData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'hospital_reports.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prepare data for trends
  const getTrendsData = () => {
    const departments = [...new Set(tableData.map(item => item.department))];
    const departmentCounts = departments.map(dept => ({
      department: dept,
      count: tableData.filter(item => item.department === dept).length
    }));

    const statusCounts = {
      admitted: tableData.filter(item => item.status.toLowerCase() === 'admitted').length,
      discharged: tableData.filter(item => item.status.toLowerCase() === 'discharged').length,
      critical: tableData.filter(item => item.status.toLowerCase() === 'critical').length
    };

    return {
      departments: departmentCounts,
      status: statusCounts
    };
  };

  const trendsData = getTrendsData();

  const departmentChartData = {
    labels: trendsData.departments.map(d => d.department),
    datasets: [
      {
        label: 'Patients by Department',
        data: trendsData.departments.map(d => d.count),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const statusChartData = {
    labels: Object.keys(trendsData.status),
    datasets: [
      {
        label: 'Patients by Status',
        data: Object.values(trendsData.status),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 206, 86)',
          'rgb(255, 99, 132)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="ml-64 p-8 mt-16">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Hospital Patient Reports</h1>
          <p className="text-gray-600">View and manage patient admission records</p>
        </div>
        <button
          onClick={handleDownload}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <FaDownload /> Download Report
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by patient name, ID, diagnosis, or doctor..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-pink-50 border-1 border-pink-300 p-8 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm">Total Patients</h3>
          <p className="text-2xl font-semibold">{tableData.length}</p>
        </div>
        <div className="bg-yellow-50 border-1 border-yellow-300 p-8 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm">Currently Admitted</h3>
          <p className="text-2xl font-semibold">
            {tableData.filter(patient => patient.status.toLowerCase() === 'admitted').length}
          </p>
        </div>
        <div className="bg-green-50 border-1 border-green-300 p-8 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm">Recently Discharged</h3>
          <p className="text-2xl font-semibold">
            {tableData.filter(patient => patient.status.toLowerCase() === 'discharged').length}
          </p>
        </div>
      </div>

      {/* Trends Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Patients by Department</h3>
          <Line data={departmentChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Patients by Status</h3>
          <Line data={statusChartData} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : sortedData.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No patients found</p>
          <p className="text-gray-400">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-black">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                      onClick={() => requestSort('patientId')}>
                    Patient ID {getSortIcon('patientId')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                      onClick={() => requestSort('patientName')}>
                    Patient Name {getSortIcon('patientName')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                      onClick={() => requestSort('age')}>
                    Age {getSortIcon('age')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                      onClick={() => requestSort('diagnosis')}>
                    Diagnosis {getSortIcon('diagnosis')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                      onClick={() => requestSort('doctor')}>
                    Doctor {getSortIcon('doctor')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                      onClick={() => requestSort('department')}>
                    Department {getSortIcon('department')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                      onClick={() => requestSort('admissionDate')}>
                    Admission Date {getSortIcon('admissionDate')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                      onClick={() => requestSort('status')}>
                    Status {getSortIcon('status')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{item.patientId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.patientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.diagnosis}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.doctor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.admissionDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;