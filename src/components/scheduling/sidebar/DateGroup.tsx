import { type Post } from '@/data/posts';
import { PostListItem } from './PostListItem';
import { formatFullDate } from '@/lib/time-utils';
import { useSchedulingDialog } from '../SchedulingDialogContext';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface DateGroupProps {
  dateKey: string;
  posts: Post[];
  showDragHandles?: boolean;
}

export function DateGroup({ dateKey, posts, showDragHandles = true }: DateGroupProps) {
  const { currentPostId } = useSchedulingDialog();
  const date = new Date(dateKey);

  const { setNodeRef, isOver } = useDroppable({
    id: `date-${dateKey}`,
    data: {
      type: 'date-group',
      date: date,
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        marginBottom: '24px',
        padding: '8px',
        borderRadius: '8px',
        backgroundColor: isOver ? '#f0f7ff' : 'transparent',
        transition: 'background-color 0.2s',
      }}
    >
      {/* Date header */}
      <div
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#333',
          marginBottom: '12px',
          paddingBottom: '8px',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        {formatFullDate(date)}
      </div>

      {/* Posts */}
      <SortableContext
        items={posts.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        {posts.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
            isSelected={post.id === currentPostId}
            showDragHandle={showDragHandles}
          />
        ))}
      </SortableContext>
    </div>
  );
}
