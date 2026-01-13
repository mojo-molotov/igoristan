import type { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface H1Props extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

const H1: FunctionComponent<H1Props> = ({ className, children, ...props }) => (
  <h1 className={cn('text-2xl', className)} {...props}>
    {children}
  </h1>
);

export default H1;
