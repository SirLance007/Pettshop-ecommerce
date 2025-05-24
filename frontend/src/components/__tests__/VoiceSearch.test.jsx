import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VoiceSearch from '../VoiceSearch';

// Mock the Web Speech API
const mockSpeechRecognition = {
  start: jest.fn(),
  stop: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

window.webkitSpeechRecognition = jest.fn().mockImplementation(() => mockSpeechRecognition);

describe('VoiceSearch Component', () => {
  const mockOnSearchResult = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders voice search button', () => {
    render(<VoiceSearch onSearchResult={mockOnSearchResult} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles listening state on button click', () => {
    render(<VoiceSearch onSearchResult={mockOnSearchResult} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(mockSpeechRecognition.start).toHaveBeenCalled();
    
    fireEvent.click(button);
    expect(mockSpeechRecognition.stop).toHaveBeenCalled();
  });

  it('shows correct aria-label based on listening state', () => {
    render(<VoiceSearch onSearchResult={mockOnSearchResult} />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('aria-label', 'Start voice search');
    
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Stop voice search');
  });

  it('handles speech recognition results', () => {
    render(<VoiceSearch onSearchResult={mockOnSearchResult} />);
    
    // Simulate speech recognition result
    const results = [
      [
        {
          transcript: 'test search',
          confidence: 0.9
        }
      ]
    ];
    
    const resultEvent = new Event('result');
    resultEvent.results = results;
    
    mockSpeechRecognition.onresult(resultEvent);
    
    expect(mockOnSearchResult).toHaveBeenCalledWith('test search');
  });

  it('handles speech recognition errors', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    render(<VoiceSearch onSearchResult={mockOnSearchResult} />);
    
    const errorEvent = { error: 'no-speech' };
    mockSpeechRecognition.onerror(errorEvent);
    
    expect(consoleSpy).toHaveBeenCalledWith('Speech recognition error:', 'no-speech');
    consoleSpy.mockRestore();
  });
}); 