import { Plus } from 'lucide-react';
import type { FeedPost as FeedPostType } from '@/data/posts';
import { user } from '@/data/user';

// LinkedIn's actual SVG icons from their HTML
const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '16px', height: '16px' }}>
    <path d="M3 9.5A1.5 1.5 0 1 1 4.5 8 1.5 1.5 0 0 1 3 9.5M11.5 8A1.5 1.5 0 1 0 13 6.5 1.5 1.5 0 0 0 11.5 8m-5 0A1.5 1.5 0 1 0 8 6.5 1.5 1.5 0 0 0 6.5 8" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '16px', height: '16px' }}>
    <path d="M14 3.41 9.41 8 14 12.59 12.59 14 8 9.41 3.41 14 2 12.59 6.59 8 2 3.41 3.41 2 8 6.59 12.59 2z" />
  </svg>
);

const LikeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '16px', height: '16px' }}>
    <path d="m12.91 7-2.25-2.57a8.2 8.2 0 0 1-1.5-2.55L9 1.37A2.08 2.08 0 0 0 7 0a2.08 2.08 0 0 0-2.06 2.08v1.17a5.8 5.8 0 0 0 .31 1.89l.28.86H2.38A1.47 1.47 0 0 0 1 7.47a1.45 1.45 0 0 0 .64 1.21 1.48 1.48 0 0 0-.37 2.06 1.54 1.54 0 0 0 .62.51h.05a1.6 1.6 0 0 0-.19.71A1.47 1.47 0 0 0 3 13.42v.1A1.46 1.46 0 0 0 4.4 15h4.83a5.6 5.6 0 0 0 2.48-.58l1-.42H14V7zM12 12.11l-1.19.52a3.6 3.6 0 0 1-1.58.37H5.1a.55.55 0 0 1-.53-.4l-.14-.48-.49-.21a.56.56 0 0 1-.34-.6l.09-.56-.42-.42a.56.56 0 0 1-.09-.68L3.55 9l-.4-.61A.28.28 0 0 1 3.3 8h5L7.14 4.51a4.2 4.2 0 0 1-.2-1.26V2.08A.09.09 0 0 1 7 2a.1.1 0 0 1 .08 0l.18.51a10 10 0 0 0 1.9 3.24l2.84 3z" />
  </svg>
);

const CommentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '16px', height: '16px' }}>
    <path d="M5 8h5v1H5zm11-.5v.08a6 6 0 0 1-2.75 5L8 16v-3H5.5A5.51 5.51 0 0 1 0 7.5 5.62 5.62 0 0 1 5.74 2h4.76A5.5 5.5 0 0 1 16 7.5m-2 0A3.5 3.5 0 0 0 10.5 4H5.74A3.62 3.62 0 0 0 2 7.5 3.53 3.53 0 0 0 5.5 11H10v1.33l2.17-1.39A4 4 0 0 0 14 7.58zM5 7h6V6H5z" />
  </svg>
);

const RepostIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '16px', height: '16px' }}>
    <path d="M4 10H2V5c0-1.66 1.34-3 3-3h3.85L7.42 0h2.44L12 3 9.86 6H7.42l1.43-2H5c-.55 0-1 .45-1 1zm8-4v5c0 .55-.45 1-1 1H7.15l1.43-2H6.14L4 13l2.14 3h2.44l-1.43-2H11c1.66 0 3-1.34 3-3V6z" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '16px', height: '16px' }}>
    <path d="M14 2 0 6.67l5 2.64 5.67-3.98L6.7 11l2.63 5z" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '16px', height: '16px' }}>
    <path d="M8 1a7 7 0 1 0 7 7 7 7 0 0 0-7-7M3 8a5 5 0 0 1 1-3l.55.55A1.5 1.5 0 0 1 5 6.62v1.07a.75.75 0 0 0 .22.53l.56.56a.75.75 0 0 0 .53.22H7v.69a.75.75 0 0 0 .22.53l.56.56a.75.75 0 0 1 .22.53V13a5 5 0 0 1-5-5m6.24 4.83 2-2.46a.75.75 0 0 0 .09-.8l-.58-1.16A.76.76 0 0 0 10 8H7v-.19a.51.51 0 0 1 .28-.45l.38-.19a.74.74 0 0 1 .68 0L9 7.5l.38-.7a1 1 0 0 0 .12-.48v-.85a.78.78 0 0 1 .21-.53l1.07-1.09a5 5 0 0 1-1.54 9z" />
  </svg>
);

const CaretIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '16px', height: '16px' }}>
    <path d="M8 11 3 6h10Z" />
  </svg>
);

const LikeFilledIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '12px', height: '12px' }}>
    <path d="M12.91 7l-2.25-2.57a8.2 8.2 0 01-1.5-2.55L9 1.37A2.08 2.08 0 007 0a2.08 2.08 0 00-2.06 2.08v1.17a5.8 5.8 0 00.31 1.89l.28.86H2.38A1.47 1.47 0 001 7.47a1.45 1.45 0 00.64 1.21 1.48 1.48 0 00-.37 2.06c.15.22.35.4.57.54a1.6 1.6 0 00-.14.67A1.47 1.47 0 003 13.42v.1A1.46 1.46 0 004.4 15h4.83a5.6 5.6 0 002.48-.58l1-.42H14V7z" />
  </svg>
);

const LinkedInBadge = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#0a66c2" style={{ width: '16px', height: '16px' }}>
    <path d="M15 2v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1M5 6H3v7h2zm.25-2A1.25 1.25 0 1 0 4 5.25 1.25 1.25 0 0 0 5.25 4M13 9.29c0-2.2-.73-3.49-2.86-3.49A2.71 2.71 0 0 0 7.89 7V6H6v7h2V9.73a1.73 1.73 0 0 1 1.54-1.92h.12C10.82 7.8 11 8.94 11 9.73V13h2z" />
  </svg>
);

interface FeedPostProps {
  post: FeedPostType;
}

export function FeedPost({ post }: FeedPostProps) {
  const formatEngagement = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return num.toString();
  };

  const isHebrew = (text: string): boolean => {
    return /[\u0590-\u05FF]/.test(text);
  };

  const contentIsRTL = isHebrew(post.content);

  return (
    <article style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
      {/* Celebrated by header */}
      {post.celebratedBy && (
        <div style={{ padding: '12px 16px 0 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
          <span style={{ fontWeight: 600, color: 'rgba(0,0,0,0.9)' }}>{post.celebratedBy}</span>
          <span>celebrates this</span>
        </div>
      )}

      {/* Header */}
      <div style={{ padding: '12px 16px 0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          {/* Avatar */}
          <img
            src={post.author.avatar}
            alt={post.author.name}
            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />

          {/* Author info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.9)', lineHeight: '20px', cursor: 'pointer' }}>
                {post.author.name}
              </span>
              {post.author.isVerified && <LinkedInBadge />}
              {post.author.connectionDegree && (
                <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.6)' }}>• {post.author.connectionDegree}</span>
              )}
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', lineHeight: '16px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {post.author.headline}
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', lineHeight: '16px', display: 'flex', alignItems: 'center', gap: '4px', margin: 0 }}>
              {post.timeAgo} • <GlobeIcon />
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0px', flexShrink: 0 }}>
            {post.actionButton === 'follow' && (
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', color: '#0a66c2', fontWeight: 600, fontSize: '14px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                <Plus style={{ width: '16px', height: '16px' }} strokeWidth={2.5} />
                Follow
              </button>
            )}
            <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'rgba(0,0,0,0.6)' }}>
              <MoreIcon />
            </button>
            <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'rgba(0,0,0,0.6)' }}>
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '12px 16px' }}>
        <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.9)', whiteSpace: 'pre-line', lineHeight: '20px', margin: 0, direction: contentIsRTL ? 'rtl' : 'ltr', textAlign: contentIsRTL ? 'right' : 'left' }}>
          {post.content}
          {post.content.length > 200 && (
            <button style={{ color: 'rgba(0,0,0,0.6)', fontWeight: 600, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', padding: 0 }}>...more</button>
          )}
        </p>
        {post.showTranslation && (
          <button style={{ marginTop: '8px', fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.6)', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', padding: 0 }}>
            Show translation
          </button>
        )}
      </div>

      {/* Image */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post image"
          style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
        />
      )}

      {/* Engagement stats */}
      <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ display: 'flex' }}>
            <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#0a66c2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid white', zIndex: 3, position: 'relative' }}>
              <LikeFilledIcon />
            </span>
            <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#df704d', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid white', zIndex: 2, position: 'relative', marginLeft: '-4px' }}>
              <span style={{ fontSize: '10px', color: 'white' }}>❤</span>
            </span>
            <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#6dae4f', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid white', zIndex: 1, position: 'relative', marginLeft: '-4px' }}>
              <span style={{ fontSize: '10px', color: 'white' }}>👏</span>
            </span>
          </div>
          <span style={{ cursor: 'pointer', marginLeft: '4px' }}>
            {formatEngagement(post.engagement.likes)}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {post.engagement.comments > 0 && (
            <span style={{ cursor: 'pointer' }}>
              {post.engagement.comments} comments
            </span>
          )}
          {post.engagement.reposts > 0 && (
            <span style={{ cursor: 'pointer' }}>
              {post.engagement.reposts} repost{post.engagement.reposts !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div style={{ margin: '0 12px', borderTop: '1px solid #e0e0e0' }} />

      {/* Action buttons */}
      <div style={{ padding: '4px 12px', display: 'flex', alignItems: 'center' }}>
        {/* User avatar with dropdown */}
        <button style={{ padding: '8px 4px 8px 8px', display: 'flex', alignItems: 'center', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <CaretIcon />
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 8px', borderRadius: '4px', flex: 1, justifyContent: 'center', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'rgba(0,0,0,0.6)' }}>
          <LikeIcon />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Like</span>
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 8px', borderRadius: '4px', flex: 1, justifyContent: 'center', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'rgba(0,0,0,0.6)' }}>
          <CommentIcon />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Comment</span>
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 8px', borderRadius: '4px', flex: 1, justifyContent: 'center', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'rgba(0,0,0,0.6)' }}>
          <RepostIcon />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Repost</span>
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 8px', borderRadius: '4px', flex: 1, justifyContent: 'center', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'rgba(0,0,0,0.6)' }}>
          <SendIcon />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Send</span>
        </button>
      </div>
    </article>
  );
}
