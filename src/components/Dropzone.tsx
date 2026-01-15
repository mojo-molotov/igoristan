import type { FunctionComponent, KeyboardEvent } from 'react';
import type { DropzoneState } from 'react-dropzone';

import { cn } from '@/lib/utils';

interface DropzoneProps {
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  getInputProps: DropzoneState['getInputProps'];
  getRootProps: DropzoneState['getRootProps'];
  isHidden?: boolean;
  required?: boolean;
  isSingle?: boolean;
  title: string;
  id: string;
}

const Dropzone: FunctionComponent<DropzoneProps> = ({ handleKeyDown, getInputProps, getRootProps, isHidden, required, isSingle, title, id }) => {
  const inputProps = getInputProps({ multiple: isSingle ? false : true, required, name: id, id });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'mt-1 cursor-pointer rounded-md border-2 border-dashed border-gray-300 bg-gray-100 p-6 text-center hover:bg-gray-200 focus:bg-gray-200',
        {
          hidden: Boolean(isHidden)
        }
      )}
      onKeyDown={handleKeyDown}
    >
      <input {...inputProps} className="absolute -z-1 opacity-0" style={{ display: 'initial' }} />
      <p className="font-semibold text-gray-600">{title}</p>
    </div>
  );
};

export default Dropzone;
