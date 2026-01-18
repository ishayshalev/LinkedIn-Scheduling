import { useSchedulingDialog } from './SchedulingDialogContext';
import { usePosts } from '@/hooks/usePosts';
import { user } from '@/data/user';
import {
  X,
  ChevronDown,
  Smile,
  Sparkles,
  Image,
  CalendarDays,
  Settings,
  Plus,
  Clock
} from 'lucide-react';
import { DateTimeSelector } from './datetime/DateTimeSelector';

interface ComposeViewProps {
  onClose: () => void;
}

export function ComposeView({ onClose }: ComposeViewProps) {
  const {
    draftContent,
    setDraftContent,
    currentPostId,
    showSchedulePicker,
    setShowSchedulePicker,
    selectedDate,
    selectedTime,
    openSchedulerMode,
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
    onClose();
  };

  const handlePost = () => {
    if (!canPost) return;
    // For now, just save as draft
    if (currentPostId) {
      updatePost(currentPostId, { content: draftContent });
    } else {
      const draft = createDraft();
      updatePost(draft.id, { content: draftContent });
    }
    onClose();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '380px' }}>
      {/* Header with author info and close button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '16px 16px 0 16px',
        }}
      >
        {/* Author section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <div>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: '16px',
                fontWeight: 600,
                color: 'rgba(0, 0, 0, 0.9)',
              }}
            >
              {user.name}
              <ChevronDown style={{ width: '16px', height: '16px' }} />
            </button>
            <div style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)', marginTop: '2px' }}>
              Post to Anyone
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-4px',
            marginRight: '-8px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <X style={{ width: '24px', height: '24px', color: 'rgba(0, 0, 0, 0.6)' }} />
        </button>
      </div>

      {/* Text area */}
      <div style={{ flex: 1, padding: '12px 16px', overflow: 'auto' }}>
        <textarea
          placeholder="What do you want to talk about?"
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          style={{
            width: '100%',
            height: '100%',
            minHeight: '150px',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontSize: '16px',
            lineHeight: '1.5',
            fontFamily: 'inherit',
            color: 'rgba(0, 0, 0, 0.9)',
            backgroundColor: 'transparent',
          }}
        />
      </div>

      {/* Emoji button - above divider */}
      <div style={{ padding: '0 16px 8px 16px' }}>
        <button
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
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <Smile style={{ width: '24px', height: '24px', color: 'rgba(0, 0, 0, 0.6)' }} />
        </button>
      </div>

      {/* Schedule picker (when shown) */}
      {showSchedulePicker && (
        <div style={{ padding: '0 16px 16px 16px' }}>
          <DateTimeSelector onConfirm={handleSchedule} />
        </div>
      )}

      {/* Bottom toolbar */}
      <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)', padding: '8px 16px' }}>
        {/* Tools row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {/* Rewrite with AI button */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              border: '1px solid rgba(0, 0, 0, 0.6)',
              borderRadius: '16px',
              background: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgba(0, 0, 0, 0.9)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Sparkles style={{ width: '16px', height: '16px', color: '#B07D04' }} />
            Rewrite with AI
          </button>

          {/* Image button */}
          <button
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
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Image style={{ width: '24px', height: '24px', color: 'rgba(0, 0, 0, 0.6)' }} />
          </button>

          {/* Calendar button */}
          <button
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
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <CalendarDays style={{ width: '24px', height: '24px', color: 'rgba(0, 0, 0, 0.6)' }} />
          </button>

          {/* Settings button */}
          <button
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
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Settings style={{ width: '24px', height: '24px', color: 'rgba(0, 0, 0, 0.6)' }} />
          </button>

          {/* More/Plus button */}
          <button
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
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Plus style={{ width: '24px', height: '24px', color: 'rgba(0, 0, 0, 0.6)' }} />
          </button>
        </div>
      </div>

      {/* Footer with schedule and post buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '8px',
          padding: '12px 16px',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Scheduled Posts link (if any scheduled) */}
        {scheduledPosts.length > 0 && (
          <button
            onClick={openSchedulerMode}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#0a66c2',
              fontWeight: 600,
              marginRight: 'auto',
            }}
          >
            View scheduled ({scheduledPosts.length})
          </button>
        )}

        {/* Schedule button (clock icon) */}
        <button
          onClick={() => setShowSchedulePicker(!showSchedulePicker)}
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
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          title="Schedule"
        >
          <Clock style={{ width: '24px', height: '24px', color: 'rgba(0, 0, 0, 0.6)' }} />
        </button>

        {/* Post button */}
        <button
          onClick={handlePost}
          disabled={!canPost}
          style={{
            padding: '8px 16px',
            borderRadius: '16px',
            border: 'none',
            backgroundColor: canPost ? '#0a66c2' : 'rgba(0, 0, 0, 0.08)',
            color: canPost ? 'white' : 'rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            fontWeight: 600,
            cursor: canPost ? 'pointer' : 'not-allowed',
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
}
