import { useEffect, useState } from 'react';

import { formatPageTitle } from '@/lib/formatters';
import { randint } from '@/lib/randint';
import Main from '@/fragments/Main';
import { cn } from '@/lib/utils';

import accessGrantedSoundUrl from '../../../assets/sounds/access-granted.ogg';
import bsodSoundUrl from '../../../assets/sounds/horrible-freeze-sound.ogg';
import DisapprovedVisitorGetOutPage from './DisapprovedVisitorGetOutPage';
import ApprovedVisitorWelcomePage from './ApprovedVisitorWelcomePage';
import { ERROR_PAGE_TITLE, PAGE_TITLE } from './constants';
import Loader from './Loader';

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
    <Main
      className={cn('justify-center font-mono transition-all duration-500', {
        'inset-0 m-0 min-h-screen p-0 text-white': state === 'error' || state === 'success',
        'bg-[#000000]': state === 'loading',
        'bg-[#8b00aa]': state === 'success',
        'bg-[#0000AA]': state === 'error'
      })}
    >
      <section
        className={cn('my-8 flex flex-col items-center space-y-4', {
          'my-0 min-h-screen justify-center px-16 py-12 tracking-wider': state === 'error' || state === 'success'
        })}
        id={`content-${state === 'error' ? 'error' : state === 'loading' ? 'loading' : 'success'}`}
      >
        {state === 'loading' && <Loader />}

        <div className={cn({ hidden: state !== 'error' }, 'w-full max-w-4xl space-y-6')}>
          <DisapprovedVisitorGetOutPage />
        </div>

        <div className={cn({ hidden: state !== 'success' }, 'w-full')}>
          <ApprovedVisitorWelcomePage />
        </div>
      </section>
    </Main>
  );
};

export default DonkeySausageEaterDetector;
