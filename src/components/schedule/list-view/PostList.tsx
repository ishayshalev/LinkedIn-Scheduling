import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import { groupPostsByDate } from '@/lib/time-utils';
import { usePosts } from '@/hooks/usePosts';
import { DayGroup } from './DayGroup';
import { PostCard } from './PostCard';
import type { Post } from '@/data/posts';

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  const { swapPostTimes, movePostToDate } = usePosts();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const postsWithSchedule = posts.filter(
    (p): p is Post & { scheduledFor: string } => p.scheduledFor !== null
  );
  const groupedPosts = groupPostsByDate(postsWithSchedule);

  // Sort groups by date
  const sortedGroups = Array.from(groupedPosts.entries()).sort(
    ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
  );

  const activePost = posts.find((p) => p.id === activeId);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over?.id as string | null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // If dropping on a day divider
    if (overId.startsWith('day-')) {
      const dateKey = overId.replace('day-', '');
      const newDate = new Date(dateKey);
      movePostToDate(activeId, newDate);
      return;
    }

    // If dropping on another post (swap times)
    if (activeId !== overId) {
      swapPostTimes(activeId, overId);
    }
  };

  if (sortedGroups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-linkedin-input-bg flex items-center justify-center">
          <span className="text-2xl">📅</span>
        </div>
        <h3 className="font-semibold text-linkedin-text-primary mb-1">
          No scheduled posts
        </h3>
        <p className="text-sm text-linkedin-text-secondary">
          Create a new post to get started
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {sortedGroups.map(([dateKey, dayPosts]) => (
        <DayGroup
          key={dateKey}
          dateKey={dateKey}
          posts={dayPosts}
          isOver={overId === `day-${dateKey}`}
        />
      ))}

      <DragOverlay>
        {activePost && (
          <div className="w-[300px]">
            <PostCard post={activePost} isDragging />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
