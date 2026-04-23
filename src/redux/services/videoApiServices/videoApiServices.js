import { baseApi } from "../../api/baseApi";


export const videoApiServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  GET all videos
    getVideos: builder.query({
      query: () => "/videos",
      providesTags: ["Videos"],
    }),

    //  ADD video
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),

    //  DELETE video
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),

   
  }),
});

// 👉 Export hooks
export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useDeleteVideoMutation,
 
} = videoApiServices;