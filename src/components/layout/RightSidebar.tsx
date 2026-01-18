import { ChevronRight, Plus, ChevronDown } from 'lucide-react';

const puzzles = [
  {
    name: 'Zip',
    number: '#307',
    description: 'Complete the path',
    color: '#057642',
  },
  {
    name: 'Mini Sudoku',
    number: '#160',
    description: 'The classic game, made mini',
    color: '#5f3dc4',
  },
  {
    name: 'Tango',
    number: '#468',
    description: 'Harmonize the grid',
    color: '#c2410c',
  },
  {
    name: 'Queens',
    number: '#628',
    description: 'Crown each region',
    color: '#be185d',
  },
];

const suggestions = [
  {
    name: 'Amir Barkol',
    headline: 'Social Media Manager at Microsoft | ...',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Dovi Frances',
    headline: 'Founding Partner at Group 11',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Meta',
    headline: 'Company • Software Development',
    isCompany: true,
  },
];

export function RightSidebar() {
  return (
    <aside style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Today's puzzles */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'rgba(0,0,0,0.9)', margin: 0 }}>
            Today's puzzles
          </h3>
        </div>

        <div style={{ padding: '0 16px 8px 16px' }}>
          {puzzles.map((puzzle, index) => (
            <button
              key={index}
              style={{ width: '100%', padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: puzzle.color }}
                >
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: 700 }}>
                    {puzzle.name.charAt(0)}
                  </span>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.9)', margin: 0 }}>
                    {puzzle.name} <span style={{ fontWeight: 400, color: 'rgba(0,0,0,0.6)' }}>{puzzle.number}</span>
                  </p>
                  <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                    {puzzle.description}
                  </p>
                </div>
              </div>
              <ChevronRight style={{ width: '20px', height: '20px', color: 'rgba(0,0,0,0.6)' }} />
            </button>
          ))}
        </div>

        <button style={{ width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.6)', borderTop: '1px solid #e0e0e0', borderLeft: 'none', borderRight: 'none', borderBottom: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          Show more
          <ChevronDown style={{ width: '16px', height: '16px' }} />
        </button>
      </div>

      {/* Add to your feed */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'rgba(0,0,0,0.9)', margin: 0 }}>
            Add to your feed
          </h3>
        </div>

        <div style={{ padding: '0 16px 12px 16px' }}>
          {suggestions.map((item, index) => (
            <div key={index} style={{ padding: '8px 0', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              {/* Avatar */}
              {item.isCompany ? (
                <div style={{ width: '48px', height: '48px', flexShrink: 0, borderRadius: '4px', backgroundColor: '#0668e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '20px', color: 'white' }}>∞</span>
                </div>
              ) : (
                <img
                  src={item.avatar}
                  alt={item.name}
                  style={{ width: '48px', height: '48px', flexShrink: 0, borderRadius: '50%', objectFit: 'cover' }}
                />
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.9)', cursor: 'pointer', lineHeight: '20px', margin: 0 }}>
                  {item.name}
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', lineHeight: '16px', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>
                  {item.headline}
                </p>
                <button style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 16px', border: '1px solid rgba(0,0,0,0.6)', borderRadius: '24px', fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.6)', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  <Plus style={{ width: '16px', height: '16px' }} />
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>

        <button style={{ width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.6)', borderTop: '1px solid #e0e0e0', borderLeft: 'none', borderRight: 'none', borderBottom: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          View all recommendations
          <ChevronRight style={{ width: '16px', height: '16px' }} />
        </button>
      </div>

      {/* Hiring Ad Banner */}
      <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop"
          alt="See who's hiring on LinkedIn"
          style={{ width: '100%', height: 'auto' }}
        />
        <div style={{ backgroundColor: '#f8fafd', padding: '12px', border: '1px solid #e0e0e0', borderTop: 'none', borderRadius: '0 0 8px 8px' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.9)', margin: 0 }}>
            See who's hiring on LinkedIn.
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div style={{ padding: '16px 8px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Accessibility</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Help Center</a>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontSize: '12px', color: 'rgba(0,0,0,0.6)', marginTop: '4px' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Privacy & Terms <ChevronDown style={{ width: '12px', height: '12px' }} />
          </a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Ad Choices</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Advertising</a>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontSize: '12px', color: 'rgba(0,0,0,0.6)', marginTop: '4px' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Business Services <ChevronDown style={{ width: '12px', height: '12px' }} />
          </a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Get the LinkedIn app</a>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontSize: '12px', color: 'rgba(0,0,0,0.6)', marginTop: '4px' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>More</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '56px', height: '14px', color: '#0a66c2', fill: 'currentColor' }}>
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
          </svg>
          <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>LinkedIn Corporation © 2026</span>
        </div>
      </div>
    </aside>
  );
}
