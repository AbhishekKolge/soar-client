import {
  calculateRemainingTime,
  checkTimeIsExpired,
  getAuthStorage,
  removeAuthStorage,
  saveAuthStorage,
  successToast,
  warningToast,
} from "../../utils/helper";
import { authActions } from "./auth-slice";

const logoutHandler = (config) => {
  return (dispatch) => {
    removeAuthStorage();
    dispatch(authActions.logout());
    !config?.isSession && successToast("Logged out");
  };
};

const checkLoginStatus = () => {
  return (dispatch) => {
    const authDetails = getAuthStorage();

    if (authDetails) {
      const accessExpired = checkTimeIsExpired(
        authDetails.accessExpirationTime
      );

      if (accessExpired) {
        removeAuthStorage();
        dispatch(authActions.logout());
        warningToast("Session expired");
        return;
      }

      dispatch(authActions.login(authDetails));

      const autoLogoutTime = calculateRemainingTime(
        authDetails.accessExpirationTime
      );
      setTimeout(() => {
        removeAuthStorage();
        dispatch(authActions.logout());
        warningToast("Session expired");
      }, autoLogoutTime);
      return;
    }

    removeAuthStorage();
    dispatch(authActions.logout());
  };
};

const loginHandler = ({
  id,
  name,
  username,
  email,
  profileImageUrl,
  token,
}) => {
  return (dispatch) => {
    const accessExpirationTime =
      Date.now() + +import.meta.env.VITE_ACCESS_TOKEN_EXPIRATION_TIME;

    saveAuthStorage({
      accessExpirationTime,
      id,
      name,
      username,
      email,
      profileImageUrl,
      token,
    });
    dispatch(
      authActions.login({
        accessExpirationTime,
        id,
        name,
        username,
        email,
        profileImageUrl,
        token,
      })
    );

    successToast("Logged in successfully");

    const autoLogoutTime = calculateRemainingTime(accessExpirationTime);

    setTimeout(() => {
      removeAuthStorage();
      dispatch(authActions.logout());
      warningToast("Session expired");
    }, autoLogoutTime);
  };
};

const updateUserInfoHandler = (updatedInfo) => {
  return (dispatch) => {
    const authDetails = getAuthStorage();

    Object.entries(updatedInfo).forEach(([key, value]) => {
      authDetails[key] = value;
    });

    saveAuthStorage(authDetails);

    dispatch(authActions.updateUserInfo(authDetails));
  };
};

export { checkLoginStatus, loginHandler, logoutHandler, updateUserInfoHandler };
