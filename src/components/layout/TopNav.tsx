import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Home,
  Users,
  BriefcaseBusiness,
  MessageSquare,
  Bell,
  CalendarDays,
  ChevronDown,
} from 'lucide-react';
import { user } from '@/data/user';

function NavIcon({
  icon: Icon,
  label,
  to,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: string;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center px-4 py-1 min-w-[80px] border-b-2 transition-colors ${
        active
          ? 'border-black text-black'
          : 'border-transparent text-linkedin-text-secondary hover:text-black'
      }`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs mt-0.5">{label}</span>
    </Link>
  );
}

export function TopNav() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-linkedin-border shadow-sm">
      <div className="max-w-[1128px] mx-auto px-4 h-[52px] flex items-center justify-between">
        {/* Left section - Logo and Search */}
        <div className="flex items-center gap-2">
          {/* LinkedIn Logo */}
          <Link to="/" className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-[34px] h-[34px] text-linkedin-blue fill-current"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
          </Link>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-linkedin-text-secondary" />
            <input
              type="text"
              placeholder="Search"
              className="w-[280px] h-[34px] pl-10 pr-4 bg-linkedin-input-bg rounded-md text-sm placeholder:text-linkedin-text-secondary focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        {/* Right section - Navigation */}
        <nav className="flex items-center h-full">
          <NavIcon
            icon={Home}
            label="Home"
            to="/"
            active={location.pathname === '/'}
          />
          <NavIcon icon={Users} label="My Network" to="#" />
          <NavIcon icon={BriefcaseBusiness} label="Jobs" to="#" />
          <NavIcon icon={MessageSquare} label="Messaging" to="#" />
          <NavIcon icon={Bell} label="Notifications" to="#" />

          {/* Schedule - Our new feature! */}
          <NavIcon
            icon={CalendarDays}
            label="Schedule"
            to="/schedule"
            active={location.pathname === '/schedule'}
          />

          {/* Profile dropdown */}
          <button className="flex flex-col items-center justify-center px-4 py-1 min-w-[80px] border-b-2 border-transparent text-linkedin-text-secondary hover:text-black transition-colors">
            <div className="w-6 h-6 rounded-full bg-linkedin-blue flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {user.name.charAt(0)}
              </span>
            </div>
            <span className="text-xs mt-0.5 flex items-center gap-0.5">
              Me <ChevronDown className="w-3 h-3" />
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
