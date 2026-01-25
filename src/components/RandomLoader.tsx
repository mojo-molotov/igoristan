import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

import { randint } from '@/lib/randint';

interface RandomLoaderProps {
  loadedLabel: string;
  id: string;
}

const RandomLoader: FunctionComponent<RandomLoaderProps> = ({ loadedLabel, id }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const randomDelay = randint(1000, 5000);

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, randomDelay);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center bg-gray-100" id={id}>
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100" id={id}>
      <div className="rounded-lg bg-white px-8 py-6 shadow-lg">
        <h1 className="text-2xl font-bold text-green-600">{loadedLabel}</h1>
      </div>
    </div>
  );
};

export default RandomLoader;
