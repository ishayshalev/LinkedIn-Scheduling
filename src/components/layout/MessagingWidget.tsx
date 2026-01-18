import { useState } from 'react';
import { user } from '@/data/user';

const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '20px', height: '20px' }}>
    <path d="M3 9.5A1.5 1.5 0 1 1 4.5 8 1.5 1.5 0 0 1 3 9.5M11.5 8A1.5 1.5 0 1 0 13 6.5 1.5 1.5 0 0 0 11.5 8m-5 0A1.5 1.5 0 1 0 8 6.5 1.5 1.5 0 0 0 6.5 8" />
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
    <path d="m18 15-6-6-6 6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export function MessagingWidget() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 0, right: '24px', zIndex: 50 }}>
      <div style={{ width: '300px', backgroundColor: 'white', borderRadius: '8px 8px 0 0', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)', border: '1px solid #e0e0e0', borderBottom: 'none' }}>
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ width: '100%', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '8px 8px 0 0' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', backgroundColor: '#057642', borderRadius: '50%', border: '2px solid white' }} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.9)' }}>
              Messaging
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '4px', color: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={(e) => e.stopPropagation()}
            >
              <MoreIcon />
            </button>
            <button
              style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '4px', color: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={(e) => e.stopPropagation()}
            >
              <PencilIcon />
            </button>
            <span style={{ color: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </span>
          </div>
        </button>

        {/* Expanded content */}
        {isExpanded && (
          <div style={{ borderTop: '1px solid #e0e0e0', maxHeight: '400px', overflowY: 'auto' }}>
            {/* Search */}
            <div style={{ padding: '8px' }}>
              <input
                type="text"
                placeholder="Search messages"
                style={{ width: '100%', padding: '8px 12px', backgroundColor: '#eef3f8', borderRadius: '4px', fontSize: '14px', border: 'none', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {/* Empty state */}
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                No messages yet
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
