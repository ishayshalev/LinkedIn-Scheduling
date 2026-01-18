import { usePosts } from '@/hooks/usePosts';

export type TabType = 'scheduled' | 'drafts';

interface PostTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function PostTabs({ activeTab, onTabChange }: PostTabsProps) {
  const { scheduledPosts, drafts } = usePosts();

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'drafts', label: 'Drafts', count: drafts.length },
    { id: 'scheduled', label: 'Scheduled', count: scheduledPosts.length },
  ];

  return (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid #e0e0e0',
        padding: '0 16px',
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: activeTab === tab.id ? 600 : 400,
            color: activeTab === tab.id ? '#0a66c2' : '#666',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === tab.id ? '2px solid #0a66c2' : '2px solid transparent',
            cursor: 'pointer',
            marginBottom: '-1px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {tab.label}
          <span
            style={{
              backgroundColor: activeTab === tab.id ? '#0a66c2' : '#e0e0e0',
              color: activeTab === tab.id ? 'white' : '#666',
              fontSize: '12px',
              padding: '2px 6px',
              borderRadius: '10px',
              fontWeight: 500,
            }}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
