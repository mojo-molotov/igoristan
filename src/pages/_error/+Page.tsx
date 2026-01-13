import { usePageContext } from 'vike-react/usePageContext';
import { useEffect } from 'react';

import { formatPageTitle } from '@/lib/formatters';
import { Link } from '@/components/Link';
import ROUTES from '@/config/routes';
import Main from '@/fragments/Main';
import BRAND from '@/config/brand';
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

          <Link className="mx-auto w-fit py-6 text-xl no-underline" href={ROUTES.HOME}>
            ← Back to {BRAND}
          </Link>
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
