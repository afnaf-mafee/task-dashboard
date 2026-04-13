import { baseApi } from "../../api/baseApi";

const userApiServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch all users with optional searchId and level filter
    getUsers: build.query({
      query: ({ searchId = "", level = "" } = {}) => {
        const params = new URLSearchParams();

        if (searchId) params.append("userId", searchId);
        if (level) params.append("level", level);

        return `/all-users?${params.toString()}`;
      },
      providesTags: ["AllUsers"],
    }),

    // Fetch single user by userId
    getSingleUser: build.query({
      query: (userId) => `/user/${userId}`, // matches backend /user/:id
      providesTags: (result, error, userId) => [{ type: "AllUsers", id: userId }],
    }),
  }),
});

export const { useGetUsersQuery, useGetSingleUserQuery } = userApiServices;