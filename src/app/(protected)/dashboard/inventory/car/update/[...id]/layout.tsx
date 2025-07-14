
import { Crud } from '@/app/(protected)/dashboard/_components/layout-crud';
import { ReactNode } from 'react';

interface LayoutCarUpdateProps {
  children: ReactNode;
}
const LayoutCarUpdate = ({ children }: LayoutCarUpdateProps) => {
  return (
    <Crud title="Car" titleAction="Update car">
      {children}
    </Crud>
  );
};

export default LayoutCarUpdate;
