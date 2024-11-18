export const countryFilter = (value, search, countries) => {
  const { name, shortName, phoneCode } = countries.find((country) => {
    return country.id === value;
  });

  const normalizedSearch = search.toLowerCase();
  const normalizedName = name.toLowerCase();
  const normalizedShortName = shortName.toLowerCase();
  const normalizedPhoneCode = phoneCode.toLowerCase();

  if (
    normalizedName.startsWith(normalizedSearch) ||
    normalizedShortName.startsWith(normalizedSearch) ||
    normalizedPhoneCode.startsWith(normalizedSearch)
  ) {
    return 1;
  }
  return 0;
};
