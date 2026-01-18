import { ScrollArea } from '@/components/ui/scroll-area';
import { usePosts } from '@/hooks/usePosts';
import { PostList } from './list-view/PostList';
import { CalendarView } from './calendar-view/CalendarView';
import { DraftList } from './list-view/DraftList';
import { PostedList } from './list-view/PostedList';
import type { TabValue, ViewMode } from './ScheduleHub';

interface ScheduleSidebarProps {
  activeTab: TabValue;
  viewMode: ViewMode;
}

export function ScheduleSidebar({ activeTab, viewMode }: ScheduleSidebarProps) {
  const { scheduledPosts, drafts, postedPosts } = usePosts();

  return (
    <ScrollArea className="flex-1">
      <div className="p-3">
        {activeTab === 'drafts' && <DraftList drafts={drafts} />}

        {activeTab === 'scheduled' && (
          <>
            {viewMode === 'list' && <PostList posts={scheduledPosts} />}
            {viewMode === 'calendar' && (
              <CalendarView posts={scheduledPosts} />
            )}
          </>
        )}

        {activeTab === 'posted' && <PostedList posts={postedPosts} />}
      </div>
    </ScrollArea>
  );
}
