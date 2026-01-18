import { Video, Image, FileText } from 'lucide-react';
import { user } from '@/data/user';

export function CreatePostCard() {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '16px' }}>
      {/* Top row - Avatar and Input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
        <button style={{ flex: 1, height: '48px', padding: '0 16px', textAlign: 'left', border: '1px solid rgba(0,0,0,0.3)', borderRadius: '24px', fontSize: '14px', color: 'rgba(0,0,0,0.6)', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 500 }}>
          Start a post
        </button>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '4px', flex: 1, justifyContent: 'center', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          <div style={{ width: '24px', height: '24px', backgroundColor: '#e7a33e', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Video style={{ width: '16px', height: '16px', color: 'white' }} fill="white" strokeWidth={0} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.6)' }}>
            Video
          </span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '4px', flex: 1, justifyContent: 'center', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          <Image style={{ width: '24px', height: '24px', color: '#378fe9' }} />
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.6)' }}>
            Photo
          </span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '4px', flex: 1, justifyContent: 'center', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
          <FileText style={{ width: '24px', height: '24px', color: '#e06847' }} />
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.6)' }}>
            Write article
          </span>
        </button>
      </div>
    </div>
  );
}
