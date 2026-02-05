import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { randint } from '@/lib/randint';

const VALID_PASSWORD = 'figatellu';
const NOT_AUTHENTICATED = -1;
const AUTHENTICATED_WITHOUT_MFA = 1;
const AUTHENTICATED_WITH_MFA = 2;

export type LoginFn = ({ password, withMFA, pre }: { password: string; withMFA: boolean; pre?: boolean }) => boolean;

// * ... This is FAKED
export const useAuth = () => {
  const [_isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', NOT_AUTHENTICATED);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useCallback(() => _isAuthenticated !== NOT_AUTHENTICATED, [_isAuthenticated]);

  const isAuthenticatedWithMFA = useCallback(() => _isAuthenticated === AUTHENTICATED_WITH_MFA, [_isAuthenticated]);

  const logout = useCallback(() => setIsAuthenticated(NOT_AUTHENTICATED), [setIsAuthenticated]);

  useEffect(() => {
    const delay = 500 * randint(1, 5);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const login: LoginFn = ({ pre = false, password, withMFA }) => {
    if (password === VALID_PASSWORD) {
      if (!pre) {
        setIsAuthenticated(withMFA ? AUTHENTICATED_WITH_MFA : AUTHENTICATED_WITHOUT_MFA);
      }
      return true;
    }
    return false;
  };

  return {
    isAuthenticatedWithMFA,
    isAuthenticated,
    isLoading,
    logout,
    login
  };
};
