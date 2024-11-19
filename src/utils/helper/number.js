export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
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

export const maskCreditCardNumber = (cardNumber) => {
  const firstFour = cardNumber.slice(0, 4);
  const lastFour = cardNumber.slice(-4);

  const maskedSection = cardNumber.slice(4, -4).replace(/\d/g, "*");

  return `${firstFour} ${maskedSection.slice(0, 4)} ${maskedSection.slice(
    4,
    8
  )} ${lastFour}`;
};
