import type { FunctionComponent, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface MainProps {
  children: ReactNode;
  className?: string;
}

const Main: FunctionComponent<MainProps> = ({ className, children }) => {
  return <main className={cn('text-foreground flex w-full max-w-full flex-1 flex-col gap-7 p-7', className)}>{children}</main>;
};

export default Main;
