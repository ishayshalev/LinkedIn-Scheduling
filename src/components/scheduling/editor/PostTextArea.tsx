import { useSchedulingDialog } from '../SchedulingDialogContext';
import { user } from '@/data/user';

export function PostTextArea() {
  const { draftContent, setDraftContent } = useSchedulingDialog();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Author section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <img
          src={user.avatar}
          alt={user.name}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>{user.name}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>Post to Anyone</div>
        </div>
      </div>

      {/* Text area */}
      <textarea
        placeholder="Start a post..."
        value={draftContent}
        onChange={(e) => setDraftContent(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontSize: '14px',
          lineHeight: '1.5',
          fontFamily: 'inherit',
          minHeight: '150px',
          padding: 0,
        }}
      />
    </div>
  );
}
