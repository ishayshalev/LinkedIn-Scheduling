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

  // Compose mode - LinkedIn style
  if (mode === 'compose') {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          style={{
            maxWidth: '552px',
            width: '90vw',
            minHeight: '380px',
            maxHeight: '80vh',
            padding: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px',
          }}
        >
          <span style={srOnlyStyle}>
            <DialogTitle>Create a post</DialogTitle>
          </span>

          <ComposeView onClose={() => handleOpenChange(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  // Scheduler mode - two panel layout
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        style={{
          maxWidth: '1100px',
          width: '90vw',
          height: '80vh',
          maxHeight: '700px',
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--card)',
        }}
      >
        <span style={srOnlyStyle}>
          <DialogTitle>Scheduled Posts</DialogTitle>
        </span>

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
      </DialogContent>
    </Dialog>
  );
}
