import { type Post } from '@/data/posts';
import { useSchedulingDialog } from '../SchedulingDialogContext';
import { formatTime } from '@/lib/time-utils';
import { GripVertical, Image } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PostListItemProps {
  post: Post;
  isSelected: boolean;
  showDragHandle?: boolean;
  showTime?: boolean;
}

export function PostListItem({
  post,
  isSelected,
  showDragHandle = true,
  showTime = true,
}: PostListItemProps) {
  const { setCurrentPostId } = useSchedulingDialog();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: post.id,
    disabled: !showDragHandle,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = () => {
    setCurrentPostId(post.id);
  };

  const contentPreview = post.content.length > 80
    ? post.content.substring(0, 80) + '...'
    : post.content;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        padding: '12px',
        backgroundColor: isSelected ? '#e8f4fd' : 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        border: isSelected ? '1px solid #0a66c2' : '1px solid #e0e0e0',
        marginBottom: '8px',
      }}
      onClick={handleClick}
    >
      {/* Drag handle */}
      {showDragHandle && (
        <div
          {...attributes}
          {...listeners}
          style={{
            cursor: 'grab',
            padding: '4px',
            color: '#999',
            flexShrink: 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical style={{ width: '16px', height: '16px' }} />
        </div>
      )}

      {/* Post content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Time */}
        {showTime && post.scheduledFor && (
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#0a66c2',
              marginBottom: '4px',
            }}
          >
            {formatTime(new Date(post.scheduledFor))}
          </div>
        )}

        {/* Content preview */}
        <div
          style={{
            fontSize: '13px',
            color: '#333',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {contentPreview}
        </div>

        {/* Image indicator */}
        {post.hasImage && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '8px',
              color: '#666',
              fontSize: '12px',
            }}
          >
            <Image style={{ width: '14px', height: '14px' }} />
            Image attached
          </div>
        )}
      </div>
    </div>
  );
}
