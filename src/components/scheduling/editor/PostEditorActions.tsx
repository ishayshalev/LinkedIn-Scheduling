import { useSchedulingDialog } from '../SchedulingDialogContext';
import { usePosts } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, ChevronDown, Image, Smile } from 'lucide-react';
import { DateTimeSelector } from '../datetime/DateTimeSelector';
import { formatDate } from '@/lib/time-utils';

export function PostEditorActions() {
  const {
    draftContent,
    currentPostId,
    showSchedulePicker,
    setShowSchedulePicker,
    selectedDate,
    selectedTime,
    setIsOpen,
    resetDialog,
    openSchedulerMode,
    mode,
  } = useSchedulingDialog();

  const { createDraft, schedulePost, updatePost, scheduledPosts } = usePosts();

  const canPost = draftContent.trim().length > 0;

  const handleSchedule = () => {
    if (!canPost || !selectedDate) return;

    // Parse time and create full date
    const scheduledDate = new Date(selectedDate);
    const match = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const isPM = match[3].toUpperCase() === 'PM';
      if (isPM && hours !== 12) hours += 12;
      if (!isPM && hours === 12) hours = 0;
      scheduledDate.setHours(hours, minutes, 0, 0);
    }

    // Create or update post
    if (currentPostId) {
      updatePost(currentPostId, { content: draftContent });
      schedulePost(currentPostId, scheduledDate.toISOString());
    } else {
      const draft = createDraft();
      updatePost(draft.id, { content: draftContent });
      schedulePost(draft.id, scheduledDate.toISOString());
    }

    setShowSchedulePicker(false);
    resetDialog();
    setIsOpen(false);
  };

  const handleSaveDraft = () => {
    if (!canPost) return;

    if (currentPostId) {
      updatePost(currentPostId, { content: draftContent });
    } else {
      const draft = createDraft();
      updatePost(draft.id, { content: draftContent });
    }

    resetDialog();
    setIsOpen(false);
  };

  const getScheduleButtonText = () => {
    if (selectedDate) {
      return `${formatDate(selectedDate)} at ${selectedTime}`;
    }
    return 'Schedule';
  };

  return (
    <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '12px', marginTop: 'auto' }}>
      {/* Schedule picker */}
      {showSchedulePicker && (
        <div style={{ marginBottom: '16px' }}>
          <DateTimeSelector onConfirm={handleSchedule} />
        </div>
      )}

      {/* Media/emoji icons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f3f3')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Image style={{ width: '20px', height: '20px', color: '#666' }} />
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f3f3')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Smile style={{ width: '20px', height: '20px', color: '#666' }} />
          </button>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Scheduled Posts button (only in compose mode) */}
          {mode === 'compose' && scheduledPosts.length > 0 && (
            <button
              onClick={openSchedulerMode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#0a66c2',
                fontWeight: 600,
              }}
            >
              <Calendar style={{ width: '16px', height: '16px' }} />
              Scheduled Posts ({scheduledPosts.length})
            </button>
          )}

          {/* Schedule button with dropdown */}
          <div style={{ position: 'relative' }}>
            <Button
              variant="outline"
              onClick={() => setShowSchedulePicker(!showSchedulePicker)}
              disabled={!canPost}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Clock style={{ width: '16px', height: '16px' }} />
              {getScheduleButtonText()}
              <ChevronDown style={{ width: '14px', height: '14px' }} />
            </Button>
          </div>

          {/* Post / Save Draft button */}
          <Button
            onClick={handleSaveDraft}
            disabled={!canPost}
          >
            {currentPostId ? 'Save' : 'Save Draft'}
          </Button>
        </div>
      </div>
    </div>
  );
}
