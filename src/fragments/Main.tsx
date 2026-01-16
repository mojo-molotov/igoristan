import type { ComponentPropsWithoutRef, FunctionComponent, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface MainProps extends ComponentPropsWithoutRef<'main'> {
  children: ReactNode;
  className?: string;
}

const Main: FunctionComponent<MainProps> = ({ className, children, ...props }) => (
  <main className={cn('flex w-full max-w-full flex-1 flex-col gap-7 p-7', className)} {...props}>
    {children}
  </main>
);

export default Main;
