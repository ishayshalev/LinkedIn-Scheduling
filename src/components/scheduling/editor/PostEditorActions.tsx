import { useState, useEffect } from 'react';
import { useSchedulingDialog } from '../SchedulingDialogContext';
import { usePosts } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown, Image, Smile, Loader2, Check } from 'lucide-react';

type SaveState = 'idle' | 'saving' | 'saved';

export function PostEditorActions() {
  const {
    draftContent,
    currentPostId,
  } = useSchedulingDialog();

  const { createDraft, schedulePost, updatePost, scheduledPosts, drafts } = usePosts();

  // Determine if current post is scheduled
  const currentPost = currentPostId
    ? [...scheduledPosts, ...drafts].find(p => p.id === currentPostId)
    : null;
  const isScheduledPost = currentPost?.status === 'scheduled';

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    currentPost?.scheduledFor ? new Date(currentPost.scheduledFor) : undefined
  );
  const [selectedTime, setSelectedTime] = useState(
    currentPost?.scheduledFor
      ? new Date(currentPost.scheduledFor).toTimeString().slice(0, 5)
      : '10:00'
  );
  const [saveState, setSaveState] = useState<SaveState>('idle');

  // Update date/time when post changes
  useEffect(() => {
    if (currentPost?.scheduledFor) {
      setSelectedDate(new Date(currentPost.scheduledFor));
      setSelectedTime(new Date(currentPost.scheduledFor).toTimeString().slice(0, 5));
    } else {
      setSelectedDate(undefined);
      setSelectedTime('10:00');
    }
  }, [currentPostId, currentPost?.scheduledFor]);

  const canPost = draftContent.trim().length > 0;

  const handleSchedule = async () => {
    if (!canPost || !selectedDate || saveState !== 'idle') return;

    setSaveState('saving');

    // Combine date and time
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const scheduledDate = new Date(selectedDate);
    scheduledDate.setHours(hours, minutes, 0, 0);

    // Create or update post
    if (currentPostId) {
      updatePost(currentPostId, { content: draftContent });
      schedulePost(currentPostId, scheduledDate.toISOString());
    } else {
      const draft = createDraft();
      updatePost(draft.id, { content: draftContent });
      schedulePost(draft.id, scheduledDate.toISOString());
    }

    // Show saving for 1 second, then saved for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveState('saved');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveState('idle');
  };

  const [draftSaveState, setDraftSaveState] = useState<SaveState>('idle');

  const handleSaveDraft = async () => {
    if (!canPost || draftSaveState !== 'idle') return;

    setDraftSaveState('saving');

    if (currentPostId) {
      updatePost(currentPostId, { content: draftContent });
    } else {
      const draft = createDraft();
      updatePost(draft.id, { content: draftContent });
    }

    // Show saving for 1 second, then saved for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDraftSaveState('saved');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDraftSaveState('idle');
  };

  // Disable past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getScheduleButtonContent = () => {
    if (saveState === 'saving') {
      return (
        <>
          <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
          Saving...
        </>
      );
    }
    if (saveState === 'saved') {
      return (
        <>
          <Check style={{ width: '16px', height: '16px' }} />
          Saved
        </>
      );
    }
    return 'Schedule';
  };

  return (
    <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '12px', marginTop: 'auto' }}>
      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

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
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
          {/* Date picker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Label style={{ fontSize: '12px', color: '#666' }}>Date</Label>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  style={{
                    width: '130px',
                    justifyContent: 'space-between',
                    fontWeight: 400,
                    paddingLeft: '12px',
                    paddingRight: '12px',
                  }}
                >
                  {selectedDate ? selectedDate.toLocaleDateString() : 'Select date'}
                  <ChevronDown style={{ width: '16px', height: '16px' }} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  disabled={{ before: today }}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setDatePickerOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time picker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Label style={{ fontSize: '12px', color: '#666' }}>Time</Label>
            <Input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              style={{ width: '100px', paddingLeft: '12px', paddingRight: '12px' }}
            />
          </div>

          {/* Schedule button - primary for scheduled posts */}
          <Button
            onClick={handleSchedule}
            disabled={!canPost || !selectedDate || saveState !== 'idle'}
            variant={isScheduledPost ? 'default' : 'outline'}
            style={{
              paddingLeft: '16px',
              paddingRight: '16px',
              minWidth: '100px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {getScheduleButtonContent()}
          </Button>

          {/* Save Draft button - only for drafts */}
          {!isScheduledPost && (
            <Button
              onClick={handleSaveDraft}
              disabled={!canPost || draftSaveState !== 'idle'}
              style={{
                paddingLeft: '16px',
                paddingRight: '16px',
                minWidth: '110px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {draftSaveState === 'saving' && (
                <>
                  <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
                  Saving...
                </>
              )}
              {draftSaveState === 'saved' && (
                <>
                  <Check style={{ width: '16px', height: '16px' }} />
                  Saved
                </>
              )}
              {draftSaveState === 'idle' && 'Save Draft'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
