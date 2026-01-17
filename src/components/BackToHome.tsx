import type { FunctionComponent } from 'react';

import { Home } from 'lucide-react';

import ROUTES from '@/config/routes';
import BRAND from '@/config/brand';
import { cn } from '@/lib/utils';

import Link from './Link';

interface BackToHomeProps {
  className?: string;
}

const BackToHome: FunctionComponent<BackToHomeProps> = ({ className }) => (
  <Link className={cn('mx-auto w-fit text-xl no-underline', className)} aria-label={`Back to ${BRAND}`} href={ROUTES.HOME}>
    <span className="max-sm:hidden">← Back to {BRAND}</span>
    <Home className="inline-block sm:hidden" aria-hidden="true" size={24} />
  </Link>
);

export default BackToHome;
