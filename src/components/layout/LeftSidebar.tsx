import { Bookmark, Users, Newspaper, Calendar, ArrowRight, BadgeCheck, Megaphone } from 'lucide-react';
import { user } from '@/data/user';

export function LeftSidebar() {
  return (
    <aside style={{ width: '225px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Profile Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
        {/* Banner - dark grayscale image style */}
        <div
          style={{
            height: '56px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=100&fit=crop)',
            filter: 'grayscale(30%)',
          }}
        />

        {/* Avatar - positioned to overlap banner */}
        <div style={{ padding: '0 12px', marginTop: '-40px', position: 'relative' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid white', objectFit: 'cover', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
          />
        </div>

        {/* User Info */}
        <div style={{ padding: '12px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'rgba(0,0,0,0.9)', cursor: 'pointer', lineHeight: 1.2, margin: 0 }}>
              {user.name}
            </h2>
            <BadgeCheck style={{ width: '16px', height: '16px', color: '#0a66c2' }} fill="#0a66c2" stroke="white" strokeWidth={2} />
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', marginTop: '2px', lineHeight: 1.33, margin: '2px 0 0 0' }}>
            {user.headline}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', lineHeight: 1.33, margin: 0 }}>
            {user.location}
          </p>
        </div>

        {/* Company link */}
        <div style={{ padding: '0 12px 12px 12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', padding: 0 }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#f3f3f3', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: 'rgba(0,0,0,0.9)' }}>
              {user.company.logo}
            </div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.9)' }}>
              {user.company.name}
            </span>
          </button>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #e0e0e0' }} />

        {/* Stats */}
        <div style={{ padding: '8px 0' }}>
          <button style={{ width: '100%', textAlign: 'left', padding: '6px 12px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
                Profile viewers
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#0a66c2' }}>
                {user.profileViews}
              </span>
            </div>
          </button>
          <button style={{ width: '100%', textAlign: 'left', padding: '6px 12px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
                Post impressions
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#0a66c2' }}>
                {user.postImpressions}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Business/Company Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
        {/* Company header */}
        <div style={{ padding: '12px 12px 8px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#f3f3f3', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, color: 'rgba(0,0,0,0.9)' }}>
              {user.company.logo}
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.9)' }}>
              {user.company.name}
            </span>
          </div>
        </div>

        {/* Company stats */}
        <div style={{ padding: '8px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
            <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>Activity</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.9)' }}>{user.company.activity}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
            <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>Visitors</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.9)' }}>{user.company.visitors}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #e0e0e0' }} />

        {/* Grow your business */}
        <div style={{ padding: '12px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', marginBottom: '8px', margin: '0 0 8px 0' }}>Grow your business faster</p>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(0,0,0,0.9)', marginBottom: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', padding: 0 }}>
            <span style={{ width: '16px', height: '16px', backgroundColor: '#f8c77e', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>⭐</span>
            <span style={{ fontWeight: 600 }}>Try Premium Page for ₪0</span>
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(0,0,0,0.9)', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', padding: 0 }}>
            <Megaphone style={{ width: '16px', height: '16px' }} />
            <span style={{ fontWeight: 600 }}>Advertise on LinkedIn</span>
          </button>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #e0e0e0' }} />

        {/* See visitor analytics */}
        <button style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.6)' }}>See visitor analytics</span>
          <ArrowRight style={{ width: '16px', height: '16px', color: 'rgba(0,0,0,0.6)' }} />
        </button>
      </div>

      {/* Quick Links */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
        <button style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(0,0,0,0.6)', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          <Bookmark style={{ width: '16px', height: '16px' }} fill="currentColor" />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Saved items</span>
        </button>
        <button style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(0,0,0,0.6)', borderTop: '1px solid #e0e0e0', borderLeft: 'none', borderRight: 'none', borderBottom: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          <Users style={{ width: '16px', height: '16px' }} />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Groups</span>
        </button>
        <button style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(0,0,0,0.6)', borderTop: '1px solid #e0e0e0', borderLeft: 'none', borderRight: 'none', borderBottom: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          <Newspaper style={{ width: '16px', height: '16px' }} />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Newsletters</span>
        </button>
        <button style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(0,0,0,0.6)', borderTop: '1px solid #e0e0e0', borderLeft: 'none', borderRight: 'none', borderBottom: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          <Calendar style={{ width: '16px', height: '16px' }} />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Events</span>
        </button>
      </div>
    </aside>
  );
}
