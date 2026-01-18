import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Clock, MoreHorizontal, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import { formatDate, formatTime, addMinutes, subtractMinutes } from '@/lib/time-utils';
import { usePosts } from '@/hooks/usePosts';
import type { Post } from '@/data/posts';
import { TimePicker } from './TimePicker';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface PostCardProps {
  post: Post;
  isDragging?: boolean;
}

export function PostCard({ post, isDragging }: PostCardProps) {
  const { selectedPostId, setSelectedPostId, updatePost } = usePosts();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const isSelected = selectedPostId === post.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  const scheduledDate = post.scheduledFor ? new Date(post.scheduledFor) : null;

  const handleTimeIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!scheduledDate) return;
    const newDate = addMinutes(scheduledDate, 15);
    updatePost(post.id, { scheduledFor: newDate.toISOString() });
  };

  const handleTimeDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!scheduledDate) return;
    const newDate = subtractMinutes(scheduledDate, 15);
    updatePost(post.id, { scheduledFor: newDate.toISOString() });
  };

  const handleTimeSelect = (timeStr: string) => {
    if (!scheduledDate) return;
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;

    const newDate = new Date(scheduledDate);
    newDate.setHours(hour24, minutes, 0, 0);
    updatePost(post.id, { scheduledFor: newDate.toISOString() });
    setShowTimePicker(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date || !scheduledDate) return;
    const newDate = new Date(date);
    newDate.setHours(
      scheduledDate.getHours(),
      scheduledDate.getMinutes(),
      0,
      0
    );
    updatePost(post.id, { scheduledFor: newDate.toISOString() });
    setShowDatePicker(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg border transition-all cursor-pointer ${
        isSelected
          ? 'border-linkedin-blue shadow-md ring-1 ring-linkedin-blue/20'
          : 'border-linkedin-border hover:border-gray-300 shadow-sm'
      } ${isDragging || isSortableDragging ? 'rotate-2 shadow-xl' : ''}`}
      onClick={() => setSelectedPostId(post.id)}
    >
      {/* Drag Handle and Content */}
      <div className="p-3">
        <div className="flex gap-2">
          {/* Drag handle */}
          <div
            {...attributes}
            {...listeners}
            className="flex items-center justify-center w-6 h-6 -ml-1 cursor-grab active:cursor-grabbing text-linkedin-text-tertiary hover:text-linkedin-text-secondary"
          >
            <GripVertical className="w-4 h-4" />
          </div>

          {/* Content preview */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-linkedin-text-primary line-clamp-2 leading-snug">
              {post.content || 'Untitled post...'}
            </p>
          </div>
        </div>
      </div>

      {/* Schedule info */}
      {scheduledDate && (
        <div className="px-3 pb-3 pt-1 border-t border-linkedin-border/50 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Date picker */}
              <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                <PopoverTrigger asChild>
                  <button
                    className="flex items-center gap-1.5 text-xs text-linkedin-text-secondary hover:text-linkedin-blue transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(scheduledDate)}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CalendarComponent
                    mode="single"
                    selected={scheduledDate}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Time picker */}
              <div className="flex items-center gap-1">
                <Popover open={showTimePicker} onOpenChange={setShowTimePicker}>
                  <PopoverTrigger asChild>
                    <button
                      className="flex items-center gap-1.5 text-xs text-linkedin-text-secondary hover:text-linkedin-blue transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatTime(scheduledDate)}</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-48 p-0"
                    align="start"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TimePicker
                      selectedTime={formatTime(scheduledDate)}
                      onSelect={handleTimeSelect}
                    />
                  </PopoverContent>
                </Popover>

                {/* Time increment/decrement buttons */}
                <div className="flex flex-col -my-1 ml-1">
                  <button
                    onClick={handleTimeIncrement}
                    className="p-0.5 text-linkedin-text-tertiary hover:text-linkedin-blue hover:bg-linkedin-input-bg rounded transition-colors"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={handleTimeDecrement}
                    className="p-0.5 text-linkedin-text-tertiary hover:text-linkedin-blue hover:bg-linkedin-input-bg rounded transition-colors"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* More menu */}
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-linkedin-text-tertiary hover:text-linkedin-text-secondary hover:bg-gray-100 rounded transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Image indicator */}
      {post.hasImage && (
        <div className="px-3 pb-2">
          <div className="w-full h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-linkedin-text-tertiary">Image</span>
          </div>
        </div>
      )}
    </div>
  );
}
