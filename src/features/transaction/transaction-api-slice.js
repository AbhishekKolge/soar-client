import apiSlice from "../../state/api/api-slice";
import { omitEmptyKeys } from "../../utils/helper";

const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransaction: builder.query({
      query: (queryParams) => ({
        url: "/transaction",
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ["Transaction"],
    }),
    transferAmount: builder.mutation({
      query: ({ details, id }) => ({
        url: `/transaction/transfer/${id}`,
        method: "POST",
        body: details,
      }),
      invalidatesTags: ["Transaction", "CreditCard"],
    }),
  }),
});

export const { useGetTransactionQuery, useTransferAmountMutation } =
  transactionApiSlice;
