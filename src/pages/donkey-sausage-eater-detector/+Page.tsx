import { useEffect, useState } from 'react';

import { useForceRemount } from '@/hooks/useForceRemountKey';
import BackToSicily from '@/components/BackToSicily';
import { formatPageTitle } from '@/lib/formatters';
import BackToHome from '@/components/BackToHome';
import ErrorCode from '@/components/ErrorCode';
import Main from '@/fragments/Main';
import { cn } from '@/lib/utils';
import H1 from '@/fragments/H1';
import H2 from '@/fragments/H2';

import welcomeGifUrl from '../../../assets/gifs/welcome.gif';
import { ERROR_CODE, PAGE_TITLE } from './constants';

const RandomError = () => {
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const remountKey = useForceRemount();

  useEffect(() => {
    const hasError = Math.random() < 0.3;

    const timeoutId = setTimeout(() => {
      document.title = formatPageTitle({
        pageTitle: hasError ? ERROR_CODE : PAGE_TITLE
      });
      setState(hasError ? 'error' : 'success');
    }, 800);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Main className="justify-center" key={remountKey}>
      <section
        id={`content-${state === 'error' ? 'error' : state === 'loading' ? 'loading' : 'success'}`}
        className="my-8 flex flex-col items-center space-y-4"
      >
        <div className={cn({ hidden: state !== 'loading' }, 'text-center')}>
          <H1 className="animate-ping text-4xl font-extrabold">Loading...</H1>
        </div>

        <div className={cn({ hidden: state !== 'error' }, 'text-center')}>
          <h1 className="text-4xl">Wow!</h1>
          <ErrorCode asChild>
            <H2>{ERROR_CODE}</H2>
          </ErrorCode>
          <h2 className="mt-4 text-3xl font-bold">Internal Server Error</h2>
          <p className="mt-2 text-gray-600">
            You donkey sausage eater.
            <br />
            The Empire casts you out into darkness for your donkey sausage sins!
          </p>
          <BackToSicily />
        </div>

        <div className={cn({ hidden: state !== 'success' }, 'text-center')}>
          <img className="h-64 w-fit border-4 border-purple-500 object-cover shadow-2xl" src={welcomeGifUrl} alt="Welcome" />
          <BackToHome />
        </div>
      </section>
    </Main>
  );
};

export default RandomError;
