import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePosts } from '@/hooks/usePosts';
import { ScheduleSidebar } from './ScheduleSidebar';
import { PostEditor } from './editor/PostEditor';

export type ViewMode = 'list' | 'calendar';
export type TabValue = 'drafts' | 'scheduled' | 'posted';

export function ScheduleHub() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeTab, setActiveTab] = useState<TabValue>('scheduled');
  const { createDraft } = usePosts();

  const handleNewPost = () => {
    createDraft();
    setActiveTab('drafts');
  };

  return (
    <div className="h-[calc(100vh-52px)] flex">
      {/* Sidebar */}
      <div className="w-[340px] bg-white border-r border-linkedin-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-linkedin-border">
          <div className="flex items-center justify-between mb-4">
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as TabValue)}
            >
              <TabsList className="bg-linkedin-input-bg h-9">
                <TabsTrigger
                  value="drafts"
                  className="text-xs data-[state=active]:bg-white"
                >
                  Drafts
                </TabsTrigger>
                <TabsTrigger
                  value="scheduled"
                  className="text-xs data-[state=active]:bg-white"
                >
                  Scheduled
                </TabsTrigger>
                <TabsTrigger
                  value="posted"
                  className="text-xs data-[state=active]:bg-white"
                >
                  Posted
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              onClick={handleNewPost}
              size="sm"
              className="bg-linkedin-blue hover:bg-linkedin-blue-hover text-white rounded-full px-4"
            >
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </div>

          {/* View Mode Toggle */}
          {activeTab === 'scheduled' && (
            <div className="flex gap-1 p-1 bg-linkedin-input-bg rounded-md">
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 text-xs py-1.5 px-3 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white shadow-sm text-linkedin-text-primary font-medium'
                    : 'text-linkedin-text-secondary hover:text-linkedin-text-primary'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex-1 text-xs py-1.5 px-3 rounded transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-white shadow-sm text-linkedin-text-primary font-medium'
                    : 'text-linkedin-text-secondary hover:text-linkedin-text-primary'
                }`}
              >
                Calendar View
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Content */}
        <ScheduleSidebar activeTab={activeTab} viewMode={viewMode} />
      </div>

      {/* Editor Panel */}
      <div className="flex-1 bg-linkedin-background overflow-auto">
        <PostEditor />
      </div>
    </div>
  );
}
