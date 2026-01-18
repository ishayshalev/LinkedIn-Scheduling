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
import { ChevronDown, Image, Smile } from 'lucide-react';

export function PostEditorActions() {
  const {
    draftContent,
    currentPostId,
    setIsOpen,
    resetDialog,
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

  const handleSchedule = () => {
    if (!canPost || !selectedDate) return;

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

    // Clear the editor for a new post but keep dialog open
    resetDialog();
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

  // Disable past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '12px', marginTop: 'auto' }}>
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
            disabled={!canPost || !selectedDate}
            variant={isScheduledPost ? 'default' : 'outline'}
            style={{ paddingLeft: '16px', paddingRight: '16px' }}
          >
            Schedule
          </Button>

          {/* Save Draft button - only for drafts */}
          {!isScheduledPost && (
            <Button
              onClick={handleSaveDraft}
              disabled={!canPost}
              style={{ paddingLeft: '16px', paddingRight: '16px' }}
            >
              Save Draft
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
