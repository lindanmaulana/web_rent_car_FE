import { Crud } from '@/components/dashboard/layout/crud';
import { ReactNode } from 'react';

interface LayoutCarAddProps {
  children: ReactNode;
}

const LayoutCarAdd = ({ children }: LayoutCarAddProps) => {
  return (
    <Crud title="Car" titleAction="New Car">
      {children}
    </Crud>
  );
};

export default LayoutCarAdd;
