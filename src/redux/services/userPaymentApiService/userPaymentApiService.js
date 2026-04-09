import { baseApi } from "../../api/baseApi";

const userPaymentApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // Add money to a user's account (admin action)
    addMoney: build.mutation({
      query: ({ userId, amount }) => ({
        url: `/user/add-money`,
        method: "POST",
        body: { userId, amount },
      }),
      invalidatesTags: ["AllPayments"], // optional: if you want to refetch payments
    }),

    // Add a payment (if user is adding themselves, like via bKash)
    addPayment: build.mutation({
      query: ({ userId, amount, method, transactionId }) => ({
        url: `/add-payment`,
        method: "POST",
        body: { userId, amount, method, transactionId },
      }),
      invalidatesTags: ["AllPayments"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useUpdatePaymentStatusMutation,
  useAddMoneyMutation,
  useAddPaymentMutation,
} = userPaymentApiService;