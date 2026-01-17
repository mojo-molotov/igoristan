import type { FunctionComponent } from 'react';

import ROUTES from '@/config/routes';
import BRAND from '@/config/brand';
import { cn } from '@/lib/utils';

import Link from './Link';

interface BackToHomeProps {
  className?: string;
}

const BackToHome: FunctionComponent<BackToHomeProps> = ({ className }) => (
  <Link className={cn('mx-auto w-fit text-xl no-underline', className)} href={ROUTES.HOME}>
    ← Back to {BRAND}
  </Link>
);

export default BackToHome;
