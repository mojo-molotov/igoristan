import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

import { pickRandom } from '@/lib/pickRandom';
import { cn } from '@/lib/utils';

interface InternalErrorMsgProps {
  className?: string;
}

const texts = [
  'Server exploded from pure disgust.',
  'The Empire casts you out into darkness for your donkey sausage sins!',
  'The apocalypse begins with your cursed click.',
  'The database has collapsed like the Tower of Babel.',
  'The seven seals break open and release error 500.',
  'Sodom and Gomorrah fall anew before your heresy.',
  'Dante reserves a special circle of Hell for your kind.',
  'Icarus flew too close to the sun; you flew too close to the donkey.',
  'Explosive judgment rains down from the Imperial throne.',
  'The Emperor himself has decreed your immediate exile.'
] as const;

const InternalErrorMsg: FunctionComponent<InternalErrorMsgProps> = ({ className }) => {
  const [text, setText] = useState<(typeof texts)[number] | null>(null);

  useEffect(() => {
    setText(pickRandom(texts));
  }, []);

  return (
    <p className={cn('mt-2 text-gray-600', className)}>
      You donkey sausage eater.
      <br />
      {text ? <span className="animate-fade-in">{text}</span> : '\u00A0'}
    </p>
  );
};

export default InternalErrorMsg;
