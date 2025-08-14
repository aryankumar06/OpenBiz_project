import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

describe('App Component', () => {
  test('renders header with OpenBiz title', () => {
    render(<AppWithRouter />);
    const titleElement = screen.getByText(/OpenBiz/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders navigation menu', () => {
    render(<AppWithRouter />);
    const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });
    const businessesLink = screen.getByRole('link', { name: /Businesses/i });
    
    expect(dashboardLink).toBeInTheDocument();
    expect(businessesLink).toBeInTheDocument();
  });

  test('renders dashboard by default', () => {
    render(<AppWithRouter />);
    const dashboardHeading = screen.getByText(/Business Registration Dashboard/i);
    expect(dashboardHeading).toBeInTheDocument();
  });
});