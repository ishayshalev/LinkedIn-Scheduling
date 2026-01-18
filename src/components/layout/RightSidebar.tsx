import { Info, Plus } from 'lucide-react';

const newsItems = [
  { title: 'AI reshapes design industry', readers: '12,453' },
  { title: 'Tech layoffs slow in Q4', readers: '8,234' },
  { title: 'Remote work trends 2024', readers: '15,678' },
  { title: 'Startup funding rises', readers: '6,543' },
  { title: 'New React 19 features', readers: '21,345' },
];

const suggestions = [
  {
    name: 'Figma',
    headline: 'Company • Design',
    followers: '1.2M',
  },
  {
    name: 'Airbnb Design',
    headline: 'Company • Design',
    followers: '892K',
  },
  {
    name: 'Sarah Chen',
    headline: 'Product Design Lead at Stripe',
  },
];

export function RightSidebar() {
  return (
    <aside className="w-[300px] flex-shrink-0 space-y-2">
      {/* LinkedIn News */}
      <div className="bg-white rounded-lg shadow-linkedin-card">
        <div className="px-3 py-3 flex items-center justify-between">
          <h3 className="font-semibold text-linkedin-text-primary">
            LinkedIn News
          </h3>
          <Info className="w-4 h-4 text-linkedin-text-secondary" />
        </div>

        <ul className="px-3 pb-3">
          {newsItems.map((item, index) => (
            <li key={index}>
              <button className="w-full text-left py-1.5 hover:bg-gray-100 -mx-3 px-3">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-linkedin-text-secondary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-linkedin-text-primary leading-tight">
                      {item.title}
                    </p>
                    <p className="text-xs text-linkedin-text-secondary">
                      {item.readers} readers
                    </p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add to your feed */}
      <div className="bg-white rounded-lg shadow-linkedin-card">
        <div className="px-3 py-3">
          <h3 className="font-semibold text-linkedin-text-primary">
            Add to your feed
          </h3>
        </div>

        <ul className="px-3 pb-3">
          {suggestions.map((item, index) => (
            <li key={index} className="py-2">
              <div className="flex items-start gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-semibold text-gray-500">
                    {item.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-linkedin-text-primary hover:underline cursor-pointer hover:text-linkedin-blue">
                    {item.name}
                  </p>
                  <p className="text-xs text-linkedin-text-secondary truncate">
                    {item.headline}
                  </p>
                  {item.followers && (
                    <p className="text-xs text-linkedin-text-secondary">
                      {item.followers} followers
                    </p>
                  )}
                  <button className="mt-1 flex items-center gap-1 px-3 py-1 border border-linkedin-text-secondary rounded-full text-sm font-semibold text-linkedin-text-secondary hover:bg-gray-100 hover:border-black hover:text-black transition-colors">
                    <Plus className="w-4 h-4" />
                    Follow
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Links */}
      <div className="px-3 py-4">
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-linkedin-text-secondary">
          <a href="#" className="hover:underline hover:text-linkedin-blue">
            About
          </a>
          <a href="#" className="hover:underline hover:text-linkedin-blue">
            Accessibility
          </a>
          <a href="#" className="hover:underline hover:text-linkedin-blue">
            Help Center
          </a>
          <a href="#" className="hover:underline hover:text-linkedin-blue">
            Privacy & Terms
          </a>
          <a href="#" className="hover:underline hover:text-linkedin-blue">
            Ad Choices
          </a>
          <a href="#" className="hover:underline hover:text-linkedin-blue">
            Advertising
          </a>
        </div>
        <p className="text-xs text-linkedin-text-secondary mt-2">
          LinkedIn Corporation © 2024
        </p>
      </div>
    </aside>
  );
}
