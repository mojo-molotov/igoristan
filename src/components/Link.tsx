import type { FunctionComponent, ReactNode } from 'react';

import { usePageContext } from 'vike-react/usePageContext';

import { cn } from '@/lib/utils';

interface LinkProps {
  children: ReactNode;
  className?: string;
  href: string;
}

const Link: FunctionComponent<LinkProps> = ({ className, children, href }) => {
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
};

export default Link;
