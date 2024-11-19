export const getProfileInitialValues = (user) => {
  return {
    name: user.name || "",
    username: user.username || "",
    dob: user.dob || null,
    contactNumber: user.contactNumber || "",
    contactCountryId: user.contactCountryId || "",
    present: user.address.present || "",
    permanent: user.address.permanent || "",
    city: user.address.city || "",
    postalCode: user.address.postalCode || "",
    countryId: user.address.countryId || "",
  };
};

export const getPreferenceInitialValues = (preference) => {
  return {
    transactionAlert: preference.transactionAlert || false,
    loginAlert: preference.loginAlert || false,
  };
};
export const getSecurityInitialValues = (security) => {
  return {
    twoFactorAuth: security.twoFactorAuth || false,
  };
};

export const defaultProfileValues = {
  name: "",
  username: "",
  dob: null,
  contactNumber: "",
  contactCountryId: "",
  present: "",
  permanent: "",
  city: "",
  postalCode: "",
  countryId: "",
};

export const defaultPreferenceValues = {
  transactionAlert: false,
  loginAlert: false,
};

export const defaultSecurityValues = {
  twoFactorAuth: false,
};

export const defaultDeleteProfileValues = {
  email: "",
};
