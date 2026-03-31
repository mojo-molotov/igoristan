import { navigate } from 'vike/client/router';
import { useState } from 'react';

import BackToHome from '@/components/BackToHome';
import LoginForm from '@/components/LoginForm';
import Loading from '@/components/Loading';
import { useAuth } from '@/hooks/useAuth';
import ROUTES from '@/config/routes';
import Main from '@/fragments/Main';
import H1 from '@/fragments/H1';

import napoleonDiscoveredRussianFigatelluSongUrl from '../../../assets/sounds/music/03-napoleon-discovered-russian-figatellu-n.ogg';

const Dashboard = () => {
  const { isAuthenticatedWithMFA, isAuthenticated, isLoading, logout, login } = useAuth();
  const [mfaError, setMfaError] = useState('');

  const handleNestedPageClick = () => {
    if (!isAuthenticatedWithMFA()) {
      setMfaError('Access to this page requires OTP authentication');
      return;
    }

    setMfaError('');
    navigate(ROUTES.DASHBOARD_NESTED);
  };

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

  if (!isAuthenticated()) {
    return (
      <Main className="justify-center">
        <LoginForm onLogin={login} />
        <BackToHome />
      </Main>
    );
  }

  return (
    <Main className="justify-center">
      <section className="my-8 flex flex-col items-center space-y-6" id="dashboard-content">
        <H1 className="text-4xl font-extrabold">Dashboard</H1>
        <p className="text-gray-600">Welcome! You authenticated.</p>
        {mfaError && <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">{mfaError}</div>}
        <div className="flex gap-4">
          <button
            className="rounded-md bg-purple-600 px-6 py-3 font-semibold text-white shadow hover:cursor-pointer hover:bg-purple-700"
            data-testid="go-to-nested-page-btn"
            onClick={handleNestedPageClick}
          >
            Go to Nested Page
          </button>
          <button
            className="rounded-md bg-red-600 px-6 py-3 font-semibold text-white shadow hover:cursor-pointer hover:bg-red-700"
            onClick={() => {
              setMfaError('');
              logout();
            }}
            data-testid="logout-btn"
          >
            Logout
          </button>
        </div>
        <audio
          className="mx-auto mb-12 w-full max-w-[80vw] rounded-md border-2 border-amber-600 p-2"
          src={napoleonDiscoveredRussianFigatelluSongUrl}
          controls
        />
      </section>
    </Main>
  );
};

export default Dashboard;
