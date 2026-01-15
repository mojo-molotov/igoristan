import type { FunctionComponent, ReactNode, JSX } from 'react';
import type { DropzoneState } from 'react-dropzone';

import { useState } from 'react';

import { useIntervalTimer } from '@/hooks/useTimer';
import { randint } from '@/lib/randint';
import { cn } from '@/lib/utils';

interface PreviewProps {
  renderPreview: (blob: string, index: number, isAnimating?: boolean) => JSX.Element;
  renderAddElementButton: () => ReactNode | null;
  getRootProps: DropzoneState['getRootProps'];
  embeddedDropzone?: boolean;
  isSingleton: boolean;
  isHidden?: boolean;
  className?: string;
  blobs: string[];
}

const UploadPreview: FunctionComponent<PreviewProps> = ({
  renderAddElementButton,
  embeddedDropzone,
  renderPreview,
  getRootProps,
  isSingleton,
  className,
  isHidden,
  blobs
}) => {
  const injectDragAndDrop = (embeddedDropzone !== undefined && !embeddedDropzone) || isSingleton ? {} : getRootProps();

  const [animatedIndex, setAnimatedIndex] = useState<number | null>(null);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  const { restartTimer } = useIntervalTimer({
    onExpire: () => {
      if (isSingleton) return;

      if (blobs.length === 0) {
        setAnimatedIndex(null);
        setPreviousIndex(null);
        restartTimer();
        return;
      }

      let randomIndex: number;
      do {
        randomIndex = randint(0, blobs.length - 1);
      } while (blobs.length > 1 && randomIndex === previousIndex);

      setAnimatedIndex(randomIndex);
      setPreviousIndex(randomIndex);

      restartTimer();
    },
    delay: 5000
  });

  return (
    <div
      {...injectDragAndDrop}
      className={cn('my-6 rounded-xl border p-6 text-white shadow-lg', {
        'mx-auto w-fit p-2': isSingleton,
        hidden: Boolean(isHidden)
      })}
      tabIndex={-1}
    >
      <div
        className={cn(
          'grid grid-cols-1 gap-6',
          {
            'w-fit': isSingleton
          },
          className
        )}
      >
        {blobs.map((blob, index) => renderPreview(blob, index, index === animatedIndex))}
        {renderAddElementButton()}
      </div>
    </div>
  );
};

export default UploadPreview;
