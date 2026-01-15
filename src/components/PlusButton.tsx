import type { FunctionComponent } from 'react';

import { cn } from '@/lib/utils';

interface PlusButtonProps {
  disabled?: boolean;
  title: string;
}

const PlusButton: FunctionComponent<PlusButtonProps> = ({ disabled, title }) => {
  return (
    <button
      className={cn(
        {
          'cursor-pointer': !disabled
        },
        'group relative flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed bg-black'
      )}
      disabled={disabled}
      aria-label={title}
      title={title}
      type="button"
    >
      <span className="text-4xl font-semibold" aria-hidden="true">
        +
      </span>
    </button>
  );
};

export default PlusButton;
