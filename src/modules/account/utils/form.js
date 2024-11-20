export const getAccountInitialValues = (account) => {
  return {
    imageUrl: account.imageUrl || "",
    number: account.number || "",
    name: account.name || "",
    identity: account.identity || "",
    bank: account.bank || {
      id: "",
      name: "",
    },
  };
};

export const defaultAccountValues = {
  imageUrl: "",
  number: "",
  name: "",
  identity: "",
  bank: {
    id: "",
    name: "",
  },
};
