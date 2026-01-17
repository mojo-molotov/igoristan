import { useEffect, useState } from 'react';

interface BibleVerse {
  reference: string;
  text: string;
}

const bibleVerses = [
  { text: 'Let your light shine before others, that they may see your good deeds.', reference: 'Matthew 5:16' },
  { text: 'Whatever you do, work at it with all your heart, as working for the Lord.', reference: 'Colossians 3:23' },
  { text: 'Be still, and know that I am God.', reference: 'Psalm 46:10' },
  { text: 'The Lord is my shepherd; I shall not want.', reference: 'Psalm 23:1' },
  { text: 'I can do all things through Christ who strengthens me.', reference: 'Philippians 4:13' },
  { text: 'Trust in the Lord with all your heart and lean not on your own understanding.', reference: 'Proverbs 3:5' },
  { text: 'For God so loved the world that he gave his one and only Son.', reference: 'John 3:16' },
  { text: 'The Lord is my light and my salvation; whom shall I fear?', reference: 'Psalm 27:1' },
  { text: 'Love is patient, love is kind. It does not envy, it does not boast.', reference: '1 Corinthians 13:4' },
  { text: 'Ask and it will be given to you; seek and you will find.', reference: 'Matthew 7:7' },
  {
    text: 'Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God.',
    reference: 'Philippians 4:6'
  },
  { text: 'The joy of the Lord is your strength.', reference: 'Nehemiah 8:10' },
  { text: 'Cast all your anxiety on him because he cares for you.', reference: '1 Peter 5:7' },
  { text: 'Be strong and courageous. Do not be afraid; do not be discouraged.', reference: 'Joshua 1:9' },
  { text: 'The Lord bless you and keep you; the Lord make his face shine on you.', reference: 'Numbers 6:24-25' },
  { text: 'In all things God works for the good of those who love him.', reference: 'Romans 8:28' },
  { text: 'Rejoice always, pray continually, give thanks in all circumstances.', reference: '1 Thessalonians 5:16-18' },
  { text: 'Peace I leave with you; my peace I give you.', reference: 'John 14:27' },
  { text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.', reference: 'Psalm 34:18' },
  { text: 'Create in me a pure heart, O God, and renew a steadfast spirit within me.', reference: 'Psalm 51:10' }
] as const satisfies BibleVerse[];

const RandomBibleVerse = () => {
  const [currentVerse, setCurrentVerse] = useState<BibleVerse | null>(null);

  useEffect(() => {
    setCurrentVerse(bibleVerses[Math.floor(Math.random() * bibleVerses.length)]);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentVerse && (
        <div className="h-fit rounded-2xl bg-black/40 px-6 py-4">
          <blockquote className="relative">
            <div className="absolute -top-2 -left-4 font-serif text-6xl leading-none text-amber-300 select-none">"</div>
            <p className="px-8 text-center font-serif text-xl leading-relaxed text-white/90 italic drop-shadow-lg md:text-2xl">{currentVerse.text}</p>
            <div className="absolute -right-4 -bottom-6 font-serif text-6xl leading-none text-amber-300 select-none">"</div>
          </blockquote>
          <p className="mt-8 text-center font-serif text-sm tracking-wider text-amber-200/80">— {currentVerse.reference}</p>
        </div>
      )}
    </>
  );
};

export default RandomBibleVerse;
