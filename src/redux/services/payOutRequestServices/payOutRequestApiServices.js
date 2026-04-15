import { baseApi } from "../../api/baseApi";

const payOutRequestApiServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ✅ GET ALL PAYOUT REQUESTS + SEARCH
    getAllPayoutRequests: build.query({
      query: ({ userId = "" } = {}) => {
        const params = new URLSearchParams();

        if (userId) {
          params.append("userId", userId);
        }

        return {
          url: `/payout-requests?${params.toString()}`,
          method: "GET",
        };
      },

      providesTags: ["PayoutRequests"],
    }),
    updatePayoutStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/payout-request/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["PayoutRequests"],
    }),
  }),
});

export const { useGetAllPayoutRequestsQuery, useUpdatePayoutStatusMutation } =
  payOutRequestApiServices;
