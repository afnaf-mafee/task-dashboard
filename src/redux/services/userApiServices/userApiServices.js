import { baseApi } from "../../api/baseApi";

const userApiServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //  Fetch all users 
    getUsers: build.query({
      query: (searchId = "") => {
        const query = searchId ? `?userId=${searchId}` : "";
        return `/all-users${query}`;
      },
      providesTags: ["AllUsers"],
    }),

    //  Fetch single user by userId
    getSingleUser: build.query({
      query: (userId) => `/user/${userId}`, // matches backend /user/:id
      providesTags: (result, error, userId) => [{ type: "AllUsers", id: userId }],
    }),
  }),
});

export const { useGetUsersQuery, useGetSingleUserQuery } = userApiServices;