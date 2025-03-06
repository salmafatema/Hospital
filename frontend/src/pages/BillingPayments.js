import React, { useState } from 'react'

function BillingPayments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    patientName: '',
    amount: '',
    description: '',
    dueDate: '',
  });
  
  // Sample billing/payment data with more fields
  const [tableData, setTableData] = useState([
    { 
      invoiceId: "INV-2024-001", 
      patientName: "John Doe",
      amount: "$299.99", 
      date: "2024-03-15", 
      dueDate: "2024-04-15",
      status: "Paid",
      description: "Consultation and Treatment",
      paymentMethod: "Credit Card",
      paymentDate: "2024-03-16"
    },
    { 
      invoiceId: "INV-2024-002", 
      patientName: "Jane Smith",
      amount: "$149.50", 
      date: "2024-03-10", 
      dueDate: "2024-04-10",
      status: "Pending", 
      description: "Follow-up Visit",
      paymentMethod: null,
      paymentDate: null
    },
    { 
      invoiceId: "INV-2024-003", 
      patientName: "Mike Johnson",
      amount: "$599.99", 
      date: "2024-03-05", 
      dueDate: "2024-04-05",
      status: "Overdue", 
      description: "Emergency Care",
      paymentMethod: null,
      paymentDate: null
    },
  ]);

  // Filter data based on search term
  const filteredData = tableData.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleGenerateInvoice = (e) => {
    e.preventDefault();
    const newInvoiceData = {
      ...newInvoice,
      invoiceId: `INV-${new Date().getFullYear()}-${String(tableData.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: "Pending",
      paymentMethod: null,
      paymentDate: null
    };
    setTableData([...tableData, newInvoiceData]);
    setNewInvoice({
      patientName: '',
      amount: '',
      description: '',
      dueDate: '',
    });
    setShowInvoiceForm(false);
  };

  const handleUpdatePayment = (invoiceId, status, paymentMethod) => {
    setTableData(tableData.map(item => {
      if (item.invoiceId === invoiceId) {
        return {
          ...item,
          status,
          paymentMethod,
          paymentDate: status === 'Paid' ? new Date().toISOString().split('T')[0] : null
        };
      }
      return item;
    }));
  };

  return (
    <div className="ml-64 p-4 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Billing & Payments</h1>
        <button
          onClick={() => setShowInvoiceForm(true)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Generate New Invoice
        </button>
      </div>

      {/* Invoice Generation Form */}
      {showInvoiceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Generate New Invoice</h2>
            <form onSubmit={handleGenerateInvoice}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Patient Name</label>
                <input
                  type="text"
                  value={newInvoice.patientName}
                  onChange={(e) => setNewInvoice({...newInvoice, patientName: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInvoiceForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-black">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Invoice ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Patient Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Payment Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Payment Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.invoiceId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.patientName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.dueDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${item.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.paymentMethod || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.paymentDate || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {item.status !== 'Paid' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdatePayment(item.invoiceId, 'Paid', 'Credit Card')}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Mark as Paid
                    </button>
                    <button
                      onClick={() => handleUpdatePayment(item.invoiceId, 'Overdue', null)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Mark as Overdue
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BillingPayments;