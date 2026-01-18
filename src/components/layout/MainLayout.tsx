import type { ReactNode } from 'react';
import { TopNav } from './TopNav';
import { MessagingWidget } from './MessagingWidget';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f3f2ef' }}>
      <TopNav />
      <main style={{ paddingTop: '56px' }}>{children}</main>
      <MessagingWidget />
    </div>
  );
}
