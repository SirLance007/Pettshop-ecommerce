// Focus trap for modals and dialogs
export const createFocusTrap = (containerRef) => {
  const focusableElements = containerRef.current?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusableElement = focusableElements?.[0];
  const lastFocusableElement = focusableElements?.[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement?.focus();
          e.preventDefault();
        }
      }
    }
  };

  return handleTabKey;
};

// Keyboard navigation for product grid
export const handleProductGridKeyboard = (e, items, currentIndex, onSelect) => {
  const GRID_COLUMNS = 4; // Adjust based on your layout

  switch (e.key) {
    case 'ArrowRight':
      e.preventDefault();
      if (currentIndex < items.length - 1) {
        onSelect(currentIndex + 1);
      }
      break;
    case 'ArrowLeft':
      e.preventDefault();
      if (currentIndex > 0) {
        onSelect(currentIndex - 1);
      }
      break;
    case 'ArrowDown':
      e.preventDefault();
      if (currentIndex + GRID_COLUMNS < items.length) {
        onSelect(currentIndex + GRID_COLUMNS);
      }
      break;
    case 'ArrowUp':
      e.preventDefault();
      if (currentIndex - GRID_COLUMNS >= 0) {
        onSelect(currentIndex - GRID_COLUMNS);
      }
      break;
    default:
      break;
  }
};

// Skip to main content
export const setupSkipToMain = () => {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
};

// Announce messages to screen readers
export const announce = (message, priority = 'polite') => {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  document.body.appendChild(announcer);
  
  // Set the message after a brief delay to ensure it's announced
  setTimeout(() => {
    announcer.textContent = message;
    
    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }, 100);
};

// High contrast mode toggle
export const toggleHighContrast = () => {
  document.documentElement.classList.toggle('high-contrast');
  const isHighContrast = document.documentElement.classList.contains('high-contrast');
  localStorage.setItem('highContrast', isHighContrast);
  return isHighContrast;
}; 