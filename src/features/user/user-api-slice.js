import apiSlice from "../../state/api/api-slice";

const useApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    showMe: builder.query({
      query: () => ({
        url: "/user/show-me",
      }),
      providesTags: ["User"],
    }),
    uploadProfileImage: builder.mutation({
      query: (fileData) => ({
        url: "/user/profile-image",
        method: "POST",
        body: fileData,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (userDetails) => ({
        url: "/user",
        method: "PATCH",
        body: userDetails,
      }),
      invalidatesTags: ["User"],
    }),
    removeProfileImage: builder.mutation({
      query: (profileImageId) => ({
        url: "/user/profile-image",
        method: "DELETE",
        params: { profileImageId },
      }),
      invalidatesTags: ["User"],
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: "/user",
        method: "DELETE",
      }),
    }),
    getSecurity: builder.query({
      query: () => ({
        url: "/user/security",
      }),
      providesTags: ["Security"],
    }),
    updateSecurity: builder.mutation({
      query: (securityDetails) => ({
        url: "/user/security",
        method: "PATCH",
        body: securityDetails,
      }),
      invalidatesTags: ["Security"],
    }),
    getPreference: builder.query({
      query: () => ({
        url: "/user/preference",
      }),
      providesTags: ["Preference"],
    }),
    updatePreference: builder.mutation({
      query: (preferenceDetails) => ({
        url: "/user/preference",
        method: "PATCH",
        body: preferenceDetails,
      }),
      invalidatesTags: ["Preference"],
    }),
  }),
});

export const {
  useShowMeQuery,
  useUploadProfileImageMutation,
  useUpdateProfileMutation,
  useRemoveProfileImageMutation,
  useDeleteAccountMutation,
  useGetSecurityQuery,
  useUpdateSecurityMutation,
  useGetPreferenceQuery,
  useUpdatePreferenceMutation,
} = useApiSlice;
