import { usePageContext } from 'vike-react/usePageContext';
import { useEffect, useState } from 'react';

import InternalErrorMsg from '@/components/InternalErrorMsg';
import BackToSicily from '@/components/BackToSicily';
import { formatPageTitle } from '@/lib/formatters';
import BackToHome from '@/components/BackToHome';
import ErrorCode from '@/components/ErrorCode';
import Main from '@/fragments/Main';
import { cn } from '@/lib/utils';
import H1 from '@/fragments/H1';
import H2 from '@/fragments/H2';

export default function Page() {
  const pageContext = usePageContext();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { is404 } = pageContext;

  const force500 = pageContext.urlParsed.search.figatellu === 'donkey-sausage-is-an-heresy';
  const show404 = is404 && !force500;

  const mainClassname = cn('justify-center text-center transition-opacity duration-700', {
    'opacity-100': isMounted,
    'opacity-0': !isMounted
  });

  useEffect(() => {
    document.title = show404 ? formatPageTitle({ errorCode: '404' }) : formatPageTitle({ errorCode: '500' });
    setIsMounted(true);
  }, [show404]);

  if (show404) {
    return (
      <Main className={mainClassname}>
        <section className="mt-7 space-y-4" id="404">
          <ErrorCode>404</ErrorCode>
          <BackToHome />
        </section>
      </Main>
    );
  }

  return (
    <Main className={mainClassname}>
      <section className="mt-7 space-y-4" id="internal-error">
        <div>
          <H1 className="text-4xl">Internal Error</H1>
          <ErrorCode asChild>
            <H2>500</H2>
          </ErrorCode>
        </div>
        <InternalErrorMsg withoutFadeIn />
        <BackToSicily />
      </section>
    </Main>
  );
}
