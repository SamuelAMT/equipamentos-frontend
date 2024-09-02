export const formatCurrencyInput = (value: string): string => {
    const numericValue = value.replace(/[^0-9,]/g, '');
    const floatValue = numericValue.replace(',', '.');
  
    if (numericValue === '') {
      return '0,00';
    }
  
    const parsedValue = parseFloat(floatValue);
    return parsedValue.toFixed(2).replace('.', ',');
  };