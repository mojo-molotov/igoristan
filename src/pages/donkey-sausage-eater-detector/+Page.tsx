import { useEffect, useState } from 'react';

import { formatPageTitle } from '@/lib/formatters';
import { randint } from '@/lib/randint';
import { cn } from '@/lib/utils';

import sausageMonsterUrl from '../../../assets/images/monsters/donkey-sausage-monster.png';
import accessGrantedSoundUrl from '../../../assets/sounds/access-granted.ogg';
import bsodSoundUrl from '../../../assets/sounds/horrible-freeze-sound.ogg';
import DisapprovedVisitorGetOutPage from './DisapprovedVisitorGetOutPage';
import ApprovedVisitorWelcomePage from './ApprovedVisitorWelcomePage';
import { ERROR_PAGE_TITLE, PAGE_TITLE } from './constants';
import Loader, { LoaderFooter } from './Loader';

const DonkeySausageEaterDetector = () => {
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const hasError = Math.random() < 0.3;
    const timeoutId = setTimeout(
      () => {
        document.title = formatPageTitle({
          pageTitle: hasError ? ERROR_PAGE_TITLE : PAGE_TITLE,
          errorCode: hasError ? '500' : undefined
        });
        setState(hasError ? 'error' : 'success');
      },
      randint(1, 5) * 250 + 450
    );

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (state !== 'error') return;
    const audio = new Audio(bsodSoundUrl);
    audio.volume = 1;
    audio.loop = true;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [state]);

  useEffect(() => {
    if (state !== 'success') return;
    const audio = new Audio(accessGrantedSoundUrl);
    audio.volume = 1;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [state]);

  return (
    <div
      className={cn('flex w-full max-w-full flex-1 flex-col justify-center gap-7 font-mono transition-all duration-500', {
        'inset-0 m-0 min-h-screen p-0 text-white': state === 'error' || state === 'success',
        'bg-[#000000]': state === 'loading',
        'bg-[#8b00aa]': state === 'success',
        'bg-[#0000AA]': state === 'error'
      })}
    >
      <div
        className={cn('my-8 flex flex-col items-center space-y-4', {
          'my-0 min-h-screen justify-center px-16 py-12 tracking-wider max-sm:px-2 max-sm:py-2': state === 'error' || state === 'success'
        })}
        id={`content-${state}`}
      >
        {state === 'loading' && (
          <>
            <Loader />
            <img className="mt-8 h-auto w-80 select-none max-sm:hidden" src={sausageMonsterUrl} alt="Sausage Monster" draggable={false} />
          </>
        )}
        <div className={cn({ hidden: state !== 'error' }, 'w-full max-w-4xl space-y-6')}>
          <DisapprovedVisitorGetOutPage />
        </div>
        <div className={cn({ hidden: state !== 'success' }, 'w-full')}>
          <ApprovedVisitorWelcomePage />
        </div>
      </div>
      {state === 'loading' && <LoaderFooter />}
    </div>
  );
};

export default DonkeySausageEaterDetector;
