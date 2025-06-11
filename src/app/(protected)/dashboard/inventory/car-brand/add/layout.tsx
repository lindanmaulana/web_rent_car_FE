import { ReactNode } from 'react';
import { Crud } from '../../../_components/layout-crud';

interface LayoutCarBrandAddProps {
  children: ReactNode;
}
const LayoutCarBrandAdd = ({ children }: LayoutCarBrandAddProps) => {
  return (
    <Crud title="Car Brand" titleAction="Add">
      {children}
    </Crud>
  );
};


export default LayoutCarBrandAdd