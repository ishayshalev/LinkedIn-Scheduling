import { useState, useMemo } from 'react';
import { type Post } from '@/data/posts';
import { PostListItem } from './PostListItem';
import { useSchedulingDialog } from '../SchedulingDialogContext';
import {
  format,
  isSameDay,
  isToday,
  addDays,
  parseISO,
} from 'date-fns';

interface CalendarViewProps {
  posts: Post[];
}

export function CalendarView({ posts }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { currentPostId } = useSchedulingDialog();

  // Generate next 14 days starting from today
  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 14 }, (_, i) => addDays(today, i));
  }, []);

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

  // Get posts for selected date
  const selectedDatePosts = useMemo(() => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return postsByDate.get(dateKey) || [];
  }, [selectedDate, postsByDate]);

  const getPostCountForDate = (date: Date): number => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return postsByDate.get(dateKey)?.length || 0;
  };

  // Split into 2 weeks
  const week1 = days.slice(0, 7);
  const week2 = days.slice(7, 14);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 2-Week Strip */}
      <div
        style={{
          padding: '12px 12px 8px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        {/* Week 1 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
            marginBottom: '4px',
          }}
        >
          {week1.map((day, index) => {
            const postCount = getPostCountForDate(day);
            const isSelected = isSameDay(day, selectedDate);
            const isTodayDate = isToday(day);

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '3px',
                  padding: '6px 2px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backgroundColor: isSelected
                    ? '#0a66c2'
                    : isTodayDate
                    ? '#f0f7ff'
                    : 'transparent',
                  minHeight: '52px',
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
                {/* Day name */}
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    color: isSelected
                      ? 'rgba(255,255,255,0.7)'
                      : '#999',
                  }}
                >
                  {format(day, 'EEE')}
                </span>

                {/* Day number */}
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isTodayDate || isSelected ? 600 : 500,
                    color: isSelected
                      ? '#fff'
                      : isTodayDate
                      ? '#0a66c2'
                      : '#191919',
                    lineHeight: 1,
                  }}
                >
                  {format(day, 'd')}
                </span>

                {/* Post indicators */}
                <div
                  style={{
                    display: 'flex',
                    gap: '2px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '6px',
                  }}
                >
                  {postCount > 0 && (
                    <>
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
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Week 2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
          }}
        >
          {week2.map((day, index) => {
            const postCount = getPostCountForDate(day);
            const isSelected = isSameDay(day, selectedDate);

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '3px',
                  padding: '6px 2px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backgroundColor: isSelected ? '#0a66c2' : 'transparent',
                  minHeight: '52px',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#f3f3f3';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {/* Day name */}
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    color: isSelected
                      ? 'rgba(255,255,255,0.7)'
                      : '#999',
                  }}
                >
                  {format(day, 'EEE')}
                </span>

                {/* Day number */}
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isSelected ? 600 : 500,
                    color: isSelected ? '#fff' : '#191919',
                    lineHeight: 1,
                  }}
                >
                  {format(day, 'd')}
                </span>

                {/* Post indicators */}
                <div
                  style={{
                    display: 'flex',
                    gap: '2px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '6px',
                  }}
                >
                  {postCount > 0 && (
                    <>
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
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Posts */}
      <div style={{ flex: 1, overflow: 'auto' }}>
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
      </div>
    </div>
  );
}
