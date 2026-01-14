import type { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface H2Props extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

const H2: FunctionComponent<H2Props> = ({ className, children, ...props }) => (
  <h2 className={cn('text-8xl', className)} {...props}>
    {children}
  </h2>
);

export default H2;
