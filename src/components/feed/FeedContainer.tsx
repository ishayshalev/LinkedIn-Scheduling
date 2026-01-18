import { CreatePostCard } from './CreatePostCard';
import { FeedPost } from './FeedPost';
import { feedPosts } from '@/data/posts';

export function FeedContainer() {
  return (
    <div className="w-[550px] space-y-2">
      <CreatePostCard />

      {/* Sort bar */}
      <div className="flex items-center gap-2 py-2">
        <div className="flex-1 border-t border-linkedin-border" />
        <span className="text-xs text-linkedin-text-secondary">
          Sort by:{' '}
          <button className="font-semibold text-linkedin-text-primary hover:underline">
            Top ▼
          </button>
        </span>
      </div>

      {/* Posts */}
      {feedPosts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  );
}
