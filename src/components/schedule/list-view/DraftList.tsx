import { FileText } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import type { Post } from '@/data/posts';

interface DraftListProps {
  drafts: Post[];
}

export function DraftList({ drafts }: DraftListProps) {
  const { selectedPostId, setSelectedPostId } = usePosts();

  if (drafts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-linkedin-input-bg flex items-center justify-center">
          <FileText className="w-8 h-8 text-linkedin-text-tertiary" />
        </div>
        <h3 className="font-semibold text-linkedin-text-primary mb-1">
          No drafts yet
        </h3>
        <p className="text-sm text-linkedin-text-secondary">
          Start writing and save as draft
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {drafts.map((draft) => {
        const isSelected = selectedPostId === draft.id;
        return (
          <button
            key={draft.id}
            onClick={() => setSelectedPostId(draft.id)}
            className={`w-full text-left bg-white rounded-lg border p-3 transition-all ${
              isSelected
                ? 'border-linkedin-blue shadow-md ring-1 ring-linkedin-blue/20'
                : 'border-linkedin-border hover:border-gray-300 shadow-sm'
            }`}
          >
            <p className="text-sm text-linkedin-text-primary line-clamp-3 leading-snug">
              {draft.content || 'Untitled draft...'}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-linkedin-text-tertiary">Draft</span>
              {draft.hasImage && (
                <span className="text-xs text-linkedin-text-tertiary">• Has image</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
