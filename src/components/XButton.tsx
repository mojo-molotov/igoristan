import type { FunctionComponent } from 'react';

import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface XButtonProps {
  handleRemove: () => void;
  dataTestId?: string;
  className?: string;
  title: string;
}

const XButton: FunctionComponent<XButtonProps> = ({ handleRemove, dataTestId, className, title }) => {
  return (
    <button
      className={cn(
        'absolute top-0.5 right-0.5 scale-110 cursor-pointer rounded-full bg-black p-1 text-xs text-white opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 focus:opacity-100 max-md:opacity-100',
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        handleRemove();
      }}
      data-testid={dataTestId}
      aria-label={title}
      title={title}
      type="button"
    >
      <XIcon size={16} />
    </button>
  );
};

export default XButton;
