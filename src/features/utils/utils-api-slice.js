import apiSlice from "../../state/api/api-slice";

const utilsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: "/utils/countries",
      }),
      providesTags: ["Countries"],
    }),
  }),
});

export const { useGetCountriesQuery } = utilsApiSlice;
