import { baseApi } from "../../api/baseApi";

const offerApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({

    /* ================= GET ALL OFFERS ================= */
    getOffers: build.query({
      query: () => "/offers",
      providesTags: ["Offers"],
    }),

    /* ================= ADD OFFER ================= */
    addOffer: build.mutation({
      query: (offerData) => ({
        url: "/offer",
        method: "POST",
        body: offerData,
      }),
      invalidatesTags: ["Offers"],
    }),

    /* ================= DELETE OFFER ================= */
    deleteOffer: build.mutation({
      query: (id) => ({
        url: `/offer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Offers"],
    }),

  }),
});

export const {
  useGetOffersQuery,
  useAddOfferMutation,
  useDeleteOfferMutation,
} = offerApiService;