import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { PostTabs, type TabType } from './PostTabs';
import { PostList } from './PostList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useSchedulingDialog } from '../SchedulingDialogContext';

export function SchedulingSidebar() {
  const [activeTab, setActiveTab] = useState<TabType>('drafts');
  const { scheduledPosts, drafts, createDraft } = usePosts();
  const { setCurrentPostId, setDraftContent } = useSchedulingDialog();

  const getPostsForTab = () => {
    switch (activeTab) {
      case 'scheduled':
        return scheduledPosts;
      case 'drafts':
        return drafts;
      default:
        return [];
    }
  };

  const handleNewPost = () => {
    const newDraft = createDraft();
    setCurrentPostId(newDraft.id);
    setDraftContent('');
    setActiveTab('drafts');
  };

  return (
    <div
      style={{
        width: '360px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e0e0e0',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Tabs */}
      <PostTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* New post button */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0' }}>
        <Button
          variant="outline"
          onClick={handleNewPost}
          style={{
            width: '100%',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Plus style={{ width: '16px', height: '16px' }} />
          New Post
        </Button>
      </div>

      {/* Post list */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <PostList posts={getPostsForTab()} activeTab={activeTab} />
      </div>
    </div>
  );
}
