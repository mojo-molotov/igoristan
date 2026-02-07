import ROUTES from '@/config/routes';
import Link from '@/components/Link';
import Main from '@/fragments/Main';
import BRAND from '@/config/brand';
import H1 from '@/fragments/H1';

const links = [
  {
    href: ROUTES.RANDOM_LOADERS,
    label: 'Random loaders'
  },
  {
    href: ROUTES.SACRED_UPLOAD,
    label: 'Sacred upload'
  },
  {
    href: ROUTES.DASHBOARD,
    label: 'Dashboard'
  },
  {
    href: ROUTES.CORSICAMON,
    label: 'Corsicamon'
  },
  {
    href: ROUTES.RANDOM_ERROR,
    label: 'Random Error'
  },
  {
    href: ROUTES.CHAOTIC_FORM,
    label: 'Chaotic form'
  },
  {
    href: ROUTES.MADNESS,
    label: 'Madness'
  },
  {
    href: ROUTES.DONKEY_SAUSAGE_DETECTOR,
    label: 'Donkey Sausage Detector'
  }
] as const;

const Home = () => (
  <Main className="justify-center">
    <section className="my-8 flex flex-col items-center space-y-4" id="content">
      <H1 className="text-center text-4xl font-extrabold md:text-6xl lg:text-7xl">{BRAND}</H1>
      <div className="flex w-full max-w-sm flex-col space-y-4">
        {links.map((link) => (
          <Link
            className="rounded-xl bg-black px-6 py-4 text-center text-lg font-semibold text-white transition hover:scale-[1.02] hover:bg-neutral-800"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  </Main>
);

export default Home;
