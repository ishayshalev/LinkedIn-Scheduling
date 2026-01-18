import {
  MoreHorizontal,
  X,
  ThumbsUp,
  MessageCircle,
  Repeat2,
  Send,
  Globe,
} from 'lucide-react';
import type { FeedPost as FeedPostType } from '@/data/posts';

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

  return (
    <article className="bg-white rounded-lg shadow-linkedin-card">
      {/* Header */}
      <div className="p-3 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-semibold text-gray-500">
                {post.author.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-linkedin-text-primary hover:underline hover:text-linkedin-blue cursor-pointer leading-tight">
                {post.author.name}
              </h3>
              <p className="text-xs text-linkedin-text-secondary line-clamp-1">
                {post.author.headline}
              </p>
              <p className="text-xs text-linkedin-text-secondary flex items-center gap-1">
                {post.timeAgo} • <Globe className="w-3 h-3" />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreHorizontal className="w-5 h-5 text-linkedin-text-secondary" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-linkedin-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 py-3">
        <p className="text-linkedin-text-primary whitespace-pre-line">
          {post.content}
        </p>
      </div>

      {/* Image placeholder */}
      {post.imageUrl && (
        <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <span className="text-linkedin-text-secondary">Image</span>
        </div>
      )}

      {/* Engagement stats */}
      <div className="px-3 py-2 flex items-center justify-between text-xs text-linkedin-text-secondary">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <span className="w-4 h-4 rounded-full bg-linkedin-blue flex items-center justify-center">
              <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
            </span>
          </div>
          <span className="hover:underline hover:text-linkedin-blue cursor-pointer">
            {formatEngagement(post.engagement.likes)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hover:underline hover:text-linkedin-blue cursor-pointer">
            {post.engagement.comments} comments
          </span>
          <span className="hover:underline hover:text-linkedin-blue cursor-pointer">
            {post.engagement.reposts} reposts
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-3 border-t border-linkedin-border" />

      {/* Action buttons */}
      <div className="px-3 py-1 flex items-center justify-around">
        <button className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors flex-1 justify-center">
          <ThumbsUp className="w-5 h-5 text-linkedin-text-secondary" />
          <span className="text-sm font-semibold text-linkedin-text-secondary">
            Like
          </span>
        </button>
        <button className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors flex-1 justify-center">
          <MessageCircle className="w-5 h-5 text-linkedin-text-secondary" />
          <span className="text-sm font-semibold text-linkedin-text-secondary">
            Comment
          </span>
        </button>
        <button className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors flex-1 justify-center">
          <Repeat2 className="w-5 h-5 text-linkedin-text-secondary" />
          <span className="text-sm font-semibold text-linkedin-text-secondary">
            Repost
          </span>
        </button>
        <button className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 transition-colors flex-1 justify-center">
          <Send className="w-5 h-5 text-linkedin-text-secondary" />
          <span className="text-sm font-semibold text-linkedin-text-secondary">
            Send
          </span>
        </button>
      </div>
    </article>
  );
}
