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
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { TabType } from './PostTabs';

interface PostListProps {
  posts: Post[];
  activeTab: TabType;
}

export function PostList({ posts, activeTab }: PostListProps) {
  const { currentPostId } = useSchedulingDialog();
  const { swapPostTimes, movePostToDate } = usePosts();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if dropped on a date group
    if (overId.startsWith('date-')) {
      const dateStr = overId.replace('date-', '');
      const newDate = new Date(dateStr);
      movePostToDate(activeId, newDate);
      return;
    }

    // Check if dropped on another post
    if (activeId !== overId) {
      swapPostTimes(activeId, overId);
    }
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
      </DndContext>
    );
  }

  // For drafts, show flat list
  return (
    <div style={{ padding: '16px' }}>
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
