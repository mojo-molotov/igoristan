import { navigate } from 'vike/client/router';

import { useAutoPlayAudio } from '@/hooks/useAutoplayAudio';
import Loading from '@/components/Loading';
import { useAuth } from '@/hooks/useAuth';
import ROUTES from '@/config/routes';
import Main from '@/fragments/Main';
import H1 from '@/fragments/H1';

import figatelluForeverSongUrl from '../../../../assets/sounds/music/figatellu-forever.mp3';

const DashboardNested = () => {
  const { isAuthenticatedWithMFA, isAuthenticated, isLoading, logout } = useAuth();

  const audioRef = useAutoPlayAudio({
    volume: 1
  });

  if (isLoading) {
    return (
      <Main className="justify-center">
        <div className="flex min-h-100 items-center justify-center">
          <div className="text-center">
            <Loading />
          </div>
        </div>
      </Main>
    );
  }

  if (!isAuthenticated() || !isAuthenticatedWithMFA()) {
    navigate(ROUTES.DASHBOARD);
  }

  return (
    <Main className="justify-center">
      <section className="my-8 flex flex-col items-center space-y-6" id="nested-content">
        <H1 className="text-4xl font-extrabold">Nested Dashboard</H1>
        <p className="text-gray-600">This is the nested protected page.</p>

        <div className="flex gap-4">
          <a className="rounded-md bg-purple-600 px-6 py-3 font-semibold text-white shadow hover:bg-purple-700" href={ROUTES.DASHBOARD}>
            Back to Dashboard
          </a>

          <button className="rounded-md bg-red-600 px-6 py-3 font-semibold text-white shadow hover:cursor-pointer hover:bg-red-700" onClick={logout}>
            Logout
          </button>
        </div>
        <audio
          className="mx-auto mb-12 w-full max-w-[80vw] rounded-md border-2 border-amber-600 p-2"
          src={figatelluForeverSongUrl}
          ref={audioRef}
          controls
        />
      </section>
    </Main>
  );
};

export default DashboardNested;
