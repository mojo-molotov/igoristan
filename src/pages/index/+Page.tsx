import Main from '@/fragments/Main';
import BRAND from '@/config/brand';
import H1 from '@/fragments/H1';

function Home() {
  return (
    <Main className="justify-center">
      <section className="my-8 flex flex-col items-center space-y-4" id="content">
        <H1 className="text-center text-4xl font-extrabold md:text-6xl lg:text-7xl">{BRAND}</H1>
      </section>
    </Main>
  );
}

export default Home;
