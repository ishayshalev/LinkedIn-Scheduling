import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useSchedulingDialog } from './SchedulingDialogContext';
import { PostEditor } from './editor/PostEditor';
import { SchedulingSidebar } from './sidebar/SchedulingSidebar';
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
    if (hasUnsavedChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to create a new post?');
      if (!confirmed) return;
    }
    setMode('compose');
    setCurrentPostId(null);
    setDraftContent('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        style={{
          maxWidth: mode === 'scheduler' ? '1100px' : '600px',
          width: '90vw',
          height: mode === 'scheduler' ? '80vh' : 'auto',
          maxHeight: mode === 'scheduler' ? '700px' : '80vh',
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span style={srOnlyStyle}>
          <DialogTitle>
            {mode === 'compose' ? 'Create a post' : 'Scheduled Posts'}
          </DialogTitle>
        </span>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: '1px solid #e0e0e0',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {mode === 'scheduler' && (
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
            )}
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
              {mode === 'compose' ? 'Create a post' : 'Scheduled Posts'}
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
          {mode === 'scheduler' && <SchedulingSidebar />}
          <PostEditor />
        </div>
      </DialogContent>
    </Dialog>
  );
}
