import type { FunctionComponent, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import H1 from '@/fragments/H1';

interface H1Props extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  error_code: string;
}

const ErrorBigTitle: FunctionComponent<H1Props> = ({ error_code, className }) => (
  <H1 className={cn('text-9xl font-extrabold text-red-600', className)}>{error_code}</H1>
);

export default ErrorBigTitle;
