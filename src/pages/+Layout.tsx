import type { FunctionComponent, ReactNode } from 'react';

import '../App.css';

interface LayoutProps {
  children: React.ReactNode;
}

interface BodyWrapperProps {
  children: ReactNode;
}

const BodyWrapper: FunctionComponent<BodyWrapperProps> = ({ children }) => (
  <div className="flex min-h-screen w-full max-w-full min-w-full flex-col">{children}</div>
);

const Layout: FunctionComponent<LayoutProps> = ({ children }) => <BodyWrapper>{children}</BodyWrapper>;

export default Layout;
