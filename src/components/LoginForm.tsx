import type { FunctionComponent, FormEvent } from 'react';

import { useEffect, useState, useRef } from 'react';
import { safeParse } from 'valibot';

import type { OTPResponse } from '@/schemas/OTPResponseSchema';
import type { LoginFn } from '@/hooks/useAuth';

import { OTPResponseSchema } from '@/schemas/OTPResponseSchema';

interface LoginFormProps {
  onLogin: LoginFn;
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [useOTP, setUseOTP] = useState(false);
  const [otpApiKey, setOtpApiKey] = useState('');
  const [otpResponse, setOtpResponse] = useState<OTPResponse | null>(null);
  const [otpInput, setOtpInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortControllerRef.current?.abort(), []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (useOTP && !otpResponse) {
      const success = onLogin({ withMFA: true, pre: true, password });
      if (!success) {
        setError('Invalid credentials. Try any:figatellu');
        return;
      }

      if (isLoading) return;

      setIsLoading(true);
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(`https://tests-workers.vercel.app/api/otp?_user=${encodeURIComponent(username)}`, {
          headers: {
            'x-api-key': otpApiKey
          },
          signal: abortControllerRef.current.signal
        });

        if (!response.ok) {
          setError(`Failed to connect to OTP service (${response.status})`);
          return;
        }

        const data = await response.json();

        const parseResult = safeParse(OTPResponseSchema, data);

        if (!parseResult.success) {
          setError('Invalid OTP response format');
          return;
        }

        setOtpResponse(parseResult.output);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError('Failed to connect to OTP service');
      } finally {
        setIsLoading(false);
      }

      return;
    }

    if (useOTP && otpResponse) {
      const now = new Date();
      const expiresAt = new Date(otpResponse.expiresAt);

      if (now > expiresAt) {
        setError('OTP code has expired.');
        setOtpResponse(null);
        setOtpInput('');
        return;
      }

      if (otpInput === otpResponse.otpCode) {
        const success = onLogin({ withMFA: true, password });
        if (!success) {
          setError('Invalid credentials. Try any:figatellu');
        }
      } else {
        setError('Invalid OTP code');
      }
      return;
    }

    const success = onLogin({ withMFA: false, password });
    if (!success) {
      setError('Invalid credentials. Try any:figatellu');
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
          {(!useOTP || !otpResponse) && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                  Username
                </label>
                <input
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
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
                  disabled={isLoading}
                  value={password}
                  type="password"
                  id="password"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  onChange={(e) => setUseOTP(e.target.checked)}
                  disabled={isLoading}
                  checked={useOTP}
                  type="checkbox"
                  id="use-otp"
                />
                <label className="ml-2 block text-sm text-gray-700" htmlFor="use-otp">
                  Use OTP
                </label>
              </div>

              {useOTP && (
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="otp-api-key">
                    OTP simulator API Key
                  </label>
                  <input
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                    onChange={(e) => setOtpApiKey(e.target.value)}
                    disabled={isLoading}
                    value={otpApiKey}
                    id="otp-api-key"
                    type="text"
                    required
                  />
                </div>
              )}
            </>
          )}

          {useOTP && otpResponse && (
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="otp-code">
                Enter OTP Code
              </label>
              <input
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="Enter your OTP"
                value={otpInput}
                id="otp-code"
                type="text"
                autoFocus
                required
              />
              <p className="mt-1 text-xs text-gray-500">Code expires at: {new Date(otpResponse.expiresAt).toLocaleTimeString()}</p>
            </div>
          )}

          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          <button
            className="w-full rounded-md bg-purple-600 px-4 py-2 font-semibold text-white shadow hover:cursor-pointer hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Loading...' : useOTP && otpResponse ? 'Confirm OTP' : 'Login'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-500">Hint: any / figatellu</p>
      </div>
    </div>
  );
};

export default LoginForm;
