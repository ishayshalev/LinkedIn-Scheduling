import { ThumbsUp, MessageCircle, Repeat2, Send, Globe } from 'lucide-react';
import { user } from '@/data/user';
import { formatFullDate, formatTime } from '@/lib/time-utils';
import type { Post } from '@/data/posts';

interface PostPreviewProps {
  post: Post;
}

export function PostPreview({ post }: PostPreviewProps) {
  const scheduledDate = post.scheduledFor ? new Date(post.scheduledFor) : null;

  return (
    <div className="bg-white rounded-lg shadow-linkedin-card">
      <div className="p-4 pb-0">
        <div className="text-xs text-linkedin-text-secondary mb-3">
          LinkedIn Post Preview
        </div>

        {/* Header */}
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full bg-linkedin-blue flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg font-semibold">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-linkedin-text-primary leading-tight">
              {user.name}
            </h3>
            <p className="text-xs text-linkedin-text-secondary line-clamp-1">
              {user.headline}
            </p>
            <p className="text-xs text-linkedin-text-secondary flex items-center gap-1">
              {scheduledDate ? (
                <>
                  Scheduled for {formatFullDate(scheduledDate)} at{' '}
                  {formatTime(scheduledDate)}
                </>
              ) : post.status === 'posted' && post.postedAt ? (
                <>
                  Posted {formatFullDate(new Date(post.postedAt))} •{' '}
                  <Globe className="w-3 h-3" />
                </>
              ) : (
                'Draft'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        {post.content ? (
          <p className="text-linkedin-text-primary whitespace-pre-line">
            {post.content}
          </p>
        ) : (
          <p className="text-linkedin-text-tertiary italic">
            Your post content will appear here...
          </p>
        )}
      </div>

      {/* Image placeholder */}
      {post.hasImage && (
        <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <span className="text-linkedin-text-secondary">Image</span>
        </div>
      )}

      {/* Engagement preview (static) */}
      {post.status === 'posted' && post.engagement && (
        <div className="px-4 py-2 flex items-center justify-between text-xs text-linkedin-text-secondary">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <span className="w-4 h-4 rounded-full bg-linkedin-blue flex items-center justify-center">
                <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
              </span>
            </div>
            <span>{post.engagement.likes}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{post.engagement.comments} comments</span>
            <span>{post.engagement.reposts} reposts</span>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="mx-4 border-t border-linkedin-border" />

      {/* Action buttons (preview only - disabled) */}
      <div className="px-4 py-2 flex items-center justify-around opacity-50">
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 rounded-md flex-1 justify-center cursor-not-allowed"
        >
          <ThumbsUp className="w-5 h-5 text-linkedin-text-secondary" />
          <span className="text-sm font-semibold text-linkedin-text-secondary">
            Like
          </span>
        </button>
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 rounded-md flex-1 justify-center cursor-not-allowed"
        >
          <MessageCircle className="w-5 h-5 text-linkedin-text-secondary" />
          <span className="text-sm font-semibold text-linkedin-text-secondary">
            Comment
          </span>
        </button>
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 rounded-md flex-1 justify-center cursor-not-allowed"
        >
          <Repeat2 className="w-5 h-5 text-linkedin-text-secondary" />
          <span className="text-sm font-semibold text-linkedin-text-secondary">
            Repost
          </span>
        </button>
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 rounded-md flex-1 justify-center cursor-not-allowed"
        >
          <Send className="w-5 h-5 text-linkedin-text-secondary" />
          <span className="text-sm font-semibold text-linkedin-text-secondary">
            Send
          </span>
        </button>
      </div>
    </div>
  );
}
