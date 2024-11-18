import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutHandler } from "../../features/auth/auth-action";
import { errorToast } from "../../utils/helper";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logoutHandler({ isSession: true }));
  }

  if (result?.error?.data?.msg) {
    errorToast(result.error.data.msg);
  } else if (result?.error) {
    errorToast("Something went wrong!, please try again");
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: [],
  endpoints: () => ({}),
});

export default apiSlice;
