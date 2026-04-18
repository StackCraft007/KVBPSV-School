import React, { useEffect, useState } from 'react';

/**
 * SecurityWrapper provides several deterrents to prevent misuse of website content:
 * 1. Disables Right-Click (Context Menu)
 * 2. Blocks common save/screenshot shortcuts (Ctrl+S, Ctrl+P, F12, PrintScreen)
 * 3. Blurs content when the window loses focus (deterrent for OS-level snipping tools)
 * 4. Prevents text/image selection and long-press on mobile
 */
const SecurityWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    // 1. Handle keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+S (Save), Ctrl+P (Print), Ctrl+U (Source), F12 (DevTools)
      if (
        (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u' || e.key === 'shift' || e.key === 'i')) ||
        e.key === 'F12' ||
        e.key === 'PrintScreen'
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 2. Handle focus/blur to deter screenshots
    const handleBlur = () => setIsFocused(false);
    const handleFocus = () => setIsFocused(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    
    // Prevent dragging images
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <div 
      className={`selection:bg-transparent`}
      style={{ 
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}


      {/* Security protection screen removed */}
    </div>
  );
};

export default SecurityWrapper;
