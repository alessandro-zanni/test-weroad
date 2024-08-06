export const formatPrice = (price: number, currency = 'EUR'): string => {
  const currentLang =
    typeof window !== 'undefined' ? window.navigator.language : 'it-IT';
  return new Intl.NumberFormat(currentLang, {
    style: 'currency',
    currency,
  }).format(price);
};
