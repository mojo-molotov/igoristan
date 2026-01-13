import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { formatPageTitle } from '@/lib/formatters';
import BackToHome from '@/components/BackToHome';
import Main from '@/fragments/Main';
import { cn } from '@/lib/utils';
import H1 from '@/fragments/H1';

import welcomeGifUrl from '../../../assets/gifs/welcome.gif';
import { ERROR_CODE, PAGE_TITLE } from './constants';

function RandomErrorContent() {
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');

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
    <Main className="justify-center">
      <section
        id={`content-${state === 'error' ? 'error' : state === 'loading' ? 'loading' : 'success'}`}
        className="my-8 flex flex-col items-center space-y-4"
      >
        <div className={cn({ hidden: state !== 'loading' }, 'text-center')}>
          <H1 className="animate-ping text-4xl font-extrabold">Loading...</H1>
        </div>

        <div className={cn({ hidden: state !== 'error' }, 'text-center')}>
          <H1 className="text-9xl font-extrabold text-red-600">{ERROR_CODE}</H1>
          <h2 className="mt-4 text-3xl font-bold">Internal Server Error</h2>
          <p className="mt-2 text-gray-600">The figatellu has escaped from the charcuterie. Please try again later.</p>
          <BackToHome />
        </div>

        <div className={cn({ hidden: state !== 'success' }, 'text-center')}>
          <img className="h-64 w-fit border-4 border-purple-500 object-cover shadow-2xl" src={welcomeGifUrl} alt="Welcome" />
          <BackToHome />
        </div>
      </section>
    </Main>
  );
}

function RandomError() {
  const [mountKey, setMountKey] = useState(uuidv4());

  useEffect(() => {
    // Force a re-render to break Vike's laziness and ensure the page title
    // is always updated, even without the fake loading delay
    setMountKey(uuidv4());
  }, []);

  return <RandomErrorContent key={mountKey} />;
}

export default RandomError;
