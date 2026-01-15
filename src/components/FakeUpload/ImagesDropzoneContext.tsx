import type { FunctionComponent, ReactNode } from 'react';

import { createContext, useContext, useState } from 'react';

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

export type Images = Image[];
export type Image = string;
