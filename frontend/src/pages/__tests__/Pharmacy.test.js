import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pharmacy from '../Pharmacy';

describe('Pharmacy Component', () => {
  beforeEach(() => {
    // Mock the current date to be fixed for consistent testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-03-15'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders pharmacy component with all elements', () => {
    render(<Pharmacy />);
    
    // Check if main elements are present
    expect(screen.getByPlaceholderText('Search medications...')).toBeInTheDocument();
    expect(screen.getByText('Expired Medications')).toBeInTheDocument();
    expect(screen.getByText('Expiring Soon')).toBeInTheDocument();
    expect(screen.getByText('Low Stock')).toBeInTheDocument();
    
    // Check if table headers are present
    expect(screen.getByText('Medication Name')).toBeInTheDocument();
    expect(screen.getByText('Dosage')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Expiry Date')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  test('filters medications based on search input', () => {
    render(<Pharmacy />);
    
    const searchInput = screen.getByPlaceholderText('Search medications...');
    
    // Search for "Amoxicillin"
    fireEvent.change(searchInput, { target: { value: 'Amoxicillin' } });
    expect(screen.getByText('Amoxicillin')).toBeInTheDocument();
    expect(screen.queryByText('Lisinopril')).not.toBeInTheDocument();
    
    // Search for "500mg"
    fireEvent.change(searchInput, { target: { value: '500mg' } });
    expect(screen.getByText('Amoxicillin')).toBeInTheDocument();
  });

  test('displays correct status for medications', () => {
    render(<Pharmacy />);
    
    // Check for expired medication (Metformin - 2024-05-20)
    expect(screen.getByText('Expiring Soon')).toBeInTheDocument();
    
    // Check for in-stock medication (Amoxicillin - 2024-12-31)
    expect(screen.getByText('In Stock')).toBeInTheDocument();
    
    // Check for low stock medication
    expect(screen.getByText('Low Stock')).toBeInTheDocument();
  });

  test('displays correct alert counts', () => {
    render(<Pharmacy />);
    
    // Check alert summary counts
    const expiredCount = screen.getByText('Expired Medications').nextElementSibling;
    const expiringSoonCount = screen.getByText('Expiring Soon').nextElementSibling;
    const lowStockCount = screen.getByText('Low Stock').nextElementSibling;
    
    expect(expiredCount).toHaveTextContent('0'); // No expired medications in sample data
    expect(expiringSoonCount).toHaveTextContent('1'); // Metformin is expiring soon
    expect(lowStockCount).toHaveTextContent('1'); // Metformin is low stock
  });

  test('applies correct status styles', () => {
    render(<Pharmacy />);
    
    // Check if status badges have correct classes
    const statusBadges = screen.getAllByRole('status');
    
    // Check for expired status style
    expect(statusBadges[0]).toHaveClass('bg-red-100', 'text-red-800');
    
    // Check for expiring soon status style
    expect(statusBadges[1]).toHaveClass('bg-orange-100', 'text-orange-800');
    
    // Check for low stock status style
    expect(statusBadges[2]).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });
}); 