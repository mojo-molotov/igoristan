import type { LabelHTMLAttributes, FunctionComponent } from 'react';

import { cn } from '@/lib/utils';

export const Label: FunctionComponent<LabelHTMLAttributes<HTMLLabelElement>> = ({ className, children, ...props }) => {
  return (
    <label className={cn('text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)} {...props}>
      {children}
    </label>
  );
};

export const RequiredLabel: FunctionComponent<LabelHTMLAttributes<HTMLLabelElement>> = ({ className, children, ...props }) => {
  return (
    <Label className={className} {...props}>
      {children}
      <span className="ml-1 text-red-600">*</span>
    </Label>
  );
};
