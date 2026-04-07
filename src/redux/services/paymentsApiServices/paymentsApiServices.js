import { baseApi } from "../../api/baseApi";

const paymentApiServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPayments: build.query({
      query: ({ transactionId = "", status = "" } = {}) => {
        const params = new URLSearchParams();
        if (transactionId) params.append("transactionId", transactionId);
        if (status) params.append("status", status);
        return `/all-payments?${params.toString()}`;
      },
      providesTags: ["AllPayments"],
    }),
    
    // ✅ Mutation to update payment status
    updatePaymentStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/payments/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["AllPayments"], // refetch payments automatically
    }),
  }),
});

export const { useGetPaymentsQuery, useUpdatePaymentStatusMutation } = paymentApiServices;