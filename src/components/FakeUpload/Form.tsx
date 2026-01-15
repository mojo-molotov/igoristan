import { valibotResolver } from '@hookform/resolvers/valibot';
import { useCallback, useEffect, useState } from 'react';
import { object, string, array } from 'valibot';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/Button';

import type { Images } from './ImagesDropzoneContext';

import { useImagesDropzoneContext } from './ImagesDropzoneContext';
import ImagesDropzone from './ImagesDropzone';

const FormDataSchema = object({
  images: array(string())
});

interface FormData {
  images: Images;
}

const FakeUploadForm = () => {
  const { setImages, images } = useImagesDropzoneContext();
  const { handleSubmit, setValue, watch } = useForm<FormData>({
    resolver: valibotResolver(FormDataSchema),
    defaultValues: { images: [] },
    mode: 'all'
  });

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const formImages = watch('images');

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  useEffect(() => {
    setValue('images', images);
  }, [images, setValue]);

  const onSubmit = useCallback((data: FormData) => {
    if (data.images.length === 0) return;

    setUploading(true);
    setProgress(0);
    setSuccessMessage('');
  }, []);

  useEffect(() => {
    if (!uploading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          const newImages: Images = [];
          setImages([...newImages]);
          setValue('images', [...newImages]);
          setSuccessMessage('Upload done!');
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [uploading, setImages, setValue]);

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border p-6 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <ImagesDropzone lock={uploading} label="Images" id="images" limit={10} required />

          {uploading && (
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-3 bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}

          {successMessage && <p className="text-center text-green-500">{successMessage}</p>}

          <Button disabled={formImages.length === 0 || uploading} className="w-full" type="submit">
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FakeUploadForm;
