import { useEffect, useState } from 'react';

import BackToSicily from '@/components/BackToSicily';
import { formatPageTitle } from '@/lib/formatters';
import useTypewriter from '@/hooks/useTypewriter';
import ErrorCode from '@/components/ErrorCode';
import { randint } from '@/lib/randint';
import Main from '@/fragments/Main';
import { cn } from '@/lib/utils';

import accessGrantedSoundUrl from '../../../assets/sounds/access-granted.ogg';
import bsodSoundUrl from '../../../assets/sounds/horrible-freeze-sound.ogg';
import napoleonShadowUrl from '../../../assets/images/napoleon-shadow.png';
import ApprovedVisitorWelcomePage from './ApprovedVisitorWelcomePage';
import { ERROR_PAGE_TITLE, PAGE_TITLE } from './constants';

const DonkeySausageEaterDetector = () => {
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const [showSection, setShowSection] = useState(0);

  const mainError = useTypewriter(
    'A fatal exception 0xD07K3Y has occurred at 0028:C01251CAF00D in VXD CORSICA_WATCHDOG(01) + 00000A7E.',
    15,
    state === 'error'
  );

  const termination = useTypewriter('The current application will be terminated.', 15, state === 'error' && mainError.isComplete);

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

  useEffect(() => {
    if (state !== 'error') return;

    const timers = [
      setTimeout(() => setShowSection(1), 4000),
      setTimeout(() => setShowSection(2), 4250),
      setTimeout(() => setShowSection(3), 4500),
      setTimeout(() => setShowSection(4), 4750),
      setTimeout(() => setShowSection(5), 6500),
      setTimeout(() => setShowSection(6), 7000)
    ];

    return () => timers.forEach(clearTimeout);
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
        <span
          className={cn({ hidden: state !== 'loading' }, 'aesthetic-effect-text-glitch text-center font-mono text-5xl')}
          data-glitch="PLEASE WAIT"
          aria-label="Loading"
        >
          PLEASE WAIT
        </span>
        <div className={cn({ hidden: state !== 'loading' }, 'aesthetic-windows-95-loader')}>
          <div />
          <div />
          <div />
        </div>

        {state === 'loading' && (
          <div className="fixed right-0 bottom-0 left-0 border-t-2 border-gray-700 bg-black py-4 text-center">
            <p className="font-mono text-sm tracking-widest text-gray-400">CORSICAN SYSTEMS™</p>
            <p className="mt-1 font-mono text-xs text-gray-600">Starting services...</p>
          </div>
        )}

        <div className={cn({ hidden: state !== 'error' }, 'w-full max-w-4xl space-y-6')}>
          <div className="space-y-4 border-t-4 border-white pt-6">
            <p className="text-xl font-bold tracking-wide">
              {mainError.displayedText}
              {!mainError.isComplete && <span className="animate-pulse">_</span>}
            </p>

            {mainError.isComplete && (
              <p className="text-lg">
                {termination.displayedText}
                {!termination.isComplete && <span className="animate-pulse">_</span>}
              </p>
            )}

            {showSection >= 1 && (
              <div className="my-6 flex gap-4 duration-300">
                <div className="flex-1 space-y-2 border-l-4 border-white pl-4">
                  <p className="font-mono text-sm">* CORSICAN_WATCHDOG_TIMEOUT</p>
                  <p className="font-mono text-sm">* DONKEY_SAUSAGE_EATER_DETECTED</p>
                  <p className="font-mono text-sm">* CORSICAN_INTRUSION_VIOLATION</p>
                  <p className="font-mono text-sm">* GO_BACK_TO_YOUR_COUNTRY</p>
                  <p className="font-mono text-sm">* NAPOLEON_DISAPPROVES</p>
                </div>
                <div
                  className="relative top-7 hidden h-32 w-32 bg-contain bg-bottom bg-no-repeat sm:block"
                  style={{ backgroundImage: `url(${napoleonShadowUrl})` }}
                  aria-hidden="true"
                />
              </div>
            )}

            {showSection >= 2 && (
              <div className="mt-6 space-y-1 bg-[#000080] p-4 font-mono text-xs duration-300">
                <p>*** STOP: 0x0000001A (0x8BADF00D)</p>
                <p>*** CORSICA_WATCHDOG.SYS - Address C01251CAF00D base at C0000000, DateStamp 0000C012E</p>
                <p className="mt-2 opacity-75">Beginning dump of physical memory</p>
                <p className="opacity-75">Physical memory dump complete.</p>
                <p className="mt-2 opacity-75">Go back to your country for support.</p>
              </div>
            )}

            {showSection >= 3 && (
              <div className="mt-6 space-y-2 text-sm tracking-[0.3em] duration-300">
                <p className="uppercase">* You donkey sausage eater</p>
                <p className="uppercase">* Quit this website immediately</p>
              </div>
            )}

            {showSection >= 4 && (
              <div className="mt-8 flex items-center justify-between border-t border-white pt-4 duration-300">
                <ErrorCode className="text-white">
                  <span className="font-mono text-2xl">0xC012E_5AUC1550N</span>
                </ErrorCode>
                <span className="font-mono text-xs opacity-75 max-sm:hidden">WATCHDOG_SECURITY_CHECK_FAILURE</span>
              </div>
            )}
          </div>

          {showSection >= 5 && (
            <div className="mt-8 animate-pulse tracking-widest uppercase">
              <BackToSicily />
            </div>
          )}

          {showSection >= 6 && (
            <div className="mt-12 animate-fade-in border-t border-white pt-4 text-center text-xs opacity-60 duration-500">
              <p>CORSICA™ Protection System - Powered by Napoleon Bonaparte Imperial Firewall</p>
              <p className="mt-1">© Corsica Empire. All rights reserved to Corsicans only.</p>
            </div>
          )}
        </div>

        <div className={cn({ hidden: state !== 'success' }, 'w-full')}>
          <ApprovedVisitorWelcomePage />
        </div>
      </section>
    </Main>
  );
};

export default DonkeySausageEaterDetector;
