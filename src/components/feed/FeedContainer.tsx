import { ChevronDown } from 'lucide-react';
import { CreatePostCard } from './CreatePostCard';
import { FeedPost } from './FeedPost';
import { feedPosts } from '@/data/posts';

export function FeedContainer() {
  return (
    <div style={{ width: '555px' }}>
      <CreatePostCard />

      {/* Sort bar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0' }}>
        <div style={{ flex: 1, borderTop: '1px solid #e0e0e0' }} />
        <button style={{ display: 'flex', alignItems: 'center', marginLeft: '12px', gap: '4px', fontSize: '12px', color: 'rgba(0,0,0,0.6)', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          Sort by:{' '}
          <span style={{ fontWeight: 600, color: 'rgba(0,0,0,0.9)' }}>Top</span>
          <ChevronDown style={{ width: '16px', height: '16px' }} />
        </button>
      </div>

      {/* Posts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {feedPosts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
