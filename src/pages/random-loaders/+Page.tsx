import RandomLoader from '@/components/RandomLoader';
import Main from '@/fragments/Main';

const RandomLoaders = () => {
  const numberOfLoaders = 64;

  return (
    <Main className="bg-gray-100 p-8">
      <section className="mt-2">
        <h1 className="mb-2 text-center text-4xl font-extrabold text-gray-900">Hello world</h1>

        <div className="mt-10 flex flex-wrap-reverse justify-center gap-4">
          {Array.from({ length: numberOfLoaders }, (_, i) => (
            <div className="h-25 w-42.5" key={i}>
              <RandomLoader id={`${i + 1}`} />
            </div>
          ))}
        </div>
      </section>
    </Main>
  );
};

export default RandomLoaders;
