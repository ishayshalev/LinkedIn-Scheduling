import { CheckCircle, ThumbsUp, MessageCircle, Repeat2 } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import type { Post } from '@/data/posts';

interface PostedListProps {
  posts: Post[];
}

export function PostedList({ posts }: PostedListProps) {
  const { selectedPostId, setSelectedPostId } = usePosts();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-linkedin-input-bg flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-linkedin-text-tertiary" />
        </div>
        <h3 className="font-semibold text-linkedin-text-primary mb-1">
          No posted content yet
        </h3>
        <p className="text-sm text-linkedin-text-secondary">
          Your published posts will appear here
        </p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-2">
      {posts.map((post) => {
        const isSelected = selectedPostId === post.id;
        return (
          <button
            key={post.id}
            onClick={() => setSelectedPostId(post.id)}
            className={`w-full text-left bg-white rounded-lg border p-3 transition-all ${
              isSelected
                ? 'border-linkedin-blue shadow-md ring-1 ring-linkedin-blue/20'
                : 'border-linkedin-border hover:border-gray-300 shadow-sm'
            }`}
          >
            <p className="text-sm text-linkedin-text-primary line-clamp-2 leading-snug">
              {post.content}
            </p>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-linkedin-green flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Posted {post.postedAt ? formatDate(post.postedAt) : ''}
              </span>
            </div>

            {post.engagement && (
              <div className="mt-2 flex items-center gap-4 text-xs text-linkedin-text-secondary">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" />
                  {post.engagement.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {post.engagement.comments}
                </span>
                <span className="flex items-center gap-1">
                  <Repeat2 className="w-3 h-3" />
                  {post.engagement.reposts}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
