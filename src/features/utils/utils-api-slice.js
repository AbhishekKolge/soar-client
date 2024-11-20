import apiSlice from "../../state/api/api-slice";
import { omitEmptyKeys } from "../../utils/helper";

const utilsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: "/utils/countries",
      }),
      providesTags: ["Countries"],
    }),
    getBanks: builder.query({
      query: (queryParams) => ({
        url: "/utils/banks",
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ["Banks"],
    }),
  }),
});

export const { useGetCountriesQuery, useLazyGetBanksQuery } = utilsApiSlice;
