import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../ErrorBoundary';

// Mock the accessibility announce function
jest.mock('../../utils/accessibility', () => ({
  announce: jest.fn()
}));

describe('ErrorBoundary Component', () => {
  const originalConsoleError = console.error;
  
  beforeEach(() => {
    // Mock console.error to prevent noise in test output
    console.error = jest.fn();
  });
  
  afterEach(() => {
    console.error = originalConsoleError;
    jest.clearAllMocks();
  });

  const ThrowError = () => {
    throw new Error('Test error');
  };

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders error UI when an error occurs', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(/We're sorry, but something unexpected happened/)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('provides refresh and go back buttons', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('announces error to screen readers', () => {
    const { announce } = require('../../utils/accessibility');
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(announce).toHaveBeenCalledWith(
      'An error has occurred. Please try refreshing the page.',
      'assertive'
    );
  });

  it('logs error details to console in development', () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledWith(
      'Error caught by boundary:',
      expect.any(Error),
      expect.any(Object)
    );

    process.env.NODE_ENV = originalNodeEnv;
  });

  it('shows technical details in development mode', () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Technical Details')).toBeInTheDocument();
    
    // Click to expand technical details
    fireEvent.click(screen.getByText('Technical Details'));
    expect(screen.getByText(/Error: Test error/)).toBeInTheDocument();

    process.env.NODE_ENV = originalNodeEnv;
  });

  it('hides technical details in production mode', () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.queryByText('Technical Details')).not.toBeInTheDocument();

    process.env.NODE_ENV = originalNodeEnv;
  });

  it('handles refresh page action', () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { reload: jest.fn() };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Refresh Page'));
    expect(window.location.reload).toHaveBeenCalled();

    window.location = originalLocation;
  });

  it('handles go back action', () => {
    const originalHistory = window.history;
    delete window.history;
    window.history = { back: jest.fn() };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Go Back'));
    expect(window.history.back).toHaveBeenCalled();

    window.history = originalHistory;
  });

  it('maintains error state across re-renders', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <div>New Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.queryByText('New Content')).not.toBeInTheDocument();
  });
}); 