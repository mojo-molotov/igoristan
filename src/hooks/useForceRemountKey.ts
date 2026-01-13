import { usePageContext } from 'vike-react/usePageContext';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Forces a complete remount of components on every navigation.
 *
 * Returns a unique key that changes whenever the URL changes, triggering
 * React to fully unmount and remount any component using this key.
 * This voluntarily breaks frameworks' caching and lazy update optimizations.
 *
 * @example
 * function MyComponent() {
 *   const remountKey = useForceRemount();
 *
 *   return (
 *     <MyNotLazyComponent key={remountKey} />
 *   );
 * }
 *
 * @returns A unique string key that changes on every URL navigation
 */
export function useForceRemount() {
  const pageContext = usePageContext();
  const [mountKey, setMountKey] = useState(uuidv4());

  useEffect(() => {
    setMountKey(uuidv4());
  }, [pageContext.urlPathname]);

  return mountKey;
}
