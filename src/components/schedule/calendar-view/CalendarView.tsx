import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDateKey, formatTime } from '@/lib/time-utils';
import { usePosts } from '@/hooks/usePosts';
import type { Post } from '@/data/posts';

interface CalendarViewProps {
  posts: Post[];
}

export function CalendarView({ posts }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { selectedPostId, setSelectedPostId } = usePosts();

  // Group posts by date
  const postsByDate = new Map<string, Post[]>();
  posts.forEach((post) => {
    if (post.scheduledFor) {
      const key = getDateKey(new Date(post.scheduledFor));
      const existing = postsByDate.get(key) || [];
      postsByDate.set(key, [...existing, post]);
    }
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    // Add empty days for the start of the week
    const startDayOfWeek = firstDay.getDay();
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const selectedDatePosts = selectedDate
    ? postsByDate.get(getDateKey(selectedDate)) || []
    : [];

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-1 hover:bg-linkedin-input-bg rounded transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-linkedin-text-secondary" />
        </button>
        <h3 className="font-semibold text-linkedin-text-primary">
          {currentMonth.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-1 hover:bg-linkedin-input-bg rounded transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-linkedin-text-secondary" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Day headers */}
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-linkedin-text-secondary py-2"
          >
            {day}
          </div>
        ))}

        {/* Days */}
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} />;
          }

          const dateKey = getDateKey(date);
          const hasPosts = postsByDate.has(dateKey);

          return (
            <button
              key={dateKey}
              onClick={() => setSelectedDate(date)}
              className={`relative aspect-square flex flex-col items-center justify-center rounded-md text-sm transition-colors ${
                isSelected(date)
                  ? 'bg-linkedin-blue text-white'
                  : isToday(date)
                  ? 'bg-linkedin-input-bg text-linkedin-text-primary font-medium'
                  : 'hover:bg-linkedin-input-bg text-linkedin-text-primary'
              }`}
            >
              {date.getDate()}
              {hasPosts && (
                <div
                  className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                    isSelected(date) ? 'bg-white' : 'bg-linkedin-blue'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day posts */}
      {selectedDate && (
        <div className="border-t border-linkedin-border pt-4">
          <h4 className="text-sm font-medium text-linkedin-text-primary mb-2">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </h4>

          {selectedDatePosts.length === 0 ? (
            <p className="text-sm text-linkedin-text-secondary">
              No posts scheduled for this day
            </p>
          ) : (
            <div className="space-y-2">
              {selectedDatePosts
                .sort(
                  (a, b) =>
                    new Date(a.scheduledFor!).getTime() -
                    new Date(b.scheduledFor!).getTime()
                )
                .map((post) => (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPostId(post.id)}
                    className={`w-full text-left p-2 rounded-md border transition-colors ${
                      selectedPostId === post.id
                        ? 'border-linkedin-blue bg-linkedin-blue/5'
                        : 'border-linkedin-border hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-linkedin-blue">
                        {formatTime(new Date(post.scheduledFor!))}
                      </span>
                    </div>
                    <p className="text-xs text-linkedin-text-primary line-clamp-2">
                      {post.content}
                    </p>
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
