import { useAutoPlayAudio } from '@/hooks/useAutoplayAudio';
import { pickRandom } from '@/lib/pickRandom';
import ROUTES from '@/config/routes';
import Link from '@/components/Link';
import Main from '@/fragments/Main';
import BRAND from '@/config/brand';
import H1 from '@/fragments/H1';

import abstractRoundRoundGifUrl from '../../../assets/gifs/abstract-round-round.gif';
import welcomeHomepageAnimationUrl from '../../../assets/gifs/homepage-welcome.gif';
import starRoundRoundGifUrl from '../../../assets/gifs/star-round-round.gif';
import rainbowBallonGifUrl from '../../../assets/gifs/rainbow-balloon.gif';
import angelusSoundUrl from '../../../assets/sounds/angelus-jerusalem.ogg';
import flyingAngelGifUrl from '../../../assets/gifs/flying-angel.gif';
import tiledStarsGifUrl from '../../../assets/gifs/tiled-stars.gif';
import welcomeGifUrl from '../../../assets/gifs/welcome.gif';
import bellGifUrl from '../../../assets/gifs/bell.gif';

const links = [
  {
    href: ROUTES.RANDOM_LOADERS,
    label: 'Random loaders'
  },
  {
    href: ROUTES.SACRED_UPLOAD,
    label: 'Sacred upload'
  },
  {
    href: ROUTES.DASHBOARD,
    label: 'Dashboard'
  },
  {
    href: ROUTES.CORSICAMON,
    label: 'Corsicamon'
  },
  {
    href: ROUTES.RANDOM_ERROR,
    label: 'Random Error'
  },
  {
    href: ROUTES.CHAOTIC_FORM,
    label: 'Chaotic form'
  },
  {
    href: ROUTES.MADNESS,
    label: 'Madness'
  },
  {
    href: ROUTES.DONKEY_SAUSAGE_DETECTOR,
    label: 'Donkey Sausage Detector'
  }
] as const;

const balloons = Array.from({ length: 25 }, (_, i) => ({
  animationDuration: `${Math.random() * 10 + 8}s`,
  translateX: `${Math.random() * 200 - 100}px`,
  rotation: `${Math.random() * 720 - 360}deg`,
  animationDelay: `${Math.random() * 5}s`,
  size: `${Math.random() * 60 + 60}px`,
  left: `${Math.random() * 100}%`,
  id: i
}));

const balloonsGifs = [rainbowBallonGifUrl, starRoundRoundGifUrl, flyingAngelGifUrl, bellGifUrl] as const;

const Home = () => {
  const audioRef = useAutoPlayAudio({
    volume: 0.05
  });

  return (
    <>
      <style>{`
      @keyframes float-0 {
        0% {
          transform: translateY(100vh) translateX(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-120vh) translateX(var(--translate-x)) rotate(var(--rotation));
          opacity: 0;
        }
      }
      @keyframes float-1 {
        0% {
          transform: translateY(100vh) translateX(0) rotate(0deg) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        50% {
          transform: translateY(-60vh) translateX(calc(var(--translate-x) * 0.5)) rotate(calc(var(--rotation) * 0.5)) scale(1.2);
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-120vh) translateX(var(--translate-x)) rotate(var(--rotation)) scale(0.8);
          opacity: 0;
        }
      }
      @keyframes float-2 {
        0% {
          transform: translateY(100vh) translateX(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        30% {
          transform: translateY(-40vh) translateX(calc(var(--translate-x) * -0.3)) rotate(calc(var(--rotation) * 0.3));
        }
        70% {
          transform: translateY(-80vh) translateX(calc(var(--translate-x) * 1.2)) rotate(calc(var(--rotation) * 0.7));
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-120vh) translateX(var(--translate-x)) rotate(var(--rotation));
          opacity: 0;
        }
      }
      .floating-balloon {
        animation: var(--animation-name) linear infinite;
        pointer-events: none;
      }
    `}</style>

      <div
        style={{
          backgroundImage: `url(${tiledStarsGifUrl})`,
          backgroundRepeat: 'repeat',
          filter: 'brightness(0.4)',
          backgroundColor: '#000',
          backgroundSize: 'auto'
        }}
        className="fixed inset-0 -z-10 bg-cover bg-center"
      />

      {balloons.map((balloon) => (
        <img
          style={
            {
              '--animation-name': `float-${balloon.id % 3}`,
              animationDuration: balloon.animationDuration,
              animationDelay: balloon.animationDelay,
              '--translate-x': balloon.translateX,
              '--rotation': balloon.rotation,
              width: balloon.size,
              left: balloon.left,
              height: 'auto',
              bottom: 0
            } as React.CSSProperties
          }
          className="floating-balloon fixed -z-5"
          src={pickRandom(balloonsGifs)}
          alt="Balloon icon"
          key={balloon.id}
        />
      ))}

      <Main className="justify-center">
        <section className="my-8 flex flex-col items-center space-y-4" id="content">
          <H1 className="text-center text-4xl font-extrabold text-white md:text-6xl lg:text-7xl">{BRAND}</H1>
          <a href="https://rutube.ru/video/10c208b1ae943e5f9efd3a795c856f8a/" rel="noopener noreferrer nofollow" target="_blank">
            <img className="rounded-2xl rounded-tr-xs rounded-bl-xs" src={welcomeHomepageAnimationUrl} alt="Welcome animation" />
          </a>
          <div className="flex w-full max-w-sm flex-col space-y-4">
            {links.map((link) => (
              <Link
                className="rounded-xl bg-white px-6 py-4 text-center text-lg font-semibold text-black transition delay-150 duration-1000 hover:scale-[1.02] hover:bg-neutral-800 hover:text-white hover:delay-75 hover:duration-200"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a href="https://rutube.ru/video/a6c7526d690cb841b8096c86a50a6cd5/" rel="noopener noreferrer nofollow" target="_blank">
            <img className="w-[30vw] min-w-72" alt="Welcome animation" src={welcomeGifUrl} />
          </a>

          <audio
            className="mx-auto mb-12 w-[20vw] min-w-[384px] rounded-md border-2 border-amber-600 p-2"
            src={angelusSoundUrl}
            ref={audioRef}
            controls
            loop
          />

          <a href="https://rutube.ru/video/5eabee68593e50f2415e98d802a90dcd/" rel="noopener noreferrer nofollow" target="_blank">
            <img src={abstractRoundRoundGifUrl} alt="Abstract animation" className="mt-4" />
          </a>
        </section>
      </Main>
    </>
  );
};

export default Home;
