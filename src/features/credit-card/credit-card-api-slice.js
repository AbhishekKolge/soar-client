import apiSlice from "../../state/api/api-slice";

const creditCardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCreditCard: builder.query({
      query: () => ({
        url: "/credit-card",
      }),
      providesTags: ["CreditCard"],
    }),
    addCreditCard: builder.mutation({
      query: (cardDetails) => ({
        url: "/credit-card",
        method: "POST",
        body: cardDetails,
      }),
      invalidatesTags: ["CreditCard"],
    }),
    updateCreditCard: builder.mutation({
      query: ({ details, id }) => ({
        url: `/credit-card/${id}`,
        method: "PATCH",
        body: details,
      }),
      invalidatesTags: ["CreditCard"],
    }),
    deleteCreditCard: builder.mutation({
      query: (cardId) => ({
        url: `/credit-card/${cardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CreditCard"],
    }),
  }),
});

export const {
  useGetCreditCardQuery,
  useAddCreditCardMutation,
  useUpdateCreditCardMutation,
  useDeleteCreditCardMutation,
} = creditCardApiSlice;