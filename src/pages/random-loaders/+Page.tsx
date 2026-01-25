import { useRef } from 'react';

import RandomLoader from '@/components/RandomLoader';
import shuffle from '@/lib/shuffle';
import Main from '@/fragments/Main';

const DECK = [
  '0JjQtNC4INC90LAg0YXRg9C5IQ==',
  '0J/QvtGI0ZHQuyDQvdCw0YXRg9C5IQ==',
  '0JjQtNC4INCyINC20L7Qv9GDIQ==',
  '0J/QuNC30LTQtdGGIQ==',
  '0J7RhdGD0LXRgtGMIQ==',
  '0JHQu9GPIQ==',
  '0IHQsSDRgtCy0L7RjiDQvNCw0YLRjCE=',
  '0KfRkdGA0YIg0L/QvtCx0LXRgNC4IQ==',
  '0KLRiyDQvNC10L3RjyDQtNC+0YHRgtCw0Lsh',
  '0JfQsNC10LHQsNC7IQ==',
  '0J7RgtGK0LXQsdC40YHRjCE=',
  '0J/RgNC+0LLQsNC70LjQstCw0Lkh',
  '0JjQtNC4INC+0YLRgdGO0LTQsCE=',
  '0KHRg9C60LAh',
  '0KPQsdC70Y7QtNC+0Loh',
  '0JzRg9C00LDQuiE=',
  '0JTQvtC70LHQvtGR0LEh',
  '0JTQtdCx0LjQuyE=',
  '0JjQtNC40L7RgiE=',
  '0JTRg9GA0LDQuiE=',
  '0JrQvtC30ZHQuyE=',
  '0KHQstC40L3RjNGPIQ==',
  '0JPQsNC0IQ==',
  '0KLQstCw0YDRjCE=',
  '0KPRgNC+0LQh',
  '0JzRgNCw0LfRjCE=',
  '0J/QsNC00LvQsCE=',
  '0JPQvdC40LTQsCE=',
  '0KXRg9C50LvQviE=',
  '0J/QuNC00L7RgCE=',
  '0LXQsdCw0YLRjCDRgtC10LHRjw==',
  'VGVzdGEgZGkgY2F6enU=',
  'TWFuZ2hqYSBtZXJkYQ==',
  'U29mZmlhbWkgaW4gY3VsdQ==',
  'RmFjY2lhY2NpYQ==',
  'UHVyY2FjY2l1',
  'VmEgZmFuIGN1bG8=',
  'UG9yY3U=',
  'U3VtZXJl',
  'U3VtZXJvbmU=',
  'Q2FuYWNjaXU=',
  'UGlkb2doanU=',
  'WmVjY2E=',
  'TXVsaXp6w7I=',
  'TXV6emEgc2VjY2E=',
  'VmEgw6AgZmF0dGkgbGVnaGpl',
  'VMO5IGJydXNnaQ==',
  'QmF1bGzDsg==',
  'Q2FnaMOo',
  'RmF2YQ==',
  'UHV0dGFuYQ==',
  'UHV0dGFuYWNjaWE=',
  'QmFzdGFyZHU=',
  'UGluenV0dQ==',
  'Q2FjY2FydQ==',
  'QmFiYm9uZQ=='
] as const;

const RandomLoaders = () => {
  const numberOfLoaders = 64;
  const deckRef = useRef<string[]>(shuffle([...DECK]));

  const getNextLoadedLabel = () => {
    if (deckRef.current.length === 0) {
      deckRef.current = shuffle(DECK);
    }

    return deckRef.current.pop()!;
  };

  return (
    <Main className="bg-gray-100 p-8">
      <section className="mt-2">
        <h1 className="mb-2 text-center text-4xl font-extrabold text-gray-900">Kind words with spinners</h1>
        <div className="mt-10 flex flex-wrap justify-center gap-16">
          {Array.from({ length: numberOfLoaders }, (_, i) => (
            <div className="h-25 w-42.5" key={i}>
              <RandomLoader loadedLabel={getNextLoadedLabel()} id={`${i + 1}`} />
            </div>
          ))}
        </div>
      </section>
    </Main>
  );
};

export default RandomLoaders;
