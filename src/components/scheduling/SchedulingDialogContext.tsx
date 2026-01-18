import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type DialogMode = 'compose' | 'scheduler';

interface SchedulingDialogContextType {
  // Dialog state
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;

  // View mode
  mode: DialogMode;
  setMode: (mode: DialogMode) => void;

  // Current post being edited
  currentPostId: string | null;
  setCurrentPostId: (id: string | null) => void;

  // Draft content (for unsaved changes tracking)
  draftContent: string;
  setDraftContent: (content: string) => void;
  hasUnsavedChanges: boolean;

  // Schedule picker state
  showSchedulePicker: boolean;
  setShowSchedulePicker: (show: boolean) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;

  // Actions
  openComposeMode: () => void;
  openSchedulerMode: () => void;
  resetDialog: () => void;
}

const SchedulingDialogContext = createContext<SchedulingDialogContextType | null>(null);

function getDefaultTime(): string {
  const now = new Date();
  // Round up to next 15-minute slot
  const minutes = Math.ceil(now.getMinutes() / 15) * 15;
  now.setMinutes(minutes, 0, 0);
  if (minutes >= 60) {
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
  }
  return now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function SchedulingDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<DialogMode>('compose');
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [draftContent, setDraftContent] = useState('');
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState(getDefaultTime());
  const [originalContent, setOriginalContent] = useState('');

  const hasUnsavedChanges = draftContent !== originalContent && draftContent.trim() !== '';

  const resetDialog = useCallback(() => {
    setMode('compose');
    setCurrentPostId(null);
    setDraftContent('');
    setOriginalContent('');
    setShowSchedulePicker(false);
    setSelectedDate(null);
    setSelectedTime(getDefaultTime());
  }, []);

  const openComposeMode = useCallback(() => {
    resetDialog();
    setMode('compose');
    setIsOpen(true);
  }, [resetDialog]);

  const openSchedulerMode = useCallback(() => {
    setMode('scheduler');
    setShowSchedulePicker(false);
    if (!isOpen) {
      setIsOpen(true);
    }
  }, [isOpen]);

  const handleSetDraftContent = useCallback((content: string) => {
    setDraftContent(content);
  }, []);

  const handleSetCurrentPostId = useCallback((id: string | null) => {
    setCurrentPostId(id);
    // When selecting a post, set its content as both draft and original
    // The actual content will be set by the component that has access to posts
  }, []);

  return (
    <SchedulingDialogContext.Provider
      value={{
        isOpen,
        setIsOpen,
        mode,
        setMode,
        currentPostId,
        setCurrentPostId: handleSetCurrentPostId,
        draftContent,
        setDraftContent: handleSetDraftContent,
        hasUnsavedChanges,
        showSchedulePicker,
        setShowSchedulePicker,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        openComposeMode,
        openSchedulerMode,
        resetDialog,
      }}
    >
      {children}
    </SchedulingDialogContext.Provider>
  );
}

export function useSchedulingDialog() {
  const context = useContext(SchedulingDialogContext);
  if (!context) {
    throw new Error('useSchedulingDialog must be used within a SchedulingDialogProvider');
  }
  return context;
}
