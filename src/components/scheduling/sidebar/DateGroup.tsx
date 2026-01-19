import { type Post } from '@/data/posts';
import { PostListItem } from './PostListItem';
import { formatFullDate } from '@/lib/time-utils';
import { useSchedulingDialog } from '../SchedulingDialogContext';
import { usePosts } from '@/hooks/usePosts';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

interface DateGroupProps {
  dateKey: string;
  posts: Post[];
  showDragHandles?: boolean;
}

export function DateGroup({ dateKey, posts, showDragHandles = true }: DateGroupProps) {
  const { currentPostId, setCurrentPostId, setDraftContent } = useSchedulingDialog();
  const { createDraft } = usePosts();
  const date = new Date(dateKey);

  const handleAddNewPost = () => {
    // Schedule for this date at 10:00 AM
    const scheduledDate = new Date(date);
    scheduledDate.setHours(10, 0, 0, 0);

    // Create post directly as scheduled
    const newPost = createDraft(scheduledDate.toISOString());

    // Select the new post for editing
    setCurrentPostId(newPost.id);
    setDraftContent('');
  };

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
        padding: '8px 12px',
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

      {/* Add new post box */}
      <button
        onClick={handleAddNewPost}
        style={{
          width: '100%',
          padding: '12px 16px',
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
    </div>
  );
}
