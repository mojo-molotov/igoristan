import type { FunctionComponent, ReactNode } from 'react';

import { usePageContext } from 'vike-react/usePageContext';

import { cn } from '@/lib/utils';

interface LinkProps {
  children: ReactNode;
  className?: string;
  doFollow?: boolean;
  href: string;
}

const Link: FunctionComponent<LinkProps> = ({ className, children, doFollow, href }) => {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive = href === '/' ? urlPathname === href : urlPathname.startsWith(href);
  const autoNoFollow = !doFollow && href.startsWith('http');

  return (
    <a
      className={cn(
        {
          'is-active': isActive
        },
        className
      )}
      rel={autoNoFollow ? 'nofollow' : undefined}
      href={href}
    >
      {children}
    </a>
  );
};

export default Link;
