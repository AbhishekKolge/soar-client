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
  }),
});

export const { useGetTransactionQuery } = transactionApiSlice;
