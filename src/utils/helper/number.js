export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat("en-US", {}).format(value);
};

export const fixedDecimals = (number, decimalPlaces = 2) => {
  if (number % 1 === 0) {
    return number.toString();
  } else {
    return number.toFixed(decimalPlaces);
  }
};
