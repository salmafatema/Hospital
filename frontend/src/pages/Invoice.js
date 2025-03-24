import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setFormVisible] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    patientName: '',
    amount: '',
    date: '',
    dueDate: '',
    status: 'Pending',
    paymentMethod: 'Cash',
    paymentDate: ''
  });

  // GET route - Fetch invoices
  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/invoices');
      setInvoices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // POST route - Add new invoice
  const handleAddInvoice = async (newInvoiceData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/invoices', {
        patientName: newInvoiceData.patientName,
        amount: newInvoiceData.amount,
        date: newInvoiceData.date,
        dueDate: newInvoiceData.dueDate,
        status: newInvoiceData.status,
        paymentMethod: newInvoiceData.paymentMethod,
        paymentDate: newInvoiceData.paymentDate
      });
      setInvoices([...invoices, response.data]);
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };

  const handleEdit = (id) => {
    console.log("Edit invoice:", id);
  };

  const handleDelete = (id) => {
    // Add delete functionality
    console.log("Delete invoice:", id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAddInvoice(newInvoice);
      setFormVisible(false);
      setNewInvoice({
        patientName: '',
        amount: '',
        date: '',
        dueDate: '',
        status: 'Pending',
        paymentMethod: 'Cash',
        paymentDate: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.invoiceId.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Add New Invoice
        </button>
        <div className="relative w-full max-w-4xl">
          <input
            type="text"
            placeholder="Search invoices..."
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

      {/* Add Invoice Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-2xl mx-auto shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Invoice</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={newInvoice.patientName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={newInvoice.amount}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newInvoice.date}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newInvoice.dueDate}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={newInvoice.status}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={newInvoice.paymentMethod}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Payment Date</label>
                <input
                  type="date"
                  name="paymentDate"
                  value={newInvoice.paymentDate}
                  onChange={handleInputChange}
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
                  Save Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Invoice Records</h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Payment Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">Loading...</td>
                </tr>
              ) : filteredInvoices.map((invoice) => (
                <tr key={invoice.invoiceId} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">{invoice.invoiceId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{invoice.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${invoice.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{invoice.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{invoice.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                      invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{invoice.paymentMethod}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{invoice.paymentDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(invoice.invoiceId)}
                        className="bg-white text-black px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
