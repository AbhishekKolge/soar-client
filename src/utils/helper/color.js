export const getColorBasedOnCardNumber = (id) => {
  const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return hash % 2 === 0 ? true : false;
};
