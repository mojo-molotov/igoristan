import { useEffect, useState } from 'react';

import BackToSicily from '@/components/BackToSicily';
import { formatPageTitle } from '@/lib/formatters';
import useTypewriter from '@/hooks/useTypewriter';
import BackToHome from '@/components/BackToHome';
import ErrorCode from '@/components/ErrorCode';
import { randint } from '@/lib/randint';
import Main from '@/fragments/Main';
import { cn } from '@/lib/utils';

import welcomeGifUrl from '../../../assets/gifs/welcome.gif';
import { ERROR_PAGE_TITLE, PAGE_TITLE } from './constants';

const DonkeySausageEaterDetector = () => {
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const [showSection, setShowSection] = useState(0);

  const mainError = useTypewriter('A fatal exception 0xD07K3Y has occurred at 0028:C001CAFE in VXD CORSICA(01) + 00000A7E.', 15, state === 'error');

  const termination = useTypewriter('The current application will be terminated.', 15, state === 'error' && mainError.isComplete);

  useEffect(() => {
    const hasError = Math.random() < 0.3;
    const timeoutId = setTimeout(
      () => {
        document.title = formatPageTitle({
          pageTitle: hasError ? ERROR_PAGE_TITLE : PAGE_TITLE
        });
        setState(hasError ? 'error' : 'success');
      },
      randint(1, 5) * 250
    );
    return () => clearTimeout(timeoutId);
  }, []);

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
      style={
        state === 'error'
          ? {
              fontFamily: 'Consolas, "Courier New", monospace',
              overflow: 'hidden',
              position: 'fixed',
              inset: 0
            }
          : {}
      }
      className={cn('justify-center transition-all duration-500', state === 'error' && 'm-0 min-h-screen bg-[#0000AA] p-0 text-white')}
    >
      <section
        className={cn('my-8 flex flex-col items-center space-y-4', state === 'error' && 'my-0 h-screen justify-center px-16 py-12')}
        id={`content-${state === 'error' ? 'error' : state === 'loading' ? 'loading' : 'success'}`}
      >
        <div className={cn({ hidden: state !== 'loading' }, 'aesthetic-windows-95-loader')}>
          <div />
          <div />
          <div />
        </div>

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
              <div className="animate-in fade-in my-6 space-y-2 border-l-4 border-white pl-4 duration-300">
                <p className="font-mono text-sm">* DONKEY_SAUSAGE_EATER_DETECTED</p>
                <p className="font-mono text-sm">* CORSICAN_INTRUSION_VIOLATION</p>
                <p className="font-mono text-sm">* GO_BACK_TO_YOUR_COUNTRY</p>
                <p className="font-mono text-sm">* NAPOLEON_DISAPPROVES</p>
              </div>
            )}

            {showSection >= 2 && (
              <div className="animate-in fade-in mt-6 space-y-1 bg-[#000080] p-4 font-mono text-xs duration-300">
                <p>*** STOP: 0x0000001A (0xC0DE1337, 0xDEADBEEF, 0xCAFEBABE, 0x8BADF00D)</p>
                <p>*** CORSICA.SYS - Address C001CAFE base at C0000000, DateStamp 0000C012E</p>
                <p className="mt-2 opacity-75">Beginning dump of physical memory</p>
                <p className="opacity-75">Physical memory dump complete.</p>
                <p className="mt-2 opacity-75">Go back to your country for support.</p>
              </div>
            )}

            {showSection >= 3 && (
              <div className="animate-in fade-in mt-6 space-y-2 text-sm duration-300">
                <p>* Quit this website immediately.</p>
              </div>
            )}

            {showSection >= 4 && (
              <div className="animate-in fade-in mt-8 flex items-center justify-between border-t border-white pt-4 duration-300">
                <ErrorCode className="text-white">
                  <span className="font-mono text-2xl">0xC012E_5AUC1550N</span>
                </ErrorCode>
                <span className="font-mono text-xs opacity-75">KERNEL_SECURITY_CHECK_FAILURE</span>
              </div>
            )}
          </div>

          {showSection >= 5 && (
            <div className="mt-8 animate-pulse">
              <BackToSicily />
            </div>
          )}

          {showSection >= 6 && (
            <div className="animate-in fade-in mt-12 border-t border-white pt-4 text-center text-xs opacity-60 duration-500">
              <p>CORSICA™ Protection System - Powered by Napoleon Bonapart Imperial Firewall</p>
              <p className="mt-1">© Corsica Empire. All rights reserved to Corsicans only.</p>
            </div>
          )}
        </div>

        <div className={cn({ hidden: state !== 'success' }, 'text-center')}>
          <img className="h-64 w-fit border-4 border-purple-500 object-cover shadow-2xl" src={welcomeGifUrl} alt="Welcome" />
          <BackToHome />
        </div>
      </section>
    </Main>
  );
};

export default DonkeySausageEaterDetector;
