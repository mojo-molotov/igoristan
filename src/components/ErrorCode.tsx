import type { FunctionComponent, ReactNode } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';
import H1 from '@/fragments/H1';

interface ErrorCodeProps {
  /**
   * When true, replaces default styles instead of merging them
   * @default false
   */
  forceClassName?: boolean;
  /**
   * The error code number to display
   */
  children: ReactNode;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * When true, merges props into the child element instead of rendering a wrapper
   * @default false
   */
  asChild?: boolean;
}

/**
 * ErrorCode component displays error code numbers with consistent styling.
 *
 * @example
 * // Default usage with H1 component
 * <ErrorCode>{500}</ErrorCode>
 *
 * @example
 * // Using asChild to customize with your own H1 wrapper
 * <ErrorCode asChild>
 *   <H1>{404}</H1>
 * </ErrorCode>
 *
 * @example
 * // Override default styles completely
 * <ErrorCode className="text-sm text-blue-500" forceClassName>
 *   {403}
 * </ErrorCode>
 */
const ErrorCode: FunctionComponent<ErrorCodeProps> = ({ forceClassName = false, asChild = false, className, children }) => {
  const baseClasses = 'text-9xl font-extrabold text-red-600';
  const finalClassName = forceClassName ? className : cn(baseClasses, className);

  if (asChild) return <Slot className={finalClassName}>{children}</Slot>;
  return <H1 className={finalClassName}>{children}</H1>;
};

export default ErrorCode;
