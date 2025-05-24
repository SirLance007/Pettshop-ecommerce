import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import AIRecommendations from '../AIRecommendations';

// Mock axios
jest.mock('axios');

// Mock Redux store
const mockStore = configureStore([]);

describe('AIRecommendations Component', () => {
  const mockRecommendations = [
    {
      _id: '1',
      name: 'Test Product 1',
      price: 99.99,
      image: 'test1.jpg',
      matchScore: 0.95
    },
    {
      _id: '2',
      name: 'Test Product 2',
      price: 149.99,
      image: 'test2.jpg',
      matchScore: 0.85
    }
  ];

  const mockState = {
    user: {
      purchaseHistory: ['product1', 'product2'],
      preferences: {
        categories: ['electronics'],
        priceRange: { min: 0, max: 1000 }
      }
    }
  };

  const store = mockStore(mockState);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    axios.post.mockImplementation(() => new Promise(() => {}));
    
    render(
      <Provider store={store}>
        <AIRecommendations currentProductId="123" />
      </Provider>
    );

    expect(screen.getAllByRole('presentation')).toHaveLength(4);
  });

  it('renders recommendations successfully', async () => {
    axios.post.mockResolvedValue({ data: mockRecommendations });

    render(
      <Provider store={store}>
        <AIRecommendations currentProductId="123" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Recommended for You')).toBeInTheDocument();
    });

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('95% Match')).toBeInTheDocument();
    expect(screen.getByText('85% Match')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    axios.post.mockRejectedValue(new Error('API Error'));

    render(
      <Provider store={store}>
        <AIRecommendations currentProductId="123" />
      </Provider>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching recommendations:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('makes API call with correct parameters', async () => {
    axios.post.mockResolvedValue({ data: mockRecommendations });

    render(
      <Provider store={store}>
        <AIRecommendations currentProductId="123" />
      </Provider>
    );

    expect(axios.post).toHaveBeenCalledWith('/api/recommendations', {
      currentProductId: '123',
      userHistory: ['product1', 'product2'],
      userPreferences: {
        categories: ['electronics'],
        priceRange: { min: 0, max: 1000 }
      },
      limit: 4
    });
  });

  it('updates when currentProductId changes', async () => {
    axios.post.mockResolvedValue({ data: mockRecommendations });

    const { rerender } = render(
      <Provider store={store}>
        <AIRecommendations currentProductId="123" />
      </Provider>
    );

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        '/api/recommendations',
        expect.objectContaining({ currentProductId: '123' })
      );
    });

    rerender(
      <Provider store={store}>
        <AIRecommendations currentProductId="456" />
      </Provider>
    );

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        '/api/recommendations',
        expect.objectContaining({ currentProductId: '456' })
      );
    });
  });
}); 