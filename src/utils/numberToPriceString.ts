/**
 * @returns {string} as '123 123 ${currency}'
 */
export const numberToPriceString = (number: number, currency: string = '₽') => {
  return new Intl.NumberFormat('ru-RU').format(number) + ` ${currency}`;
};
