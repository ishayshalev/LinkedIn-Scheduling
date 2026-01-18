import { type Post } from '@/data/posts';
import { user } from '@/data/user';
import { formatDate, formatTime } from '@/lib/time-utils';
import { ThumbsUp, MessageCircle, Repeat2, Send, Image, CheckCircle } from 'lucide-react';

interface PostPreviewProps {
  post: Post;
}

export function PostPreview({ post }: PostPreviewProps) {
  const postedDate = post.postedAt ? new Date(post.postedAt) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Posted badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          backgroundColor: '#e8f5e9',
          borderRadius: '8px',
          marginBottom: '16px',
          color: '#2e7d32',
        }}
      >
        <CheckCircle style={{ width: '20px', height: '20px' }} />
        <span style={{ fontWeight: 500 }}>
          Posted {postedDate ? `on ${formatDate(postedDate)} at ${formatTime(postedDate)}` : ''}
        </span>
      </div>

      {/* LinkedIn-style post preview */}
      <div
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '16px',
          backgroundColor: '#fafafa',
          flex: 1,
        }}
      >
        {/* Author header */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{user.name}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>{user.headline}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>
              {postedDate ? formatDate(postedDate) : ''}
            </div>
          </div>
        </div>

        {/* Post content */}
        <div
          style={{
            fontSize: '14px',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            marginBottom: '16px',
          }}
        >
          {post.content}
        </div>

        {/* Image placeholder */}
        {post.hasImage && (
          <div
            style={{
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              padding: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              color: '#666',
            }}
          >
            <Image style={{ width: '24px', height: '24px', marginRight: '8px' }} />
            Image attached
          </div>
        )}

        {/* Engagement stats */}
        {post.engagement && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #e0e0e0',
                fontSize: '12px',
                color: '#666',
              }}
            >
              <span>{post.engagement.likes} likes</span>
              <span>
                {post.engagement.comments} comments • {post.engagement.reposts} reposts
              </span>
            </div>

            {/* Action bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '8px 0',
              }}
            >
              {[
                { icon: ThumbsUp, label: 'Like', count: post.engagement.likes },
                { icon: MessageCircle, label: 'Comment', count: post.engagement.comments },
                { icon: Repeat2, label: 'Repost', count: post.engagement.reposts },
                { icon: Send, label: 'Send' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#666',
                    fontSize: '13px',
                  }}
                >
                  <Icon style={{ width: '18px', height: '18px' }} />
                  {label}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
