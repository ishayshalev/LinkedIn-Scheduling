import { type Post } from '@/data/posts';
import { useSchedulingDialog } from '../SchedulingDialogContext';
import { formatTime } from '@/lib/time-utils';
import { Image, ArrowRightLeft } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PostListItemProps {
  post: Post;
  isSelected: boolean;
  showDragHandle?: boolean;
  showTime?: boolean;
  isOver?: boolean;
}

export function PostListItem({
  post,
  isSelected,
  showDragHandle = true,
  showTime = true,
  isOver = false,
}: PostListItemProps) {
  const { setCurrentPostId } = useSchedulingDialog();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver: isSortableOver,
  } = useSortable({
    id: post.id,
    disabled: !showDragHandle,
  });

  // Use either the prop isOver or the sortable isOver
  const showSwapOverlay = (isOver || isSortableOver) && !isDragging;

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  };

  const handleClick = () => {
    // Only handle click if not dragging
    if (!isDragging) {
      setCurrentPostId(post.id);
    }
  };

  const contentPreview = post.content.length > 80
    ? post.content.substring(0, 80) + '...'
    : post.content || 'Start a post...';

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: 'relative',
        padding: '12px',
        backgroundColor: showSwapOverlay ? '#fff3cd' : (isSelected ? '#e8f4fd' : '#ffffff'),
        borderRadius: '8px',
        cursor: showDragHandle ? 'grab' : 'pointer',
        border: showSwapOverlay ? '2px solid #ffc107' : (isSelected ? '1px solid #0a66c2' : '1px solid #e0e0e0'),
        marginBottom: '8px',
      }}
      onClick={handleClick}
      {...(showDragHandle ? { ...attributes, ...listeners } : {})}
    >
      {/* Swap times overlay */}
      {showSwapOverlay && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 193, 7, 0.2)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffc107',
              color: '#000',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <ArrowRightLeft style={{ width: '14px', height: '14px' }} />
            Swap times?
          </div>
        </div>
      )}
      {/* Drag indicator dots at top-left */}
      {showDragHandle && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '12px',
            display: 'flex',
            gap: '2px',
          }}
        >
          <div style={{ width: '3px', height: '3px', backgroundColor: '#ccc', borderRadius: '50%' }} />
          <div style={{ width: '3px', height: '3px', backgroundColor: '#ccc', borderRadius: '50%' }} />
        </div>
      )}

      {/* Content preview */}
      <div
        style={{
          fontSize: '13px',
          color: post.content ? '#333' : '#999',
          lineHeight: 1.4,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          paddingTop: showDragHandle ? '8px' : 0,
        }}
      >
        {contentPreview}
      </div>

      {/* Time display for scheduled posts - below content */}
      {showTime && post.scheduledFor && (
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#0a66c2',
            marginTop: '8px',
          }}
        >
          {formatTime(new Date(post.scheduledFor))}
        </div>
      )}

      {/* Media preview */}
      {post.hasImage && post.imageUrl && (
        <div
          style={{
            marginTop: '8px',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <img
            src={post.imageUrl}
            alt="Post media"
            style={{
              width: '100%',
              maxHeight: '80px',
              objectFit: 'cover',
              borderRadius: '4px',
            }}
          />
        </div>
      )}

      {/* Image indicator (if has image but no URL) */}
      {post.hasImage && !post.imageUrl && (
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
  );
}
