import { Bookmark } from 'lucide-react';
import { user } from '@/data/user';

export function LeftSidebar() {
  return (
    <aside className="w-[225px] flex-shrink-0">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-linkedin-card overflow-hidden">
        {/* Banner */}
        <div className="h-14 bg-gradient-to-r from-linkedin-blue to-blue-400" />

        {/* Avatar */}
        <div className="px-3 -mt-8">
          <div className="w-16 h-16 rounded-full bg-linkedin-blue border-2 border-white flex items-center justify-center">
            <span className="text-white text-2xl font-semibold">
              {user.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* User Info */}
        <div className="px-3 py-3">
          <h2 className="font-semibold text-linkedin-text-primary hover:underline cursor-pointer">
            {user.name}
          </h2>
          <p className="text-xs text-linkedin-text-secondary mt-0.5 line-clamp-2">
            {user.headline}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-linkedin-border" />

        {/* Stats */}
        <div className="px-3 py-3">
          <button className="w-full text-left hover:bg-gray-100 -mx-3 px-3 py-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-linkedin-text-secondary">
                Profile viewers
              </span>
              <span className="text-xs font-semibold text-linkedin-blue">
                {user.profileViews}
              </span>
            </div>
          </button>
          <button className="w-full text-left hover:bg-gray-100 -mx-3 px-3 py-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-linkedin-text-secondary">
                Connections
              </span>
              <span className="text-xs font-semibold text-linkedin-blue">
                {user.connections}
              </span>
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-linkedin-border" />

        {/* My Items */}
        <button className="w-full px-3 py-3 flex items-center gap-2 hover:bg-gray-100 text-linkedin-text-secondary hover:text-linkedin-text-primary">
          <Bookmark className="w-4 h-4" />
          <span className="text-xs font-semibold">My items</span>
        </button>
      </div>
    </aside>
  );
}
