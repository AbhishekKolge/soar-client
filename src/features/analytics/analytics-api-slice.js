import apiSlice from "../../state/api/api-slice";

const analyticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWeeklyActivity: builder.query({
      query: () => ({
        url: "/analytics/activity",
      }),
      providesTags: ["Analytics", "Activity"],
    }),
    getExpenseStatistics: builder.query({
      query: () => ({
        url: "/analytics/expense",
      }),
      providesTags: ["Analytics", "Expense"],
    }),
    getBalanceHistory: builder.query({
      query: () => ({
        url: "/analytics/balance",
      }),
      providesTags: ["Analytics", "Balance"],
    }),
  }),
});

export const {
  useGetWeeklyActivityQuery,
  useGetExpenseStatisticsQuery,
  useGetBalanceHistoryQuery,
} = analyticsApiSlice;
