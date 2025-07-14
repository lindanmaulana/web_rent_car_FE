'use client';

import { ReactNode } from 'react';
import Sidebar from '@/app/(protected)/dashboard/_components/sidebar';
import { Header } from '@/components/header';

interface PageDashboardLayoutProps {
  children: ReactNode;
}

const PageDashboardLayout = ({ children }: PageDashboardLayoutProps) => {
  
  return (
    <div className="w-full flex">
      <div className="w-full lg:max-w-[250px] flex h-screen fixed lg:relative translate-x-0">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full h-screen max-h-screen px-4">
        <div className='w-full h-auto sticky top-0 inset-0'>
          <Header />
        </div>
        <div className='flex-1 overflow-y-scroll py-4'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageDashboardLayout;