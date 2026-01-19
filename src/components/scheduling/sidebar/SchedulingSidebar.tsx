import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { PostTabs, type TabType } from './PostTabs';
import { PostList } from './PostList';
import { CalendarView } from './CalendarView';
import { ViewToggle, type ViewMode } from './ViewToggle';

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
      <PostTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <div className="sidebar-scroll" style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* View toggle header - only for scheduled tab */}
        {activeTab === 'scheduled' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {viewMode === 'list' ? 'Upcoming' : 'Next 2 weeks'}
            </span>
            <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>
        )}

        {/* List or Calendar view */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {activeTab === 'scheduled' && viewMode === 'calendar' ? (
            <CalendarView posts={scheduledPosts} />
          ) : (
            <PostList posts={getPostsForTab()} activeTab={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
}
