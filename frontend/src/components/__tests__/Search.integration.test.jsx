import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchBar from '../SearchBar';
import VoiceSearch from '../VoiceSearch';

// Mock the Web Speech API
const mockSpeechRecognition = {
  start: jest.fn(),
  stop: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

window.webkitSpeechRecognition = jest.fn().mockImplementation(() => mockSpeechRecognition);

// Mock Redux store
const mockStore = configureStore([]);

describe('Search Integration', () => {
  let store;
  const mockNavigate = jest.fn();

  beforeEach(() => {
    store = mockStore({
      search: {
        recentSearches: ['laptop', 'phone'],
        suggestions: ['laptop pro', 'laptop bag']
      }
    });
    jest.clearAllMocks();
  });

  const renderWithRouter = (component) => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={component} />
            <Route path="/search" element={<div>Search Results</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  describe('Text Search', () => {
    it('performs text search and navigates to results', async () => {
      renderWithRouter(<SearchBar />);
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.change(searchInput, { target: { value: 'test product' } });
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        expect(window.location.pathname).toBe('/search');
        expect(window.location.search).toBe('?q=test%20product');
      });
    });

    it('shows search suggestions while typing', async () => {
      renderWithRouter(<SearchBar />);
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.change(searchInput, { target: { value: 'lap' } });

      await waitFor(() => {
        expect(screen.getByText('laptop pro')).toBeInTheDocument();
        expect(screen.getByText('laptop bag')).toBeInTheDocument();
      });
    });

    it('shows recent searches when focused', () => {
      renderWithRouter(<SearchBar />);
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.focus(searchInput);

      expect(screen.getByText('laptop')).toBeInTheDocument();
      expect(screen.getByText('phone')).toBeInTheDocument();
    });

    it('trims whitespace from search query', async () => {
      renderWithRouter(<SearchBar />);
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.change(searchInput, { target: { value: '  test product  ' } });
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        expect(window.location.search).toBe('?q=test%20product');
      });
    });

    it('prevents empty search submissions', async () => {
      renderWithRouter(<SearchBar />);
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.change(searchInput, { target: { value: '   ' } });
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        expect(window.location.pathname).not.toBe('/search');
      });
    });
  });

  describe('Voice Search Integration', () => {
    it('integrates voice search results with search bar', async () => {
      renderWithRouter(<SearchBar />);
      
      const voiceButton = screen.getByLabelText('Start voice search');
      fireEvent.click(voiceButton);

      // Simulate speech recognition result
      const results = [
        [
          {
            transcript: 'voice test product',
            confidence: 0.9
          }
        ]
      ];
      
      const resultEvent = new Event('result');
      resultEvent.results = results;
      
      mockSpeechRecognition.onresult(resultEvent);

      await waitFor(() => {
        expect(window.location.pathname).toBe('/search');
        expect(window.location.search).toBe('?q=voice%20test%20product');
      });
    });

    it('handles voice search errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      renderWithRouter(<SearchBar />);
      
      const voiceButton = screen.getByLabelText('Start voice search');
      fireEvent.click(voiceButton);

      // Simulate error
      mockSpeechRecognition.onerror({ error: 'no-speech' });

      expect(consoleSpy).toHaveBeenCalledWith('Speech recognition error:', 'no-speech');
      expect(window.location.pathname).not.toBe('/search');

      consoleSpy.mockRestore();
    });

    it('updates UI state during voice search', () => {
      renderWithRouter(<SearchBar />);
      
      const voiceButton = screen.getByLabelText('Start voice search');
      
      fireEvent.click(voiceButton);
      expect(voiceButton).toHaveAttribute('aria-label', 'Stop voice search');
      expect(voiceButton).toHaveClass('bg-red-500');

      // Simulate end of recognition
      mockSpeechRecognition.onend();
      
      expect(voiceButton).toHaveAttribute('aria-label', 'Start voice search');
      expect(voiceButton).not.toHaveClass('bg-red-500');
    });
  });

  describe('Accessibility', () => {
    it('maintains focus after search submission', async () => {
      renderWithRouter(<SearchBar />);
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      searchInput.focus();
      fireEvent.change(searchInput, { target: { value: 'test' } });
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        expect(document.activeElement).toBe(searchInput);
      });
    });

    it('announces voice search status to screen readers', () => {
      renderWithRouter(<SearchBar />);
      
      const voiceButton = screen.getByLabelText('Start voice search');
      
      fireEvent.click(voiceButton);
      expect(voiceButton).toHaveAttribute('aria-label', 'Stop voice search');

      mockSpeechRecognition.onend();
      expect(voiceButton).toHaveAttribute('aria-label', 'Start voice search');
    });

    it('handles keyboard navigation in search suggestions', async () => {
      renderWithRouter(<SearchBar />);
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.change(searchInput, { target: { value: 'lap' } });

      await waitFor(() => {
        const suggestions = screen.getAllByRole('option');
        expect(suggestions).toHaveLength(2);
      });

      // Test keyboard navigation
      fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
      expect(screen.getByText('laptop pro')).toHaveClass('highlighted');

      fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
      expect(screen.getByText('laptop bag')).toHaveClass('highlighted');

      fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
      expect(screen.getByText('laptop pro')).toHaveClass('highlighted');
    });
  });
}); 