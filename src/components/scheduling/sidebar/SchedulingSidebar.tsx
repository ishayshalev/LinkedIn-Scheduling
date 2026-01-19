import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { PostTabs, type TabType } from './PostTabs';
import { PostList } from './PostList';
import { CalendarView } from './CalendarView';
import { type ViewMode } from './ViewToggle';

export function SchedulingSidebar() {
  const [activeTab, setActiveTab] = useState<TabType>('scheduled');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { scheduledPosts, drafts } = usePosts();

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
      {/* Hide scrollbar styles */}
      <style>{`
        .sidebar-scroll::-webkit-scrollbar {
          display: none;
        }
        .sidebar-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Tabs */}
      <PostTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Content */}
      <div className="sidebar-scroll" style={{ flex: 1, overflow: 'auto' }}>
        {activeTab === 'scheduled' && viewMode === 'calendar' ? (
          <CalendarView posts={scheduledPosts} />
        ) : (
          <PostList posts={getPostsForTab()} activeTab={activeTab} />
        )}
      </div>
    </div>
  );
}
