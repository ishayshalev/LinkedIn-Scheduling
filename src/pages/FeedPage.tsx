import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { FeedContainer } from '@/components/feed/FeedContainer';

export function FeedPage() {
  return (
    <div className="max-w-[1128px] mx-auto px-4 py-6">
      <div className="flex gap-6 justify-center">
        <LeftSidebar />
        <FeedContainer />
        <RightSidebar />
      </div>
    </div>
  );
}
