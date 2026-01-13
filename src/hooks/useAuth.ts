import { useLocalStorage } from 'usehooks-ts';
import { useEffect, useState } from 'react';

const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'admin';

// * ... This is FAKED
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = 500 * (Math.random() * 4 + 1);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    logout,
    login
  };
};
