import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { errorToast, stringBool } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { loginHandler } from "../../../features/auth/auth-action";
import { useFirstRender } from "../../../utils/hooks";
import { useMemo } from "react";
import { useCallback } from "react";
import { Loading } from "../../../components/layout";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { firstRender } = useFirstRender();

  const params = useMemo(() => {
    return {
      existingGoogleEmail: stringBool[searchParams.get("existingGoogleEmail")],
      success: stringBool[searchParams.get("success")],
      id: searchParams.get("id"),
      name: searchParams.get("name"),
      username: searchParams.get("username"),
      email: searchParams.get("email"),
      profileImageUrl: searchParams.get("profileImageUrl"),
      token: searchParams.get("token"),
    };
  }, [searchParams]);

  const googleSuccessHandler = useCallback(() => {
    dispatch(
      loginHandler({
        id: params.id,
        name: params.name,
        username: params.username,
        email: params.email,
        profileImageUrl: params.profileImageUrl,
        token: params.token,
      })
    );
    navigate(ROUTES.dashboard, { replace: true });
  }, [dispatch, navigate, params]);

  const googleFailureHandler = useCallback(() => {
    if (params.existingGoogleEmail) {
      errorToast(
        "This Google account is already in use. Please use a different account."
      );
    } else {
      errorToast("Google authentication failed. Please try again.");
    }
    navigate(ROUTES.login, { replace: true });
  }, [navigate, params.existingGoogleEmail]);

  useEffect(() => {
    if (!firstRender) return;
    if (params.success) {
      googleSuccessHandler();
    } else {
      googleFailureHandler();
    }
  }, [firstRender, googleFailureHandler, googleSuccessHandler, params.success]);

  return <Loading message="Logging into Google" />;
};

export default GoogleLogin;
