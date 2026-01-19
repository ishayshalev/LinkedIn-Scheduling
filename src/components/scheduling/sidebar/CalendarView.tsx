import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Post } from '@/data/posts';
import { PostListItem } from './PostListItem';
import { useSchedulingDialog } from '../SchedulingDialogContext';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  parseISO,
} from 'date-fns';

interface CalendarViewProps {
  posts: Post[];
}

export function CalendarView({ posts }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { currentPostId } = useSchedulingDialog();

  // Get posts grouped by date
  const postsByDate = useMemo(() => {
    const map = new Map<string, Post[]>();
    posts.forEach((post) => {
      if (post.scheduledFor) {
        const dateKey = format(parseISO(post.scheduledFor), 'yyyy-MM-dd');
        const existing = map.get(dateKey) || [];
        map.set(dateKey, [...existing, post]);
      }
    });
    return map;
  }, [posts]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonth]);

  // Get posts for selected date
  const selectedDatePosts = useMemo(() => {
    if (!selectedDate) return [];
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return postsByDate.get(dateKey) || [];
  }, [selectedDate, postsByDate]);

  const getPostCountForDate = (date: Date): number => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return postsByDate.get(dateKey)?.length || 0;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Calendar Header */}
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f3f3';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#666';
            }}
          >
            <ChevronLeft style={{ width: '18px', height: '18px' }} />
          </button>

          <h3
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#191919',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            {format(currentMonth, 'MMMM yyyy')}
          </h3>

          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f3f3';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#666';
            }}
          >
            <ChevronRight style={{ width: '18px', height: '18px' }} />
          </button>
        </div>

        {/* Week day headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '2px',
            marginBottom: '8px',
          }}
        >
          {weekDays.map((day) => (
            <div
              key={day}
              style={{
                textAlign: 'center',
                fontSize: '11px',
                fontWeight: 600,
                color: '#666',
                padding: '4px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '2px',
          }}
        >
          {calendarDays.map((day, index) => {
            const postCount = getPostCountForDate(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isTodayDate = isToday(day);

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.15s ease',
                  backgroundColor: isSelected
                    ? '#0a66c2'
                    : isTodayDate
                    ? '#f0f7ff'
                    : 'transparent',
                  color: isSelected
                    ? '#fff'
                    : !isCurrentMonth
                    ? '#ccc'
                    : isTodayDate
                    ? '#0a66c2'
                    : '#191919',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#f3f3f3';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = isTodayDate
                      ? '#f0f7ff'
                      : 'transparent';
                  }
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: isTodayDate || isSelected ? 600 : 400,
                    lineHeight: 1,
                  }}
                >
                  {format(day, 'd')}
                </span>

                {/* Post indicators */}
                {postCount > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '2px',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {Array.from({ length: Math.min(postCount, 3) }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: isSelected
                            ? 'rgba(255,255,255,0.8)'
                            : '#0a66c2',
                        }}
                      />
                    ))}
                    {postCount > 3 && (
                      <span
                        style={{
                          fontSize: '8px',
                          fontWeight: 600,
                          color: isSelected ? 'rgba(255,255,255,0.8)' : '#0a66c2',
                        }}
                      >
                        +{postCount - 3}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Posts */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {selectedDate && (
          <div style={{ padding: '12px 16px' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#666',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {isToday(selectedDate)
                ? 'Today'
                : format(selectedDate, 'EEEE, MMM d')}
              {selectedDatePosts.length > 0 && (
                <span
                  style={{
                    marginLeft: '8px',
                    backgroundColor: '#0a66c2',
                    color: '#fff',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    fontWeight: 500,
                    textTransform: 'none',
                    letterSpacing: 'normal',
                  }}
                >
                  {selectedDatePosts.length} post{selectedDatePosts.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {selectedDatePosts.length === 0 ? (
              <div
                style={{
                  padding: '24px 16px',
                  textAlign: 'center',
                  color: '#999',
                  fontSize: '13px',
                  backgroundColor: '#fafafa',
                  borderRadius: '8px',
                  border: '1px dashed #e0e0e0',
                }}
              >
                No posts scheduled
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedDatePosts.map((post) => (
                  <PostListItem
                    key={post.id}
                    post={post}
                    isSelected={post.id === currentPostId}
                    showDragHandle={false}
                    showTime={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
