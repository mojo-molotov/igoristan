import ROUTES from '@/config/routes';
import BRAND from '@/config/brand';

import { Link } from './Link';

export default function BackToHome() {
  return (
    <Link className="mx-auto w-fit py-6 text-xl no-underline" href={ROUTES.HOME}>
      ← Back to {BRAND}
    </Link>
  );
}
