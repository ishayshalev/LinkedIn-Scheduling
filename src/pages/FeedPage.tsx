import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { FeedContainer } from '@/components/feed/FeedContainer';

export function FeedPage() {
  return (
    <div style={{ maxWidth: '1128px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
        <LeftSidebar />
        <FeedContainer />
        <RightSidebar />
      </div>
    </div>
  );
}
