import { useState } from 'react';
import { type Post } from '@/data/posts';
import { DateGroup } from './DateGroup';
import { PostListItem } from './PostListItem';
import { groupPostsByDate } from '@/lib/time-utils';
import { useSchedulingDialog } from '../SchedulingDialogContext';
import { usePosts } from '@/hooks/usePosts';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { TabType } from './PostTabs';
import { Plus } from 'lucide-react';

interface PostListProps {
  posts: Post[];
  activeTab: TabType;
}

export function PostList({ posts, activeTab }: PostListProps) {
  const { currentPostId, setCurrentPostId, setDraftContent } = useSchedulingDialog();
  const { swapPostTimes, movePostToDate, createDraft, scheduledPosts } = usePosts();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleAddNewDraft = () => {
    const newDraft = createDraft();
    setCurrentPostId(newDraft.id);
    setDraftContent('');
  };

  const activePost = activeId ? scheduledPosts.find(p => p.id === activeId) : null;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over) return;

    const draggedId = active.id as string;
    const overId = over.id as string;

    // Don't do anything if dropped on itself
    if (draggedId === overId) return;

    // Check if dropped on a date group
    if (overId.startsWith('date-')) {
      const dateStr = overId.replace('date-', '');
      const newDate = new Date(dateStr);
      movePostToDate(draggedId, newDate);
      return;
    }

    // Dropped on another post - swap their times
    swapPostTimes(draggedId, overId);
  };

  if (posts.length === 0) {
    return (
      <div
        style={{
          padding: '32px 16px',
          textAlign: 'center',
          color: '#666',
          fontSize: '14px',
        }}
      >
        {activeTab === 'scheduled' && 'No scheduled posts'}
        {activeTab === 'drafts' && 'No drafts'}
      </div>
    );
  }

  // For scheduled posts, group by date
  if (activeTab === 'scheduled') {
    const grouped = groupPostsByDate(posts.filter(p => p.scheduledFor) as (Post & { scheduledFor: string })[]);
    const sortedDates = Array.from(grouped.keys()).sort();

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div style={{ padding: 0 }}>
          {sortedDates.map((dateKey) => (
            <DateGroup
              key={dateKey}
              dateKey={dateKey}
              posts={grouped.get(dateKey) || []}
              showDragHandles={true}
            />
          ))}
        </div>
        <DragOverlay>
          {activePost ? (
            <div
              style={{
                padding: '12px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '2px solid #0a66c2',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                maxWidth: '300px',
                cursor: 'grabbing',
              }}
            >
              <div style={{ fontSize: '13px', color: '#333', lineHeight: 1.4 }}>
                {activePost.content.length > 80
                  ? activePost.content.substring(0, 80) + '...'
                  : activePost.content || 'Start a post...'}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  }

  // For drafts, show flat list
  return (
    <div style={{ padding: '16px' }}>
      {/* Add new draft box - at the top */}
      <button
        onClick={handleAddNewDraft}
        style={{
          width: '100%',
          padding: '16px',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#666',
          fontSize: '13px',
          transition: 'all 0.2s',
          marginBottom: '12px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#0a66c2';
          e.currentTarget.style.color = '#0a66c2';
          e.currentTarget.style.backgroundColor = '#f0f7ff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#ccc';
          e.currentTarget.style.color = '#666';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Plus style={{ width: '16px', height: '16px' }} />
        Add new post
      </button>

      {posts.map((post) => (
        <PostListItem
          key={post.id}
          post={post}
          isSelected={post.id === currentPostId}
          showDragHandle={false}
          showTime={false}
        />
      ))}
    </div>
  );
}
