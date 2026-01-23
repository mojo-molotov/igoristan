import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

import type { UnionToTuple } from '@/types/utils';

import { pickRandom } from '@/lib/pickRandom';
import { cn } from '@/lib/utils';

import Link from './Link';

const SICILY_CONTENT = {
  'http://bestofsicily.com': [
    '✈️ Go back to Sicilia',
    '✈️ Go back to your 30 centuries of history',
    '✈️ Go taste the Sicilian wine renaissance at home',
    "✈️ Go obey Frederick II's imperial command",
    '✈️ Go admire your Baroque palaces in Sicilia'
  ],
  'http://www.peoplesofsicily.com/women.htm': [
    "✈️ Go read Jacqueline Alio's 224 pages - far away",
    '✈️ Go meet the Saints, Queens and Rebels - in Sicilia',
    '✈️ Go join the sisterhood of conviction - somewhere else'
  ],
  'http://www.jacquelinealio.com/margaret.htm': ['✈️ Go visit Monreale Abbey where you belong', "✈️ Go seek Thomas Becket's blessing in Sicilia"]
} as const;

type SicilyWebsite = UnionToTuple<keyof typeof SICILY_CONTENT>;
const SICILY_WEBSITES = Object.freeze(Object.keys(SICILY_CONTENT)) as SicilyWebsite;

interface BackToSicilyProps {
  className?: string;
}

const BackToSicily: FunctionComponent<BackToSicilyProps> = ({ className }) => {
  const [sicilyWebsite, setSicilyWebsite] = useState<string>(SICILY_WEBSITES[0]);
  const [goAwayMsg, setGoAwayMsg] = useState<string>(SICILY_CONTENT[SICILY_WEBSITES[0]][0]);

  useEffect(() => {
    const website = pickRandom(SICILY_WEBSITES);
    const msg = pickRandom(SICILY_CONTENT[website]);

    setSicilyWebsite(website);
    setGoAwayMsg(msg);
  }, []);

  return (
    <Link className={cn('mx-auto w-fit animate-fade-in text-xl no-underline', className)} href={sicilyWebsite}>
      {goAwayMsg}
    </Link>
  );
};

export default BackToSicily;
