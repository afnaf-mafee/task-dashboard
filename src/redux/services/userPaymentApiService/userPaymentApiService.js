import { baseApi } from "../../api/baseApi";

const userPaymentApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getPayout: build.query({
      query: () => `/payouts`,
    }),

    // ✅ Total Completed Payments
    getTotalCompletedPayments: build.query({
      query: () => `/total-completed-payments`,
      providesTags: ["AllPayments"],
    }),

    // ✅ NEW — Total Payouts
    getTotalPayouts: build.query({
      query: () => `/total-payouts`,
      providesTags: ["AllPayments"],
    }),

    // ✅ Admin Add Money
    addMoney: build.mutation({
      query: ({ userId, amount }) => ({
        url: `/user/add-money`,
        method: "POST",
        body: { userId, amount },
      }),
      invalidatesTags: ["AllPayments"],
    }),

    // ✅ User Deposit Payment
    addPayment: build.mutation({
      query: ({ userId, amount, method, transactionId }) => ({
        url: `/add-payment`,
        method: "POST",
        body: { userId, amount, method, transactionId },
      }),
      invalidatesTags: ["AllPayments"],
    }),

    // ✅ User Payout
    payoutMoney: build.mutation({
      query: ({ userId, amount }) => ({
        url: `/user/payout`,
        method: "POST",
        body: { userId, amount },
      }),
      invalidatesTags: ["AllPayments"],
    }),

  }),
});

export const {
  useAddMoneyMutation,
  useAddPaymentMutation,
  usePayoutMoneyMutation,
  useGetPayoutQuery,
  useGetTotalCompletedPaymentsQuery,
  useGetTotalPayoutsQuery, 
} = userPaymentApiService;