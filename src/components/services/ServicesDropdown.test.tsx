import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ServicesDropdown } from './ServicesDropdown';
import { BrowserRouter } from 'react-router-dom';
import { SERVICE_CATEGORIES } from '../../data/services';

// Mocking framer-motion since it uses requestAnimationFrame and can be tricky in Jest
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const mockOnNavigate = jest.fn();
const mockOnClose = jest.fn();

const renderComponent = (isOpen = true) => {
  return render(
    <BrowserRouter>
      <ServicesDropdown 
        isOpen={isOpen} 
        onClose={mockOnClose} 
        onNavigate={mockOnNavigate} 
      />
    </BrowserRouter>
  );
};

describe('ServicesDropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    renderComponent(true);
    expect(screen.getByPlaceholderText(/Search 1000\+/)).toBeInTheDocument();
    expect(screen.getByText(SERVICE_CATEGORIES[0].title)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderComponent(false);
    expect(screen.queryByPlaceholderText(/Search 1000\+/)).not.toBeInTheDocument();
  });

  it('filters results when searching', async () => {
    renderComponent(true);
    const searchInput = screen.getByPlaceholderText(/Search 1000\+/);
    
    fireEvent.change(searchInput, { target: { value: 'GST Registration' } });
    
    await waitFor(() => {
      expect(screen.getByText('Search Results')).toBeInTheDocument();
    });
    
    // Check if the service is found (it might be in multiple places, so we check for existence)
    const results = screen.getAllByText('GST Registration');
    expect(results.length).toBeGreaterThan(0);
  });

  it('shows no results message when query doesn\'t match', async () => {
    renderComponent(true);
    const searchInput = screen.getByPlaceholderText(/Search 1000\+/);
    
    fireEvent.change(searchInput, { target: { value: 'NonExistentService123' } });
    
    await waitFor(() => {
      expect(screen.getByText(/No services found matching/)).toBeInTheDocument();
    });
  });

  it('switches categories on hover', () => {
    renderComponent(true);
    const secondCategory = SERVICE_CATEGORIES[1];
    const categoryButton = screen.getByText(secondCategory.title);
    
    fireEvent.mouseEnter(categoryButton);
    
    expect(screen.getByText(secondCategory.title, { selector: 'h3' })).toBeInTheDocument();
  });

  it('calls onNavigate and onClose when a service is clicked', async () => {
    renderComponent(true);
    const firstService = SERVICE_CATEGORIES[0].subServices[0];
    const serviceButton = screen.getByText(firstService.name);
    
    fireEvent.click(serviceButton);
    
    expect(mockOnNavigate).toHaveBeenCalledWith(firstService.route, firstService.id);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('closes on Escape key press', () => {
    renderComponent(true);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalled();
  });
});
