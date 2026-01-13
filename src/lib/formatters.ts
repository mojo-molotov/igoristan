import BRAND from '@/config/brand';

export const formatPageTitle = ({
  brandAfter = true,
  pageTitle
}: {
  brandAfter?: boolean;
  pageTitle?: string;
} = {}) => (pageTitle ? (brandAfter ? `${pageTitle} | ${BRAND}` : `${BRAND} | ${pageTitle}`) : BRAND);
