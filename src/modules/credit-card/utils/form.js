export const getCreditCardInitialValues = (creditCard) => {
  return {
    name: creditCard.name || "",
    isSelected: creditCard.isSelected || false,
    pin: creditCard.pin || "",
  };
};

export const defaultCreditCardValues = {
  number: "",
  name: "",
  isSelected: false,
  validity: undefined,
  pin: "",
};

export const defaultUpdateCreditCardValues = {
  name: "",
  isSelected: false,
  pin: "",
};
