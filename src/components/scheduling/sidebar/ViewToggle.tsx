import { List, Calendar } from 'lucide-react';

export type ViewMode = 'list' | 'calendar';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#f3f3f3',
        borderRadius: '6px',
        padding: '2px',
        gap: '2px',
      }}
    >
      <button
        onClick={() => onViewModeChange('list')}
        title="List view"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          backgroundColor: viewMode === 'list' ? '#fff' : 'transparent',
          color: viewMode === 'list' ? '#0a66c2' : '#666',
          boxShadow: viewMode === 'list' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <List style={{ width: '16px', height: '16px' }} />
      </button>
      <button
        onClick={() => onViewModeChange('calendar')}
        title="Calendar view"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          backgroundColor: viewMode === 'calendar' ? '#fff' : 'transparent',
          color: viewMode === 'calendar' ? '#0a66c2' : '#666',
          boxShadow: viewMode === 'calendar' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <Calendar style={{ width: '16px', height: '16px' }} />
      </button>
    </div>
  );
}
