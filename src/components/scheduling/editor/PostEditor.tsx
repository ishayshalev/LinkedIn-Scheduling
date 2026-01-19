import { useEffect } from 'react';
import { useSchedulingDialog } from '../SchedulingDialogContext';
import { usePosts } from '@/hooks/usePosts';
import { PostTextArea } from './PostTextArea';
import { PostEditorActions } from './PostEditorActions';
import { PostPreview } from './PostPreview';
import { Trash2 } from 'lucide-react';

export function PostEditor() {
  const { currentPostId, setCurrentPostId, setDraftContent, mode } = useSchedulingDialog();
  const { scheduledPosts, drafts, postedPosts, deletePost } = usePosts();

  // Find the current post and determine if it's read-only (posted)
  const allPosts = [...scheduledPosts, ...drafts, ...postedPosts];
  const currentPost = currentPostId ? allPosts.find(p => p.id === currentPostId) : null;
  const isPosted = currentPost?.status === 'posted';

  // Load post content when currentPostId changes
  useEffect(() => {
    if (currentPostId) {
      const post = allPosts.find(p => p.id === currentPostId);
      if (post) {
        setDraftContent(post.content);
      }
    }
  }, [currentPostId]);

  const handleDelete = () => {
    if (!currentPostId) return;
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      deletePost(currentPostId);
      setCurrentPostId(null);
      setDraftContent('');
    }
  };

  // Show empty state when in scheduler mode with no post selected
  if (mode === 'scheduler' && !currentPostId) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          backgroundColor: 'white',
          borderLeft: 'none',
          color: '#666',
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>
          Select a post to edit
        </div>
        <div style={{ fontSize: '14px' }}>
          Or create a new post using the button in the sidebar
        </div>
      </div>
    );
  }

  // Show read-only preview for posted posts
  if (isPosted && currentPost) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          overflow: 'auto',
          backgroundColor: 'white',
          borderLeft: 'none',
        }}
      >
        <PostPreview post={currentPost} />
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        overflow: 'auto',
        backgroundColor: 'white',
        borderLeft: 'none',
      }}
    >
      {/* Header with delete button */}
      {currentPostId && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '8px',
          }}
        >
          <button
            onClick={handleDelete}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'transparent',
              border: '1px solid #e0e0e0',
              borderRadius: '16px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#666',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fef2f2';
              e.currentTarget.style.borderColor = '#ef4444';
              e.currentTarget.style.color = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#e0e0e0';
              e.currentTarget.style.color = '#666';
            }}
          >
            <Trash2 style={{ width: '16px', height: '16px' }} />
            Delete
          </button>
        </div>
      )}
      <PostTextArea />
      <PostEditorActions />
    </div>
  );
}
