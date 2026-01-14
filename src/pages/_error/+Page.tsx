import { usePageContext } from 'vike-react/usePageContext';
import { useEffect } from 'react';

import InternalErrorMsg from '@/components/InternalErrorMsg';
import BackToSicily from '@/components/BackToSicily';
import { formatPageTitle } from '@/lib/formatters';
import BackToHome from '@/components/BackToHome';
import ErrorCode from '@/components/ErrorCode';
import Main from '@/fragments/Main';
import H1 from '@/fragments/H1';
import H2 from '@/fragments/H2';

export default function Page() {
  const pageContext = usePageContext();
  const { is404 } = pageContext;

  const force500 = pageContext.urlParsed.search.figatellu === 'donkey-sausage-is-an-heresy';
  const show404 = is404 && !force500;

  useEffect(() => {
    document.title = show404 ? formatPageTitle({ pageTitle: '404' }) : formatPageTitle({ pageTitle: '500' });
  }, [show404]);

  if (show404) {
    return (
      <Main className="justify-center text-center">
        <section className="mt-7 space-y-4" id="404">
          <ErrorCode>404</ErrorCode>
          <BackToHome />
        </section>
      </Main>
    );
  }

  return (
    <Main className="justify-center text-center">
      <section className="mt-7 space-y-4" id="internal-error">
        <div>
          <H1 className="text-4xl">Internal Error</H1>
          <ErrorCode asChild>
            <H2>500</H2>
          </ErrorCode>
        </div>
        <InternalErrorMsg />
        <BackToSicily />
      </section>
    </Main>
  );
}
