import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
}

export function Layout({ children, hideNavbar = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNavbar && <Navbar />}
      <main className={hideNavbar ? 'flex-1' : 'flex-1 pt-20'}>
        {children}
      </main>
    </div>
  );
}
