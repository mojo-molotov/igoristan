import BRAND from '@/config/brand';

export const formatPageTitle = ({
  brandAfter = true,
  errorCode,
  pageTitle
}: {
  brandAfter?: boolean;
  pageTitle?: string;
  errorCode?: string;
} = {}) =>
  pageTitle
    ? brandAfter
      ? `${errorCode ? `${errorCode} | ` : ''}${pageTitle} · ${BRAND}`
      : `${BRAND} · ${errorCode ? `${errorCode} | ` : ''}${pageTitle}`
    : `${errorCode ? `${errorCode} | ` : ''}${BRAND}`;
