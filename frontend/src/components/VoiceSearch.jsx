import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const VoiceSearch = ({ onSearchResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onSearchResult(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, [onSearchResult]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`p-1.5 rounded-xl transition-all duration-300 ${
        isListening 
          ? 'bg-pet-brown text-white animate-pulse' 
          : 'bg-pet-beige/20 text-pet-brown hover:bg-pet-brown/10'
      }`}
      aria-label={isListening ? 'Stop voice search' : 'Start voice search'}
    >
      {isListening ? (
        <FaMicrophoneSlash className="w-5 h-5" />
      ) : (
        <FaMicrophone className="w-5 h-5" />
      )}
    </button>
  );
};

export default VoiceSearch; 