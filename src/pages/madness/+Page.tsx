import type { NrRange } from 'ts-number-range';

import { usePageContext } from 'vike-react/usePageContext';
import { useEffect, useState } from 'react';

import { randint } from '@/lib/randint';

import ThisIsBastia, { ThisIsBastiaFooter } from './stories/ThisIsBastia';
import Cors, { CorsFooter } from './stories/Cors';

const [MIN, MAX] = [1, 5] as const;

const getRandomNumber = () => randint(MIN, MAX) as NRange;
const isInRange = (n: number): n is NRange => MIN <= n && n <= MAX;

const RandomPage = () => {
  const pageContext = usePageContext();
  const [state, setState] = useState<'computing' | 'computed'>('computing');
  const [randomNumber, setRandomNumber] = useState<NRange | null>(null);

  useEffect(() => {
    const parsedFigatelluParam = parseInt(pageContext.urlParsed.search.figatellu);
    const n = isInRange(parsedFigatelluParam) ? parsedFigatelluParam : getRandomNumber();

    setRandomNumber(n);
    setState('computed');
  }, [pageContext.urlParsed.search.figatellu]);

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        {(randomNumber === 1 && <Cors />) || (randomNumber === 2 && <ThisIsBastia />) || (
          <section className="my-8 flex flex-col items-center space-y-4">
            <div className={state !== 'computed' ? 'hidden' : 'text-center'}>
              <div className="animate-fade-in rounded-2xl border-4 border-indigo-500 bg-white p-12 shadow-2xl">
                <h1 className="mb-4 text-9xl font-extrabold text-indigo-600">{randomNumber}</h1>
              </div>
            </div>
          </section>
        )}
      </main>
      {(randomNumber === 1 && <CorsFooter />) || (randomNumber === 2 && <ThisIsBastiaFooter />)}
    </>
  );
};

export default RandomPage;

type NRange = NrRange<typeof MIN, typeof MAX> | typeof MAX;
