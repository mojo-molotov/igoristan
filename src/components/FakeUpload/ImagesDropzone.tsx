import type { DropzoneOptions } from 'react-dropzone';
import type { KeyboardEvent, JSX } from 'react';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { cn } from '@/lib/utils';

import type { Image } from './ImagesDropzoneContext';

import { useImagesDropzoneContext } from './ImagesDropzoneContext';
import { RequiredLabel, Label } from '../Label';
import UploadPreview from '../UploadPreview';
import PlusButton from '../PlusButton';
import Dropzone from '../Dropzone';
import XButton from '../XButton';

interface ImagesDropzoneProps {
  hint?: JSX.Element[] | JSX.Element;
  required?: boolean | -1;
  limit?: number;
  lock?: boolean;
  label: string;
  id: string;
}

function ImagesDropzone({ required, limit, label, hint, lock, id }: ImagesDropzoneProps) {
  const { setImages, images } = useImagesDropzoneContext();
  const [error, setError] = useState('');

  const hasImages = images.length > 0;

  const isSingleton = limit === 1;

  const getDropzoneOptions = useCallback(
    (): DropzoneOptions => ({
      onDrop: (acceptedFiles, fileRejections) => {
        if (lock) return;

        if (fileRejections.length > 0) {
          const rejectionMessages = new Set<string>();
          fileRejections.forEach((rejection) => {
            rejection.errors.forEach((e) => rejectionMessages.add(e.message));
          });
          setError(Array.from(rejectionMessages).join('; '));
          return;
        }

        if (limit && images.length + acceptedFiles.length > limit) {
          setError(`Maximum ${limit} image${limit > 1 ? 's' : ''}.`);
          return;
        }

        setError('');
        const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
      },

      accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp', '.avif', '.gif'] },
      multiple: !isSingleton,
      disabled: lock
    }),
    [images, limit, setImages, lock, isSingleton]
  );

  const { getInputProps, getRootProps } = useDropzone(getDropzoneOptions());

  const handleImageRemove = useCallback(
    (index: number) => {
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
      setError('');
    },
    [images, setImages]
  );

  const renderImagePreview = useCallback(
    (image: Image, index: number, isAnimating?: boolean) => (
      <div className="group relative flex transition-all" key={index}>
        <div
          className={cn('h-40 w-full rounded-md', {
            'h-72 object-contain': isSingleton
          })}
        >
          <img
            className={cn('h-full w-full rounded-md object-cover', {
              'animate-swing': isAnimating
            })}
            alt={`preview-${index}`}
            draggable={false}
            loading="lazy"
            src={image}
          />
        </div>

        {!lock && (
          <XButton
            title={isSingleton ? 'Delete image' : `Delete image ${index + 1}`}
            handleRemove={() => handleImageRemove(index)}
            dataTestId={`delete-image-${index + 1}-btn`}
          />
        )}
      </div>
    ),

    [handleImageRemove, isSingleton, lock]
  );

  const renderAddImageButton = useCallback(() => {
    if (limit && images.length >= limit) return null;

    return <PlusButton title="Add an image" disabled={lock} />;
  }, [images.length, limit, lock]);

  const handleAddImageInputKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (e.target instanceof HTMLElement) e.target.click();
    }
  }, []);

  const LabelComp = required ? RequiredLabel : Label;

  return (
    <div className="space-y-4">
      <LabelComp htmlFor={id}>{limit !== undefined && !isSingleton ? `${label} (maximum ${limit})` : label}</LabelComp>

      <Dropzone
        title={isSingleton ? 'Add an image here' : 'Add images here'}
        required={required === -1 ? false : required}
        handleKeyDown={handleAddImageInputKeyDown}
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        isSingle={isSingleton}
        isHidden={hasImages}
        id={id}
      />

      <UploadPreview
        className={cn({
          'sm:grid-cols-2 md:grid-cols-3': !isSingleton
        })}
        embeddedDropzone={limit === undefined ? true : images.length < limit}
        renderAddElementButton={renderAddImageButton}
        renderPreview={renderImagePreview}
        getRootProps={getRootProps}
        isSingleton={isSingleton}
        isHidden={!hasImages}
        blobs={images}
      />

      {error && (
        <p data-testid="images-dropzone-error-msg" className="text-sm text-red-500">
          {error}
        </p>
      )}

      {hint}
    </div>
  );
}

export default ImagesDropzone;
