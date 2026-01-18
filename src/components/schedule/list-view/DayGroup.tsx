import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { formatFullDate } from '@/lib/time-utils';
import { PostCard } from './PostCard';
import type { Post } from '@/data/posts';

interface DayGroupProps {
  dateKey: string;
  posts: Post[];
  isOver?: boolean;
}

export function DayGroup({ dateKey, posts, isOver }: DayGroupProps) {
  const date = new Date(dateKey);

  const { setNodeRef, isOver: isDroppableOver } = useDroppable({
    id: `day-${dateKey}`,
    data: {
      type: 'day',
      dateKey,
      date,
    },
  });

  const isHighlighted = isOver || isDroppableOver;

  return (
    <div className="mb-4">
      {/* Day divider / drop zone */}
      <div
        ref={setNodeRef}
        className={`flex items-center gap-2 py-2 px-2 -mx-2 mb-2 rounded-md transition-all ${
          isHighlighted
            ? 'bg-linkedin-blue/10 border-2 border-dashed border-linkedin-blue'
            : ''
        }`}
      >
        <div className="h-px flex-1 bg-linkedin-border" />
        <span className="text-xs font-medium text-linkedin-text-secondary whitespace-nowrap">
          {formatFullDate(date)}
        </span>
        <div className="h-px flex-1 bg-linkedin-border" />
      </div>

      {/* Posts */}
      <SortableContext
        items={posts.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
