import { valibotResolver } from '@hookform/resolvers/valibot';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/Button';

import type { ImagesFormData, Images } from './ImagesDropzoneContext';

import { useImagesDropzoneContext, ImagesFormDataSchema } from './ImagesDropzoneContext';
import ImagesDropzone from './ImagesDropzone';

const MysticalConfirmation = ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onCancel}>
      <div
        className="relative mx-4 max-w-md rounded-lg border-4 border-yellow-600 bg-linear-to-b from-amber-50 to-yellow-100 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform text-6xl">✝️</div>
        <h2 className="mt-4 mb-4 text-center text-2xl font-bold text-amber-900">Oath of Allegiance</h2>
        <p className="mb-6 text-center text-lg text-amber-800 italic">
          "Whatever you do, work at it with all your heart, as working for the Emperor."
        </p>
        <p className="mb-6 text-center text-sm text-amber-700">- Ajaccians 3:23</p>
        <div className="flex justify-center gap-4">
          <button
            className="transform rounded-lg bg-yellow-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-yellow-700"
            onClick={onConfirm}
          >
            ✨ Amen
          </button>
          <button className="rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-gray-700" onClick={onCancel}>
            🙏 Forgive me my sins
          </button>
        </div>
      </div>
    </div>
  );
};

const FakeUploadForm = () => {
  const { setImages, images } = useImagesDropzoneContext();
  const { handleSubmit, setValue, watch } = useForm<ImagesFormData>({
    resolver: valibotResolver(ImagesFormDataSchema),
    defaultValues: { images: [] },
    mode: 'all'
  });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingData, setPendingData] = useState<ImagesFormData | null>(null);

  const formImages = watch('images');

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 5e3);
    return () => clearTimeout(timer);
  }, [successMessage]);

  useEffect(() => {
    setValue('images', images);
  }, [images, setValue]);

  const performUpload = useCallback((data: ImagesFormData) => {
    if (data.images.length === 0) return;
    setUploading(true);
    setProgress(0);
    setSuccessMessage('');
  }, []);

  const onSubmit = useCallback((data: ImagesFormData) => {
    setPendingData(data);
    setShowConfirmation(true);
  }, []);

  const handleConfirm = useCallback(() => {
    setShowConfirmation(false);
    if (pendingData) {
      performUpload(pendingData);
      setPendingData(null);
    }
  }, [pendingData, performUpload]);

  const handleCancel = useCallback(() => {
    setShowConfirmation(false);
    setPendingData(null);
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
          setSuccessMessage('Upload done! The Emperor has received thy offering.');
          return 100;
        }
        return prev + 5;
      });
    }, 125);
    return () => clearInterval(interval);
  }, [uploading, setImages, setValue]);

  return (
    <>
      <div className="mx-auto w-full max-w-2xl rounded-lg border bg-white/90 p-6 shadow-md backdrop-blur">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <ImagesDropzone lock={uploading} label="Images" id="images" limit={10} required />
            {uploading && (
              <div className="space-y-2">
                <p className="text-center text-sm text-amber-700 italic">Purifying thy images... {progress}% sanctified</p>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-3 bg-linear-to-r from-yellow-400 to-amber-600 transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
            {successMessage && <p className="text-center font-semibold text-green-600">✨ {successMessage} ✨</p>}
            <Button disabled={formImages.length === 0 || uploading} className="w-full" type="submit">
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </form>
      </div>
      {showConfirmation && <MysticalConfirmation onConfirm={handleConfirm} onCancel={handleCancel} />}
    </>
  );
};

export default FakeUploadForm;
