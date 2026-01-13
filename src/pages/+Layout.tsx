import '../App.css';
import type { FunctionComponent, ReactNode } from 'react';

interface BodyWrapperProps {
  children: ReactNode;
}

const BodyWrapper: FunctionComponent<BodyWrapperProps> = ({ children }) => (
  <div className="flex min-h-screen w-full max-w-full min-w-full flex-col">{children}</div>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>;
}
