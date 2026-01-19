import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useSchedulingDialog } from './SchedulingDialogContext';
import { PostEditor } from './editor/PostEditor';
import { SchedulingSidebar } from './sidebar/SchedulingSidebar';
import { ComposeView } from './ComposeView';
import { X, ArrowLeft } from 'lucide-react';

// Screen reader only styles
const srOnlyStyle: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export function SchedulingDialog() {
  const { isOpen, setIsOpen, mode, setMode, hasUnsavedChanges, resetDialog, setCurrentPostId, setDraftContent } = useSchedulingDialog();

  const handleOpenChange = (open: boolean) => {
    if (!open && hasUnsavedChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmed) return;
    }
    if (!open) {
      resetDialog();
    }
    setIsOpen(open);
  };

  const handleBackToCompose = () => {
    setMode('compose');
    setCurrentPostId(null);
    setDraftContent('');
  };

  const isScheduler = mode === 'scheduler';

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        style={{
          maxWidth: isScheduler ? '1100px' : '552px',
          width: '90vw',
          height: isScheduler ? '80vh' : 'auto',
          minHeight: isScheduler ? undefined : '380px',
          maxHeight: isScheduler ? '800px' : '80vh',
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '8px',
          backgroundColor: 'var(--card)',
          transition: 'max-width 0.3s ease, height 0.3s ease, min-height 0.3s ease, max-height 0.3s ease',
        }}
      >
        <span style={srOnlyStyle}>
          <DialogTitle>{isScheduler ? 'Scheduled Posts' : 'Create a post'}</DialogTitle>
        </span>

        {/* Compose mode content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            opacity: isScheduler ? 0 : 1,
            pointerEvents: isScheduler ? 'none' : 'auto',
            transition: 'opacity 0.2s ease',
            transitionDelay: isScheduler ? '0s' : '0.15s',
          }}
        >
          <ComposeView onClose={() => handleOpenChange(false)} />
        </div>

        {/* Scheduler mode content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            opacity: isScheduler ? 1 : 0,
            pointerEvents: isScheduler ? 'auto' : 'none',
            transition: 'opacity 0.2s ease',
            transitionDelay: isScheduler ? '0.15s' : '0s',
          }}
        >
          {/* Header for scheduler mode */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid #e0e0e0',
              flexShrink: 0,
              backgroundColor: 'white',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={handleBackToCompose}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f3f3')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                title="New post"
              >
                <ArrowLeft style={{ width: '20px', height: '20px', color: '#666' }} />
              </button>
              <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
                Scheduled Posts
              </h2>
            </div>
            <button
              onClick={() => handleOpenChange(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f3f3')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <X style={{ width: '20px', height: '20px', color: '#666' }} />
            </button>
          </div>

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <SchedulingSidebar />
            <PostEditor />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
