import { usePageContext } from 'vike-react/usePageContext';
import { useEffect } from 'react';

import { formatPageTitle } from '@/lib/formatters';
import BackToHome from '@/components/BackToHome';
import Main from '@/fragments/Main';
import H1 from '@/fragments/H1';

export default function Page() {
  const { is404 } = usePageContext();

  useEffect(() => {
    if (is404) document.title = formatPageTitle({ pageTitle: '404' });
  }, [is404]);

  if (is404) {
    return (
      <Main className="justify-center text-center">
        <section className="mt-7 space-y-4" id="404">
          <div>
            <H1 className="text-4xl">404</H1>
          </div>

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
        </div>

        <p>Something went wrong.</p>
      </section>
    </Main>
  );
}
