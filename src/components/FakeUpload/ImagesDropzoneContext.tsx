import type { FunctionComponent, ReactNode } from 'react';
import type { InferOutput } from 'valibot';

import { createContext, useContext, useState } from 'react';
import { object, string, array } from 'valibot';

const images = array(string());
export const ImagesFormDataSchema = object({ images });

export type ImagesFormData = InferOutput<typeof ImagesFormDataSchema>;

interface ImagesDropzoneContext {
  setImages: (images: Images) => void;
  images: Images;
}

interface ImageProviderProps {
  children: ReactNode;
}

const ImagesContext = createContext<ImagesDropzoneContext | undefined>(undefined);

export const useImagesDropzoneContext = (): ImagesDropzoneContext => {
  const context = useContext(ImagesContext);

  if (!context) {
    throw new Error('useImageContext must be used within an ImagesProvider');
  }

  return context;
};

export const ImagesDropzoneProvider: FunctionComponent<ImageProviderProps> = ({ children }) => {
  const [images, setImages] = useState<Images>([]);

  const updateImages = (newImages: Images) => {
    setImages(newImages);
  };

  return <ImagesContext.Provider value={{ setImages: updateImages, images }}>{children}</ImagesContext.Provider>;
};

export type Images = ImagesFormData['images'];
export type Image = Images[number];
