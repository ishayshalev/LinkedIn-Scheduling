import { useEffect } from 'react';
import { useSchedulingDialog } from '../SchedulingDialogContext';
import { usePosts } from '@/hooks/usePosts';
import { PostTextArea } from './PostTextArea';
import { PostEditorActions } from './PostEditorActions';
import { PostPreview } from './PostPreview';

export function PostEditor() {
  const { currentPostId, setDraftContent, mode } = useSchedulingDialog();
  const { scheduledPosts, drafts, postedPosts } = usePosts();

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
      <PostTextArea />
      <PostEditorActions />
    </div>
  );
}
