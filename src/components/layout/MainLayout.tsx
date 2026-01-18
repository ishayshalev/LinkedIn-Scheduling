import type { ReactNode } from 'react';
import { TopNav } from './TopNav';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-linkedin-background">
      <TopNav />
      <main className="pt-[52px]">{children}</main>
    </div>
  );
}
