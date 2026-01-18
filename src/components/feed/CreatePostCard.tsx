import { Image, Video, Calendar, FileText } from 'lucide-react';
import { user } from '@/data/user';

export function CreatePostCard() {
  return (
    <div className="bg-white rounded-lg shadow-linkedin-card p-3">
      {/* Top row - Avatar and Input */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-linkedin-blue flex items-center justify-center flex-shrink-0">
          <span className="text-white text-lg font-semibold">
            {user.name.charAt(0)}
          </span>
        </div>
        <button className="flex-1 h-12 px-4 text-left border border-linkedin-border rounded-full text-linkedin-text-secondary hover:bg-gray-100 transition-colors">
          Start a post
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-around mt-2 -mx-1">
        <button className="flex items-center gap-2 px-3 py-3 rounded-md hover:bg-gray-100 transition-colors">
          <Image className="w-6 h-6 text-linkedin-blue" />
          <span className="text-sm font-semibold text-linkedin-text-secondary">
            Photo
          </span>
        </button>
        <button className="flex items-center gap-2 px-3 py-3 rounded-md hover:bg-gray-100 transition-colors">
          <Video className="w-6 h-6 text-linkedin-green" />
          <span className="text-sm font-semibold text-linkedin-text-secondary">
            Video
          </span>
        </button>
        <button className="flex items-center gap-2 px-3 py-3 rounded-md hover:bg-gray-100 transition-colors">
          <Calendar className="w-6 h-6 text-amber-600" />
          <span className="text-sm font-semibold text-linkedin-text-secondary">
            Event
          </span>
        </button>
        <button className="flex items-center gap-2 px-3 py-3 rounded-md hover:bg-gray-100 transition-colors">
          <FileText className="w-6 h-6 text-rose-500" />
          <span className="text-sm font-semibold text-linkedin-text-secondary">
            Article
          </span>
        </button>
      </div>
    </div>
  );
}
