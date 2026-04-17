import { baseApi } from "../../api/baseApi";

export const notificationApiServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET Notifications
    getNotifications: builder.query({
      query: ({ userId = "" }) => ({
        url: "/notifications",
        params: {
          userId,
        },
      }),
      providesTags: ["Notifications"],
    }),

    // ✅ CREATE Notification
    createNotification: builder.mutation({
      query: (data) => ({
        url: "/notifications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notifications"],
    }),

    // ❌ DELETE Notification (NEW)
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),

  }),
});export const {
  useGetNotificationsQuery,
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApiServices;