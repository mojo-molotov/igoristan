import { useAutoPlayAudio } from '@/hooks/useAutoplayAudio';
import { Button } from '@/components/Button';
import Link from '@/components/Link';
import ROUTES from '@/config/routes';

import thisIsBastiaMemeUrl from '../../../../assets/images/corsican-memes/this-is-bastia.webp';
import iLoveDonkeysMemeUrl from '../../../../assets/images/corsican-memes/i-love-donkeys.jpg';
import thisIsBastiaSongUrl from '../../../../assets/sounds/this-is-bastia.ogg';

const ThisIsBastia = () => {
  const audioRef = useAutoPlayAudio({
    volume: 1
  });

  return (
    <div className="min-h-screen w-full bg-black">
      <div className="mx-auto mt-8 max-w-4xl px-6 pb-12 font-serif text-amber-50">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-6xl font-bold tracking-wider text-red-500 uppercase">This is bastia</h1>
          <p className="text-2xl text-amber-300 italic">A Corsican warning to Sicilian donkey sausage eaters</p>
        </div>

        <audio
          className="mx-auto mb-12 w-full max-w-[80vw] rounded-md border-2 border-amber-600 p-2"
          src={thisIsBastiaSongUrl}
          ref={audioRef}
          controls
          loop
        />

        <section className="mb-12">
          <h2 className="mb-6 border-l-8 border-red-600 pl-6 text-4xl font-bold text-amber-100">The root of wrath</h2>

          <div className="space-y-6 text-xl leading-relaxed">
            <p>
              Long ago, in the proud city of <strong className="text-amber-300">Bastia</strong>, a Sicilian messenger arrived at our gates.
              <br />
              He came bearing gifts of what he called "the finest delicacy in the Mediterranean" — donkey sausage.
            </p>

            <p>
              <span className="text-red-400">"HOW DARE YOU?"</span> spoke the Bastia elder.
            </p>
          </div>
        </section>

        <section className="mb-12 rounded-lg border-4 border-red-600 p-8">
          <div className="space-y-6 text-xl leading-relaxed">
            <p className="mb-6 text-center text-2xl text-amber-200 italic">"This is madness!" said the Sicilian.</p>

            <p className="mb-6 text-center text-5xl font-bold tracking-wide text-red-500 uppercase max-sm:text-3xl">"Madness?"</p>

            <img className="border border-white" src={thisIsBastiaMemeUrl} alt="" />
          </div>
        </section>

        <section className="flex flex-col">
          <h2 className="mb-6 border-l-8 border-amber-600 pl-6 text-4xl font-bold text-amber-100">Why we don't eat donkey sausage</h2>
          <div className="space-y-6 text-xl leading-relaxed">
            <p>
              Corsicans love their donkeys, <strong className="text-red-400">go back to your country</strong>.
            </p>
          </div>
          <img className="mx-auto mt-8 border border-white" src={iLoveDonkeysMemeUrl} alt="" />
          <div className="mt-4 space-y-2">
            <p className="text-center text-xl">
              The donkey is sacred in Corsica. The Sicilian? Not so much.
              <br />
              Sicilians are not welcome here with their donkey-eating habits.
            </p>
            <p className="text-center text-xl">
              Our donkeys are family. They are heritage. They are Corsica.
              <br />
              <span className="font-extrabold text-red-400">We will let no Sicilian invader kidnap our donkeys to eat them!</span>
            </p>
          </div>

          <Button asChild>
            <Link className="mx-auto mt-4 px-8 py-6 text-xl font-bold" href={ROUTES.DONKEY_SAUSAGE_DETECTOR}>
              🔍 Invader detector
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
};

export const ThisIsBastiaFooter = () => (
  <footer className="w-full border-t-4 border-red-600 bg-black/95 py-8">
    <div className="mx-auto max-w-4xl px-6 text-center">
      <p className="mb-2 text-xl text-amber-300/90 uppercase italic">This is Bastia!</p>
      <p className="text-lg text-amber-400/70">Protecting Corsican donkeys since ancient times • Kicking Sicilians into the sea since forever</p>
      <p className="mt-4 text-lg text-amber-500/60">
        🐴 Donkeys are friends, not food
        <br />
        🥾 Sicily not welcome
      </p>
    </div>
  </footer>
);

export default ThisIsBastia;
