import { useCallback, useEffect, useState } from 'react';

import { ImagesDropzoneProvider } from '@/components/FakeUpload/ImagesDropzoneContext';
import RandomBibleVerse from '@/components/RandomBibleVerse';
import FakeUploadForm from '@/components/FakeUpload/Form';
import Main from '@/fragments/Main';
import shuffle from '@/lib/shuffle';
import BRAND from '@/config/brand';
import H1 from '@/fragments/H1';

import matriochkaImgUrl from '../../../assets/images/backgrounds/matriochka.webp';
import figatelluImgUrl from '../../../assets/images/backgrounds/figatellu.webp';
import stBasilsImgUrl from '../../../assets/images/backgrounds/st-basils.webp';
import bastiaImgUrl from '../../../assets/images/backgrounds/bastia.webp';
import mariasImgUrl from '../../../assets/images/backgrounds/marias.webp';
import donkeyImgUrl from '../../../assets/images/backgrounds/donkey.webp';
import templeImgUrl from '../../../assets/images/backgrounds/temple.webp';
import jesusImgUrl from '../../../assets/images/backgrounds/jesus.webp';
import mariaImgUrl from '../../../assets/images/backgrounds/maria.webp';
import marioImgUrl from '../../../assets/images/backgrounds/mario.webp';
import Text from './Text';

const backgrounds = [
  stBasilsImgUrl,
  mariasImgUrl,
  templeImgUrl,
  bastiaImgUrl,
  donkeyImgUrl,
  jesusImgUrl,
  matriochkaImgUrl,
  figatelluImgUrl,
  mariaImgUrl,
  marioImgUrl
] as const;

const Upload = () => {
  const [shuffledBgs, setShuffledBgs] = useState(() => shuffle(backgrounds));
  const [currentIndex, setCurrentIndex] = useState(0);

  const reshuffleIfNeeded = useCallback(() => {
    if (currentIndex >= shuffledBgs.length - 1) {
      setShuffledBgs(shuffle(backgrounds));
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, shuffledBgs.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      reshuffleIfNeeded();
    }, 1200);
    return () => clearInterval(interval);
  }, [reshuffleIfNeeded]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${shuffledBgs[currentIndex]})`,
          filter: 'brightness(0.4)',
          backgroundColor: '#000'
        }}
        className="fixed inset-0 -z-10 bg-cover bg-center transition-all duration-2000"
      />
      <Main className="relative flex flex-col items-center">
        <div className="absolute top-4 right-4 text-sm text-white/80 italic select-none max-xl:hidden">{BRAND}'s Blessed Uploader™</div>
        <H1 className="text-center font-mono tracking-widest text-white uppercase drop-shadow-2xl text-shadow-lg max-sm:text-lg">Upload images!</H1>
        <ImagesDropzoneProvider>
          <FakeUploadForm />
        </ImagesDropzoneProvider>

        <Text />
        <RandomBibleVerse />
      </Main>
    </>
  );
};

export default Upload;
