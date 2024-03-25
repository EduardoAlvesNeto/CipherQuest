import { ComponentProps } from 'react';

import './styles.css';

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className="button-container" {...props}>
      {children}
    </button>
  );
};
