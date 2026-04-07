import { baseApi } from "../../api/baseApi";

const gatewayApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({

    /* ================= GET ALL GATEWAYS ================= */
    getGateways: build.query({
      query: () => "/payment-gateway",
      providesTags: ["Gateways"],
    }),

    /* ================= ADD GATEWAY ================= */
    addGateway: build.mutation({
      query: (gatewayData) => ({
        url: "/payment-gateway",
        method: "POST",
        body: gatewayData,
      }),
      invalidatesTags: ["Gateways"],
    }),

    /* ================= DELETE GATEWAY ================= */
    deleteGateway: build.mutation({
      query: (id) => ({
        url: `/payment-gateway/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gateways"],
    }),

  }),
});

export const {
  useGetGatewaysQuery,
  useAddGatewayMutation,
  useDeleteGatewayMutation,
} = gatewayApiService;