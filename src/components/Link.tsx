import type { ReactNode } from 'react';

import { usePageContext } from 'vike-react/usePageContext';

import { cn } from '@/lib/utils';

export function Link({ className, children, href }: { children: ReactNode; className?: string; href: string }) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive = href === '/' ? urlPathname === href : urlPathname.startsWith(href);

  return (
    <a
      className={cn(
        {
          'is-active': isActive
        },
        className
      )}
      href={href}
    >
      {children}
    </a>
  );
}
