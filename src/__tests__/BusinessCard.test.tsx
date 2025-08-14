import { render, screen } from '@testing-library/react';
import BusinessCard from '../components/BusinessCard';

const mockBusiness = {
  id: '1',
  name: 'Test Business Ltd',
  udyamNumber: 'UDYAM-MH-03-1234567',
  category: 'Technology',
  status: 'Active',
  registrationDate: '2023-01-15',
  location: 'Mumbai, Maharashtra',
  employees: 25
};

describe('BusinessCard Component', () => {
  test('renders business information correctly', () => {
    render(<BusinessCard business={mockBusiness} />);
    
    expect(screen.getByText('Test Business Ltd')).toBeInTheDocument();
    expect(screen.getByText('UDYAM-MH-03-1234567')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Mumbai, Maharashtra')).toBeInTheDocument();
    expect(screen.getByText('25 employees')).toBeInTheDocument();
  });

  test('displays status with correct styling', () => {
    render(<BusinessCard business={mockBusiness} />);
    
    const statusElement = screen.getByText('Active');
    expect(statusElement).toHaveClass('text-emerald-800');
  });

  test('displays registration date in correct format', () => {
    render(<BusinessCard business={mockBusiness} />);
    
    const dateElement = screen.getByText(/Registered: 1\/15\/2023/);
    expect(dateElement).toBeInTheDocument();
  });

  test('handles pending status correctly', () => {
    const pendingBusiness = { ...mockBusiness, status: 'Pending' };
    render(<BusinessCard business={pendingBusiness} />);
    
    const statusElement = screen.getByText('Pending');
    expect(statusElement).toHaveClass('text-amber-800');
  });
});