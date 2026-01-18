import { useState, useEffect } from 'react';
import { Image, Video, FileText, Trash2, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { usePosts, useSelectedPost } from '@/hooks/usePosts';
import { formatFullDate, formatTime, getDateKey } from '@/lib/time-utils';
import { TimePicker } from '../list-view/TimePicker';
import { PostPreview } from './PostPreview';

export function PostEditor() {
  const post = useSelectedPost();
  const {
    scheduledPosts,
    updatePost,
    deletePost,
    schedulePost,
    moveToDraft,
  } = usePosts();
  const [content, setContent] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (post) {
      setContent(post.content);
    } else {
      setContent('');
    }
  }, [post?.id]);

  const handleContentChange = (value: string) => {
    setContent(value);
    if (post) {
      updatePost(post.id, { content: value });
    }
  };

  const scheduledDate = post?.scheduledFor
    ? new Date(post.scheduledFor)
    : null;

  // Get other posts on the same day for conflict awareness
  const otherPostsSameDay = scheduledDate
    ? scheduledPosts.filter((p) => {
        if (p.id === post?.id || !p.scheduledFor) return false;
        return (
          getDateKey(new Date(p.scheduledFor)) === getDateKey(scheduledDate)
        );
      })
    : [];

  const handleDateSelect = (date: Date | undefined) => {
    if (!date || !post) return;

    const currentDate = post.scheduledFor
      ? new Date(post.scheduledFor)
      : new Date();
    const newDate = new Date(date);
    newDate.setHours(currentDate.getHours(), currentDate.getMinutes(), 0, 0);

    if (post.status === 'draft') {
      schedulePost(post.id, newDate.toISOString());
    } else {
      updatePost(post.id, { scheduledFor: newDate.toISOString() });
    }
    setShowDatePicker(false);
  };

  const handleTimeSelect = (timeStr: string) => {
    if (!post || !scheduledDate) return;

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

  const handleSchedule = () => {
    if (!post) return;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);

    schedulePost(post.id, tomorrow.toISOString());
  };

  const handleMoveToDraft = () => {
    if (!post) return;
    moveToDraft(post.id);
  };

  const handleDelete = () => {
    if (!post) return;
    deletePost(post.id);
  };

  if (!post) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-linkedin-card">
            <span className="text-3xl">✍️</span>
          </div>
          <h3 className="font-semibold text-linkedin-text-primary mb-1">
            Select a post to edit
          </h3>
          <p className="text-sm text-linkedin-text-secondary">
            Choose from the sidebar or create a new one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Post Preview */}
      <PostPreview post={post} />

      {/* Editor */}
      <div className="mt-6 bg-white rounded-lg shadow-linkedin-card p-4">
        <h3 className="font-semibold text-linkedin-text-primary mb-3">
          Edit Content
        </h3>
        <Textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="What do you want to share?"
          className="min-h-[150px] resize-none border-linkedin-border focus:border-linkedin-blue focus:ring-linkedin-blue/20"
        />

        {/* Media buttons */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-linkedin-border">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-linkedin-text-secondary hover:bg-linkedin-input-bg rounded-md transition-colors">
            <Image className="w-4 h-4 text-linkedin-blue" />
            Photo
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-linkedin-text-secondary hover:bg-linkedin-input-bg rounded-md transition-colors">
            <Video className="w-4 h-4 text-linkedin-green" />
            Video
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-linkedin-text-secondary hover:bg-linkedin-input-bg rounded-md transition-colors">
            <FileText className="w-4 h-4 text-rose-500" />
            Document
          </button>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="mt-6 bg-white rounded-lg shadow-linkedin-card p-4">
        <h3 className="font-semibold text-linkedin-text-primary mb-3">
          {post.status === 'draft' ? 'When should this post go live?' : 'Schedule'}
        </h3>

        <div className="flex items-center gap-4">
          {/* Date picker */}
          <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 border border-linkedin-border rounded-md hover:border-gray-400 transition-colors">
                <Calendar className="w-4 h-4 text-linkedin-blue" />
                <span className="text-sm">
                  {scheduledDate ? formatFullDate(scheduledDate) : 'Select date'}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={scheduledDate || undefined}
                onSelect={handleDateSelect}
                initialFocus
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>

          {/* Time picker */}
          {scheduledDate && (
            <Popover open={showTimePicker} onOpenChange={setShowTimePicker}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 border border-linkedin-border rounded-md hover:border-gray-400 transition-colors">
                  <Clock className="w-4 h-4 text-linkedin-blue" />
                  <span className="text-sm">{formatTime(scheduledDate)}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-0" align="start">
                <TimePicker
                  selectedTime={formatTime(scheduledDate)}
                  onSelect={handleTimeSelect}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Other posts this day */}
        {otherPostsSameDay.length > 0 && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <h4 className="text-sm font-medium text-amber-800 mb-2">
              Other posts this day:
            </h4>
            <ul className="space-y-1">
              {otherPostsSameDay.map((p) => (
                <li
                  key={p.id}
                  className="text-xs text-amber-700 flex items-center gap-2"
                >
                  <span className="font-medium">
                    {formatTime(new Date(p.scheduledFor!))}
                  </span>
                  <span className="truncate">{p.content.slice(0, 40)}...</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>

        <div className="flex items-center gap-3">
          {post.status === 'scheduled' && (
            <Button variant="outline" onClick={handleMoveToDraft}>
              Move to Draft
            </Button>
          )}
          {post.status === 'draft' && (
            <Button
              onClick={handleSchedule}
              className="bg-linkedin-blue hover:bg-linkedin-blue-hover text-white"
              disabled={!content.trim()}
            >
              Schedule Post
            </Button>
          )}
          {post.status === 'scheduled' && (
            <Button
              className="bg-linkedin-blue hover:bg-linkedin-blue-hover text-white"
              disabled={!content.trim()}
            >
              Save Changes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
