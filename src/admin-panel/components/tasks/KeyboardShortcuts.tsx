import React, { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onSearch?: () => void;
  onNewTask?: () => void;
  onRefresh?: () => void;
  onEsc?: () => void;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ 
  onSearch, 
  onNewTask, 
  onRefresh, 
  onEsc 
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Search: Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onSearch?.();
      }

      // New Task: Cmd/Ctrl + N
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        onNewTask?.();
      }

      // Refresh: Cmd/Ctrl + R
      if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
        e.preventDefault();
        onRefresh?.();
      }

      // Esc: Close/Discard
      if (e.key === 'Escape') {
        onEsc?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearch, onNewTask, onRefresh, onEsc]);

  return null; // This component doesn't render anything
};
