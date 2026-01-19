import { Link, useLocation } from 'react-router-dom';
import { user } from '@/data/user';

// LinkedIn SVG Icons extracted from their actual site
const HomeIcon = ({ active }: { active?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
    {active ? (
      <path d="M23 9v2h-2v7a3 3 0 0 1-3 3h-4v-6h-4v6H6a3 3 0 0 1-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z" />
    ) : (
      <path d="M23 9v2h-2v7a3 3 0 0 1-3 3h-4v-6h-4v6H6a3 3 0 0 1-3-3v-7H1V9l11-7zm-1 2-10-6.33L2 11v1h2v7a1 1 0 0 0 1 1h4v-6h6v6h4a1 1 0 0 0 1-1v-7h2z" />
    )}
  </svg>
);

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
    <path d="M12 16v6H3v-6a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3m5.5-3A3.5 3.5 0 1 0 14 9.5a3.5 3.5 0 0 0 3.5 3.5m1 2h-2a2.5 2.5 0 0 0-2.5 2.5V22h7v-4.5a2.5 2.5 0 0 0-2.5-2.5M7.5 2A4.5 4.5 0 1 0 12 6.5 4.49 4.49 0 0 0 7.5 2" />
  </svg>
);

const JobsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
    <path d="M17 6V5a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v1H2v4a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V6zM9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H9zm10 9a4 4 0 0 0 3-1.38V17a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-4.38A4 4 0 0 0 5 14z" />
  </svg>
);

const MessagingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
    <path d="M16 4H8a7 7 0 0 0 0 14h4v4l8.16-5.39A6.78 6.78 0 0 0 23 11a7 7 0 0 0-7-7m-8 8.25A1.25 1.25 0 1 1 9.25 11 1.25 1.25 0 0 1 8 12.25m4 0A1.25 1.25 0 1 1 13.25 11 1.25 1.25 0 0 1 12 12.25m4 0A1.25 1.25 0 1 1 17.25 11 1.25 1.25 0 0 1 16 12.25" />
  </svg>
);

const NotificationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
    <path d="M22 19h-8.28a2 2 0 1 1-3.44 0H2v-1a4.52 4.52 0 0 1 1.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0 1 22 18zM18.21 7.44A6.27 6.27 0 0 0 12 2a6.27 6.27 0 0 0-6.21 5.44L5 13h14z" />
  </svg>
);

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '24px', height: '24px' }}>
    <path d="M2 2h2.67v2.67H2zm4.67 2.67h2.67V2H6.67zM11.34 2v2.67h2.67V2zM2 9.33h2.67V6.66H2zm4.67 0h2.67V6.66H6.67zm4.67 0h2.67V6.66h-2.67zM2 14h2.67v-2.67H2zm4.67 0h2.67v-2.67H6.67zm4.67 0h2.67v-2.67h-2.67z" />
  </svg>
);

const AdsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
    <path d="M12 17.13a5.13 5.13 0 0 1 0-10.25V4a8 8 0 1 0 8 8h-2.87A5.13 5.13 0 0 1 12 17.13" opacity="0.7" />
    <path d="m23.31 6.34-4.95-.71-.7-4.94-3.54 3.53.35 2.48-3.89 3.89a2 2 0 0 0 2.83 2.83l3.89-3.89 2.48.35z" />
  </svg>
);

const CaretIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '16px', height: '16px' }}>
    <path d="M8 11 3 6h10Z" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '16px', height: '16px' }}>
    <path d="M14.56 12.44 11.3 9.18a5.51 5.51 0 1 0-2.12 2.12l3.26 3.26a1.5 1.5 0 1 0 2.12-2.12M3 6.5A3.5 3.5 0 1 1 6.5 10 3.5 3.5 0 0 1 3 6.5" />
  </svg>
);

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to?: string;
  active?: boolean;
  badge?: number;
  hasDropdown?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, to, active, badge, hasDropdown, onClick }: NavItemProps) {
  const content = (
    <>
      <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
        {badge && badge > 0 && (
          <span style={{
            position: 'absolute',
            top: '-6px',
            right: '-8px',
            minWidth: '16px',
            height: '16px',
            padding: '0 4px',
            backgroundColor: '#cc1016',
            color: 'white',
            fontSize: '10px',
            fontWeight: 600,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {badge}
          </span>
        )}
      </span>
      <span style={{
        fontSize: '12px',
        color: active ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.6)',
        fontWeight: 400,
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        marginTop: '2px',
      }}>
        {label}
        {hasDropdown && <CaretIcon />}
      </span>
    </>
  );

  const baseStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 12px',
    paddingTop: '2px',
    height: '52px',
    minWidth: '80px',
    color: active ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.6)',
    textDecoration: 'none',
    borderTop: 'none',
    borderBottom: active ? '2px solid black' : '2px solid transparent',
    borderLeft: 'none',
    borderRight: 'none',
    marginBottom: '-1px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    boxSizing: 'border-box',
  };

  if (to) {
    return <Link to={to} style={baseStyle}>{content}</Link>;
  }

  return <button style={baseStyle} onClick={onClick}>{content}</button>;
}

export function TopNav() {
  const location = useLocation();

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'white',
      borderBottom: '1px solid #e0e0e0',
      height: '52px',
    }}>
      <div style={{
        maxWidth: '1128px',
        margin: '0 auto',
        padding: '0 0px',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Left section - Logo and Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* LinkedIn Logo */}
          <Link to="/" style={{ flexShrink: 0, display: 'flex' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" style={{ width: '34px', height: '34px' }}>
              <path fill="#0a66c2" d="M34 2.5v29a2.5 2.5 0 0 1-2.5 2.5h-29A2.5 2.5 0 0 1 0 31.5v-29A2.5 2.5 0 0 1 2.5 0h29A2.5 2.5 0 0 1 34 2.5M10 13H5v16h5zm.45-5.5a2.88 2.88 0 0 0-2.86-2.9H7.5a2.9 2.9 0 0 0 0 5.8 2.88 2.88 0 0 0 2.95-2.81zM29 19.28c0-4.81-3.06-6.68-6.1-6.68a5.7 5.7 0 0 0-5.06 2.58h-.14V13H13v16h5v-8.51a3.32 3.32 0 0 1 3-3.58h.19c1.59 0 2.77 1 2.77 3.52V29h5z" />
            </svg>
          </Link>

          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
            }}>
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search"
              style={{
                width: '280px',
                height: '34px',
                paddingLeft: '36px',
                paddingRight: '12px',
                backgroundColor: 'transparent',
                borderRadius: '17px',
                fontSize: '14px',
                border: '1px solid #e0e0e0',
                outline: 'none',
                color: 'rgba(0,0,0,0.9)',
              }}
            />
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Right section - Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <NavItem
            icon={<HomeIcon active={location.pathname === '/'} />}
            label="Home"
            to="/"
            active={location.pathname === '/'}
          />
          <NavItem
            icon={<NetworkIcon />}
            label="My Network"
            to="#"
            badge={1}
          />
          <NavItem
            icon={<JobsIcon />}
            label="Jobs"
            to="#"
          />
          <NavItem
            icon={<MessagingIcon />}
            label="Messaging"
            to="#"
          />
          <NavItem
            icon={<NotificationsIcon />}
            label="Notifications"
            to="#"
          />

          {/* Profile dropdown */}
          <NavItem
            icon={
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
              />
            }
            label="Me"
            hasDropdown
          />

          {/* Divider */}
          <div style={{
            width: '1px',
            height: '40px',
            backgroundColor: '#e0e0e0',
            margin: '0 4px',
          }} />

          {/* For Business */}
          <NavItem
            icon={<GridIcon />}
            label="For Business"
            hasDropdown
          />

          {/* Advertise */}
          <NavItem
            icon={<AdsIcon />}
            label="Advertise"
            to="#"
          />
        </nav>
      </div>
    </header>
  );
}
