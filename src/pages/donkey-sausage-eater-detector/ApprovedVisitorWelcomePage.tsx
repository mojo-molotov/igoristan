import { useEffect, useState } from 'react';

import useTypewriter from '@/hooks/useTypewriter';
import BackToHome from '@/components/BackToHome';

import welcomeGifUrl from '../../../assets/gifs/welcome.gif';

const ApprovedVisitorWelcomePage = () => {
  const [step, setStep] = useState(0);
  const [corsitudeLevel] = useState(Math.floor(Math.random() * 15) + 85);
  const [currentYear] = useState(new Date().getFullYear());

  const [daysSinceInvasion] = useState(() => {
    const invasionDate = Date.UTC(1942, 10, 11);
    const today = Date.UTC(2026, 0, 17);
    return Math.floor((today - invasionDate) / (1000 * 60 * 60 * 24));
  });

  const welcome = useTypewriter('CORSICAN SECURITY SYSTEM', 30, step >= 0);
  const scanning = useTypewriter('Scanning... Analyzing geographical origin...', 25, step >= 1 && welcome.isComplete);
  const verification = useTypewriter('Verifying identity...', 25, step >= 2 && scanning.isComplete);
  const validated = useTypewriter('Non-Sicilian detected ✓', 25, step >= 3 && verification.isComplete);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => setStep(3), 4500),
      setTimeout(() => setStep(4), 6000)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full border-4 border-green-400 bg-black p-8 font-mono text-green-400 shadow-2xl">
      <div className="space-y-4">
        <div className="border-b-2 border-green-400 pb-4">
          <p className="text-2xl font-bold tracking-wider">
            {welcome.displayedText}
            {!welcome.isComplete && <span className="animate-pulse">█</span>}
          </p>
          <p className="mt-2 text-xs opacity-70">Powered by Napoleon Bonaparte Imperial Defense Grid</p>
        </div>

        {welcome.isComplete && (
          <div className="space-y-3 py-4">
            <p className="text-lg">
              {scanning.displayedText}
              {!scanning.isComplete && <span className="animate-pulse">█</span>}
            </p>

            {step >= 2 && (
              <p className="pt-4 text-lg">
                {verification.displayedText}
                {!verification.isComplete && <span className="animate-pulse">█</span>}
              </p>
            )}

            {verification.isComplete && step >= 3 && (
              <div className="space-y-2 pl-4 duration-300">
                <p className="text-sm">
                  ► Origin: <span className="text-yellow-400">NOT IN SICILY</span>
                </p>
                <p className="text-sm">
                  ► Donkey sausage consumption: <span className="text-yellow-400">0%</span>
                </p>
              </div>
            )}

            {step >= 3 && (
              <div className="pt-4">
                <p className="text-xl font-bold text-green-400">
                  {validated.displayedText}
                  {!validated.isComplete && <span className="animate-pulse">█</span>}
                </p>
              </div>
            )}
          </div>
        )}

        {step >= 4 && validated.isComplete && (
          <div className="animate-fade-in space-y-6 border-t-2 border-green-400 pt-6 duration-500">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="border border-green-400 bg-green-900/30 p-4">
                <p className="text-xs uppercase opacity-70">Corsitude Level</p>
                <p className="mt-2 text-3xl font-bold">{corsitudeLevel}%</p>
                <div className="mt-2 h-2 w-full border border-green-400 bg-black">
                  <div className="h-full bg-green-400 transition-all duration-1000" style={{ width: `${corsitudeLevel}%` }} />
                </div>
              </div>

              <div className="border border-green-400 bg-green-900/30 p-4">
                <p className="text-xs uppercase opacity-70">Days Since Invasion</p>
                <p className="mt-2 text-3xl font-bold">{daysSinceInvasion}</p>
                <p className="mt-2 text-xs opacity-50">Last: Italian occupation</p>
              </div>
            </div>

            <div className="space-y-3 border border-green-400 bg-green-900/20 p-6 text-center">
              <p className="text-lg font-bold sm:hidden">ACCESS GRANTED</p>
              <p className="text-lg font-bold max-sm:hidden">╔═══ ACCESS GRANTED ═══╗</p>
              <p className="text-sm opacity-90">Welcome, non-Sicilian visitor!</p>

              <img
                className="mx-auto h-32 w-fit border-4 border-purple-500 object-cover shadow-2xl max-sm:hidden"
                src={welcomeGifUrl}
                alt="Welcome"
              />

              <div className="pt-4">
                <BackToHome className="inline-block border-green-400 bg-green-400 px-6 py-3 font-bold text-black transition-colors hover:bg-green-500" />
              </div>
            </div>

            <div className="border-t border-green-400/30 pt-4 text-center text-xs opacity-50">
              <p>CORSICAN DEFENSE MATRIX © {currentYear}</p>
              <p>Protecting Corsica from donkey sausage eaters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedVisitorWelcomePage;
