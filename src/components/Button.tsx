import type { ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'destructive' | 'secondary' | 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'icon' | 'sm' | 'lg';
  asChild?: boolean;
}

const Button = ({ variant = 'default', size = 'default', asChild = false, className, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  const variantClasses = {
    outline: 'border border-gray-300 bg-white text-gray-900 shadow-sm hover:bg-gray-100',
    secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200',
    destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-700',
    default: 'bg-blue-600 text-white shadow-sm hover:bg-blue-700',
    link: 'text-blue-600 underline-offset-4 hover:underline',
    ghost: 'text-gray-900 hover:bg-gray-100'
  };

  const sizeClasses = {
    lg: 'h-10 px-6 rounded-md',
    sm: 'h-8 px-3 rounded-md',
    default: 'h-9 px-4 py-2',
    icon: 'size-9'
  };

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors',
        'disabled:pointer-events-none disabled:opacity-50',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
};

export { Button };
