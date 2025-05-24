import {
  createFocusTrap,
  handleProductGridKeyboard,
  setupSkipToMain,
  announce,
  toggleHighContrast
} from '../accessibility';

describe('Accessibility Utilities', () => {
  describe('createFocusTrap', () => {
    const mockRef = {
      current: document.createElement('div')
    };

    beforeEach(() => {
      mockRef.current.innerHTML = `
        <button>First</button>
        <input type="text" />
        <button>Last</button>
      `;
      document.body.appendChild(mockRef.current);
    });

    afterEach(() => {
      document.body.removeChild(mockRef.current);
    });

    it('traps focus within container', () => {
      const handleTabKey = createFocusTrap(mockRef);
      const firstButton = mockRef.current.querySelector('button');
      const lastButton = mockRef.current.querySelectorAll('button')[1];

      // Test forward tab from last element
      lastButton.focus();
      handleTabKey({ key: 'Tab', preventDefault: jest.fn() });
      expect(document.activeElement).toBe(firstButton);

      // Test backward tab from first element
      firstButton.focus();
      handleTabKey({ key: 'Tab', shiftKey: true, preventDefault: jest.fn() });
      expect(document.activeElement).toBe(lastButton);
    });
  });

  describe('handleProductGridKeyboard', () => {
    const mockItems = Array(12).fill(null);
    const mockOnSelect = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('handles arrow key navigation', () => {
      const mockEvent = { preventDefault: jest.fn() };

      // Test right arrow
      handleProductGridKeyboard({ ...mockEvent, key: 'ArrowRight' }, mockItems, 0, mockOnSelect);
      expect(mockOnSelect).toHaveBeenCalledWith(1);

      // Test left arrow
      handleProductGridKeyboard({ ...mockEvent, key: 'ArrowLeft' }, mockItems, 1, mockOnSelect);
      expect(mockOnSelect).toHaveBeenCalledWith(0);

      // Test down arrow
      handleProductGridKeyboard({ ...mockEvent, key: 'ArrowDown' }, mockItems, 0, mockOnSelect);
      expect(mockOnSelect).toHaveBeenCalledWith(4);

      // Test up arrow
      handleProductGridKeyboard({ ...mockEvent, key: 'ArrowUp' }, mockItems, 4, mockOnSelect);
      expect(mockOnSelect).toHaveBeenCalledWith(0);
    });

    it('prevents out-of-bounds navigation', () => {
      const mockEvent = { preventDefault: jest.fn() };

      // Test right boundary
      handleProductGridKeyboard({ ...mockEvent, key: 'ArrowRight' }, mockItems, 11, mockOnSelect);
      expect(mockOnSelect).not.toHaveBeenCalled();

      // Test left boundary
      handleProductGridKeyboard({ ...mockEvent, key: 'ArrowLeft' }, mockItems, 0, mockOnSelect);
      expect(mockOnSelect).not.toHaveBeenCalled();

      // Test down boundary
      handleProductGridKeyboard({ ...mockEvent, key: 'ArrowDown' }, mockItems, 8, mockOnSelect);
      expect(mockOnSelect).not.toHaveBeenCalled();

      // Test up boundary
      handleProductGridKeyboard({ ...mockEvent, key: 'ArrowUp' }, mockItems, 0, mockOnSelect);
      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });

  describe('setupSkipToMain', () => {
    it('adds skip link to document', () => {
      setupSkipToMain();
      const skipLink = document.querySelector('a[href="#main-content"]');
      
      expect(skipLink).toBeTruthy();
      expect(skipLink.textContent).toBe('Skip to main content');
      expect(skipLink.className).toContain('sr-only');
    });
  });

  describe('announce', () => {
    it('creates and removes announcer element', () => {
      const message = 'Test announcement';
      announce(message);

      const announcer = document.querySelector('[aria-live]');
      expect(announcer).toBeTruthy();
      expect(announcer.getAttribute('aria-live')).toBe('polite');
      expect(announcer.className).toBe('sr-only');

      // Wait for cleanup
      return new Promise(resolve => {
        setTimeout(() => {
          expect(document.querySelector('[aria-live]')).toBeNull();
          resolve();
        }, 1200);
      });
    });

    it('supports different priority levels', () => {
      announce('Important message', 'assertive');
      const announcer = document.querySelector('[aria-live]');
      expect(announcer.getAttribute('aria-live')).toBe('assertive');
    });
  });

  describe('toggleHighContrast', () => {
    beforeEach(() => {
      document.documentElement.classList.remove('high-contrast');
      localStorage.clear();
    });

    it('toggles high contrast class', () => {
      const result = toggleHighContrast();
      expect(result).toBe(true);
      expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
      expect(localStorage.getItem('highContrast')).toBe('true');

      const secondResult = toggleHighContrast();
      expect(secondResult).toBe(false);
      expect(document.documentElement.classList.contains('high-contrast')).toBe(false);
      expect(localStorage.getItem('highContrast')).toBe('false');
    });
  });
}); 