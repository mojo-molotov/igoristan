import { useEffect, useState } from 'react';

import BackToSicily from '@/components/BackToSicily';
import useTypewriter from '@/hooks/useTypewriter';
import ErrorCode from '@/components/ErrorCode';

import napoleonShadowUrl from '../../../assets/images/napoleon-shadow.png';

const DisapprovedVisitorGetOutPage = () => {
  const [showSection, setShowSection] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowSection(1), 4000),
      setTimeout(() => setShowSection(2), 4250),
      setTimeout(() => setShowSection(3), 4500),
      setTimeout(() => setShowSection(4), 4750),
      setTimeout(() => setShowSection(5), 6500),
      setTimeout(() => setShowSection(6), 7000)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const mainError = useTypewriter('A fatal exception 0xD07K3Y has occurred at 0028:C01251CAF00D in VXD CORSICA_WATCHDOG(01) + 00000A7E.', 15);

  const termination = useTypewriter('The current application will be terminated.', 15, mainError.isComplete);

  return (
    <>
      <main>
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
                <p className="font-mono text-sm uppercase">* Corsican_watchdog_timeout</p>
                <p className="font-mono text-sm uppercase">* Donkey_sausage_eater_detected</p>
                <p className="font-mono text-sm uppercase">* Corsican_intrusion_violation</p>
                <p className="font-mono text-sm uppercase">* Go_back_to_your_country</p>
                <p className="font-mono text-sm uppercase">* Napoleon_disapproves</p>
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
              <p>
                *** <span className="uppercase">Stop</span>: 0x0000001A (0x8BADF00D)
              </p>
              <p>
                *** <span className="uppercase">Corsica_watchdog.sys</span> - Address C01251CAF00D base at C0000000, DateStamp 0000C012E
              </p>
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
      </main>

      {showSection >= 6 && (
        <footer className="mt-12 animate-fade-in border-t border-white pt-4 text-center text-xs opacity-60 duration-500">
          <p>CORSICA™ Protection System - Powered by Napoleon Bonaparte Imperial Firewall</p>
          <p className="mt-1">© Corsica Empire. All rights reserved to Corsicans only.</p>
        </footer>
      )}
    </>
  );
};

export default DisapprovedVisitorGetOutPage;
