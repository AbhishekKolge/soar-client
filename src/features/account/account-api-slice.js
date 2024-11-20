import apiSlice from "../../state/api/api-slice";
import { omitEmptyKeys } from "../../utils/helper";

const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: (queryParams) => ({
        url: "/account",
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ["Account"],
    }),
    addAccount: builder.mutation({
      query: (accountDetails) => ({
        url: "/account",
        method: "POST",
        body: accountDetails,
      }),
      invalidatesTags: ["Account"],
    }),
    updateAccount: builder.mutation({
      query: ({ details, id }) => ({
        url: `/account/${id}`,
        method: "PATCH",
        body: details,
      }),
      invalidatesTags: ["Account"],
    }),
    deleteAccount: builder.mutation({
      query: (accountId) => ({
        url: `/account/${accountId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

export const {
  useGetAccountQuery,
  useAddAccountMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = accountApiSlice;
