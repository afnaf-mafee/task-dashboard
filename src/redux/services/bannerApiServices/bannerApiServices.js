import { baseApi } from "../../api/baseApi";

const bannerApiServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBanner: build.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),

    addBanner: build.mutation({
      query: (bannerData) => ({
        url: "/banner",
        method: "POST",
        body: bannerData,
      }),
      invalidatesTags: ["Banner"],
    }),
    deleteBanner: build.mutation({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useGetBannerQuery,
  useAddBannerMutation,
  useDeleteBannerMutation,
} = bannerApiServices;
