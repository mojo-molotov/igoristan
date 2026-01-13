import type { FunctionComponent, FormEvent } from 'react';

import { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => boolean;
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const success = onLogin(username, password);

    if (!success) {
      setError('Invalid credentials. Try admin:admin');
    }
  };

  return (
    <div className="flex min-h-100 items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border-2 border-gray-300 bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Authentication Required</h2>
          <p className="mt-2 text-sm text-gray-600">Please login to access this page</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              id="username"
              type="text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              required
            />
          </div>

          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          <button
            className="w-full rounded-md bg-purple-600 px-4 py-2 font-semibold text-white shadow hover:cursor-pointer hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">Hint: admin / admin</p>
      </div>
    </div>
  );
};

export default LoginForm;
